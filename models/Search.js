const mongoose = require('mongoose');
const { Schema } = mongoose;

const SearchSchema = new Schema({
    username:{ type: String, required: true },
    imageurl:{type: String, required: true}
});

const Search = mongoose.model('search', SearchSchema)
Search.createIndexes();
module.exports= Search;