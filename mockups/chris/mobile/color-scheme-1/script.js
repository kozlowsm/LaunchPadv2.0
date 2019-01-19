function initMap() {
  let offset = 1.83;
  let launch = { lat: 34.632, lng: -120.611 };
  let center = { lat: 34.632 + offset, lng: -120.611 };
  let map = new google.maps.Map(document.getElementById('map'), {
    zoom: 6,
    center: center,
    disableDefaultUI: true,
  });
  let marker = new google.maps.Marker({ position: launch, map: map });

  let contentString =
    "<h2 class='info-window-pad'>Space Launch Complex 4E, Vandenberg AFB, CA</h2>" +
    "<h3 class='info-window-city'>Vandenberg AFB, CA, USA</h3>";

  let infoWindow = new google.maps.InfoWindow({ content: contentString });

  let open = false;

  marker.addListener('click', () => {
    open ? infoWindow.close() : infoWindow.open(map, marker);
    open = !open;
  });
}

const launches = document.querySelectorAll('.launch');
const launchHeaders = document.querySelectorAll('.launch__header');
const launchTitles = document.querySelectorAll('.launch__title');
const launchDropDowns = document.querySelectorAll('.launch__dropdown');
const downArrowSymbols = document.querySelectorAll('.down-arrow__symbol');

for (let i = 0; i < launchDropDowns.length; i++) {
  launchDropDowns[i].addEventListener('click', event => {
    launches[i].setAttribute(
      'style',
      launches[i].offsetHeight == 60 ? 'height: 360px' : 'height: 60px'
    );
    launchHeaders[i].classList.toggle('launch__header--open');
    launchTitles[i].classList.toggle('launch__title--open');
    launchDropDowns[i].classList.toggle('launch__dropdown--open');
    downArrowSymbols[i].setAttribute(
      'fill',
      downArrowSymbols[i].getAttribute('fill') == '#b0b1b3' ? 'url(#red)' : '#b0b1b3'
    );
    downArrowSymbols[i].setAttribute(
      'filter',
      downArrowSymbols[i].getAttribute('filter') == 'none' ? 'url(#dropshadow)' : 'none'
    );
  });
}

// launchDropDown.addEventListener("click", event => {
//   launchDropDown.classList.toggle("launch__dropdown--open");
//   downArrowSymbol.setAttribute("fill", (downArrowSymbol.getAttribute("fill") == "#b0b1b3") ? "url(#red)" : "#b0b1b3");
//   downArrowSymbol.setAttribute("filter", (downArrowSymbol.getAttribute("filter") == "none") ? "url(#dropshadow)" : "none");
// })
