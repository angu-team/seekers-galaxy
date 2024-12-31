import {AxiosClient} from "../../AxiosClient";

export class ElasticRepository {
    private readonly endpoint = "elastic/"

    constructor(private andromedaUrl: string) {}

    public async getLabelByAddress(address: string) {
        const url = `${this.andromedaUrl}${this.endpoint}labels_from_address/${address}`;
        return AxiosClient.make(url,{},{},{},"get");
    }

}