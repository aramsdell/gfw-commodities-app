define([
    "dojo/dom",
    "dojo/query",
    "dojo/dom-class",
    "dojo/dom-style",
    "dijit/registry",
    "esri/graphic",
    "utils/NavListController",
    "models/SubmissionModel"
], function (dom, query, domClass, domStyle, registry, Graphic, NavListController, SubmissionModel) {
    'use strict';

	var initialized = false;

	return {

		init: function (template) {

			if (initialized) {
				registry.byId("stackContainer").selectChild("submissionView");
				return;
			}


			initialized = true;
			registry.byId("stackContainer").selectChild("submissionView");
			registry.byId("submissionView").set('content', template);
      SubmissionModel.initialize("submissionView");


      // var context = "submission";
      // NavListController.loadNavControl(context);
      // NavListController.loadNavView(context);

		},

    handleDataSubmit: function(model) {

        $('#storyNameInput').css('border-color', '#c0c0c0');
        $('#storyCompanyInput').css('border-color', '#c0c0c0');
        $('#storyTitleInput').css('border-color', '#@c0c0c0');
        $('#storyEmailInput').css('border-color', '#c0c0c0');

        $('#dataInput').css('border-color', '#c0c0c0');
        $('#attributeDataInput').css('border-color', '#c0c0c0');

        var storyNameData = model.storyNameData();
        var storyCompanyData = model.storyCompanyData();
        var storyTitleData = model.storyTitleData();
        var storyEmailData = model.storyEmailData();
        var storyDetailsData = model.storyDetailsData();

        var dataFileName = model.dataFileName();
        var dataFileType = model.dataFileType();
        var attributeFileName = model.attributeFileName();
        var attributeFileType = model.attributeFileType();


        // if (!model.storyNameData()) {
        //   $('#storyNameInput').css('border-color', 'red');
        //   alert('Please enter your name!');
        //   return;
        // }
        // if (!model.storyCompanyData()) {
        //   $('#storyCompanyInput').css('border-color', 'red');
        //   alert('Please enter your company!');
        //   return;
        // }
        // if (!model.storyTitleData()) {
        //   $('#storyTitleInput').css('border-color', 'red');
        //   alert('Please enter your title!');
        //   return;
        // }
        // if (!model.storyEmailData()) {
        //   $('#storyEmailInput').css('border-color', 'red');
        //   alert('Please enter your email!');
        //   return;
        // }
        //
        // if (!model.dataFileName()) {
        //   $('#dataInput').css('border-color', 'red');
        //   alert('Please attach your data!');
        //   return;
        // }
        // if (!model.attributeFileName()) {
        //   $('#attributeDataInput').css('border-color', 'red');
        //   alert('Please attach your attribute data!');
        //   return;
        // }

        var dataFile = $('#dataInput')[0].files[0];
        var attributeFile = $('#attributeDataInput')[0].files[0];

        // if (dataFile && attributeFile) {


          // var params = {Key: dataFileName, ContentType: dataFileType, Body: dataFile};

          var form_data = new FormData();
          form_data.append('file', dataFile);
          form_data.append('dataFileName', dataFileName);
          form_data.append('dataFileType', dataFileType);


          $.ajax({
            url: 'app/php/post_file_to_s3.php', // point to server-side PHP script
            dataType: 'text',  // what to expect back from the PHP script, if anything
            cache: false,
            contentType: false,
            processData: false,
            data: form_data,
            type: 'post',
            success: function(response){
              console.log(response); // display response from the PHP script, if any
            }
          });

          // var attributeParams = {Key: attributeFileName, ContentType: attributeFileType, Body: attributeFile};
          // console.log(params)

          // console.log($(params).serialize())


          // $.post( "app/php/post_file_to_s3.php",stringify(params),function( data ) {
          //
          //   console.log(data);
          // });

          // bucket.upload(params, function (err, data) {
          //   if (!err) {
          //     console.log('success!');
            // debugger;// applyEdits to the featureService here!
            // var feature = {};
            // var feature.attributes = {};
            // attributes.name = model.storyNameData();
            // attributes.company = model.storyCompanyData();
            // attributes.title = model.storyTitleData();
            // attributes.email = model.storyEmailData();
            // attributes.notes = model.storyDetailsData(); //todo: if its not undefined
            // attributes.data_file_name = model.dataFileName();
            // attributes.att_file_name = model.attributeFileName(); //todo: if its not undefined
            //
            // feature.setAttributes(attributes);
            //
            // var features = [];
            // features.push(feature);


            //features: features


            //http://services.arcgis.com/hBEMHCkbQdfV906F/arcgis/rest/services/data_submission_form/FeatureServer/0/addFeatures

          //   } else {
          //     console.log('failure');
          //   }
          //   debugger
          //   // results.innerHTML = err ? 'ERROR!' : 'UPLOADED.';
          // });
        // }




    },
    handleFileChange: function(obj, evt){
      if (evt.target.files.length === 0) {
        return;
      }
      var fileName = evt.target.files[0].name;
      var hash = {
        '.xls'  : 1,
        '.xlsx' : 1,
        '.csv'  : 1
      };
      var re = /\..+$/;
      var ext = fileName.match(re);

      var fileType = evt.target.files[0].type;

      if (fileType !== "text/csv" && fileType !== "application/zip" && hash[ext] !== 1) {
        evt.target.value = '';
        if (evt.target.value) {
          evt.target.type = 'file';
          evt.target.type = 'input';
        }
        alert('You must submit a zipped shapfile or a CSV/XLS!');

        return;
      }
      if (evt.target.id === 'dataInput') {
        obj.dataFileName(fileName);
        obj.dataFileType(fileType);
      } else if (evt.target.id === 'attributeDataInput') {
        obj.attributeFileName(fileName);
        obj.attributeFileType(fileType);
      }


    }//,
    // handleSecondFileChange: function(obj, evt){
    //   if (evt.target.files.length === 0) {
    //     return;
    //   }
    //   var fileName = evt.target.files[0].name;
    //   var hash = {
    //     '.xls'  : 1,
    //     '.xlsx' : 1,
    //     '.csv'  : 1
    //   };
    //   var re = /\..+$/;
    //   var ext = fileName.match(re);
    //
    //   var fileType = evt.target.files[0].type;
    //
    //   if (fileType !== "text/csv" && hash[ext] !== 1) {
    //     evt.target.value = '';
    //     if (evt.target.value) {
    //       evt.target.type = 'file';
    //       evt.target.type = 'input';
    //     }
    //     alert('You must submit a zipped shapfile or a CSV/XLS!');
    //
    //     return;
    //   }
    //   obj.attributeFileName(fileName);
    // }

	};

});
