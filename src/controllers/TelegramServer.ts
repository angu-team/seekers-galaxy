import {TelegramClient} from "telegram";
import * as readline from "node:readline";
import {StoreSession, StringSession} from "telegram/sessions";
import {NewMessage, NewMessageEvent} from "telegram/events";
import {StringUtils} from "../utils/StringUtils";

interface IInitialize {
    apiId: number;
    apiHash: string;
    session: string
}

export class TelegramServer {
    private static literalRoutes: { [chatId: string]: { method: any, functionName: string } } = {}
    public static client: TelegramClient;

    public static async initialize(params: IInitialize) {
        const stringSession = new StringSession(params.session); // fill this later with the value from session.save()

        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        this.client = new TelegramClient(
            stringSession, params.apiId, params.apiHash, {
                connectionRetries: 5
            })

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


        console.log(this.client.session.save());
        this.client.addEventHandler(this.ListenMessages, new NewMessage({}))
    }

    public static async ListenMessages(event: NewMessageEvent) {
        const originalMethod = TelegramServer.literalRoutes[event.chatId!.toString()]

        if (originalMethod) {
            try {
                await originalMethod.method.call(null, event.message.id,event.message.message)
            } catch (e) {
                console.log(e)
            }
        }

    }

    public static ReceiveMessage(chatId: number) {
        return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
            TelegramServer.literalRoutes[chatId] = {functionName: propertyKey, method: descriptor.value}
        }
    }

}