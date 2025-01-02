import {EthersRepository} from "./repositories/andromeda/EthersRepository";
import dotenv from "dotenv"
import {EthersController} from "./controllers/telebot/andromeda/EthersController";
import {TelebotServer} from "./controllers/TelebotServer";
import {ExpressServer} from "./controllers/ExpressServer";
import {AxiosClient} from "./AxiosClient";
import {EthersWebhook} from "./controllers/express/andromeda/EthersWebhook";
import {ElasticRepository} from "./repositories/andromeda/ElasticRepository";
import {ElasticController} from "./controllers/telebot/andromeda/ElasticController";
import {EtherscanController} from "./controllers/telebot/andromeda/EtherscanController";
import {AccountRepository} from "./repositories/etherscan/AccountRepository";
import {CallBasicInfoTokenService} from "./services/andromeda/ethers/CallBasicInfoTokenService";
import {FundedByService} from "./services/etherscan/FundedByService";
import {ListenDeployErc20Handler} from "./services/bot/handlers/ListenDeployErc20Handler";
import {TelebotRepository} from "./repositories/TelebotRepository";
import {TelegramServer} from "./controllers/TelegramServer";
import {TEst} from "./controllers/telegram/TEst";
import {MugetsoCommandSequenceFeedService} from "./services/bot/MugetsoCommandSequenceFeedService";
import {FeedTest} from "./controllers/telebot/FeedTest";

dotenv.config()

const ethersRepository = new EthersRepository(process.env.ANDROMEDA_URL!);
const elasticRepository = new ElasticRepository(process.env.ANDROMEDA_URL!);
const accountRepository = new AccountRepository();
const telebotRepository = new TelebotRepository();

const callBasicInfoTokenService = new CallBasicInfoTokenService(ethersRepository);
const fundedByService = new FundedByService(accountRepository);

// const listenDeployErc20Handler = new ListenDeployErc20Handler(callBasicInfoTokenService,fundedByService,elasticRepository,ethersRepository,telebotRepository);
const service = new MugetsoCommandSequenceFeedService();
(async () => {
    new TEst();
    new FeedTest(service);

    await TelegramServer.initialize({
        apiHash:"eb768636de3838117502e23c5dcc1edc",
        apiId:18902709,
        session:process.env.TELEGRAM_SESSION || ""
    })

    // AxiosClient.initLogger();
    //
    // // await ethersRepository.applyRpc(797182203,"ws://168.119.138.20:38546")
    // await ethersRepository.applyRpc(797182203,"ws://49.12.84.33:8546")
    // await ethersRepository.listenDeployErc20(797182203,"http://localhost:8081/");
    //
    // new EthersController(ethersRepository);
    // new EthersWebhook(listenDeployErc20Handler);
    //
    // new ElasticController(elasticRepository);
    // new EtherscanController(accountRepository);
    //
    TelebotServer.initialize(process.env.TELEBOT_TOKEN!)
    // ExpressServer.initialize()
})()