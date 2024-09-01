import {Router} from "../Router";
import {Request} from "express";
import {tokenDeploymentHandleType} from "../services/bot/bot-service";
import {HandleService} from "../services/HandleService";
import {AxiosRepository} from "../repositories/axios/AxiosRepository";
import {BotRepository} from "../repositories/BotRepository";

export class HandleController {
    private static axiosRepository:AxiosRepository = new AxiosRepository();
    private static botRepository:BotRepository = new BotRepository();

    private static service:HandleService = new HandleService(this.botRepository,this.axiosRepository)

    @Router.RequestMapping("handle/listen_deployments","post")
    async handleListenDeployments(req:Request){
        const payload:tokenDeploymentHandleType = req.body
        return HandleController.service.handleTokenDeployments(payload)
    }

    @Router.RequestMapping("handle/block_update","get")
    async handleBlockUpdate(req:Request) {
        return HandleController.service.handleBlockUpdate(req.query.userId as any,req.query.blockNumber as any)
    }

    @Router.RequestMapping("handle/pending","get")
    async handlePending(req:Request) {
        return HandleController.service.handlePending(req.query.userId as any,req.query.hash as any)
    }


}