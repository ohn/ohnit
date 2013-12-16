//styles dependencies
var styles = require('ui/Styles');

//SecondView Component Constructor
function SecondView() {
		
	
	//a reference to object itself
	self = this;
	//create object instance, a parasitic subclass of Observable
	this.view = Ti.UI.createView();
	
	this.backButton = Ti.UI.createView({
		height:35,
		width:100,
		top:30,
		left:60,
		borderRadius:5,
		backgroundGradient:{
			type:'linear',
			colors:[{color:styles.customBtnBGColor,position:0.0},{color:styles.customBtnBGColorGradient,position:0.50},{color:styles.customBtnBGColor,position:1.0}]
		}		
	});
	
	var backLabel = Ti.UI.createLabel({
			color:styles.customLabelColor,
			text: 'Back',
			textAlign:'center',
			width:'auto',
			height:'auto',
			font: styles.customLabelFont	
	});	
	
	this.backButton.add(backLabel);
	
	this.view.add(this.backButton);
	
	this.backButton.addEventListener('click', function(){
		Ti.App.fireEvent('secondview.back',{});		
	});
	
	
	this.FBView = Ti.UI.createView({
		height:80,
		width:200,
		top:80,
		left:60,
		borderRadius:5,
		backgroundGradient:{
			type:'linear',
			colors:[{color:styles.customBtnBGColor,position:0.0},{color:styles.customBtnBGColorGradient,position:0.50},{color:styles.customBtnBGColor,position:1.0}]
		}		
	});
	
	//Adding facebook API calls
	var Facebook = require('ui/Facebook');
	var facebook = new Facebook();
	
	Ti.App.addEventListener('facebook.login', function(data){
		var statusLabel = facebook.getWelcomeLabel();
		statusLabel.text = 'Welcome '+ data.firstName;
		statusLabel.show();
		
	});
	
	Ti.App.addEventListener('facebook.logout', function(data){
		facebook.getWelcomeLabel().hide();
	});	
	
	this.FBView.add(facebook.getWelcomeLabel());
	this.FBView.add(facebook.loginButton);
	
	facebook.setWelcomeMessage();
		
	this.view.add(this.FBView);
	
	this.loader = Titanium.UI.createActivityIndicator({
			bottom:40, 
			height:50,
			width:10,
			style:Titanium.UI.iPhone.ActivityIndicatorStyle.DARK
	});				
	
	
	this.view.add(this.loader);	
	
	Ti.App.addEventListener('facebook.api.start', function(){
		self.uploadButton.hide();
		self.getLoader().show();		
	});
	
	Ti.App.addEventListener('facebook.api.end', function(){
		self.getLoader().hide();
		self.uploadButton.show();
	});	
	
	
}

SecondView.prototype.getView = function()
{
	return this.view;	
	
} 

module.exports = SecondView;