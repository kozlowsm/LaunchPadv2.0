// Take only what you need
const {
  differenceInSeconds,
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
  isAfter,
} = require('date-fns');

let launchesHeight = 45;
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

  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 6,
    center,
    disableDefaultUI: true,
  });

  const marker = new google.maps.Marker({ position: launch, map: map });

  const padName = document.querySelector('.upcoming-body__location--pad').textContent;
  const locName = document.querySelector('.upcoming-body__location--name').textContent;

  const contentString = `<h2 class='info-window-pad'>${padName}<h3 class='info-window-city'>${locName}</h3>`;

  const infoWindow = new google.maps.InfoWindow({ content: contentString });

  infoWindow.open(map, marker);

  let open = true;

  marker.addListener('click', () => {
    open ? infoWindow.close() : infoWindow.open(map, marker);
    open = !open;
  });
}

function initUpcomingCountdown() {
  upcomingHeaderTimer = document.querySelector('.upcoming-header__text--countdown');
  const windowStart = new Date(document.querySelector('.upcoming-header__text--date').innerHTML);
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

function initExpandCollapse() {
  const upcomingLaunch = document.querySelector('.upcoming-launch');
  const upcomingExpand = document.querySelector('.upcoming-expand');
  const upcomingCollapse = document.querySelector('.upcoming-collapse');

  upcomingExpand.addEventListener('click', () => {
    console.log('expand');
    upcomingLaunch.setAttribute('style', 'grid-template-rows: 150px 0px auto 90px;');
  });

  upcomingCollapse.addEventListener('click', () => {
    console.log('collapse');
    upcomingLaunch.setAttribute('style', 'grid-template-rows: 150px 60px 0px 0px;');
  });
}

function initLaunches() {
  const launches = document.querySelector('.launches');
  const launchList = document.querySelectorAll('.launch');

  numLoads = (launchList.length - 1) / 10 - 1;
  remainingLoads = (launchList.length - 1) % 10;

  launchesHeight += 400;
  launches.setAttribute('style', `height: ${launchesHeight}px`);

  for (let i = 0; i < launchList.length; i += 1) {
    const launchMonthDay = launchList[i].querySelector('.launch__month-day');
    let windowStart = new Date(launchList[i].querySelector('.launch__datetime').innerHTML);
    const options = {
      hour12: true,
      month: 'short',
      day: 'numeric',
    };

    const userDate = windowStart.toLocaleDateString('en', options);

    launchMonthDay.innerHTML = userDate;
  }
}

function initLoadButtons() {
  const launches = document.querySelector('.launches');
  let loadMoreButton = document.querySelector('.load-more__button');

  loadMoreButton.addEventListener('click', () => {
    console.log('clicked');
    if (numLoads > 1) {
      numLoads -= 1;
      launchesHeight += 400;
      launches.setAttribute('style', `height: ${launchesHeight}px`);
    } else {
      launchesHeight += remainingLoads * 40;
      launches.setAttribute('style', `height: ${launchesHeight}px`);
      loadMoreButton.setAttribute('disabled', 'disabled');
      loadMoreButton.classList.toggle('load-more__button--disabled');
      loadMoreButton.innerHTML = 'No More Launches to Load';
    }
    numLoads -= 1;
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
    const currentDiffHoursFormat =
      currentDiffHours >= 10 ? currentDiffHours : `0${currentDiffHours}`;
    const currentDiffMinutesFormat =
      currentDiffMinutes >= 10 ? currentDiffMinutes : `0${currentDiffMinutes}`;
    const currentDiffSecondsFormat =
      currentDiffSeconds >= 10 ? currentDiffSeconds : `0${currentDiffSeconds}`;
    upcomingHeaderTimer.innerHTML = `T - ${currentDiffDaysFormat}:${currentDiffHoursFormat}:${currentDiffMinutesFormat}:${currentDiffSecondsFormat}`;
  } else {
    upcomingHeaderTimer.innerHTML = 'In Progress';
  }
}

function run() {
  initMap();
  initUpcomingCountdown();
  initExpandCollapse();
  initLaunches();
  initLoadButtons();
  convertCurrentTimeToUsersTime();
  setInterval(tickClock, 1000);
}

window.onload = run;
