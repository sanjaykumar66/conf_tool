(function(a){function b(d){if(c[d])return c[d].exports;var e=c[d]={i:d,l:!1,exports:{}};return a[d].call(e.exports,e,e.exports,b),e.l=!0,e.exports}var c={};return b.m=a,b.c=c,b.d=function(a,c,d){b.o(a,c)||Object.defineProperty(a,c,{configurable:!1,enumerable:!0,get:d})},b.n=function(a){var c=a&&a.__esModule?function(){return a['default']}:function(){return a};return b.d(c,'a',c),c},b.o=function(a,b){return Object.prototype.hasOwnProperty.call(a,b)},b.p='',b(b.s=0)})([function(a,b,c){'use strict';function d(a,b){if(!(a instanceof b))throw new TypeError('Cannot call a class as a function')}var e=function(){function a(a,b){for(var c,d=0;d<b.length;d++)c=b[d],c.enumerable=c.enumerable||!1,c.configurable=!0,'value'in c&&(c.writable=!0),Object.defineProperty(a,c.key,c)}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),f=c(1),g=c(2),h=function(){function a(b,c){if(d(this,a),this.rootPath='networked-aframe',this.localId=null,this.appId=null,this.roomId=null,this.peers={},this.occupants={},c=c||window.firebaseConfig,this.firebase=b||window.firebase,void 0===this.firebase)throw new Error('Import https://www.gstatic.com/firebasejs/x.x.x/firebase.js');this.authType=c.authType,this.apiKey=c.apiKey,this.authDomain=c.authDomain,this.databaseURL=c.databaseURL}return e(a,[{key:'setServerUrl',value:function(){}},{key:'setApp',value:function(a){this.appId=a}},{key:'setRoom',value:function(a){this.roomId=a}},{key:'setWebRtcOptions',value:function(a){!1===a.datachannel&&console.warn('FirebaseWebRtcAdapter.setWebRtcOptions: datachannel must be true.'),!0===a.audio&&console.warn('FirebaseWebRtcAdapter does not support audio yet.'),!0===a.video&&console.warn('FirebaseWebRtcAdapter does not support video yet.')}},{key:'setServerConnectListeners',value:function(a,b){this.connectSuccess=a,this.connectFailure=b}},{key:'setRoomOccupantListener',value:function(a){this.occupantListener=a}},{key:'setDataChannelListeners',value:function(a,b,c){this.openListener=a,this.closedListener=b,this.messageListener=function(a,b,d){var e=f.deepDecode(d);c(a,b,e)}}},{key:'connect',value:function(){var a=this;this.initFirebase(function(b){a.localId=b;var c=a.firebaseApp;a.getTimestamp(function(b){a.myRoomJoinTime=b;var d=c.database().ref(a.getUserPath(a.localId));d.set({timestamp:b,signal:'',data:''}),d.onDisconnect().remove();var e=c.database().ref(a.getRoomPath());e.on('child_added',function(d){var e=d.key;if(e!==a.localId&&'timestamp'!==e&&void 0===a.peers[e]){var f=d.val().timestamp,h=new g(a.localId,e,function(b){c.database().ref(a.getSignalPath(a.localId)).set(b)});h.setDatachannelListeners(a.openListener,a.closedListener,a.messageListener),a.peers[e]=h,a.occupants[e]=f,c.database().ref(a.getSignalPath(e)).on('value',function(a){var b=a.val();null===b||''===b||h.handleSignal(b)}),c.database().ref(a.getDataPath(e)).on('value',function(b){var c=b.val();null===c||''===c||c.to!==a.localId||a.messageListener(e,c.type,c.data)}),(b>f||b===f&&a.localId>e)&&h.offer(),a.occupantListener(a.occupants)}}),e.on('child_removed',function(b){var c=b.key;c===a.localId||'timestamp'===c||void 0===a.peers[c]||(delete a.peers[c],delete a.occupants[c],a.occupantListener(a.occupants))}),a.connectSuccess(a.localId)})})}},{key:'shouldStartConnectionTo',value:function(a){return(this.myRoomJoinTime||0)<=(a?a.roomJoinTime:0)}},{key:'startStreamConnection',value:function(){}},{key:'closeStreamConnection',value:function(){}},{key:'sendData',value:function(a,b,c){this.peers[a].send(b,c)}},{key:'sendDataGuaranteed',value:function(a,b,c){var d=JSON.parse(JSON.stringify(c)),e=f.deepEncode(d);this.firebaseApp.database().ref(this.getDataPath(this.localId)).set({to:a,type:b,data:e})}},{key:'broadcastData',value:function(a,b){for(var c in this.peers)this.peers.hasOwnProperty(c)&&this.sendData(c,a,b)}},{key:'broadcastDataGuaranteed',value:function(a,b){for(var c in this.peers)this.peers.hasOwnProperty(c)&&this.sendDataGuaranteed(c,a,b)}},{key:'getConnectStatus',value:function(a){var b=this.peers[a];if(void 0===b)return NAF.adapters.NOT_CONNECTED;switch(b.getStatus()){case g.IS_CONNECTED:return NAF.adapters.IS_CONNECTED;case g.CONNECTING:return NAF.adapters.CONNECTING;case g.NOT_CONNECTED:default:return NAF.adapters.NOT_CONNECTED;}}},{key:'initFirebase',value:function(a){this.firebaseApp=this.firebase.initializeApp({apiKey:this.apiKey,authDomain:this.authDomain,databaseURL:this.databaseURL},this.appId),this.auth(this.authType,a)}},{key:'auth',value:function(a,b){'none'===a?this.authNone(b):'anonymous'===a?this.authAnonymous(b):console.log('FirebaseWebRtcInterface.auth: Unknown authType '+a)}},{key:'authNone',value:function(a){var b=this;requestAnimationFrame(function(){a(b.randomString())})}},{key:'authAnonymous',value:function(a){var b=this,c=this.firebaseApp;c.auth().signInAnonymously().catch(function(a){console.error('FirebaseWebRtcInterface.authAnonymous: '+a),b.connectFailure(null,a)}),c.auth().onAuthStateChanged(function(b){null!==b&&a(b.uid)})}},{key:'getRootPath',value:function(){return this.rootPath}},{key:'getAppPath',value:function(){return this.getRootPath()+'/'+this.appId}},{key:'getRoomPath',value:function(){return this.getAppPath()+'/'+this.roomId}},{key:'getUserPath',value:function(a){return this.getRoomPath()+'/'+a}},{key:'getSignalPath',value:function(a){return this.getUserPath(a)+'/signal'}},{key:'getDataPath',value:function(a){return this.getUserPath(a)+'/data'}},{key:'getTimestampGenerationPath',value:function(a){return this.getRoomPath()+'/timestamp/'+a}},{key:'randomString',value:function(){for(var a,b='ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz0123456789',c='',d=0;d<16;d++)a=Math.floor(Math.random()*b.length),c+=b.substring(a,a+1);return c}},{key:'getTimestamp',value:function(a){var b=this.firebaseApp,c=b.database().ref(this.getTimestampGenerationPath(this.localId));c.set(this.firebase.database.ServerValue.TIMESTAMP),c.once('value',function(b){var d=b.val();c.remove(),a(d)}),c.onDisconnect().remove()}}]),a}();NAF.adapters.register('firebase',h),a.exports=h},function(a){a.exports={encode:function(a){return encodeURIComponent(a).replace(/\./g,'%2E')},decode:function(a){return decodeURIComponent(a.replace('%2E','.'))},deepKeyReplace:function(a,b){function c(a,b,d){if('object'==typeof a)for(var e in a)null!==a[e]&&('object'==typeof a[e]||Array.isArray(a[e]))&&c(a[e],b[e],d),d.apply(this,[b,e,b[e]]);else if(Array.isArray(a))for(var e=0;e<a.length;e++)null!==a[e]&&('object'==typeof a[e]||Array.isArray(a[e]))&&c(a[e],b[e],d)}var d=Object.assign({},a);return c(a,d,function(a,c,d){delete a[c],a[b(c)]=d}),d},deepDecode:function(a){var b=this,c=this.deepKeyReplace(a,function(a){return b.decode(a)});return c},deepEncode:function(a){var b=this,c=this.deepKeyReplace(a,function(a){return b.encode(a)});return c}}},function(a){'use strict';function b(a,b){if(!(a instanceof b))throw new TypeError('Cannot call a class as a function')}var c=function(){function a(a,b){for(var c,d=0;d<b.length;d++)c=b[d],c.enumerable=c.enumerable||!1,c.configurable=!0,'value'in c&&(c.writable=!0),Object.defineProperty(a,c.key,c)}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),d=function(){function a(c,d,e){b(this,a),this.localId=c,this.remoteId=d,this.sendSignalFunc=e,this.open=!1,this.channelLabel='networked-aframe-channel',this.pc=this.createPeerConnection(),this.channel=null}return c(a,[{key:'setDatachannelListeners',value:function(a,b,c){this.openListener=a,this.closedListener=b,this.messageListener=c}},{key:'offer',value:function(){var a=this;this.setupChannel(this.pc.createDataChannel(this.channelLabel,{reliable:!1})),this.pc.createOffer(function(b){a.handleSessionDescription(b)},function(a){console.error('WebRtcPeer.offer: '+a)})}},{key:'handleSignal',value:function(a){if(this.localId===a.to&&this.remoteId===a.from)switch(a.type){case'offer':this.handleOffer(a);break;case'answer':this.handleAnswer(a);break;case'candidate':this.handleCandidate(a);break;default:console.error('WebRtcPeer.handleSignal: Unknown signal type '+a.type);}}},{key:'send',value:function(a,b){null===this.channel||'open'!==this.channel.readyState||this.channel.send(JSON.stringify({type:a,data:b}))}},{key:'getStatus',value:function(){if(null===this.channel)return a.NOT_CONNECTED;switch(this.channel.readyState){case'open':return a.IS_CONNECTED;case'connecting':return a.CONNECTING;case'closing':case'closed':default:return a.NOT_CONNECTED;}}},{key:'createPeerConnection',value:function(){var b=this,c=window.RTCPeerConnection||window.webkitRTCPeerConnection||window.mozRTCPeerConnection||window.msRTCPeerConnection;if(void 0===c)throw new Error('WebRtcPeer.createPeerConnection: This browser does not seem to support WebRTC.');var d=new c({iceServers:a.ICE_SERVERS});return d.onicecandidate=function(a){a.candidate&&b.sendSignalFunc({from:b.localId,to:b.remoteId,type:'candidate',sdpMLineIndex:a.candidate.sdpMLineIndex,candidate:a.candidate.candidate})},d.oniceconnectionstatechange=function(){b.open&&'disconnected'===d.iceConnectionState&&(b.open=!1,b.closedListener(b.remoteId))},d}},{key:'setupChannel',value:function(a){var b=this;this.channel=a,this.channel.onmessage=function(a){var c=JSON.parse(a.data);b.messageListener(b.remoteId,c.type,c.data)},this.channel.onopen=function(){b.open=!0,b.openListener(b.remoteId)},this.channel.onclose=function(){b.open&&(b.open=!1,b.closedListener(b.remoteId))},this.channel.onerror=function(a){console.error('WebRtcPeer.channel.onerror: '+a)}}},{key:'handleOffer',value:function(a){var b=this;this.pc.ondatachannel=function(a){b.setupChannel(a.channel)},this.setRemoteDescription(a),this.pc.createAnswer(function(a){b.handleSessionDescription(a)},function(a){console.error('WebRtcPeer.handleOffer: '+a)})}},{key:'handleAnswer',value:function(a){this.setRemoteDescription(a)}},{key:'handleCandidate',value:function(a){var b=this,c=window.RTCIceCandidate||window.webkitRTCIceCandidate||window.mozRTCIceCandidate;this.pc.addIceCandidate(new c(a),function(){},function(a){console.error('WebRtcPeer.handleCandidate: '+a)})}},{key:'handleSessionDescription',value:function(a){this;this.pc.setLocalDescription(a,function(){},function(a){console.error('WebRtcPeer.handleSessionDescription: '+a)}),this.sendSignalFunc({from:this.localId,to:this.remoteId,type:a.type,sdp:a.sdp})}},{key:'setRemoteDescription',value:function(a){var b=this,c=window.RTCSessionDescription||window.webkitRTCSessionDescription||window.mozRTCSessionDescription||window.msRTCSessionDescription;this.pc.setRemoteDescription(new c(a),function(){},function(a){console.error('WebRtcPeer.setRemoteDescription: '+a)})}}]),a}();d.IS_CONNECTED='IS_CONNECTED',d.CONNECTING='CONNECTING',d.NOT_CONNECTED='NOT_CONNECTED',d.ICE_SERVERS=[{urls:'stun:stun1.l.google.com:19302'},{urls:'stun:stun2.l.google.com:19302'},{urls:'stun:stun3.l.google.com:19302'},{urls:'stun:stun4.l.google.com:19302'}],a.exports=d}]);
//# sourceMappingURL=naf-firebase-adapter.min.js.map