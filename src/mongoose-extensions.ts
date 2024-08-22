// import { Schema as MongooseSchema } from 'mongoose';

// declare module 'mongoose' {
//   interface Schema {
//     toJSON(): any;
//   }
// }

// MongooseSchema.prototype.toJSON = function () {
//   const obj = this.toObject();
//   obj.id = obj._id.toString();
//   delete obj._id;
//   delete obj.__v;
//   return obj;
// };
