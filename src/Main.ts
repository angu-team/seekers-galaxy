import {EthersRepository} from "./repositories/andromeda/EthersRepository";
import dotenv from "dotenv"
import {EthersController} from "./controllers/andromeda/EthersController";
import {TelebotRouter3} from "./TelebotRouter3";
dotenv.config()

const ethersRepository = new EthersRepository(process.env.ANDROMEDA_URL!);

(() => {
    new EthersController(ethersRepository);

    TelebotRouter3.initialize(process.env.TELEBOT_TOKEN!)
})()