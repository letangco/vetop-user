import mongoose, { Schema } from 'mongoose';
import { STAFF_STATUS } from '../../../external/constants/constants';

/**
 * @swagger
 * definitions:
 *  Staff:
 *    type: object
 *    properties:
 *      userId:
 *        type: ObjectId
 *      storeId:
 *        type: ObjectId
 */
const StaffSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  storeId: { type: Schema.ObjectId },
  paymentLimit: { type: Number },
  status: { type: Number, default: STAFF_STATUS.PENDING }
}, {
  timestamps: true,
});

StaffSchema.index({ userId: 'text' });
StaffSchema.index({ storeId: 'text' });

export default mongoose.model('staff', StaffSchema);
