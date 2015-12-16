/** @jsx React.DOM */
define([
	"react",
  "analysis/config",
  "analysis/WizardStore",
  "esri/graphic",
  "esri/toolbars/draw",
  "dojo/dom",
  "dojo/query",
  "dojo/dom-class",
  "map/config",
  "map/MapModel",
  "map/Uploader",
  "map/Symbols",
  "utils/GeoHelper",
  "components/featureList/FeatureList"
], function (React, AnalyzerConfig, WizardStore, Graphic, Draw, dom, dojoQuery, domClass, MapConfig, MapModel, Uploader, Symbols, GeoHelper, FeatureList) {

  var drawToolbar,
      activeTool;

  var KEYS = AnalyzerConfig.STORE_KEYS;

  function getDefaultState() {
    return {
      graphics: WizardStore.get(KEYS.customFeatures),
      selectedGraphics: WizardStore.get(KEYS.selectedCustomFeatures)
    };
  }

	return React.createClass({

    getInitialState: function () {
      return getDefaultState();
    },

    componentDidMount: function () {
      // Create all the Necessary Drawing Tools Here
      drawToolbar = new Draw(app.map);
      drawToolbar.on('draw-end', this._drawComplete);
      // Register Callbacks
      WizardStore.registerCallback(KEYS.customFeatures, this.graphicsListUpdated);

      WizardStore.registerCallback(KEYS.selectedCustomFeatures, function () {
        this.setState({selectedGraphics: WizardStore.get(KEYS.selectedCustomFeatures)});
      }.bind(this));

      this.setState(getDefaultState());
    },

    shouldComponentUpdate: function () {
      return WizardStore.get(KEYS.userStep) === 2 && WizardStore.get(KEYS.areaOfInterest) === AnalyzerConfig.stepOne.option1.id;
    },

    graphicsListUpdated: function () {
      var newGraphicsList = WizardStore.get(KEYS.customFeatures);
      this.setState({ graphics: newGraphicsList });
    },

    componentWillReceiveProps: function (newProps) {
      if (newProps.isResetting) {
        this.replaceState(getDefaultState());
        this._deactivateToolbar();
        this._removeActiveClass();
      }
    },

    /* jshint ignore:start */
    render: function () {
      return (
        React.createElement("div", {className: "custom-area"}, 
          React.createElement("p", {className: "drawing-instructions"}, " ", AnalyzerConfig.customArea.instructions, " "), 
          React.createElement("div", {className: "drawing-tools"}, 
            React.createElement("div", {className: "drawing-tool-button", id: "draw-freehand", onClick: this._activateToolbar}, AnalyzerConfig.customArea.freehandLabel), 
            React.createElement("div", {className: "drawing-tool-button", id: "draw-polygon", onClick: this._activateToolbar}, AnalyzerConfig.customArea.polyLabel), 
            React.createElement("div", {className: "drawing-tool-button", id: "draw-upload", onClick: Uploader.toggle.bind(Uploader)}, AnalyzerConfig.customArea.uploadLabel)
          ), 
          React.createElement("div", {className: "custom-graphics-list-container"}, 
            React.createElement("p", {className: "drawing-instructions"}, AnalyzerConfig.customArea.instructionsPartTwo), 
            React.createElement(FeatureList, {features: this.state.graphics, selectedFeatures: this.state.selectedGraphics})
          )
        )
      );
    },
    /* jshint ignore:end */

    _activateToolbar: function (evt) {

      // If any other tools are active, remove the active class
      this._removeActiveClass();

      // Hide the Upload tools if visible
      this.setState({ showUploadTools: false });

      // If they clicked the same button twice, deactivate the toolbar
      if (activeTool === evt.target.id) {
        this._deactivateToolbar();
        return;
      }

      activeTool = evt.target.id;

      switch (evt.target.innerHTML) {
        case AnalyzerConfig.customArea.freehandLabel:
          drawToolbar.activate(Draw.FREEHAND_POLYGON);
        break;
        case AnalyzerConfig.customArea.polyLabel:
          drawToolbar.activate(Draw.POLYGON);
        break;
        default:
        break;
      }

      domClass.add(evt.target, "active");

      // Update the Model so other parts of the application can be aware of this
      MapModel.set('drawToolsEnabled', true);

    },

    _drawComplete: function (evt) {
      
      this._removeActiveClass();
      this._deactivateToolbar();

      if (!evt.geometry) {
        return;
      }

      // WRI_ID = Unique ID for Drawn Graphics
      var id = GeoHelper.nextCustomFeatureId(),
          attrs = { "WRI_ID": id },
          graphic;

      // Add a Label
      attrs[AnalyzerConfig.stepTwo.labelField] = "ID - " + id + ": Custom drawn feature";
      graphic = new Graphic(evt.geometry, Symbols.getPolygonSymbol(), attrs);
      WizardStore.set(KEYS.customFeatures, WizardStore.get(KEYS.customFeatures).concat([graphic]));

    },

    _deactivateToolbar: function () {
      drawToolbar.deactivate();
      activeTool = undefined;
      MapModel.set('drawToolsEnabled', false);
    },

    _removeActiveClass: function () {
      dojoQuery(".drawing-tools .drawing-tool-button").forEach(function (node) {
        domClass.remove(node, "active");
      });
    },

  });

});
