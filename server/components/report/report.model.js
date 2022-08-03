import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const reportSchema = new Schema({
    reporter: { type: Schema.ObjectId, required: true, index: 1 },
    type: { type: Number, required: true },
    note: { type: String },
    userId: { type: Schema.ObjectId },
    storeId: { type: Schema.ObjectId }
}, {
    timestamps: true
});

export default mongoose.model('report', reportSchema);
