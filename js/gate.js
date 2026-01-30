(function(){
 const d=new Date();
 if(d.getDate()===29 && d.getMonth()===0){
  location.replace("birthday.html");
 }else{
  location.replace("timeline.html");
 }
})();