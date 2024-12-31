import express, {Express,Request} from "express";
import morgan from "morgan";
import bodyParser from "body-parser";

type methods = "get" | "post" | "put" | "delete"

export class Router {

    private static express:Express = express()
        .use(morgan(this.logRequest))
        .use(bodyParser.urlencoded({ extended: false }))
        .use(bodyParser.json())

    public static initialize(port:string){
        morgan.token('body', (req:Request) => {
            return JSON.stringify(req.body)
        })

        morgan.token('identifier', req => {
            return JSON.stringify(req.headers.identifier)
        })

        Router.express.listen(port).on("connect",() => {
            console.info("server listening on port", port)
        })
    }

    public static RequestMapping(endpoint: string,method:methods) {

        return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
            const originalMethod = descriptor.value;

            descriptor.value = async function (req:Request) {
                return await originalMethod.call(this, req);
            };
            Router.express[method](`/${endpoint}`, async function (req, res) {
                const serviceResponse = await descriptor.value(req)

                if(serviceResponse instanceof  Error) {
                    return res.status(400).send(String(serviceResponse))
                };

                return res.status(200).json(serviceResponse)
            })

        };
    }

    private static logRequest(tokens:any, req:any, res:any){
        console.info(`[${new Date().toLocaleString("pt-BR")}] ${tokens.method(req, res)}:: ${tokens.url(req, res)} - ${tokens.status(req, res)} - ${tokens['response-time'](req, res)} 'ms'`);
        return ""
    }

}