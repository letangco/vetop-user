import mongoose from 'mongoose';
import { DEFAULT_VALUE_CODE } from '../../../external/constants/constants';

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
const CodeSearchSchema = new Schema({
  code: { type: String, require: true, unique: true },
  value: { type: Number, default: DEFAULT_VALUE_CODE },
}, {
  timestamps: true
});

CodeSearchSchema.index({ code: 'text' });

export default mongoose.model('CodeSearch', CodeSearchSchema);
