// import {BotService2} from "../services/bot/BotService2";
import {ApplyRpcDTO} from "./dto/ApplyRpcDTO";
// import {TelebotRouter} from "../TelebotRouter";
import {TelebotRouter3} from "../TelebotRouter3";
import {PingResponse} from "./response/PingResponse";
import {BotService} from "../services/BotService3";
import {BotRepository} from "../repositories/BotRepository";
import {AxiosRepository} from "../repositories/axios/AxiosRepository";


export class BotController {
    private static repository = new BotRepository();
    private static axiosRepository = new AxiosRepository();

    private static service = new BotService(this.axiosRepository,this.repository);

    @TelebotRouter3.ReceiveMessage("applyRpc","literal")
    async createInstance(userId: number,command:string, args: string){
        const {endpoint} = ApplyRpcDTO(args)
        await BotController.axiosRepository.createInstance(userId,endpoint)
        return {message:"Done"}
    }

    @TelebotRouter3.ReceiveMessage("updateRpc","literal")
    async updateInstance(userId: number,command:string, args: string){
        const {endpoint} = ApplyRpcDTO(args)
        await BotController.axiosRepository.updateInstance(userId,endpoint)
        return {message:"Done"}
    }

    @TelebotRouter3.ReceiveMessage("start","literal")
    async start(userId: number,command:string, args: string){
        await BotController.service.start(userId);
        return {message:"Done"}
    }

    @TelebotRouter3.ReceiveMessage("ping","literal")
    async ping(userId:number,command:string,args: string,first_name:string,loading_message_id:number) {
        const serviceResponse:{ms:number,block:number,syncing:boolean,endpoint:string}[] = await BotController.service.ping(userId,loading_message_id)
        const message = PingResponse(serviceResponse)
        return {message}
    }
}