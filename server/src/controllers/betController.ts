import { Request, Response } from 'express';
import { Bet } from "../models/Bet";
import { BadRequestError } from "../errors";
import { StatusCodes } from "../constants/statusCodes";

const getAllBets = async (req: Request, res: Response) => {
    const bets = await Bet.find({});
    res.json(bets);
}

const createBet = async (req: Request<{}, {}, {name: string, email: string, price: string}>, res: Response) => {
    const { name, email, price } = req.body;

    if (!name || !email || !price) {
        throw new BadRequestError('Please provide all values');
    }

    const betExists = await Bet.findOne({
        "$and": [
            {
                createdAt: {
                    $gte: new Date().setUTCHours(0,0,0,0)
                }
            },
            {
                createdAt: {
                    $lte: new Date().setUTCHours(23,59,59,999)
                }
            }
        ],
        email
    });

    if (betExists) {
        throw new BadRequestError('You already made a bet today');
    }

    const bet = await Bet.create({name, email, price});

    res.status(StatusCodes.CREATED).json(bet);
}

export { getAllBets, createBet };
