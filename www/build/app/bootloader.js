/*! Global-Forest-Watch-Commodities - v2.0.0 - 2015-12-03/ */!function(a,b){"use strict";var c="2.5.5",d=location.pathname.replace(/\/[^/]+$/,"")+"app",e={parseOnLoad:!1,isDebug:!1,async:!0,cacheBust:"v="+c,packages:[{name:"js",location:d+"/js"},{name:"php",location:d+"/php"},{name:"main",location:d+"/js/main"},{name:"models",location:d+"/js/models"},{name:"utils",location:d+"/js/utils"},{name:"report",location:d+"/js/report"},{name:"actions",location:d+"/js/actions"},{name:"analysis",location:d+"/js/analysis"},{name:"templates",location:d+"/templates"},{name:"components",location:d+"/js/components"},{name:"controllers",location:d+"/js/controllers"},{name:"map",location:d+"/js/map"},{name:"libs",location:d+"/libs"}],aliases:[["knockout","libs/knockout-3.1.0/index"],["react","libs/react/react.min"],["lodash","libs/lodash/lodash.min"]],deps:["dojo/domReady!"],callback:function(){require(["js/bundle"])}},f=["http://js.arcgis.com/3.13/","app/libs/jquery-1.7.1.min.js","app/libs/jquery-ui-custom.min.js","app/libs/jQAllRangeSliders-min.js"],g=[{src:"app/css/app.css",cdn:!1},{src:"http://js.arcgis.com/3.10/js/esri/css/esri.css",cdn:!0},{src:"http://js.arcgis.com/3.10/js/dojo/dijit/themes/tundra/tundra.css",cdn:!0}],h=function(a,c){var d=b.createElement("script"),e=b.getElementsByTagName("head")[0];d.src=a,d.async=c,e.appendChild(d)},i=function(a,d){var e=b.createElement("link"),f=d?a:a+"?v="+c,g=b.getElementsByTagName("head")[0];e.rel="stylesheet",e.type="text/css",e.href=f,e.media="only x",g.appendChild(e),setTimeout(function(){e.media="all"})},j=function(){a.dojoConfig=e;for(var b=0,c=g.length;c>b;b++)i(g[b].src,g[b].cdn);for(var d=0,j=f.length;j>d;d++)h(f[d],!1)};a.requestAnimationFrame=function(){return a.requestAnimationFrame||a.webkitRequestAnimationFrame||a.mozRequestAnimationFrame||a.oRequestAnimationFrame||a.msRequestAnimationFrame}(),a.requestAnimationFrame?a.requestAnimationFrame(j):"loaded"===b.readyState?j():a.onload=j}(window,document);