import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import slug from 'slug';
import {
BCRYPT_SALT_ROUNDS, DEFAULT_AVATAR, USER_JWT_DEFAULT_EXPIRE_DURATION, USER_STATUS
} from '../../constants';
import { JWT_SECRET_KEY } from '../../config';
import { DEFAULT_GENDER, SHARE_HOST, REPORT } from '../../../external/constants/constants';
import { GetFileData } from '../../../external/util/file';
import StaticReport from './staticReport';
import { sendDataToQueue } from '../../../internal/rabbitmq/publisher/publisher';
import {NOTIFICATION_TYPE, QUEUE_NAME} from '../../../external/constants/job_name';
import { UserPayload } from '../../../external/elasticsearch/user/user';
import { Rabbitmq } from '../../server';
import QRCode from 'qrcode';
import { sendNotification } from '../notification/notification.service';

const generateQR = async (text) => {
  try {
    const result = await QRCode.toDataURL(text.toString(), {
      errorCorrectionLevel: 'H', version: 4, width: 500, margin: 1.5
    });
    return result;
  } catch (err) {
    return err;
  }
};

const Schema = mongoose.Schema;
/**
 * @swagger
 * definitions:
 *  User:
 *    type: object
 *    properties:
 *      _id:
 *        type: ObjectId
 *      code:
 *        type: string
 *      email:
 *        type: string
 *      fullName:
 *        type: string
 *      avatar:
 *        type: Object
 *      phone:
 *        type: string
 *      password:
 *        type: string
 *      refer:
 *        type: ObjectId
 *      status:
 *        type: Int
 *      identity:
 *        type: String
 *      refreshToken:
 *        type: string
 */
const UserSchema = new Schema({
  code: { type: String, require: true, unique: true },
  email: { type: String },
  phone: { type: String, require: true, unique: true },
  fullName: { type: String, required: true },
  password: { type: String, required: true },
  avatar: {
    name: { type: String, default: DEFAULT_AVATAR.name },
    large: { type: String, default: DEFAULT_AVATAR.large },
    medium: { type: String, default: DEFAULT_AVATAR.medium },
    small: { type: String, default: DEFAULT_AVATAR.small },
  },
  registrationDate: { type: Date },
  address: { type: String },
  status: { type: Number, default: USER_STATUS.PENDING },
  refer: { type: Schema.ObjectId },
  rate: { type: Number, default: 0 },
  online: { type: Number, default: 0 },
  identity: { type: String },
  refreshToken: { type: String },
  gender: { type: Number, default: DEFAULT_GENDER.FEMALE },
  dob: { type: Date },
  defaultStore: { type: Schema.ObjectId },
  searchString: { type: String },
  qrCode: { type: String },
  // sim mall
  ratingSim: { type: Number },
  statusInvite: { type: Boolean, default: true }
}, {
  timestamps: true,
});

UserSchema.methods.metaDataUser = function () {
  return {
    _id: this._id,
    fullName: this.fullName,
    phone: this.phone,
    avatar: GetFileData(SHARE_HOST, this.avatar),
    address: this.address,
    online: this.online,
    refer: this.refer,
    defaultStatus: this.defaultStore || null
  };
};

UserSchema.methods.metaDataProfileUser = async function () {
  return {
    _id: this._id,
    fullName: this.fullName,
    avatar: GetFileData(SHARE_HOST, this.avatar),
    phone: this.phone,
    address: this.address,
    email: this.email,
    status: this.status,
    code: this.code,
    rate: this.rate,
    online: this.online,
    gender: this.gender,
    qrCode: !this.qrCode ? await generateQR(this.code) : this.qrCode,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  };
};

UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.signJWT = function (expiresIn, data) {
  return jwt.sign(data, JWT_SECRET_KEY, {
    expiresIn: expiresIn || USER_JWT_DEFAULT_EXPIRE_DURATION,
  });
};

UserSchema.pre('save', async function (next) {
  if (typeof this.email === 'string') {
    this.email = this.email.toLowerCase();
  }
  this.searchString = slug(`${this.fullName} ${this.phone} ${this.code} ${this.phone} ${this.email}`, ' ');
  this.wasNew = this.isNew;
  return next();
});

UserSchema.post('save', async function (created, next) {
  if (this.wasNew) {
    await sendNotification({
      targetId: created._id,
      to: created._id,
      data: {
        fullName: created.fullName,
        code: created.code,
      },
      type: NOTIFICATION_TYPE.REGISTER_ACCOUNT
    });
    await StaticReport.updateOne(
      { type: REPORT.USER },
      { $inc: { data: 1 } },
      { upsert: true }
    );
  }
  return next();
});
UserSchema.set('toJSON', {
  transform(doc, ret, options) { // eslint-disable-line no-unused-vars
    delete ret.__v;
    delete ret.password;
  },
});

UserSchema.methods.AddUserToElasticsearch = function () {
  const data = {
    id: this._id.toString(),
    searchString: slug(`${this.fullName} ${this.phone} ${this.code} ${this.phone} ${this.email}`, ' '),
    fullName: this.fullName,
    email: this.email,
    phone: this.phone,
    avatar: JSON.stringify(this.avatar),
    code: this.code,
    address: this.address
  };
  sendDataToQueue(Rabbitmq.getChannel(), QUEUE_NAME.ELASTICSEARCH_CREATE, {
    index: UserPayload.index,
    data: data
  });
};

UserSchema.methods.RemoveUserToElasticsearch = function () {
  const id = this._id.toString();
  sendDataToQueue(Rabbitmq.getChannel(), QUEUE_NAME.ELASTICSEARCH_REMOVE, {
    index: UserPayload.index,
    id,
  });
};

UserSchema.methods.UpdateUserToElasticsearch = function () {
  const data = {
    id: this._id.toString(),
    searchString: slug(`${this.fullName} ${this.phone} ${this.code} ${this.phone} ${this.email}`, ' '),
    fullName: this.fullName,
    email: this.email,
    phone: this.phone,
    address: this.address,
    avatar: JSON.stringify(this.avatar),
    code: this.code,
  };
  sendDataToQueue(Rabbitmq.getChannel(), QUEUE_NAME.ELASTICSEARCH_UPDATE, {
    index: UserPayload.index,
    data
  });
};

export default mongoose.model('User', UserSchema);
