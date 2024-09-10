import {retryOptions} from "./axios-repository"
import axios, {AxiosError, AxiosResponse} from "axios";
import * as AxiosLogger from 'axios-logger';
import {Properties} from "../../Properties";
import {ElasticUtils} from "../../utils/ElasticUtils";
import {tokenInfoType} from "../../services/handle/handle-service";

export class AxiosRepository {
    private instance = axios.create();

    constructor() {
        if(Properties.envFile === ".env.development"){
            AxiosLogger.setGlobalConfig({dateFormat:'HH:MM:ss',status:true,data:false})
            this.instance.interceptors.request.use(AxiosLogger.requestLogger);
            this.instance.interceptors.response.use(AxiosLogger.responseLogger, AxiosLogger.errorLogger);
        }
    }

    private getMapping(url: string, headers?: {}, params?: {}): Promise<AxiosResponse<any, any>> {
        return this.instance.get(url, {headers, params});
    }

    public postMapping(url:string,data:{},headers:{},params:{}):Promise<AxiosResponse<any, any>> {
        return this.instance.post(url,data,{headers,params})
    }

    public putMapping(url:string,data:{},headers:{},params:{}):Promise<AxiosResponse<any, any>> {
        return this.instance.put(url,data,{headers,params})
    }

    public async listenRemoveLiquidity(userId:number){
        const url = `${Properties.andromeda.host}events/remove_liquidity`
        const webhook = `${Properties.server.host}handle/remove_liquidity`
        const identifier = Properties.server.identifier

        return await this.TryElseRetry(url,{},{},{userId,webhook,identifier},"post",{retry:true,retryQuantities:1,timeToWaitToNextRetry:1000})
    }

    public async listenPendingTokenFailedEvent(userId:number){
        const url = `${Properties.andromeda.host}events/pending_token_failed`
        const webhook = `${Properties.server.host}handle/pending_token_failed`
        const identifier = Properties.server.identifier

        return await this.TryElseRetry(url,{},{},{userId,webhook,identifier},"post",{retry:true,retryQuantities:1,timeToWaitToNextRetry:1000})
    }

    public async listenTokenFailedEvent(userId:number){
        const url = `${Properties.andromeda.host}events/token_failed`
        const webhook = `${Properties.server.host}handle/token_failed`
        const identifier = Properties.server.identifier

        return await this.TryElseRetry(url,{},{},{userId,webhook,identifier},"post",{retry:true,retryQuantities:1,timeToWaitToNextRetry:1000})
    }

    public async listenTokenDeployments(userId:number){
        const url = `${Properties.andromeda.host}events/token_deployments`
        const webhook = `${Properties.server.host}handle/token_deployments`
        const identifier = Properties.server.identifier

        return await this.TryElseRetry(url,{},{},{userId,webhook,identifier},"post",{retry:true,retryQuantities:1,timeToWaitToNextRetry:1000})
    }

    public async getHistoricRemoveLiquidityToken(userId:number,tokenAddress:string,fromBlock:number):Promise<any[]>{
        const url = `${Properties.andromeda.host}logs/history_remove_liquidity`
        return await this.TryElseRetry(url,{},{userId,tokenAddress,fromBlock},{},"get",{retry:true,retryQuantities:5,timeToWaitToNextRetry:1000})
    }


    public async getAbi(userId:number,address:string){
        const url = `${Properties.andromeda.host}whatsabi/get_abi?&userId=${userId}&address=${address}`
        return await this.TryElseRetry(url,{},{},{},"get",{retry:true,retryQuantities:5,timeToWaitToNextRetry:1000})
    }

    public async getHistoricTokenCreations(userId:number,fromBlock:number,toBlock:number){
        const url = `${Properties.andromeda.host}logs/history_creation_tokens`
        return await this.TryElseRetry(url,{},{},{userId,fromBlock,toBlock},"post",{retry:true,retryQuantities:1,timeToWaitToNextRetry:1000})
    }

