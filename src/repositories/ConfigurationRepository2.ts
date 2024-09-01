import {RedisRepository} from "./redis/RedisRepository";
import {labelType} from "./redis/redis-repository";
import {ElasticUtils} from "../utils/ElasticUtils";

export class ConfigurationRepository2 {
    private redis:RedisRepository = new RedisRepository();
}