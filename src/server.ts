// import {BotController} from "./controller/BotController";
import {Properties} from "./Properties";
import {Router} from "./Router";
import {RedisRepository} from "./repositories/redis/RedisRepository";
import {TelebotRouter3} from "./TelebotRouter3";
import {ElasticUtils} from "./utils/ElasticUtils";
import {ElasticConfigurations} from "./repositories/configurations/elastic/ElasticConfigurations";
import {ConfigurationController} from "./controllers/ConfigurationController";
import {BotController} from "./controllers/BotController";
import {HandleController} from "./controllers/HandleController";
(async () => {
    Properties.initialize()
    ElasticConfigurations.initialize()

    await RedisRepository.initialize()

    new ConfigurationController();
    new BotController();
    new HandleController();

    TelebotRouter3.initialize()
    Router.initialize();
})()

process.on('uncaughtException', (err) => {
    console.log(err)
    ElasticUtils.putTemplate("error", {name:err.name,message: err.message,stack:err.stack},"error",true)
});