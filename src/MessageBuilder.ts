interface IHeader {
    twitterReuseResponse:string,
    siteCheckResponse:string,
    dexResponse:string
}

interface IMiddle {
    distroResponse:string,
    earlyResponse:string,
    freshResponse:string,
}

interface IFooter {
    // maxTx:string | number,
    // maxWallet:string | number
    // transferDelay: "ON" | "OFF"
}

export class MessageBuilder {
    header!:IHeader;
    footer!:IFooter;
    middle!:IMiddle;
    scan = "https://etherscan.io/"
    dexScreneer = "https://dexscreener.com/ethereum/"

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
        // let message = `===================\n<header/><middle/><footer/>\n===================`
        //
        // if(this.header){
        //     const headerFormat = this.formatHeader()
        //     message = message.replace("<header/>",`${headerFormat}`)
        // }
        //
        // if(this.middle){
        //     const middleFormat = this.formatMiddle()
        //     message = message.replace("<middle/>",`${middleFormat}`)
        // }
        //
        // if(this.footer){
        //     const footerFormat = this.formatFooter()
        //     message = message.replace("<footer/>",`${footerFormat}`)
        // }
        //
        // return message.replaceAll(/<[^>]*\/>/g,"");
        return ""
    }

    formatHeader(){
        // let header = ""
        //
        // header += `Chain: *${this.header.chain.toUpperCase()}*\n`
        // header += `Block: [${this.header.block.blockNumber}](${this.scan}txs?block=${this.header.block.blockNumber}) | Gas used: *${this.header.block.gasUsed.toFixed(2)}%* | Gwei: *${this.header.block.gwei}*\n`
        // header += `Token: *${this.header.token.name}* | $${this.header.token.symbol}\n\n`
        //
        // return header;
    }

    formatMiddle(){
        // let middle = ""
        // let directArrow = `[➥](${this.scan}token/${this.middle.tokenAddress})`
        // let directDexScreener = `[📉](${this.dexScreneer}${this.middle.tokenAddress})`
        //
        // middle += `Label: _${this.middle.caller}_\n`
        // middle += directArrow + "`" + this.middle.tokenAddress + "`" + directDexScreener + "\n"
        //
        // return middle;
    }

    formatFooter(){
        // let footer = ""
        //
        // if(this.footer.transferDelay) footer += `\nTransfer Delay: *${this.footer.transferDelay}*`
        // if(this.footer.maxTx) footer += `\nMax Tx: *${this.footer.maxTx}*`;
        // if(this.footer.maxWallet) footer += `\nMax Wallet: *${this.footer.maxWallet}*`
        //
        // return footer;
    }

}