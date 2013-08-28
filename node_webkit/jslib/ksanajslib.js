/*!
	fossil repository: http://www.ksana.tw/cgi-bin/ksanadb.cgi
*/

if(typeof String.prototype.trim !== 'function') { //IE sucks 
  String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, ''); 
  }
}

requirejs.config( {
      paths: {
		jquery: './jquery',
		underscore: './underscore',
		backbone: './backbone',
		backbone_epoxy: './backbone.epoxy',
		requirelib:'./require',
		text:'./requiretext',
	      	bootstrap:'./bootstrap',
		eventemitter:'./eventemitter2',
		 aura:'./aura/aura',
		base:'./aura/base',
		platform:'./aura/platform',
		extensions:'./aura/extensions',
		logger:'./aura/logger',
		widgets:'./aura/ext/widgets',
		mediator:'./aura/ext/mediator',
		debug:'./aura/ext/debug', 
		socketio:'./socket.io',
		cjkutil:'./cjk/cjkutil',
		strokecount:'./cjk/strokecount',
		glyphemesearch:'./cjk/glyphemesearch',
		rangy:'./rangy/rangy-core'
	//	howler:'./howler',

      }
});


requirejs(['jquery','underscore','backbone','requirelib','socketio'
,'text','eventemitter','backbone_epoxy'
,'aura','debug','mediator','widgets','glyphemesearch','rangy'
],function() {
	requirejs(['bootstrap']);
	Backbone.$=$; // add this line , otherwise backbone.js is not working occasionally 2013/8/7
	 		// this.$el = element instanceof Backbone.$ ? element : Backbone.$(element);
	var href=window.location.href;
	var hash=href.lastIndexOf('#');
	if (hash>0) href=href.substring(0,hash);
	
	var i=href.lastIndexOf('/');
	requirejs.config({baseUrl: href.substring(0,i)})
	var index=href.substr(i+1);
	index=index.replace('.html','');
	index=index.replace('.htm','');
	
	
	index=index.trim();
	if (!index) index='index'; // when user didn't type index.html
	console.log('trying to load module:'+index);
	//
	requirejs([index],function(entry) {
			console.log('main module loaded',index);
    			if (entry && entry.initialize) entry.initialize();
  });
});