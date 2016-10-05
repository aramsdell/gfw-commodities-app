//>>built
define("esri/tasks/NARouteSharing","dojo/_base/declare dojo/json dojo/Deferred dojo/_base/lang dojo/i18n!../nls/jsapi dojo/number ../request ../renderers/SimpleRenderer ../renderers/UniqueValueRenderer ../symbols/PictureMarkerSymbol ../symbols/SimpleMarkerSymbol ../symbols/SimpleLineSymbol ../arcgis/Portal ../tasks/RouteParameters ../tasks/RouteResult ../SpatialReference ../tasks/FeatureSet ../tasks/GeometryService ../tasks/ProjectParameters".split(" "),function(H,v,r,h,p,I,w,x,J,t,E,F,K,L,M,G,N,
O,P){return H(null,{declaredClass:"esri.tasks.NARouteSharing",portal:null,firstStopSymbol:{angle:0,xoffset:0,yoffset:9,type:"esriPMS",width:17,height:24,imageData:"PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMjkiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHJhZGlhbEdyYWRpZW50IGlkPSJzdmdfMyIgc3ByZWFkTWV0aG9kPSJwYWQiIGN4PSIwLjM4MTUzIiBjeT0iMC4yOTY4OCIgcj0iMC41Ij48c3RvcCBzdG9wLWNvbG9yPSIjNmJjMjc4IiBzdG9wLW9wYWNpdHk9IjAuOTg4MjgxIiBvZmZzZXQ9IjAiLz48c3RvcCBzdG9wLWNvbG9yPSIjMmU5ZjNkIiBzdG9wLW9wYWNpdHk9IjAuOTkyMTg4IiBvZmZzZXQ9IjEiLz48L3JhZGlhbEdyYWRpZW50PjwvZGVmcz48Zz48ZyBzdHJva2U9Im51bGwiIGlkPSJzdmdfMSI+PHBhdGggc3Ryb2tlPSIjMWM1ZTI0IiBzdHJva2Utb3BhY2l0eT0iMC43IiBmaWxsPSJ1cmwoI3N2Z18zKSIgc3Ryb2tlLWxpbmVqb2luPSJudWxsIiBzdHJva2UtbGluZWNhcD0ibnVsbCIgZD0ibTAuNTYyMTIsMTAuNjM0NTIxYzAsLTUuNTY0OSA0LjQ1NjcxMSwtMTAuMDcyNDYgOS45NTg4MjgsLTEwLjA3MjQ2YzUuNTAyMTA2LDAgOS45NTg4MjgsNC41MDc1NyA5Ljk1ODgyOCwxMC4wNzI0NmMwLDIuNzgyNDUgLTEuMTE0MTgsNS4zMDA1NyAtMi45MTYxMTYsNy4xMjMwNzNjLTAuOTAwOTY4LDAuOTExMjQ2IC0yLjk0MDQwOCwyLjI2NjE2MSAtNC43NDEzNDgsNC43MTI0NWMtMS44MDA5MjksMi40NDYyODkgLTIuMTkxMDQzLDYuMDM2ODc1IC0yLjI0NTYxNSw2LjAzNDUxNWMtMC4wNTQ1NjIsLTAuMDAyMzYgLTAuOTg1NzY3LC0zLjc3MjU1NCAtMi41OTczMzEsLTYuMTkzMzY1Yy0xLjYxMTU4NCwtMi40MjA4MSAtMy42MDAxNDEsLTMuNjQyMzU0IC00LjUwMTEwOSwtNC41NTM2Yy0xLjgwMTk0NiwtMS44MjI1MDIgLTIuOTE2MTE2LC00LjM0MDYyMyAtMi45MTYxMTYsLTcuMTIzMDczbDAsMGwtMC4wMDAwMjEsMHoiIGlkPSJzdmdfMiIvPjwvZz48ZWxsaXBzZSByeT0iNCIgcng9IjQiIGlkPSJzdmdfODciIGN5PSIxMC4zNDM3NSIgY3g9IjEwLjUiIHN0cm9rZS1vcGFjaXR5PSJudWxsIiBzdHJva2Utd2lkdGg9Im51bGwiIHN0cm9rZT0iIzFjNWUyNCIgZmlsbD0iI2ZmZmZmZiIvPjwvZz48L3N2Zz4\x3d",
contentType:"image/svg+xml"},interimStopSymbol:{angle:0,xoffset:0,yoffset:9,type:"esriPMS",width:17,height:24,imageData:"PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMjkiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+DQogPGRlZnM+DQogIDxyYWRpYWxHcmFkaWVudCBpZD0ic3ZnXzMiIHNwcmVhZE1ldGhvZD0icGFkIiBjeD0iMC4zODE1MyIgY3k9IjAuMjk2ODgiIHI9IjAuNSI+DQogICA8c3RvcCBzdG9wLWNvbG9yPSIjNjdBN0U0IiBzdG9wLW9wYWNpdHk9IjAuOTg4MjgxIiBvZmZzZXQ9IjAiLz4NCiAgIDxzdG9wIHN0b3AtY29sb3I9IiMxQjgxRDIiIHN0b3Atb3BhY2l0eT0iMC45OTIxODgiIG9mZnNldD0iMSIvPg0KICA8L3JhZGlhbEdyYWRpZW50Pg0KIDwvZGVmcz4NCiA8Zz4NCiAgPHRpdGxlPjE8L3RpdGxlPg0KICA8ZyBzdHJva2U9Im51bGwiIGlkPSJzdmdfMSI+DQogICA8cGF0aCBzdHJva2U9IiMxYzVlMjQiIHN0cm9rZS1vcGFjaXR5PSIwLjciIGZpbGw9InVybCgjc3ZnXzMpIiBzdHJva2UtbGluZWpvaW49Im51bGwiIHN0cm9rZS1saW5lY2FwPSJudWxsIiBkPSJtMC41NjIxMiwxMC42MzQ1MjFjMCwtNS41NjQ5IDQuNDU2NzExLC0xMC4wNzI0NiA5Ljk1ODgyOCwtMTAuMDcyNDZjNS41MDIxMDYsMCA5Ljk1ODgyOCw0LjUwNzU3IDkuOTU4ODI4LDEwLjA3MjQ2YzAsMi43ODI0NSAtMS4xMTQxOCw1LjMwMDU3IC0yLjkxNjExNiw3LjEyMzA3M2MtMC45MDA5NjgsMC45MTEyNDYgLTIuOTQwNDA4LDIuMjY2MTYxIC00Ljc0MTM0OCw0LjcxMjQ1Yy0xLjgwMDkyOSwyLjQ0NjI4OSAtMi4xOTEwNDMsNi4wMzY4NzUgLTIuMjQ1NjE1LDYuMDM0NTE1Yy0wLjA1NDU2MiwtMC4wMDIzNiAtMC45ODU3NjcsLTMuNzcyNTU0IC0yLjU5NzMzMSwtNi4xOTMzNjVjLTEuNjExNTg0LC0yLjQyMDgxIC0zLjYwMDE0MSwtMy42NDIzNTQgLTQuNTAxMTA5LC00LjU1MzZjLTEuODAxOTQ2LC0xLjgyMjUwMiAtMi45MTYxMTYsLTQuMzQwNjIzIC0yLjkxNjExNiwtNy4xMjMwNzNsMCwwbC0wLjAwMDAyMSwweiIgaWQ9InN2Z18yIi8+DQogIDwvZz4NCiA8L2c+DQo8L3N2Zz4NCg\x3d\x3d",
contentType:"image/svg+xml"},lastStopSymbol:{angle:0,xoffset:0,yoffset:9,type:"esriPMS",width:17,height:24,imageData:"PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMjkiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHJhZGlhbEdyYWRpZW50IHI9IjAuNSIgY3k9IjAuMzU1NDciIGN4PSIwLjMzMjAzIiBzcHJlYWRNZXRob2Q9InBhZCIgaWQ9InN2Z182Ij48c3RvcCBvZmZzZXQ9IjAiIHN0b3Atb3BhY2l0eT0iMC45OTYwOSIgc3RvcC1jb2xvcj0iI2U0ODY2NyIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1vcGFjaXR5PSIwLjk5NjA5IiBzdG9wLWNvbG9yPSIjYzkzYTE2Ii8+PC9yYWRpYWxHcmFkaWVudD48L2RlZnM+PGc+PGcgc3Ryb2tlPSJudWxsIiBpZD0ic3ZnXzEiPjxwYXRoIHN0cm9rZT0iIzg0MjMwYSIgc3Ryb2tlLW9wYWNpdHk9IjAuNyIgZmlsbD0idXJsKCNzdmdfNikiIHN0cm9rZS1saW5lam9pbj0ibnVsbCIgc3Ryb2tlLWxpbmVjYXA9Im51bGwiIGQ9Im0wLjU2MjEyLDEwLjYzNDUyYzAsLTUuNTY0OSA0LjQ1NjcxLC0xMC4wNzI0NiA5Ljk1ODgzLC0xMC4wNzI0NmM1LjUwMjEsMCA5Ljk1ODgzLDQuNTA3NTcgOS45NTg4MywxMC4wNzI0NmMwLDIuNzgyNDUgLTEuMTE0MTgsNS4zMDA1NyAtMi45MTYxMiw3LjEyMzA3Yy0wLjkwMDk3LDAuOTExMjUgLTIuOTQwNDEsMi4yNjYxNiAtNC43NDEzNSw0LjcxMjQ1Yy0xLjgwMDkzLDIuNDQ2MjkgLTIuMTkxMDQsNi4wMzY4OCAtMi4yNDU2MSw2LjAzNDUyYy0wLjA1NDU2LC0wLjAwMjM2IC0wLjk4NTc3LC0zLjc3MjU2IC0yLjU5NzMzLC02LjE5MzM3Yy0xLjYxMTU5LC0yLjQyMDgxIC0zLjYwMDE0LC0zLjY0MjM1IC00LjUwMTExLC00LjU1MzZjLTEuODAxOTUsLTEuODIyNSAtMi45MTYxMiwtNC4zNDA2MiAtMi45MTYxMiwtNy4xMjMwN2wwLDBsLTAuMDAwMDIsMHoiIGlkPSJzdmdfMiIvPjwvZz48cmVjdCBpZD0ic3ZnXzkiIGhlaWdodD0iOCIgd2lkdGg9IjgiIHk9IjYuNSIgeD0iNi40OSIgc3Ryb2tlLW9wYWNpdHk9Im51bGwiIHN0cm9rZS13aWR0aD0ibnVsbCIgc3Ryb2tlPSIjODQyMzBhIiBmaWxsPSIjZmZmZmZmIi8+PC9nPjwvc3ZnPg\x3d\x3d",
contentType:"image/svg+xml"},unlocatedStopSymbol:{angle:0,xoffset:0,yoffset:9,type:"esriPMS",width:17,height:24,imageData:"PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMjkiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHJhZGlhbEdyYWRpZW50IHI9IjAuNSIgY3k9IjAuMzU1NDciIGN4PSIwLjMzMjAzIiBzcHJlYWRNZXRob2Q9InBhZCIgaWQ9InN2Z18xMCI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLW9wYWNpdHk9IjAuOTkyMTkiIHN0b3AtY29sb3I9IiNlMmUyZTIiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3Atb3BhY2l0eT0iMC45ODQzOCIgc3RvcC1jb2xvcj0iIzllOWU5ZSIvPjwvcmFkaWFsR3JhZGllbnQ+PC9kZWZzPjxnPjxnIHN0cm9rZT0ibnVsbCIgaWQ9InN2Z18xIj48cGF0aCBzdHJva2U9IiM2NjY2NjYiIHN0cm9rZS1vcGFjaXR5PSIwLjciIGZpbGw9InVybCgjc3ZnXzEwKSIgc3Ryb2tlLWxpbmVqb2luPSJudWxsIiBzdHJva2UtbGluZWNhcD0ibnVsbCIgZD0ibTAuNTYyMTIsMTAuNjM0NTJjMCwtNS41NjQ5IDQuNDU2NzEsLTEwLjA3MjQ2IDkuOTU4ODMsLTEwLjA3MjQ2YzUuNTAyMSwwIDkuOTU4ODMsNC41MDc1NyA5Ljk1ODgzLDEwLjA3MjQ2YzAsMi43ODI0NSAtMS4xMTQxOCw1LjMwMDU3IC0yLjkxNjEyLDcuMTIzMDdjLTAuOTAwOTcsMC45MTEyNSAtMi45NDA0MSwyLjI2NjE2IC00Ljc0MTM1LDQuNzEyNDVjLTEuODAwOTMsMi40NDYyOSAtMi4xOTEwNCw2LjAzNjg4IC0yLjI0NTYxLDYuMDM0NTJjLTAuMDU0NTYsLTAuMDAyMzYgLTAuOTg1NzcsLTMuNzcyNTYgLTIuNTk3MzMsLTYuMTkzMzdjLTEuNjExNTksLTIuNDIwODEgLTMuNjAwMTQsLTMuNjQyMzUgLTQuNTAxMTEsLTQuNTUzNmMtMS44MDE5NSwtMS44MjI1IC0yLjkxNjEyLC00LjM0MDYyIC0yLjkxNjEyLC03LjEyMzA3bDAsMGwtMC4wMDAwMiwweiIgaWQ9InN2Z18yIi8+PC9nPjxyZWN0IHRyYW5zZm9ybT0icm90YXRlKC00NSAxMC41LDEwLjUpICIgc3Ryb2tlPSIjZTJlMmUyIiBpZD0ic3ZnXzExIiBoZWlnaHQ9IjEwIiB3aWR0aD0iMiIgeT0iNS42IiB4PSI5LjUiIHN0cm9rZS13aWR0aD0iMCIgZmlsbD0iIzY2NjY2NiIvPjxyZWN0IHRyYW5zZm9ybT0icm90YXRlKDQ1IDEwLjUsMTAuNSkgIiBzdHJva2U9IiNlMmUyZTIiIGlkPSJzdmdfMTIiIGhlaWdodD0iMTAiIHdpZHRoPSIyIiB5PSI1LjYiIHg9IjkuNSIgc3Ryb2tlLXdpZHRoPSIwIiBmaWxsPSIjNjY2NjY2Ii8+PC9nPjwvc3ZnPg\x3d\x3d",
contentType:"image/svg+xml"},waypointSymbol:{color:[255,255,255,255],size:10,angle:0,xoffset:0,yoffset:0,type:"esriSMS",style:"esriSMSCircle",outline:{color:[20,89,127,255],width:2.5,type:"esriSLS",style:"esriSLSSolid"}},directionSymbol:{color:[0,122,194,255],width:6,type:"esriSLS",style:"esriSLSSolid"},directionEventSymbol:{color:[100,255,100,255],size:8,type:"esriSMS",style:"esriSMSCircle",outline:{color:[0,69,0,255],width:1,type:"esriSLS",style:"esriSLSSolid"}},routeSymbol:{color:[20,89,127,255],
width:8,type:"esriSLS",style:"esriSLSSolid"},_geometryService:null,_jsonStringFieldSize:1048576,constructor:function(c){c&&(this.portal=new K.Portal(c))},getFolders:function(){return this.portal?this.portal.signIn().then(h.hitch(this,function(){return this.portal.getPortalUser().getFolders()},!1)).then(h.hitch(this,function(c){var a=this.portal.getPortalUser();c=c||[];c.splice(0,0,{created:a.created,portal:this.portal,title:a.username+" ("+p.networkAnalysis.sharing.rootFolder+")",url:a.userContentUrl});
return c})):[]},canCreateItem:function(){var c=new r;this.portal?this.portal.signIn().then(h.hitch(this,function(){c.resolve(-1<(this.portal.getPortalUser().privileges||[]).indexOf("portal:user:createItem"))}),c.reject):c.reject(Error("No URL to a Portal instance or ArcGIS Online was specified at construction time."));return c.promise},toMinutes:function(c,a,b){c=c||0;switch(a){case "esriNAUSeconds":c/=Math.pow(60,b?-1:1);break;case "esriNAUHours":c*=Math.pow(60,b?-1:1);break;case "esriNAUDays":c*=
Math.pow(1440,b?-1:1)}return c},fromMinutes:function(c,a){return this.toMinutes(c,a,!0)},toMeters:function(c,a,b){c=c||0;switch((a||"").replace("esriNAU","esri")){case "esriInches":c*=Math.pow(0.0254,b?-1:1);break;case "esriFeet":c*=Math.pow(0.3048,b?-1:1);break;case "esriYards":c*=Math.pow(0.9144,b?-1:1);break;case "esriMiles":c*=Math.pow(1609.34,b?-1:1);break;case "esriNauticalMiles":c*=Math.pow(1851.995396854,b?-1:1);break;case "esriMillimeters":c/=Math.pow(1E3,b?-1:1);break;case "esriCentimeters":c/=
Math.pow(100,b?-1:1);break;case "esriKilometers":c*=Math.pow(1E3,b?-1:1);break;case "esriDecimeters":c/=Math.pow(10,b?-1:1)}return c},fromMeters:function(c,a){return this.toMeters(c,a,!0)},toGeolocalTime:function(c,a){return void 0===c||null===c?void 0:c+6E4*(a||0)},toUTCTime:function(c,a){-22091616E5===c&&(c=void 0);return null!==a&&void 0!==a?c-6E4*a:c},getUTCOffset:function(c,a){return null!==a&&void 0!==a&&0<a?(c-a)/60/1E3:void 0},getAttributeUnits:function(c,a){for(var b=a.networkDataset.networkAttributes,
f,d=0;d<b.length;d++)if(b[d].name===c&&"esriNAUTCost"===b[d].usageType){f=b[d].units;break}return f},addAttributePrefix:function(c,a){var b={},f;for(f in c)c.hasOwnProperty(f)&&(b[a+f]=c[f]);return b},load:function(c,a){var b=new r,f=h.hitch(this,this.fromMeters),d=h.hitch(this,this.fromMinutes),g=h.hitch(this,this.addAttributePrefix);this.portal?this.portal.signIn().then(h.hitch(this,function(){var e=this.portal.getPortalUser(),k=e.userContentUrl.replace(/\/users\/.+\/?$/,"/items/");w({url:k+c,content:{f:"json"},
callbackParamName:"callback"}).then(h.hitch(this,function(n){w({url:k+c+"/data",content:{f:"json"},callbackParamName:"callback"}).then(h.hitch(this,function(c){var k=function(a){for(var b=0;b<c.layers.length;b++)if(c.layers[b].layerDefinition.name===a)return c.layers[b]},l=k("Directions"),q=l&&l.featureSet.features||[],s=(l=k("DirectionEvents"))&&l.featureSet.features||[],u=(l=k("Stops"))&&l.featureSet.features||[],B=(l=k("RouteInfo"))&&l.featureSet.features[0],l=B.attributes,z=B.geometry.spatialReference,
A=v.parse(l.AnalysisSettings),r=A.travelMode.timeAttributeName,t=A.travelMode.distanceAttributeName,y=this.getAttributeUnits(r,a),C=this.getAttributeUnits(t,a),w=a.directionsLengthUnits,B=l.Messages,x=[],k={directions:{routeId:1,routeName:l.RouteName,summary:{totalLength:this.fromMeters(l.TotalMeters,w),totalTime:this.fromMinutes(l.TotalMinutes,y),totalDriveTime:this.fromMinutes(l.TotalMinutes-l.TotalWaitMinutes,y),envelope:k("RouteInfo").layerDefinition.extent},spatialReference:z,geometryType:"esriGeometryPolyline",
features:h.hitch(this,function(){for(var a=[],c=function(a){var c=a,d=q[c].geometry;a=function(a){for(;!d&&(0>a&&0<c||0<a&&c<q.length-1);){c+=a;var b=q[c].geometry;if(b&&b.paths&&b.paths[0]){d={paths:[[b.paths[0][0<a?0:b.paths[0].length-1],b.paths[0][0<a?0:b.paths[0].length-1]]],spatialReference:z};break}}return d};return a(1)||a(-1)},b=h.hitch(this,function(a){for(var c=[],b=0;b<s.length;b++)s[b].attributes.DirectionSequence===a&&(c.push({ETA:this.toGeolocalTime(s[b].attributes.ArrivalTime,s[b].attributes.UTCOffset),
arriveTimeUTC:null===s[b].attributes.UTCOffset?void 0:s[b].attributes.ArrivalTime,strings:v.parse(s[b].attributes.EventMessages)||[],point:{x:s[b].geometry.x,y:s[b].geometry.y}}),s[b].attributes.EventText&&c[c.length-1].strings.splice(0,0,{string:s[b].attributes.EventText,stringType:"esriDSTGeneral"}));return c}),d=0;d<q.length;d++){var e={attributes:{length:this.fromMeters(q[d].attributes.Meters,w),time:this.fromMinutes(q[d].attributes.Minutes,y),text:q[d].attributes.DirectionText,ETA:this.toGeolocalTime(q[d].attributes.ArrivalTime,
q[d].attributes.UTCOffset),arriveTimeUTC:null===q[d].attributes.UTCOffset?void 0:q[d].attributes.ArrivalTime,maneuverType:q[d].attributes.ManeuverType,_stopSequence:q[d].attributes.StopSequence},geometry:c(d)||u[0]&&u[0].geometry&&{paths:[[[u[0].geometry.x,u[0].geometry.y]]],spatialReference:z},strings:v.parse(q[d].attributes.ManeuverMessages||"[]"),events:b(d)};0===e.strings.length&&delete e.strings;a.push(e)}return a})()},stops:h.hitch(this,function(){for(var a=[],c=0;c<u.length;c++){var b=u[c].attributes,
d={geometry:u[c].geometry,attributes:{ObjectID:b.__OBJECTID,Name:b.Name,RouteName:null,Sequence:b.Sequence,TimeWindowStart:b.TimeWindowStart,TimeWindowEnd:b.TimeWindowEnd,ArriveCurbApproach:b.ArrivalCurbApproach,DepartCurbApproach:b.DepartureCurbApproach,CurbApproach:b.CurbApproach,Status:b.Status,ArriveTime:this.toGeolocalTime(b.ArrivalTime,b.ArrivalUTCOffset),DepartTime:this.toGeolocalTime(b.DepartureTime,b.DepartureUTCOffset),ArriveTimeUTC:b.ArrivalTime,DepartTimeUTC:b.DepartureTime,isWaypoint:1===
b.LocationType}},e=d.attributes;e["Attr_"+r]=this.fromMinutes(b.ServiceMinutes,y);e["Attr_"+t]=this.fromMeters(b.ServiceMeters,C);h.mixin(e,g(v.parse(b.ServiceOtherCosts||"{}"),"Attr_"));e["Cumul_"+r]=this.fromMinutes(b.CumulativeMinutes,y);e["Cumul_"+t]=this.fromMeters(b.CumulativeMeters,C);h.mixin(e,g(v.parse(b.CumulativeOtherCosts||"{}"),"Cumul_"));a.push(d)}return a})(),routeName:l.RouteName,spatialReference:z},D=!1,A=h.mixin({returnStops:!0,returnDirections:!0,returnRoutes:!1,ignoreInvalidLocations:!0,
outputLines:"esriNAOutputLineTrueShape",directionsOutputType:"complete",directionsLengthUnits:w,doNotLocateOnRestrictedElements:!0,outSpatialReference:new G(z),stops:new N(function(){for(var a=[],c=0;c<u.length;c++){var b=u[c].attributes,e={geometry:u[c].geometry,attributes:{CurbApproach:b.CurbApproach,Name:b.Name,Sequence:b.Sequence,isWaypoint:1===b.LocationType,TimeWindowStart:b.TimeWindowStart,TimeWindowEnd:b.TimeWindowEnd}};e.attributes["Attr_"+r]=d(b.ServiceMinutes,y);e.attributes["Attr_"+t]=
f(b.ServiceMeters,C);h.mixin(e.attributes,g(v.parse(b.ServiceOtherCosts),"Attr_"));a.push(e);D=D||0<b.TimeWindowStart}return{spatialReference:z,geometryType:"esriGeometryPoint",features:a}}())},A);A.useTimeWindows=D;(!y||!C)&&x.push({message:p.networkAnalysis.sharing.costAttributeMissing,messageType:"Warning"});"1.0"!==l.Version&&x.push({message:p.networkAnalysis.sharing.differentVersion,messageType:"Warning"});b.resolve({routeParameters:h.mixin(new L,A),solveResult:{barriers:[],polygonBarriers:[],
polylineBarriers:[],messages:v.parse(B||"[]"),routeResults:[new M(k)]},loadMessages:x,isItemOwner:e.username===n.owner,title:n.title,ownerFolder:n.ownerFolder})}),b.reject)}),b.reject)}),b.reject):b.reject(Error("No URL to a Portal instance or ArcGIS Online was specified at construction time."));return b.promise},store:function(c,a){var b=new r;c?!c.directions||!c.directions||!c.directions.length?b.reject(Error("Directions are required.")):!c.stops||!c.stops.length?b.reject(Error("Stops are required.")):
c.extent?c.routeInfo?c.folder?c.name?this.portal?this.portal.signIn().then(h.hitch(this,function(){var f=this._getRouteId();this._addOrUpdateItem(this._populateLayerInfo(f,c),c,f,a).then(b.resolve,b.reject)}),b.reject):b.reject(Error("No URL to a Portal instance or ArcGIS Online was specified at construction time.")):b.reject(Error("Layer name is required.")):b.reject(Error("Folder Url is required.")):b.reject(Error("RouteInfo are required.")):b.reject(Error("Extent is required.")):b.reject(Error("Missing required parameters."));
return b.promise},createFeatureCollection:function(c){var a=new r;if(c)if(!c.directions||!c.directions||!c.directions.length)a.reject(Error("Directions are required."));else if(!c.stops||!c.stops.length)a.reject(Error("Stops are required."));else if(c.extent)if(c.routeInfo)if(c.name){var b=this._getRouteId();a.resolve({title:c.name,layerInfo:this._populateLayerInfo(b,c)})}else a.reject(Error("Layer name is required."));else a.reject(Error("RouteInfo are required."));else a.reject(Error("Extent is required."));
else a.reject(Error("Missing required parameters."));return a.promise},_addOrUpdateItem:function(c,a,b,f){return h.hitch(this,function(){var c=new r;!this._geometryService&&(this.portal&&this.portal.helperServices.geometry)&&(this._geometryService=new O(this.portal.helperServices.geometry.url));if(this._geometryService&&a.extent){var b=new P;b.outSR=new G(4326);b.geometries=[a.extent];this._geometryService.project(b).then(h.hitch(this,function(a){var b;a&&a[0]&&(b=a[0].xmin+","+a[0].ymin+","+a[0].xmax+
","+a[0].ymax);c.resolve(b)}),c.resolve)}else c.resolve();return c.promise})().then(h.hitch(this,function(b){return w({url:f?a.folder+"/items/"+f+"/update":a.folder+"/addItem",content:{text:v.stringify(c),extent:b,title:a.name,type:"Feature Collection",typeKeywords:"Data, Feature Collection, Multilayer, Route Layer",description:p.networkAnalysis.sharing.itemSnippet+" "+a.name+h.hitch(this,function(){var a=function(a){for(var b=0;b<c.layers.length;b++)if(c.layers[b].layerDefinition.name===a)return c.layers[b].featureSet.features;
return[]},b=a("Directions"),d=a("Stops"),f=a("RouteInfo")[0].attributes,m="english"===this.portal.getPortalUser().units?"esriMiles":"esriMeters",r=function(a){return I.format(a,{places:2,locale:"root"})},l=h.hitch(this,function(a){return r(this.fromMeters(a,m))+" "+("esriMiles"===m?p.networkAnalysis.sharing.Miles:p.networkAnalysis.sharing.Meters)}),a=h.hitch(this,function(a){for(var c="\x3col\x3e",f=0;f<b.length;f++){var g;a:{g=b[f].attributes.StopSequence;if(void 0!==g)for(var h=0;h<d.length;h++)if(d[h].attributes.Sequence===
g){g=d[h].attributes;break a}g={}}h=b[f].attributes.ManeuverType;if(a||!f&&"esriDMTDepart"===h||f&&"esriDMTStop"===h)c+='\x3cli\x3e\x3cimg style\x3d"display:inline-block;margin:-3px 15px;" src\x3d"js/jsapi/esri/dijit/images/Directions/maneuvers/'+(null===g.ArrivalCurbApproach&&null!==g.DepartureCurbApproach?"esriDMTStopOrigin":null!==g.ArrivalCurbApproach&&null===g.DepartureCurbApproach?"esriDMTStopDestination":b[f].attributes.ManeuverType)+'.png"\x3e\x3cspan\x3e'+b[f].attributes.DirectionText+"\x3c/span\x3e\x3cbr\x3e",
a&&(c+="\x3cspan\x3e"+r(b[f].attributes.Minutes)+" "+p.networkAnalysis.sharing.Minutes+"\x26nbsp;\x26middot;\x26nbsp;"+l(b[f].attributes.Meters)+"\x3c/span\x3e"),c+="\x3c/li\x3e"}return c+"\x3c/ol\x3e"}),f="\x3cbr\x3e\x3cbr\x3e\x3cb\x3e"+p.networkAnalysis.sharing.routeInfoLayer+"\x3c/b\x3e\x3cul\x3e\x3cli\x3e"+r(f.TotalMinutes)+" "+p.networkAnalysis.sharing.Minutes+"\x3c/li\x3e\x3cli\x3e"+l(f.TotalMeters)+"\x3c/li\x3e"+(void 0!==f.StartTime?"\x3cli\x3e"+p.networkAnalysis.sharing.StartTime+" "+(new Date(f.StartTime)).toString()+
"\x3c/li\x3e":"")+"\x3c/ul\x3e\x3cb\x3e"+p.networkAnalysis.sharing.directionsLayer+"\x3c/b\x3e",q=a(!0);65536<=(f+q).length&&(q=a(!1));return f+q})(),tags:p.networkAnalysis.sharing.itemTags,snippet:p.networkAnalysis.sharing.itemSnippet+" "+a.name,thumbnailUrl:a.thumbnail,licenseInfo:p.widgets.directions.printDisclaimer,f:"json"},callbackParamName:"callback"},{usePost:!0})}))},_getRouteId:function(){for(var c="",a=0;32>a;a++)c+="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"[Math.floor(62*
Math.random())];return c},_populateLayerInfo:function(c,a){var b={visibility:!0,layers:[],visibleLayers:[0,3],opacity:1};this._addRouteInfoToLayerInfo(b,c,a.routeInfo,a.extent);this._addDirectionsToLayerInfo(b,c,a.directions,a.extent);this._addDirectionEventsToLayerInfo(b,c,a.directionEvents,a.extent);this._addStopsToLayerInfo(b,c,a.stops,a.extent);return b},_addStopsToLayerInfo:function(c,a,b,f){a=p.networkAnalysis;var d={type:"codedValue",name:"esriNACurbApproachType",codedValues:[{name:a.enums.esriNACurbApproachType.esriNAEitherSideOfVehicle,
code:0},{name:a.enums.esriNACurbApproachType.esriNARightSideOfVehicle,code:1},{name:a.enums.esriNACurbApproachType.esriNALeftSideOfVehicle,code:2},{name:a.enums.esriNACurbApproachType.esriNANoUTurn,code:3}]},g=this._generateFeatureCollectionTemplate("Stops",a.sharing.stopsLayer,"esriGeometryPoint"),e=g.layerDefinition.fields,k=0<b[0].attributes.ArrivalTime;e.push(this._createField("CurbApproach",a.fields.stops.CurbApproach,"integer",!1,d));e.push(this._createField("ArrivalCurbApproach",a.fields.stops.ArrivalCurbApproach,
"integer",!0,d));e.push(this._createField("DepartureCurbApproach",a.fields.stops.DepartureCurbApproach,"integer",!0,d));e.push(this._createField("Name",a.fields.stops.Name,"string",!0));e.push(this._createField("Sequence",a.fields.stops.Sequence,"integer",!0));e.push(this._createField("Status",a.fields.stops.Status,"integer",!0,{type:"codedValue",name:"esriNAObjectStatus",codedValues:[{name:a.enums.esriNAObjectStatus.esriNAObjectStatusOK,code:0},{name:a.enums.esriNAObjectStatus.esriNAObjectStatusNotLocated,
code:1},{name:a.enums.esriNAObjectStatus.esriNAObjectStatusElementNotLocated,code:2},{name:a.enums.esriNAObjectStatus.esriNAObjectStatusElementNotTraversable,code:3},{name:a.enums.esriNAObjectStatus.esriNAObjectStatusInvalidFieldValues,code:4},{name:a.enums.esriNAObjectStatus.esriNAObjectStatusNotReached,code:5},{name:a.enums.esriNAObjectStatus.esriNAObjectStatusTimeWindowViolation,code:6}]}));e.push(this._createField("LocationType",a.fields.stops.LocationType,"integer",!0,{type:"codedValue",name:"esriNALocationType",
codedValues:[{name:a.enums.esriNALocationType.stop,code:0},{name:a.enums.esriNALocationType.waypoint,code:1}]}));e.push(this._createField("TimeWindowStart",a.fields.stops.TimeWindowStart,"date",!1));e.push(this._createField("TimeWindowEnd",a.fields.stops.TimeWindowEnd,"date",!1));e.push(this._createField("ServiceMinutes",a.fields.stops.ServiceMinutes,"double",!1));e.push(this._createField("ServiceMeters",a.fields.stops.ServiceMeters,"double",!1));e.push(this._createField("ServiceOtherCosts",a.fields.stops.ServiceOtherCosts,
"string",!1,null,this._jsonStringFieldSize));e.push(this._createField("CumulativeMinutes",a.fields.stops.CumulativeMinutes,"double",!0));e.push(this._createField("CumulativeMeters",a.fields.stops.CumulativeMeters,"double",!0));e.push(this._createField("CumulativeOtherCosts",a.fields.stops.CumulativeOtherCosts,"string",!1,null,this._jsonStringFieldSize));e.push(this._createField("LateMinutes",a.fields.stops.LateMinutes,"double",!1));e.push(this._createField("WaitMinutes",a.fields.stops.WaitMinutes,
"double",!1));e.push(this._createField("ArrivalTime",a.fields.stops.ArrivalTime,"date",k));e.push(this._createField("DepartureTime",a.fields.stops.DepartureTime,"date",k));e.push(this._createField("ArrivalUTCOffset",a.fields.stops.ArrivalUTCOffset,"integer",k));e.push(this._createField("DepartureUTCOffset",a.fields.stops.DepartureUTCOffset,"integer",k));for(d=e=0;d<b.length;d++){var n=b[d],m=n.geometry;g.featureSet.features.push({geometry:m.toJson?m.toJson():m,attributes:h.mixin(n.attributes,{__OBJECTID:e++})})}g.layerDefinition.extent=
f.toJson?f.toJson():f;f=new J(2>=b.length?new t(this.firstStopSymbol):new t(this.interimStopSymbol),"Sequence");for(d=0;d<b.length;d++)e=b[d].attributes,n=null,m=a.enums.esriNALocationType.stop,1===e.LocationType?(n=new E(this.waypointSymbol),m=a.enums.esriNALocationType.waypoint):null===e.ArrivalCurbApproach&&null===e.DepartureCurbApproach?(n=new t(this.unlocatedStopSymbol),m=a.enums.esriNALocationType.stop+" : "+a.enums.esriNAObjectStatus.esriNAObjectStatusNotReached):null===e.ArrivalCurbApproach&&
null!==e.DepartureCurbApproach?n=new t(this.firstStopSymbol):null!==e.ArrivalCurbApproach&&null===e.DepartureCurbApproach&&(n=new t(this.lastStopSymbol)),n&&f.addValue({value:e.Sequence,symbol:n,label:m});g.layerDefinition.drawingInfo.renderer=f.toJson();g.popupInfo={title:"{Name}",fieldInfos:[{fieldName:"Name",label:a.fields.stops.Name,isEditable:!0,tooltip:"",visible:!0,stringFieldOption:"textbox",isEditableOnLayer:!0},{fieldName:"Sequence",label:a.fields.stops.Sequence,isEditable:!1,tooltip:"",
visible:!0,format:{places:0,digitSeparator:!0},stringFieldOption:"textbox",isEditableOnLayer:!1},{fieldName:"ArrivalTime",label:a.fields.stops.ArrivalTime,isEditable:!0,tooltip:"",visible:k,format:{dateFormat:"shortDateShortTime24"},stringFieldOption:"textbox",isEditableOnLayer:!1},{fieldName:"ArrivalUTCOffset",label:a.fields.stops.ArrivalUTCOffset,isEditable:!1,tooltip:"",visible:k,format:{places:0,digitSeparator:!0},stringFieldOption:"textbox",isEditableOnLayer:!1},{fieldName:"DepartureTime",label:a.fields.stops.DepartureTime,
isEditable:!0,tooltip:"",visible:k,format:{dateFormat:"shortDateShortTime24"},stringFieldOption:"textbox",isEditableOnLayer:!1},{fieldName:"DepartureUTCOffset",label:a.fields.stops.DepartureUTCOffset,isEditable:!1,tooltip:"",visible:k,format:{places:0,digitSeparator:!0},stringFieldOption:"textbox",isEditableOnLayer:!1},{fieldName:"CurbApproach",label:a.fields.stops.CurbApproach,isEditable:!0,tooltip:"",visible:!1,format:{places:0,digitSeparator:!0},stringFieldOption:"textbox",isEditableOnLayer:!0},
{fieldName:"ArrivalCurbApproach",label:a.fields.stops.ArrivalCurbApproach,isEditable:!1,tooltip:"",visible:!0,format:{places:0,digitSeparator:!0},stringFieldOption:"textbox",isEditableOnLayer:!1},{fieldName:"DepartureCurbApproach",label:a.fields.stops.DepartureCurbApproach,isEditable:!1,tooltip:"",visible:!0,format:{places:0,digitSeparator:!0},stringFieldOption:"textbox",isEditableOnLayer:!1},{fieldName:"Status",label:a.fields.stops.Status,isEditable:!1,tooltip:"",visible:!0,format:{places:0,digitSeparator:!0},
stringFieldOption:"textbox",isEditableOnLayer:!1},{fieldName:"LocationType",label:a.fields.stops.LocationType,isEditable:!1,tooltip:"",visible:!0,format:{places:0,digitSeparator:!0},stringFieldOption:"textbox",isEditableOnLayer:!1},{fieldName:"TimeWindowStart",label:a.fields.stops.TimeWindowStart,isEditable:!0,tooltip:"",visible:!1,format:{dateFormat:"shortDateShortTime24"},stringFieldOption:"textbox",isEditableOnLayer:!0},{fieldName:"TimeWindowEnd",label:a.fields.stops.TimeWindowEnd,isEditable:!0,
tooltip:"",visible:!1,format:{dateFormat:"shortDateShortTime24"},stringFieldOption:"textbox",isEditableOnLayer:!0},{fieldName:"ServiceMinutes",label:a.fields.stops.ServiceMinutes,isEditable:!0,tooltip:"",visible:!1,format:{places:2,digitSeparator:!0},stringFieldOption:"textbox",isEditableOnLayer:!0},{fieldName:"ServiceMeters",label:a.fields.stops.ServiceMeters,isEditable:!0,tooltip:"",visible:!1,format:{places:2,digitSeparator:!0},stringFieldOption:"textbox",isEditableOnLayer:!0},{fieldName:"ServiceOtherCosts",
label:a.fields.stops.ServiceOtherCosts,isEditable:!0,tooltip:"",visible:!1,stringFieldOption:"textbox",isEditableOnLayer:!0},{fieldName:"CumulativeMinutes",label:a.fields.stops.CumulativeMinutes,isEditable:!1,tooltip:"",visible:!0,format:{places:2,digitSeparator:!0},stringFieldOption:"textbox",isEditableOnLayer:!1},{fieldName:"CumulativeMeters",label:a.fields.stops.CumulativeMeters,isEditable:!1,tooltip:"",visible:!0,format:{places:2,digitSeparator:!0},stringFieldOption:"textbox",isEditableOnLayer:!1},
{fieldName:"CumulativeOtherCosts",label:a.fields.stops.CumulativeOtherCosts,isEditable:!0,tooltip:"",visible:!1,stringFieldOption:"textbox",isEditableOnLayer:!0},{fieldName:"LateMinutes",label:a.fields.stops.LateMinutes,isEditable:!1,tooltip:"",visible:!1,format:{places:2,digitSeparator:!0},stringFieldOption:"textbox",isEditableOnLayer:!1},{fieldName:"WaitMinutes",label:a.fields.stops.WaitMinutes,isEditable:!1,tooltip:"",visible:!1,format:{places:2,digitSeparator:!0},stringFieldOption:"textbox",isEditableOnLayer:!1}],
description:null,showAttachments:!1,mediaInfos:[]};c.layers.push(g)},_addDirectionsToLayerInfo:function(c,a,b,f){a=p.networkAnalysis;var d=a.enums.esriDirectionsManeuverType,g=this._generateFeatureCollectionTemplate("Directions",a.sharing.directionsLayer,"esriGeometryPolyline"),e=g.layerDefinition.fields,k=b[0]&&b[0].attributes&&0<b[0].attributes.ArrivalTime;e.push(this._createField("Sequence",a.fields.directions.Sequence,"integer"));e.push(this._createField("StopSequence",a.fields.directions.StopSequence,
"integer"));e.push(this._createField("ArrivalTime",a.fields.directions.ArrivalTime,"date",k));e.push(this._createField("UTCOffset",a.fields.directions.UTCOffset,"integer",k));e.push(this._createField("ManeuverType",a.fields.directions.ManeuverType,"string",!0,{type:"codedValue",name:"esriDirectionsManeuverType",codedValues:[{name:d.esriDMTBearLeft,code:"esriDMTBearLeft"},{name:d.esriDMTBearRight,code:"esriDMTBearRight"},{name:d.esriDMTDepart,code:"esriDMTDepart"},{name:d.esriDMTDoorPassage,code:"esriDMTDoorPassage"},
{name:d.esriDMTElevator,code:"esriDMTElevator"},{name:d.esriDMTEndOfFerry,code:"esriDMTEndOfFerry"},{name:d.esriDMTEscalator,code:"esriDMTEscalator"},{name:d.esriDMTFerry,code:"esriDMTFerry"},{name:d.esriDMTForkCenter,code:"esriDMTForkCenter"},{name:d.esriDMTForkLeft,code:"esriDMTForkLeft"},{name:d.esriDMTForkRight,code:"esriDMTForkRight"},{name:d.esriDMTHighwayChange,code:"esriDMTHighwayChange"},{name:d.esriDMTHighwayExit,code:"esriDMTHighwayExit"},{name:d.esriDMTHighwayMerge,code:"esriDMTHighwayMerge"},
{name:d.esriDMTPedestrianRamp,code:"esriDMTPedestrianRamp"},{name:d.esriDMTRampLeft,code:"esriDMTRampLeft"},{name:d.esriDMTRampRight,code:"esriDMTRampRight"},{name:d.esriDMTRoundabout,code:"esriDMTRoundabout"},{name:d.esriDMTSharpLeft,code:"esriDMTSharpLeft"},{name:d.esriDMTSharpRight,code:"esriDMTSharpRight"},{name:d.esriDMTStairs,code:"esriDMTStairs"},{name:d.esriDMTStop,code:"esriDMTStop"},{name:d.esriDMTStraight,code:"esriDMTStraight"},{name:d.esriDMTTripItem,code:"esriDMTTripItem"},{name:d.esriDMTTurnLeft,
code:"esriDMTTurnLeft"},{name:d.esriDMTTurnLeftLeft,code:"esriDMTTurnLeftLeft"},{name:d.esriDMTTurnLeftRight,code:"esriDMTTurnLeftRight"},{name:d.esriDMTTurnRight,code:"esriDMTTurnRight"},{name:d.esriDMTTurnRightLeft,code:"esriDMTTurnRightLeft"},{name:d.esriDMTTurnRightRight,code:"esriDMTTurnRightRight"},{name:d.esriDMTUnknown,code:"esriDMTUnknown"},{name:d.esriDMTUTurn,code:"esriDMTUTurn"}]}));e.push(this._createField("Meters",a.fields.directions.Meters,"double",!0));e.push(this._createField("Minutes",
a.fields.directions.Minutes,"double",!0));e.push(this._createField("DirectionText",a.fields.directions.DirectionText,"string",!0,null,2048));e.push(this._createField("ManeuverMessages",a.fields.directions.ManeuverMessages,"string",!1,null,this._jsonStringFieldSize));for(e=d=0;e<b.length;e++){var n=b[e],m=n.geometry;g.featureSet.features.push({geometry:m&&m.toJson?m.toJson():m,attributes:h.mixin(n.attributes,{__OBJECTID:d++})})}g.layerDefinition.extent=f.toJson?f.toJson():f;b=new x(new F(this.directionSymbol));
g.layerDefinition.drawingInfo.renderer=b.toJson();g.popupInfo={title:"{Text}",fieldInfos:[{fieldName:"ManeuverType",label:a.fields.directions.ManeuverType,isEditable:!1,tooltip:"",visible:!0,stringFieldOption:"textbox",isEditableOnLayer:!1},{fieldName:"DirectionText",label:a.fields.directions.DirectionText,isEditable:!1,tooltip:"",visible:!0,stringFieldOption:"textbox",isEditableOnLayer:!1},{fieldName:"Sequence",label:a.fields.directions.Sequence,isEditable:!1,tooltip:"",visible:!1,format:{places:0,
digitSeparator:!0},stringFieldOption:"textbox",isEditableOnLayer:!1},{fieldName:"StopSequence",label:a.fields.directions.StopSequence,isEditable:!1,tooltip:"",visible:!1,format:{places:0,digitSeparator:!0},stringFieldOption:"textbox",isEditableOnLayer:!1},{fieldName:"ArrivalTime",label:a.fields.directions.ArrivalTime,isEditable:!0,tooltip:"",visible:k,format:{dateFormat:"shortDateShortTime24"},stringFieldOption:"textbox",isEditableOnLayer:!1},{fieldName:"UTCOffset",label:a.fields.directions.UTCOffset,
isEditable:!1,tooltip:"",visible:k,format:{places:0,digitSeparator:!0},stringFieldOption:"textbox",isEditableOnLayer:!1},{fieldName:"Meters",label:a.fields.directions.Meters,isEditable:!1,tooltip:"",visible:!0,format:{places:2,digitSeparator:!0},stringFieldOption:"textbox",isEditableOnLayer:!1},{fieldName:"Minutes",label:a.fields.directions.Minutes,isEditable:!1,tooltip:"",visible:!0,format:{places:2,digitSeparator:!0},stringFieldOption:"textbox",isEditableOnLayer:!1},{fieldName:"ManeuverMessages",
label:a.fields.directions.ManeuverMessages,isEditable:!1,tooltip:"",visible:!1,stringFieldOption:"textbox",isEditableOnLayer:!1}],description:null,showAttachments:!1,mediaInfos:[]};c.layers.push(g)},_addDirectionEventsToLayerInfo:function(c,a,b,f){a=p.networkAnalysis;var d=this._generateFeatureCollectionTemplate("DirectionEvents",a.sharing.directionEventsLayer,"esriGeometryPoint"),g=d.layerDefinition.fields,e=b[0]&&b[0].attributes&&0<b[0].attributes.ArrivalTime;g.push(this._createField("ArrivalTime",
a.fields.directionEvents.ArrivalTime,"date",e));g.push(this._createField("UTCOffset",a.fields.directionEvents.UTCOffset,"integer",e));g.push(this._createField("DirectionSequence",a.fields.directionEvents.DirectionSequence,"integer"));g.push(this._createField("Sequence",a.fields.directionEvents.Sequence,"integer"));g.push(this._createField("EventText",a.fields.directionEvents.EventText,"string",!0,null,2048));g.push(this._createField("EventMessages",a.fields.directionEvents.EventMessages,"string",
!1,null,this._jsonStringFieldSize));for(var k=g=0;k<b.length;k++){var n=b[k],m=n.geometry;d.featureSet.features.push({geometry:m&&m.toJson?m.toJson():m,attributes:h.mixin(n.attributes,{__OBJECTID:g++})})}d.layerDefinition.extent=f.toJson?f.toJson():f;b=new x(new E(this.directionEventSymbol));d.layerDefinition.drawingInfo.renderer=b.toJson();d.popupInfo={title:a.sharing.directionEventsLayer,fieldInfos:[{fieldName:"EventText",label:a.fields.directionEvents.EventText,isEditable:!1,tooltip:"",visible:!0,
stringFieldOption:"textbox",isEditableOnLayer:!1},{fieldName:"ArrivalTime",label:a.fields.directionEvents.ArrivalTime,isEditable:!0,tooltip:"",visible:e,format:{dateFormat:"shortDateShortTime24"},stringFieldOption:"textbox",isEditableOnLayer:!1},{fieldName:"UTCOffset",label:a.fields.directionEvents.UTCOffset,isEditable:!1,tooltip:"",visible:e,format:{places:0,digitSeparator:!0},stringFieldOption:"textbox",isEditableOnLayer:!1},{fieldName:"DirectionSequence",label:a.fields.directionEvents.DirectionSequence,
isEditable:!1,tooltip:"",visible:!1,format:{places:0,digitSeparator:!0},stringFieldOption:"textbox",isEditableOnLayer:!1},{fieldName:"Sequence",label:a.fields.directionEvents.Sequence,isEditable:!1,tooltip:"",visible:!1,format:{places:0,digitSeparator:!0},stringFieldOption:"textbox",isEditableOnLayer:!1},{fieldName:"EventMessages",label:a.fields.directionEvents.EventMessages,isEditable:!1,tooltip:"",visible:!1,stringFieldOption:"textbox",isEditableOnLayer:!1}],description:null,showAttachments:!1,
mediaInfos:[]};c.layers.push(d)},_addRouteInfoToLayerInfo:function(c,a,b,f){a=p.networkAnalysis;var d=this._generateFeatureCollectionTemplate("RouteInfo",a.sharing.routeInfoLayer,"esriGeometryPolyline"),g=d.layerDefinition.fields,e=void 0!==b.attributes.StartTime&&null!==b.attributes.StartTime;g.push(this._createField("Version",a.fields.routeInfo.Version,"string"));g.push(this._createField("RouteName",a.fields.routeInfo.RouteName,"string",!0,null,1024));g.push(this._createField("TotalMinutes",a.fields.routeInfo.TotalMinutes,
"double",!0));g.push(this._createField("TotalMeters",a.fields.routeInfo.TotalMeters,"double",!0));g.push(this._createField("TotalLateMinutes",a.fields.routeInfo.TotalLateMinutes,"double"));g.push(this._createField("TotalWaitMinutes",a.fields.routeInfo.TotalWaitMinutes,"double"));g.push(this._createField("OtherCosts",a.fields.routeInfo.OtherCosts,"string",!1,null,this._jsonStringFieldSize));g.push(this._createField("StartTime",a.fields.routeInfo.StartTime,"date",e));g.push(this._createField("StartUTCOffset",
a.fields.routeInfo.StartUTCOffset,"integer",e));g.push(this._createField("EndTime",a.fields.routeInfo.EndTime,"date",e));g.push(this._createField("EndUTCOffset",a.fields.routeInfo.EndUTCOffset,"integer",e));g.push(this._createField("Messages",a.fields.routeInfo.Messages,"string",!1,null,this._jsonStringFieldSize));g.push(this._createField("AnalysisSettings",a.fields.routeInfo.AnalysisSettings,"string",!1,null,this._jsonStringFieldSize));g=b.geometry;d.featureSet.features.push({geometry:g&&g.toJson?
g.toJson():g,attributes:h.mixin(b.attributes,{__OBJECTID:0,Version:"1.0"})});d.layerDefinition.extent=f.toJson?f.toJson():f;b=new x(new F(this.routeSymbol));d.layerDefinition.drawingInfo.renderer=b.toJson();d.popupInfo={title:a.sharing.routeInfoLayer,fieldInfos:[{fieldName:"Version",label:a.fields.routeInfo.Version,isEditable:!1,tooltip:"",visible:!1,stringFieldOption:"textbox",isEditableOnLayer:!1},{fieldName:"RouteName",label:a.fields.routeInfo.RouteName,isEditable:!1,tooltip:"",visible:!0,stringFieldOption:"textbox",
isEditableOnLayer:!1},{fieldName:"TotalMinutes",label:a.fields.routeInfo.TotalMinutes,isEditable:!1,tooltip:"",visible:!0,format:{places:2,digitSeparator:!0},stringFieldOption:"textbox",isEditableOnLayer:!1},{fieldName:"TotalMeters",label:a.fields.routeInfo.TotalMeters,isEditable:!1,tooltip:"",visible:!0,format:{places:2,digitSeparator:!0},stringFieldOption:"textbox",isEditableOnLayer:!1},{fieldName:"TotalLateMinutes",label:a.fields.routeInfo.TotalLateMinutes,isEditable:!1,tooltip:"",visible:!1,format:{places:2,
digitSeparator:!0},stringFieldOption:"textbox",isEditableOnLayer:!1},{fieldName:"TotalWaitMinutes",label:a.fields.routeInfo.TotalWaitMinutes,isEditable:!1,tooltip:"",visible:!1,format:{places:2,digitSeparator:!0},stringFieldOption:"textbox",isEditableOnLayer:!1},{fieldName:"OtherCosts",label:a.fields.routeInfo.OtherCosts,isEditable:!1,tooltip:"",visible:!1,stringFieldOption:"textbox",isEditableOnLayer:!1},{fieldName:"StartTime",label:a.fields.routeInfo.StartTime,isEditable:!1,tooltip:"",visible:e,
format:{dateFormat:"shortDateShortTime24"},stringFieldOption:"textbox",isEditableOnLayer:!1},{fieldName:"StartUTCOffset",label:a.fields.routeInfo.StartUTCOffset,isEditable:!1,tooltip:"",visible:e,format:{places:0,digitSeparator:!0},stringFieldOption:"textbox",isEditableOnLayer:!1},{fieldName:"EndTime",label:a.fields.routeInfo.EndTime,isEditable:!1,tooltip:"",visible:e,format:{dateFormat:"shortDateShortTime24"},stringFieldOption:"textbox",isEditableOnLayer:!1},{fieldName:"EndUTCOffset",label:a.fields.routeInfo.EndUTCOffset,
isEditable:!1,tooltip:"",visible:e,format:{places:0,digitSeparator:!0},stringFieldOption:"textbox",isEditableOnLayer:!1},{fieldName:"Messages",label:a.fields.routeInfo.Messages,isEditable:!1,tooltip:"",visible:!1,stringFieldOption:"textbox",isEditableOnLayer:!1},{fieldName:"SolverSettings",label:a.fields.routeInfo.SolverSettings,isEditable:!1,tooltip:"",visible:!1,stringFieldOption:"textbox",isEditableOnLayer:!1}],description:null,showAttachments:!1,mediaInfos:[]};c.layers.push(d)},_generateFeatureCollectionTemplate:function(c,
a,b){return{layerDefinition:{name:c,title:a,geometryType:b,objectIdField:"__OBJECTID",type:"Feature Layer",typeIdField:"",drawingInfo:{fixedSymbols:!0},fields:[{name:"__OBJECTID",alias:"OBJECTID",type:"esriFieldTypeOID",editable:!1,nullable:!1,domain:null}],types:[],capabilities:"Query,Update"},featureSet:{features:[],geometryType:b}}},_createField:function(c,a,b,f,d,g){return"integer"===b?{name:c,alias:a,type:"esriFieldTypeInteger",editable:!0,nullable:!0,visible:!!f,domain:d}:"double"===b?{name:c,
alias:a,type:"esriFieldTypeDouble",editable:!0,nullable:!0,visible:!!f,domain:d}:"date"===b?{name:c,alias:a,type:"esriFieldTypeDate",length:36,editable:!0,nullable:!0,visible:!!f,domain:d}:{name:c,alias:a,type:"esriFieldTypeString",length:g||255,editable:!0,nullable:!0,visible:!!f,domain:d}}})});