import {TelegramServer} from "../TelegramServer";
import {MugetsoCommandSequenceFeedService} from "../../services/bot/MugetsoCommandSequenceFeedService";

export class TEst {
    private static service:MugetsoCommandSequenceFeedService;

    constructor(service:MugetsoCommandSequenceFeedService) {
        TEst.service = service;
    }

    @TelegramServer.ReceiveMessage(7069767637)
    test(messageId:number,message:string) {
        TEst.service.listenMessages(messageId.toString(),message)
    }

}