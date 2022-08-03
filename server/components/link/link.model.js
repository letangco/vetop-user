import mongoose from 'mongoose';
import { DEFAULT_ICON } from '../../constants';
import { SHARE_HOST } from '../../../external/constants/constants';
import { GetFileData } from '../../../external/util/file';

/**
 * @swagger
 * definitions:
 *  Link:
 *    type: object
 *    properties:
 *      _id:
 *        type: ObjectId
 *      title:
 *        type: string
 *      link:
 *        type: string
 *      index:
 *        type: Number
 *      icon:
 *        type: Object
 *        items:
 *          name: string
 *          large: string
 *          medium: string
 *          small: string
 */

const LinkSchema = new mongoose.Schema({
    title: { type: String, default: '' },
    link: { type: String, required: true },
    icon: {
        name: { type: String, default: DEFAULT_ICON.name },
        large: { type: String, default: DEFAULT_ICON.large },
        medium: { type: String, default: DEFAULT_ICON.medium },
        small: { type: String, default: DEFAULT_ICON.small },
    },
    index: { type: Number, default: 1 }
}, { timestamps: true });

LinkSchema.methods.metaDataLink = function () {
    return {
        _id: this._id,
        title: this.title,
        link: this.link,
        icon: GetFileData(SHARE_HOST, this.icon ? this.icon : DEFAULT_ICON),
        index: this.index
    };
};

export default mongoose.model('Link', LinkSchema);
