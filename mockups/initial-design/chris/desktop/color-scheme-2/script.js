const launchButtons = document.querySelectorAll('.launch__button');
const rightArrowSymbols = document.querySelectorAll('.right-arrow__symbol');

for (let i = 0; i < launchButtons.length; i++) {
  launchButtons[i].addEventListener('mouseover', event => {
    launchButtons[i].setAttribute('style', 'background-color: #dddbdb');
    rightArrowSymbols[i].setAttribute('fill', 'url(#red)');
    rightArrowSymbols[i].setAttribute('filter', 'url(#dropshadow)');
  });

  launchButtons[i].addEventListener('mouseout', event => {
    launchButtons[i].setAttribute('style', 'background-color: #636262');
    rightArrowSymbols[i].setAttribute('fill', '#b0b1b3');
    rightArrowSymbols[i].setAttribute('filter', 'none');
  });
}

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
    '<h2>Space Launch Complex 4E, Vandenberg AFB, CA</h2>' + '<h3>Vandenberg AFB, CA, USA</h3>';

  let infoWindow = new google.maps.InfoWindow({ content: contentString });

  let open = false;

  marker.addListener('click', () => {
    open ? infoWindow.close() : infoWindow.open(map, marker);
    open = !open;
  });
}
