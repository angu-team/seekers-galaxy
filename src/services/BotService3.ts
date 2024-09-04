import {AxiosRepository} from "../repositories/axios/AxiosRepository";
import {BotRepository} from "../repositories/BotRepository";

export class BotService {

    constructor(private axiosRepository:AxiosRepository,private repository:BotRepository) {}

    public async start(userId: number) {}

    public async ping(userId:number,loadingMessageId:number) {
        this.repository.setLastPingMessage(loadingMessageId)
        return await this.axiosRepository.pingRequest(userId)
    }

}