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
    private readonly basescanUrl = 'https://api.basescan.io/api?module=account';

    txList(address:string,params?:IParams):Promise<IResponse>{
        const key = "IQWWI8UQT25ZJTV67VH2MAAVFK2R126P6A"

        const url = `${this.basescanUrl}&action=txlist&address=${address}&apikey=${key}`;
        return AxiosClient.make(url,{},params,{},"get");
    }

    balanceMulti(addresses:string[],params?:IParams):Promise<IResponse>{
        const key = "R7W6SJMDD6UE1X3IGDJRWFVYQ7IVDCZ59Q"
        const joinedAddresses = addresses.join(",");

        const url = `${this.basescanUrl}&action=balancemulti&address=${joinedAddresses}&apikey=${key}`;
        return AxiosClient.make(url,{},params,{},"get");
    }

}