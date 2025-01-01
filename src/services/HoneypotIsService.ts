import {HoneyPotIsRepository} from "../repositories/HoneyPotIsRepository";

interface ISimulationResponse {
    simulationSuccess:boolean,
    simulationResult:{
        buyTax:number,
        sellTax:number,
        transferTax:number,
        buyGas:number,
        sellGas:number,
    },
}

export class HoneypotIsService {
    constructor(private repository:HoneyPotIsRepository) {}

    async simulation(address:string){
        const response:ISimulationResponse = await this.repository.get(address);
        return response.simulationSuccess ? response.simulationResult : false;
    }

}