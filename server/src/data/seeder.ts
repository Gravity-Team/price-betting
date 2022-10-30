import { config } from "dotenv";
import { connectDB } from "../utils/connectDB";
import { Bet } from "../models/Bet";
import { bets } from "./bets";

config();
(async () => {
  await connectDB(process.env.MONGO_URL || "");
})();

const importData = async () => {
  try {
    await Bet.deleteMany();

    await Bet.insertMany(bets);

    console.log("Data Imported!");
    process.exit();
  } catch (err) {
    console.log(`${err}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Bet.deleteMany();

    console.log("Data Destroyed!");
    process.exit();
  } catch (err) {
    console.log(`${err}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
