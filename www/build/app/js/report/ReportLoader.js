/*! Global-Forest-Watch-Commodities - v2.0.0 - 2016-04-26/ */!function(a,b){"use strict";function c(){a.dojoConfig=g;for(var b=0,c=e.length;c>b;b++)i(e[b]);for(var f=0,j=d.length;j>f;f++)h(d[f])}var d=["http://js.arcgis.com/3.13/"],e=["http://js.arcgis.com/3.13/esri/css/esri.css","http://js.arcgis.com/3.13/dijit/themes/tundra/tundra.css","../../css/report.css"],f=location.pathname.replace(/app\/js\/report.*/,"")+"app",g={parseOnLoad:!1,isDebug:!1,async:!0,packages:[{name:"libs",location:f+"/libs"},{name:"report",location:f+"/js/report"},{name:"map",location:f+"/js/map"},{name:"components",location:f+"/js/components"},{name:"utils",location:f+"/js/utils"}],aliases:[["knockout","libs/knockout-3.1.0"],["dom-style","dojo/dom-style"],["dom-class","dojo/dom-class"],["topic","dojo/topic"],["dom","dojo/dom"],["on","dojo/on"]],deps:["dojo/domReady!"],callback:function(){require(["report/reportBundle"])}},h=function(a,c){var d=b.createElement("script");d.setAttribute("src",a);for(var e in c)c.hasOwnProperty(e)&&d.setAttribute(e,c[e]);b.getElementsByTagName("body")[0].appendChild(d)},i=function(a){var c=b.createElement("link");c.setAttribute("rel","stylesheet"),c.setAttribute("type","text/css"),c.setAttribute("href",a),b.getElementsByTagName("head")[0].appendChild(c)};a.arrayFromBounds=function(a){var b=[],c=a[0],d=a[1];for(c;d>=c;c++)b.push(c);return b},a.arrayChunk=function(a,b){var c=[],d=0;for(d;d<a.length;d+=b)c.push(a.slice(d,d+b));return c},a.requestAnimationFrame=function(){return a.requestAnimationFrame||a.webkitRequestAnimationFrame||a.mozRequestAnimationFrame||a.oRequestAnimationFrame||a.msRequestAnimationFrame}(),"loaded"===b.readyState?c():a.onload=c}(window,document);