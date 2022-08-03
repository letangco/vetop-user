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
const CodeSchema = new Schema({
  type: { type: Number, require: true, unique: true },
  code: { type: Number },
  status: { type: Boolean, default: false }
}, {
  timestamps: true
});

CodeSchema.index({ code: 'text' });

export default mongoose.model('Code', CodeSchema);
