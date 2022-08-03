import e from 'express';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const simHistorySchema = new Schema({
    sim: { type: String, required: true },
    userId: { type: Schema.ObjectId, required: true }
}, {
    timestamps: true
});

export default mongoose.model('simHistory', simHistorySchema);
