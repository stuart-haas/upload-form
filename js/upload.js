// JavaScript Document
$(function(){
	"use strict";
	
	//variables
	var list = $('#upload ul');
	var uploadList = [];
	var pendingList = [];
	var batchList = [];
	
	//simulate click on the file input button
	//to show the file browser
	$('#browse').click(function(){
	  	$(this).parent().find('input').click();
  	});
	
	//initialize the file upload plugin
	$('#upload').fileupload({
		
		//drag and drop element
		dropZone: $('#drop'),
		
		//files will be queued for upload
		sequentialUploads: true,
		
		//called when file is added to the queue
		add: function(e, data){
			
			//creat upload item
			var uploadItem = $('<li class="pending"><span class="preview"></span><span class="input-group"><input class="progress-txt" type="text" value="0" disabled><input class="upload-btn" type="button" value="Upload"><input class="delete-btn" type="button" value="Delete"></span><p></p></li>');

			//append file info to upload item
			uploadItem.find('p').text(data.files[0].name).append('<i>' + formatFileSize(data.files[0].size) + '</i>');
			
			//load image preview
			loadImage(
        		data.files[0],
        		function (img) {
            		uploadItem.find('span.preview').append(img);
        		},
        		{maxWidth: 96}
    		);
			
			//append upload item to list 
			data.context = uploadItem.appendTo(list);
			
			//add upload item data to pending queue
			pendingList.push(data);
			
			//start batch upload on click
			$('#batch-ctrl').click(function(){
				
				//only upload files that are pending
				pendingList.forEach(function(data){
					if(!data.context.hasClass('uploading') && !data.context.hasClass('complete')){
						data.context.addClass('batch');	
						batchList.push(data.submit()); 
					}
				});
				pendingList = [];
				batchList = [];
			});
			
			//start upload on click
			uploadItem.find('.upload-btn').click(function(){
				uploadList.push(data.submit());
			});
			
			//delete list item on click
			uploadItem.find('.delete-btn').click(function(){
				uploadItem.remove();
			});
		},
		//calculate and display percentage of data loaded
		progress: function(e, data){
			var progress = parseInt(data.loaded / data.total * 100, 10);
			data.context.find('.progress-txt').val(progress + '%');
			data.context.removeClass('pending').addClass('uploading');
		},
		//check if the item upload is complete
		done: function(e, data){
			data.context.removeClass('uploading').addClass('complete');

			if(data.context.hasClass('batch')){
				data.context.remove();	
			}
		},
		//check for errors
		fail: function(e, data){
			data.context.removeClass().addClass('error');
		}
	});
	
	//prevent default action of file being dragged or dropped on browser window
	$(document).on('drop dragover', function (e) {
		e.preventDefault();
  	});
	
	//disable context menu on right click
	$(document).on("contextmenu",function(e){
		e.preventDefault();
	});
	
	//helper for formatting file sizess
	function formatFileSize(bytes) {
	  if (typeof bytes !== 'number'){
		  return '';
	  }
	  if (bytes >= 1000000000){
		  return (bytes / 1000000000).toFixed(2) + ' GB';
	  }
	  if (bytes >= 1000000){
		  return (bytes / 1000000).toFixed(2) + ' MB';
	  }
	  return (bytes / 1000).toFixed(2) + ' KB';
  	}
});