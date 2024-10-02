import {StringUtils} from "../../utils/StringUtils";

export function PingResponse(serviceResponse:{ms:number,block:number,syncing:any,endpoint:string}[]){
    let message = ""

    serviceResponse.map(response => {
        const syncMessage = !response.syncing ? "`Synced`" : "✖️"
        message += "🛜 Ping: `" + response.ms.toString() + " ms` - Block:` " + response.block.toString() + "` - Sync: " + syncMessage + "\n"
        message += "_Node:_ `" + response.endpoint + "`" + "\n\n"
    })

    const date = `_Last update at ${new Date().toLocaleString("pt-BR")}_`
    message += "_see the logs_ [here](https://telegram-bot-hub-grafana.qkoe1z.easypanel.host/public-dashboards/3b707f41e5064a97a7ae4a300f5673c4)"
    message += "\n" + date
    return message
}