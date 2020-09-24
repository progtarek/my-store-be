const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      min: 3,
      max: 20,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      min: 3,
      max: 20,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      min: 4,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'admin',
    },
    profilePicture: {
      type: String,
    },
    mobile: {
      type: String,
      trim: true,
      lowercase: true,
      required: false,
    },
    gender: { type: String, enum: ['male', 'female'], required: false },

    birthday: {
      day: { type: Number, required: false },
      month: { type: Number, required: false },
      year: { type: Number, required: false },
    },
  },
  { timestamps: true }
);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.generateJWT = function (JWT_SECRET) {
  try {
    const payload = {
      _id: this._id,
      role: this.role,
    };
    return jsonwebtoken.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1y',
    });
  } catch (error) {
    throw error;
  }
};

module.exports = model('User', UserSchema);
