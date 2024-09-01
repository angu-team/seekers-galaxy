import {createClient, RedisClientType} from "redis";
import {Properties} from "../../Properties";
import {
    configsType,
    ConfigFieldsType, ConfigUsersType, ConfigType
} from "./redis-repository";
import {ElasticUtils} from "../../utils/ElasticUtils";

export class RedisRepository {
    private static client: RedisClientType<any, any, any>

    public static async initialize() {

        this.client = await createClient({url: Properties.redisUrl,}).on('error', (err: string) => {
                ElasticUtils.putTemplate("logs",{message:err}, "error",true)
                console.log('Redis Client Error', err)
                throw err;
            }
        ).connect();

        const configurations = await RedisRepository.client.get(Properties.server.identifier as string)

        if (!configurations) {
            await RedisRepository.client.set(Properties.server.identifier as string, JSON.stringify({deploy_label_tracker: {}}))
        }
    }

    public async getConfig(userId: number) {
        const configurations = await RedisRepository.client.get(Properties.server.identifier as string)
        if (!configurations) return;

        const parseConfig: ConfigType = JSON.parse(configurations)
        return parseConfig.deploy_label_tracker[userId]
    }

    public async saveConfig(userId: number, configName: ConfigFieldsType, configObject: configsType) {
        const configurations = await RedisRepository.client.get(Properties.server.identifier as string)
        if (!configurations) return;

        const parseConfig: ConfigType = JSON.parse(configurations)

        if (!parseConfig.deploy_label_tracker[userId]) {
            parseConfig.deploy_label_tracker[userId] = {}
        }

        parseConfig.deploy_label_tracker[userId][configName] = configObject[configName];

        await RedisRepository.client.set(Properties.server.identifier as string, JSON.stringify(parseConfig))
        ElasticUtils.putTemplate("logs",{message:`Redis save content on "${configName}" to ${userId}`},"info",true)
    }


}