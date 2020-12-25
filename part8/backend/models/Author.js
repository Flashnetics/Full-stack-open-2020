const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 4
  },
  born: {
    type: Number,
  },
})

schema.set('toJSON', {
  transform(doc, ret) {
    return JSON.stringify(ret);
  },
});
module.exports = mongoose.model('Author', schema)
