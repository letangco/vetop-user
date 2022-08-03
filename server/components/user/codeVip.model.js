import mongoose from 'mongoose';
import slug from 'slug';

const Schema = mongoose.Schema;

const codeVipSchema = new Schema({
    type: { type: String, required: true, unique: true },
    rule: [{
        type: { type: Number },
        value: { type: Number }
    }],
    searchString: { type: String }
}, {
    timestamps: true
});

codeVipSchema.pre('save', function (next) {
    this.searchString = slug(this.type + this.value, ' ');
    return next();
  });

codeVipSchema.index({ type: 'text' });

export default mongoose.model('codeVip', codeVipSchema);
