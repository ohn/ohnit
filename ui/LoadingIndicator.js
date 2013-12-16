function LoadingIndicator() {
	
	var self = Ti.UI.createView(); 

	var loadingText = 'Working\non it...';
	
	var activityBg = Ti.UI.createView( { center:'50%', //left:'41%', //120 
										 top:'35%', //40% 170
										 width:'40%', //17%  80 
										 height:'28%', //17% 80
										 backgroundColor:'#000000', 
										 borderRadius:8, 
										 opacity:0.5 } ); //, zIndex:601 	
	self.add( activityBg);
	
	var activityIndicator = Ti.UI.createActivityIndicator({
		
	  //color: 'white',
	  //font: {fontFamily:'Helvetica Neue', fontSize:16, fontWeight:'bold'},
	  //message: 'Uploading to Flickr',	  
	  style:Ti.UI.iPhone.ActivityIndicatorStyle.BIG, 
	  //top: activityBg.center - this.width,//'40.5%', //190
	  //left: activityBg.center - this.height,//'43.5%', //140
	  top: '41%', //activityBg.center - this.height, //- this.height
	  left: activityBg.center - this.width,		  
	  height:'auto',
	  width:'auto'	  
	});
 
 	// On iOS, the activity indicator must be added to a window or view for it to appear
	if (Ti.Platform.name === 'iPhone OS'){
	  self.add(activityIndicator);
	}

	//TEMP DEBUG: ???
	activityIndicator.show();

	var activityMsg = Ti.UI.createLabel({    text: loadingText, //'Uploading\nto Flickr',
											 left: activityBg.center,
											 top: '50%', //activityIndicator.bottom + 10,  -'5dp'
										     height:'auto',
										     width:'auto',
										     shadowColor:'#000',
										     shadowOffset:{x:'1dp',y:'1dp'},
										     color:'#FFFFFF',
										     font:{fontFamily:'Helvetica Neue', fontSize:14, fontWeight:'bold'},
										     textAlign:'center'								
	});
	self.add(activityMsg);	
	
	function setLabelCopy(obj) { 
		
		Ti.API.info('========= setLabelCopy called');
		Ti.API.info('========= setLabelCopy called: obj.txt = ' + obj.txt);
		 
		loadingText = obj.txt;
		activityMsg.text = loadingText;	
	}	
	
	self.addEventListener('showLoadwithCustomMsg', setLabelCopy);
	
	
	return self;	
}

module.exports = LoadingIndicator;