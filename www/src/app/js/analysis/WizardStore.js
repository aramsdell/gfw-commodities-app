define([
	'lodash'
], function (_) {
	'use strict';

	var Callbacks = {};
	var Store = {};

	/**
	* Expected items so far in the store
	* If you add new keys to the store, place them in the list below to help developers know what data will be available
	* 
	* @property {object|array} analysisArea 		- Is a Feature or Array of Features
	* @property {number} userStep								- User's current step in the Wizard, a number 0 -3( or 4)
	* @property {string} areaOfInterest 				- Option chosen in step one of Wizard, will be an ID for a radio button of selected option 
	* @property {object} analysisSets						- Object containing keywords of types of analysis to perform and boolean indicating if it is included in analysis
	* @property {string} optionalAnalysisLabel  - Label to be used when multiple features are selected
	* @property {array} customFeatures					- Array of Graphic objects (points & polygons)
	*/

	var Interface = {

		/**
		* @param {string} key - key of item in store
		*/
		get: function (key) {
			return _.clone(Store[key]);
		},

		/**
		* @param {string} key - key of item in store
		* @param {string} vaule - Item to save in store
		*/
		set: function (key, value) {
			Store[key] = value;
			this.updateSubscribers(key);
		},

		appendArray: function (key, items) {
			if (!Object.prototype.toString.call( Store[key] ) === "[object Array]") {
				throw new Error('Type Error: Key is not mapped to an Array');
			}

			if (Object.prototype.toString.call( items ) === "[object Array]") {
				Store[key] = Store[key].concat(items);
				this.updateSubscribers(key);
			} else {
				Store[key].push(items);
				this.updateSubscribers(key);
			}

		},

		/**
		* @param {string} key - key of item in Callbacks
		* @param {function} callback - callback to trigger on update of store
		*/
		registerCallback: function (key, callback) {
			if (Callbacks[key]) {
				Callbacks[key].push(callback);
			} else {
				Callbacks[key] = [];
				Callbacks[key].push(callback);
			}
		},

		/**
		* @param {string} key - key of Callbacks to invoke
		*/
		updateSubscribers: function (key) {
			var callbacks = Callbacks[key];
			if (callbacks) {
				callbacks.forEach(function (func) {
					func();
				});
			}
		},

		/**
		* log the store to the console so I can inspect it in the app
		*/
		debug: function () {
			console.dir(Store);
		}

	};

	return Interface;

});