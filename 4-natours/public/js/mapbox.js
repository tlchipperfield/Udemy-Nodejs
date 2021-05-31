/* eslint-disable */
const locations = JSON.parse(document.getElementById('map').dataset.locations);


mapboxgl.accessToken =
  'pk.eyJ1IjoidGxjaGlwIiwiYSI6ImNrcGI4ZWVuZjB3MDcyeG1rNTV5am1zMmwifQ.lmka9ncE2Os-d_lH5UaNqg';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/tlchip/ckpb9813f0bmg18qx4oc0c65g',
  scrollZoom: false,
});

const bounds = new mapboxgl.LngLatBounds();

locations.forEach((loc) => {
  // Add marker
  const el = document.createElement('div');
  el.className = 'marker';

  new mapboxgl.Marker({
    element: el,
    anchor: 'bottom',
  })
    .setLngLat(loc.coordinates)
    .addTo(map);

  // add popup
  new mapboxgl.Popup({
    offset: 30,
  })
    .setLngLat(loc.coordinates)
    .setHTML(`<p>Day ${loc.day}: ${loc.description}<p>`)
    .addTo(map);

  bounds.extend(loc.coordinates);
});

map.fitBounds(bounds, {
  padding: {
    top: 200,
    bottom: 200,
    left: 100,
    right: 100,
  },
});