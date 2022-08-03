import mongoose from 'mongoose';

export function generateRandom6Digits() {
  return Math.floor(100000 + Math.random() * 100000);
}
export function generateRandom(min, max, string) {
  const code = (Math.floor(Math.random() * (max) + min)).toString();
  return string.substring(0, string.length - code.length) + code;
}

export function getObjectId(objectId) {
  try {
    if (typeof objectId === 'string') {
      return mongoose.Types.ObjectId(objectId);
    }
    return objectId;
  } catch (error) {
    throw error;
  }
}
