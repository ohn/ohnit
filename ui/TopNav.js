function TopNav() {

	var path = Titanium.Filesystem.resourcesDirectory;
	
	var self = Ti.UI.createView( { zIndex:600, top: 0, height: 50, backgroundImage:path +'/images/bgopacity.png' } );
	
	var homeBtn = Titanium.UI.createButton({ 
		title:'Home', 
		width:50, 
	    height:20, 
	    style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN, 
	    borderRadius:5, 
	    font:{fontSize:12,fontWeight:'bold'}, 
	    backgroundGradient:{type:'linear', colors:['#000001','#666666'], startPoint:{x:0,y:0}, endPoint:{x:2,y:50}, backFillStart:false}, 
	    borderWidth:1, 
	    borderColor:'#666',
	    left: '20%',
	    zIndex: 650 
	    }); 	
	self.add(homeBtn);	
	
	var uploadBtn = Titanium.UI.createButton({ 
		title:'Upload', 
		width:50, 
	    height:20, 
	    style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN, 
	    borderRadius:5, 
	    font:{fontSize:12,fontWeight:'bold'}, 
	    backgroundGradient:{type:'linear', colors:['#000001','#666666'], startPoint:{x:0,y:0}, endPoint:{x:2,y:50}, backFillStart:false}, 
	    borderWidth:1, 
	    borderColor:'#666',
	    right:'20%',
	    zIndex: 650 
	    });
	self.add(uploadBtn);	
	
	homeBtn.addEventListener('click', function(e) {
		Ti.API.info('home fired');
		Ti.App.fireEvent('home.selected');	
	});
	
	uploadBtn.addEventListener('click', function(e) {
		Ti.API.info('save fired');
		Ti.App.fireEvent('save.selected');
	});
	
	this.view = self;
}

TopNav.prototype.getButtons = function()
{
	return this.view;	
}

module.exports = TopNav;
