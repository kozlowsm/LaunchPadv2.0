// Take only what you need
const {
  differenceInSeconds,
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
  isAfter,
} = require('date-fns');

let currentOffset = 0;
let launchesHeight = 0;
let numLoads = 0;
let remainingLoads = 0;

// Time Variables
let upcomingHeaderTimer = null;
let currentDiffDays = 0;
let currentDiffHours = 0;
let currentDiffMinutes = 0;
let currentDiffSeconds = 0;
let inTheFuture = true;

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

  infoWindowDesktop.open(mapDesktop, markerDesktop);
  infoWindowMobile.open(mapMobile, markerMobile);

  let openDesktop = true;
  let openMobile = true;

  markerDesktop.addListener('click', () => {
    openDesktop ? infoWindowDesktop.close() : infoWindowDesktop.open(mapDesktop, markerDesktop);
    openDesktop = !openDesktop;
  });
  markerMobile.addListener('click', () => {
    openMobile ? infoWindowMobile.close() : infoWindowMobile.open(mapMobile, markerMobile);
    openMobile = !openMobile;
  });
}

function initUpcomingCountdown() {
  upcomingHeaderTimer = document.querySelector('.upcoming-header__text--countdown');
  windowStart = new Date(document.querySelector('.upcoming-header__text--date').innerHTML);
  const now = new Date();

  let diffDays = differenceInDays(now, windowStart);
  currentDiffDays = Math.abs(diffDays);

  let diffHours = differenceInHours(now, windowStart) - 24 * diffDays;
  currentDiffHours = Math.abs(diffHours);

  let diffMinutes = differenceInMinutes(now, windowStart) - 24 * 60 * diffDays - 60 * diffHours;
  currentDiffMinutes = Math.abs(diffMinutes);

  let diffSeconds =
    differenceInSeconds(now, windowStart) -
    24 * 60 * 60 * diffDays -
    60 * 60 * diffHours -
    60 * diffMinutes;
  currentDiffSeconds = Math.abs(diffSeconds);

  inTheFuture = isAfter(windowStart, now);

  // If the launch is in the future, use 'T-'
  if (inTheFuture) {
    diffDays = diffDays <= -10 ? -diffDays : `0${-diffDays}`;
    diffHours = diffHours <= -10 ? -diffHours : `0${-diffHours}`;
    diffMinutes = diffMinutes <= -10 ? -diffMinutes : `0${-diffMinutes}`;
    diffSeconds = diffSeconds <= -10 ? -diffSeconds : `0${-diffSeconds}`;
  }
  upcomingHeaderTimer.innerHTML = `T - ${diffDays}:${diffHours}:${diffMinutes}:${diffSeconds}`;
}

function initLaunches() {
  currentOffset += 5;
  const launches = document.querySelector('.launches');

  const width = window.innerWidth;
  if (width < 768) {
    launches.setAttribute('style', `height: ${currentOffset * 72}px`);
    launchesHeight = currentOffset * 72;
  }
  if (width >= 768) {
    launches.setAttribute('style', `height: ${currentOffset * 92}px`);
    launchesHeight = currentOffset * 92;
  }
}

function initHoverButtons() {
  const launchButtons = document.querySelectorAll('.launch__button');
  const rightArrowSymbols = document.querySelectorAll('.right-arrow__symbol');

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
    });
  }

  upcomingExpand.querySelector('.upcoming-expand__button').addEventListener('click', () => {
    upcomingLaunch.setAttribute('style', 'grid-template-rows: 150px 0px auto 90px');
  });

  upcomingCollapse.querySelector('.upcoming-collapse__button').addEventListener('click', () => {
    upcomingLaunch.setAttribute('style', 'grid-template-rows: 150px 60px 0px 0px ');
  });
}

function initLoadButtons() {
  const launchesParent = document.querySelector('.launches');
  const loadMoreButton = document.querySelector('.load-more__button');

  const width = window.innerWidth;

  loadMoreButton.addEventListener('click', event => {
    if (numLoads > 0) {
      currentOffset += 5;
      if (width < 768) {
        launchesParent.setAttribute('style', `height: ${launchesHeight + 5 * 72}px`);
        launchesHeight += 5 * 72;
      }
      if (width >= 768) {
        launchesParent.setAttribute('style', `height: ${launchesHeight + 5 * 92}px`);
        launchesHeight += 5 * 92;
      }
      for (let i = 0; i < 5; i++) {
        launchesParent.querySelector(`.launch-${currentOffset - 5 + i}`).hidden = false;
      }
    } else {
      if (width < 768) {
        launchesParent.setAttribute('style', `height: ${launchesHeight + remainingLoads * 72}px`);
        launchesHeight += remainingLoads * 72;
      }
      if (width >= 768) {
        launchesParent.setAttribute('style', `height: ${launchesHeight + remainingLoads * 92}px`);
        launchesHeight += remainingLoads * 92;
      }
      loadMoreButton.setAttribute('disabled', 'disabled');
      loadMoreButton.classList.toggle('load-more__button--disabled');
      loadMoreButton.innerHTML = 'No More Launches to Load';
    }
    numLoads--;
  });
}

function convertCurrentTimeToUsersTime() {
  const upcomingHeaderTextDate = document.querySelector('.upcoming-header__text--date');
  const windowStart = new Date(upcomingHeaderTextDate.innerHTML);
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

  upcomingHeaderTextDate.innerHTML = userDate;
}

