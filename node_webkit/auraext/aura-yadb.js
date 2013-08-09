/*
  aura-ydb interface for node-webkit and node server.
  bridge node context and DOM context only in aura-extensions
  do not call node function directly in widgets js
*/
define(function() {
  return {
 
 initialize: function(app) {
     if (typeof process !='undefined' &&process.versions['node-webkit']) {
        /* compatible async interface for browser side js code*/
        var api_yadb=require('yadb').api ; 
        if (!app.sandbox.services) app.sandbox.services={};
        api_yadb(app.sandbox.services); //install api into services
          app.sandbox.yadb={ //turn into async, for compatible with node_server
            getRaw: function( path, callback) {
              var data=app.sandbox.services["yadb"].getRaw(path);
              //this line is not really needed.
              setTimeout( function() { callback(0,data) }, 0);
          }
        };  
     } else {
        //for node_server , use socket.io to talk to server-side yadb_api.js
        requirejs(['../node_server/cli-js/rpc_yadb'],function(yadb){
          app.sandbox.yadb=yadb;
        });
     }
  },
  afterAppStart: function() {
  }
}});