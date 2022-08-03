import mongoose from 'mongoose';
import { GetFileData } from '../../../../external/util/file';
import { SHARE_HOST } from '../../../../external/constants/constants';
import { DEFAULT_AVATAR } from '../../../constants';

const Schema = mongoose.Schema;
/**
 * @swagger
 * definitions:
 *  Slideshow:
 *    type: object
 *    properties:
 *      title:
 *        type: String
 *      index:
 *        type: Number
 *      image:
 *        type: Object
 *        items:
 *          name: string
 *          large: string
 *          medium: string
 *          small: string
 */
const SlideshowSchema = new Schema({
    title: { type: String, default: '' },
    image: { type: Object, default: DEFAULT_AVATAR },
    index: { type: Number },
});

SlideshowSchema.methods.metaData = async function () {
    return {
        _id: this._id,
        title: this.title,
        image: this.image ? GetFileData(SHARE_HOST, this.image) : GetFileData(SHARE_HOST, DEFAULT_AVATAR),
        index: this.index
    };
};

export default mongoose.model('Slideshow', SlideshowSchema);
