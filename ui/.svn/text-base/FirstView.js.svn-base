var imageView;

//FirstView Component Constructor
function FirstView() {
	//a reference to object itself
	self = this;
	//create object instance, a parasitic subclass of Observable
	var path = Titanium.Filesystem.resourcesDirectory;
	
	this.view = Ti.UI.createView({
		backgroundImage:path +'/images/Default.png'			
	});		
	
	
 
	var Facebook = require('ui/Facebook');
	this.facebook = new Facebook();
	this.facebook.initialize(this.view);
	
	var _facebook = this.facebook;
	_facebook.getFBView().hide();
	
	
	
	//this.view.add(this.facebook);
	//this.facebook.initialize(this.view);

	
	var NavBar = require('ui/NavBar');
	var navBar = new NavBar();	 
	this.view.add(navBar.getButtons());
	navBar.getButtons().show();
	
	var TopNav = require('ui/TopNav');
	var topNav = new TopNav();
	topNav.getButtons().hide();
	
	
	
	/*var SaveImage = require('ui/SaveImage');
	var saveImage = new SaveImage();	
	saveImage.getView().hide(); 
		*/
		
	//Adding/Loading Image View and Photo/Camera Selection Actions
	this.imageView = Titanium.UI.createImageView({
			height:200,
			width:200,
			top:65,
			center:'50%',
			borderRadius:5				
	});		
	this.imageView.hide();
	this.view.add(this.imageView);
		
	
		   
	//alert(this.facebook.imageToUpload);
		
		
		
	//Adding event listener for choose photo methods
	var _imageView = this.imageView;
	
	
	
	Ti.App.addEventListener('gallery.selected', function(){
	   navBar.getButtons().hide();
	   navBar.gallerySelectPhoto(_imageView); 
	   _imageView.show();
	   
	   /*_facebook.imageToUpload = _imageView.image;*
	   alert(_imageView.image);
	   alert('firstview: ' + typeof(_imageView.image));*/
	}); 
	Ti.App.addEventListener('camera.selected', function(){
		navBar.getButtons().hide();	
		navBar.cameraPhoto(_imageView);
		_imageView.show();		
	});	
	
	var _thisView = this.view;
	
	Ti.App.addEventListener('image.success', function(){
		_thisView.add(topNav.getButtons());
		topNav.getButtons().show();
		navBar.getButtons().hide();		
		
		_facebook.imageToUpload = _imageView.image;
	});
	
	Ti.App.addEventListener('image.cancel', function(){
		_thisView.add(navBar.getButtons());
		navBar.getButtons().show();
		_imageView.hide();			
	});
	
	
		
	
	Ti.App.addEventListener('home.selected', function(){
		topNav.getButtons().hide();
		_imageView.hide();
		navBar.getButtons().show();
		_facebook.getFBView().hide();	
	});
	
	
	Ti.App.addEventListener('save.selected', function(){
		_facebook.getFBView().show();		
	});	
}

FirstView.prototype.getView = function()
{
	return this.view;	
	
} 

FirstView.prototype.getLoader = function()
{
			
	return this.loader;	
}


module.exports = FirstView;







