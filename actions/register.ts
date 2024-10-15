"use server";
import {connectToDatabase} from "@/app/lib/mongodb";
import Coach from "@/models/coaches";
import bcrypt from "bcryptjs";

export const register = async (values: any) => {
  const {email, password, name} = values;

  try {
    await connectToDatabase();
    const userFound = await Coach.findOne({email});
    if (userFound) {
      return {
        error: "Email already exists!",
      };
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new Coach({
      name,
      email,
      password: hashedPassword,
    });
    const savedUser = await user.save();
  } catch (error) {
    console.error(error);
  }
};
