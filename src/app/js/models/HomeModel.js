/* global define */
define([
        "dojo/_base/declare",
        "main/config",
        "knockout"

    ],
    function(declare, AppConfig, ko) {

        var Model = declare(null, {

            constructor: function(el) {
                Model.vm = {};
                Model.root = el;

                // Create Model Properties
                console.log("in the HomeModel's constructor!!");
                Model.vm.homeModeOptions = ko.observableArray(AppConfig.homeModeOptions);

                Model.vm.modeSelect = function(obj, evt) {
                    var eventName = obj.eventName;

                    require(["controllers/HomeController"], function(HomeController) {

                        HomeController.handleModeClick(eventName);

                    })

                }

                // Apply Bindings upon initialization
                ko.applyBindings(Model.vm, document.getElementById(el));

            }

        });

        Model.get = function(item) {
            return item === 'model' ? Model.vm : Model.vm[item]();
        };

        Model.set = function(item, value) {
            Model.vm[item](value);
        };

        Model.applyTo = function(el) {
            ko.applyBindings(Model.vm, document.getElementById(el));
        };

        Model.initialize = function(el) {
            if (!Model.instance) {
                Model.instance = new Model(el);
            }
            return Model.instance;
        };

        return Model;

    });