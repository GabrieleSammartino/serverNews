const mongoose = require('mongoose');
var newsSchema = mongoose.Schema({
        title: String,
        img: String,
        category: String
    }
);
News = mongoose.model('News',newsSchema);
module.exports = News;
