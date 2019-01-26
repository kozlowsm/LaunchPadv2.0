// date-fns imports
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

// Variables used for timer countdown
let upcomingHeaderTimer = null;
let currentDiffDays = 0;
let currentDiffHours = 0;
let currentDiffMinutes = 0;
let currentDiffSeconds = 0;
let inTheFuture = true;
/**
 * Initializes map for upcoming launch along with map marker and info window.
 */
function initNextLaunchMap() {
  /** Offset used to center map over info window instead of marker */
  const offset = 1.83;
  const latitude = +document.querySelector('.upcoming-body__location--lat').textContent;
  const longitude = +document.querySelector('.upcoming-body__location--lng').textContent;

  /** Marker location */
  const launch = { lat: latitude, lng: longitude };
  /** Map center point (with offset) */
  const center = { lat: latitude + offset, lng: longitude };

  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 6,
    center,
    disableDefaultUI: true,
  });

  const marker = new google.maps.Marker({ position: launch, map });

  const padName = document.querySelector('.upcoming-body__location--pad').textContent;
  const locName = document.querySelector('.upcoming-body__location--name').textContent;

  /** HTML to go in the info window */
  const contentString = `<h2 class='info-window-pad'>${padName}<h3 class='info-window-city'>${locName}</h3>`;

  const infoWindow = new google.maps.InfoWindow({ content: contentString });

  infoWindow.open(map, marker);

  let open = true;

  /** Open and close info window on click */
  marker.addListener(
    'click',
    () => {
      open ? infoWindow.close() : infoWindow.open(map, marker);
      open = !open;
    },
    { passive: true }
  );
}
/**
 * Initialize current countdown time until launch
 */
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

  /** If the launch is in the future, use 'T-' */
  if (inTheFuture) {
    diffDays = diffDays <= -10 ? -diffDays : `0${-diffDays}`;
    diffHours = diffHours <= -10 ? -diffHours : `0${-diffHours}`;
    diffMinutes = diffMinutes <= -10 ? -diffMinutes : `0${-diffMinutes}`;
    diffSeconds = diffSeconds <= -10 ? -diffSeconds : `0${-diffSeconds}`;
  }
  upcomingHeaderTimer.innerHTML = `T - ${diffDays}:${diffHours}:${diffMinutes}:${diffSeconds}`;
}
/**
 * Adds functionality to expand and collapse button in mobile to show and hide upcoming launch
 */
function initExpandCollapse() {
  /** Wrapper to change height of */
  const upcomingLaunchWrapper = document.querySelector('.upcoming-launch__wrapper');

  const upcomingExpand = document.querySelector('.upcoming-expand');
  const upcomingCollapse = document.querySelector('.upcoming-collapse');

  /** Expand upcoming launch, hide the expand button, show the collapse button */
  upcomingExpand.addEventListener(
    'click',
    () => {
      upcomingExpand.setAttribute('style', 'display: none');
      upcomingCollapse.setAttribute('style', 'display: unset');
      upcomingLaunchWrapper.classList.toggle('upcoming-launch__wrapper--open');
    },
    { passive: true }
  );

  /** Collapse upcoming launch, hide the collapse button, show the expand button */
  upcomingCollapse.addEventListener(
    'click',
    () => {
      console.log('collapse');
      upcomingExpand.setAttribute('style', 'display: unset');
      upcomingCollapse.setAttribute('style', 'display: none');
      upcomingLaunchWrapper.classList.toggle('upcoming-launch__wrapper--open');
    },
    { passive: true }
  );
}
/**
 * Initializes the dates and of all launches and the height of the wrapper element
 */
function initLaunches() {
  // TODO: Change functionality to not change the height
  const launches = document.querySelector('.launches');
  const launchList = document.querySelectorAll('.launch');

  numLoads = (launchList.length - 1) / 10 - 1;
  remainingLoads = (launchList.length - 1) % 10;

  launchesHeight += 400;
  launches.setAttribute('style', `height: ${launchesHeight}px`);

  for (let i = 0; i < launchList.length; i += 1) {
    const launchMonthDay = launchList[i].querySelector('.launch__month-day');
    const windowStart = new Date(launchList[i].querySelector('.launch__datetime').innerHTML);
    const options = {
      hour12: true,
      month: 'short',
      day: 'numeric',
    };

    const userDate = windowStart.toLocaleDateString('en', options);

    launchMonthDay.innerHTML = userDate;
  }
}
/**
 * Loads more launches
 */
function initLoadButtons() {
  // TODO: Requires complete rewrite
  const launches = document.querySelector('.launches');
  const loadMoreButton = document.querySelector('.load-more__button');

  loadMoreButton.addEventListener(
    'click',
    () => {
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
    },
    { passive: true }
  );
}
/**
 * Converts upcoming launch date to the users local timezone
 */
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
/**
 * Every second, click the countdown timer down until T-0, then changed to 'In Progress'
 */
function tickClock() {
  if (currentDiffSeconds === 0) {
    if (currentDiffMinutes === 0) {
      if (currentDiffHours === 0) {
        if (currentDiffDays === 0) {
          inTheFuture = false;
          upcomingHeaderTimer.innerHTML = 'In Progress';
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
/**
 * On window load, run all of the following routines.
 */
function run() {
  initNextLaunchMap();
  initUpcomingCountdown();
  initExpandCollapse();
  initLaunches();
  initLoadButtons();
  convertCurrentTimeToUsersTime();
  setInterval(tickClock, 1000);
}

window.onload = run;
