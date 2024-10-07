import mongoose, {Schema, Document} from "mongoose";

export interface ICoach extends Document {
  name: string;
  location: string;
  profilePicture?: string;
  createdAt: Date;
  updatedAt: Date;
}

const CoachSchema: Schema = new Schema({
  name: {type: String, required: true, trim: true},
  location: {
    lat: {type: Number, required: true},
    lng: {type: Number, required: true},
  },
  profilePicture: {type: String, Default: ""},
  createdAt: {type: Date, Default: Date.now},
  updatedAt: {type: Date, Default: Date.now},
});

CoachSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.Coach ||
  mongoose.model<ICoach>("Coach", CoachSchema);
