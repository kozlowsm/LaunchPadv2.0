//Take only what you need
const { format } = require('date-fns');

// Temporary
console.log(format(new Date(), 'MM/DD/YYYY'));

let currentOffset = 0;
let launchesHeight = 0;
let numLoads = 0;
let remainingLoads = 0;

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
function initHoverButtons() {
  const launchButtons = document.querySelectorAll('.launch__button');
  const rightArrowSymbols = document.querySelectorAll('.right-arrow__symbol');
  const navbarBackButton = document.querySelector('.navbar__back--button');

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

  navbarBackButton.addEventListener('mouseover', event => {
    navbarBackButton.setAttribute('style', 'background-color: #dddbdb');
    navbarBackButton.querySelector('.back-arrow__symbol').setAttribute('fill', 'url(#grad-back)');
  });

  navbarBackButton.addEventListener('mouseout', event => {
    navbarBackButton.setAttribute('style', 'background-color: #636262');
    navbarBackButton.querySelector('.back-arrow__symbol').setAttribute('fill', '#b0b1b3');
  });
}

function initDropdownButtons() {
  const launches = document.querySelector('.launches');
  const launchList = document.querySelectorAll('.launch');
  const launchHeaders = document.querySelectorAll('.launch__header');
  const launchTitles = document.querySelectorAll('.launch__title');

  const launchDropdowns = document.querySelectorAll('.launch__dropdown');
  const downArrowSymbols = document.querySelectorAll('.down-arrow__symbol');

  const upcomingExpand = document.querySelector('.upcoming-expand');
  const upcomingCollapse = document.querySelector('.upcoming-collapse');
  const upcomingLaunch = document.querySelector('.upcoming-launch');

  // Set the number of loads possible (i.e. total launches / 5)
  numLoads = (launchList.length - 1) / 5 - 2;
  // Numer of launches to load after all but less than 5 launches are left
  remainingLoads = (launchList.length - 1) % 5;

  for (let i = 0; i < launchDropdowns.length; i++) {
    // The repetitive nesting is a fix for a bug allowing infinite expansion/collapsing

    // eslint-disable-next-line no-loop-func
    launchDropdowns[i].addEventListener('click', () => {
      if (launchList[i].offsetHeight === 60) {
        launchList[i].setAttribute('style', 'height: 360px');
        launches.setAttribute('style', `height: ${launchesHeight + 300}px`);
        launchesHeight += 300;

        launchHeaders[i].classList.toggle('launch__header--open');
        launchTitles[i].classList.toggle('launch__title--open');
        launchDropdowns[i].classList.toggle('launch__dropdown--open');
        downArrowSymbols[i].setAttribute(
          'fill',
          downArrowSymbols[i].getAttribute('fill') === '#b0b1b3' ? 'url(#grad-mob)' : '#b0b1b3'
        );
        downArrowSymbols[i].classList.toggle('down-arrow__symbol--rotated');
      } else if (launchList[i].offsetHeight === 360) {
        launchList[i].setAttribute('style', 'height: 60px');
        launches.setAttribute('style', `height: ${launchesHeight - 300}px`);
        launchesHeight -= 300;
        launchHeaders[i].classList.toggle('launch__header--open');
        launchTitles[i].classList.toggle('launch__title--open');
        launchDropdowns[i].classList.toggle('launch__dropdown--open');
        downArrowSymbols[i].setAttribute(
          'fill',
          downArrowSymbols[i].getAttribute('fill') === '#b0b1b3' ? 'url(#grad-mob)' : '#b0b1b3'
        );
        downArrowSymbols[i].classList.toggle('down-arrow__symbol--rotated');
      }

      // launches.setAttribute(
      //   'style',
      //   `height: ${launchList[i].offsetHeight === 60 ? height + 300 : height - 300}`
      // );

      // launchHeaders[i].classList.toggle('launch__header--open');
      // launchTitles[i].classList.toggle('launch__title--open');
      // launchDropdowns[i].classList.toggle('launch__dropdown--open');
      // downArrowSymbols[i].setAttribute(
      //   'fill',
      //   downArrowSymbols[i].getAttribute('fill') === '#b0b1b3' ? 'url(#grad-mob)' : '#b0b1b3'
      // );
      // downArrowSymbols[i].classList.toggle('down-arrow__symbol--rotated');
    });
  }

  upcomingExpand.querySelector('.upcoming-expand__button').addEventListener('click', () => {
    upcomingLaunch.setAttribute('style', 'grid-template-rows: 150px 0px auto 60px');
  });

  upcomingCollapse.querySelector('.upcoming-collapse__button').addEventListener('click', () => {
    upcomingLaunch.setAttribute('style', 'grid-template-rows: 150px 60px 0px 0px ');
  });
}

function initLoadButtons() {
  const launchesParent = document.querySelector('.launches');
  const loadMoreButton = document.querySelector('.load-more__button');

  const { width } = window.screen;
  console.log(`<launches> height: ${launchesHeight}`);

  loadMoreButton.addEventListener('click', event => {
    if (numLoads > 0) {
      currentOffset += 5;
      if (width >= 320 && width < 480) {
        console.log(`new height of <launches>: ${launchesHeight + 5 * 72}`);
        launchesParent.setAttribute('style', `height: ${launchesHeight + 5 * 72}px`);
        launchesHeight += 5 * 72;
      }
      if (width >= 480) {
        console.log(`new height of <launches>: ${launchesHeight + 5 * 92}`);
        launchesParent.setAttribute('style', `height: ${launchesHeight + 5 * 92}px`);
        launchesHeight += 5 * 92;
      }
      for (let i = 0; i < 5; i++) {
        launchesParent.querySelector(`.launch-${currentOffset - 5 + i}`).hidden = false;
      }
    } else {
      if (width >= 320 && width < 480) {
        console.log(`new height of <launches>: ${launchesHeight + remainingLoads * 72}`);
        launchesParent.setAttribute('style', `height: ${launchesHeight + remainingLoads * 72}px`);
        launchesHeight += remainingLoads * 72;
      }
      if (width >= 480) {
        console.log(`new height of <launches>: ${launchesHeight + remainingLoads * 92}`);
        launchesParent.setAttribute('style', `height: ${launchesHeight + remainingLoads * 92}px`);
        launchesHeight += remainingLoads * 92;
      }
      loadMoreButton.setAttribute('disabled', 'disabled');
      loadMoreButton.classList.toggle('load-more__button--disabled');
      loadMoreButton.innerHTML = 'No More Launches to Load';
    }
    numLoads--;
    console.log(numLoads);
  });
}

function initLaunches() {
  currentOffset += 5;
  const launches = document.querySelector('.launches');

  const { width } = window.screen;
  if (width >= 320 && width < 480) {
    launches.setAttribute('style', `height: ${currentOffset * 72}px`);
    launchesHeight = currentOffset * 72;
  }
  if (width >= 480) {
    launches.setAttribute('style', `height: ${currentOffset * 92}px`);
    launchesHeight = currentOffset * 92;
  }

  // Set the first five launches to not hidden
  for (let i = 0; i < 5; i++) {
    launches.querySelector(`.launch-${currentOffset - 5 + i}`).hidden = false;
  }
}

function run() {
  initMap();
  initLaunches();
  initHoverButtons();
  initDropdownButtons();
  initLoadButtons();
}

window.onload = run;
