define([
  "dojo/on",
  "map/config",
  "map/LayerController"
], function (on, MapConfig, LayerController) {
  "use strict";

  var playInterval,
      playButton,
      lossSlider;

  var config = {
    containerId: "treecover_change_toolbox",
    values: [2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014],
    sliderSelector: '#loss-range-slider',
    baseValue: 2001,
    playHtml: "&#9658;",
    pauseHtml: "&#x25A0"
  };

  var state = {
    isPlaying: false
  };

  var LossSliderController = {

    init: function () {
      var self = this;
      if (lossSlider === undefined) {
        // Initialize the slider
        $(config.sliderSelector).ionRangeSlider({
          type: "double",
					values: config.values,
          grid: true,
          hide_min_max: true,
          hide_from_to: true,
          prettify_enabled: false,
					onFinish: self.change,
          onUpdate: self.change
				});
        // Save this instance to a variable ???
        lossSlider = $(config.sliderSelector).data("ionRangeSlider");
        // Cache query for play button
        playButton = $("#lossPlayButton");
        // Attach Events related to this item
        on(playButton, "click", self.playToggle);
      }

    },

    /**
    * Called when the user drags a thumb on the slider or update is called programmatically
    */
    change: function (data) {
      LayerController.updateImageServiceRasterFunction([data.from, data.to], MapConfig.loss);
    },

    playToggle: function () {
      var fromValue, toValue, endValue;

      function stopPlaying() {
        state.isPlaying = false;
        clearInterval(playInterval);
        playButton.html(config.playHtml);
      };

      if (state.isPlaying) {
        stopPlaying();
      } else {
        // Update some state
        state.isPlaying = true;
        endValue = lossSlider.result.to;
        // Trigger a change on the layer for the initial value, with both handles starting at the same point
        lossSlider.update({ from: lossSlider.result.from, to: lossSlider.result.from });
        // Start the interval
        playInterval = setInterval(function () {
          // We will be incrementing the from value to move the slider forward
          fromValue = lossSlider.result.from;
          toValue = lossSlider.result.to;
          // Quit if from value is equal to or greater than the to value
          if (toValue >= endValue) {
            stopPlaying();
          } else {
            // Update the slider
            lossSlider.update({
              from: fromValue,
              to: ++toValue
            });
          }

        }, 1250);

        // Update the button html
        playButton.html(config.pauseHtml);
      }


    }

  };

  return LossSliderController;

});
