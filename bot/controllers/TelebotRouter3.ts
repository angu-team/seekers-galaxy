import telebot from "telebot";
import {StringUtils} from "../../src/utils/StringUtils";

type UserMessage = {
    text: any,
    from: {
        id: any;
        first_name: string;
    },
    sender_chat: { id: number, title: string }
    chat: { id: any }
    message_id: any;
    message:any;
}

export class TelebotRouter3 {
    private static literalRoutes: { [funcName: string]: { method: any, message: string | RegExp } } = {}
    private static patternRoutes: { [funcName: string]: { method: any, message: string | RegExp } } = {}
    private static bodyReg = /^\/(\w+)(?:\s+((?:\S+\s+)*\S+))?$/gm;
    public static client: telebot;

    public static initialize(token:string) {

        this.client = new telebot({
            token,
            polling: {
                retryTimeout: 5000, // Optional. Reconnecting timeout (in ms).
            },
        });

        TelebotRouter3.client.start()

        TelebotRouter3.ListenMessages()
        TelebotRouter3.ListenButtons()

    }

    public static ListenButtons() {
        TelebotRouter3.client.on(`callbackQuery`, async (msg: UserMessage & { data: string }, props: any) => {
            const originalMethod = TelebotRouter3.findMethod("/" + msg.data)
            // console.log(originalMethod.command)
            if (originalMethod.method) {

                try {
                    await originalMethod.method.call(null, msg.message?.chat ? msg.message?.chat.id : msg.from.id, originalMethod.command, originalMethod.args)
                } catch (e) {
                    console.log(e)
                }

            }
        })
    }

    public static ReceiveMessage(message: string | RegExp, mode: "literal" | "pattern") {
        return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {

            switch (mode) {
                case "literal":
                    TelebotRouter3.literalRoutes[propertyKey] = {message, method: descriptor.value}
                    break;
                case "pattern":
                    TelebotRouter3.patternRoutes[propertyKey] = {message, method: descriptor.value}
                    break
            }

        }
    }

    private static ListenMessages() {
        const helpButtons = this.client.keyboard([
            ["/config","/restart","/commands"],
        ], {resize: true, one_time_keyboard: false});

        TelebotRouter3.client.on(`/init`, async (msg: UserMessage, props: any) => {
            const loading_message = await TelebotRouter3.client.sendMessage(
                msg.chat.id, "👍🏻🫡", {replyToMessage: msg.message_id,replyMarkup:helpButtons}
            ).catch((e) => {
                throw e;
            });

        })

        TelebotRouter3.client.on(`text`, async (msg: UserMessage, props: any) => {

            const originalMethod = TelebotRouter3.findMethod(msg.text)
            if (originalMethod.method) {
                let response: any = {};

                const loading_message = await TelebotRouter3.client.sendMessage(
                    msg.chat.id, "Aguarde ...", {replyToMessage: msg.message_id}
                ).catch((e) => {
                    throw e;
                });
                const nameOrChat = msg.from ? msg.from.first_name : msg.sender_chat.title
                try {
                    response = await originalMethod.method.call(null, msg.chat.id, originalMethod.command, originalMethod.args, nameOrChat, loading_message.message_id, msg.text)
                } catch (e) {
                    response.message = StringUtils.escapeMarkdown(String(e));
                }

                if(response?.message){
                    await TelebotRouter3.senderMessageControl(response.message, msg.text, msg.chat.id, {
                        chatId: loading_message.chat.id,
                        messageId: loading_message.message_id
                    })
                    return response;
                }

                await TelebotRouter3.client.editMessageText({
                        chatId: loading_message.chat.id,
                        messageId: loading_message.message_id,
                    },
                    "Done",
                )

            }

        })
    }

    private static findMethod(text: string) {
        const literalRouteNames = Object.keys(TelebotRouter3.literalRoutes)
        const patternRouteNames = Object.keys(TelebotRouter3.patternRoutes)
        let targetMethod: { method: any, command: string, args: string } = {args: "", command: "", method: null}
        literalRouteNames.find(routeName => {
            const message = TelebotRouter3.literalRoutes[routeName].message as string;
            const match = [...text.matchAll(TelebotRouter3.bodyReg)];

            if (match.length > 0) {
                const [, command, args] = [...text.matchAll(TelebotRouter3.bodyReg)][0];
                if (command === message) {
                    targetMethod = {method: TelebotRouter3.literalRoutes[routeName].method, args, command}
                }
            }

        })

        if (targetMethod.method) return targetMethod;
        patternRouteNames.find(routeName => {
            const message = TelebotRouter3.patternRoutes[routeName].message as RegExp

            if (text.match(message)) {
                // @ts-ignore
                const [, command, args] = [...text.matchAll(message)][0];
                targetMethod = {method: TelebotRouter3.patternRoutes[routeName].method, args, command}
            }

        })

        return targetMethod;
    }

    private static async senderMessageControl(messageResponse: string, messageReceived: string, chatId: number, loadingMessage: {
        chatId: number,
        messageId: number
    }) {

        if (messageResponse.length > 4096) {
            await TelebotRouter3.client.deleteMessage(loadingMessage.chatId, loadingMessage.messageId).catch((e) => {
                throw e;
            })

            for (let i = 0; i < messageResponse.length; i += 4096) {
                const chunk = messageResponse.slice(i, i + 4096);
                TelebotRouter3.client.sendMessage(loadingMessage.chatId, chunk, {
                    parseMode: "Markdown",
                    webPreview: false
                }).catch((e) => {
                    throw e;
                })
            }
        } else {
            TelebotRouter3.client.editMessageText({
                    chatId: loadingMessage.chatId,
                    messageId: loadingMessage.messageId,
                },
                messageResponse,
                {parseMode: "Markdown", webPreview: false} as any
            ).catch((e) => {
                console.log(e)
                throw e;
            })
        }

    }

}