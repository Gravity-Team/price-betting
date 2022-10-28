import { Document } from 'mongoose';

export interface IBet {
    name: string;
    email: string;
    price: number;
}

export interface IBetModel extends IBet, Document {}
