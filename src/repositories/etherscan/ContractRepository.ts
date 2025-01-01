import {AxiosClient} from "../../AxiosClient";

interface IResponse {
    status:string,
    message:string,
    result:string | any[],
}

export class ContractRepository {
    sourceCodeCache:{[address:string]:IResponse} = {};
    abiCache:{[address:string]:IResponse} = {};

    private readonly etherscanUrl = 'https://api.etherscan.io/api?module=contract&action=getabi&address=';

    async getAbi(address: string):Promise<IResponse> {
        const key = "GRUWG9C4TQCE4VY4PJRJUSKQR9SWAH73E2"

        const url = `${this.etherscanUrl}&action=getabi&address=${address}&apikey=${key}`;
        this.abiCache[address] ??= await AxiosClient.make(url,{},{},{},"get");

        return this.abiCache[address];
    }

    async getSourceCode(address: string):Promise<IResponse> {
        const key = "GRUWG9C4TQCE4VY4PJRJUSKQR9SWAH73E2"

        const url = `${this.etherscanUrl}&action=getsourcecode&address=${address}&apikey=${key}`;
        this.sourceCodeCache[address] ??= await AxiosClient.make(url, {}, {}, {}, "get");

        return this.sourceCodeCache[address]
    }

}