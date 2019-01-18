console.log('loaded');

function initMap() {
  const offset = 1.83;
  const latitude = +document.querySelector('.single-launch__map--lat').textContent;
  const longitude = +document.querySelector('.single-launch__map--lng').textContent;

  const launch = { lat: latitude, lng: longitude };
  const center = { lat: latitude + offset, lng: longitude };

  const map = new google.maps.Map(document.querySelector('.single-launch__map--active'), {
    zoom: 6,
    center,
    disableDefaultUI: true,
  });

  const marker = new google.maps.Marker({ position: launch, map });
  const padName = document.querySelector('.single-launch__map--pad').textContent;
  const locName = document.querySelector('.single-launch__location--text').textContent;

  const contentString = `<h2 class='info-window-pad'>${padName}<h3 class='info-window-city'>${locName}</h3>`;

  const infoWindow = new google.maps.InfoWindow({ content: contentString });

  infoWindow.open(map, marker);
  let infoWindowOpen = true;

  marker.addListener('click', () => {
    infoWindowOpen ? infoWindow.close() : infoWindow.open(map, marker);
    infoWindowOpen = !infoWindowOpen;
  });
}

function initBackButton() {
  const navbar = document.querySelector('.navbar');
  const navbarBack = document.querySelector('.navbar__back');
  const navbarBackButton = document.querySelector('.navbar__back--button');

  navbar.setAttribute('style', 'grid-template-columns: 60px 1fr;');

  navbarBack.hidden = false;

  navbarBackButton.addEventListener('mouseover', event => {
    navbarBackButton.querySelector('.back-arrow__symbol').setAttribute('fill', 'url(#grad-back)');
  });

  navbarBackButton.addEventListener('mouseout', event => {
    navbarBackButton.querySelector('.back-arrow__symbol').setAttribute('fill', '#b0b1b3');
  });
}

function convertCurrentTimeToUsersTime() {
  const singleLaunchDateText = document.querySelector('.single-launch__date--text');
  const windowStart = new Date(singleLaunchDateText.innerHTML);
  const options = {
    hour12: true,
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };
  const userDate = windowStart.toLocaleDateString('en', options);

  singleLaunchDateText.innerHTML = userDate;
}

function run() {
  initMap();
  initBackButton();
  convertCurrentTimeToUsersTime();
}

window.onload = run;
