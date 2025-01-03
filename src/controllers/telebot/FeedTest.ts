import {TelebotServer} from "../TelebotServer";
import {MugetsoCommandSequenceFeedService} from "../../services/bot/MugetsoCommandSequenceFeedService";

export class FeedTest {
    private static commandSequenceFeedService:MugetsoCommandSequenceFeedService;

    constructor(
        commandSequenceFeedService:MugetsoCommandSequenceFeedService) {
        FeedTest.commandSequenceFeedService = commandSequenceFeedService;
    }

    @TelebotServer.ReceiveMessage(/^\/(site|coin|twitter)\s+(.+)$/g, "pattern")
    public static async feed(chatId: number, command: string, args: string, nameOrChat: string, messageId: number, text: string) {
        return FeedTest.commandSequenceFeedService.sendCommands(command,args)
        // return {message: "Feed"}
    }
}