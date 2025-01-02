import {AxiosClient} from "../../AxiosClient";

interface IResponse {
    status:string,
    message:string,
    result:string | any[],
}

export class ContractRepository {
    sourceCodeCache:{[address:string]:IResponse} = {};
    abiCache:{[address:string]:IResponse} = {};

    private readonly etherscanUrl = 'https://api.basescan.io/api?module=contract'

    async getAbi(address: string):Promise<IResponse> {
        const key = "M4X5S8W419727AVR1BTG468ZEJQZQN93SH"

        const url = `${this.etherscanUrl}&action=getabi&address=${address}&apikey=${key}`;
        this.abiCache[address] ??= await AxiosClient.make(url,{},{},{},"get");

        return this.abiCache[address];
    }

    async getSourceCode(address: string):Promise<IResponse> {
        const key = "M4X5S8W419727AVR1BTG468ZEJQZQN93SH"

        const url = `${this.etherscanUrl}&action=getsourcecode&address=${address}&apikey=${key}`;
        this.sourceCodeCache[address] ??= await AxiosClient.make(url, {}, {}, {}, "get");

        return this.sourceCodeCache[address]
    }

}