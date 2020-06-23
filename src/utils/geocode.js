const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYW1pdGNoaW50YXdhciIsImEiOiJja2E1ZHEyYTUxMzV2M2VvZ2hkdDgyaDd4In0._la3ek8p2fiblti416Zofw&limit=1'
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Error connecting to weather service', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location', undefined)
        } else {
            const data = {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            }
            callback(undefined, data)
        }
    })
}

module.exports = geocode