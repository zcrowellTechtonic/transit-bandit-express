const mongoose = require('mongoose');
const StopsSchema = new mongoose.Schema({
  stop_id : Number,
  stop_code : Number,
  stop_name : String,
  stop_desc : String,
  stop_lat : Number,
  stop_lon : Number
});
mongoose.model('Stops', StopsSchema);

module.exports = mongoose.model('Stops', StopsSchema);

