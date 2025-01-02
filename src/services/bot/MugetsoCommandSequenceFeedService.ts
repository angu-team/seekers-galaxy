import {TelegramServer} from "../../controllers/TelegramServer";

export class MugetsoCommandSequenceFeedService {
    sequence = [
        "/mybots",
        "/mygames"
    ]
    chatUser = "BotFather"
    responseCommandId :any = {}

    async sendCommands(){
        for (const command of this.sequence) {
            const sentCommand = await TelegramServer.client.sendMessage(this.chatUser,{message:command});
            this.responseCommandId[command] = sentCommand.id + 1 ;

            await new Promise(resolve => setTimeout(resolve, 1000));
        }

    }

    listen(messageId:number){

    }

}