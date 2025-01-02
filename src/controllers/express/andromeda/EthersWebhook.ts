import {EthersRepository} from "../../../repositories/andromeda/EthersRepository";
import {ExpressServer} from "../../ExpressServer";
import {Request} from "express";

export class EthersWebhook {
    private static repository:EthersRepository;

    constructor(repository:EthersRepository) {
        EthersWebhook.repository = repository;
    }

    @ExpressServer.RequestMapping("ethers/listen_deploy_erc20","post")
    listenDeployErc20Webhook(request:Request) {
        console.log(request.body);
    }

    @ExpressServer.RequestMapping("ethers/listen_contract_events","post")
    listenContractEventsWebhook(request:Request) {
        console.log(request.body);
    }

}