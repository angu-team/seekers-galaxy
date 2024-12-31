import {EthersRepository} from "./repositories/andromeda/EthersRepository";
import dotenv from "dotenv"
import {EthersController} from "./controllers/andromeda/ethers/EthersController";
import {TelebotRouter3} from "./TelebotRouter3";
import {Router} from "./Router";
import {AxiosClient} from "./AxiosClient";
import {EthersWebhook} from "./controllers/andromeda/ethers/EthersWebhook";
import {ElasticRepository} from "./repositories/andromeda/ElasticRepository";
import {ElasticController} from "./controllers/andromeda/ElasticController";
import {EtherscanController} from "./controllers/andromeda/EtherscanController";
import {AccountRepository} from "./repositories/etherscan/AccountRepository";
dotenv.config()

const ethersRepository = new EthersRepository(process.env.ANDROMEDA_URL!);
const elasticRepository = new ElasticRepository(process.env.ANDROMEDA_URL!);
const accountRepository = new AccountRepository();

(() => {
    AxiosClient.initLogger();

    new EthersController(ethersRepository);
    new EthersWebhook(ethersRepository);

    new ElasticController(elasticRepository);
    new EtherscanController(accountRepository);

    TelebotRouter3.initialize(process.env.TELEBOT_TOKEN!)
    Router.initialize()
})()