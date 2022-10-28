import {Router} from "express";
import {asyncHandler} from "../utils/asyncHandler";
import {createBet, getAllBets} from "../controllers/betController";

const betRouter = Router();

betRouter.route('/').get(asyncHandler(getAllBets)).post(asyncHandler(createBet));

export { betRouter };
