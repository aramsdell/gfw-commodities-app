define([
  // libs
  'react',
  'lodash',
  // src
  'analysis/WizardStore',
  'components/alertsForm/config',
  'components/alertsForm/AlertsFormHelper',
  'components/featureList/FeatureList',
  'map/config',
  'map/MapModel',
  'map/Uploader',
  'map/Symbols',
  'utils/GeoHelper',
  // esri/dojo
  'esri/graphic',
  'esri/geometry/Polygon',
  'esri/toolbars/draw',
  'dojo/dom',
  'dojo/query',
  'dojo/dom-class',
  'dojo/Deferred',
  'dojo/promise/all',
  'dojo/request/xhr',
  'dojox/validate/web'
], function(React, _, WizardStore, AlertsConfig, AlertsFormHelper, FeatureList, MapConfig, MapModel, Uploader, Symbols, GeoHelper, Graphic, Polygon, Draw, dom, dojoQuery, domClass, Deferred, all, xhr, validate) {

  var AlertsForm,
    drawToolbar,
    activeTool,
    KEYS = AlertsConfig.STORE_KEYS,
    getDefaultState,
    formaId = _.uniqueId(),
    firesId = _.uniqueId(),
    emailId = _.uniqueId(),
    subscriptionNameId = _.uniqueId(),
    self = this;

  getDefaultState = function() {
    return {
      features: WizardStore.get(KEYS.customFeatures),
      selectedFeatures: WizardStore.get(KEYS.selectedCustomFeatures)
    }
  }

  AlertsForm = React.createClass({

    getInitialState: getDefaultState,

    componentDidMount: function() {
      drawToolbar = new Draw(app.map);
      drawToolbar.on('draw-end', this._drawComplete);

      WizardStore.registerCallback(KEYS.customFeatures, function() {
        this.setState({features: WizardStore.get(KEYS.customFeatures)});
      }.bind(this));

      WizardStore.registerCallback(KEYS.selectedCustomFeatures, function() {
        this.setState({selectedFeatures: WizardStore.get(KEYS.selectedCustomFeatures)});
      }.bind(this));

      this.setState(getDefaultState());
    },

    componentWillReceiveProps: function(newProps) {
      // Update state with newly received props
      if (newProps.isResetting) {
        this.replaceState(getDefaultState());
        this._deactivateToolbar();
        this._removeActiveClass();
      }
    },

    render: function() {
      var currentFeatures = WizardStore.get(KEYS.selectedCustomFeatures),
          currentSelectionLabel = currentFeatures.length > 0 ? currentFeatures.map(function (feature) {return feature.attributes.WRI_label}).join(',') : 'none',
          toggleAlertsForm = function() {console.log('TODO: toggleAlertsForm')};


      return (
        React.DOM.div({className: 'relative fill'},
          // Header
          React.DOM.div({className: 'alerts-form__header'},
            React.DOM.div({className: 'fill__long border-box padding'}, 'Alerts Registration'),
            React.DOM.button({'onClick': toggleAlertsForm, className: 'back-white absolute no-top no-right fill__long pointer'}, 'x')
          ),
          // Body
          React.DOM.div({className: 'alerts-form__body'}, 
            // Tools
            React.DOM.div({'className':'padding__wide padding__top'},
              React.DOM.div(null, AlertsConfig.customArea.instructions),
              React.DOM.div({'className':'text-center'},
                React.DOM.button({'onClick': this._activateToolbar, 'data-geometry-type': Draw.FREEHAND_POLYGON}, AlertsConfig.customArea.freehandLabel),
                React.DOM.button({'onClick': this._activateToolbar, 'data-geometry-type': Draw.POLYGON}, AlertsConfig.customArea.polyLabel),
                React.DOM.button({'onClick': Uploader.toggle.bind(Uploader), 'id':'alerts-draw-upload' }, AlertsConfig.customArea.uploadLabel)
              )
            ),
            // Features
            new FeatureList({'features': this.state.features, 'selectedFeatures': this.state.selectedFeatures}),
            // Subscription options
            // TODO: honeypot fields
            React.DOM.div({'className':'alerts-form__form absolute no-wide border-box', 'style': {bottom:'51px'}},
              React.DOM.div(null,
                React.DOM.input({className:'vertical-middle', type: 'checkbox', id:formaId}),
                React.DOM.label({className:'vertical-middle', htmlFor:formaId}, 'Monthly Clearance Alerts')
              ),
              React.DOM.div(null,
                React.DOM.input({className:'vertical-middle', type: 'checkbox', id:firesId}),
                React.DOM.label({className:'vertical-middle', htmlFor:firesId}, 'Fire Alerts')
              ),
              React.DOM.div({className:'text-center'},
                React.DOM.input({id:subscriptionNameId, placeholder:'Subscription area name'})
              ),
              React.DOM.div({className:'text-center'},
                React.DOM.input({id:emailId, placeholder:'something@gmail.com'})
              )
            )
          ),
          // Footer
          React.DOM.div({className:'alerts-form__footer'}, 
            React.DOM.div({className:'inline-block padding__left'}, 'Current Selection:'),
            React.DOM.div({className:'inline-block padding__left text-gold'}, currentSelectionLabel),
            React.DOM.button({className:'text-white back-orange no-border fill__long pointer absolute no-right no-top', onClick:this._subscribeToAlerts}, 'Subscribe')
          )
        )
      );
    },

    _activateToolbar: function (evt) {
      var geometryType;

      geometryType = evt.target.dataset ? evt.target.dataset.geometryType : evt.target.getAttribute("data-geometry-type")

      // If any other tools are active, remove the active class
      this._removeActiveClass();

      // If they clicked the same button twice, deactivate the toolbar
      if (activeTool === geometryType) {
        this._deactivateToolbar();
        return;
      }

      activeTool = geometryType

      drawToolbar.activate(geometryType);
      domClass.add(evt.target, "active");

      // Update the Model so other parts of the application can be aware of this
      MapModel.set('drawToolsEnabled', true);
    },

    _deactivateToolbar: function () {
      drawToolbar.deactivate();
      activeTool = undefined;
      MapModel.set('drawToolsEnabled', false);
    },

    _drawComplete: function (evt) {
      this._removeActiveClass();
      this._deactivateToolbar();

      if (!evt.geometry) {
        return;
      }

      var id = GeoHelper.nextCustomFeatureId(),
        attrs = { "WRI_ID": id },
        feature = new Graphic(evt.geometry, Symbols.getPolygonSymbol(), attrs);

      attrs[AlertsConfig.stepTwo.labelField] = "ID - " + id + ": Custom drawn feature";

      WizardStore.set(KEYS.customFeatures, WizardStore.get(KEYS.customFeatures).concat([feature]));
    },

    _removeActiveClass: function () {
      dojoQuery(".drawing-tools .drawing-tool-button").forEach(function (node) {
        domClass.remove(node, "active");
      });
    }, 

    _subscribeToFires: function (unionedPolygons, subscriptionName, email) {
      var deferred = new Deferred(),
          messagesConfig = AlertsConfig.messages,
          firesConfig = AlertsConfig.requests.fires,
          url = firesConfig.url,
          options = _.cloneDeep(firesConfig.options);

      options.data.features = JSON.stringify({
        rings: unionedPolygons.rings,
        spatialReference: unionedPolygons.spatialReference
      });
      options.data.msg_addr = email;
      options.data.area_name = subscriptionName;
      xhr(url, options).then(function (response) {
        deferred.resolve((response.message && response.message === firesConfig.successMessage) ? messagesConfig.fireSuccess : messagesConfig.fireFail);
      });
      return deferred.promise;
    },

    _subscribeToForma: function (geoJson, subscriptionName, email) {
      var deferred = new Deferred(),
          messagesConfig = AlertsConfig.messages,
          url = AlertsConfig.requests.forma.url,
          options = _.cloneDeep(AlertsConfig.requests.forma.options),
          data = JSON.stringify({
            topic: options.data.topic,
            email: email,
            geom: '{"type": "' + geoJson.type + '", "coordinates":[' + JSON.stringify(geoJson.geom) + ']}'
          }),
          request = new XMLHttpRequest()
          self = this;

      request.onreadystatechange = function () {
        if (request.readyState === 4) {
          deferred.resolve((JSON.parse(request.response).subscribe) ? messagesConfig.formaSuccess : messagesConfig.formaFail);
        }
      };
      request.addEventListener('error', function () {
        deferred.resolve(false);
      }, false);
      request.open(options.method, url, true);
      request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      request.send(data);
      return deferred.promise;
    },

    // Adapted from Generator.js:subscribeToAlerts, some required functionality
    // separated to GeoHelper & subfunctions above
    _subscribeToAlerts: function () {
      var selectedFeatures = this.state.selectedFeatures,
          polygons,
          emailAddr = dom.byId(emailId).value,
          subscriptionName = dom.byId(subscriptionNameId).value.trim(),
          formaCheck = dom.byId(formaId).checked,
          firesCheck = dom.byId(firesId).checked,
          messagesConfig = AlertsConfig.messages,
          validations = [],
          subscriptions = [],
          self = this;

      validations = [
        [!validate.isEmailAddress(emailAddr), messagesConfig.invalidEmail],
        [!formaCheck && !firesCheck, messagesConfig.noSelection],
        [!formaCheck && !firesCheck, messagesConfig.noSelection],
        [!subscriptionName || subscriptionName.length === 0, messagesConfig.noSelectionName],
        [selectedFeatures.length === 0, messagesConfig.noAreaSelection]
      ].filter(function (validation) {
        return validation[0];
      }).map(function (validation) {
        return validation[1];
      }).join('\n');

      if (validations.length > 0) {
        alert(AlertsConfig.messagesLabel + validations);
      } else {
        // Map feature geometries to new Polygons for SpatialReference for union
        polygons = selectedFeatures.map(function (feature) {
          // TODO: handle circles, convert to polys (@Generator.js:177)
          // TODO: handle points, convert to buffered circles (@Generator.js:185)
          return new Polygon(GeoHelper.getSpatialReference()).addRing(feature.geometry.rings[feature.geometry.rings.length - 1]);;
        });
        GeoHelper.union(polygons).then(function (unionedPolygon) {
          if (firesCheck) {
            subscriptions.push(self._subscribeToFires(unionedPolygon, subscriptionName, emailAddr));
          }
          if (formaCheck) {
            subscriptions.push(self._subscribeToForma(GeoHelper.convertGeometryToGeometric(unionedPolygon), subscriptionName, emailAddr));
          }

          all(subscriptions).then(function (responses) {
            console.debug('// TODO: handle response messages & pass to a dialog display');
          });
        });
      }
    }
  });

  return function(props, el) {
    return React.renderComponent(new AlertsForm(props), document.getElementById(el));
  };
});
