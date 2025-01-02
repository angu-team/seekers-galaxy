export class StringUtils {

    public static capitalize(text: string) {
        return text[0].toUpperCase() + text.slice(1);
    }

    public static shortenAddress(address: string) {
        return address.substring(0, 4) + "..." + address.substring(39)
    }

    public static getMaxTxInOttoBotMessage(message: string) {
        const regex = /Max Tx: (\d+)\s*\(([^\)]+)\)/
        return regex.exec(message);
    }

    public static getMaxWalletInOttoBotMessage(message: string) {
        const regex = /Max Wallet: (\d+)\s*\(([^\)]+)\)/
        return regex.exec(message);
    }

    public static StringToBool(stringValue: string) {
        return stringValue === "true"
    }

    public static escapeMarkdown(text: string) {
        const escapeChars = '_[]()~`>#+-=|{}.!';
        let escapedText = '';
        for (let char of text) {
            if (escapeChars.includes(char)) {
                escapedText += '\\' + char;
            } else {
                escapedText += char;
            }
        }
        return escapedText;
    }

    public static findErc20Address(text: string) {
        const regex = /0x[a-fA-F0-9]{40}/g;
        const matches = text.match(regex);

        return matches ? (matches[0] as string).toLowerCase() : false
    }

    public static compareWithSearchValue(item:string, exactOccurrency:boolean, searchValue:string) {
        if (exactOccurrency) {
            return item.toLowerCase() === searchValue.toLowerCase();
        } else {
            return item.toLowerCase().includes(searchValue.toLowerCase());
        }
    }

}