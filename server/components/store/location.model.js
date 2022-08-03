import mongoose, { Schema } from 'mongoose';

/**
 * @swagger
 * definitions:
 *  Staff:
 *    type: object
 *    properties:
 *      storeId:
 *        type: ObjectId
 *      information:
 *        type: Object
 */
const LocationSchema = new mongoose.Schema({
  storeId: { type: Schema.ObjectId },
  stateId: { type: Schema.ObjectId },
  countryId: { type: Schema.ObjectId },
  districtId: { type: Schema.ObjectId },
  phone: { type: String, required: true },
  name: { type: String, required: true },
  loc: { type: { type: String }, coordinates: [] },
  address: { type: String },
  status: { type: Boolean, default: false } // status default store location
}, {
  timestamps: true
});

LocationSchema.index({ storeId: 'text' });

export default mongoose.model('location', LocationSchema);
