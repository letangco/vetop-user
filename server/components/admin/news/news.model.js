import mongoose, { Schema } from 'mongoose';
import { DEFAULT_AVATAR_STORE } from '../../../../external/constants/constants';
import { DEFAULT_AVATAR } from '../../../constants';

/**
 * @swagger
 * definitions:
 *  News:
 *    type: object
 *    properties:
 *      title:
 *        type: String
 *      adminId:
 *        type: ObjectId
 *      meta_description:
 *        type: String
 *      description:
 *        type: String
 *      viewer:
 *        type: Number
 *      categories:
 *        type: Array
 *      tags:
 *        type: Array
 *      status:
 *        type: Boolean
 *      avatar: Object
 */
const NewsSchema = new mongoose.Schema({
  adminId: { type: Schema.ObjectId },
  avatar: {
    name: { type: String, default: DEFAULT_AVATAR_STORE.name },
    large: { type: String, default: DEFAULT_AVATAR_STORE.large },
    medium: { type: String, default: DEFAULT_AVATAR_STORE.medium },
    small: { type: String, default: DEFAULT_AVATAR_STORE.small },
  },
  images: { type: Array, default: [] },
  title: { type: String, default: '' },
  meta_description: { type: String, default: '' },
  description: { type: String, default: '' },
  content: { type: String, default: '' },
  author: { type: String, default: '' },
  viewer: { type: Number },
  categories: [
    { type: Schema.ObjectId, ref: 'Category' }
  ],
  tags: { type: Array, default: [] },
  status: { type: Boolean, default: true },
  special_news: { type: Boolean, required: true, default: false },
  searchString: { type: String }
}, { timestamps: true });


export default mongoose.model('News', NewsSchema);
