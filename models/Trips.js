const mongoose = require('mongoose');
const TripsSchema = new mongoose.Schema({
    route_id : Number,
    service_id : String,
    trip_id : Number,
    trip_headsign : String,
    direction_id : Number,
    block_id : String,
    shape_id : Number
});
mongoose.model('Trips', TripsSchema);

module.exports = mongoose.model('Trips', TripsSchema);

