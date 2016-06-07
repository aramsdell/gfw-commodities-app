define(["exports","esri/tasks/BufferParameters","esri/tasks/GeometryService","esri/SpatialReference","esri/request","esri/config","dojo/Deferred","dojo/promise/all"],function(e,r,t,n,a,o,i,s){"use strict";function u(e){return e&&e.__esModule?e:{"default":e}}function E(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}function R(e,r,t){var n=new d["default"];return(0,A["default"])({BUFFER:F(e,t||O.RADIUS),INDO:V(e)}).then(function(e){var t=e.BUFFER[0];G=e.INDO,(0,A["default"])({HISTORIC:J(t),FUTURE:q(t)}).then(function(e){n.resolve(K(e,r))})}),n}Object.defineProperty(e,"__esModule",{value:!0}),e["default"]=R;var _=u(r),c=u(t),S=u(n),l=u(a),m=u(o),d=u(i),A=u(s),f=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e},T=function(){function e(e,r){for(var t=0;t<r.length;t++){var n=r[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(r,t,n){return t&&e(r.prototype,t),n&&e(r,n),r}}(),O={RADIUS:50,DENSITY:30,TIMEOUT:3e4,PIXEL_SIZE:100,FUTURE_YEAR_COUNT:3,CONTENT_FORMAT:"json",HISTORIC_YEAR_END_INDEX:11,HISTORIC_YEAR_START_INDEX:8,GEOMETRY_POINT:"esriGeometryPoint",GEOMETRY_TYPE:"esriGeometryPolygon"},p={1:"low",2:"medium low",3:"medium",4:"medium high",5:"high"},v={ADD:1,MULTIPLY:3},I={mosaic:function(e){return{mosaicMethod:"esriMosaicLockRaster",mosaicOperation:"MT_FIRST",lockRasterIds:[e],ascending:!0}},arithmetic:function(e,r,t){return{rasterFunction:"Arithmetic",rasterFunctionArguments:{Raster:e,Raster2:r,Operation:t}}},remap:function(e,r,t){return{rasterFunction:"Remap",rasterFunctionArguments:{InputRanges:r,OutputValues:t,Raster:e,AllowUnmatched:!1}}}},g={IMAGE_SERVICE_URL:"http://gis-gfw.wri.org/arcgis/rest/services/image_services/analysis/ImageServer",GEOMETRY_SERVICE_URL:"http://gis-gfw.wri.org/arcgis/rest/services/Utilities/Geometry/GeometryServer",BOUNDARY_SERVICE_URL:"http://gis-potico.wri.org/arcgis/rest/services/CommoditiesAnalyzer/mapfeatures/MapServer/6",CANOPY_DENSITY_REMAP:I.remap("$520",[0,O.DENSITY,O.DENSITY,101],[0,1]),TREE_COVER_LOSS:{id:"$530",bounds:[1,14]},PRIMARY_FOREST:{id:"$519",bounds:[1,2]},PEAT:{id:"$8",bounds:[0,1]},PROTECTED_AREA:{id:"$10",bounds:[0,1]},CARBON:{id:"$524",bounds:[0,2],remap:I.remap("$524",[0,20,20,80,80,1e3],[0,1,2])},TREE_COVER_EXTENT:{id:"$520"},INTACT_FOREST_LANDSCAPE:{id:"$9"}};m["default"].defaults.io.corsEnabledServers.push("gis-gfw.wri.org"),m["default"].defaults.io.corsEnabledServers.push("gis-potico.wri.org");var h={CARBON_AREA:{type:"percent",mean:97.6,std_dev:4.6},CARBON_LOSS:{type:"percent",mean:20.242,std_dev:9.526},FIRE_ACTIVITY_RATE:{type:"rate",mean:-14.107,std_dev:387.391},FIRE_ACTIVITY:{type:"number",mean:1414.8787,std_dev:2059.656},WDPA_AREA:{type:"percent",mean:7.0943707,std_dev:8.7947665},WDPA_LOSS:{type:"percent",mean:3.8825311,std_dev:8.45626926},PEAT_AREA:{type:"percent",mean:9.8927097,std_dev:12.6404304},PEAT_LOSS:{type:"percent",mean:.3941634139,std_dev:.703893798},PRIMARY_FOREST_AREA:{type:"percent",mean:12.1994422,std_dev:16.6663917},PRIMARY_FOREST_LOSS:{type:"percent",mean:.4083326564,std_dev:.7294470828},TREE_COVER_FUTURE_RATE:{type:"rate",mean:2879.146877,std_dev:4281.066332},TREE_COVER_LOSS_RATE:{type:"rate",mean:20.33717183,std_dev:9.556807527}},P=function(e){var r=e.histograms,t=e.noSlice,n=r&&1===r.length?r[0].counts:[];return t?n:n.slice(1)},C=function(e){return parseInt(e.replace(/\$/,""))},y=function(e,r){var t=e/r*100;return t>100?100:t},L=function(e,r,t){return(e-r)/t},N=function(e){var r=void 0;return r=e>=1?5:e>=.5&&.99>=e?4:e>=-.49&&.49>=e?3:e>=-.99&&-.49>=e?2:1,{score:r,zScore:e,rank:p[r]}},k=function(){return{score:1,zScore:0,rank:p[1]}},M=function(e,r){var t=e*r,n=void 0;return n=t>=21?5:t>=16&&20>=t?4:t>=11&&15>=t?3:t>=5&&10>=t?2:1,p[n]},U=function(e){var r=0;return r+=e[8]||0,r+=e[9]||0,r+=e[10]||0,r+=e[11]||0,r/4},Y=function(e,r){if(e.length<r)return 0;for(var t=[],n=1;r>n;n++)t.push(e[e.length-n]-e[e.length-(1+n)]);return t.reduce(function(e,r){return e+r},0)/t.length},b=function(e){for(var r=[],t=O.HISTORIC_YEAR_START_INDEX;t<O.HISTORIC_YEAR_END_INDEX;t++)r.push(e[t]-e[t+1]);return r.reduce(function(e,r){return e+r},0)/r.length},z=function(){function e(r,t){E(this,e),this.fromBounds=function(e){for(var r=[],t=e[1],n=e[0];t>=n;n++)r.push(n);return r},this.A=this.fromBounds(r),this.B=this.fromBounds(t)}return T(e,[{key:"encode",value:function(e,r){return this.B.length*e+r}},{key:"decode",value:function(e){var r=e%this.B.length,t=(e-r)/this.B.length;return[t,r]}},{key:"getSimpleRule",value:function(e,r){var t=g.CANOPY_DENSITY_REMAP,n=I.arithmetic(t,I.arithmetic(e,r,v.MULTIPLY),v.MULTIPLY);return n.rasterFunctionArguments.Raster2.outputPixelType="U8",n}},{key:"getRule",value:function(e,r){var t=I.remap(e,[this.A[0],this.A[this.A.length-1]+1],[this.B.length]),n=g.CANOPY_DENSITY_REMAP,a=I.arithmetic(n,I.arithmetic(I.arithmetic(t,e,v.MULTIPLY),r,v.ADD),v.MULTIPLY);return a.rasterFunctionArguments.Raster2.outputPixelType="U8",a}}]),e}(),D=function(e,r){return r.geometry&&(r.geometry=JSON.stringify(r.geometry)),r.renderingRule&&(r.renderingRule=JSON.stringify(r.renderingRule)),r.mosaicRule&&(r.mosaicRule=JSON.stringify(r.mosaicRule)),r.geometryType=r.geometryType||O.GEOMETRY_TYPE,r.pixelSize=r.pixelSize||O.PIXEL_SIZE,r.f=r.f||O.CONTENT_FORMAT,(0,l["default"])({url:e+"/computeHistograms",callbackParamName:"callback",timeout:O.TIMEOUT,content:r,handleAs:"json"},{usePost:!0})},F=function(e,r){var t=new d["default"],n=new c["default"](g.GEOMETRY_SERVICE_URL),a=new _["default"];return a.geometries=[e],a.distances=[r],a.unit=c["default"].UNIT_KILOMETER,a.outSpatialReference=new S["default"](102100),n.buffer(a,t.resolve,console.error),t},w=function(e){var r=new d["default"],t={areaUnit:'{"areaUnit": "esriHectares"}',polygons:JSON.stringify([e]),calculationType:"geodesic",sr:102100,f:"json"};return(0,l["default"])({url:g.GEOMETRY_SERVICE_URL+"/areasAndLengths",callbackParamName:"callback",timeout:O.TIMEOUT,content:t,handleAs:"json"},{usePost:!0}).then(function(e){r.resolve(e.areas[0])}),r},V=function(e){var r=new d["default"],t={where:"ISO = 'IDN'",geometryType:O.GEOMETRY_POINT,geometry:JSON.stringify(e),returnGeometry:!1,outFields:[],f:"json"};return(0,l["default"])({url:g.BOUNDARY_SERVICE_URL+"/query",callbackParamName:"callback",timeout:O.TIMEOUT,content:t,handleAs:"json"},{usePost:!0}).then(function(e){r.resolve(e&&e.features&&e.features.length>0)}),r},B=void 0,G=void 0,x=function(e){if(B)return B;B=new d["default"];var r={geometry:e,pixelSize:O.PIXEL_SIZE,renderingRule:I.arithmetic(g.CANOPY_DENSITY_REMAP,g.TREE_COVER_LOSS.id,v.MULTIPLY)};return D(g.IMAGE_SERVICE_URL,r).then(function(e){B.resolve(P({histograms:e.histograms}))}),B},X=function(e){var r=new d["default"],t=new z(g.TREE_COVER_LOSS.bounds,g.PRIMARY_FOREST.bounds),n=t.getRule(g.TREE_COVER_LOSS.id,g.PRIMARY_FOREST.id),a={geometry:e,pixelSize:O.PIXEL_SIZE,renderingRule:n};return D(g.IMAGE_SERVICE_URL,a).then(function(e){for(var n=t.A,a=t.B,o=P({histograms:e.histograms,noSlice:!0}),i=[],s=0;s<n.length;s++){for(var u=0,E=0;E<a.length;E++){var R=t.encode(n[s],a[E]);u+=o[R]||0}i.push(u)}r.resolve(i)}),r},j=function(e){var r=new d["default"],t=new z(g.TREE_COVER_LOSS.bounds,g.PEAT.bounds),n=t.getSimpleRule(g.TREE_COVER_LOSS.id,g.PEAT.id),a={geometry:e,pixelSize:O.PIXEL_SIZE,renderingRule:n};return D(g.IMAGE_SERVICE_URL,a).then(function(e){r.resolve(P({histograms:e.histograms}))}),r},$=function(e){var r=new d["default"],t=new z(g.TREE_COVER_LOSS.bounds,g.PROTECTED_AREA.bounds),n=t.getSimpleRule(g.TREE_COVER_LOSS.id,g.PROTECTED_AREA.id),a={geometry:e,pixelSize:O.PIXEL_SIZE,renderingRule:n};return D(g.IMAGE_SERVICE_URL,a).then(function(e){r.resolve(P({histograms:e.histograms}))}),r},Z=function(e){var r=new d["default"],t=new z(g.TREE_COVER_LOSS.bounds,g.CARBON.bounds),n=t.getRule(g.TREE_COVER_LOSS.id,g.CARBON.remap),a={geometry:e,pixelSize:O.PIXEL_SIZE,renderingRule:n};return D(g.IMAGE_SERVICE_URL,a).then(function(e){for(var n=t.A,a=t.B,o=P({histograms:e.histograms,noSlice:!0}),i=[],s=0;s<n.length;s++){for(var u=0,E=1;E<a.length;E++){var R=t.encode(n[s],a[E]);u+=o[R]||0}i.push(u)}r.resolve(i)}),r},H=function(e,r){var t=new d["default"],n={geometry:r,pixelSize:O.PIXEL_SIZE,mosaicRule:I.mosaic(C(e))};return D(g.IMAGE_SERVICE_URL,n).then(function(e){if(e.histograms.length){var r=P({histograms:e.histograms});t.resolve(r.length?r[0]:0)}else t.resolve(0)},function(){t.resolve(0)}),t},W=function(e){var r=new d["default"],t={geometry:e,pixelSize:O.PIXEL_SIZE,renderingRule:I.remap(g.CARBON.id,[0,20,20,1e3],[0,1])};return D(g.IMAGE_SERVICE_URL,t).then(function(e){if(e.histograms.length){var t=P({histograms:e.histograms});r.resolve(t.length?t[0]:0)}else r.resolve(0)},function(){r.resolve(0)}),r},J=function(e){var r=new d["default"];return(0,A["default"])({LOSS:x(e),PRIMARY_FOREST:X(e),PEAT:j(e),PROTECTED_AREA:$(e),CARBON:Z(e)}).then(function(e){var t=b(e.LOSS)/1e3,n=U(e.PRIMARY_FOREST)/1e3,a=U(e.PEAT)/1e3,o=U(e.PROTECTED_AREA)/1e3,i=U(e.CARBON)/1e3,s=t?N(L(t,h.TREE_COVER_LOSS_RATE.mean,h.TREE_COVER_LOSS_RATE.std_dev)):k(),u=n?N(L(n,h.PRIMARY_FOREST_LOSS.mean,h.PRIMARY_FOREST_LOSS.std_dev)):k(),E=a?N(L(a,h.PEAT_LOSS.mean,h.PEAT_LOSS.std_dev)):k(),R=o?N(L(o,h.WDPA_LOSS.mean,h.WDPA_LOSS.std_dev)):k(),_=i?N(L(i,h.CARBON_LOSS.mean,h.CARBON_LOSS.std_dev)):k();r.resolve({primary_forest:f({amount:n},u),peat:f({amount:a},E),protected_areas:f({amount:o},R),carbon:f({amount:i},_),tree_cover:f({amount:t},s)})}),r},q=function(e){var r=new d["default"];return(0,A["default"])({AREA:w(e),LOSS_RATE:x(e),PRIMARY_FOREST:H(g.PRIMARY_FOREST.id,e),PEAT:H(g.PEAT.id,e),PROTECTED_AREA:H(g.PROTECTED_AREA.id,e),CARBON:W(e),IFL:H(g.INTACT_FOREST_LANDSCAPE.id,e)}).then(function(e){var t=Y(e.LOSS_RATE,O.FUTURE_YEAR_COUNT),n=y(G?e.PRIMARY_FOREST:e.IFL,e.AREA),a=y(e.PEAT,e.AREA),o=y(e.PROTECTED_AREA,e.AREA),i=y(e.CARBON,e.AREA),s=n?N(L(n,h.PRIMARY_FOREST_AREA.mean,h.PRIMARY_FOREST_AREA.std_dev)):k(),u=a?N(L(a,h.PEAT_AREA.mean,h.PEAT_AREA.std_dev)):k(),E=o?N(L(o,h.WDPA_AREA.mean,h.WDPA_AREA.std_dev)):k(),R=i?N(L(i,h.CARBON_AREA.mean,h.CARBON_AREA.std_dev)):k(),_=t?N(L(t,h.TREE_COVER_FUTURE_RATE.mean,h.TREE_COVER_FUTURE_RATE.std_dev)):k();r.resolve({primary_forest:f({amount:n},s),peat:f({amount:a},u),protected_areas:f({amount:o},E),carbon:f({amount:i},R),tree_cover:f({amount:t},_)})}),r},K=function(e,r){var t=e.HISTORIC,n=e.FUTURE,a=0===n.tree_cover.zScore&&0===t.tree_cover.zScore,o=0===n.primary_forest.zScore&&0===t.primary_forest.zScore,i=0===n.peat.zScore&&0===t.peat.zScore,s=0===n.protected_areas.zScore&&0===t.protected_areas.zScore,u=0===n.carbon.zScore&&0===t.carbon.zScore,E=(t.tree_cover.zScore+t.primary_forest.zScore+t.peat.zScore+t.protected_areas.zScore+t.carbon.zScore)/5,R=(n.tree_cover.zScore+n.primary_forest.zScore+n.peat.zScore+n.protected_areas.zScore+n.carbon.zScore)/5,_=N(E),c=N(R);return{tree_cover:{extent:{amount:n.tree_cover.amount,rank:n.tree_cover.rank},loss:{amount:t.tree_cover.amount,rank:t.tree_cover.rank},risk:a?k().rank:N((n.tree_cover.zScore+t.tree_cover.zScore)/2).rank},primary_forest:{extent:{amount:n.primary_forest.amount,rank:n.primary_forest.rank},loss:{amount:t.primary_forest.amount,rank:t.primary_forest.rank},risk:o?k().rank:N((n.primary_forest.zScore+t.primary_forest.zScore)/2).rank},peat:{extent:{amount:n.peat.amount,rank:n.peat.rank},loss:{amount:t.peat.amount,rank:t.peat.rank},risk:i?k().rank:N((n.peat.zScore+t.peat.zScore)/2).rank},protected_areas:{extent:{amount:n.protected_areas.amount,rank:n.protected_areas.rank},loss:{amount:t.protected_areas.amount,rank:t.protected_areas.rank},risk:s?k().rank:N((n.protected_areas.zScore+t.protected_areas.zScore)/2).rank},carbon:{extent:{amount:n.carbon.amount,rank:n.carbon.rank},loss:{amount:t.carbon.amount,rank:t.carbon.rank},risk:u?k().rank:N((n.carbon.zScore+t.carbon.zScore)/2).rank},fire:{extent:{amount:0,rank:"N/A"},loss:{amount:0,rank:"N/A"},risk:"N/A"},historic_loss:_.rank,future_risk:c.rank,priority_level:M(_.score,c.score),mill_name:r||""}}});