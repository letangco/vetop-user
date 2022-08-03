import mongoose, { Schema } from 'mongoose';
import {
  STORE_STATUS
} from '../../constants';
import User from '../user/user.model';
import Country from '../country/country.model';
import State from '../state/state.model';
import { sendDataToQueue } from '../../../internal/rabbitmq/publisher/publisher';
import { Rabbitmq } from '../../server';
import {NOTIFICATION_TYPE, QUEUE_NAME} from '../../../external/constants/job_name';
import { StorePayload } from '../../../external/elasticsearch/store/store';
import {DEFAULT_AVATAR_STORE, REPORT, SHARE_HOST} from '../../../external/constants/constants';
import slug from 'slug';
import { GetFileData } from '../../../external/util/file';
import {sendNotification} from "../notification/notification.service";
import StaticReport from "../user/staticReport";

/**
 * @swagger
 * definitions:
 *  Store:
 *    type: object
 *    properties:
 *      _id:
 *        type: string
 *      userId:
 *        type: ObjectId
 *      code:
 *        type: String
 *      name:
 *        type: String
 *      description:
 *        type: String
 *      address:
 *        type: boolean
 *      phone:
 *        type: String
 *      status:
 *        type: Number
 *      countryId:
 *        type: ObjectId
 *      stateId:
 *        type: ObjectId
 *      districtId:
 *        type: ObjectId
 *      companyInfo:
 *        type: Object
 */
const storeSchema = new mongoose.Schema({
  userId: { type: Schema.ObjectId, ref: 'User' },
  code: { type: String },
  name: { type: String },
  description: { type: String },
  address: { type: String },
  phone: { type: String },
  email: { type: String },
  status: { type: Number, default: STORE_STATUS.ACTIVE },
  countryId: { type: Schema.ObjectId, ref: 'Country' },
  stateId: { type: Schema.ObjectId, ref: 'State' },
  districtId: { type: String },
  company: {
    taxCode: { type: String },
    name: { type: String },
    founded: { type: String },
    founder: { type: String },
    industry: { type: String }
  },
  avatar: {
    name: { type: String, default: DEFAULT_AVATAR_STORE.name },
    large: { type: String, default: DEFAULT_AVATAR_STORE.large },
    medium: { type: String, default: DEFAULT_AVATAR_STORE.medium },
    small: { type: String, default: DEFAULT_AVATAR_STORE.small },
  },
  rate: { type: Number, default: 0 },
  totalProduct: { type: Number, default: 0 },
  storeCategories: { type: Array, default: [] },
  loc: { type: { type: String }, coordinates: [] },
  searchString: { type: String },
  online: { type: Number, default: 0 },
  qrCode: { type: String },
  // sim - mall
  ratingSim: { type: Number }
}, {
  timestamps: true
});

storeSchema.index({ loc: '2dsphere' });

storeSchema.pre('save', async function (next) {
  this.searchString = slug(`${this.name} ${this.code}`, ' ');
  this.wasNew = this.isNew;
  return next();
});

storeSchema.post('save', async function(created, next) {
  if (this.wasNew) {
    await sendNotification({
      targetId: created._id,
      to: created._id,
      data: {
        name: created.name,
      },
      type: NOTIFICATION_TYPE.REGISTER_STORE
    });
    await StaticReport.updateOne(
      { type: REPORT.STORE },
      { $inc: { data: 1 } },
      { upsert: true }
    );
  }
  return next();
});
storeSchema.methods.AddProductToElasticSearch = function () {
  const data = {
    id: this._id.toString(),
    userId: this.userId,
    searchString: slug(`${this.name} ${this.code}`, ' '),
    name: this.name,
    code: this.code,
    description: this.description,
    storeCategories: JSON.stringify(this?.storeCategories),
    phone: this.phone,
    rate: this.rate,
    address: this.address,
    status: this.status,
    company: JSON.stringify(this.company),
    stateId: this.stateId,
    countryId: this.countryId,
    loc: JSON.stringify(this.loc),
    totalProduct: this.totalProduct
  };
  sendDataToQueue(Rabbitmq.getChannel(), QUEUE_NAME.ELASTICSEARCH_CREATE, {
    index: StorePayload.index,
    data
  });
};

storeSchema.methods.DeleteProductToElasticSearch = function () {
  const id = this._id.toString();
  sendDataToQueue(Rabbitmq.getChannel(), QUEUE_NAME.ELASTICSEARCH_REMOVE, {
    index: StorePayload.index,
    id
  });
};

storeSchema.methods.UpdateStoreToElasticSearch = function (categoriesName) {
  try {
    const data = {
      id: this._id.toString(),
      userId: this.userId,
      searchString: slug(`${this.name} ${this.code} ${categoriesName}`, ' '),
      name: this.name,
      code: this.code,
      description: this.description,
      storeCategories: JSON.stringify(this?.storeCategories),
      phone: this.phone,
      rate: this.rate,
      address: this.address,
      status: this.status,
      company: JSON.stringify(this.company),
      stateId: this.stateId,
      countryId: this.countryId,
      loc: JSON.stringify(this.loc),
      totalProduct: this.totalProduct
    };
    sendDataToQueue(Rabbitmq.getChannel(), QUEUE_NAME.ELASTICSEARCH_UPDATE, {
      index: StorePayload.index,
      data
    });
  } catch (error) {
    console.log(error);
  }
};

storeSchema.methods.metaStore = async function () {
  const results = await Promise.all([
    User.findById(this.userId).lean(),
    Country.findById(this.countryId).lean(),
    State.findById(this.stateId).lean(),
  ]);
  return {
    _id: this._id,
    code: this.code,
    phone: this.phone,
    name: this.name,
    description: this.description,
    address: this.address,
    status: this.status,
    company: this.company,
    rate: this.rate,
    totalProduct: this.totalProduct,
    storeCategories: this.storeCategories,
    avatar: results[0] ? GetFileData(SHARE_HOST, results[0].avatar) : {},
    country: results[1] ? results[1] : {},
    state: results[2] ? results[2] : {},
    loc: this.loc,
    online: this.online,
    updatedAt: this.updatedAt,
    createAt: this.createAt
  };
};
export default mongoose.model('store', storeSchema);
