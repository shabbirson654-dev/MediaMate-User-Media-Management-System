var current_user=sessionStorage.getItem("user");

var vedio=document.getElementById("vedio_player");
var play_btn=document.getElementById("play");

play_btn.onclick=function()
{var pause=document.getElementById("pause");

vedio.play();
play_btn.style.display="none";
pause.style.display="block";
    
}
var pause=document.getElementById("pause");
pause.onclick=function()
{
    vedio.pause();
    play_btn.style.display="block";
pause.style.display="none";
}
//progress bar coding
vedio.ontimeupdate=function()
{
    var p_bar=document.getElementById("progress_bar");
    var t_duration=this.duration;
    var c_duration=this.currentTime;
    var v_timing=document.getElementById("v_timing");
   
  var sec=  c_duration - parseInt(c_duration/60)*60;
  var t_sec=t_duration - parseInt(t_duration/60)*60;
  v_timing.innerHTML= parseInt( c_duration/60)+":" +parseInt(sec)+" / "+parseInt(t_duration/60)+":"+parseInt(t_sec);
  var slide_per=c_duration*100/t_duration;
  p_bar.style.width=slide_per+"%";

  if (t_duration==c_duration) {

    play_btn.style.display="block";
  pause.style.display="none";

  } else{};
}
//open close add vedio box
var add_vedio_box=document.getElementById("add_vedio_box");
var close_vedio_box_btn=document.getElementById("close_vedio_box_btn");
var open_box_btn=document.getElementById("open_vedio_box_btn");
open_box_btn.onclick=function(){
  
  add_vedio_box.style.display="block";
  open_box_btn.style.display="none";
close_vedio_box_btn.style.display="block";
}
close_vedio_box_btn.onclick=function()
{
  add_vedio_box.style.display="none";
  open_box_btn.style.display="block";
  close_vedio_box_btn.style.display="none";
}
//add vedio in local storage
var add_vedio_btn=document.getElementById("add_vedio_btn");
add_vedio_btn.onclick=function()
{
  var v_name=document.getElementById("vedio_name");
  var v_link=document.getElementById("vedio_link");
if (v_name.value!=""&& v_link.value!="") {
  var v_obj={name:v_name.value,link:v_link.value};
 var v_txt= JSON.stringify(v_obj);


 localStorage.setItem(current_user+"vedio"+v_name.value,v_txt);

} else {
  
}
}
//fetch all vedio from local storage
function load_vedio()
{var i;
 
for(i=0;i<localStorage.length;i++)
{
  var all_keys=localStorage.key(i);
  
  if(all_keys.match(current_user+"vedio"))
  {
var v_data=localStorage.getItem(all_keys);
var vedio_obj=JSON.parse(v_data);
var div =document.createElement("DIV");
div.setAttribute("id","main_vedio_box");

var p=document.createElement("P");
div.setAttribute("id","playlist_vedio_name");
p.className="p_v_name";
p.innerHTML=vedio_obj.name;
var play_btn=document.createElement("BUTTON");
play_btn.setAttribute("type","button");

play_btn.setAttribute("id","vedio_play_btn");
play_btn.setAttribute("url",vedio_obj.link);
play_btn.className="v_play_btn";
play_btn.innerHTML="Play";

var del_btn=document.createElement("BUTTON");
del_btn.setAttribute("type","button");
del_btn.setAttribute("id","vedio_delete_btn");
del_btn.className="delete_btn";
del_btn.innerHTML="Delete";
div.appendChild(p);
div.appendChild(play_btn);
div.appendChild(del_btn);
var all_v=document.getElementById("bottomi");
all_v.appendChild(div);






  }
}

}
load_vedio();


//volume control coding
function volume()
{

var vol_icon_btn = document.getElementById("v_i");
vol_icon_btn.onclick=function()
{
 var vol_control=document.getElementById("v");
 if (vol_control.style.display=="none") {


  vol_control.style.display="block";
  vol_control.oninput=function()
  {
    vedio.volume=this.value;
  }

 }
 else
 {
   vol_control.style.display="none";

 }
}
}

