import {Client} from "@elastic/elasticsearch";
import {Properties} from "../../../Properties";

export class ElasticConfigurations {

    private static client:Client;

    public static initialize(){
        this.client =  new Client({node: Properties.elasticUrl});
    }

    public getClient(){
        return ElasticConfigurations.client
    }
}