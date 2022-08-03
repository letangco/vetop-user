import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const settingGeneralSchema = new Schema({
    type: { type: Number, required: true },
    data: { type: Object, required: true }
});

export default mongoose.model('setting-general', settingGeneralSchema);
