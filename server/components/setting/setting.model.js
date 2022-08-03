import mongoose from 'mongoose';

/**
 * @swagger
 * definitions:
 *  Zone:
 *    type: object
 *    properties:
 *      type:
 *        type: String
 *      data:
 *        type: Object
 */
const SettingSchema = new mongoose.Schema({
  type: { type: String },
  data: { type: Object },
});

SettingSchema.index({ searchString: 'text' });

export default mongoose.model('Setting', SettingSchema);
