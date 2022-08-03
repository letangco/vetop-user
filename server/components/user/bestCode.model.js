import mongoose from 'mongoose';

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
 *      value:
 *        type: Number
 */
const bestCodeSchema = new Schema({
  code: { type: Number, unique: true },
  value: { type: Number },
  rule: { type: String },
  status: { type: Boolean, default: false }
}, {
  timestamps: true
});

bestCodeSchema.index({ code: 'text' });

export default mongoose.model('bestCode', bestCodeSchema);
