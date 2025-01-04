import {TelebotServer} from "../TelebotServer";
import {MugetsoCommandSequenceFeedService} from "../../services/bot/MugetsoCommandSequenceFeedService";
import {parseInput} from "./TestDTO";

export class FeedTest {
    private static commandSequenceFeedService:MugetsoCommandSequenceFeedService;

    constructor(
        commandSequenceFeedService:MugetsoCommandSequenceFeedService) {
        FeedTest.commandSequenceFeedService = commandSequenceFeedService;
    }

    @TelebotServer.ReceiveMessage(/^\/(site|token|twitter)\s+(.+)$/g, "pattern")
    public static async feed(chatId: number, command: string, args: string, nameOrChat: string, messageId: number, text: string) {
        const dto = parseInput(args)
        const message = await FeedTest.commandSequenceFeedService.sendCommands(dto)
        return {message}
    }
}