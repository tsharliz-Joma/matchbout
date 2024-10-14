import Coach from "@/models/coaches";
import {CoachDataType} from "types/coaches";
import {UpdateCoachDataType} from "types/coaches";

export const getCoaches = async (location?: String) => {
  return location ? Coach.find({location}) : Coach.find({});
};

export const createCoach = async (coachData: CoachDataType) => {
  const newCoach = new Coach(coachData);
  try {
    await newCoach.save().then((response: any) => {
      return response.json({status: "ok", message: "New coach created"});
    });
  } catch (e) {
    console.log(e);
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