function tickClockDown() {
  if (currentDiffSeconds === 0) {
    if (currentDiffMinutes === 0) {
      if (currentDiffHours === 0) {
        if (currentDiffDays === 0) {
          inTheFuture = false;
          currentDiffSeconds += 1;
        } else {
          currentDiffDays -= 1;
        }
        currentDiffDays -= 1;
      } else {
        currentDiffHours -= 1;
      }
      currentDiffHours -= 1;
    } else {
      currentDiffMinutes -= 1;
    }
    currentDiffSeconds = 59;
  } else {
    currentDiffSeconds -= 1;
  }

  if (currentDiffSeconds === 0) {

  }

  const currentDiffDaysFormat = currentDiffDays >= 10 ? currentDiffDays : `0${currentDiffDays}`;
  const currentDiffHoursFormat = currentDiffHours >= 10 ? currentDiffHours : `0${currentDiffHours}`;
  const currentDiffMinutesFormat =
    currentDiffMinutes >= 10 ? currentDiffMinutes : `0${currentDiffMinutes}`;
  const currentDiffSecondsFormat =
    currentDiffSeconds >= 10 ? currentDiffSeconds : `0${currentDiffSeconds}`;
  if (inTheFuture) {
    upcomingHeaderTimer.innerHTML = `T - ${currentDiffDaysFormat}:${currentDiffHoursFormat}:${currentDiffMinutesFormat}:${currentDiffSecondsFormat}`;
  } else {
    upcomingHeaderTimer.innerHTML = `T + ${currentDiffDaysFormat}:${currentDiffHoursFormat}:${currentDiffMinutesFormat}:${currentDiffSecondsFormat}`;
  }
}

function tickClockUp() {
  currentDiffDays = 0;
  currentDiffHours = 0;
  currentDiffMinutes = 0;
  currentDiffSeconds = 0;

  if (currentDiffSeconds === 59) {
    if (currentDiffMinutes === 59) {
      if (currentDiffHours === 23) {
        currentDiffDays += 1;
        currentDiffHours = 0;
      } else {
        currentDiffHours += 1;
      }
      currentDiffMinutes = 0;
    } else {
      currentDiffMinutes += 1;
    }
    currentDiffSeconds = 0;
  } else {
    currentDiffSeconds += 1;
  }

  const currentDiffDaysFormat = currentDiffDays >= 10 ? currentDiffDays : `0${currentDiffDays}`;
  const currentDiffHoursFormat = currentDiffHours >= 10 ? currentDiffHours : `0${currentDiffHours}`;
  const currentDiffMinutesFormat =
    currentDiffMinutes >= 10 ? currentDiffMinutes : `0${currentDiffMinutes}`;
  const currentDiffSecondsFormat =
    currentDiffSeconds >= 10 ? currentDiffSeconds : `0${currentDiffSeconds}`;
  upcomingHeaderTimer.innerHTML = `T + ${currentDiffDaysFormat}:${currentDiffHoursFormat}:${currentDiffMinutesFormat}:${currentDiffSecondsFormat}`;
}

function tickClock() {
  if (currentDiffSeconds === 0) {
    if (currentDiffMinutes === 0) {
      if (currentDiffHours === 0) {
        if (currentDiffDays === 0) {
          inTheFuture = false;
          upcomingHeaderTimer.innerHTML = 'In Flight';
        } else {
          currentDiffDays -= 1;
          currentDiffHours = 23;
          currentDiffMinutes = 59;
          currentDiffSeconds = 59;
        }
      } else {
        currentDiffHours -= 1;
        currentDiffMinutes = 59;
        currentDiffSeconds = 59;
      }
    } else {
      currentDiffMinutes -= 1;
      currentDiffSeconds = 59;
    }
  } else {
    currentDiffSeconds -= 1;
  }

  if (inTheFuture) {
    const currentDiffDaysFormat = currentDiffDays >= 10 ? currentDiffDays : `0${currentDiffDays}`;
    const currentDiffHoursFormat = currentDiffHours >= 10 ? currentDiffHours : `0${currentDiffHours}`;
    const currentDiffMinutesFormat =
      currentDiffMinutes >= 10 ? currentDiffMinutes : `0${currentDiffMinutes}`;
    const currentDiffSecondsFormat =
      currentDiffSeconds >= 10 ? currentDiffSeconds : `0${currentDiffSeconds}`;
    upcomingHeaderTimer.innerHTML = `T - ${currentDiffDaysFormat}:${currentDiffHoursFormat}:${currentDiffMinutesFormat}:${currentDiffSecondsFormat}`;
  } else {
    upcomingHeaderTimer.innerHTML = 'In Progress';
  }
}

function initLaunchDates() {
  const launchDates = document.querySelectorAll('.launch__date----test');

  for(let i = 0; i < launchDates.length; i++) {
    const windowStart = new Date(launchDates[i].querySelector('.launch__datetime').innerHTML);
    console.log(windowStart);
  }

  // const windowStart = new Date(upcomingHeaderTextDate.innerHTML);
  // const options = { hour12: true, year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
  // const userDate = windowStart.toLocaleDateString('en', options);
}

function run() {
  initMap();
  initUpcomingCountdown();
  initLaunches();
  initHoverButtons();
  initDropdownButtons();
  initLoadButtons();
  convertCurrentTimeToUsersTime();
  initLaunchDates();
  setInterval(tickClock, 1000);
}

window.onload = run;
