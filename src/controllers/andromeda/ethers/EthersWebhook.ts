import {Router} from "../../../Router";
import {Request} from "express";
import {ListenDeployErc20Handler} from "../../../services/bot/handlers/ListenDeployErc20Handler";

export class EthersWebhook {
    private static listenDeployErc20Webhook:ListenDeployErc20Handler;

    constructor(listenDeployErc20Webhook:ListenDeployErc20Handler) {
        EthersWebhook.listenDeployErc20Webhook = listenDeployErc20Webhook;
    }

    @Router.RequestMapping("ethers/listen_deploy_erc20","post")
    listenDeployErc20Webhook(request:Request) {
        EthersWebhook.listenDeployErc20Webhook.handle(797182203,request.body)
    }

    @Router.RequestMapping("ethers/listen_contract_events","post")
    listenContractEventsWebhook(request:Request) {
        console.log(request.body);
    }

}