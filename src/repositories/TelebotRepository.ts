import {TelebotRouter3} from "../TelebotRouter3";

export class  TelebotRepository {
    cacheMessage:{[reference:string]:{messageId:number, messageText:string}} = {}

    async sendMessage(userId:number,message:string,reference:string){

        return TelebotRouter3.client.sendMessage(userId, message, {
            parseMode: "MarkdownV2",
            webPreview: false,
        }).then((message) => {
            this.cacheMessage[reference].messageId = message.message_id
            this.cacheMessage[reference].messageText = message
        }).catch(console.log)
    }

    async updateMessage(userId:number,message:string,reference:string){
        if(this.cacheMessage[reference].messageText == message) return false

        return TelebotRouter3.client.editMessageText({chatId:userId,messageId:this.cacheMessage[reference].messageId,}, message, {
            parseMode: "MarkdownV2",
            webPreview: false,
        } as any).then((message) => {
            this.cacheMessage[reference].messageText = message
        }).catch(console.log)
    }

}