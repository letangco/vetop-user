import mongoose, { Schema } from 'mongoose';

/**
 * @swagger
 * definitions:
 *  Policy:
 *    type: object
 *    properties:
 *      title:
 *        type: String
 *      adminId:
 *        type: ObjectId
 *      content:
 *        type: String
 *      status:
 *        type: Boolean
 *      type:
 *        type: String
 */
const PolicySchema = new mongoose.Schema({
    adminId: { type: Schema.ObjectId },
    title: { type: String, default: '' },
    content: { type: String, default: '' },
    status: { type: Boolean, default: true },
    type: { type: String, default: 'policy', required: true },
}, { timestamps: true });

export default mongoose.model('Policy', PolicySchema);