volume();

// vedio progress_bar coding
var p_box=document.getElementById("progress_box");
p_box.onclick=function(event)
{
  var per=event.offsetX/this.offsetWidth;
  vedio.currentTime=per*vedio.duration;

}
//full screen coding
var full=document.getElementById("full_screen");
full.onclick=function()
{
  vedio.requestFullscreen();
}



//vedio speed control coding
 var spedd_icon=document.getElementById("s_i");
 spedd_icon.onclick=function()
 {
  var speed_slider=document.getElementById("s");
 if (speed_slider.style.display=="none") {


  speed_slider.style.display="block";
  speed_slider.oninput=function()
  {
    vedio.playbackRate=this.value;
  }
 } else{
speed_slider.style.display="none";
 }
 }

 //search coding
 var search_box=document.getElementById("search");
 search_box.oninput=function()
 {
all_v_name=document.getElementById("p_v_name");
var i;
for ( i = 0; i <all_v_name.length; i++) {
 if (all_v_name[i].innerHTML.match(search_box.value)) {
all_v_name[i].parentElement.style.display="block";
 } else{
all_v_name[i].parentElement.style.display="none";
 }
}
 }

//play vedio button coding
function play_vedio()
{
  var all_v_play_btn=document.getElementsByClassName("v_play_btn");
 var i;
 for ( i = 0; i <all_v_play_btn.length; i++) {
   all_v_play_btn[i].onclick=function()

   {

                clear();
    var v_url=this.getAttribute("url");
        var src_tag=document.getElementById("vedio_src");
        src_tag.setAttribute("src",v_url);
        vedio.load();
        vedio.play();
        pause.style.display="block";
         play_btn.style.display="none";
         this.innerHTML="Playing...";
       
   }
 }
}
play_vedio();
//change play into playing coding
function clear()
{
   var all_v_play_btn=document.getElementsByClassName("v_play_btn");
   var i;
   for (var i = 0; i < all_v_play_btn.length; i++) {
     
     all_v_play_btn[i].innerHTML="Play";
   }

}

//next and previous button coding


function next_button()
{

var next_btn=document.getElementById("next");
next_btn.onclick=function()
{
   var all_play_btn=document.getElementsByClassName("v_play_btn");
for (var i = 0; i <all_play_btn .length; i++) {
 if (all_play_btn [i].innerHTML=="Playing...") {

  var next_elment= all_play_btn[i].parentElement.nextSibling;
  
 var next_play_button= next_elment.getElementsByClassName("v_play_btn")[0];
 next_play_button.click();
 return false;
 } 

 else{};
}
}
}

next_button();

//next and previous button coding


function previous_button()
{

var next_btn=document.getElementById("previous");
next_btn.onclick=function()
{
   var all_play_btn=document.getElementsByClassName("v_play_btn");
for (var i = 0; i <all_play_btn .length; i++) {
 if (all_play_btn [i].innerHTML=="Playing...") {

  var previous_elment= all_play_btn[i].parentElement.previousSibling;
  
 var previous_play_button= previous_elment.getElementsByClassName("v_play_btn")[0];
 previous_play_button.click();
 return false;
 } 

 else{};
}
}
}

previous_button();


//delete button coding

function delete_button()
{
 var all_del_btn=document.getElementsByClassName("delete_btn");
 for (var i = 0; i < all_del_btn .length; i++) {
    all_del_btn[i].onclick=function()
     {
   var parent= this.parentElement;
 var vedio_name= parent.getElementsByTagName("P")[0].innerHTML;
localStorage.removeItem(current_user+"vedio"+vedio_name);
parent.className="animate__animated animate__bounceOut";
setTimeout(function(){
parent.remove();

},1000)
  }
 }


}

delete_button();