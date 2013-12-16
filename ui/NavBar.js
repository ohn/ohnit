function NavBar() {

	var self = Ti.UI.createView( { zIndex:600, top:'30%' } );
	
	var path = Titanium.Filesystem.resourcesDirectory;
	var startLabel = Titanium.UI.createLabel({
		color:'#000',
		width:'auto',
		height:'auto',
		text:'Start Here',
		font:{fontSize:15,fontWeight:'bold',fontFamily:'Helvetica Neue'},
		top: 0
	});
	self.add(startLabel);
	
	var cameraRollBtn = Titanium.UI.createButton({
        backgroundImage:path +'/images/camerarollbtn.png',									            
	    backgroundSelectedImage:path +'images/camerarollbtn-hover.png',
	    width:50,
	    height:50,
	    top: 50,
	    left: '25%',
	    zIndex: 650
	}); 	
	self.add(cameraRollBtn);
	
	var cameraRollLabel = Titanium.UI.createLabel({
		color:'#000',
		width:'auto',
		height:'auto',
		text:'Camera Roll',
		font:{fontSize:13,fontWeight:'bold',fontFamily:'Helvetica Neue'},
		top:105,
		left: '22%'
	});
	self.add(cameraRollLabel);
	
	
	var cameraBtn = Titanium.UI.createButton({
	    backgroundImage:path +'/images/camerabtn.png',									            
	    backgroundSelectedImage:path +'images/camerabtn-hover.png',
	    width:50,
	    height:50,
	    top: 50,
	    right: '25%',
	    zIndex: 650
	}); 	
	self.add(cameraBtn);	
	
	var cameraLabel = Titanium.UI.createLabel({
		color:'#000',
		width:'auto',
		height:'auto',
		text:'Camera',
		font:{fontSize:13,fontWeight:'bold',fontFamily:'Helvetica Neue'},
		top: 105,
		right: '25%'
	});
	self.add(cameraLabel);
	
	
	cameraRollBtn.addEventListener('click', function(e) {
		Ti.API.info('gallery fired');
		Ti.App.fireEvent('gallery.selected');	
	});
	
	cameraBtn.addEventListener('click', function(e) {
		Ti.API.info('camera fired');
		Ti.App.fireEvent('camera.selected');
	});
	
	this.view = self;
}

NavBar.prototype.getButtons = function()
{
	return this.view;	
}

NavBar.prototype.gallerySelectPhoto = function(imageView)
{
	var popoverView;
	var arrowDirection;
	
	/*var TopNav = require('ui/TopNav');
	var topNav = new TopNav();	 
	this.view.add(topNav.getButtons());*/
	
	Titanium.Media.openPhotoGallery({
		
		success:function(event)
		{
			var cropRect = event.cropRect;
			var image = event.media;
			// set image view
			Ti.API.debug('Our type was: '+event.mediaType);
			if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO)
			{				
				imageView.image = image;
				//alert('image set');			
			}
			else { // is this necessary? 
				//alert('none');
				}
	
			Titanium.API.info('PHOTO GALLERY SUCCESS cropRect.x ' + cropRect.x + ' cropRect.y ' + cropRect.y  + ' cropRect.height ' + cropRect.height + ' cropRect.width ' + cropRect.width);
			
			Ti.App.fireEvent('image.success');	
			
			/*alert(imageView.image);
	  		alert('firstview: ' + typeof(imageView.image));
				*/			
		},
		cancel:function()
		{
			Ti.App.fireEvent('image.cancel');	
		},
		error:function(error)
		{
			Ti.App.fireEvent('image.cancel');
		},
		allowEditing:true,
		popoverView:popoverView,
		arrowDirection:arrowDirection,
		mediaTypes:[Ti.Media.MEDIA_TYPE_VIDEO,Ti.Media.MEDIA_TYPE_PHOTO]
	});	
	
	
		
}

NavBar.prototype.cameraPhoto = function(imageView)
{
	Titanium.Media.showCamera({

		success:function(event)
		{
			var cropRect = event.cropRect;
			var image = event.media;
	
			Ti.API.debug('Our type was: '+event.mediaType);
			if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO)
			{
				imageView.image = image;
			}
			else
			{
				alert("got the wrong type back ="+event.mediaType);
			}
			Ti.App.fireEvent('image.success');
		},
		cancel:function()
		{
			Ti.App.fireEvent('image.cancel');
		},
		error:function(error)
		{
			// create alert
			var a = Titanium.UI.createAlertDialog({title:'Camera'});
	
			// set message
			if (error.code == Titanium.Media.NO_CAMERA)
			{
				a.setMessage('Please run this test on device');
			}
			else
			{
				a.setMessage('Unexpected error: ' + error.code);
			}
	
			// show alert
			a.show();
		},
		saveToPhotoGallery:true,
		allowEditing:true,
		mediaTypes:[Ti.Media.MEDIA_TYPE_VIDEO,Ti.Media.MEDIA_TYPE_PHOTO]
		});	
	
}

module.exports = NavBar;
