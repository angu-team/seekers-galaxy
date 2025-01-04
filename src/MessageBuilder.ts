import {StringUtils} from "./utils/StringUtils";

interface IHeader {
    twitterReuseResponse:string,
    siteCheckResponse:string,
}

interface IMiddle {
    distroResponse:string,
    topHoldersFloorsResponse:string,
    holdersMapResponse:string,
    dexResponse:string,
}

interface IFooter {
    freshResponse:string,
    devResponse:string,
}

export class MessageBuilder {
    header!:IHeader;
    footer!:IFooter;
    middle!:IMiddle;

    constructor() {
        this.header = {
            twitterReuseResponse: "",
            siteCheckResponse: "",
        }
        this.footer = {
            freshResponse: "",
            devResponse: ""
        }
        this.middle = {
            dexResponse: "",
            distroResponse: "",
            topHoldersFloorsResponse: "",
            holdersMapResponse: "",
        }
    }

    setHeader(header:Partial<IHeader>){
        this.header = {...this.header, ...header}
    }

    setMiddle(middle:Partial<IMiddle>){
        this.middle = {...this.middle, ...middle}
    }

    setFooter(footer:Partial<IFooter>){
        this.footer = {...this.footer, ...footer}
    }

    getMessage(){
        let message = `\n<header/>\n<middle/>\n<footer/>\n`

        if(this.header){
            const headerFormat = this.formatHeader()
            message = message.replace("<header/>",`${headerFormat}`)
        }

        if(this.middle){
            const middleFormat = this.formatMiddle()
            message = message.replace("<middle/>",`${middleFormat}`)
        }

        if(this.footer){
            const footerFormat = this.formatFooter()
            message = message.replace("<footer/>",`${footerFormat}`)
        }

        return message.replaceAll(/<[^>]*\/>/g,"");
    }

    formatHeader(){
        let header = "Socials\n"

        this.header.twitterReuseResponse != "" && (header += `Twitter: ${this.header.twitterReuseResponse}\n`)
        this.header.siteCheckResponse != "" && (header += `Site: ${this.header.siteCheckResponse}\n`)
        this.middle.dexResponse != "" && (header += `Dex: ${this.middle.dexResponse}\n`)


        return header == "Socials\n" ? "" : StringUtils.escapeMarkdown(header) ;
    }

    formatMiddle(){
        let middle = "Token\n"

        let holdings = this.extractHoldingsFromDistroResponse();
        if(holdings.extractedHoldings != "") {
            middle += `${holdings.extractedHoldings}\n`
            middle += `${holdings.holdersMap}\n`
            const inProfitAndLoss = this.exctractInProfitAndLossByChar()
            middle += `${inProfitAndLoss.inProfit}🟢 = In profit, ${inProfitAndLoss.inLoss}🔴 = In loss\n\n`
            middle += `${this.extractBuyAndSellAndTransferFromSummary()}`
        }

        return middle == "Token\n" ? "" : StringUtils.escapeMarkdown(middle);
    }

    formatFooter(){
        let footer = ""

        const freshWallets = this.extractFreshWallets()
        if(freshWallets != "") footer += `Fresh\n${freshWallets}`

        let infoFromDevResponse = this.extractInfoFromDevResponse()

        if(infoFromDevResponse.extractedDevInfo != ""){
            footer +="Dev\n"
            footer += `${infoFromDevResponse.extractedDevInfo}\n`
        }

        if(infoFromDevResponse.totalCreatedTokens > 0){
            footer += `Total created tokens: ${this.extractInfoFromDevResponse().totalCreatedTokens}\n`
            footer += `Largest MC: ${this.extractInfoFromDevResponse().largestMCString}`
        }

        return footer == "" ? "" : StringUtils.escapeMarkdown(footer);
    }

    extractHoldingsFromDistroResponse(){
        let extractedHoldings = ""
        let holdersMap = ""
        let count = 0

        if(this.middle.distroResponse){
            const lines = this.middle.distroResponse.split("\n")
            lines.map(line => {
                if(line.includes("holding") && count < 5 ){
                    extractedHoldings += `${line}\n`
                }
                if(line.includes("Holders")){
                    holdersMap += `${line}\n`
                }
            })
        }

        return {extractedHoldings, holdersMap};
    }

    exctractInProfitAndLossByChar(){
        let inProfit = 0
        let inLoss = 0

        if(this.middle.topHoldersFloorsResponse){
            inProfit = this.middle.topHoldersFloorsResponse.split("🟢").length - 2
            inLoss = this.middle.topHoldersFloorsResponse.split("🔴").length - 2
        }

        return {inProfit, inLoss};
    }

    extractBuyAndSellAndTransferFromSummary(){
        let summary = ""
        let count = 0

        if(this.middle.holdersMapResponse){
            const lines = this.middle.holdersMapResponse.split("\n")
            lines.map(line => {
                if(count == 5) return;

                if(line.includes("Buys") || line.includes("Sells") || line.includes("Transfer")){
                    summary += `${line}\n`
                    count += 1
                }
            })
        }

        return summary;
    }

    extractFreshWallets(){
        let freshWallets = ""
        let totalCount = 0
        let fromCount :{[from:string]:number}= {};

        if(this.footer.freshResponse){
            const lines = this.footer.freshResponse.split("\n")
            lines.map(line => {

                if(line.includes("from") && totalCount < 5){
                    const from = line.split("from")[1].split("@")[0]
                    fromCount[from] = fromCount[from] ? fromCount[from] + 1 : 1

                    if(fromCount[from] > 3) {
                        freshWallets += `${line}\n`
                        totalCount += 1
                    }

                }
            })
        }

        return freshWallets;
    }

    extractInfoFromDevResponse(){
        let extractedDevInfo = ""
        let totalCreatedTokens = 0

        // Define o regex para encontrar valores como "$6.1K MC"
        const regex = /\$([\d.]+)([a-zA-Z]*) MC/g;

        // Variáveis para armazenar o maior MC e seu valor numérico
        let largestMCValue = 0;
        let largestMCString = '';

        if(this.footer.devResponse){
            const lines = this.footer.devResponse.split("\n")
            lines.map(line => {
                line.includes("Balance") && (extractedDevInfo += `${line}\n`)
                line.includes("Funding Report for") && (extractedDevInfo += `${line}\n`)
                line.includes("Funding Wallet(s):") && (extractedDevInfo += `${line}\n`)
                line.includes("Amount Funded") && (extractedDevInfo += `${line}\n`)
                line.includes("Wallet Created") && (extractedDevInfo += `${line}\n`)
                line.includes("created") && (totalCreatedTokens += 1)
            })

            let match;

            // Busca por todas as correspondências do regex
            while ((match = regex.exec(this.footer.devResponse)) !== null) {
                const valueInThousands = parseFloat(match[1]); // Converte o número para comparação
                if (valueInThousands > largestMCValue) {
                    largestMCValue = valueInThousands;
                    largestMCString = `${match[1]}K`; // Mantém o formato original
                }
            }

        }

        return {extractedDevInfo, totalCreatedTokens, largestMCValue, largestMCString};
    }

}