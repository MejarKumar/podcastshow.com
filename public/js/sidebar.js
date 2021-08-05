const menuBtn = document.querySelector("#menuBtn");
const sidebar = document.querySelector(".sidebar");
const cancel = document.querySelector("#cancel");

menuBtn.addEventListener("click",()=>{
  sidebar.style.width ="100%";
})
cancel.addEventListener("click",()=>{
  sidebar.style.width ="0%";
})


