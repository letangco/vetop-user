import mongoose, { Schema } from 'mongoose';
import slug from 'slug';

/**
 * @swagger
 * definitions:
 *  Zone:
 *    type: object
 *    properties:
 *      name:
 *        type: String
 *      IOS2:
 *        type: String
 *      IOS3:
 *        type: String
 *      status:
 *        type: Boolean
 *      countryId:
 *        type: ObjectId
 */
const StateSchema = new mongoose.Schema({
  name: { type: String },
  IOS2: { type: String },
  IOS3: { type: String },
  searchString: { type: String },
  countryId: { type: Schema.Types.ObjectId, ref: 'Country' },
  status: { type: Boolean },
});

StateSchema.index({ searchString: 'text' });

StateSchema.pre('save', function (next) {
  this.searchString = slug(`${this.name}`, ' ');
  return next();
});


export default mongoose.model('State', StateSchema);
