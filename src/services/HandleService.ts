import {tokenDeploymentHandleType, tokenDeploymentType} from "./bot/bot-service";
import {PingResponse} from "../controllers/response/PingResponse";
import {TelebotRouter3} from "../TelebotRouter3";
import {AxiosRepository} from "../repositories/axios/AxiosRepository";
import {MessageBuilder} from "../MessageBuilder";
import {ElasticUtils} from "../utils/ElasticUtils";
import {BotRepository} from "../repositories/BotRepository";

export class HandleService {

    constructor(private botRepository:BotRepository,private axiosRepository:AxiosRepository){}

    public async handlePending(userId: number, hash: string) {}

    public async handleTokenDeployments(payload: tokenDeploymentHandleType) {}

    public async handlePendingTokenDeployments(payload: tokenDeploymentHandleType) {}

    public async handleBlockUpdate(userId: number, blockNumber: number) {
        if(this.botRepository.getLastPingMessage() == 0) return;

        const ping = await this.axiosRepository.pingRequest(userId)
        const message = PingResponse(ping)
        TelebotRouter3.client.editMessageText({chatId:userId,messageId:this.botRepository.getLastPingMessage()},message,{parseMode:"markdown"})
    }

    private sendNotification(userId: number, message: MessageBuilder, tokenAddress: string) {

        TelebotRouter3.client.sendMessage(userId, message.getMessage(), {
            parseMode: "markdown",
            webPreview: false,
        }).catch((e) => {
            ElasticUtils.putTemplate("logs",{message:e}, "error",true)
        })
    }

    private buildMessage(networkName: string, blockNumber: number, gwei: any, gasUsed: any, token: tokenDeploymentType, label: string) {
        const message = new MessageBuilder();
        message.setHeader({chain: `${networkName.toUpperCase()}`});
        message.setHeader({block: {blockNumber: blockNumber, gwei, gasUsed}});
        message.setHeader({token});
        message.setMiddle({tokenAddress: token.contractAddress, caller: label});
        return message;
    }

}