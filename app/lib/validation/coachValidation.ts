import type {NextApiHandler, NextApiRequest, NextApiResponse} from "next";
import type {NextFunction} from "express";
import {body, validationResult} from "express-validator";
import validator from "validator";

export const sanitizeCoachData = [
  body("name")
    .trim() // Remove extra spaces
    .escape() // Escape HTML to prevent XSS attacks
    .notEmpty()
    .withMessage("Name is required")
    .isLength({max: 100})
    .withMessage("Name must be under 100 characters"),

  body("location.lat")
    .isFloat({min: -90, max: 90})
    .withMessage("Latitude must be a valid number between -90 and 90"),

  body("location.lng")
    .isFloat({min: -180, max: 180})
    .withMessage("Longitude must be a valid number between -180 and 180"),

  body("profilePicture")
    .optional()
    .custom((value) => {
      if (!validator.isURL(value)) {
        throw new Error("Invalid URL");
      }
      return true;
    }),
];

export const validateRequest = (
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextFunction,
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({success: false, errors: errors.array()});
  }

  next();
};
