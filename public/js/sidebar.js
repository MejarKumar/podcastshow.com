const menuBtn = document.querySelector("#menuBtn");
const sidebar = document.querySelector(".sidebar");
const cancel = document.querySelector("#cancel");

menuBtn.addEventListener("click",()=>{
  sidebar.style.display ="block";
})
cancel.addEventListener("click",()=>{
  sidebar.style.display ="none";
})
