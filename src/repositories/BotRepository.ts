export class BotRepository {
    private static lastPingMessage = 0;

    getLastPingMessage(){
        return BotRepository.lastPingMessage
    }

    setLastPingMessage(messageId:number){
        BotRepository.lastPingMessage = messageId
    }

}