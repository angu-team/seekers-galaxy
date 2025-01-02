import {TelegramClient} from "telegram";
import * as readline from "node:readline";
import {StoreSession} from "telegram/sessions";
import {NewMessage, NewMessageEvent} from "telegram/events";
import {StringUtils} from "../utils/StringUtils";

interface IInitialize {
    apiId:number;
    apiHash:string;
}

export class TelegramServer {
    private static literalRoutes: { [chatId: string]: { method: any, functionName: string } } = {}
    public static client:TelegramClient;

    public static async initialize(params:IInitialize) {
        const session = new StoreSession("telegram_sessions");

        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        this.client = new TelegramClient(
            session, params.apiId, params.apiHash, {
            connectionRetries:5
        })

        console.info("[Telegram] Inicializando o cliente...");

        if (session.authKey && session.authKey.getKey()) {
            console.log("[Telegram] Sessão existente encontrada. Tentando conectar...");
            await this.client.connect();
        } else {
            console.log("[Telegram] Nenhuma sessão encontrada. Iniciando autenticação...");
            await this.client.start({
                phoneNumber: async () =>
                    new Promise((resolve) =>
                        rl.question("Please enter your number: ", resolve)
                    ),
                password: async () =>
                    new Promise((resolve) =>
                        rl.question("Please enter your password: ", resolve)
                    ),
                phoneCode: async () =>
                    new Promise((resolve) =>
                        rl.question("Please enter the code you received: ", resolve)
                    ),
                onError: (err) => console.log(err),
            });

            this.client.session.save()
        }

        if (this.client.connected) {
            console.log("[Telegram] Você está conectado!");
        }

        this.client.addEventHandler(this.ListenMessages, new NewMessage({}))
    }

    public static async ListenMessages(event:NewMessageEvent) {
        const originalMethod = TelegramServer.literalRoutes[event.chatId!.toString()]

        if (originalMethod) {
            try {
                await originalMethod.method.call(null, event.message.message)
            } catch (e) {
                console.log(e)
            }
        }

    }

    public static ReceiveMessage(chatId: number) {
        return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
            TelegramServer.literalRoutes[chatId] = {functionName:propertyKey, method: descriptor.value}
        }
    }

}