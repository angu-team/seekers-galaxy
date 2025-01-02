import {TelebotServer} from "../TelebotServer";
import {MugetsoCommandSequenceFeedService} from "../../services/bot/MugetsoCommandSequenceFeedService";

export class FeedTest {
    private static commandSequenceFeedService:MugetsoCommandSequenceFeedService;

    constructor(
        commandSequenceFeedService:MugetsoCommandSequenceFeedService) {
        FeedTest.commandSequenceFeedService = commandSequenceFeedService;
    }

    @TelebotServer.ReceiveMessage("feed", "literal")
    public static async feed(chatId: number, command: string, args: string, nameOrChat: string, messageId: number, text: string) {
        FeedTest.commandSequenceFeedService.exec(93372553)
        // return {message: "Feed"}
    }
}