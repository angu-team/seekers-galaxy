import {Router} from "../Router";
import {Request} from "express";
import {AxiosRepository} from "../repositories/axios/AxiosRepository";
import {BotRepository} from "../repositories/BotRepository";
import {HandleService} from "../services/handle/HandleService";
import {
    handleLockv3Type,
    handleRemoveLiquidityType,
    handleTokenBurnType,
    handleTokenDeploymentType
} from "../services/handle/handle-service";

export class HandleController {
    private static axiosRepository:AxiosRepository = new AxiosRepository();
    private static botRepository:BotRepository = new BotRepository();

    private static service:HandleService = new HandleService(this.botRepository,this.axiosRepository)

    @Router.RequestMapping("handle/token_deployments","post")
    async handleListenDeployments(req:Request){
        const payload:handleTokenDeploymentType = req.body
        return HandleController.service.handleTokenDeployments(payload)
    }

    @Router.RequestMapping("handle/token_burn","post")
    async handleListenTokenBurn(req:Request){
        const payload:handleTokenBurnType = req.body
        return HandleController.service.handleTokenBurn(payload)
    }

    @Router.RequestMapping("handle/pending_token_deployments","post")
    async handleListenPendingDeployments(req:Request){
        const payload:handleTokenDeploymentType = req.body
        return HandleController.service.handlePendingTokenDeployments(payload)
    }

    @Router.RequestMapping("handle/uncx_lock","post")
    async handleListenLockv3(req:Request) {
        const payload:handleLockv3Type = req.body
        return HandleController.service.handleLockv3(payload)
    }

    @Router.RequestMapping("handle/block_update","get")
    async handleBlockUpdate(req:Request) {
        return HandleController.service.handleBlockUpdate(req.query.userId as any,req.query.blockNumber as any)
    }

    @Router.RequestMapping("handle/pending","get")
    async handlePending(req:Request) {
        return HandleController.service.handlePending(req.query.userId as any,req.query.hash as any)
    }

    @Router.RequestMapping("handle/remove_liquidity","post")
    async handleRemoveLiquidity(req:Request) {
        console.log(req,"uer")
        const payload:handleRemoveLiquidityType = req.body
        return HandleController.service.handleRemoveLiquidity(payload)
    }
}