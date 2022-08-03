import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const locationDefaultSchema = new Schema({
    loc: { type: { type: String }, coordinates: [] },
    address: { type: String },
    status: { type: Boolean, default: false },
    adminId: { type: Schema.ObjectId }
}, {
    timestamps: true
});

locationDefaultSchema.index({ loc: '2dsphere' });

export default mongoose.model('locationDefault', locationDefaultSchema);
