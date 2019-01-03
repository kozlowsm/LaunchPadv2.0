const sidebarOpen = document.querySelector("#sidebar-open");
const sidebarExit = document.querySelector(".sidebar__exit");

const darkScreen = document.querySelector(".dark-screen");
const sidebar = document.querySelector(".sidebar");

sidebarOpen.addEventListener("click", event => {
  // sidebar.hidden = false;
  sidebar.classList.toggle("sidebar--open");
  darkScreen.hidden = false;

})

sidebarExit.addEventListener("click", event => {
  // sidebar.hidden = true;
  sidebar.classList.toggle("sidebar--open");
  darkScreen.hidden = true;
})