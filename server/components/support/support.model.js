import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const SupportSchema = new Schema({
    title: { type: String, default: '' },
    content: { type: String, default: '' },
    email: { type: String, default: '' },
    type: { type: String, default: 'support', required: true },
    problemId: { type: Schema.ObjectId },
    status: { type: Boolean, default: false }
}, {
  timestamps: true,
});

export default mongoose.model('Support', SupportSchema);
