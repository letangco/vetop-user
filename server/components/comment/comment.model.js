import mongoose, { Schema } from 'mongoose';

/**
 * @swagger
 * definitions:
 *  News:
 *    type: object
 *    properties:
 *      newsId:
 *        type: ObjectId
 *      userId:
 *        type: ObjectId
 *      content:
 *        type: String
 *      status:
 *        type: Boolean
 */
const CommentSchema = new mongoose.Schema({
  newsId: { type: Schema.ObjectId },
  userId: { type: Schema.ObjectId },
  content: { type: String },
  status: { type: Boolean },
});

export default mongoose.model('Comment', CommentSchema);
