import {ElasticConfigurations} from "../repositories/configurations/elastic/ElasticConfigurations";
import {IndicesCreateResponse} from "@elastic/elasticsearch/lib/api/types";
import {Properties} from "../Properties";

export class ElasticUtils {
    private static elasticConfigurations:ElasticConfigurations = new ElasticConfigurations();

    private static async createIndexIfNeeded(index:string):Promise<false | IndicesCreateResponse>{
        const alreadyExists = await this.indexExists(index)
        if(alreadyExists) return false;

        return await this.elasticConfigurations.getClient().indices.create({index})
    }

    private static async indexExists(index:string){
        try {
            return await this.elasticConfigurations.getClient().indices.exists({index})
        } catch (e) {
            throw e;
        }
    }

    public static async putTemplate(index:string | null,document:any,level:"error" | "info",verbose:boolean,conditional?:boolean,identifier?:string){
        index = `${identifier || Properties.server.identifier}_${index}`
        const timestamp = new Date();

        await this.createIndexIfNeeded(index || Properties.server.identifier as string)
        if(verbose && document.message) console[level](`[${timestamp.toLocaleString("pt-BR")}] ${level.toUpperCase()}:: ${document.message}`);

        if(conditional){
            const search = await this.findTemplate(index,document)
            if(search) return false;
        }

        return this.elasticConfigurations.getClient().index({index,document})
    }

    private static async findTemplate(index:string,document:any,identifier?:string){
        const options = {
            index,
            query:{ bool:{
                    must: Object.keys(document)
                            .filter(key => document[key] !== null)
                            .map(key => ({match: {[key]: document[key]}})) }
            }
        }

        const search = await this.elasticConfigurations.getClient().search(options)
        return search.hits.hits.length > 0 ? search.hits.hits : false
    }

    public static async updateTemplate(index:string | null,documentQuery:any,document:any,identifier?:string){
        index = `${identifier || Properties.server.identifier}_${index}`

        const alreadyExists = await this.indexExists(index)
        if(!alreadyExists) throw new Error("index not exists");

        const search = await this.findTemplate(index,documentQuery)
        if(!search) return false;

        for(const hit of search){
            await this.elasticConfigurations.getClient().update({index,
                id: hit._id as any,
                doc: document,
            })
        }
    }

}