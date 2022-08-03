import mongoose from 'mongoose';
/**
 * @swagger
 * definitions:
 *  Country:
 *    type: object
 *    properties:
 *      _id:
 *        type: string
 *      name:
 *        type: string
 *      ISO2:
 *        type: string
 *      ISO3:
 *        type: string
 *      currencyCode:
 *        type: string
 */
const CountrySchema = new mongoose.Schema({
  name: { type: String, required: true },
  ISO2: { type: String, required: true },
  ISO3: { type: String, required: true },
  currencyCode: { type: String },
  status: { type: Boolean, default: true },
}, {
  timestamps: true,
});

CountrySchema.set('toJSON', {
  transform(doc, ret, options) { // eslint-disable-line no-unused-vars
    delete ret.__v;
    delete ret.createdAt;
    delete ret.updatedAt;
    delete ret.status;
  },
});


export default mongoose.model('Country', CountrySchema);
