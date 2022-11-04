import { Request, Response } from "express";
import { Bet } from "../models/Bet";
import { BadRequestError } from "../errors";
import { StatusCodes } from "../constants/statusCodes";

const DAY = 24*3600*1000

const getAllBets = async (req: Request, res: Response) => {
  // 11 hours because stockholm +1, helsinki/riga +2
  const hour = new Date().getHours();
  let start = new Date().setHours(11, 0, 0, 0)
  if(hour < 11){
    start -= DAY
  }
  const end = start + DAY

  const bets = await Bet.find({
    $and: [
      {
        createdAt: {
          $gte: new Date(start),
        },
      },
      {
        createdAt: {
          $lte: new Date(end),
        },
      },
    ],
  });
  res.json(bets);
};

const createBet = async (
  req: Request<{}, {}, { name: string; email: string; price: string }>,
  res: Response
) => {
  const { name, email, price } = req.body;

  if (!name || !email || !price) {
    throw new BadRequestError("Please provide all values");
  }

  // const now = new Date().getTime();
  // const betsUntil = new Date(new Date().setHours(12, 0, 0, 0)).getTime();
  //
  // if (now >= betsUntil) {
  //   throw new BadRequestError("Bets for today are over");
  // }

  const betExists = await Bet.findOne({
    $and: [
      {
        createdAt: {
          $gte: new Date().setUTCHours(0, 0, 0, 0),
        },
      },
      {
        createdAt: {
          $lte: new Date().setUTCHours(23, 59, 59, 999),
        },
      },
    ],
    $or: [{ email }, { name }],
  });

  if (betExists) {
    throw new BadRequestError("You already made a bet today");
  }

  const bet = await Bet.create({ name, email, price });

  res.status(StatusCodes.CREATED).json(bet);
};

export { getAllBets, createBet };
