var config = {
    //authType: 'none',
    apiKey: "AIzaSyAeN1LuiFi-GcypDz4pC_wNPwxLdQwCj8M",
    authDomain: "roomvr-d67f2.firebaseapp.com",
    databaseURL: "https://roomvr-d67f2.firebaseio.com",
    projectId: "roomvr-d67f2",
    storageBucket: "roomvr-d67f2.appspot.com",
    messagingSenderId: "811133048294",
    appId: "1:811133048294:web:330f6fca728579049ab227",
    measurementId: "G-KJ1Y67MLFP"
  };
  firebase.initializeApp(config); 



var username;
var toggle = 0;
var delayInMilliseconds=1500;
var toolclick=0;
var cid;
var project;
var sqft;
var width;
var infocount=0;
var cusvalue = new Object();   

cusvalue.firstimage="";
cusvalue.currentid="";
var newjoin=1;
var facetest=1;
var settingassets=1;
var skyobj = {
  src : "",
  camrot  : "",
  activepin:""
};
var planexists=1;
var jssor_1_slider;
var jssor_2_slider;
var activeplan=0;
var activeplancli=0;
var firstid;
var firstimage;
var rot;
var index=0;
var currentid;
var room;
var match;
var totalimages=0;
var imagescount=0;
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
  room=urlParams.room;


var modal = document.getElementById("testplan");
var captionText = document.getElementById("caption");
var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
var inner=[];
var activepin=1; 
var scene_id;
AFRAME.registerComponent('assetloaded', {
init: function () {
  var params = this.getUrlParams();
  var username = params.username;
  console.log(username);
    var test = localStorage.getItem("facesource");
    $(".sp").attr("src",test);
  
  document.getElementById('part_list').innerHTML=`<li class="other" data_src="`+test+`" style="width: 100%;"><center>
    <div style="
    background: url(`+test+`);"></div>
    <label style="color:#fff;width: 100%;font-size: 15px;font-weight: 400;">`+username+`</label></center></li>`;

  var asset = document.getElementById("img2");
  var skyimg=[];
  scene_id = localStorage.getItem('scene');
  

  document.body.addEventListener('clientDisconnected', function (evt) {
     document.getElementById(evt.detail.clientId).remove();
     NAF.connection.broadcastDataGuaranteed("participant_remove",evt.detail.clientId);
});
  
  if(scene_id){
    skyimg = '<img  crossorigin="anonymous"  id="sky" src="'+scene_id+'" />';
  asset.insertAdjacentHTML('beforeend',skyimg);
  document.getElementById('sky').addEventListener('load', imageload);
  cusvalue.firstimage = scene_id;
  cusvalue.currentid='sky';
  }else{
    if(localStorage.getItem('type')!='host'){
      document.getElementById('share-button').style.top='20px';
      document.getElementById('prev').style.display='none';
      document.getElementById('next').style.display='none';
      document.getElementById('pdf_share').remove();
      document.getElementById('pdf_modal').remove();
       document.getElementById('pdf_close_button').style.display='none';
    }
  }
  // }else{
  //    document.body.addEventListener('clientConnected', function (evt) {
  //      cusvalue.id=evt.detail.clientId;
  //             NAF.connection.broadcastDataGuaranteed("sample",cusvalue);
  //        }); 
  // }
  
 
  
  
  // var type = localStorage.getItem('type');
  // var scene_id = localStorage.getItem('scene_id');
 
         
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
  }
});
function imageload(){
       if(rot==undefined){
            rot=null;
          }
      setTimeout(function() {  
                     update(scene_id,rot,'sky');   
                        }, delayInMilliseconds);
      document.getElementsByClassName("a-enter-vr-button")[0].style.display="none";
    authorized();       
}

function imageload1(){
  
 // alert('vreg');
       if(rot==undefined){
            rot=null;
          }
      setTimeout(function() {  
       // alert('client');
                     update(scene_id,rot,'sky');   
                        }, delayInMilliseconds);
      document.getElementsByClassName("a-enter-vr-button")[0].style.display="none";
    //authorized1();       
}


