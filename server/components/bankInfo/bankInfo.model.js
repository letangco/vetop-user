import mongoose from 'mongoose';
import slug from 'slug';

const Schema = mongoose.Schema;

const bankInfoSchema = new Schema({
    storeId: { type: Schema.ObjectId, index: 1 },
    userId: { type: Schema.ObjectId, index: 1 },
    bankId: { type: Schema.ObjectId, required: true },
    accountNumber: { type: String, required: true },
    ownerName: { type: String, required: true },
    bankBranch: { type: String, required: true },
    status: { type: Boolean, default: false }
}, {
    timestamps: true
});

export default mongoose.model('bankInfo', bankInfoSchema);
