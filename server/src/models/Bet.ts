import { model, Schema } from 'mongoose';
import {IBetModel} from "../types/Bet";

const BetSchema: Schema = new Schema<IBetModel>(
    {
        name: {
            type: String,
            required: [true, 'Please provide name'],
            minLength: 3,
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Please provide email'],
        },
        price: {
            type: Number,
            required: true,
            default: 0,
        }
    },
    { timestamps: true }
);

const Bet = model<IBetModel>('Bet', BetSchema);
export { Bet };