AFRAME.registerComponent('name-text', {
  init: function() {
  var el = this.el;
  var params = this.getUrlParams();
  el.setAttribute('value',params.username);
    username=params.username;
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
  }
  });

AFRAME.registerComponent('modify-materials', {
      init: function () {
        // Wait for model to load.
        this.el.addEventListener('model-loaded', () => {
          // Grab the mesh / scene.
          const obj = this.el.getObject3D('mesh');
          obj.receiveShadow=true;
          obj.scale.x= 0.5;
          obj.scale.y= 0.5;
          obj.scale.z= 0.5;
        //  console.log(obj);
          // Go over the submeshes and modify materials we want.  
             obj.children[0].children[4].material.color.set(this.getRandomColor());
          
        });
      },
        getRandomColor: function () {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }
    
    });


function authorized(){
  
  var ref = firebase.database().ref('pdf');
  ref.once('value',function(snap){
    snap.forEach(child=>{
        document.getElementById('pdf_list').innerHTML+=`<div class="col-sm-3">
        <figure><img src="https://cdn.glitch.com/01042a85-eaa9-4410-a0d9-96e8972f2b66%2F%E2%80%94Pngtree%E2%80%94pdf%20file%20document%20icon_4164950.png?v=1588320971354" style="">
  <figcaption onclick="document.getElementById('pdf_modal').style.display='none';view_pdf('`+child.val().link+`');NAF.connection.broadcastDataGuaranteed('view_pdf','`+child.val().link+`');" style="color: #000;cursor:pointer;text-align: center;">`+child.val().name+`</figcaption>
    </figure></div><div class="col-2" style="width: 20px;"></div>`;
    })
  });
  
     newid='admin';
  
  document.body.addEventListener('clientConnected', function (evt) {
           cusvalue.id=evt.detail.clientId;
           console.log("qwewrt");
            var c = document.getElementById('part_list').children;
  var txt = [];
  var i;
  for (i = 0; i < c.length; i++) {  
  //console.log(c[i]);
  var a =  c[i].childNodes[0];
  // console.log(a.childNodes[2])
  // console.log(c[i].getAttribute('data_src'));
  //    console.log(a.childNodes[3]);
  //    console.log(a.childNodes[3].innerHTML);
    if(c[i].id==''){
      txt.push({
      name:a.childNodes[3].innerHTML,
      id:'admin',
      img:c[i].getAttribute('data_src')
      
    });
    }
    else{
     txt.push({
      name:a.childNodes[3].innerHTML,
      id:c[i].id,
      img:c[i].getAttribute('data_src')
      
    }); 
    }
    
  }
      txt.push({
        name:'new',
        id:evt.detail.clientId,
        img:'new'
      })
          console.log(txt);
           NAF.connection.sendData(evt.detail.clientId, 'clientconnect_check', txt);
              NAF.connection.broadcastDataGuaranteed("sample",cusvalue);
         }); 
}

// function authorized1(){
//          document.body.addEventListener('clientConnected', function (evt) {
//            cusvalue.id=evt.detail.clientId;
// //           NAF.connection.sendData(evt.detail.clientId, 'clientconnect_check', cusvalue);
//               NAF.connection.broadcastDataGuaranteed("sample",cusvalue);
//          }); 
// }
 

