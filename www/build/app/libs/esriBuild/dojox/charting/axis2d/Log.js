//>>built
define("dojox/charting/axis2d/Log","dojo/_base/lang dojo/_base/array dojo/_base/sniff dojo/_base/declare dojo/_base/connect dojo/dom-geometry ./Invisible ../scaler/common ../scaler/linear ../scaler/log ./common dojox/gfx dojox/lang/utils dojox/lang/functional".split(" "),function(x,J,X,Z,N,$,aa,da,ba,ca,U,w,Q,R){return Z("dojox.charting.axis2d.Log",aa,{defaultParams:{vertical:!1,fixUpper:"none",fixLower:"none",natural:!1,leftBottom:!0,includeZero:!1,fixed:!0,majorLabels:!0,minorTicks:!0,minorLabels:!0,
microTicks:!1,rotation:0,htmlLabels:!0,enableCache:!1,dropLabels:!0,labelSizeChange:!1,log:10},optionalParams:{min:0,max:1,from:0,to:1,majorTickStep:4,minorTickStep:2,microTickStep:1,labels:[],labelFunc:null,maxLabelSize:0,maxLabelCharCount:0,trailingSymbol:null,stroke:{},majorTick:{},minorTick:{},microTick:{},tick:{},font:"",fontColor:"",title:"",titleGap:0,titleFont:"",titleFontColor:"",titleOrientation:""},constructor:function(a,d){this.opt=x.clone(this.defaultParams);Q.updateWithObject(this.opt,
d);Q.updateWithPattern(this.opt,d,this.optionalParams);this.opt.enableCache&&(this._textFreePool=[],this._lineFreePool=[],this._textUsePool=[],this._lineUsePool=[]);this._invalidMaxLabelSize=!0;1<this.opt.log?(this.scalerType=ca,this.scalerType.setBase(this.opt.log)):this.scalerType=ba},setWindow:function(a,d){a!=this.scale&&(this._invalidMaxLabelSize=!0);return this.inherited(arguments)},_groupLabelWidth:function(a,d,g){if(!a.length)return 0;50<a.length&&(a.length=50);x.isObject(a[0])&&(a=R.map(a,
function(a){return a.text}));g&&(a=R.map(a,function(a){return 0==x.trim(a).length?"":a.substring(0,g)+this.trailingSymbol},this));a=a.join("\x3cbr\x3e");return w._base._getTextBox(a,{font:d}).w||0},_getMaxLabelSize:function(a,d,g,h,f,l){if(null==this._maxLabelSize&&6==arguments.length){var e=this.opt;this.scaler.minMinorStep=this._prevMinMinorStep=0;var b=x.clone(e);delete b.to;delete b.from;var m=this.scalerType.buildScaler(a,d,g,b,e.to-e.from);m.minMinorStep=0;this._majorStart=m.major.start;e=this.scalerType.buildTicks(m,
e);if(l&&e){var n=m=0,c=function(a){a.label&&this.push(a.label)},k=[];this.opt.majorLabels&&(J.forEach(e.major,c,k),m=this._groupLabelWidth(k,f,b.maxLabelCharCount),b.maxLabelSize&&(m=Math.min(b.maxLabelSize,m)));k=[];this.opt.dropLabels&&this.opt.minorLabels&&(J.forEach(e.minor,c,k),n=this._groupLabelWidth(k,f,b.maxLabelCharCount),b.maxLabelSize&&(n=Math.min(b.maxLabelSize,n)));this._maxLabelSize={majLabelW:m,minLabelW:n,majLabelH:l,minLabelH:l}}else this._maxLabelSize=null}return this._maxLabelSize},
calculate:function(a,d,g){this.inherited(arguments,[a,d,g,this.scalerType]);this.scaler.minMinorStep=this._prevMinMinorStep;if((this._invalidMaxLabelSize||g!=this._oldSpan)&&Infinity!=a&&-Infinity!=d){this._invalidMaxLabelSize=!1;this.opt.labelSizeChange&&(this._maxLabelSize=null);this._oldSpan=g;var h=this.opt,f=this.chart.theme.axis,l=h.rotation%360,e=this.chart.theme.axis.tick.labelGap,b=h.font||f.majorTick&&f.majorTick.font||f.tick&&f.tick.font,f=b?w.normalizedLength(w.splitFontString(b).size):
0,b=this._getMaxLabelSize(a,d,g,l,b,f);"number"!=typeof e&&(e=4);if(b&&h.dropLabels){var h=Math.abs(Math.cos(l*Math.PI/180)),m=Math.abs(Math.sin(l*Math.PI/180));0>l&&(l+=360);switch(l){case 0:case 180:this.vertical?l=f:(l=b.majLabelW,f=b.minLabelW);break;case 90:case 270:this.vertical?(l=b.majLabelW,f=b.minLabelW):l=f;break;default:var l=this.vertical?Math.min(b.majLabelW,f/h):Math.min(b.majLabelW,f/m),n=Math.sqrt(b.minLabelW*b.minLabelW+f*f),f=Math.min(n,this.vertical?f*h+b.minLabelW*m:b.minLabelW*
h+f*m)}this.scaler.minMinorStep=this._prevMinMinorStep=Math.max(l,f)+e;this._skipInterval=this.scaler.minMinorStep<=this.scaler.minor.tick*this.scaler.bounds.scale?0:Math.floor((l+e)/(this.scaler.major.tick*this.scaler.bounds.scale))}else this._skipInterval=0}this.ticks=this.scalerType.buildTicks(this.scaler,this.opt);return this},getOffsets:function(){var a={l:0,r:0,t:0,b:0};if(!this.scaler)return a;var d=this.opt,g=this.chart.theme.axis,h=this.chart.theme.axis.tick.labelGap,f=d.titleFont||g.title&&
g.title.font,g=0==d.titleGap?0:d.titleGap||g.title&&g.title.gap,l=this.chart.theme.getTick("major",d),e=this.chart.theme.getTick("minor",d),f=f?w.normalizedLength(w.splitFontString(f).size):0,b=d.rotation%360,m=d.leftBottom,n=Math.abs(Math.cos(b*Math.PI/180)),c=Math.abs(Math.sin(b*Math.PI/180));this.trailingSymbol=void 0===d.trailingSymbol||null===d.trailingSymbol?this.trailingSymbol:d.trailingSymbol;"number"!=typeof h&&(h=4);0>b&&(b+=360);var k=this._getMaxLabelSize();if(k){var s=Math.ceil(Math.max(k.majLabelW,
k.minLabelW))+1,p=Math.ceil(Math.max(k.majLabelH,k.minLabelH))+1;if(this.vertical)switch(k=m?"l":"r",b){case 0:case 180:a[k]=s;a.t=a.b=p/2;break;case 90:case 270:a[k]=p;a.t=a.b=s/2;break;default:45>=b||180<b&&225>=b?(a[k]=p*c/2+s*n,a[m?"t":"b"]=p*n/2+s*c,a[m?"b":"t"]=p*n/2):315<b||180>b&&135<b?(a[k]=p*c/2+s*n,a[m?"b":"t"]=p*n/2+s*c,a[m?"t":"b"]=p*n/2):90>b||180<b&&270>b?(a[k]=p*c+s*n,a[m?"t":"b"]=p*n+s*c):(a[k]=p*c+s*n,a[m?"b":"t"]=p*n+s*c)}else switch(k=m?"b":"t",b){case 0:case 180:a[k]=p;a.l=a.r=
s/2;break;case 90:case 270:a[k]=s;a.l=a.r=p/2;break;default:45<=b&&90>=b||225<=b&&270>=b?(a[k]=p*n/2+s*c,a[m?"r":"l"]=p*c/2+s*n,a[m?"l":"r"]=p*c/2):90<=b&&135>=b||270<=b&&315>=b?(a[k]=p*n/2+s*c,a[m?"l":"r"]=p*c/2+s*n,a[m?"r":"l"]=p*c/2):45>b||180<b&&225>b?(a[k]=p*n+s*c,a[m?"r":"l"]=p*c+s*n):(a[k]=p*n+s*c,a[m?"l":"r"]=p*c+s*n)}a[k]+=h+Math.max(l.length,e.length)+(d.title?f+g:0)}return a},cleanGroup:function(a){this.opt.enableCache&&this.group&&(this._lineFreePool=this._lineFreePool.concat(this._lineUsePool),
this._lineUsePool=[],this._textFreePool=this._textFreePool.concat(this._textUsePool),this._textUsePool=[]);this.inherited(arguments)},createText:function(a,d,g,h,f,l,e,b,m){if(!this.opt.enableCache||"html"==a)return U.createText[a](this.chart,d,g,h,f,l,e,b,m);0<this._textFreePool.length?(a=this._textFreePool.pop(),a.setShape({x:g,y:h,text:l,align:f}),d.add(a)):a=U.createText[a](this.chart,d,g,h,f,l,e,b);this._textUsePool.push(a);return a},createLine:function(a,d){var g;this.opt.enableCache&&0<this._lineFreePool.length?
(g=this._lineFreePool.pop(),g.setShape(d),a.add(g)):g=a.createLine(d);this.opt.enableCache&&this._lineUsePool.push(g);return g},render:function(a,d){var g,h,f,l,e,b,m,n,c,k,s,p,E,F;if(!this.dirty||!this.scaler)return this;var t=this.opt;c=this.chart.theme.axis;var y=t.leftBottom,r=t.rotation%360,v=0,B,q,v=this.chart.theme.axis.tick.labelGap,z=t.font||c.majorTick&&c.majorTick.font||c.tick&&c.tick.font,x=t.titleFont||c.title&&c.title.font,N=t.fontColor||c.majorTick&&c.majorTick.fontColor||c.tick&&c.tick.fontColor||
"black",Q=t.titleFontColor||c.title&&c.title.fontColor||"black";e=0==t.titleGap?0:t.titleGap||c.title&&c.title.gap||15;var G=t.titleOrientation||c.title&&c.title.orientation||"axis",K=this.chart.theme.getTick("major",t),L=this.chart.theme.getTick("minor",t),S=this.chart.theme.getTick("micro",t);Math.max(K.length,L.length,S.length);var R="stroke"in t?t.stroke:c.stroke,u=z?w.normalizedLength(w.splitFontString(z).size):0;b=Math.abs(Math.cos(r*Math.PI/180));B=Math.abs(Math.sin(r*Math.PI/180));var M=x?
w.normalizedLength(w.splitFontString(x).size):0;"number"!=typeof v&&(v=4);0>r&&(r+=360);var O=this._getMaxLabelSize(),O=O&&O.majLabelW;if(this.vertical){E=a.height-d.b;F=void 0;s=d.t;p=void 0;c=(a.height-d.b+d.t)/2;k=void 0;B=u*B+(O||0)*b+v+Math.max(K.length,L.length)+M+e;m=0;n=-1;h=g=0;e=1;b=0;f=v;l=0;switch(r){case 0:q="end";h=0.4*u;break;case 90:q="middle";g=-u;break;case 180:q="start";h=0.4*-u;break;case 270:q="middle";break;default:45>r?(q="end",h=0.4*u):90>r?(q="end",h=0.4*u):135>r?q="start":
225>r?(q="start",h=0.4*-u):270>r?(q="start",g=y?0:0.4*u):315>r?(q="end",g=y?0:0.4*u):(q="end",h=0.4*u)}if(y)F=p=d.l,v=G&&"away"==G?90:270,k=d.l-B+(270==v?M:0),e=-1,f=-f;else switch(F=p=a.width-d.r,v=G&&"axis"==G?90:270,k=a.width-d.r+B-(270==v?0:M),q){case "start":q="end";break;case "end":q="start";break;case "middle":g+=u}}else{F=d.l;E=void 0;p=a.width-d.r;s=void 0;k=(a.width-d.r+d.l)/2;c=void 0;B=u*b+(O||0)*B+v+Math.max(K.length,L.length)+M+e;m=1;e=h=g=n=0;b=1;f=0;l=v;switch(r){case 0:q="middle";
h=u;break;case 90:q="start";g=0.4*-u;break;case 180:q="middle";break;case 270:q="end";g=0.4*u;break;default:45>r?(q="start",h=y?u:0):135>r?(q="start",g=0.4*-u):180>r?(q="start",h=y?0:-u):225>r?(q="end",h=y?0:-u):315>r?(q="end",h=y?0.4*u:0):(q="end",h=y?u:0)}if(y)E=s=a.height-d.b,v=G&&"axis"==G?180:0,c=a.height-d.b+B-(v?M:0);else switch(E=s=d.t,v=G&&"away"==G?180:0,c=d.t-B+(v?0:M),b=-1,l=-l,q){case "start":q="end";break;case "end":q="start";break;case "middle":h-=u}}this.cleanGroup();var H=this.group,
y=this.scaler,I=this.ticks,V=this.scalerType.getTransformerFromModel(this.scaler),A=(!t.title||!v)&&!r&&this.opt.htmlLabels&&!X("ie")&&!X("opera")?"html":"gfx",C=e*K.length,D=b*K.length,T=this._skipInterval;H.createLine({x1:F,y1:E,x2:p,y2:s}).setStroke(R);t.title&&(x=U.createText[A](this.chart,H,k,c,"middle",t.title,x,Q),"html"==A?this.htmlElements.push(x):x.setTransform(w.matrix.rotategAt(v,k,c)));if(null==I)return this.dirty=!1,this;var W=this.opt.majorLabels;J.forEach(I.major,function(a,b){var c=
V(a.value),d=F+m*c,k=E+n*c;this.createLine(H,{x1:d,y1:k,x2:d+C,y2:k+D}).setStroke(K);if(a.label&&(!T||0==(b-(1+T))%(1+T))){var e=t.maxLabelCharCount?this.getTextWithLimitCharCount(a.label,z,t.maxLabelCharCount):{text:a.label,truncated:!1},e=t.maxLabelSize?this.getTextWithLimitLength(e.text,z,t.maxLabelSize,e.truncated):e,c=this.createText(A,H,d+C+f+(r?0:g),k+D+l+(r?0:h),q,e.text,z,N);this.chart.truncateBidi&&e.truncated&&this.chart.truncateBidi(c,a.label,A);e.truncated&&this.labelTooltip(c,this.chart,
a.label,e.text,z,A);"html"==A?this.htmlElements.push(c):r&&c.setTransform([{dx:g,dy:h},w.matrix.rotategAt(r,d+C+f,k+D+l)])}},this);C=e*L.length;D=b*L.length;if(W=this.opt.minorLabels&&!T&&10===this.opt.log&&I.minor.length){var P=1,Y=Math.log(10);J.forEach(I.minor,function(a,b){var c=Math.log(a.value)/Y,d=Math.floor(c),f=Math.ceil(c);P=Math.min(P,c-d,f-c);b&&(P=Math.min(P,c-Math.log(I.minor[b-1].value)/Y))});W=y.minMinorStep<=P*y.bounds.scale}J.forEach(I.minor,function(a){var b=V(a.value),c=F+m*b,
d=E+n*b;this.createLine(H,{x1:c,y1:d,x2:c+C,y2:d+D}).setStroke(L);if(W&&a.label){var e=t.maxLabelCharCount?this.getTextWithLimitCharCount(a.label,z,t.maxLabelCharCount):{text:a.label,truncated:!1},e=t.maxLabelSize?this.getTextWithLimitLength(e.text,z,t.maxLabelSize,e.truncated):e,b=this.createText(A,H,c+C+f+(r?0:g),d+D+l+(r?0:h),q,e.text,z,N);this.chart.getTextDir&&e.truncated&&this.chart.truncateBidi(b,a.label,A);e.truncated&&this.labelTooltip(b,this.chart,a.label,e.text,z,A);"html"==A?this.htmlElements.push(b):
r&&b.setTransform([{dx:g,dy:h},w.matrix.rotategAt(r,c+C+f,d+D+l)])}},this);C=e*S.length;D=b*S.length;J.forEach(I.micro,function(a){var b=V(a.value);a=F+m*b;b=E+n*b;this.createLine(H,{x1:a,y1:b,x2:a+C,y2:b+D}).setStroke(S)},this);this.dirty=!1;return this},labelTooltip:function(a,d,g,h,f,l){var e=["dijit/Tooltip"],b={type:"rect"},m=["above","below"];h=w._base._getTextBox(h,{font:f}).w||0;f=f?w.normalizedLength(w.splitFontString(f).size):0;"html"==l?(x.mixin(b,$.position(a.firstChild,!0)),b.width=Math.ceil(h),
b.height=Math.ceil(f),this._events.push({shape:dojo,handle:N.connect(a.firstChild,"onmouseover",this,function(a){require(e,function(a){a.show(g,b,m)})})}),this._events.push({shape:dojo,handle:N.connect(a.firstChild,"onmouseout",this,function(a){require(e,function(a){a.hide(b)})})})):(l=a.getShape(),d=d.getCoords(),b=x.mixin(b,{x:l.x-h/2,y:l.y}),b.x+=d.x,b.y+=d.y,b.x=Math.round(b.x),b.y=Math.round(b.y),b.width=Math.ceil(h),b.height=Math.ceil(f),this._events.push({shape:a,handle:a.connect("onmouseenter",
this,function(a){require(e,function(a){a.show(g,b,m)})})}),this._events.push({shape:a,handle:a.connect("onmouseleave",this,function(a){require(e,function(a){a.hide(b)})})}))},isNullValue:function(a){return 0>=a},naturalBaseline:1})});