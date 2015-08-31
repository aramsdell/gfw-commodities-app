/** @jsx React.DOM */
define([
  "react",
  "dojo/topic"
], function (React, topic) {

  return React.createClass({

    propTypes: {
      label: React.PropTypes.string.isRequired,
      value: React.PropTypes.string.isRequired
    },

    getInitialState: function() {
      return {
        active: this.props.defaultChecked || false
      };
    },

    componentWillReceiveProps: function(newProps) {
      if (newProps.isResetting) {
        this.replaceState(this.getInitialState());
      }
    },

    componentDidUpdate: function(prevProps, prevState) {
      if (this.props.change && (prevState.active !== this.state.active)) {
        this.props.change(this.state.active);
      }
    },

    /* jshint ignore:start */
    render: function() {
      var className = 'wizard-checkbox' + (this.state.active ? ' active' : '');

      return (
        <div className='wizard-checkbox-container'>          
          <div className={className} data-value={this.props.value}>
            <span className='custom-check' onClick={this.toggle}>
              <span />
            </span>
            <a className='wizard-checkbox-label' onClick={this.toggle}>{this.props.label}</a>
            {
              this.props.noInfoIcon ? null :
              <span onClick={this.showInfo} className='layer-info-icon' dangerouslySetInnerHTML={{__html: "<svg class='info-icon-svg'><use xlink:href='#shape-info'></use></svg>"}} />
            }
          </div>
        </div>
      );
    },
    /* jshint ignore:end */

    toggle: function() {
      this.setState({ active: !this.state.active });
    },

    showInfo: function(synEvent) {
      switch (this.props.value) {
        case "peat":
          this.props.infoDivClass = "forest-and-land-cover-peat-lands";
          break;
        case "treeDensity":
          this.props.infoDivClass = "forest-and-land-cover-tree-cover-density";
          break;
        case "legal":
          this.props.infoDivClass = "forest-and-land-cover-legal-classifications";
          break;
        case "protected":
          this.props.infoDivClass = "conservation-protected-areas";
          break;
        case "carbon":
          this.props.infoDivClass = "forest-and-land-cover-carbon-stocks";
          break;
        case "intact":
          this.props.infoDivClass = "forest-and-land-cover-intact-forest-landscape";
          break;
        case "landCoverGlob":
          this.props.infoDivClass = "forest-and-land-cover-land-cover-global";
          break;
        case "primForest":
          this.props.infoDivClass = "forest-and-land-cover-primary-forest";
          break;
        case "suit":
          this.props.infoDivClass = "land-use-oil-palm";
          break;
        case "rspo":
          this.props.infoDivClass = "land-use-rspo-consessions";
          break;
        case "landCoverIndo":
          this.props.infoDivClass = "forest-and-land-cover-land-cover-indonesia";
          break;
        case "landCoverAsia":
          this.props.infoDivClass = "forest-and-land-cover-land-cover-south-east-asia";
          break;
        case "treeCoverLoss":
          this.props.infoDivClass = "forest-change-tree-cover-change";
          break;
      }
      
      if (document.getElementsByClassName(this.props.infoDivClass).length) {
        topic.publish('showInfoPanel', document.getElementsByClassName(this.props.infoDivClass)[0]);
      } else {
        topic.publish('showInfoPanel', this.props.infoDivClass);
      }

    }

  });

});