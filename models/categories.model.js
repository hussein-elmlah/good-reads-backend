const mongoose = require('mongoose');
const AutoIncrementFactory = require('mongoose-sequence');

const AutoIncrement = AutoIncrementFactory(mongoose);

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(value) {
        return /^[a-zA-Z]+$/.test(value);
      },
      message: (props) => `${props.value} is an invalid Category Name`,
    },
  },
  _id: {
    type: Number,
  },
});

// Use mongoose-sequence to auto-increment _id
categorySchema.plugin(AutoIncrement, { id: 'category_id_counter', inc_field: '_id' });

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
