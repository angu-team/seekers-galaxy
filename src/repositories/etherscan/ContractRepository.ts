import {AxiosClient} from "../../AxiosClient";

interface IResponse {
    status:string,
    message:string,
    result:string | any[],
}

export class ContractRepository {
    private readonly etherscanUrl = 'https://api.etherscan.io/api?module=contract&action=getabi&address=';

    getAbi(address: string):Promise<IResponse> {
        const key = "GRUWG9C4TQCE4VY4PJRJUSKQR9SWAH73E2"

        const url = `${this.etherscanUrl}&action=getabi&address=${address}&apikey=${key}`;
        return AxiosClient.make(url,{},{},{},"get");
    }

    getSourceCode(address: string):Promise<IResponse> {
        const key = "GRUWG9C4TQCE4VY4PJRJUSKQR9SWAH73E2"

        const url = `${this.etherscanUrl}&action=getsourcecode&address=${address}&apikey=${key}`;
        return AxiosClient.make(url,{},{},{},"get");
    }

}