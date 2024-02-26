const mongoose = require('mongoose');

// const categorySchema = new mongoose.Schema({
//   categoryName: {
//     type: String,
//     required: true,
//     unique: true,
//     validate: {
//       validator(value) {
//         return /^[a-zA-Z]+$/.test(value);
//       },
//       message: (props) => `${props.value} is an invalid Category Name`,
//     },
//   },
// });

// const Category = mongoose.model('Category', categorySchema);

// module.exports = Category;
const AutoIncrementFactory = require('mongoose-sequence');

const { Schema } = mongoose;

const AutoIncrement = AutoIncrementFactory(mongoose);

const categorySchema = new Schema({
  categoryName: {
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

// const mongoose = require('mongoose');
// const AutoIncrementFactory = require('mongoose-sequence');

// const { Schema } = mongoose;

// const AutoIncrement = AutoIncrementFactory(mongoose);

// const categorySchema = new Schema({
//   categoryName: {
//     type: String,
//     required: true,
//     unique: true,
//     validate: {
//       validator(value) {
//         return /^[a-zA-Z]+$/.test(value);
//       },
//       message: (props) => `${props.value} is an invalid Category Name`,
//     },
//   },
// });

// categorySchema.plugin(AutoIncrement, { id: 'category_id_counter', inc_field: '_id' });

// const Category = mongoose.model('Category', categorySchema);

// module.exports = Category;
// const mongoose = require('mongoose');
// const AutoIncrementFactory = require('mongoose-sequence');

// const { Schema } = mongoose;

// const AutoIncrement = AutoIncrementFactory(mongoose);

// const categorySchema = new Schema({
//   _id: {
//     type: Number,
//     required: true,
//   },
//   categoryName: {
//     type: String,
//     required: true,
//     unique: true,
//     validate: {
//       validator(value) {
//         return /^[a-zA-Z]+$/.test(value);
//       },
//       message: (props) => `${props.value} is an invalid Category Name`,
//     },
//   },
// });

// // Use mongoose-sequence to auto-increment _id
// categorySchema.plugin(AutoIncrement, { id: 'category_id_counter', inc_field: '_id' });

// const Category = mongoose.model('Category', categorySchema);

// module.exports = Category;
