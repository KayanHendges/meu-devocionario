import mongoose from 'mongoose';

export const isObjectId = (value: any): boolean => {
  return typeof value === 'string' && mongoose.isObjectIdOrHexString(value);
};