    public async getTokenInfo(userId:number,address:string):Promise<tokenInfoType>{
        const url = `${Properties.andromeda.host}contract/token_info`
        return await this.TryElseRetry(url,{},{userid:userId,address},{},"get",{retry:true,retryQuantities:1,timeToWaitToNextRetry:1000})
    }

    public async listenTokenBurn(userId:number){
        const url = `${Properties.andromeda.host}events/token_burn`
        const webhook = `${Properties.server.host}handle/token_burn`
        const identifier = Properties.server.identifier

        return await this.TryElseRetry(url,{},{},{userId,webhook,identifier},"post",{retry:true,retryQuantities:1,timeToWaitToNextRetry:1000})
    }


    public async listenPendingTokenDeployments(userId:number){
        const url = `${Properties.andromeda.host}events/pending_token_deployments`
        const webhook = `${Properties.server.host}handle/pending_token_deployments`
        const identifier = Properties.server.identifier

        return await this.TryElseRetry(url,{},{},{userId,webhook,identifier},"post",{retry:true,retryQuantities:1,timeToWaitToNextRetry:1000})
    }

    public async listenUnicryptLockDetect(userId:number){
        const url = `${Properties.andromeda.host}events/uncx_lock`
        const webhook = `${Properties.server.host}handle/uncx_lock`
        const identifier = Properties.server.identifier

        return await this.TryElseRetry(url,{},{},{userId,webhook,identifier},"post",{retry:true,retryQuantities:1,timeToWaitToNextRetry:1000})
    }

    public async pingRequest(userId:number){
        const url = `${Properties.andromeda.host}ping`
        return await this.TryElseRetry(url,{},{userId},{},"get",{retry:true,retryQuantities:1,timeToWaitToNextRetry:1000})
    }

    public async createInstance(userId:number,endpoint:string,pendingHook?:boolean){
        const handleBlockUpdateUrl = `${Properties.server.host}handle/block_update`
        const handlePendingUrl = pendingHook ? `${Properties.server.host}handle/pending` : false
        const url = `${Properties.andromeda.host}instance`

        return await this.TryElseRetry(url,{},{},{userId,endpoint,handleBlockUpdateUrl,handlePendingUrl},"post",{retry:true,retryQuantities:1,timeToWaitToNextRetry:1000})
    }

    public async updateInstance(userId:number,endpoint:string,pendingHook?:boolean){
        const handleBlockUpdateUrl = `${Properties.server.host}handle/block_update`
        const handlePendingUrl = pendingHook ? `${Properties.server.host}handle/pending` : false
        const url = `${Properties.andromeda.host}instance`

        return await this.TryElseRetry(url,{},{},{userId,endpoint,handleBlockUpdateUrl,handlePendingUrl},"put",{retry:true,retryQuantities:1,timeToWaitToNextRetry:1000})
    }

    //TODO melhorar logica do dowhile e o retry
    private async TryElseRetry<T>(url:string, headers:any,params:any,body:any,method:"get" | "post" | "put",retryOptions: retryOptions){
        let tries = 0;
        headers.identifier = Properties.server.identifier

        while (tries < retryOptions.retryQuantities) {
            let request;

            try {
                switch (method){
                    case "get":
                        request = this.getMapping(url,headers,params)
                        break;
                    case "put":
                        request = this.putMapping(url,body,headers,{})
                        break;
                    case "post":
                        request = this.postMapping(url,body,headers,{})
                        break;
                }

                const response = await request
                return response.data
            } catch (error) {
                if (error instanceof AxiosError) {

                    if(error.response) {
                        throw error.response.data
                    }

                    throw new Error(`✖️ There is no response from the andromeda server\n${error.message}`)
                }

                tries += 1;
                await new Promise((r) => setTimeout(r, retryOptions.timeToWaitToNextRetry));
            }
        }

        throw new Error('Max retries reached');
    }

}