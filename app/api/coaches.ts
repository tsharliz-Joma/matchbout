import type {NextApiRequest, NextApiResponse} from "next";
import {connectToDatabase} from "@/app/lib/mongodb";
import {
  createCoach,
  deleteCoach,
  getCoaches,
  updateCoach,
} from "@/app/lib/repositories/coachRepository";
import {
  sanitizeCoachData,
  validateRequest,
} from "@/app/lib/validation/coachValidation";

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectToDatabase();

  switch (req.method) {
    case "GET":
      try {
        const {location} = req.query;
        const coaches = await getCoaches(location as string);
        res.status(200).json({success: true, data: coaches});
      } catch (error) {
        res
          .status(500)
          .json({success: false, error: "Failed to fetch coaches"});
      }
      break;

    case "POST":
      try {
        console.log(req.body);
        for (const validation of sanitizeCoachData) {
          await validation.run(req);
        }
        validateRequest(req, res, async () => {
          const newCoach = await createCoach(req.body);
          res.status(201).json({success: true, data: newCoach});
        });
      } catch (error) {
        res.status(400).json({success: false, error: error.message});
      }
      break;

    case "PUT":
      try {
        const {id} = req.query;
        sanitizeCoachData;
        validateRequest(req, res, async () => {
          const updatedCoach = await updateCoach(id as string, req.body);
          res.status(200).json({success: true, data: updatedCoach});
        });
      } catch (error) {
        res.status(400).json({success: false, error: "Failed to update coach"});
      }
      break;

    case "DELETE":
      try {
        const {id} = req.query;
        await deleteCoach(id as string);
        res.status(204).json({success: true});
      } catch (error) {
        res.status(400).json({success: false, error: "Failed to delete coach"});
      }
      break;

    default:
      res.status(405).json({success: false, error: "Method not allowed"});
  }
};
