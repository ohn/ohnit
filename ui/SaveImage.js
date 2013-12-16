function SaveImage() {
	
	var path = Titanium.Filesystem.resourcesDirectory;
	
	self = this;
	
	this.view = Ti.UI.createView( { left:0, bottom:0, width:'100%', height:150, zIndex:651,
	    /*backgroundGradient:{
			type:'linear',
			colors:[{color:'#ffffff',position:0.0},{color:'#cccccc',position:0.50},{color:'#999999',position:1.0}]
		},*/
		backgroundImage:path +'/images/bgopacity.png'
	 } );
	
		
	var btnWidth = 30;
	var btnHeight = 30;
	var zIndex =  651;
	
	/*var gtwoBtn = makeBtn({
        backgroundImage:path +'/images/gtwobtn.png',
	    top: 10,
	    left: '10%'
	}); 	
	self.add(gtwoBtn);
	
	var gtwoLabel = makeLabel({
		text:'G2',
		top:40,
		left: '12%'
	});		
	self.add(gtwoLabel);
	*/
	
	var postFacebook = makeBtn({
		backgroundImage:path +'/images/fbbtn.png',
		top: 10,
	    left: '10%'
	});
	this.view.add(postFacebook);
	
	/*var facebookLogin = Titanium.Facebook.createLoginButton({
	    backgroundImage:path +'/images/fbbtn.png',
		backgroundImage:path +'/images/fbbtn.png',
		top: 10,
	    left: '10%'
	});
	this.view.add(facebookLogin);*/
	
	var fbLabel = makeLabel({
		text:'Facebook',
		top:40,
		left: '8%'
	});		
	this.view.add(fbLabel);
	
	var flickrBtn = makeBtn({
        backgroundImage:path +'/images/flickrbtn.png',
        top: 10,
	    left: '45%'
	}); 	
	this.view.add(flickrBtn);
	
	var flickrLabel = makeLabel({
		text:'Flickr',
		top:40,
		left: '46%'
	});		
	this.view.add(flickrLabel);
	
	var twitterBtn = makeBtn({
        backgroundImage:path +'/images/twitterbtn.png',
        top: 10,
	    right: '10%'
	}); 	
	this.view.add(twitterBtn);
	
	var twitterLabel = makeLabel({
		text:'Twitter',
		top:40,
		right: '9%'
	});		
	this.view.add(twitterLabel);
	
	/*var tumblrBtn = makeBtn({
        backgroundImage:path +'/images/tumblrbtn.png',
        top: 70,
	    left: '45%'
	}); 	
	self.add(tumblrBtn);
	
	var tumblrLabel = makeLabel({
		text:'Tumblr',
		top:100,
		left: '45%'
	});		
	self.add(tumblrLabel);
	
	var pinBtn = makeBtn({
        backgroundImage:path +'/images/pinbtn.png',
        top: 70,
	    right: '10%'
	}); 	
	self.add(pinBtn);
	
	var pinLabel = makeLabel({
		text:'Pinterest',
		top:100,
		right: '8%'
	});		
	self.add(pinLabel);
	
	*/
	//Adding facebook API calls
	var Facebook = require('ui/Facebook');
	this.facebook = new Facebook();
	this.facebook.initialize(this.view);
	
	
	
		
	function makeBtn(obj) {	 	
	  var o = { 
	            left:   obj.left, 
	            right:  obj.right,
	            top:    obj.top || self.height+20, //20  400 
	            width:  obj.width || btnWidth, 
	            height: obj.height || btnHeight, 
	            zIndex: obj.zIndex || zIndex,
	            backgroundImage: obj.backgroundImage	                        
	          }; 
	 	
	  return Titanium.UI.createButton(o); 
	};
	
	function makeLabel(obj) {	 	
	  var oj = { 
	            text:   obj.text,
	            left:   obj.left, 
	            right: obj.right,
	            top:    obj.top || self.height+20, //20  400 
	            width:  'auto',
				height: 'auto', 
	            zIndex: obj.zIndex || zIndex,
	            color: '#000000', 
	            font:{fontSize:10,fontWeight:'bold'},                      
	          }; 
	 	
	  return Titanium.UI.createLabel(oj); 
	};
	
	postFacebook.addEventListener('click', function(e) {
		Ti.API.info('post fired');
		Ti.App.fireEvent('facebook.upload');	
	});
	
}

SaveImage.prototype.getView = function()
{
	return this.view;	
	
} 

SaveImage.prototype.initialize = function(firstView)
{
	var self = this;
	this.firstView = firstView;
	
	self.facebook.imageToUpload =  self.firstView.imageView.image;
}


module.exports = SaveImage;