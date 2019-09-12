const changeDecimals = require('./changeDecimals');

module.exports = loc => {
    loc.lat = changeDecimals(loc.lat, 8);
    loc.lng = changeDecimals(loc.lng, 8);
    var highLat = loc.lat + .5;
    var lowLat = loc.lat - .5;
    var highLng = loc.lng + .4;
    var lowLng = loc.lng - .4;
    highLat = changeDecimals(highLat, 8);
    lowLat = changeDecimals(lowLat, 8);
    highLng = changeDecimals(highLng, 8);
    lowLng = changeDecimals(lowLng, 8);
    return (
        "SELECT *, " +
        "DistanceInMiles(" + loc.lat + ", " + loc.lng + ", z.lat, z.lng) as distance " +
        "from restaurants z " +
        "WHERE z.lat BETWEEN " + lowLat + " AND " + highLat + " " +
        "AND z.lng BETWEEN " + lowLng + " AND " + highLng + " " +
        "HAVING distance < 25 " +
        "ORDER BY distance " +
        "LIMIT 25;"
    );
}