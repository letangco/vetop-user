import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ProblemSchema = new Schema({
  problem: { type: String },
}, {
  timestamps: true,
});

export default mongoose.model('Problem', ProblemSchema);
