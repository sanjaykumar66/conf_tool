/**
 * Setup the Networked-Aframe scene component based on query parameters
 */
var flag=0;
var networkedComp;
var audio=true;
AFRAME.registerComponent('dynamic', {
  init: function () {
    var el = this.el;
    var params = this.getUrlParams();
    if (!params.room) {
      window.alert('Please add a room name in the URL, eg. ?room=myroom');
    }
   // audio=this.getCookie("audio");
    var webrtc = params.hasOwnProperty('webrtc');
    var adapter = webrtc ? 'easyrtc' : 'wseasyrtc';
    console.log(adapter);
    var voice = params.hasOwnProperty('voice');
     navigator.getUserMedia = navigator.getUserMedia ||
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia;

if (navigator.getUserMedia) {
  
  // 	 if (navigator.userAgent.match(/android/i)) {
  // 	var remote_filter= easyrtc.buildRemoteSdpFilter({audioSendCodec: 'ISAC/16000'});
  // 	//log(remote_filter);
  // 	var local_filter= easyrtc.buildLocalSdpFilter({audioRecvCodec: 'opus/48000/2'});
  // 	//log(local_filter);
  // 	easyrtc.setSdpFilters(local_filter,remote_filter);
  // }
   navigator.getUserMedia({ audio: {
        echoCancellation: { exact: true},
        googEchoCancellation: { exact: true},
        googAutoGainControl: { exact: true},
        googNoiseSuppression: { exact: true},
   }},function(stream) {
      navigator.permissions.query({name:'microphone'}).then(function(result) {
       console.log(result);
if (result.state == 'granted') {
  networkedComp = {
      room: params.room,
      adapter: 'easyrtc',
      audio:true
    };
    el.setAttribute('networked-scene', networkedComp);
 report(result.state);
 
} else if (result.state == 'prompt') {
  report(result.state);

} else if (result.state == 'denied') {
  networkedComp = {
      room: params.room,
      adapter: 'easyrtc',
      audio: true
    };
    report(result.state);
  el.setAttribute('networked-scene', networkedComp);
}
result.onchange = function() {
  location.reload();
  report(result.state);
}}); 
      },
      function(err) {
        networkedComp = {
      room: params.room,
      adapter: 'easyrtc',
      audio: true
    };
   
  el.setAttribute('networked-scene', networkedComp); 
      }
   );
} 
else {
}
     
    // Set local user's name
   //var player = document.getElementById('player');
   //var myNametag = player.querySelector('.nametag');
    //console.log("hello");
   //myNametag.setAttribute('text','value', params.username);
    // Setup networked-scene
    
    
   
    function report(state) {
    }
  
  },


  getUrlParams: function () {
    var match;
    var pl = /\+/g;  // Regex for replacing addition symbol with a space
    var search = /([^&=]+)=?([^&]*)/g;
    var decode = function (s) { return decodeURIComponent(s.replace(pl, ' ')); };
    var query = window.location.search.substring(1);
    var urlParams = {};

    match = search.exec(query);
    while (match) {
      urlParams[decode(match[1])] = decode(match[2]);
      match = search.exec(query);
    }
    return urlParams;
  },
 
  sum:function(){
  audio=false;
     document.cookie = "audio="+audio;
    },
  getCookie: function (cname) {
                var name = cname + "=";
                var decodedCookie = decodeURIComponent(document.cookie);
                var ca = decodedCookie.split(';');
                for(var i = 0; i <ca.length; i++) {
                            var c = ca[i];
                          while (c.charAt(0) == ' ') {
                                    c = c.substring(1);
                                        }
                          if (c.indexOf(name) == 0) {
                              return c.substring(name.length, c.length);
                          }
                }
                        return "";
        }  
  });