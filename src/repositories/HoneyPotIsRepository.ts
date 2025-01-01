import {AxiosClient} from "../AxiosClient";

export class HoneyPotIsRepository {
    honeypotIsUrl = "https://api.honeypot.is/v2/IsHoneypot";

    constructor() {
    }

    async get(address:string) {
        return AxiosClient.make(this.honeypotIsUrl,{},{address},{},"get");
    }
}