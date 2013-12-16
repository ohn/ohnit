Titanium.Facebook.appid = "284174428328285";
Titanium.Facebook.permissions = ['publish_stream', 'read_stream'];

function Facebook()
{
	var self = this;
	this.view = Ti.UI.createView({		
	});	
	 
	this.login = Titanium.Facebook.createLoginButton({
	    bottom: 120
	});
	
	this.b1 = null;
	this.label = null;
	this.actionsView = null;
	this.FBView = null;		 
	this.textArea = null;
	this.imageToUpload = null;
	
}

Facebook.prototype.getButton = function(){
	
	if (this.b1 == null)
	{
	
		var B1_TITLE = "Post";
	
		this.b1 = Ti.UI.createButton({
		    title:B1_TITLE,
			width:50, 
		    height:20, 
		    style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN, 
		    borderRadius:5, 
		    font:{fontSize:12,fontWeight:'bold'}, 
		    backgroundGradient:{type:'linear', colors:['#000001','#666666'], startPoint:{x:0,y:0}, endPoint:{x:2,y:50}, backFillStart:false}, 
		    borderWidth:1, 
		    borderColor:'#666',
		    left: 30,
		    bottom: 90 
		});
		
		
	}
	 
	return this.b1;	
	
}

Facebook.prototype.getLabel = function(){
	
	if (this.label == null)
	{		
		this.label = Titanium.UI.createLabel({
			color: 'blue',
			width: 'auto',
			height: 'auto',
			text: 'Your image has been uploaded to facebook.',
			font: {fontSize:13,fontWeight:'bold',fontFamily:'Helvetica Neue'},
			bottom: 160,
			left: 30
		});		
	}
	
	return this.label;	
	
}

Facebook.prototype.getTextArea = function(){
	
	if (this.textArea == null)
	{
	
		this.textArea = Titanium.UI.createTextArea({
			editable: true,
			//value:'Uploaded from iPhone',
			height:70,
			width:260,
			bottom:10,
			left:30,		
			color:'#888',
			textAlign:'left',
			//appearance:Titanium.UI.KEYBOARD_APPEARANCE_ALERT,	
			//keyboardType:Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION,			
			borderWidth:2,
			borderColor:'#888',
			borderRadius:10,
	     	suppressReturn:true				
		});
		
		
	}
	 
	return this.textArea;	
	
}


	

Facebook.prototype.getActionsView = function(){
	
	if (this.actionsView == null)
	{
	
		this.actionsView = Ti.UI.createView({
	    	bottom: 0, left: 0, right: 0, visible: Titanium.Facebook.loggedIn, height: 150
		});
		
		
	}
	 
	return this.actionsView;	
	
}

Facebook.prototype.getFBView = function(){
	
	if (this.FBView == null)
	{
	
		this.FBView = Ti.UI.createView({
			height:'90%',
			width:'100%',
			bottom:0,
			left:0,
			zIndex:651
		});
		
		
	}
	var labelTxt = this.getLabel();
	
	labelTxt.hide();
	
	 
	return this.FBView;	
	
}

Facebook.prototype.uploadToFacebook = function(data, loader, label)
{
		Titanium.Facebook.requestWithGraphPath('me/photos', data, "POST", showRequestResult);
		
		function showRequestResult(e) {
		    var s = '';
		    if (e.success) {
		        s = "SUCCESS";
		        if (e.result) {
		            s += "; " + e.result;
		        }
		        loader.hide();
		        label.show();
		    } else {
		        s = "FAIL";
		        if (e.error) {
		            s += "; " + e.error;
		        }
		        alert(s);
		    }
	}
}
	
Facebook.prototype.initialize = function(parentView)
{	
	
	var self = this;
	
	var LoadingIndicator = require('ui/LoadingIndicator'); 
	var loadingIndicator = new LoadingIndicator();
	loadingIndicator.hide();	
	
	var fbView = this.getFBView();
	var actionView = this.getActionsView();
	var postButton = this.getButton();
	var txtArea = this.getTextArea();
	var labelTxt = this.getLabel();
	
	labelTxt.hide();
	
	fbView.add(this.login);	
	fbView.add(actionView);
	fbView.add(loadingIndicator);
	fbView.add(labelTxt);
		
	actionView.add(postButton);
	actionView.add(txtArea);		
	
	parentView.add(fbView);
	
	Ti.App.addEventListener('facebook.upload', function(data, loader, label){
		var data = {message:self.textArea.value,picture: self.imageToUpload};
		var loader = loadingIndicator;
		var label = labelTxt;	
		
		loader.fireEvent('showLoadwithCustomMsg', {txt: 'Uploading\nto Facebook...'});
 		loader.show();
		self.uploadToFacebook(data, loader, label);
	});
	
	
	Titanium.Facebook.addEventListener('login', function(e) {
	    if (e.success) {
	        //labelTxt.hide();
	        
	        actionView.show();
	    }
	    if (e.error) {
	        alert(e.error);
	    }
	});
	 
	Titanium.Facebook.addEventListener('logout', function(e){
	    Ti.API.info('logout event');
	     actionView.hide();
	});
	 
	
	postButton.addEventListener('click', function() {
	   Ti.App.fireEvent('facebook.upload');
	});	

}


module.exports = Facebook;

