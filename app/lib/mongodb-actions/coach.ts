import Coach from "@/models/coachModel";
import {CoachDataType, UpdateCoachDataType} from "types/coach_type";

export const getCoaches = async (location?: String) => {
  return location ? Coach.find({location}) : Coach.find({});
};

export const createCoach = async (coachData: CoachDataType) => {
  const newCoach = new Coach(coachData);
  try {
    await newCoach.save();
  } catch (e) {
    console.error(e);
  }
};

export const updateCoach = async (
  id: string,
  updateData: UpdateCoachDataType,
) => {
  return Coach.findByIdAndUpdate(id, updateData, {new: true});
};

export const deleteCoach = async (id: string) => {
  return Coach.findByIdAndDelete(id);
};
