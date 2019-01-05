const launchButton = document.querySelector(".launch__button");
const rightArrowSymbol = document.querySelector(".right-arrow__symbol");

launchButton.addEventListener("mouseover", event => {
  launchButton.setAttribute("style", "background-color: #dddbdb");
  rightArrowSymbol.setAttribute("fill", "url(#red)");
  rightArrowSymbol.setAttribute("filter", "url(#dropshadow)");
})

launchButton.addEventListener("mouseout", event => {
  launchButton.setAttribute("style", "background-color: #0065b7");
  rightArrowSymbol.setAttribute("fill", "#b0b1b3")
  rightArrowSymbol.setAttribute("filter", "none");
})