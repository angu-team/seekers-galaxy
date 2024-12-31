import {AxiosClient} from "../../AxiosClient";


export class EthersRepository {
    private readonly endpoint = "ethers/"

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

}