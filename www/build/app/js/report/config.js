/*! Global-Forest-Watch-Commodities - v2.0.0 - 2015-04-30/ */define([],function(){var a="http://gis-gfw.wri.org/arcgis/rest/services/Utilities/Geometry/GeometryServer",b="http://gis-gfw.wri.org/arcgis/rest/services/commodities/FORMA50_2014/ImageServer",c="http://gis-gfw.wri.org/arcgis/rest/services/GFW/analysis/ImageServer",d="http://gis-potico.wri.org/arcgis/rest/services/suitabilitymapper/kpss_mosaic/ImageServer",e="http://gis-potico.wri.org/arcgis/rest/services/Fires/Global_Fires/MapServer",f="http://www.wri.org/publication/how-identify-degraded-land-sustainable-palm-oil-indonesia",g="http://gis-gfw.wri.org/arcgis/rest/services/GFW/analysis_wm/ImageServer",h=[1,13],i=[2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013],j=["31 - 50%","51 - 74%","75 - 100%"],k=[1,3],l=["#ccf1a5","#859a59","#4b5923"],m=[0,3],n=["#87CEEB","#00AA00","#DD0000","#8A2BE2"],o=["Primary Degraded","Primary Intact"],p=[1,2],q=["#259F1F","#186513"],r=["Convertible Production Forest","Limited Production Forest","Non-forest","Production Forest","Protected Area"],s=[1,5],t=["rgb(230, 152, 0)","rgb(116, 196, 118)","rgb(255, 255, 190)","rgb(199, 233, 192)","rgb(35, 139, 69)"],u=["Moratorium area"],v=[0,1],w=["#5fc29a"],x=["Protected Area"],y=[0,1],z=["#296eaa"],A=["0","1 - 10","11 - 20","21- 35","36 - 70","71 - 100","101 - 150","151 - 200","201 - 300","Greater than 300"],B=[0,9],C=["#fdffcc","#faeeb9","#f6ddaa","#f4ca99","#f1bc8b","#eca97a","#e89c6f","#e08b5e","#db7c54","#d56f4a"],D=["Intact Forest"],E=[0,1],F=["#186513"],G=["Peat"],H=[0,1],I=["#161D9C"],J=["Agriculture","Mixed agriculture and forest","Grassland / Shrub","Mixed forest and grassland","Non-forest","Primary Forest","Secondary Forest","Settlements","Swamp","Water Bodies"],K=[1,10],L=["#d89827","#86fc1f","#fdffb6","#b98f57","#CCC","#5fa965","#c7ffb6","#fca0bf","#538996","#65a2f8"],M=["Agriculture","Agroforestry","Fish pond","Grassland / Shrub","Mining","Oil Palm Plantation","Primary Forest","Rubber Plantation","Secondary Forest","Settlements","Swamp","Timber Plantation","Water Bodies"],N=[1,13],O=["#d89827","#26fc79","#b1e3fc","#fdffb6","#000","#d89827","#5fa965","#eeb368","#c7ffb6","#fca0bf","#538996","#745b37","#65a2f8"],P=["Agriculture","Estate crop plantation","Fish pond","Grassland / Shrub","Mining","Primary Forest","Secondary Forest","Settlements","Swamp","Timber Plantation","Water Bodies"],Q=[1,11],R=["#d89827","#eeb368","#b1e3fc","#fdffb6","#000","#5fa965","#c7ffb6","#fca0bf","#538996","#745b37","#65a2f8"];return{corsEnabledServers:["http://gis-potico.wri.org","http://175.41.139.43","http://54.164.126.73","http://46.137.239.227","https://gfw-fires.wri.org","http://gis-gfw.wri.org"],printUrl:"http://gis-potico.wri.org/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task/execute",alertUrl:{forma:"http://gfw-apis.appspot.com/subscribe",fires:"https://gfw-fires.wri.org/subscribe_by_polygon"},millPointInfo:{concession:{title:"Concession Analysis",content:"A risk assessment for concession areas within a 50km sourcing radius of a palm oil mill."},radius:{title:"Radius Analysis",content:"A risk assessment for the entire area within a 50km sourcing radius around a palm oil mill."}},geometryServiceUrl:a,imageServiceUrl:c,clearanceAnalysisUrl:g,totalLoss:{rasterId:"$521",bounds:h,labels:i},clearanceAlerts:{rasterId:"$2"},millPoints:{url:"http://update.risk-api.appspot.com/",title:"Palm Oil Mill Risk Assessment",rootNode:"millPoints"},suitability:{url:d,title:"Suitability",rootNode:"suitabilityAnalysis",rasterFunction:"PalmOilSuitability_Histogram",geometryType:"esriGeometryPolygon",lcHistogram:{renderRule:{rasterFunction:"lc_histogram",rasterFunctionArguments:{LCRaster:"$12",LCInpR:[0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8],LCOutV:[0,1,2,3,4,5,6,7,8]}},renderRuleSuitable:{rasterFunction:"classify_suitability",rasterFunctionArguments:{TargetRaster:"$12",InpTarget:[0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8],OutVTarget:[0,1,2,3,4,5,6,7,8]}},classIndices:{convertible:[1],production:[2,4],other:[3]}},roadHisto:{mosaicRule:{mosaicMethod:"esriMosaicLockRaster",lockRasterIds:[14],ascending:!0,mosaicOperation:"MT_FIRST"},className:"ROAD_DISTANCE_KM"},concessions:{url:"http://gis-potico.wri.org/arcgis/rest/services/CommoditiesAnalyzer/moremaps2_EN/MapServer",layer:"10"},localRights:{content:"Local rights/interests:  Unknown.  To be determined through field assessments.",fieldAssessmentUrl:f,fieldAssessmentLabel:"Learn about field assessments."},chart:{title:"Suitability by Legal Classification",suitable:{color:"#461D7C",name:"Suitable",id:"donut-Suitable"},unsuitable:{color:"#FDD023",name:"Unsuitable",id:"donut-Unsuitable"},childrenLabels:["HP/HPT","HPK","APL"],childrenColors:["#74C476","#E69800","#FFFFBE"]}},clearanceBounds:{url:b,baseYearLabel:14},rspo:{rootNode:"rspoData",title:"RSPO Land Use Change Analysis",rasterId:"$5",bounds:m,lossBounds:[5,13],colors:n},primaryForest:{rootNode:"primaryForest",title:"Primary Forests - Indonesia",rasterId:"$519",formaId:"$11",bounds:p,labels:o,clearanceChart:{title:"Clearance Alerts in Primary Forests since Jan 2013",type:"pie"},lossChart:{title:"Annual Tree Cover Loss (in hectares) in Primary Forests",removeBelowYear:2005},compositionAnalysis:{rasterId:519,histogramSlice:1},colors:q,fireKey:"primaryForest"},treeCover:{rootNode:"treeCoverDensity",title:"Tree Cover Density",rasterId:"$520",formaId:"$12",includeFormaIdInRemap:!0,rasterRemap:{rasterFunction:"Remap",rasterFunctionArguments:{InputRanges:[31,51,51,75,75,101],OutputValues:[1,2,3],Raster:"$520",AllowUnmatched:!1}},bounds:k,labels:j,clearanceChart:{title:"Clearance Alerts on Tree Cover Density since Jan 2013",type:"pie"},lossChart:{title:"Annual Tree Cover Loss (in hectares) on Tree Cover Density"},compositionAnalysis:{title:"Tree Cover Density (30%-100%)",rasterId:520,histogramSlice:31},colors:l,fireKey:"treeCover",errors:{composition:"No Tree Cover Density greater than 30% detected in this area."}},treeCoverLoss:{rootNode:"treeCoverLoss",title:"Tree Cover Loss",rasterId:"$517",mosaicRule:{mosaicMethod:"esriMosaicLockRaster",lockRasterIds:[521],ascending:!0,mosaicOperation:"MT_FIRST"},lossChart:{title:"Annual Tree Cover Loss (in hectares)"},compositionAnalysis:{rasterId:521,histogramSlice:1},bounds:k,color:"#DB6598",labels:[]},legalClass:{rootNode:"legalClasses",title:"Legal Classifications",rasterId:"$7",bounds:s,labels:r,clearanceChart:{title:"Clearance Alerts on Legal Classifications since Jan 2013",type:"pie"},lossChart:{title:"Annual Tree Cover Loss (in hectares) on Legal Classifications",removeBelowYear:2005},colors:t,fireKey:"legalClass"},indonesiaMoratorium:{rootNode:"indoMoratorium",title:"Indonesia Moratorium",rasterId:"$522",formaId:"$14",bounds:v,labels:u,clearanceChart:{title:"Clearance alerts on Moratorium Areas since Jan 2013",type:"bar"},lossChart:{title:"Annual Tree Cover Loss (in hectares) on Indonesia Moratorium",removeBelowYear:2011},colors:w,fireKey:"indonesiaMoratorium",compositionAnalysis:{rasterId:522,histogramSlice:1}},protectedArea:{rootNode:"protectedAreas",title:"Protected Areas",rasterId:"$10",bounds:y,labels:x,clearanceChart:{title:"Clearance Alerts on Protected Areas since Jan 2013",type:"bar"},lossChart:{title:"Annual Tree Cover Loss (in hectares) on Protected Areas"},compositionAnalysis:{rasterId:10,histogramSlice:1},colors:z,fireKey:"protectedArea",errors:{composition:"No protected areas detected in this area."}},carbonStock:{rootNode:"carbonStocks",title:"Forest Carbon Stocks",rasterId:"$1",bounds:B,labels:A,clearanceChart:{title:"Clearance Alerts on Forest Carbon Stocks since Jan 2013",type:"pie"},lossChart:{title:"Annual Tree Cover Loss (in hectares) on Forest Carbon Stocks (Mg C /Ha)",removeBelowYear:2005},colors:C,fireKey:"carbonStock"},intactForest:{rootNode:"intactForestLandscape",title:"Intact Forest Landscapes",rasterId:"$9",bounds:E,labels:D,clearanceChart:{title:"Clearance Alerts on Intact Forest Landscapes since Jan 2013",type:"bar"},lossChart:{title:"Annual Tree Cover Loss (in hectares) on Intact Forest Landscapes"},colors:F,fireKey:"intactForest",errors:{composition:"No intact forest landscapes data available in this area."}},peatLands:{rootNode:"peatLands",title:"Peat Lands",rasterId:"$8",bounds:H,labels:G,clearanceChart:{title:"Clearance Alerts on Peat Lands since Jan 2013",type:"bar"},lossChart:{title:"Annual Tree Cover Loss (in hectares) on Peat Lands",removeBelowYear:2002},compositionAnalysis:{rasterId:8,histogramSlice:1},colors:I,fireKey:"peatLands",errors:{composition:"Np peat land detected in this area according to indonesia peat data."}},landCoverGlobal:{rootNode:"globalLandCover",title:"Land Cover - Global",rasterId:"$3",bounds:K,labels:J,clearanceChart:{title:"Clearance Alerts on Land Cover - Global since Jan 2013",type:"pie"},lossChart:{title:"Annual Tree Cover Loss (in hectares) on Land Cover - Global",removeBelowYear:2004},colors:L,fireKey:"landCoverGlobal"},landCoverAsia:{rootNode:"asiaLandCover",title:"Land Cover - Southeast Asia",rasterId:"$4",bounds:N,labels:M,clearanceChart:{title:"Clearance Alerts on Land Cover - Southeast Asia since Jan 2013",type:"pie"},lossChart:{title:"Annual Tree Cover Loss (in hectares) on Land Cover - Southeast Asia",removeBelowYear:2005},colors:O,fireKey:"landCoverAsia"},landCoverIndo:{rootNode:"indoLandCover",title:"Land Cover - Indonesia",rasterId:"$6",bounds:Q,labels:P,clearanceChart:{title:"Clearance Alerts on Land Cover - Indonesia since Jan 2013",type:"pie"},lossChart:{title:"Annual Tree Cover Loss (in hectares) on Land Cover - Indonesia",removeBelowYear:2006},colors:R,fireKey:"landCoverIndo"},fires:{url:e,primaryForest:{type:"pie",field:"primary_fo",labels:o,bounds:p,colors:q,title:"Active Fires in Primary Forests over the past 7 days",badgeDesc:"in primary forests out of"},treeCover:{type:"pie",field:"treecover",labels:j,bounds:[1,5],colors:l,title:"Active Fires by Tree Cover Density over the past 7 days",badgeDesc:"on tree cover density out of"},legalClass:{type:"pie",field:"legal",labels:r,bounds:s,colors:t,title:"Active Fires by Legal Classifications over the past 7 days",badgeDesc:"on legal classes out of"},carbonStock:{type:"pie",field:"carbon",labels:A,bounds:B,colors:C,title:"Active Fires by Forest Carbon Stocks over the past 7 days",badgeDesc:"on forest carbon stocks out of"},protectedArea:{type:"badge",field:"wdpa",badgeDesc:"in protected areas out of"},intactForest:{type:"badge",field:"ifl",badgeDesc:"on intact forest landscapes out of"},peatLands:{type:"badge",field:"peat",badgeDesc:"on peat lands out of"},landCoverGlobal:{type:"pie",field:"lc_global",labels:J,bounds:K,colors:L,title:"Active Fires by Land Cover - Global over the past 7 days",badgeDesc:"on land cover global out of"},landCoverAsia:{type:"pie",field:"lc_seasia",labels:M,bounds:N,colors:O,title:"Active Fires by Land Cover - Southeast Asia over the past 7 days",badgeDesc:"on land cover southeast asia out of"},landCoverIndo:{type:"pie",field:"lc_ind",labels:P,bounds:Q,colors:R,title:"Active Fires by Land Cover - Indonesia over the past 7 days",badgeDesc:"on land cover indonesia out of"},indonesiaMoratorium:{type:"badge",field:"moratorium",badgeDesc:"on indonesia moratorium out of"}}}});