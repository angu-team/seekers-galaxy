import {TelegramServer} from "../../controllers/TelegramServer";
import {ethers} from "ethers";

export class MugetsoCommandSequenceFeedService {

    responsesByMessageId:{[messageId:string]:string} = {}
    responseByReceivedCommand:{[responseByReceivedCommand:string]:string} = {}

    validations:{[receivedCommand:string]:any} = {
        "site":this.validateSite,
        "coin":this.validateCoin,
        "twitter":this.validateTwitter,
    }

    sequences:{[receivedCommand:string]:string[]} = {
        "site":[
            "/site_check",
            "/domain"
        ],
        "coin":[
            "/dex",
            "/distro",
            "/early",
            "/fresh",
            "/dev",
            "/bundle_check"
        ],
        "twitter":[
            "/twitter_reuse",
        ]
    }

    chatUser = "the_mugetsu_bot"

    async sendCommands(receivedCommand:string,parameters?:string){

        const validation = this.validations[receivedCommand](parameters);
        if(validation instanceof Error) return validation;

        for (const command of this.sequences[receivedCommand]) {
            const sentCommand = await TelegramServer.client.sendMessage(this.chatUser,{message:`${command} ${parameters}`});
            const responseMessageId = String(sentCommand.id + 1);

            while (true){
                await new Promise(resolve => setTimeout(resolve, 1000));
                let gotResponse = Object.keys(this.responsesByMessageId).includes(responseMessageId)
                if(gotResponse) {
                    this.responseByReceivedCommand[command] = this.responsesByMessageId[responseMessageId]
                    break;
                }
            }

        }

        console.log(this.responseByReceivedCommand)
    }

    listenMessages(messageId:string,message:string){
        this.responsesByMessageId[messageId] = message;
    }

    validateSite(parameters?:string){
        if(!parameters) return new Error("Invalid site parameters")

        const regex = /^https?:\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/[^\s]*)?$/;

        if (!regex.test(parameters)) {
            throw new Error("URL inválida!");
        }
    }

    validateCoin(parameters?:string){
        if(!parameters) return new Error("Invalid coin parameters")
        // const parameterIsAddress = ethers.isAddress(parameters)

        // if(!parameterIsAddress) return new Error("Invalid coin address")
    }

    validateTwitter(parameters?:string){
        if(!parameters) return new Error("Invalid twitter parameters")
    }

}