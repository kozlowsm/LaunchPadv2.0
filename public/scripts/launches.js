function initLaunchMap() {
  const offset = 1.83;
  const latitude = +document.querySelector('.single-launch__map--lat').textContent;
  const longitude = +document.querySelector('.single-launch__map--lng').textContent;

  const launch = { lat: latitude, lng: longitude };
  const center = { lat: latitude + offset, lng: longitude };

  const map = new google.maps.Map(document.getElementById('single-launch__map'), {
    zoom: 6,
    center,
    disableDefaultUI: true,
  });

  const marker = new google.maps.Marker({ position: launch, map });

  const padName = document.querySelector('.single-launch__map--pad').textContent;
  const locName = document.querySelector('.single-launch__map--loc').textContent;

  const contentString = `<h2 class='info-window-pad'>${padName}<h3 class='info-window-city'>${locName}</h3>`;

  const infoWindow = new google.maps.InfoWindow({ content: contentString });

  infoWindow.open(map, marker);

  let open = true;

  marker.addListener('click', () => {
    open ? infoWindow.close() : infoWindow.open(map, marker);
    open = !open;
  });
}

function convertCurrentTimeToUsersTime() {
  const singleLaunchDateText = document.querySelector('.single-launch__date').querySelector('h3');
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
  initLaunchMap();
  convertCurrentTimeToUsersTime();
}

window.onload = run;
