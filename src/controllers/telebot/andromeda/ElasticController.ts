import {ElasticRepository} from "../../../repositories/andromeda/ElasticRepository";
import {TelebotServer} from "../../TelebotServer";

export class ElasticController {
    private static repository: ElasticRepository;

    constructor(repository:ElasticRepository) {
        ElasticController.repository = repository;
    }

    @TelebotServer.ReceiveMessage("label_by_addr","literal")
    async labelByAddr(userId: number,command:string, args: string){
        let label:{name_tag:string} = await ElasticController.repository.getLabelByAddress(args);
        return {message:label.name_tag}
    }
}