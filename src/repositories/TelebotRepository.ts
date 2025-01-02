import {MessageBuilder} from "../MessageBuilder";
import {TelebotServer} from "../controllers/TelebotServer";

export class  TelebotRepository {
    cacheMessage:{[reference:string]:{messageId:number, messageBuilder:MessageBuilder}} = {}

    sendMessage(userId:number,message:MessageBuilder,reference:string){
        this.cacheMessage[reference] = {messageId:0, messageBuilder:message}

        TelebotServer.client.sendMessage(userId, message.getMessage(), {
            parseMode: "MarkdownV2",
            webPreview: false,
        }).then((message) => {
            this.cacheMessage[reference].messageId = message.message_id
        }).catch(console.log)
    }

    updateMessage(userId:number,message:MessageBuilder,reference:string){
        const currentMessage = this.cacheMessage[reference].messageBuilder.getMessage();
        const newMessage = message.getMessage();

        if(currentMessage === newMessage) return false

        TelebotServer.client.editMessageText({chatId:userId,messageId:this.cacheMessage[reference].messageId,}, message.getMessage(), {
            parseMode: "MarkdownV2",
            webPreview: false,
        } as any).then((message) => {
            this.cacheMessage[reference].messageBuilder = message
        }).catch(console.log)
    }

}