import mongoose from 'mongoose';
import slug from 'slug';

const Schema = mongoose.Schema;

const districtSchema = new Schema({
    stateId: { type: Schema.ObjectId },
    name: { type: String },
    search: { type: String }
});

districtSchema.pre('save', function (next) {
   this.searchString = slug(`${this.name} `, ' ');
   next();
});

export default mongoose.model('district', districtSchema);
