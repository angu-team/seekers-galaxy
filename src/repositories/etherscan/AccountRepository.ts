import {AxiosClient} from "../../AxiosClient";

interface IParams {
    sort?:string,
    page?:number,
    offset?:number,
    startblock?:number,
    endblock?:number,
}

export class AccountRepository {
    etherscanUrl = 'https://api.etherscan.io/api?module=account';
    private readonly key: string = ""

    txList(address:string,params?:IParams){
        const url = `${this.etherscanUrl}&action=txlist&address=${address}&apikey=${this.key}`;
        return AxiosClient.make(url,{},params,{},"get");
    }
}