import {AxiosClient} from "../../AxiosClient";


export class EthersRepository {
    private readonly endpoint = "ethers/"
    callFunctionsCache:{[address:string]:any} = {}
    constructor(private andromedaUrl: string) {}

    applyRpc(userId:number,provider:string):Promise<null> {
        const url = `${this.andromedaUrl}${this.endpoint}${userId}/apply_rpc`;
        return AxiosClient.make(url,{},{},{endpoint:provider},'post')
    }

    listenDeployErc20(userId:number,server_host:string):Promise<null> {
        const webhook_endpoint = "listen_deploy_erc20"

        const url = `${this.andromedaUrl}${this.endpoint}${userId}/${webhook_endpoint}`;
        const webhook = `${server_host}${this.endpoint}${webhook_endpoint}`;

        return AxiosClient.make(url,{},{},{webhook},'post')
    }

    listenContractEvents(userId:number,server_host:string,address:string,event_signature:string):Promise<null> {
        const webhook_endpoint = "listen_contract_events"

        const url = `${this.andromedaUrl}${this.endpoint}${userId}/${webhook_endpoint}`;
        const webhook = `${server_host}${this.endpoint}${webhook_endpoint}`;

        return AxiosClient.make(url,{},{},{webhook,address,event_signature},'post')
    }

    async callFunctions(userId:number,address:string,functions_name:string[],abi:string,useCache?:boolean):Promise<object> {
        const url = `${this.andromedaUrl}${this.endpoint}${userId}/call_functions`;

        if(useCache){
            this.callFunctionsCache[address] ??= await AxiosClient.make(url,{},{},{address,functions_name,abi},'post')
            return this.callFunctionsCache[address]
        }

        return AxiosClient.make(url,{},{},{address,functions_name,abi},'post')
    }

}