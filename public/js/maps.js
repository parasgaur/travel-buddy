var platform = new H.service.Platform({
    'apikey': 'a-YX2FvKolptYJdl947QghaVact_QFRltUahaIiJz4E'
  });

// Obtain the default map types from the platform object:
var defaultLayers = platform.createDefaultLayers();
var service = platform.getSearchService();

let lendmark = document.querySelector('.main-heading').textContent;
service.geocode({
    q: lendmark
  }, (result) => {
    // Instantiate (and display) a map object:
    var map = new H.Map(
        document.querySelector('.map'),
        defaultLayers.vector.normal.map,
        {
        zoom: 15,
        center: result.items[0].position
        });
    var ui = H.ui.UI.createDefault(map, defaultLayers);
    map.addObject(new H.map.Marker(result.items[0].position));
  }, alert);