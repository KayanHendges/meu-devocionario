import { Types } from 'mongoose';

interface MongoReturnProperties {
  __v?: any;
  _id: Types.ObjectId;
}

export const mapMongoReturn = <
  T extends MongoReturnProperties & Record<string, any>,
>(
  object: T,
): Omit<T, keyof MongoReturnProperties> & { id: string } => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _id, __v, ...obj } = object;

  return { ...obj, id: _id.toString() };
};

export const mapMongoParams = <
  T extends Record<string, any> & { id?: string },
>({
  id,
  ...params
}: T): Omit<T, 'id'> & { _id?: string } => {
  if (id) return { ...params, _id: id };
  return params;
};
