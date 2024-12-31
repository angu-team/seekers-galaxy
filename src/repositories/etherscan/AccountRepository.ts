import {AxiosClient} from "../../AxiosClient";

interface IParams {
    sort?:string,
    page?:number,
    offset?:number,
    startblock?:number,
    endblock?:number,
}

interface IResponse {
    status:string,
    message:string,
    result:any[],
}

export class AccountRepository {
    private readonly etherscanUrl = 'https://api.etherscan.io/api?module=account';
    // private readonly key: string = "GRUWG9C4TQCE4VY4PJRJUSKQR9SWAH73E2"

    txList(address:string,params?:IParams):Promise<IResponse>{
        const key = "F36Y8METRRFWU3REXXH9DRQTN5NP7QCZVC"

        const url = `${this.etherscanUrl}&action=txlist&address=${address}&apikey=${key}`;
        return AxiosClient.make(url,{},params,{},"get");
    }

    balanceMulti(addresses:string[],params?:IParams):Promise<IResponse>{
        const key = "FWXRC5621W9VFQ5VJAJ5NQ5547GHUAH913"
        const joinedAddresses = addresses.join(",");

        const url = `${this.etherscanUrl}&action=balancemulti&address=${joinedAddresses}&apikey=${key}`;
        return AxiosClient.make(url,{},params,{},"get");
    }

}