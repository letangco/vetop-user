import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const bankListSchema = new Schema({
    name: { type: String, required: true },
    bankCode: { type: String, required: true },
    image: {
        name: { type: String, required: true },
        large: { type: String, required: true },
        medium: { type: String, required: true },
        small: { type: String, required: true },
    }
}, {
    timestamps: true
});

export default mongoose.model('bankList', bankListSchema);
