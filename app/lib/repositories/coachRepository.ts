import coaches from "@/models/coaches";
import {CoachDataType} from "types/coaches";
import {UpdateCoachDataType} from "types/coaches";

export const getCoaches = async (location?: String) => {
  return location ? coaches.find({location}) : coaches.find({});
};

export const createCoach = async (coachData: CoachDataType) => {
  const newCoach = new coaches(coachData);
  return newCoach.save();
};

export const updateCoach = async (
  id: string,
  updateData: UpdateCoachDataType,
) => {
  return coaches.findByIdAndUpdate(id, updateData, {new: true});
};

export const deleteCoach = async (id: string) => {
  return coaches.findByIdAndDelete(id);
};
