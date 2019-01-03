const openSidebarButton = document.querySelector(".open-sidebar-button");
const closeSidebarButton = document.querySelector(".close-sidebar-button");

const darkScreen = document.querySelector(".dark-screen");
const sidebar = document.querySelector(".sidebar");

openSidebarButton.addEventListener("click", event => {
  closeSidebarButton.hidden = false;
  sidebar.classList.toggle("sidebar--open");
  darkScreen.hidden = false;

})

closeSidebarButton.addEventListener("click", event => {
  closeSidebarButton.hidden = true;
  sidebar.classList.toggle("sidebar--open");
  darkScreen.hidden = true;
})