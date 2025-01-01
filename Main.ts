import {Server} from "./src/webhooks/Server";
import {AxiosClient} from "./src/AxiosClient";

(() => {
    AxiosClient.initLogger();
    Server.initialize()
})()