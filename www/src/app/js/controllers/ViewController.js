define([
    "dojo/dom-class",
    "dojo/query",
    "dojo/io-query",
    "dijit/registry",
    "utils/Loader",
    "controllers/Header",
    "controllers/Footer",
    "controllers/MapController",
    "controllers/HomeController",
    "controllers/AboutController",
    "controllers/DataController",
    "controllers/MethodsController",
    "controllers/PublicationsController",
    "controllers/SubmissionController",
    "utils/Hasher",
    "utils/NavListController"
], function(domClass, query, ioQuery, registry, Loader, Header, Footer, MapController, HomeController, AboutController, DataController, MethodsController, PublicationsController, SubmissionController, Hasher, NavListController) {
    'use strict';

    var loadedViews = {};

    return {

        init: function(defaultView) {
            var self = this;
            // Initialize Header, Footer, and defaultView
            self.load('header', function(template) {
                Header.init(template);
                // second parameter signifies the view is not external, always false in this case
                Header.updateView(defaultView, false);
                self.load(defaultView);
            });
            self.load('footer', Footer.init);
        },

        load: function(view, callback) {
            if (!view) {
                return
            }
            var self = this;
            if (!callback) {
                callback = this.getCallback(view);
            }


            // If the View has already been loaded, dont fetch the content again
            if (loadedViews[view]) {
                if (!callback) {
                    callback = this.getCallback(view);
                }
                callback();
                self.viewLoaded(view);
                // if (view != "home view") {
                //     HomeController.stopModeAnim(2);
                // }
                // Resize Became Necessary after adding tundra.css
                registry.byId("stackContainer").resize();
            } else {
                loadedViews[view] = true;
                Loader.getTemplate(view).then(function(template) {
                    callback(template);
                    self.viewLoaded(view);
                    // Resize Became Necessary after adding tundra.css
                    registry.byId("stackContainer").resize();
                });

            }

        },

        viewLoaded: function(view) {
            // These views only need to be loaded, nothing else
            if (view === 'header' || view === 'footer') {
                return;
            }

            // If we are in map view, hide footer, else show it
            Footer.toggle(view === 'map');

            // Set header to appropriate style base on view
            Header.toggleForView(view);

            // Set class on app-body
            domClass.remove("app-body");
            domClass.add("app-body", view + "View");

            //once page is loaded set drilled down url
            NavListController.urlControl(view);


        },

        getCallback: function(view) {
            switch (view) {
                case 'home':
                    return HomeController.init.bind(HomeController);
                case 'map':
                    return MapController.init.bind(MapController);
                case 'data':
                    return DataController.init.bind(DataController);
                case 'methods':
                    return MethodsController.init.bind(MethodsController);
                case 'about':
                    return AboutController.init.bind(AboutController);
                case 'publications':
                    return PublicationsController.init.bind(PublicationsController);
                case 'submission':
                    return SubmissionController.init.bind(SubmissionController);
                default:
                    return;
            }
        }

    };

});
