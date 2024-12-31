import axios, {AxiosError, AxiosResponse} from "axios";
import * as AxiosLogger from 'axios-logger';

export class AxiosClient {
    private static instance = axios.create();

    public static initLogger(){
        AxiosLogger.setGlobalConfig({dateFormat: 'HH:MM:ss', status: true, data: false})
        AxiosClient.instance.interceptors.request.use(AxiosLogger.requestLogger);
        AxiosClient.instance.interceptors.response.use(AxiosLogger.responseLogger, AxiosLogger.errorLogger);
    }

    private static getMapping(url: string, headers?: {}, params?: {}): Promise<AxiosResponse<any, any>> {
        return this.instance.get(url, {headers, params});
    }

    private static postMapping(url:string,data:{},headers:{},params:{}):Promise<AxiosResponse<any, any>> {
        return this.instance.post(url,data,{headers,params})
    }

    private static putMapping(url:string,data:{},headers:{},params:{}):Promise<AxiosResponse<any, any>> {
        return this.instance.put(url,data,{headers,params})
    }

    public static async make<T>(url: string, headers: any, params: any, body: any, method: "get" | "post" | "put") {
        let request;

        try {
            switch (method) {
                case "get":
                    request = this.getMapping(url, headers, params)
                    break;
                case "put":
                    request = this.putMapping(url, body, headers, {})
                    break;
                case "post":
                    request = this.postMapping(url, body, headers, {})
                    break;
            }

            const response = await request
            return response.data
        } catch (error) {
            if (error instanceof AxiosError) {

                if (error.response) {
                    console.log(error.response.data)
                    throw error.response.data
                }

                throw new Error(`✖️ There is no response from the andromeda server\n${error.message}`)
            }

        }

    }

}