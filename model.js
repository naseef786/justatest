import { Schema, mongoose } from "mongoose";

const carSchema = new Schema({
    make: String,
    model: String,
    year: Number,
    _id: Schema.Types.ObjectId, // Explicitly specify _id as ObjectId
  }, {
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
      },
    },
    versionKey: false,
  });

  const Car = mongoose.model('Car', carSchema);

  export default Car;