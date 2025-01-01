import {EthersRepository} from "../../repositories/andromeda/EthersRepository";
import {Server} from "../Server";
import {Request} from "express";
import {Service} from "../../../bot/Service";

export class EthersWebhook {
    botService = new Service();


    @Server.RequestMapping("ethers/listen_deploy_erc20","post")
    listenDeployErc20Webhook(request:Request) {

    }

    @Server.RequestMapping("ethers/listen_contract_events","post")
    listenContractEventsWebhook(request:Request) {
        console.log(request.body);
    }

}