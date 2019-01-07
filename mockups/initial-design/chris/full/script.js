function initMap() {
  let offset = 1.83;
  let launch = { lat: 34.632, lng: -120.611 };
  let center = { lat: 34.632 + offset, lng: -120.611 }

  let mapDesktop = new google.maps.Map(document.getElementById("map-desktop"), {
    zoom: 6, center: center, disableDefaultUI: true
  });
  let mapMobile = new google.maps.Map(document.getElementById("map-mobile"), {
    zoom: 6, center: center, disableDefaultUI: true
  });

  let markerDesktop = new google.maps.Marker({ position: launch, map: mapDesktop });
  let markerMobile = new google.maps.Marker({ position: launch, map: mapMobile });

  let contentString = "<h2 class='info-window-pad'>Space Launch Complex 4E, Vandenberg AFB, CA</h2>" +
    "<h3 class='info-window-city'>Vandenberg AFB, CA, USA</h3>"

  let infoWindowDesktop = new google.maps.InfoWindow({ content: contentString });
  let infoWindowMobile = new google.maps.InfoWindow({ content: contentString });

  let openDesktop = false;
  let openMobile = false;

  markerDesktop.addListener("click", () => {
    openDesktop ? infoWindowDesktop.close() : infoWindowDesktop.open(mapDesktop, markerDesktop);
    openDesktop = !openDesktop;
  });
  markerMobile.addListener("click", () => {
    openMobile ? infoWindowMobile.close() : infoWindowMobile.open(mapMobile, markerMobile);
    openMobile = !openMobile;
  });
}

const launches = document.querySelectorAll(".launch");
const launchHeaders = document.querySelectorAll(".launch__header");
const launchTitles = document.querySelectorAll(".launch__title");

const launchDropdowns = document.querySelectorAll(".launch__dropdown");
const downArrowSymbols = document.querySelectorAll(".down-arrow__symbol")

const launchButtons = document.querySelectorAll(".launch__button");
const rightArrowSymbols = document.querySelectorAll(".right-arrow__symbol");

for(let i = 0; i < launchDropdowns.length; i++) {
  launchDropdowns[i].addEventListener("click", () => {
    launches[i].setAttribute("style", (launches[i].offsetHeight == 60) ? "height: 360px" : "height: 60px");
    launchHeaders[i].classList.toggle("launch__header--open");
    launchTitles[i].classList.toggle("launch__title--open");
    launchDropdowns[i].classList.toggle("launch__dropdown--open");
    downArrowSymbols[i].setAttribute("fill", (downArrowSymbols[i].getAttribute("fill") == "#b0b1b3") ? "url(#grad-mob)" : "#b0b1b3");
    // downArrowSymbols[i].setAttribute("filter", (downArrowSymbols[i].getAttribute("filter") == "none") ? "url(#dropshadow-mob)" : "none");
    downArrowSymbols[i].classList.toggle("down-arrow__symbol--rotated");
  })
}

for (let i = 0; i < launchButtons.length; i++) {
  launchButtons[i].addEventListener("mouseover", event => {
    launchButtons[i].setAttribute("style", "background-color: #dddbdb");
    rightArrowSymbols[i].setAttribute("fill", "url(#grad-desk)");
    rightArrowSymbols[i].setAttribute("filter", "url(#dropshadow-desk)");
  })

  launchButtons[i].addEventListener("mouseout", event => {
    launchButtons[i].setAttribute("style", "background-color: #636262");
    rightArrowSymbols[i].setAttribute("fill", "#b0b1b3")
    rightArrowSymbols[i].setAttribute("filter", "none");
  })
}