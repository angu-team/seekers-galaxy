import express, {Express} from "express";
import morgan from "morgan";
import {Properties} from "./Properties";
import bodyParser from "body-parser";
import * as http from "node:http";
import {ElasticUtils} from "./utils/ElasticUtils";

type methods = "get" | "post" | "put" | "delete"

export class Router {
    private static listener:http.Server;

    private static express:Express = express()
        .use(morgan('combined', {
            stream:{
                write(str: string) {
                    if(Properties.envFile === ".env.production"){
                        ElasticUtils.putTemplate("logs",{message:str},"info",true)
                    } else {
                        console.info(str)
                    }
                }
            }
        }))
        .use(bodyParser.urlencoded({ extended: false }))
        .use(bodyParser.json())

    public static initialize(){
        this.listener = Router.express.listen(Properties.server.port)
    }

    public static close(){
        if(this.listener) this.listener.close();
    }

    public static RequestMapping(endpoint: string,method:methods) {

        return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
            const originalMethod = descriptor.value;

            descriptor.value = async function (req:Request) {
                return await originalMethod.call(this, req);
            };
            Router.express[method](`/${endpoint}`, async function (req, res) {

                try {
                    const serviceResponse = await descriptor.value(req)
                    res.status(200).json(serviceResponse)
                }catch (e) {
                    res.status(400).send(String(e))
                }

            })

        };
    }

}