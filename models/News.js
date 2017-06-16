const mongoose = require('mongoose');
var newsSchema = mongoose.Schema({
        title: String,
        img: String,
        category: String,
        description: String
    }
);
News = mongoose.model('News',newsSchema);
module.exports = News;
