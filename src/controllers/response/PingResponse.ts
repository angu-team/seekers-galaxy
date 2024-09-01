export function PingResponse(serviceResponse:{ms:number,block:number,syncing:boolean,provider:string}){
    let message = ""
    const date = `_Last update at ${new Date().toLocaleString("pt-BR")}_`

    const syncMessage = !serviceResponse.syncing ? "`Synced`" : "✖️"
    message += "🛜 Ping: `" + serviceResponse.ms.toString() + " ms` - Block:` " + serviceResponse.block.toString() + "` - Sync: " + syncMessage
    message += "\n_see the logs_ [here](https://telegram-bot-hub-grafana.qkoe1z.easypanel.host/public-dashboards/3b707f41e5064a97a7ae4a300f5673c4)"
    message += "\n\n_Node:_ `" + serviceResponse.provider + "`"
    message += "\n" + date
    return message

}