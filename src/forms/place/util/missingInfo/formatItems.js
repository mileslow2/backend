const formatHours = openingHours =>
{
    let timeAsInt = "";
    let len = openingHours.periods.length;
    for (let i = 0; i < len; i++)
        timeAsInt += openingHours.periods[i].open.time;
    return timeAsInt;
}

const formatPhoneNumber = phoneNumber =>
{
    //removes all the non int values
    return phoneNumber.replace(/\D/g, '');
}

const formatPlace = place =>
{
    return {
        phoneNumber: formatPhoneNumber(place.formatted_phone_number),
        hours: formatHours(place.opening_hours),
        lat: place.geometry.location.lat,
        lng: place.geometry.location.lng,
        address: place.formatted_address,
        name: place.name,
        googleMapsID: place.place_id,
    };
}

const formatDescription = desc =>
{
    let endIndex;
    desc = desc.replace("</span>", "");
    for (let i = 0; i < desc.length; i++)
        if (desc[i] == "<")
        {
            endIndex = desc.search(">");
            desc = desc.substring(endIndex + 1, desc.length);
        }
    return desc;
}

module.exports = {
    formatPlace,
    formatHours
}