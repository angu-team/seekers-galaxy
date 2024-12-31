import {AxiosClient} from "../../AxiosClient";


export class EthersRepository {
    private readonly uri;

    constructor(andromedaUrl: string) {
        this.uri = `${andromedaUrl}ethers/`;
    }

    applyRpc(userId:number,provider:string):Promise<null> {
        const endpoint = `${this.uri}${userId}/apply_rpc`;
        return AxiosClient.make(endpoint,{},{},{endpoint:provider},'post')
    }
}