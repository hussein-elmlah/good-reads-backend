const mongoose = require('mongoose');
const AutoIncrementFactory = require('mongoose-sequence');

const AutoIncrement = AutoIncrementFactory(mongoose);

const categorySchema = new mongoose.Schema({
  _id: {
    type: Number,
  },
  name: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(value) {
        return /^[a-zA-Z]+$/.test(value);
      },
      message: (props) => `${props.value} is an invalid category name`,
    },
  },
});

categorySchema.plugin(AutoIncrement, { id: 'category_id_counter', inc_field: '_id' });

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
