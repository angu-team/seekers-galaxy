import {ExpressServer} from "../../ExpressServer";
import {Request} from "express";
import {ListenDeployErc20Handler} from "../../../services/bot/handlers/ListenDeployErc20Handler";
import {ListenContractEventsHandler} from "../../../services/bot/handlers/ListenContractEventsHandler";

export class EthersWebhook {
    private static listenDeployErc20Webhook:ListenDeployErc20Handler;
    private static listenContractEventsWebhook:ListenContractEventsHandler;

    constructor(listenDeployErc20Webhook:ListenDeployErc20Handler,listenContractEventsWebhook:ListenContractEventsHandler) {
        EthersWebhook.listenDeployErc20Webhook = listenDeployErc20Webhook;
        EthersWebhook.listenContractEventsWebhook = listenContractEventsWebhook
    }

    @ExpressServer.RequestMapping("ethers/listen_deploy_erc20","post")
    listenDeployErc20Webhook(request:Request) {
        EthersWebhook.listenDeployErc20Webhook.handle(797182203,request.body)
    }

    @ExpressServer.RequestMapping("ethers/listen_contract_events","post")
    listenContractEventsWebhook(request:Request) {
        EthersWebhook.listenContractEventsWebhook.handle(request.body)
    }

}