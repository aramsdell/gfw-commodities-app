define([
    "dojo/on",
    "dojo/dom",
    "dojo/query",
    "dojo/dom-class",
    "dijit/Dialog",
    "utils/Hasher",
    "main/config",
    "utils/NavListController"
], function(on, dom, query, domClass, Dialog, Hasher, AppConfig, NavListController) {
    'use strict';

    var state = 'large', // large, small, or mobile
        initialized = false;

    return {

        init: function(template) {

            if (initialized) {
                return;
            }
            this.addSubscriptionDialog();
            dom.byId("app-header").innerHTML = template;
            this.bindEvents();
            initialized = true;
        },

        setState: function(newState) {
            domClass.remove('app-header', state);
            domClass.add('app-header', newState);
            state = newState;
        },

        bindEvents: function() {
            var self = this;

            query(".header .nav-link").forEach(function(item) {
                on(item, "click", function(evt) {
                    var target = evt.target ? evt.target : evt.srcElement,
                        dataView = target.dataset ? target.dataset.view : target.getAttribute('data-view'),
                        external = target.dataset ? target.dataset.external : target.getAttribute('data-external');

                    self.updateView(dataView, external, initialized);
                });
            });
            query("#app-footer > div.footerModesContainer > div > div > div:nth-child(3) > div > div:nth-child(4) > a").forEach(function(item) {
                on(item, "click", function(evt) {
                    var target = evt.target ? evt.target : evt.srcElement,
                        dataView = "data",
                        external = false;

                    self.updateView(dataView, external, initialized);
                });
            });
        },

        updateView: function(view, isExternal, initialized) {

            console.log("Updated View")

            /*if (view == "home") {
                require(["controllers/HomeController"], function(HomeController) {
                    console.log("home has already been initialized");
                    //if (HomeController.initialized == false) {
                    HomeController.o.startModeAnim();
                    //}
                });
            }*/


            if (isExternal === "true") {
                this.redirectPage(view);
                return;
            }

            query(".header .nav-link.selected").forEach(function(node) {
                domClass.remove(node, 'selected');
            });

            query('.nav-link-list [data-view="' + view + '"]').forEach(function(node) {
                domClass.add(node, "selected");
            });

            if (initialized) {
                Hasher.setHash("v", view);
            }

            // require(["controllers/HomeController"], function(HomeController) {

            //     if (view != "home" && HomeController.isInitialized()) {

            //         console.log("should stop the animation here...")
            //         HomeController.stopModeAnim();
            //     }
            // });
        },

        toggleForView: function(view) {
            if (view === 'map') {
                this.setForMap();
            } else if (view === 'home') {
                this.setForHome();
            } else {
                this.setForGenericView();
            }
        },

        setForMap: function() {
            domClass.add("nav-content", "outer");
            domClass.remove("nav-content", "inner");
            domClass.add("app-header", "mapView");
            domClass.remove("app-header", "generalView");
        },

        setForGenericView: function() {
            this.setForHome();
            console.log("other view");
            //			domClass.add("nav-content", "outer");
            //			domClass.remove("nav-content", "inner");
            domClass.remove("app-header", "mapView");
            domClass.add("app-header", "generalView");
            //domClass.remove("footerModesContainer", "generalView");
            $(".footerModesContainer").hide();

            // Resize the page here!


        },

        setForHome: function() {
            console.log("home view");
            domClass.add("nav-content", "inner");
            domClass.remove("nav-content", "outer");
            domClass.remove("app-header", "mapView");
            domClass.remove("app-header", "generalView");
            $(".footerModesContainer").show();
        },

        redirectPage: function(view) {
            window.open(AppConfig.urls[view], "_blank");
        },

        addSubscriptionDialog: function() {
            var dialog2 = new Dialog({
                    title: 'Map Analysis Walkthrough',
                    style: 'width: 300px; text-align: center;'
                }),
                self = this,
                content = "<p><strong>Coming Soon!</strong></p>";

            dialog2.setContent(content);

            query("#app-footer > div.footerModesContainer > div > div > div:nth-child(2) > div > div:nth-child(5) > a").forEach(function(item) {
                on(item, "click", function(evt) {
                    dialog2.show();
                });
            });

        }


    };

});