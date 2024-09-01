import dotenv from "dotenv"

export class Properties {
    public static server: Partial<{ port: number, host: string, identifier: string }> = {}
    public static redisUrl: string;
    public static andromeda: Partial<{ host: string }> = {}
    public static ottobot:Partial<{ chatId: number, user: string }> = {}
    public static telebotToken: string;
    public static elasticUrl:string;
    public static envFile:string = ""

    public static initialize() {
        Properties.envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
        dotenv.config({ path: this.envFile });

        Properties.server.host = this.validateAndGetFieldElseThrow("SERVER_HOST")
        Properties.server.port = Number(this.validateAndGetFieldElseThrow("SERVER_PORT"))
        Properties.server.identifier = this.validateAndGetFieldElseThrow("SERVER_IDENTIFIER")

        Properties.redisUrl = this.validateAndGetFieldElseThrow("REDIS_URL")
        Properties.elasticUrl = this.validateAndGetFieldElseThrow("ELASTICSEARCH_URL")

        Properties.andromeda.host = this.validateAndGetFieldElseThrow("ANDROMEDA_HOST")
        Properties.telebotToken = this.validateAndGetFieldElseThrow("TELEBOT_TOKEN")
    }

    private static validateAndGetFieldElseThrow(field: string) {
        return process.env[field] || (() => {
            throw new Error(`${field} ENVIRONMENT MISSING VALUE`)
        })()
    }


}