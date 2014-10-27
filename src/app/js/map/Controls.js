define([
    "dojo/dom",
    "dojo/query",
    "dojo/Deferred",
    "dojo/_base/fx",
    "dojo/_base/array",
    "dojo/dom-class",
    "dojo/dom-style",
    "dijit/registry",
    "dojo/dom-construct",
    "map/config",
    "map/MapModel",
    "map/LayerController",
    "esri/request",
    "esri/TimeExtent",

    "esri/dijit/TimeSlider",
    "dijit/form/CheckBox",
    "dijit/layout/ContentPane",
    "dijit/layout/AccordionContainer"
], function(dom, dojoQuery, Deferred, Fx, arrayUtils, domClass, domStyle, registry, domConstruct, MapConfig, MapModel, LayerController, request, TimeExtent, TimeSlider, Checkbox, ContentPane, Accordion) {

    'use strict';

    var jq171 = jQuery.noConflict(),
        sliderInit = false,
        sliderInit2 = false;

    return {

        toggleToolbox: function(layerConfig, operation) {
            if (layerConfig.id === 'CustomSuitability') {
                // Toggle This checkbox independent of other toolboxes
                var display = (operation === 'show' ? 'block' : 'none');
                domStyle.set(layerConfig.toolsNode, 'display', display);
                // Resize the Accordion and The JQuery Sliders so they look correct
                // registry.byId('suitability-accordion').resize();
                this.resizeRangeSliders();
            } else {
                console.log(layerConfig.id);
                // Hide other tools, then show this node if operation is show
                this.hideAllToolboxes();
                if (operation === 'show') {
                    domStyle.set(layerConfig.toolsNode, 'display', 'block');
                }
            }
        },

        hideAllToolboxes: function() {
            dojoQuery(".gfw .layer-controls-container .toolbox").forEach(function(node) {
                if (domStyle.get(node, 'display') === "block") {
                    domStyle.set(node, 'display', 'none');
                }
            });
        },

        createDialogBox: function(content) {
            require([
                "dijit/Dialog",
                "dojo/_base/lang"
            ], function(Dialog, Lang) {

                var contentClone = Lang.clone(content);
                var node = contentClone.querySelector(".source_body");

                if (node.querySelector(".source_extended")) {
                    node.removeChild(node.querySelector(".source_extended"));
                }
                if (node.querySelector(".source_download")) {
                    node.removeChild(node.querySelector(".source_download"));
                }
                if (node.querySelector(".overview_title")) {
                    node.querySelector(".source_summary").removeChild(node.querySelector(".overview_title"));
                }
                if (contentClone.querySelector(".source_header")) {
                    contentClone.removeChild(contentClone.querySelector(".source_header"));

                }
                //remove checkbox

                if (contentClone.getElementsByTagName("input").length) {
                    contentClone.removeChild(contentClone.getElementsByTagName("input")[0]);

                }

                var dialog = new Dialog({
                    title: content.querySelector(".source_title").innerHTML.toUpperCase(),
                    style: "height: 700px; width: 600px; overflow: auto;",
                    draggable: false,
                    hide: function() {
                        dialog.destroy();
                    }
                });

                dialog.onClose(function() {
                    //console.log("CLOSED");
                });
                //for possible title
                //content.getElementsByClassName("source_title")[0].innerHTML
                dialog.setContent(contentClone.innerHTML);
                dialog.show();
            });
        },

        toggleFiresLayerOptions: function(evt) {
            var target = evt.target ? evt.target : evt.srcElement,
                filter = target.dataset ? target.dataset.filter : target.getAttribute('data-filter'),
                highConfidence;
            // Remove selected class from previous selection
            dojoQuery(".fires_toolbox .toolbox-list li").forEach(function(node) {
                domClass.remove(node, "selected");
            });
            // Add selected class to new selection
            domClass.add(target, "selected");

            // Get status of high confidence fires checkbox
            highConfidence = dom.byId("high-confidence").checked;

            LayerController.setFiresLayerDefinition(filter, highConfidence);
        },

        toggleFiresConfidenceLevel: function(evt) {
            var target = evt.target ? evt.target : evt.srcElement,
                highConfidence = target.checked,
                element,
                filter;

            // Find the currently active filter
            element = dojoQuery(".fires_toolbox .toolbox-list li.selected")[0];
            filter = element.dataset ? element.dataset.filter : element.getAttribute("data-filter");

            LayerController.setFiresLayerDefinition(filter, highConfidence);

        },

        // this function should also have the ability to handle string (dom node id's) to turn these on
        toggleOverlays: function(evt, nodeId) {
            if (evt) {
                domClass.toggle(evt.currentTarget, 'selected');
            } else if (nodeId) {
                // May Extend this to take an array so if 4 nodes need to be updated, I dont update the layer 4 times
                // instead, toggle all the classes and then update the layer, in this case, nodeId would be an array
                domClass.toggle(dom.byId(nodeId), 'selected');
            }

            LayerController.setOverlaysVisibleLayers();
        },

        generateTimeSliders: function() {
            this.buildFormaSlider();
            this.buildTreeCoverChangeSlider();
            this.newTimeSlider();
        },

        buildFormaSlider: function() {
            /*var incrementer = 0,
					baseYear = 13,
					labels = [],
					timeSlider,
					timeExtent,
					month;

			timeSlider = new TimeSlider({
				style: "width: 100%;",
				id: "formaSlider"
			}, dom.byId("formaAlertSlider"));

			timeExtent = new TimeExtent();

			timeSlider.setThumbCount(1);
			timeSlider.setThumbMovingRate(1500);
			timeSlider.setLoop(false); // Bug when true when it wraps around, it thinks its thumb
			// is still at the last index and does not know that its at 0 index

			domConstruct.destroy(registry.byId(timeSlider.nextBtn.id).domNode.parentNode);
      registry.byId(timeSlider.previousBtn.id).domNode.style.display = "none";
      registry.byId(timeSlider.playPauseBtn.id).domNode.style["vertical-align"] = "text-bottom";

      this.fetchFORMAAlertsLabels().then(function (res) {
      	if (res) {
      		for (var i = res.minValues[0], length = res.maxValues[0]; i <= length; i++) {
      			month = i % 12 === 0 ? 12 : i % 12;
      			labels.push(month + "-" + (baseYear + incrementer));
      			if (i % 12 === 0) { ++incrementer; }
      		}

      		timeExtent.startTime = new Date("1/1/2013 UTC");
      		timeExtent.endTime = new Date();
      		timeSlider.createTimeStopsByCount(timeExtent, res.maxValues[0]);
          timeSlider.setLabels(labels);
          timeSlider.setThumbIndexes([labels.length - 1]);
          timeSlider.startup();          
      	}

      	timeSlider.on("time-extent-change", function (evt) {
      		// These values are not updated immediately, call requestAnimationFrame 
      		// to execute on the next available frame

      		var values;
      		requestAnimationFrame(function () {
      			values = [0, timeSlider.thumbIndexes[0]];
      			LayerController.updateImageServiceRasterFunction(values, MapConfig.forma);
      		});
      	});

      });
*/

            $(".extra-controls2 #newSlider2").click(function() {
                play();
            });
            var $range2 = $(".gfw .toolbox .slider-container"),
                $from = $(".js-from"),
                $to = $(".js-to"),
                min = "1-13",
                max,
                from = "0",
                to;

            var incrementer = 0,
                baseYear = 13,
                labels3 = [],
                month;
            this.fetchFORMAAlertsLabels().then(function(res) {
                if (res) {
                    //console.log(res.maxValues[0] - res.minValues[0]);
                    to = res.maxValues[0] - res.minValues[0];
                    max = (to % 12 + 1) + "-" + (Math.floor(to / 12) + 13);
                    //console.log(max);

                    for (var i = res.minValues[0], length = res.maxValues[0]; i <= length; i++) {
                        month = i % 12 === 0 ? 12 : i % 12;
                        //console.log(month + "-" + (baseYear + incrementer));
                        if (i % 12 === 0) {
                            ++incrementer;
                        }
                    }
                } else {
                    console.log("fetching Forma labels failed!!");
                }
            });

            $("#master-layer-list > div > ul > li:nth-child(2)").click(function() {
                //console.log("in the Forma slider builder!");
                $("#playLine3").hide();
                $("#sliderProgressLine2").hide();
                var $this = $(this);
                setTimeout(function() { //TODO : Fix this 
                    ionCallback.call();
                }, 300);
                $("#irs-2 > span.irs > span.irs-to").css("left", "759px");
                $("#irs-2 > span.irs > span.irs-to").html(max);
            });

            var ionCallback = function() {
                $range2.ionRangeSlider({
                    type: "double",
                    min: min,
                    max: max,
                    from: from,
                    to: to,
                    playing: false,
                    prettify: false,
                    values: ["1-13", "2-13", "3-13", "4-13", "5-13", "6-13", "7-13",
                        "8-13", "9-13", "10-13", "11-13", "12-13", "1-14", "2-14",
                        "3-14", "4-14", "5-14", "6-14", "7-14", "8-14", "9-14"
                    ],
                    onChange: function(data) {
                        from = data.fromNumber;
                        to = data.toNumber;
                        updateValues();
                        if (from == to) {
                            $(".irs-single").hide();
                            $(".irs-to").show();
                        }
                        if (from == 19 && to == 20) {
                            $(".irs-single").hide();
                            $(".irs-from").show();
                        }
                        if (to == 20 && from != 20) {
                            $(".irs-diapason").css("width", "+=8px");
                        }
                        if (to == 20 && from == 20) {
                            $(".irs-diapason").css("width", "-=8px");
                            console.log("adding width!");
                        }
                        $("#range2").ionRangeSlider("update");
                        if ($range2.playing != true) {
                            $("#sliderProgressLine2").hide();
                            $("#playLine3").hide();
                            var values3 = [from, to];
                            for (var i = 1; i < 22; i++) {
                                var item2 = $(".container3 > div:nth-child(" + i + ")");

                                if ((i < from + 1) || (i > to)) {
                                    $(item2.selector).css("color", "grey");
                                    $(".container3 > div:nth-child(1)").css("color", "black");

                                } else {
                                    $(item2.selector).css("color", "#a1ba42");
                                }
                                if (from > 12 || to < 12) {
                                    $(".container3 > div:nth-child(13)").css("color", "black");
                                }
                                if (from == 1 && to == 19) {
                                    $(".container3 > div:nth-child(1)").css("color", "black");
                                }
                            }
                            console.log("Values to be used: " + values3[0] + " " + values3[1]);
                            LayerController.updateImageServiceRasterFunction(values3, MapConfig.forma);
                        }
                    },
                });
                $(".irs-slider.to").css("left", "790px");
                //var newYearPlacement = $(".container3 > div:nth-child(13)").css("left");
                //newYearPlacement -= 81.5px;
                //console.log(newYearPlacement);
                //$(".playLineFiller2 > div:nth-child(2)").css("margin-left", newYearPlacement);

                $(".slider-container").show();

                $("#formaAlertSlider").each(function() {
                    var node = this;
                    var sliderProgressLine2 = domConstruct.create("div", {
                        id: "sliderProgressLine2"
                    });
                    domConstruct.place(sliderProgressLine2, node, "after");

                    var playLine3 = domConstruct.create("div", {
                        id: "playLine3"
                    });
                    domConstruct.place(playLine3, node, "after");
                });

                $(".irs-single").hide();

                var sliderFrom = parseInt($("#irs-2 > span.irs > span.irs-from").css('left'));
                var sliderFrom2 = parseInt($("#irs-2 > span.irs > span.irs-slider.from.last").css('left'));

                var sliderDiff = 790 - sliderFrom2;
                if (isNaN(sliderFrom2) == true) {
                    console.log("using alternate");
                    sliderDiff = 790 - sliderFrom;
                }

                $(".irs-diapason").css("width", sliderDiff + "px");
                $(".irs-diapason").css("background-color", "#a1ba42");
                $(".container3 > div").css("color", "#a1ba42");

            };

            $from.on("change", function() {
                from = $(this).prop("value");
                if (from < min) {
                    from = min;
                }
                if (from > to) {
                    from = to;
                }
                updateValues();
                updateRange();
            });

            $to.on("change", function() {
                to = $(this).prop("value");
                if (to > max) {
                    to = max;
                }
                if (to < from) {
                    to = from;
                }
                updateValues();
                updateRange();
            });

            var updateRange = function() {
                $range2.ionRangeSlider("update", {
                    from: from,
                    to: to
                });
            };

            var updateValues = function() {
                $from.prop("value", from);
                $to.prop("value", to);
            };


            function play() {
                $("#playLine3").hide();
                $('#playLine3').css("left", "0");
                if ($range2.playing == true) {
                    $range2.playing = false;
                    $('#sliderProgressLine2').hide();
                    $("#newSlider2").html("&#9658");
                    return;
                }
                var initialDates = $range2[0].value.split(';');
                var thumbOne = initialDates[0];
                var thumbTwo = initialDates[1];
                var thumbOneInitial = thumbOne;

                var sliderStart3 = $("#irs-2 > span.irs > span.irs-slider.from.last").css("left");
                var sliderStart4 = $("#irs-2 > span.irs > span.irs-diapason").css("left");
                console.log(sliderStart3);
                console.log(sliderStart4);
                console.log('');

                $('#playLine3').css("left", sliderStart3);
                $('#sliderProgressLine2').css("left", sliderStart3);
                if (sliderStart3 == undefined) {
                    console.log("using #2!!");
                    $('#playLine3').css("left", sliderStart4);
                    $('#playLine3').css("left", "-=7.5pxpx");
                    $('#sliderProgressLine2').css("left", sliderStart4);
                    $('#sliderProgressLine2').css("left", "-=7.5px");
                }
                $('#playLine3').css("left", "+=53px");
                var months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

                var currentMonth = thumbOne % 12;
                var monthDisplay = months[currentMonth];

                $("#playLine3").html(monthDisplay);

                $("#playLine3").show();
                $('#sliderProgressLine2').css("left", "+=82px");

                $("#sliderProgressLine2").show();
                $('#sliderProgressLine2').css('display', 'block');

                console.log("Init: " + thumbOneInitial);
                if (thumbOne == thumbTwo) {
                    console.log("WE RETURNED IMMEDIETELY!");
                    console.log($range2);
                    $range2.playing = false;
                    return;
                }
                $range2.playing = true;
                $("#newSlider2").html("&#x25A0");

                var values = [thumbOneInitial, thumbOne];
                LayerController.updateImageServiceRasterFunction(values, MapConfig.forma);
                var playing = $range2.playing;
                var outer = setTimeout(function() {
                    timeout(from, thumbOne, thumbTwo, values, thumbOneInitial);
                }, 400);

                function timeout(from, thumbOne, thumbTwo, values, thumbOneInitial) {
                    if ($range2.playing == false) {
                        return;
                    }
                    months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

                    var monthNum = parseInt(thumbOne);
                    currentMonth = (monthNum + 1) % 12;
                    //currentMonth = (thumbOne + 1) % 12;
                    monthDisplay = months[currentMonth];
                    $("#playLine3").html(monthDisplay);
                    $('#playLine3').css("left", "+=39.5px");
                    $('#sliderProgressLine2').css("left", "+=39.5px");

                    console.log("Values to be used: " + values[0] + ", " + values[1]);
                    values[0] = parseInt(values[0]);
                    values[1] = parseInt(values[1]);

                    LayerController.updateImageServiceRasterFunction(values, MapConfig.forma);

                    var newDates = $range2[0].value.split(';');
                    var newThumbTwo = newDates[1];
                    thumbOne++;
                    values = [thumbOneInitial, thumbOne];

                    if (newThumbTwo > thumbTwo) {
                        thumbTwo = newThumbTwo;
                    }
                    if (thumbOne == thumbTwo || thumbOne == newThumbTwo || thumbOne > newThumbTwo) {
                        $("#newSlider2").html("&#9658");
                        $range2.playing = false;
                        console.log("Finito!");
                        return;
                    }
                    //from++;
                    if ($range2.playing == true) {
                        setTimeout(function() {
                            timeout(from, thumbOne, thumbTwo, values, thumbOneInitial);
                        }, 400);
                    }
                }
            }
        },

        buildTreeCoverChangeSlider: function() {
            /*// treeCoverLossSlider.baseYear & numYears
            console.log("STILL IN ORGINAL TREE COVER SLIDER??!")
            var sliderConfig = MapConfig.treeCoverLossSlider,
                labels = [],
                timeSlider,
                timeExtent;

            TimeSlider.prototype.onPlay = function() {
                alert("PLAY!");
            };

            timeSlider = new TimeSlider({
                style: "width: 100%;",
                id: "treeCoverSlider"
            }, dom.byId("treeCoverSlider"));


            timeExtent = new TimeExtent();

            timeSlider.setThumbCount(2);
            timeSlider.setThumbMovingRate(1500);
            timeSlider.setLoop(false); // Bug when true when it wraps around, it thinks its thumb
            // is still at the last index and does not know that its at 0 index

            domConstruct.destroy(registry.byId(timeSlider.nextBtn.id).domNode.parentNode);
            registry.byId(timeSlider.previousBtn.id).domNode.style.display = "none";
            registry.byId(timeSlider.playPauseBtn.id).domNode.style["vertical-align"] = "text-bottom";

            // Create Labels from Config file
            for (var i = 0, length = sliderConfig.numYears; i <= length; i++) {
                labels.push('' + (sliderConfig.baseYear + i));
            }

            timeExtent.startTime = new Date("1/1/2013 UTC");
            timeExtent.endTime = new Date();
            timeSlider.createTimeStopsByCount(timeExtent, labels.length);
            timeSlider.setLabels(labels);

            //timeSlider.setThumbIndexes([0,labels.length - 1]);
            timeSlider.setThumbIndexes([0, labels.length]);
            timeSlider.startup();

            timeSlider.on("play", function(evt) {

                var values;
                //console.log(timeSlider.domNode);
                console.log(timeSlider);

                var value1 = timeSlider.thumbIndexes[0];
                var value2 = timeSlider.thumbIndexes[1];
                //timeSlider.setThumbIndexes([value1,value2 - 1]);
                console.log("On initial Play, thumb 1 at: " + value1);
                console.log("On initial Play, thumb 2 at: " + value2);



                requestAnimationFrame(function() {
                    console.log(timeSlider);
                    console.log("First inside the animation frame; t2: " + value2);
                    values = [0, timeSlider.thumbIndexes[0]];
                    //timeSlider.setThumbIndexes([timeSlider.thumbIndexes[0],value2-1]);
                    console.log("Right afterwards, after we set the indexes: " + timeSlider.thumbIndexes[1]);
                    var index = timeSlider.thumbIndexes[0];
                    if (timeSlider.thumbIndexes[1] == 12) {
                        timeSlider.setThumbIndexes([value1, value2 - 1]);
                    }

                    function timeout(i) {
                        //console.log(timeSlider.playing);
                        // If play button is active, have 2 thumbs, & freeze the 2nd. When it isn't have 1 thumb 
                        // & adjust the #ticks count it can run and their values, and fake a 2nd slider!
                        // Then, when the time slider is no longer playing, re-initialize it at the current location. 
                        //console.log("Thumb 1 at: " + timeSlider.thumbIndexes[0]);
                        console.log("Thumb 2 at: " + timeSlider.thumbIndexes[1]);
                        var thumbOne = timeSlider.thumbIndexes[0];
                        var thumbTwo = timeSlider.thumbIndexes[1];
                        // Here I want a small edge case that handles if the user just presses play 1st; thumb1 is
                        // at 0 & thumb2 is at 13. I want it to go down to one thumb, and play IMMEDIETELY with no
                        // timeOut, THEN enter the timeOut function per usual w/ 1 thumb at ..1? 0? Idk. This if
                        // statement should also remove the need for the 2nd part of the else if below. I think.
                        if ((timeSlider.thumbIndexes[0] == 0 && timeSlider.thumbIndexes[1] == 13) || timeSlider.thumbIndexes[1] == 12) {
                            //console.log("Original state of slider case!");
                            //timeSlider.thumbIndexes.splice(1,1);
                            //timeSlider.setThumbCount(1);

                            timeSlider.setThumbIndexes([timeSlider.thumbIndexes[0], (11)]);
                            //timeSlider.play();
                        }

                        // First loop they both do, then neither, then just thumbIndexOne
                        setTimeout(function() {
                            if (timeSlider.playing == true) {

                                timeSlider.setThumbIndexes([timeSlider.thumbIndexes[0], (value2 - 1)]);

                            } else {
                                timeSlider.thumbIndexes[1]++;
                                console.log(timeSlider.thumbIndexes[1]);
                                return;
                            }

                            if (timeSlider.thumbIndexes[0] == value2) {
                                values = [0, timeSlider.thumbIndexes[0]];
                                LayerController.updateImageServiceRasterFunction(values, MapConfig.loss);
                                timeSlider.pause();

                                return;
                            } //else if (timeSlider.thumbIndexes[1] == 12) {
                            //console.log("Here we set #indexes to 1 and just continue on");
                            //timeSlider.thumbIndexes.splice(1,1);
                            //console.log("Down to one thumb here!");
                            //timeSlider.setThumbCount(1);
                            //console.log(timeSlider);
                            //console.log(timeSlider.playing);
                            //console.log("ARE WE EVER GETTING HERE??!");
                            //timeSlider.play();
                            //} else {
                            //FREEZE THUMB 2 IN PLACE & MAKE THUMB 1 STOP THERE
                            //Maybe call the updateImageServiceRasterFunction below w/o any params? (if I have to)

                            //}

                            //console.log("Map Config:");
                            //console.log(MapConfig);
                            values = [0, timeSlider.thumbIndexes[0]];

                            LayerController.updateImageServiceRasterFunction(values, MapConfig.loss);

                            console.log("Thumbs at: " + timeSlider.thumbIndexes[0] + " & " + timeSlider.thumbIndexes[1]);
                            i++;
                            console.log("i is: " + i);
 
                            //timeSlider.setThumbIndexes([timeSlider.thumbIndexes[0],(thumbTwo-1)]);
                            //timeSlider.setThumbIndexes([timeSlider.thumbIndexes[0],5]);
                            // Weird hitch one turn later where the first index doesn't increment...

                            console.log('');
                            timeout(i);
                        }, 1500);
                    }
                    timeout(index);

                    //LayerController.updateImageServiceRasterFunction(values, MapConfig.loss);
                });
            });
            timeSlider.on("pause", function(evt) {
                console.log("PAUUUSE!")
            });
            //timeSlider.on("previous", function (evt) { console.log("PREV!") });
            //timeSlider.on("next", function (evt) { console.log("NEXTTT!") });*/

        },

        newTimeSlider: function() {

            $(".extra-controls #newSlider").click(function() {
                play();
            });

            var $range = $(".js-range-slider"),
                $from = $(".js-from"),
                $to = $(".js-to"),
                min = 2001,
                max = 2012,
                from = 2001,
                to = 2012;

            //$("#master-layer-list > div > ul > li.layer-list-item.forest-change.active > div > span.radio-icon > span").click(function() {
            //$("#master-layer-list > div > ul > li:nth-child(1)").click(function() {
            $(".layer-list-item.forest-change").click(function() {
                //$(".layer-list-item.forest-change > ul > li").click(function() {
                var $this = $(this);
                ionCallback.call(this);
                console.log($("#irs-1 > span.irs > span.irs-to").css("left"));
                console.log("here we callback the Tree Cover Slider");
                //$(".irs-slider.to").css("left", "792px");
            });
            //$("#master-layer-list > div > ul > li.layer-list-item.forest-change.active > div > span.radio-icon > span").click(function() {
            $("#master-layer-list > div > ul > li.layer-list-item.forest-change.active > div").click(function() {
                var newLeft = $("#irs-1 > span.irs > span.irs-to").css("left");
                var newLeft2 = newLeft.slice(0, (newLeft.length - 2));
                newLeft2 *= 1;
                if (to == 2013) {
                    $(".irs-slider.to").css("left", "792px");
                } else if ($("#irs-1 > span.irs > span.irs-slider.to.last").css("left") == undefined) {
                    $("#irs-1 > span.irs > span.irs-slider.to").css("left", ((newLeft2 + 8) + 'px'));
                } else {

                    $("#irs-1 > span.irs > span.irs-slider.to.last").css("left", ((newLeft2 + 8) + 'px'));
                }
                console.log("here we resize and adjust the Tree Cover ");
            });

            var ionCallback = function() {
                $range.ionRangeSlider({
                    type: "double",
                    min: min,
                    max: max,
                    from: from,
                    to: to,
                    playing: false,
                    prettify: false,
                    //values: ["2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010","2011","2012"],
                    //hasGrid: true,
                    onChange: function(data) {
                        from = data.fromNumber;
                        to = data.toNumber;
                        //console.log(from + ", " + to);
                        updateValues();
                        if (from == to) {
                            $(".irs-to").show();
                        }
                        $(".irs-single").hide();
                        //$("#range").ionRangeSlider("update");
                        if ($range.playing != true) {
                            $("#sliderProgressLine").hide();
                            $("#playLine2").hide();
                            var values3 = [from - 2001, to - 2001];
                            //console.log(values3);
                            for (var i = 1; i < 12; i++) {
                                var item1 = $(".playLineFiller > div:nth-child(" + i + ")");
                                var item2 = $(".container2 > div:nth-child(" + i + ")");
                                //console.log(item1);
                                //console.log(item2);

                                if ((i <= from - 2000) || (i >= to - 2000)) {
                                    $(item1.selector).css("background-color", "transparent");
                                } else {
                                    $(item1.selector).css("background-color", "#a1ba42");
                                }
                                if ((i < from - 1999) || (i > to - 2000)) {
                                    $(item2.selector).css("color", "grey");
                                } else {
                                    $(item2.selector).css("color", "#a1ba42");
                                }
                            }
                            if (to != 2012) {
                                $(".container2 > div:nth-child(12)").css("color", "grey");
                            } else {
                                $(".container2 > div:nth-child(12)").css("color", "#a1ba42");
                            }

                            LayerController.updateImageServiceRasterFunction(values3, MapConfig.loss);
                        }
                    },
                });
                $(".container2 > div:first-child").css("color", "grey");
                $(".container2 > div:last-child").css("color", "grey");
                $("#range").ionRangeSlider("update");
                $("#playLine2").hide();
                $("#sliderProgressLine").hide();
                $(".irs-single").hide();

            };
            if (!sliderInit) {
                sliderInit = true;
                ionCallback();
                //$(".irs-slider.to").css("left", "792px");
                $(".irs-diapason").hide();



                $(".irs-diapason").css("background-color", "transparent");
                $(".irs-slider.from.last").each(function() {
                    var node = this;
                    var sliderProgressLine = domConstruct.create("div", {
                        id: "sliderProgressLine"
                    });
                    domConstruct.place(sliderProgressLine, node, "after");

                    var playLine2 = domConstruct.create("div", {
                        id: "playLine2"
                    });
                    domConstruct.place(playLine2, node, "after");
                });
                $(".irs-slider.to").css("left", "730px");

            }

            $from.on("change", function() {
                from = $(this).prop("value");
                if (from < min) {
                    from = min;
                }
                if (from > to) {
                    from = to;
                }
                updateValues();
                updateRange();
            });

            $to.on("change", function() {
                to = $(this).prop("value");
                if (to > max) {
                    to = max;
                }
                if (to < from) {
                    to = from;
                }
                updateValues();
                updateRange();
            });

            var updateRange = function() {
                $range.ionRangeSlider("update", {
                    from: from,
                    to: to
                });
            };

            var updateValues = function() {
                $from.prop("value", from);
                $to.prop("value", to);
            };


            function play() {
                //$(".playLine").hide();
                $("#sliderProgressLine").hide();
                $("#playLine2").hide();
                $('#playLine2').css("left", "0");
                $('#sliderProgressLine').css("left", "0");
                //console.log($range.playing);
                if ($range.playing == true) {
                    console.log("Here we must stop");
                    $range.playing = false;
                    $("#newSlider").html("&#9658");
                    return;
                }
                var initialDates = $range[0].value.split(';');
                var thumbOne = initialDates[0];
                var thumbTwo = initialDates[1];
                var thumbOneInitial = thumbOne;

                var sliderStart = $(".irs-slider.from.last").css("left");
                var sliderStart2 = $("#irs-1 > span.irs > span.irs-slider.from").css("left");

                console.log(sliderStart2);

                $('#playLine2').css("left", sliderStart);
                $('#sliderProgressLine').css("left", sliderStart);

                console.log(thumbOne);
                if (sliderStart == undefined || (sliderStart == "0px" && thumbOne != 2001)) {
                    console.log("using #2!!");
                    $('#playLine2').css("left", sliderStart2);
                    //$('#playLine2').css("left", "-=1px");
                    $('#sliderProgressLine').css("left", sliderStart2);
                    //$('#sliderProgressLine').css("left", "-=1px");
                }
                $('#playLine2').css("left", "-=21.5px");
                $("#playLine2").html(thumbOne);

                $("#playLine2").show();
                $('#sliderProgressLine').css("left", "+=7.5px");
                $("#sliderProgressLine").show();

                console.log("Init: " + thumbOneInitial);
                if (thumbOne == thumbTwo) {
                    console.log("WE RETURNED IMMEDIETELY!");
                    $range.playing = false;
                    return;
                }

                $range.playing = true;
                $("#newSlider").html("&#x25A0");

                var values = [thumbOneInitial - 2001, thumbOne - 2001];

                var playing = $range.playing;
                var outer = setTimeout(function() {
                    timeout(from, thumbOne, thumbTwo, values, thumbOneInitial);
                }, 750);

                function timeout(from, thumbOne, thumbTwo, values, thumbOneInitial) {
                    if ($range.playing == false) {
                        return;
                    }

                    //console.log($("#sliderProgressLine").css("left"));
                    $('#playLine2').css("left", "+=66.5px");

                    $('#sliderProgressLine').css("left", "+=66.5px");


                    LayerController.updateImageServiceRasterFunction(values, MapConfig.loss);
                    // 		$range.ionRangeSlider("update", {
                    //     from: from + 1
                    // });
                    var newDates = $range[0].value.split(';');
                    var newThumbTwo = newDates[1];

                    thumbOne++;
                    $("#playLine2").html(thumbOne);
                    //values = [0,thumbOne-2000];
                    console.log("Start: " + thumbOneInitial);
                    console.log("End: " + thumbOne);
                    values = [thumbOneInitial - 2001, thumbOne - 2001];

                    if (newThumbTwo > thumbTwo) {
                        thumbTwo = newThumbTwo;
                    }
                    if (thumbOne == thumbTwo || thumbOne == newThumbTwo || thumbOne > newThumbTwo) {
                        if (values[1] - values[0] > 8) {
                            $('#playLine2').css("left", "-=2px");
                            $('#sliderProgressLine').css("left", "-=2px");
                        } else if (values[1] - values[0] > 4) {
                            $('#playLine2').css("left", "-=1x");
                            $('#sliderProgressLine').css("left", "-=1px");
                        }


                        $("#newSlider").html("&#9658");
                        $range.playing = false;
                        console.log("Finito!");
                        return;
                    }
                    //from++;
                    if ($range.playing == true) {
                        setTimeout(function() {
                            timeout(from, thumbOne, thumbTwo, values, thumbOneInitial);
                        }, 750);
                    }
                }
            }
        },


        fetchFORMAAlertsLabels: function() {
            var deferred = new Deferred(),
                req;

            req = request({
                url: MapConfig.forma.url,
                content: {
                    "f": "pjson"
                },
                handleAs: "json",
                callbackParamName: "callback"
            });

            req.then(function(res) {
                deferred.resolve(res);
            }, function(err) {
                console.error(err);
                deferred.resolve(false);
            });

            return deferred.promise;
        },

        toggleLegendContainer: function() {
            var node = dom.byId("legend-container"),
                height = node.offsetHeight === 280 ? 30 : 280;

            Fx.animateProperty({
                node: node,
                properties: {
                    height: height
                },
                duration: 500,
                onEnd: function() {
                    if (height === 30) {
                        domClass.add("legend-title", "closed");
                    } else {
                        domClass.remove("legend-title", "closed");
                    }
                }
            }).play();
        },

        generateSuitabilitySliders: function() {

            //var accordion = new Accordion({}, "suitability-accordion"),
            //var	self = this;

            // accordion.addChild(new ContentPane({
            // 	title: "Environmental"
            // }, "environmental-criteria"));

            // accordion.addChild(new ContentPane({
            // 	title: "Crop"
            // }, "crop-criteria"));

            // accordion.startup();
            this.createCheckboxDijits();
            this.createRangeSliders();

            // Listen for the accordion to change, then resize the sliders
            // accordion.watch('selectedChildWidget', function (name, oldVal, newVal) {
            // 	self.resizeRangeSliders();
            // });
        },

        createCheckboxDijits: function() {
            var checkbox;
            arrayUtils.forEach(MapConfig.checkboxItems, function(item) {
                checkbox = new Checkbox({
                    name: item.name,
                    value: item.value,
                    checked: item.checked,
                    onChange: function() {
                        LayerController.updateCustomSuitabilityLayer(null, item.name);
                    }
                }, item.node);
            });
        },

        createRangeSliders: function() {
            var sliderConfig = MapConfig.suitabilitySliderTooltips;
            // jQuery Shim To Allow Older Plugin to Work Correctly with new Version of JQuery
            jQuery.browser = {};
            (function() {
                jQuery.browser.msie = false;
                jQuery.browser.version = 0;
                if (navigator.userAgent.match(/MSIE ([0-9]+)\./)) {
                    jQuery.browser.msie = true;
                    jQuery.browser.version = RegExp.$1;
                }
            })();
            // Peat Depth
            jq171("#peat-depth-slider").rangeSlider({
                defaultValues: {
                    min: 0,
                    max: 6
                },
                valueLabels: 'change',
                bounds: {
                    min: 0,
                    max: 6
                },
                step: 1,
                arrows: false,
                formatter: function(val) {
                    return sliderConfig.peat[val];
                }
            });
            jq171("#peat-depth-slider").addClass("singleValueSlider reverseSlider");
            jq171("#peat-depth-slider").bind('valuesChanged', function(e, data) {
                LayerController.updateCustomSuitabilityLayer(data.values.min, 'peat-depth-slider');
            });
            // Conservation Area Buffers
            jq171("#conservation-area-slider").rangeSlider({
                defaultValues: {
                    min: 1000,
                    max: 5000
                },
                valueLabels: 'change',
                bounds: {
                    min: 500,
                    max: 5000
                },
                step: 1,
                arrows: false,
                formatter: function(val) {
                    return val + " m";
                }
            });
            jq171("#conservation-area-slider").addClass("singleValueSlider");
            jq171("#conservation-area-slider").bind('valuesChanged', function(e, data) {
                LayerController.updateCustomSuitabilityLayer(data.values.min, 'conservation-area-slider');
            });
            // Water Resource Buffers
            jq171("#water-resource-slider").rangeSlider({
                defaultValues: {
                    min: 100,
                    max: 1000
                },
                valueLabels: 'change',
                bounds: {
                    min: 50,
                    max: 1000
                },
                step: 1,
                arrows: false,
                formatter: function(val) {
                    return val + " m";
                }
            });
            jq171("#water-resource-slider").addClass("singleValueSlider");
            jq171("#water-resource-slider").bind('valuesChanged', function(e, data) {
                LayerController.updateCustomSuitabilityLayer(data.values.min, 'water-resource-slider');
            });
            // Slope
            jq171("#slope-slider").rangeSlider({
                defaultValues: {
                    min: 30,
                    max: 80
                },
                valueLabels: 'change',
                bounds: {
                    min: 0,
                    max: 80
                },
                step: 1,
                arrows: false,
                formatter: function(val) {
                    return val + "%";
                }
            });
            jq171("#slope-slider").addClass("singleValueSlider reverseSlider");
            jq171("#slope-slider").bind('valuesChanged', function(e, data) {
                LayerController.updateCustomSuitabilityLayer(data.values.min, 'slope-slider');
            });
            // Elevation
            jq171("#elevation-slider").rangeSlider({
                defaultValues: {
                    min: 1000,
                    max: 5000
                },
                valueLabels: 'hide',
                bounds: {
                    min: 0,
                    max: 5000
                },
                step: 1,
                arrows: false,
                formatter: function(val) {
                    return val + "m";
                }
            });
            jq171("#elevation-slider").addClass("singleValueSlider reverseSlider");
            jq171("#elevation-slider").bind('valuesChanged', function(e, data) {
                LayerController.updateCustomSuitabilityLayer(data.values.min, 'elevation-slider');
            });
            // Rainfall
            jq171("#rainfall-slider").rangeSlider({
                defaultValues: {
                    min: 1500,
                    max: 6000
                },
                valueLabels: 'hide',
                bounds: {
                    min: 1500,
                    max: 6000
                },
                step: 1,
                arrows: false,
                formatter: function(val) {
                    return val + " " + sliderConfig.rainfall.label;
                }
            });
            jq171("#rainfall-slider").addClass("narrowTooltips");
            jq171("#rainfall-slider").bind('valuesChanged', function(e, data) {
                LayerController.updateCustomSuitabilityLayer(
                    [data.values.min, data.values.max],
                    'rainfall-slider'
                );
            });
            // Soil Drainage
            jq171("#soil-drainage-slider").rangeSlider({
                defaultValues: {
                    min: 2,
                    max: 4
                },
                valueLabels: 'hide',
                bounds: {
                    min: 1,
                    max: 4
                },
                step: 1,
                arrows: false,
                formatter: function(val) {
                    return sliderConfig.drainage[val];
                }
            });
            jq171("#soil-drainage-slider").addClass("narrowTooltips");
            jq171("#soil-drainage-slider").bind('valuesChanged', function(e, data) {
                LayerController.updateCustomSuitabilityLayer(
                    [data.values.min, data.values.max],
                    'soil-drainage-slider'
                );
            });
            // Soil Depth
            jq171("#soil-depth-slider").rangeSlider({
                defaultValues: {
                    min: 3,
                    max: 7
                },
                valueLabels: 'hide',
                bounds: {
                    min: 1,
                    max: 7
                },
                step: 1,
                arrows: false,
                formatter: function(val) {
                    return sliderConfig.depth[val];
                }
            });
            jq171("#soil-depth-slider").addClass("singleValueSlider narrowTooltips");
            jq171("#soil-depth-slider").bind('valuesChanged', function(e, data) {
                LayerController.updateCustomSuitabilityLayer(data.values.min, 'soil-depth-slider');
            });
            // Soil Acidity
            jq171("#soil-acid-slider").rangeSlider({
                defaultValues: {
                    min: 1,
                    max: 7
                },
                valueLabels: 'change',
                bounds: {
                    min: 1,
                    max: 8
                },
                step: 1,
                arrows: false,
                formatter: function(val) {
                    return sliderConfig.acidity[val];
                }
            });
            jq171("#soil-acid-slider").addClass("narrowTooltips");
            jq171("#soil-acid-slider").bind('valuesChanged', function(e, data) {
                LayerController.updateCustomSuitabilityLayer(
                    [data.values.min, data.values.max],
                    'soil-acid-slider'
                );
            });
            // Newest Version of Sliders has a css bug, this is a hack to hide it
            // May need to switch to ion sliders instead in future and remove older version 
            // of jQuery
            dojoQuery('.ui-rangeSlider-innerBar').forEach(function(node) {
                domConstruct.create('div', {
                    'class': 'slider-bar-blocker'
                }, node, 'after');
            });

        },

        resetSuitabilitySettings: function() {
            // Reset Sliders
            jq171('#peat-depth-slider').rangeSlider('values', 0, 6);
            jq171('#conservation-area-slider').rangeSlider('values', 1000, 5000);
            jq171('#water-resource-slider').rangeSlider('values', 100, 1000);
            jq171('#slope-slider').rangeSlider('values', 30, 80);
            jq171('#elevation-slider').rangeSlider('values', 1000, 5000);
            jq171('#rainfall-slider').rangeSlider('values', 1500, 6000);
            jq171('#soil-drainage-slider').rangeSlider('values', 2, 4);
            jq171('#soil-depth-slider').rangeSlider('values', 3, 7);
            jq171('#soil-acid-slider').rangeSlider('values', 1, 7);
            this.resizeRangeSliders();
            // Reset Checkboxes
            var cb;
            arrayUtils.forEach(MapConfig.checkboxItems, function(item) {
                cb = registry.byId(item.node);
                if (cb) {
                    cb.set('checked', item.checked);
                }
            });
        },

        resizeRangeSliders: function() {
            /* Do the Following for Each Slider
			 - Hide the labels 
			 - resize the slider
			 - reactivate the listeners to show labels
			*/
            jq171("#peat-depth-slider").rangeSlider('option', 'valueLabels', 'hide');
            jq171("#conservation-area-slider").rangeSlider('option', 'valueLabels', 'hide');
            jq171("#water-resource-slider").rangeSlider('option', 'valueLabels', 'hide');
            jq171("#slope-slider").rangeSlider('option', 'valueLabels', 'hide');
            jq171("#elevation-slider").rangeSlider('option', 'valueLabels', 'hide');
            jq171("#rainfall-slider").rangeSlider('option', 'valueLabels', 'hide');
            jq171("#soil-drainage-slider").rangeSlider('option', 'valueLabels', 'hide');
            jq171("#soil-depth-slider").rangeSlider('option', 'valueLabels', 'hide');
            jq171("#soil-acid-slider").rangeSlider('option', 'valueLabels', 'hide');

            jq171("#peat-depth-slider").rangeSlider('resize');
            jq171("#conservation-area-slider").rangeSlider('resize');
            jq171("#water-resource-slider").rangeSlider('resize');
            jq171("#slope-slider").rangeSlider('resize');
            jq171("#elevation-slider").rangeSlider('resize');
            jq171("#rainfall-slider").rangeSlider('resize');
            jq171("#soil-drainage-slider").rangeSlider('resize');
            jq171("#soil-depth-slider").rangeSlider('resize');
            jq171("#soil-acid-slider").rangeSlider('resize');

            jq171("#peat-depth-slider").rangeSlider('option', 'valueLabels', 'change');
            jq171("#conservation-area-slider").rangeSlider('option', 'valueLabels', 'change');
            jq171("#water-resource-slider").rangeSlider('option', 'valueLabels', 'change');
            jq171("#slope-slider").rangeSlider('option', 'valueLabels', 'change');
            jq171("#elevation-slider").rangeSlider('option', 'valueLabels', 'change');
            jq171("#rainfall-slider").rangeSlider('option', 'valueLabels', 'change');
            jq171("#soil-drainage-slider").rangeSlider('option', 'valueLabels', 'change');
            jq171("#soil-depth-slider").rangeSlider('option', 'valueLabels', 'change');
            jq171("#soil-acid-slider").rangeSlider('option', 'valueLabels', 'change');

        }

    };

});