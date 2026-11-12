function geoLocalizar() {
    var output = document.getElementById("mapa");

    if (!navigator.geolocation){
        output.innerHTML = "<p>Geolocalización no esta soportada por el navegadort</p>";
        return;
    }

    function obtencionExitosa(position) {
        var map = new ol.Map({
            layers: [new ol.layer.Tile({source: new ol.source.OSM()})],
            target: 'mapa',
            view: new ol.View({
                projection: 'EPSG:4326',
                center: [position.coords.longitude, position.coords.latitude],
                zoom: 20})});
    };

    function error() {
        output.innerHTML = "No se puede recuperar la ubicación";
    };


    navigator.geolocation.getCurrentPosition(obtencionExitosa, error);
}