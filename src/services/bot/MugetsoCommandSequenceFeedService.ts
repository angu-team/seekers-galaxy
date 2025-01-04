import {TelegramServer} from "../../controllers/TelegramServer";
import {ethers} from "ethers";
import {MessageBuilder} from "../../MessageBuilder";
import {ParsedResult} from "../../controllers/telebot/TestDTO";

export class MugetsoCommandSequenceFeedService {

    responsesByMessageId: { [messageId: string]: string } = {}
    responseByReceivedCommand: { [responseByReceivedCommand: string]: string } = {}

    validations: { [receivedCommand: string]: any } = {
        "site": this.validateSite,
        "token": this.validateCoin,
        "twitter": this.validateTwitter,
    }

    sequences: { [receivedCommand: string]: string[] } = {
        "site": [
            "/site_check",
        ],
        "token": [
            "/dex",
            "/distro",
            "/top_holders_floor",
            "/holders_map",
            "/fresh",
            "/dev"
        ],
        "twitter": [
            "/twitter_reuse",
        ]
    }

    chatUser = "the_mugetsu_bot"

    async sendAndAwaitForResponses(receivedCommand: string, parameters?: string) {
        for (const command of this.sequences[receivedCommand]) {
            const sentCommand = await TelegramServer.client.sendMessage(this.chatUser, {message: `${command} ${parameters}`});
            const responseMessageId = String(sentCommand.id + 1);

            while (true) {
                await new Promise(resolve => setTimeout(resolve, 1000));
                let gotResponse = Object.keys(this.responsesByMessageId).includes(responseMessageId)
                if (gotResponse) {
                    this.responseByReceivedCommand[command] = this.responsesByMessageId[responseMessageId]
                    break;
                }
            }

        }
    }

    async sendCommands(params: ParsedResult){
        if(params.twitter) {
            this.validations["twitter"](params.twitter)
            await this.sendAndAwaitForResponses("twitter",params.twitter)
        }
        if(params.address) {
            this.validations["token"](params.address)
            await this.sendAndAwaitForResponses("token",params.address)
        }
        if(params.url) {
            this.validations["site"](params.url)
            await this.sendAndAwaitForResponses("site",params.url)
        }

        const messageBuilder = this.buildMessage()
        return messageBuilder.getMessage()
    }

    listenMessages(messageId: string, message: string) {
        this.responsesByMessageId[messageId] = message;
    }

    validateSite(parameters?: string) {
        if (!parameters) return new Error("Invalid site parameters")

        const regex = /^https?:\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/[^\s]*)?$/;

        if (!regex.test(parameters)) {
            throw new Error("URL inválida!");
        }
    }

    validateCoin(parameters?: string) {
        if (!parameters) return new Error("Invalid coin parameters")
    }

    validateTwitter(parameters?: string) {
        if (!parameters) return new Error("Invalid twitter parameters")
    }

    buildMessage() {
        const messageBuilder = new MessageBuilder();

        Object.keys(this.responseByReceivedCommand).map(command => {

            switch (command) {
                case "/site_check":
                    messageBuilder.header.siteCheckResponse = this.responseByReceivedCommand[command];
                    break;
                case "/twitter_reuse":
                    messageBuilder.header.twitterReuseResponse = this.responseByReceivedCommand[command];
                    break;
                case "/dex":
                    messageBuilder.middle.dexResponse = this.responseByReceivedCommand[command];
                    break;
                case "/top_holders_floor":
                    messageBuilder.middle.topHoldersFloorsResponse = this.responseByReceivedCommand[command];
                    break;
                case "/holders_map":
                    messageBuilder.middle.holdersMapResponse = this.responseByReceivedCommand[command];
                    break;
                case "/distro":
                    messageBuilder.middle.distroResponse = this.responseByReceivedCommand[command];
                    break;
                case "/fresh":
                    messageBuilder.footer.freshResponse = this.responseByReceivedCommand[command];
                    break;
                case "/dev":
                    messageBuilder.footer.devResponse = this.responseByReceivedCommand[command];
                    break;
            }

        })

        this.responseByReceivedCommand = {}
        this.responsesByMessageId = {}

        return messageBuilder;
    }

}