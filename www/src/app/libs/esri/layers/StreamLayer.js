//>>built
define("esri/layers/StreamLayer","dojo/_base/declare dojo/_base/connect dojo/_base/array dojo/_base/Color dojo/_base/lang dojo/has dojo/io-query dojo/on dojo/aspect ../kernel ../request ../graphic ./FeatureLayer ./StreamMode ./StreamTrackManager ../geometry/jsonUtils ../symbols/SimpleFillSymbol ../symbols/SimpleLineSymbol ../symbols/SimpleMarkerSymbol ../renderers/SimpleRenderer ./PurgeOptions".split(" "),function(n,w,f,p,h,x,y,z,F,A,r,B,s,C,D,q,t,l,u,E,v){n=n([s],{declaredClass:"esri.layers.StreamLayer",
_preventInit:!0,constructor:function(a,b){b=b||{};if(!b.mode||b.mode===s.MODE_STREAM)this._isStream=!0,this.currentMode=this.mode=s.MODE_STREAM,this._mode=new C(this);this.purgeOptions=new v(this,b.purgeOptions||{});this.purgeInterval=b.purgeInterval||0;this._reconnectAttempts=0;this.maxReconnectAttempts=10;this.socket=this._reconnectTimeoutId=null;this._keepLatestQueried=!1;this._keepLatestUrl=null;this._relatedQueried=!1;this._joinField=this._relatedUrl=null;this._refreshing=!1;this._attemptReconnect=
h.hitch(this,this._attemptReconnect);this._purge=h.hitch(this,this._purge);this._processServiceJson=h.hitch(this,this._processServiceJson);if(h.isObject(a)&&a.layerDefinition)this._initFeatureLayer(a,b);else{var c=this;r({url:a,content:h.mixin({f:"json"}),callbackParamName:"callback"}).then(function(a){c._processServiceJson(a,b)},function(a){c._errorHandler(a)})}},_processServiceJson:function(a,b){var c=this;a.relatedFeatures&&a.relatedFeatures.featuresUrl&&a.relatedFeatures.joinField?(this._relatedUrl=
a.relatedFeatures.featuresUrl,this.objectIdField=this._joinField=a.relatedFeatures.joinField,r({url:this._relatedUrl,content:{f:"json"},callbackParamName:"callback"}).then(function(d){d=d.fields||[];var e=f.map(a.fields,function(a){return a.name});f.forEach(d,function(c){-1===f.indexOf(e,c.name)&&a.fields.push(c)});b.resourceInfo=a;c._initFeatureLayer(c._url,b)},function(a){c.onError({error:a})})):(b.resourceInfo=a,this._initFeatureLayer(this._url,b))},_initLayer:function(a,b){this.inherited(arguments);
if(a){var c;if(a.layerDefinition)this.purgeOptions=new v(this,this._params.purgeOptions||{}),this.socketUrl=this._params.socketUrl||a.layerDefinition.socketUrl||void 0;else{if(this._params.socketUrl)this.socketUrl=this._params.socketUrl;else{var d=this._getWebsocketConnectionInfo(a),e=d.urls;e&&e.length?(this._socketUrls=e,this.socketUrl=e[0],this.socketDirection="broadcast"===this._params.socketDirection?"broadcast":"subscribe",this.socketUrl+="/"+this.socketDirection,this._websocketToken=d.token,
e.length>this.maxReconnectAttempts&&(this.maxReconnectAttempts=e.length)):(this.socketUrl=void 0,d="No web socket urls were retrieved from the Stream Service. Layer will not attempt to connect.","https:"===location.protocol&&(d+=" An insecure web socket connection cannot be made from a secure web page."),this.onError(Error(d)))}if(this._params.filter)try{this._filter=c=this._makeFilter(this._params.filter)}catch(g){this.onError(Error("Error trying to create filter object: "+g+". Layer will not have filter applied")),
this._filter=null}if(this._params.geometryDefinition||this._outFields||this._defnExpr){c=c||{};c.geometry=this._params.geometryDefinition;c.outFields=this._outFields;c.where=this._defnExpr;try{this._filter=c=this._makeFilter(c)}catch(m){this.onError(Error("Error trying to create filter object: "+m+". Layer will not have filter applied")),this._filter=null}}}this.maximumTrackPoints=this._params.maximumTrackPoints||0===this._params.maximumTrackPoints?this._params.maximumTrackPoints:1;(this._params.refreshRate||
0===this._params.refreshRate)&&this._mode&&this._mode._setRefreshRate&&this._mode._setRefreshRate(this._params.refreshRate);this._keepLatestUrl=a.keepLatestArchive?a.keepLatestArchive.featuresUrl:null;a.relatedFeatures&&(a.relatedFeatures.featuresUrl&&a.relatedFeatures.joinField)&&(this._relatedUrl=a.relatedFeatures.featuresUrl,this.objectIdField=this._joinField=a.relatedFeatures.joinField);this.objectIdField||this._makeObjectIdField();this._map&&(this.socketUrl&&!this._connected)&&this.connect()}},
_setMap:function(a){var b=this.inherited(arguments),c=this._getRenderer();if(this.timeInfo&&(this._trackIdField||c&&(c.latestObservationRenderer||c.trackRenderer)))this._trackManager=new D(this),this._trackManager.initialize(a);this.socketUrl&&(!this._connected&&this._map)&&this.connect();return b},_unsetMap:function(a,b){f.forEach(this._connects,w.disconnect);(this._connected||this._reconnecting||this.socket)&&this.disconnect();this._togglePurgeT();this.inherited(arguments);this._map=null},_suspend:function(){this._togglePurgeT();
this.inherited(arguments)},_resume:function(){this.inherited(arguments);this._togglePurgeT(!0)},clear:function(){try{this._mode&&this._mode._clearDrawBuffer&&this._mode._clearDrawBuffer(),this._mode&&this._mode._clearTimeBin&&this._mode._clearTimeBin(),this._mode&&this._mode._clearFeatureMap&&this._mode._clearFeatureMap(),this._trackManager&&this._trackManager.clearTracks()}catch(a){}this.inherited(arguments)},redraw:function(){this._mode&&this._mode._flushDrawBuffer&&this._mode._flushDrawBuffer();
this.inherited(arguments)},setDefinitionExpression:function(a){this.setFilter({where:a})},getDefinitionExpression:function(){var a;this._filter&&(a=this._filter.where);return a},destroy:function(){this.disconnect();this.inherited(arguments)},onResume:function(a){this.inherited(arguments)},setGeometryDefinition:function(a){this.setFilter({geometry:a})},getGeometryDefinition:function(){var a;this._filter&&(a=this._filter.geometry);return a},connect:function(a){var b=this,c={},d=this._filter,e,g,m=this.socketUrl,
f;try{if(!this._connected){if(this._map){var k;if(this._relatedUrl&&!this._relatedQueried&&this._mode._fetchArchive)return k=this.on("update-end",function(a){b._relatedQueried=!0;k.remove();k=null;(!a||!a.error)&&b.connect()}),this._mode._fetchArchive(this._relatedUrl),!1;if(this._keepLatestUrl&&!this._keepLatestQueried&&this._mode._fetchArchive)return k=this.on("update-end",function(a){b._keepLatestQueried=!0;k.remove();k=null;(!a||!a.error)&&b.connect()}),this._mode._fetchArchive(this._keepLatestUrl),
!1}this._websocketToken&&(c.token=this._websocketToken);this._map&&(this._map.spatialReference&&this.spatialReference)&&this._map.spatialReference.wkid!==this.spatialReference.wkid&&(c.outSR=this._map.spatialReference.wkid);if(d)for(g in d)null!==d[g]&&(e="geometry"===g?JSON.stringify(d[g]):d[g],c[g]=e);m+="?"+y.objectToQuery(c);return f=this._createConnection(m,a)}}catch(h){a&&a(h,!1),this.onConnectionError({error:h})}},disconnect:function(a){var b=this._refreshing?"Disconnecting as part of layer refresh cycle":
"Connection closed from client",c=this._refreshing?!0:!1;this._reconnectTimeoutId&&clearTimeout(this._reconnectTimeoutId);this._refreshing=this._reconnecting=this._connected=!1;this.socket&&this.socket.close();this.onDisconnect({willReconnect:c,message:b});a&&a(null,!0)},setFilter:function(a){var b,c;if(this._collection)return this.onError("Filter can only be set when the source of the layer is a Stream Service"),!1;try{if(void 0!==a.outFields)return c=Error("Outfields property cannot be changed after layer is created"),
this.onFilterChange({filter:this.getFilter(),error:c}),!1;b=this._makeFilter(a)}catch(d){return c=Error(d),this.onFilterChange({filter:this.getFilter(),error:c}),!1}if(this.socket)a={filter:b},this.socket.send(JSON.stringify(a));else z.once(this,"connect",function(a){this.setFilter(b)});return!0},getFilter:function(){var a=this._filter,b={},c=["geometry","outFields","where"];a&&f.forEach(c,function(c){var e=a[c];e&&("geometry"===c?e=q.fromJson(e):"outFields"===c&&(e=e.split(",")),b[c]=e)});return b},
setMaximumTrackPoints:function(a){if(!a&&0!==a)return!1;this.maximumTrackPoints=a;this._mode.propertyChangeHandler(3)},getUniqueValues:function(a){var b,c={},d=[];b=this._getField(a,!0);if(!b)return d;a=b.name;f.forEach(this.graphics||[],function(b){b=(b.attributes||{})[a];void 0!==b&&!c[b]&&(c[b]=1,d.push(b))});d.sort(function(a,c){return a<c?-1:a>c?1:0});return d},getLatestObservations:function(){var a=[];return a=this._trackManager?this._trackManager.getLatestObservations():this.graphics},setPurgeInterval:function(a){var b=
this.purgeInterval;this.purgeInterval=a;this._togglePurgeT();a&&this._togglePurgeT(!0);if(b!==a)this.onPurgeIntervalChange();return this},_togglePurgeT:function(a){if(a&&this.purgeInterval){var b=this;clearTimeout(this._purgeT);this._mode&&this._mode._flushDrawBuffer&&(this._purgeT=setTimeout(function(){!b.updating&&!b.suspended&&(b._mode._flushDrawBuffer(),b._togglePurgeT(!0))},6E4*this.purgeInterval))}else this._purgeT&&(clearTimeout(this._purgeT),this._refreshT=null)},onMessage:function(){},onConnect:function(){},
onDisconnect:function(){},onFilterChange:function(){},onAttemptReconnect:function(){},onConnectionError:function(){},onPurgeIntervalChange:function(){},_createConnection:function(a,b){var c=this,d=new WebSocket(a);d.onopen=function(){c.socket=d;c._connected=!0;c._reconnecting=!1;c._reconnectAttempts=0;c._bind();c.onConnect();b&&b(null,!0)};d.onclose=function(a){var b,d=!0,f=c._connected,k=null;if(c._connected||c._reconnecting){if(a.code)if(b="Connection failed: ",1001===a.code)b+=a.reason||"Service is going away.",
d=!1;else if(4400===a.code)b+=a.reason||"Invalid url parameters. Check filter properties.",d=!1;else if(4404===a.code)b+="Service not found",d=!1;else if(4401===a.code||4403===a.code)b+="Not authorized",d=!1;d&&(c._reconnectAttempts+=1,c._reconnectAttempts>c.maxReconnectAttempts&&(b="Maximum reconnect attempts exceeded",d=!1,f=!0));c._connected=!1;f&&(b&&(k=Error(b)),c.onDisconnect({error:k,willReconnect:d}));d?c._attemptReconnect():c.socket=null}else c.socket||(k=Error("Could not make connection to service"),
c.onConnectionError({error:k})),c.socket=null,c._connected=!1};d.onerror=function(a){};return d},_purge:function(){var a,b=[],c;if(this.purgeOptions.displayCount&&this.graphics.length>this.purgeOptions.displayCount)for(a=0;a<this.graphics.length-this.purgeOptions.displayCount;a++)c=this.graphics[a],b.push(c);0<b.length&&(this._mode._removeFeatures(b),this._trackManager&&this._trackManager.removeFeatures(b))},_bind:function(){var a=this;this.socket.onmessage=function(b){a._onMessage(JSON.parse(b.data))}},
_onMessage:function(a){var b=this;this.onMessage(a);var c={create:function(a){b._create(a)},update:function(a){b._update(a)},"delete":function(a){b._delete(a)}};if(a.type)c[a.type](a.feature);else a.hasOwnProperty("filter")?b._handleFilterMessage(a):this._create(a)},_create:function(a){function b(a){if(!c._featureHasOID(a,d)){if(!a.geometry)return!1;a.attributes=a.attributes||{};a.attributes[d]=c._nextId++}a=a.declaredClass?a:new B(a);c._mode.drawFeature(a)}var c=this,d=c.objectIdField;a.length?a.forEach(function(a){a&&
b(a)}):a&&b(a)},_delete:function(a){var b=this,c=a[b.objectIdField]||a.attributes[b.objectIdField],d=!1;this.graphics.forEach(function(a){a.attributes[b.objectIdField]==c&&(d=a)});d&&this.remove(d)},_update:function(a){var b=this,c=!1;this.graphics.forEach(function(d){d.attributes[b.objectIdField]==a.attributes[b.objectIdField]&&(c=d)});c&&(a.attributes&&c.setAttributes(a.attributes),a.geometry&&c.setGeometry(q.fromJson(a.geometry)))},_makeFilter:function(a){var b,c=null;a=a||{};if(void 0!==a.geometry)if(c=
c||{},null===a.geometry)c.geometry=null;else{b="string"===typeof a.geometry?q.fromJson(JSON.parse(a.geometry)):a.geometry.declaredClass?a.geometry:q.fromJson(a.geometry);if(!b||"point"===b.type)throw"Query object contains invalid geometry";"extent"!==b.type&&(b=b.getExtent());if(!b||0===b.getHeight()&&0===b.getWidth())throw"Invalid filter geometry: Extent cannot have a height and width of 0";c.spatialRel="esriSpatialRelIntersects";c.geometryType="esriGeometryEnvelope";c.geometry=b.toJson()}void 0!==
a.where&&(c=c||{},c.where=a.where);if(void 0!==a.outFields&&(c=c||{},a="string"===typeof a.outFields?"*"===a.outFields?null:a.outFields.replace(/,\s+/g,",").split(","):null===a.outFields?null:a.outFields,a=this._makeOutFields(a))){if(a.errors&&0<a.errors.length)throw"Invalid filter outFields. "+a.errors.join(",");c.outFields=a.fields?a.fields.join(","):null}return c},_makeOutFields:function(a){var b=this,c=[],d=[],e={fields:null};if(!a||0===a.length)return e;f.forEach(a,function(a){if("*"===a)return e;
var f=b._getField(a,!0);f?c.push(f.name):d.push("Field named "+a+" not found in schema.")});a=b._getOutFields();f.forEach(a,function(a){b._getField(a)&&-1===f.indexOf(c,a)&&c.push(a)});e.fields=c;e.errors=d;return e},_handleFilterMessage:function(a){a.error?(a=Error(a.error.join(",")),this.onFilterChange({filter:this.getFilter(),error:a})):(a=a.filter,a.geometry&&"string"===typeof a.geometry&&(a.geometry=JSON.parse(a.geometry)),this._filter=a,this.onFilterChange({filter:this.getFilter()}))},_getWebsocketConnectionInfo:function(a){var b=
{urls:[]},c,d=[],e=[],g,h,l;a.streamUrls&&f.forEach(a.streamUrls,function(a){"ws"===a.transport&&(c=a.urls,b.token=a.token)});if(!c)return b;f.forEach(c,function(a){0===a.lastIndexOf("wss",0)?e.push(a):d.push(a)});a="https:"===location.protocol||0===this.url.lastIndexOf("https:",0)?e:0===d.length?e:d;if(1<a.length)for(g=0;g<a.length-1;g++)h=g+Math.floor(Math.random()*(a.length-g)),l=a[h],a[h]=a[g],a[g]=l;b.urls=a;return b},_attemptReconnect:function(){var a=this,b;this._reconnectTimeoutId=null;a._connected=
!1;if(!a._socketUrls)return!1;if(!a._collection&&!a._reconnecting&&a.socket&&a.credential)return a._reconnecting=!0,a._getServiceConnectionMetadata(a._attemptReconnect),!1;a._reconnecting=!0;a.socket=null;if(a._reconnectAttempts>a.maxReconnectAttempts)return a._reconnecting=!1;a.socketUrl=a._socketUrls[a._reconnectAttempts>a._socketUrls.length-1?a._reconnectAttempts%a._socketUrls.length:a._reconnectAttempts];a.socketUrl+="/"+a.socketDirection;b=a._randomIntFromInterval(0,1E3);this._reconnectTimeoutId=
setTimeout(function(){a.onAttemptReconnect({count:a._reconnectAttempts,url:a.socketUrl});a.connect()},1E3*a._reconnectAttempts+b)},_getServiceConnectionMetadata:function(a){var b=this,c=b._url.path;a="function"===typeof a?a:null;r({url:c,content:h.mixin({f:"json"},this._url.query),callbackParamName:"callback"}).then(function(c){c=b._getWebsocketConnectionInfo(c);b._websocketToken=c.token;a&&a()},function(a){b.onError(Error(a))})},_setDefaultRenderer:function(){var a=this.geometryType,b=new p([5,112,
176,0.8]),c=new p([255,255,255]),c=new l(l.STYLE_SOLID,c,1),d;if("esriGeometryPoint"===a||"esriGeometryMultipoint"===a)d=new u(u.STYLE_CIRCLE,10,c,b);else if("esriGeometryPolyline"===a)d=new l(l.STYLE_SOLID,b,2);else if("esriGeometryPolygon"===a||"esriGeometryEnvelope"===a)b=new p([5,112,176,0.2]),c=new p([5,112,176,0.8]),c=new l(l.STYLE_SOLID,c,1),d=new t(t.STYLE_SOLID,c,b);d&&this.setRenderer(new E(d))},_makeObjectIdField:function(){var a=1,b,c,d=[];if(!this.objectIdField){b=this.fields.length;
for(c=0;c<b;c++)d.push(this.fields[c].name.toLowerCase());for(;-1!==f.indexOf(d,"objectid_"+a);)a+=1;this.objectIdField="objectid_"+a;this.fields.push({name:"objectid_"+a,type:"esriFieldTypeOID",alias:"objectid_"+a,nullable:!1})}},_featureHasOID:function(a,b){return a.attributes&&(a.attributes[b]||0===a.attributes[b])},_randomIntFromInterval:function(a,b){return Math.floor(Math.random()*(b-a+1)+a)}});x("extend-esri")&&h.setObject("layers.StreamLayer",n,A);return n});