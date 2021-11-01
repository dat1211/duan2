let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector("#btn");
let searchBtn = document.querySelector(".bx-search");

closeBtn.addEventListener("click", ()=>{
  sidebar.classList.toggle("open");
  menuBtnChange();//calling the function(optional)
});

searchBtn.addEventListener("click", ()=>{ // Thanh bên mở ra khi bạn nhấp vào iocn tìm kiếm
  sidebar.classList.toggle("open");
  menuBtnChange(); //calling the function(optional)
});

// sau đây là mã để thay đổi nút thanh bên
function menuBtnChange() {
 if(sidebar.classList.contains("open")){
   closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");//thay thế lớp iocns
 }else {
   closeBtn.classList.replace("bx-menu-alt-right","bx-menu");//thay thế lớp iocns
 }
}
