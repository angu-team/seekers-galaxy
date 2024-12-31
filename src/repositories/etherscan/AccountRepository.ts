import {AxiosClient} from "../../AxiosClient";

interface IParams {
    sort?:string,
    page?:number,
    offset?:number,
    startblock?:number,
    endblock?:number,
}

export class AccountRepository {
    private readonly etherscanUrl = 'https://api.etherscan.io/api?module=account';
    private readonly key: string = "F36Y8METRRFWU3REXXH9DRQTN5NP7QCZVC"
    // private readonly key: string = "FWXRC5621W9VFQ5VJAJ5NQ5547GHUAH913"
    // private readonly key: string = "GRUWG9C4TQCE4VY4PJRJUSKQR9SWAH73E2"

    txList(address:string,params?:IParams){
        const url = `${this.etherscanUrl}&action=txlist&address=${address}&apikey=${this.key}`;
        return AxiosClient.make(url,{},params,{},"get");
    }
}