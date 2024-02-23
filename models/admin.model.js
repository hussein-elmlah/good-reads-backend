const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minLength: 5,
      maxLength: 20,
      trim: true,
      match: [/^[a-zA-Z0-9_.-]+$/, 'only alphanumeric characters, underscore, hyphen, and dot are allowed.'],
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
      maxLength: 30,
      trim: true,
      match: [
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=?/.]).*$/,
        'must contain at least one digit, one lowercase letter, one uppercase letter, and one special character.',
      ],
    },
  },
  {
    timestamps: {
      updatedAt: false,
    },
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.password;
      },
    },
  },
);

adminSchema.pre('save', async function preSave() {
  this.password = await bcrypt.hash(this.password, 10);
});

adminSchema.methods.verifyPassword = async function verifyPassword(password) {
  const valid = await bcrypt.compare(password, this.password);
  return valid;
};

const AdminModel = mongoose.model('Admins', adminSchema);
module.exports = AdminModel;
