import { HoneypotIsService } from "../HoneypotIsService";
import { HoneyPotIsRepository } from "../../repositories/HoneyPotIsRepository";

describe("HoneypotIsService - Integração Real com API", () => {
    const repository = new HoneyPotIsRepository();
    const service = new HoneypotIsService(repository);

    it("deve retornar os dados do simulation da API", async () => {
        const address = "0x17837004ea685690b32dbead02a274ec4333a26a";

        const result = await service.simulation(address);

        expect(result).toEqual({
            buyGas: "211322",
            buyTax: 0,
            sellGas: "164315",
            sellTax: 0,
            transferTax: 0,
        });
    });
});