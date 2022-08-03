import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const paymentListSchema = new Schema({
    name: { type: String, required: true },
    image: {
        name: { type: String },
        small: { type: String },
        medium: { type: String },
        large: { type: String }
    },
    searchString: { type: String }
}, {
    timestamps: true
});

export default mongoose.model('payment-list', paymentListSchema);
