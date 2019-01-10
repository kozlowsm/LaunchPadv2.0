function initMap() {
  const offset = 1.83;
  const latitude = +document.querySelector('.upcoming-body__location--lat').textContent;
  const longitude = +document.querySelector('.upcoming-body__location--lng').textContent;

  const launch = { lat: latitude, lng: longitude };
  const center = { lat: latitude + offset, lng: longitude };

  const mapDesktop = new google.maps.Map(document.getElementById('map-desktop'), {
    zoom: 6,
    center,
    disableDefaultUI: true,
  });
  const mapMobile = new google.maps.Map(document.getElementById('map-mobile'), {
    zoom: 6,
    center,
    disableDefaultUI: true,
  });

  const markerDesktop = new google.maps.Marker({ position: launch, map: mapDesktop });
  const markerMobile = new google.maps.Marker({ position: launch, map: mapMobile });

  const contentString =
    "<h2 class='info-window-pad'>Space Launch Complex 4E, Vandenberg AFB, CA</h2>" +
    "<h3 class='info-window-city'>Vandenberg AFB, CA, USA</h3>";

  const infoWindowDesktop = new google.maps.InfoWindow({ content: contentString });
  const infoWindowMobile = new google.maps.InfoWindow({ content: contentString });

  let openDesktop = false;
  let openMobile = false;

  markerDesktop.addListener('click', () => {
    openDesktop ? infoWindowDesktop.close() : infoWindowDesktop.open(mapDesktop, markerDesktop);
    openDesktop = !openDesktop;
  });
  markerMobile.addListener('click', () => {
    openMobile ? infoWindowMobile.close() : infoWindowMobile.open(mapMobile, markerMobile);
    openMobile = !openMobile;
  });
}

function run() {
  initMap();
}

window.onload = run;
