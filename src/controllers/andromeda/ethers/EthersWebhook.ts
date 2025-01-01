import {EthersRepository} from "../../../repositories/andromeda/EthersRepository";
import {Router} from "../../../Router";
import {Request} from "express";

export class EthersWebhook {
    private static repository:EthersRepository;

    constructor(repository:EthersRepository) {
        EthersWebhook.repository = repository;
    }

    @Router.RequestMapping("ethers/listen_deploy_erc20","post")
    listenDeployErc20Webhook(request:Request) {
        console.log(request.body);
    }

    @Router.RequestMapping("ethers/listen_contract_events","post")
    listenContractEventsWebhook(request:Request) {
        console.log(request.body);
    }

}