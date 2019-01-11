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

  const padName = document.querySelector('.upcoming-body__location--pad').textContent;
  const locName = document.querySelector('.upcoming-body__location--name').textContent;

  const contentString = `<h2 class='info-window-pad'>${padName}<h3 class='info-window-city'>${locName}</h3>`;

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

//
function initButtons() {
  const launches = document.querySelectorAll('.launch');
  const launchHeaders = document.querySelectorAll('.launch__header');
  const launchTitles = document.querySelectorAll('.launch__title');

  const launchDropdowns = document.querySelectorAll('.launch__dropdown');
  const downArrowSymbols = document.querySelectorAll('.down-arrow__symbol');

  const launchButtons = document.querySelectorAll('.launch__button');
  const rightArrowSymbols = document.querySelectorAll('.right-arrow__symbol');

  const upcomingExpand = document.querySelector('.upcoming-expand');
  const upcomingCollapse = document.querySelector('.upcoming-collapse');
  const upcomingLaunch = document.querySelector('.upcoming-launch');

  const navbarBackButton = document.querySelector('.navbar__back--button');

  for (let i = 0; i < launchDropdowns.length; i++) {
    launchDropdowns[i].addEventListener('click', () => {
      launches[i].setAttribute(
        'style',
        launches[i].offsetHeight == 60 ? 'height: 360px' : 'height: 60px'
      );
      launchHeaders[i].classList.toggle('launch__header--open');
      launchTitles[i].classList.toggle('launch__title--open');
      launchDropdowns[i].classList.toggle('launch__dropdown--open');
      downArrowSymbols[i].setAttribute(
        'fill',
        downArrowSymbols[i].getAttribute('fill') == '#b0b1b3' ? 'url(#grad-mob)' : '#b0b1b3'
      );
      // downArrowSymbols[i].setAttribute("filter", (downArrowSymbols[i].getAttribute("filter") == "none") ? "url(#dropshadow-mob)" : "none");
      downArrowSymbols[i].classList.toggle('down-arrow__symbol--rotated');
    });
  }

  for (let i = 0; i < launchButtons.length; i++) {
    launchButtons[i].addEventListener('mouseover', event => {
      launchButtons[i].setAttribute('style', 'background-color: #dddbdb');
      rightArrowSymbols[i].setAttribute('fill', 'url(#grad-desk)');
      rightArrowSymbols[i].setAttribute('filter', 'url(#dropshadow-desk)');
    });

    launchButtons[i].addEventListener('mouseout', event => {
      launchButtons[i].setAttribute('style', 'background-color: #636262');
      rightArrowSymbols[i].setAttribute('fill', '#b0b1b3');
      rightArrowSymbols[i].setAttribute('filter', 'none');
    });
  }

  upcomingExpand.querySelector('.upcoming-expand__button').addEventListener('click', () => {
    upcomingLaunch.setAttribute('style', 'grid-template-rows: 150px 0px auto 60px');
  });

  upcomingCollapse.querySelector('.upcoming-collapse__button').addEventListener('click', () => {
    upcomingLaunch.setAttribute('style', 'grid-template-rows: 150px 60px 0px 0px ');
  });

  navbarBackButton.addEventListener('mouseover', event => {
    navbarBackButton.setAttribute('style', 'background-color: #dddbdb');
    navbarBackButton.querySelector('.back-arrow__symbol').setAttribute('fill', 'url(#grad-back)');
  });

  navbarBackButton.addEventListener('mouseout', event => {
    navbarBackButton.setAttribute('style', 'background-color: #636262');
    navbarBackButton.querySelector('.back-arrow__symbol').setAttribute('fill', '#b0b1b3');
  });
}
function run() {
  initMap();
  initButtons();
}

window.onload = run;
