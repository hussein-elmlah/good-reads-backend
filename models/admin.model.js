const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 6,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      validate: {
        validator: (password) => /[!@#$%^&*(),.?":{}|<>]/.test(password),
        message: () => 'must contain at least one special character.',
      },
    },
  },
  {
    timestamps: {
      updatedAt: false,
    },
    toJSON: {
      transform: (doc, ret) => {
        ret.password = undefined;
        return ret;
      },
    },
  },
);

adminSchema.pre('save', async function preSave() {
  this.password = await bcrypt.hash(this.password, 8);
});

adminSchema.methods.verifyPassword = async function verifyPassword(password) {
  const valid = await bcrypt.compare(password, this.password);
  return valid;
};

const AdminModel = mongoose.model('Admins', adminSchema);
module.exports = AdminModel;
