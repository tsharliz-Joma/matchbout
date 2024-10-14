import mongoose, {Schema, Document} from "mongoose";

export interface ICoach extends Document {
  name: string;
  email: string;
  password: string;
  phone: string;
  location: string;
  createdAt: Date;
  updatedAt: Date;
}

const CoachSchema: Schema = new Schema({
  name: {type: String, required: [true, "Name is Required"], trim: true},
  email: {
    type: String,
    unique: true,
    required: [true, "Email is Required"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Email is invalid",
    ],
  },
  password: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  createdAt: {type: Date, Default: Date.now},
  updatedAt: {type: Date, Default: Date.now},
});

CoachSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

const Coach =
  mongoose.models?.Coach || mongoose.model<ICoach>("Coach", CoachSchema);

export default Coach;
