import {TelegramServer} from "../TelegramServer";

export class TEst {

    @TelegramServer.ReceiveMessage(93372553)
    test(message:string) {
        console.log(message);
    }

}