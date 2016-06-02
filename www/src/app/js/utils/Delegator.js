define([
    "dojo/topic",
    "map/config",
    "map/Controls",
    "map/MapModel",
    "analysis/Query",
    "analysis/config",
    "utils/Helper",
    "map/LayerController",
    "controllers/MapController",
    "controllers/ViewController"
], function(topic, MapConfig, Controls, MapModel, AnalyzerQuery, AnalyzerConfig, Helper, LayerController, MapController, ViewController) {
    'use strict';

    return {

        startListening: function() {

            // View Controller Events
            topic.subscribe('changeView', function(newView) {
                ViewController.load(newView);
            });

            // Events coming from the Wizard
            topic.subscribe('toggleWizard', function() {
                Helper.toggleWizard();
            });

            // Events coming from the Wizard
            topic.subscribe('toggleAlerts', function() {
                Helper.toggleAlerts();
            });

            topic.subscribe('setAdminBoundariesDefinition', function(filter) {
                LayerController.setWizardDynamicLayerDefinition(MapConfig.adminUnitsLayer, filter);
                // If filter is none, dont zoom to none, above will turn layer off when none is selected
                if (filter) {
                    AnalyzerQuery.zoomToFeatures(AnalyzerConfig.adminUnit.countryBoundaries, filter);
                }
                // Hide the Mill Points layer if its visible
                var layer = app.map.getLayer(MapConfig.mill.id);
                if (layer) {
                    if (layer.visible) {
                        LayerController.setWizardMillPointsLayerDefinition(MapConfig.mill);
                        // Update the UI to reflect that this layer is off
                        topic.publish('toggleItemInLayerList', 'mill');
                    }
                }
            });

            topic.subscribe('setCertificationSchemeDefinition', function(scheme) {
                LayerController.setWizardDynamicLayerDefinition(MapConfig.certificationSchemeLayer, scheme);
                // If filter is none, dont zoom to none, above will turn layer off when none is selected
                if (scheme) {
                    AnalyzerQuery.zoomToFeatures(AnalyzerConfig.certifiedArea.schemeQuery, scheme);
                }
                // Hide the Mill Points layer if its visible
                var layer = app.map.getLayer(MapConfig.mill.id);
                if (layer) {
                    if (layer.visible) {
                        LayerController.setWizardMillPointsLayerDefinition(MapConfig.mill);
                        // Update the UI to reflect that this layer is off
                        topic.publish('toggleItemInLayerList', 'mill');
                    }
                }
            });

            topic.subscribe("setCommercialEntityDefinition", function(entityType) {
                // LayerController.setWizardDynamicLayerDefinition(MapConfig.commercialEntitiesLayer, entityType);

                // // If filter is none, dont zoom to none, above will turn layer off when none is selected
                // if (entityType) {
                //     AnalyzerQuery.zoomToFeatures(AnalyzerConfig.commercialEntity.commodityQuery, entityType);
                // }

                if (entityType === "Logging concession") {
                  topic.publish('toggleItemInLayerList', 'logPerm');
                } else if (entityType === "Oil palm concession") {
                  topic.publish('toggleItemInLayerList', 'oilPerm');
                } else if (entityType === "Mining concession") {
                  topic.publish('toggleItemInLayerList', 'minePerm');
                } else if (entityType === "Wood fiber plantation") {
                  topic.publish('toggleItemInLayerList', 'woodPerm');
                } else if (!entityType) {

                  topic.publish('toggleItemInLayerListOff');
                  // topic.publish('toggleItemInLayerListOff', 'oilPerm');
                  // topic.publish('toggleItemInLayerListOff', 'minePerm');
                  // topic.publish('toggleItemInLayerListOff', 'woodPerm');
                  //topic.publish('toggleItemInLayerList', 'woodPerm');
                }

                // Hide the Mill Points layer if its visible
                var layer = app.map.getLayer(MapConfig.mill.id);
                if (layer) {
                    if (layer.visible) {
                        LayerController.setWizardMillPointsLayerDefinition(MapConfig.mill);
                        // Update the UI to reflect that this layer is off
                        topic.publish('toggleItemInLayerList', 'mill');
                    }
                }
            });

            topic.subscribe('showMillPoints', function() {
                // Turn off the dynamic layer by calling this method without passing a 2nd parameter to it
                LayerController.setWizardDynamicLayerDefinition(MapConfig.certificationSchemeLayer);
                // Toggle the wizard layer with this, will need to add a definition to it when the data supports it
                LayerController.setWizardMillPointsLayerDefinition(MapConfig.mill);
                LayerController.setWizardMillPointsLayerDefinition(MapConfig.gfwMill);


            });

            // Layer Controller Functions
            topic.subscribe('toggleLayer', function(layerId) {
                var config = MapConfig[layerId];
                if (config) {
                    if (config.toolsNode) {
                        // Show the opposite of the visible status, if the layer is visible, it is about to be turned off,
                        // if the layer is not visible, it is about to be turned on
                        var operation = app.map.getLayer(config.id).visible ? 'hide' : 'show';
                        Controls.toggleToolbox(config, operation);
                    }
                    LayerController.toggleLayers(config);
                }
            });

            topic.subscribe('showLayer', function(layerId) {
                var config = MapConfig[layerId];
                if (config) {
                    LayerController.showLayer(config);
                    if (config.toolsNode) {
                        Controls.toggleToolbox(config, 'show');
                    }
                }
            });

            topic.subscribe('hideLayer', function(layerId) {
                var config = MapConfig[layerId];
                if (config) {
                    LayerController.hideLayer(config);
                    if (config.toolsNode) {
                        Controls.toggleToolbox(config, 'hide');
                    }
                }
            });

            topic.subscribe('updateLayer', function(props) {
                if (props.layerType === 'tiled') {
                    var config = MapConfig[props.id];
                    if (config) {
                        LayerController.toggleLayers(config);
                    }
                } else if (props.layerType === 'dynamic') {
                    LayerController.updateLayer(props);
                }
            });

            topic.subscribe('updateGladDates', function(dates) {
              LayerController.updateGladDates(dates);
            });

            topic.subscribe('changeLayerTransparency', function(layerKey, layerType, transparencyValue) {
                var config = MapConfig[layerKey];
                if (config) {
                    LayerController.changeLayerTransparency(config, layerType, transparencyValue);
                }
            });

            topic.subscribe('customSuitabilityImageReady', function() {
                LayerController.hideSuitabilityLoader();
            });

            // Map Controller Functions
            topic.subscribe('showInfoPanel', MapController.showInfoPanel);
            topic.subscribe('toggleItemInLayerList', MapController.toggleItemInLayerList);
            topic.subscribe('toggleItemInLayerListOff', MapController.toggleItemInLayerListOff);

            topic.subscribe("centerChange", function(x, y, zoom) {
                MapController.centerChange(x, y, zoom);
            });

            topic.subscribe('showConcessionsLegend', function() {
                app.map._simpleLegends.concessions.show();
            });

            topic.subscribe('hideConcessionsLegend', function() {
                app.map._simpleLegends.concessions.hide();
            });

            topic.subscribe('filterConcessionsLegendItems', function(index) {
                app.map._simpleLegends.concessions.filterItem(index);
            });

        }

    };

});
