import {EthersRepository} from "./repositories/andromeda/EthersRepository";
import dotenv from "dotenv"
import {EthersController} from "./controllers/andromeda/EthersController";
import {TelebotRouter3} from "./TelebotRouter3";
import {Router} from "./Router";
import {AxiosClient} from "./AxiosClient";
dotenv.config()

const ethersRepository = new EthersRepository(process.env.ANDROMEDA_URL!);

(() => {
    AxiosClient.initLogger();

    new EthersController(ethersRepository);

    TelebotRouter3.initialize(process.env.TELEBOT_TOKEN!)
    Router.initialize(process.env.SERVER_PORT!)
})()