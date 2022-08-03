import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {
BCRYPT_SALT_ROUNDS, DEFAULT_AVATAR, USER_JWT_DEFAULT_EXPIRE_DURATION
} from '../../constants';
import { JWT_SECRET_KEY } from '../../config';

const Schema = mongoose.Schema;
/**
 * @swagger
 * definitions:
 *  User:
 *    type: object
 *    properties:
 *      _id:
 *        type: ObjectId
 *      userName:
 *        type: string
 *      password:
 *        type: string
 *      email:
 *        type: string
 *      fullName:
 *        type: string
 *      avatar:
 *        type: Object
 *      group:
 *        type: ObjectId
 *      status:
 *        type: Number
 *      refreshToken:
 *        type: string
 */
const AdminSchema = new Schema({
  email: { type: String, require: true, unique: true },
  fullName: { type: String, required: true },
  userName: { type: String, required: true },
  password: { type: String, required: true },
  avatar: {
    name: { type: String, default: DEFAULT_AVATAR.name },
    large: { type: String, default: DEFAULT_AVATAR.large },
    medium: { type: String, default: DEFAULT_AVATAR.medium },
    small: { type: String, default: DEFAULT_AVATAR.small },
  },
  status: { type: Number },
  group: { type: Schema.ObjectId },
  refreshToken: { type: String }
}, {
  timestamps: true,
});

AdminSchema.methods.metaDataAdmin = function () {
  return {
    userName: this.userName,
    fullName: this.fullName,
    email: this.email,
    group: this.group,
    avatar: this.avatar
  };
};

AdminSchema.methods.metaDataProfile = function () {
  return {
    fullName: this.fullName,
    email: this.email,
    avatar: this.avatar,
    phone: this.phone,
    group: this.group,
  };
};

AdminSchema.methods.comparePassword = function (password) {
  // console.log(password, this.password);
  return bcrypt.compareSync(password, this.password);
};

AdminSchema.methods.signJWT = function (expiresIn) {
  return jwt.sign({
    _id: this._id
  }, JWT_SECRET_KEY, {
    expiresIn: expiresIn || USER_JWT_DEFAULT_EXPIRE_DURATION,
  });
};

AdminSchema.pre('save', function (next) {
  if (typeof this.email === 'string') {
    this.email = this.email.toLowerCase();
  }
  return next();
});

AdminSchema.set('toJSON', {
  transform(doc, ret, options) { // eslint-disable-line no-unused-vars
    delete ret.__v;
    delete ret.password;
  },
});

export default mongoose.model('Admin', AdminSchema);