function getCookie(cname) {
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




function send_chat(){
  
   var time_local = new Date();
   time_local = (time_local.toTimeString()).replace('GMT+0530 (India Standard Time)','');
  var time = time_local[0]+''+time_local[1]+':'+time_local[3]+''+time_local[4];
  var chat_obj={
    name:username,
    time:time,
    txt:document.getElementById('chat_text').value
  }
  document.getElementById('chat_content').innerHTML+=`<li style="
    height: inherit;
    float: right;
">
                                <p style="font-weight: 800;color:#fff;font-size: 12px;">
                                    <span style="float: left;text-decoration:underline;">`+username+`</span>
                                    
                                </p>
                                <br>
                                <p style="
    color: #fff;
    margin: 0 30px -5px;
    font-size: 12px;
    white-space: pre-wrap;
    font-weight: 600;
">`+document.getElementById('chat_text').value +`</p><span style="float: right;color: #fff;">`+time+`</span></li>`;
   NAF.connection.broadcastDataGuaranteed("chat",chat_obj);
  document.getElementById('chat_text').value="";
  document.getElementById("chat_content").scrollTop =  document.getElementById("chat_content").scrollHeight;
}


NAF.connection.subscribeToDataChannel('view_pdf',pdf);
function pdf(senderRtcId, dataType, data, targetRtcId){
  view_pdf(data);
}



 var newid;

NAF.connection.subscribeToDataChannel('clientconnect_check', check_client);
function check_client(senderRtcId, dataType, data, targetRtcId){
  
  var i=0;
 
  for(i=0;i<data.length;i++){
    if(data[i].name!='new' && data[i].img!='new'){
         document.getElementById('part_list').innerHTML+=`<li id="`+data[i].id+`" data_src="`+data[i].img+`" class="self" style="width: 100%;"><center>
    <div style="
    background: url(`+data[i].img+`);"></div>
    <label style="color:#fff;width: 100%;font-size: 15px;font-weight: 400;">`+data[i].name+`</label></center></li>`;
    }
    else{
      newid=data[i].id
    }
   
  }
 
   var part_det={
         name:username,
          id:newid,
         img:localStorage.getItem('facesource')
       }
        NAF.connection.broadcastDataGuaranteed("participant",part_det);
  NAF.connection.unsubscribeToDataChannel('clientconnect_check');
}

NAF.connection.subscribeToDataChannel("chat", chat_send);
     function chat_send(senderRtcId, dataType, data, targetRtcId){
       console.log(data);
      document.getElementById('chat_content').innerHTML+=`<li style="height: inherit;float: left;">
                                <p style="font-weight: 800;color:#fff;font-size: 12px;">
                                    <span style="float: left;text-decoration:underline;">`+data.name+`</span>
                                    
                                </p>
                                <br>
                                <p style="
    color: #fff;
    margin: 0 30px -5px;
    font-size: 12px;
    white-space: pre-wrap;
    font-weight: 600;
">`+data.txt+`</p><span style="float: right;color: #fff;">`+data.time+`</span></li>`;
         document.getElementById("chat_content").scrollTop =  document.getElementById("chat_content").scrollHeight;

     } 

NAF.connection.subscribeToDataChannel("participant_remove", remove_part);
     function remove_part(senderRtcId, dataType, data, targetRtcId){
       console.log("remove"+data);
      // var count = document.getElementById('part_count').innerHTML;
      // document.getElementById('part_count').innerHTML=parseInt(count)-1; 
      document.getElementById(data).remove();
     } 


//var current_name;

      NAF.connection.subscribeToDataChannel("participant", add);
     function add(senderRtcId, dataType, data, targetRtcId){
       console.log(data);
        // var count = document.getElementById('part_count').innerHTML;
        // document.getElementById('part_count').innerHTML=parseInt(count)+1;
      // current_name=data.id;
         document.getElementById('part_list').innerHTML+=`<li id="`+data.id+`" data_src="`+data.img+`" class="self" style="width: 100%;"><center>
    <div style="
    background: url(`+data.img+`);"></div>
    <label style="width: 100%;font-size: 15px;font-weight: 400;">`+data.name+`</label></center></li>`;
     } 



NAF.connection.subscribeToDataChannel("sample", check);
     function check(senderRtcId, dataType, data, targetRtcId){
    
       //console.log("testdisgdi"+username);
      
       console.log("gr");
      firstimage=data.firstimage;
       firstid=data.currentid;
      var asset = document.getElementById("img2");
      var skyimg=[];
      skyimg = '<img id="sky" crossorigin="anonymous"  src="'+firstimage+'" />';
      asset.insertAdjacentHTML('beforeend',skyimg);

     document.getElementById('sky').addEventListener('load', imageload1);
     
}

NAF.connection.subscribeToDataChannel('updateUnauth', updateunauth);
       function updateunauth(senderRtcId, dataType, data, targetRtcId){
          var img = document.getElementById("img1");
         img.setAttribute('material', 'src','#'+data.src); 
       }
            

       
       NAF.connection.subscribeToDataChannel('closesession',closesession);
     function closesession(senderRtcId, dataType, data, targetRtcId){
       if(localStorage.getItem('type')!='host'){
                var x = document.getElementsByClassName("modal");
                var i;
                for (i = 0; i < x.length; i++) {
                      x[i].remove();
                  }
         document.getElementById("room").display="none";
        // document.getElementById("roomname").style.display="none";
         document.getElementById("tool-button").remove();
                     document.getElementById('top').innerHTML='<div style="margin-top:20%; width:100%; height:100%;"><center style="font-size: 20px;font-family: "Lato", sans-serif;color: #2979ff;"></center><img style="display: block;margin-left: auto;margin-right:auto;" src="https://cdn.glitch.com/a04a26d3-92af-4a88-9d49-8fcc2c5344a5%2FLogoMakr_3RwWVd.png?v=1561618072997" alt="Paris" style="width:10%"></div>';
       }
     }
//var activepins=0;

  
 function rotation(camrot) {   
          if(camrot!="null" && camrot!=null){
         var splitrot=camrot.split(" ");
         var x= parseFloat(splitrot[0]);
        var y= parseFloat(splitrot[1]);
        var z= parseFloat(splitrot[2]);
             var player=document.getElementById("player");
       if(isMobile){
       player.components['look-controls'].yawObject.rotation.y = THREE.Math.degToRad(y);
    }
    else
    {
    player.components['look-controls'].yawObject.rotation.y = THREE.Math.degToRad(y);
    }
    player.components['look-controls'].yawObject.rotation.x = THREE.Math.degToRad(x);
  }
        }

 
       var newcli=1;
async function update(src,camrot,id)
  { 
   // alert("r");
    skyobj.src=id;
    skyobj.camrot=camrot;
   
    var img = document.getElementById("img1");
    var player=document.getElementById("player");
     let promise = new Promise((resolve, reject) => {
       if(camrot!="null" && camrot!=null){
           rotation(camrot);
       }
       else{
         camrot="null";
       }
       //alert(id);
        resolve("done!");
});
    let result = await promise;
    img.setAttribute('material','src','#'+id);
     cusvalue.currentid=id;
   img.setAttribute('animation', {
property: 'material.opacity',
from:'0.2',
to: '1',
dur:900,
});
  } 
          
  window.onbeforeunload = function(e){
    if(localStorage.getItem('type')=='host'){
       NAF.connection.broadcastDataGuaranteed('closesession',"left");
    }
    
    }
 


var worldrot;
AFRAME.registerComponent('rotation-reader', {
tick: function () {
  var camera = document.querySelector('[camera]');
  //console.log();
  worldrot=camera.object3D.rotation;
  var list=document.getElementsByClassName("boxes");
   var list1=document.getElementsByClassName("boxes1");
  for (var i=0;i<list.length;i++)
    {
      list[i].object3D.rotation.y=worldrot.y;
      
    }
  for (var i=0;i<list1.length;i++)
    {
      list1[i].object3D.rotation.y=worldrot.y;
      
    }
}
});


var mute_status=1;
function mute(){
  
    if(mute_status){
     easyrtc.enableMicrophone(false);
      document.getElementById('mute_inner').innerHTML=`<svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="64" cy="64" r="64" fill="#404040"></circle><rect x="58.5789" y="94.0632" width="10.8424" height="14.0748" fill="white"></rect><path fill-rule="evenodd" clip-rule="evenodd" d="M49.7201 72.799C49.7201 65.9079 42.1164 62.6609 40.3616 69.3249C39.9447 70.9085 39.7241 72.5592 39.7241 74.2557C39.7241 86.1656 50.5928 95.8204 64 95.8204C77.4072 95.8204 88.2758 86.1656 88.2758 74.2557C88.2758 72.5593 88.0553 70.9085 87.6383 69.325C85.8837 62.6611 78.28 65.908 78.28 72.799C78.28 80.6856 71.8866 87.0789 64.0001 87.0789C56.1135 87.0789 49.7201 80.6856 49.7201 72.799Z" fill="white"></path><rect x="53.3186" y="19.862" width="21.3628" height="63.6407" rx="10.6814" fill="white"></rect><mask id="path-5-outside-1" maskUnits="userSpaceOnUse" x="10.9819" y="11.4462" width="106.066" height="106.066" fill="black"><rect fill="white" x="10.9819" y="11.4462" width="106.066" height="106.066"></rect><path fill-rule="evenodd" clip-rule="evenodd" d="M87.4633 47.6226C89.416 45.67 89.416 42.5042 87.4633 40.5515C85.5107 38.5989 82.3449 38.5989 80.3923 40.5515L64.0148 56.929L47.6375 40.5516C45.6848 38.599 42.519 38.599 40.5664 40.5516C38.6138 42.5042 38.6138 45.67 40.5664 47.6227L56.9438 64.0001L40.5664 80.3774C38.6138 82.3301 38.6138 85.4959 40.5664 87.4485C42.519 89.4011 45.6848 89.4011 47.6375 87.4485L64.0148 71.0711L80.3923 87.4486C82.3449 89.4012 85.5107 89.4012 87.4633 87.4486C89.416 85.4959 89.416 82.3301 87.4633 80.3775L71.0859 64.0001L87.4633 47.6226Z"></path></mask><path fill-rule="evenodd" clip-rule="evenodd" d="M87.4633 47.6226C89.416 45.67 89.416 42.5042 87.4633 40.5515C85.5107 38.5989 82.3449 38.5989 80.3923 40.5515L64.0148 56.929L47.6375 40.5516C45.6848 38.599 42.519 38.599 40.5664 40.5516C38.6138 42.5042 38.6138 45.67 40.5664 47.6227L56.9438 64.0001L40.5664 80.3774C38.6138 82.3301 38.6138 85.4959 40.5664 87.4485C42.519 89.4011 45.6848 89.4011 47.6375 87.4485L64.0148 71.0711L80.3923 87.4486C82.3449 89.4012 85.5107 89.4012 87.4633 87.4486C89.416 85.4959 89.416 82.3301 87.4633 80.3775L71.0859 64.0001L87.4633 47.6226Z" fill="white"></path><path d="M87.4633 47.6226L90.2918 50.451L87.4633 47.6226ZM64.0148 56.929L61.1864 59.7574L64.0148 62.5858L66.8433 59.7574L64.0148 56.929ZM40.5664 40.5516L43.3948 43.38L40.5664 40.5516ZM56.9438 64.0001L59.7722 66.8285L62.6006 64.0001L59.7722 61.1716L56.9438 64.0001ZM64.0148 71.0711L66.8433 68.2427L64.0148 65.4143L61.1864 68.2427L64.0148 71.0711ZM87.4633 87.4486L90.2918 90.277L90.2918 90.277L87.4633 87.4486ZM71.0859 64.0001L68.2575 61.1716L65.4291 64.0001L68.2575 66.8285L71.0859 64.0001ZM84.6349 43.38C85.0254 43.7705 85.0254 44.4037 84.6349 44.7942L90.2918 50.451C93.8065 46.9363 93.8065 41.2378 90.2918 37.7231L84.6349 43.38ZM83.2207 43.38C83.6112 42.9894 84.2444 42.9894 84.6349 43.38L90.2918 37.7231C86.7771 34.2084 81.0786 34.2084 77.5639 37.7231L83.2207 43.38ZM66.8433 59.7574L83.2207 43.38L77.5639 37.7231L61.1864 54.1006L66.8433 59.7574ZM44.809 43.38L61.1864 59.7574L66.8433 54.1006L50.4659 37.7232L44.809 43.38ZM43.3948 43.38C43.7853 42.9895 44.4185 42.9895 44.809 43.38L50.4659 37.7232C46.9512 34.2084 41.2527 34.2084 37.738 37.7232L43.3948 43.38ZM43.3948 44.7942C43.0043 44.4037 43.0043 43.7705 43.3948 43.38L37.738 37.7232C34.2232 41.2379 34.2232 46.9364 37.738 50.4511L43.3948 44.7942ZM59.7722 61.1716L43.3948 44.7942L37.738 50.4511L54.1153 66.8285L59.7722 61.1716ZM43.3948 83.2059L59.7722 66.8285L54.1153 61.1716L37.738 77.549L43.3948 83.2059ZM43.3948 84.6201C43.0043 84.2295 43.0043 83.5964 43.3948 83.2059L37.738 77.549C34.2232 81.0637 34.2232 86.7622 37.738 90.2769L43.3948 84.6201ZM44.809 84.6201C44.4185 85.0106 43.7853 85.0106 43.3948 84.6201L37.738 90.2769C41.2527 93.7916 46.9512 93.7917 50.4659 90.2769L44.809 84.6201ZM61.1864 68.2427L44.809 84.6201L50.4659 90.2769L66.8433 73.8995L61.1864 68.2427ZM83.2207 84.6201L66.8433 68.2427L61.1864 73.8995L77.5638 90.277L83.2207 84.6201ZM84.6349 84.6201C84.2444 85.0107 83.6112 85.0107 83.2207 84.6201L77.5638 90.277C81.0786 93.7917 86.777 93.7917 90.2918 90.277L84.6349 84.6201ZM84.6349 83.2059C85.0254 83.5964 85.0254 84.2296 84.6349 84.6201L90.2918 90.277C93.8065 86.7623 93.8065 81.0638 90.2918 77.5491L84.6349 83.2059ZM68.2575 66.8285L84.6349 83.2059L90.2918 77.5491L73.9143 61.1716L68.2575 66.8285ZM84.6349 44.7942L68.2575 61.1716L73.9143 66.8285L90.2918 50.451L84.6349 44.7942Z" fill="#404040" mask="url(#path-5-outside-1)"></path></svg>`;
    mute_status=0;
    }
  else{
    easyrtc.enableMicrophone(true);
    document.getElementById('mute_inner').innerHTML=`<svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="64" cy="64" r="58" fill="#404040" stroke="currentColor" stroke-width="12" stroke-miterlimit="3.8637"></circle>
      <rect x="58.5789" y="94.0633" width="10.8424" height="14.0748" fill="white"></rect>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M49.7201 72.799C49.7201 65.9079 42.1164 62.6609 40.3616 69.3249C39.9447 70.9085 39.7241 72.5592 39.7241 74.2557C39.7241 86.1656 50.5928 95.8204 64 95.8204C77.4072 95.8204 88.2758 86.1656 88.2758 74.2557C88.2758 72.5593 88.0553 70.9085 87.6383 69.325C85.8837 62.6611 78.28 65.908 78.28 72.799C78.28 80.6856 71.8866 87.0789 64.0001 87.0789C56.1135 87.0789 49.7201 80.6856 49.7201 72.799Z" fill="white"></path><rect x="53.3186" y="19.8621" width="21.3628" height="63.6407" rx="10.6814" fill="white"></rect>
      <path d="M53.3186 72.8113C53.3186 78.7104 58.0995 83.4926 63.997 83.4926C69.8945 83.4926 74.6754 78.7104 74.6754 72.8113V30.5338C74.6754 24.6347 69.8945 19.8526 63.997 19.8526C58.0995 19.8526 53.3186 24.6347 53.3186 30.5338V72.8113Z" fill="white"></path>
    </svg>`; 
    mute_status=1;
    }
}




