import mongoose, { Schema } from 'mongoose';

/**
 * @swagger
 * definitions:
 *  Followers:
 *    type: object
 *    properties:
 *      userId:
 *        type: ObjectId
 *      store:
 *        type: ObjectId
 */
const FollowersSchema = new mongoose.Schema({
  userId: { type: Schema.ObjectId },
  storeId: { type: Schema.ObjectId }
}, {
  timestamps: true
});

FollowersSchema.index({ userId: 'text' });

export default mongoose.model('follower', FollowersSchema);
