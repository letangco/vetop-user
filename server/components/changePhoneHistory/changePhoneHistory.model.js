import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const changePhoneHistory = new Schema({
    userId: { type: Schema.ObjectId, ref: 'User' },
    history: [{
        currentPhone: { type: String, required: true },
        newPhone: { type: String, required: true },
        type: { type: Number, required: true }, // 0: User, 1 Admin,
        createdAt: { type: Date },
        updatedAt: { type: Date }
    }]
}, {
    timestamps: true
});

export default mongoose.model('PhoneHistory', changePhoneHistory);
