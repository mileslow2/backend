const getPlaces = require('./getRestaurants');
const getPlaceInfo = require('./getPlaceInfo');
module.exports = app => {
    getPlaceInfo(app);
    getPlaces(app);
};