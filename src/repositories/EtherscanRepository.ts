import {AxiosClient} from "../AxiosClient";

interface IResponse {
    status:string,
    message:string,
    result:string | any[],
}


interface IParams {
    sort?:string,
    page?:number,
    offset?:number,
    startblock?:number,
    endblock?:number,
}

export class EtherscanRepository {
    networkId:number;

    constructor(networkId:number) {
        this.networkId = networkId;
    }

    ETHERSCAN_KEYS = [
        {key: "6Q5BQTPKSXHPQNJYS554W8UYFPA4PF89GD", disponibility: 0,networkId:1},
        {key: "URK2V81FGZ8VJ7Q48XYIWU6MFEQ58UYV5E", disponibility: 0,networkId:1},
        {key: 'YC72UD46T9Z94FHTN9W9S56KKENYYZA44Q', disponibility: 0,networkId:1},
        {key: 'SAWPNIM5KKPSQXRS28YA12B25SU1E3D3IF', disponibility: 0,networkId:1},
        {key: '25PUIJ1ST1R51J2GC7IM15EV5GHB9SNY53', disponibility: 0,networkId:1},
        {key: 'SX3XWV1KEG6RTED5WWGJKMH7TEEPCNU7KQ', disponibility: 0,networkId:1},
        {key: 'UZ4N8D4YWV7SBT2SREF1C8GXWUZFM7317M', disponibility: 0,networkId:1},
        {key: 'MUE763QUDVXCSBQEQ16B1JBSZEKCGBFMQF', disponibility: 0,networkId:1},
        {key: 'PWAXZ4885ZZAIF3AZ8XJR5IIYJIWSTICK4', disponibility: 0,networkId:1},
        {key: '2GAZ36HW78NI24ZSC9PIB4VRGAU17M2K9U', disponibility: 0,networkId:1},
        {key: '5JZK7QU1RASMFV5XIVYZPE7MY4VHCWM3YW', disponibility: 0,networkId:1},
        {key: 'Z8KIKXKKUYSHUNEXY5HVSRDCN4TBNWPPNK', disponibility: 0,networkId:1},
        {key: 'XVB1B1E3K8UG994EXGK249W8WG49XYA4U9', disponibility: 0,networkId:1},
        {key: '4SIE91I26QI55AR8A2WB25MKI5RUEV6XTE', disponibility: 0,networkId:1},
        {key: '755KBQVHGEREXH4HWV6BPJDYMJI34SGM3D', disponibility: 0,networkId:1},
        {key: 'DGUP8NCP9IVZ6XYCVUR7XZ5XV49PN9IMBQ', disponibility: 0,networkId:1},
        {key: '1PYBZI9K418B5FTKA7FQ8IYHSRUAAW4EVJ', disponibility: 0,networkId:1},
        {key: 'VITWGC6EC6RC1HH7QFRZ46W4SCF77AYB64', disponibility: 0,networkId:1},
        {key: 'XAEKU8YCW4PJZUV2ZC6MHDCVT4DP2Z1ANF', disponibility: 0,networkId:1},
        {key: '6ICBENS1UJ6Y33WRE5NSMTQE294Z56RJKX', disponibility: 0,networkId:1},
        {key: 'IQR93BUTJZQDMEI449JFVRZC8U7UND85SQ', disponibility: 0,networkId:1},
        {key: '4I9JHN8HVNC18Q84KGYKUDIVBPGDUIE78I', disponibility: 0,networkId:1},
        {key: 'P97YX6WKB3WURJN1MNZUGBGPG7PXZTA7WJ', disponibility: 0,networkId:1},
        {key: 'XYAPIR5I57SABXTMWVWNVMHK8C28IBXKES', disponibility: 0,networkId:1},
        {key: '9JFVZPTABERDKGKIP9MJACSHGQGYMHSPY7', disponibility: 0,networkId:1},
        {key: 'PV8TN8AWUSU98885XYRIYVR9M6GAZGJERR', disponibility: 0,networkId:1},
        {key: 'DAQGW8K3YPXY4FY4EMESPS5Y7HRZWC8FIG', disponibility: 0,networkId:1},
        {key: 'TKK492MWY5YDPSXI1AZ22GGY1K1HGNYJYN', disponibility: 0,networkId:1},
        {key: '9AEJE9SP7Q3BPCMW8FEA96D55AS45RXQX8', disponibility: 0,networkId:1},
        {key: 'C63W8CAZQTTH4GFSA1BER4X9F4GNJGTCDG', disponibility: 0,networkId:1},
        {key: 'ZGSC82Z9FJCM7APDFVDIH98TF4VME9ZF4M', disponibility: 0,networkId:1},
        {key: 'VHF9V2YCFDZ4F25VCSCDER8NJQKFYSRPBZ', disponibility: 0,networkId:1},
        {key: 'M9J2GBBG3GUKH576V63C86ATQ7FIEPNBTG', disponibility: 0,networkId:1},
        {key: '93H9NSR12P41KISZADDATIWUQY6B39YFQM', disponibility: 0,networkId:1},
        {key: 'E9JKKJWXDNDKAINZD43FTMEICVAQYC2BBP', disponibility: 0,networkId:1},
        {key: 'KU7CNHE8572GTEQ9REN7H7T2IQQTMP4PW2', disponibility: 0,networkId:1},
        {key: 'ZGP6U4BJU6PYF66NAZKE9D26TXTMKG4CMS', disponibility: 0,networkId:1},
        {key: '9ARW4RGW7CXPDJNBW6QU1US65RZI5SMRJD', disponibility: 0,networkId:1},
        {key: 'A226PZ21HRSDCZURY1H7RDB88H7UB3E8EM', disponibility: 0,networkId:1},
        {key: 'RI13XSQW7YAJ4M7Z78IJKVRUY7S7QEBIZR', disponibility: 0,networkId:1},
        {key: '799PC9EDW9WMAURJR6S8F6C139N8FTC472', disponibility: 0,networkId:1},
        {key: '8GXFPYCQMS351ANQ6S1RB25VDFA5AUEYYY', disponibility: 0,networkId:1},
        {key: 'IKJXPG8P3CMX9RFXZ9F325F1TCXUI94WMB', disponibility: 0,networkId:1},
        {key: '4DGHFRCY6W2R5FDQ496QI1V8K4M6X3VRF8', disponibility: 0,networkId:1},
        {key: '7XGM3KJDZT4W86S8BE8Q173J6J7QHYDK1K', disponibility: 0,networkId:1},
        {key: 'RC39Q2VGZHYB47WQQ4YGH3G9VC5614YBBV', disponibility: 0,networkId:1},
        {key: 'BIUCN7VM2XFCXR715XYIHKTFTU6XAPEPNH', disponibility: 0,networkId:1},
        {key: 'KB9NV77MWARYF1NUWJQPJ1UVFHDUV2FHWN', disponibility: 0,networkId:1},
        {key: 'FR1UFKM5NQZVZJ2JJK79JJCJG7F6IG54F9', disponibility: 0,networkId:1},
        {key: 'EGCJ1ZGHM41BDM6MGXZMWRRDIT1ZBCHRQF', disponibility: 0,networkId:1},
        {key: '34FXG1TEBR4KBG6IM7KQYJ4APG6XN7DPBS', disponibility: 0,networkId:1},
        {key: 'BQPJXZ21ZQFGGJRP7GQ1MPQY27YH79K9MX', disponibility: 0,networkId:1},
        {key: 'WAGMTI88J8NGUB7SBHD7HIMB5Q234ZKE4C', disponibility: 0,networkId:1},
        {key: 'IJP6UGP5BUB5G52U1P9V7ZYD24EK1B8X14', disponibility: 0,networkId:1},
        {key: 'WZCNEWWMNEJ4UEW5SNZVCV2ZMAF9KB6M3Q', disponibility: 0,networkId:1},
        {key: 'AB433XIN18EBF1ZDI3QQ6M1C52G5H3STYZ', disponibility: 0,networkId:1},
        {key: 'JSD4R5D72WFZN8T5DMWR2XS1YPN9QZ4N2P', disponibility: 0,networkId:1},
        {key: '1WV9RV38VS8IVW3G7T3XU34WB39TIXPJG8', disponibility: 0,networkId:1},
        {key: 'MD8HTSJVCIU597GB46DJSXH1Y9HVUVNFG8', disponibility: 0,networkId:1},
        {key: 'CQSRZT93WZAPHRDRA1817E8RSQAD8YBW8A', disponibility: 0,networkId:1},
        {key: 'MRWMG97ADIHT9Y3Z9SKTZ8H5URYU2E7MKZ', disponibility: 0,networkId:1},
        {key: 'MD8HTSJVCIU597GB46DJSXH1Y9HVUVNFG8', disponibility: 0,networkId:1},
        {key: 'CQSRZT93WZAPHRDRA1817E8RSQAD8YBW8A', disponibility: 0,networkId:1},
        {key: 'MRWMG97ADIHT9Y3Z9SKTZ8H5URYU2E7MKZ', disponibility: 0,networkId:1},
        {key: '8HVVMAGVDKCVDIMF3IEPTIADUAWNMSMVBF', disponibility: 0,networkId:1},
        {key: 'QTHBMTZQXJQGRHR2UFP9ZQ8H3BFTAMZFJY', disponibility: 0,networkId:1},
        {key: 'UFF7EV15PK199YBE784FMA52C41DHXY4XT', disponibility: 0,networkId:1},
        {key: 'DGVTK2UNM1NBD4GRDTR2HTJ2JD5GKEN1GE', disponibility: 0,networkId:1},
        {key: 'R75ZX288P6EJY5VM8KJRGTCG6APT1VHM6F', disponibility: 0,networkId:1},
        {key: 'RFQE1HVT7CTUXKC9HPW5YXWNUNCE8SPTDH', disponibility: 0,networkId:1},
        {key: 'IQWWI8UQT25ZJTV67VH2MAAVFK2R126P6A', disponibility: 0,networkId:84531},
        {key: 'R7W6SJMDD6UE1X3IGDJRWFVYQ7IVDCZ59Q', disponibility: 0,networkId:84531},
        {key: 'M4X5S8W419727AVR1BTG468ZEJQZQN93SH', disponibility: 0,networkId:84531},
    ]
    sourceCodeCache:{[address:string]:IResponse} = {};

    private readonly urls:{[networkId:number]:string} = {
        1: 'https://api.etherscan.io/api',
        84531: 'https://api.basescan.org/api',
        100: 'https://api.polygonscan.com/api',
    }

    setIndisponibleApi(apiKey:string,seconds:number){
        const disponibilitykey = this.ETHERSCAN_KEYS.find(item => item.key === apiKey);
        if(!disponibilitykey) throw new Error(`etherscan key not found: ${apiKey}`)

        disponibilitykey.disponibility =Date.now() + (seconds * 1000)
    }

    async getDisponibleEtherscanKey(){
        const now = Date.now()

        while(true){
            const disponibilitykey = this.ETHERSCAN_KEYS.find(item => item.disponibility <= now && item.networkId === this.networkId);

            if(disponibilitykey) {
                return disponibilitykey.key
            }

            console.log(`[Etherscan] - all keys are busy. It will waiting for 5 seconds to check disponibility`)
            await new Promise((r) => setTimeout(r,5000))
        }
    }

    async getSourceCode(address: string):Promise<IResponse> {
        const key = await this.getDisponibleEtherscanKey()
        this.setIndisponibleApi(key,2)

        const url = `${this.urls[this.networkId]}?module=contract&action=getsourcecode&address=${address}&apikey=${key}`;
        this.sourceCodeCache[address] ??= await AxiosClient.make(url, {}, {}, {}, "get");

        return this.sourceCodeCache[address]
    }

    async txList(address:string,params:IParams):Promise<IResponse>{
        const key = await this.getDisponibleEtherscanKey()
        this.setIndisponibleApi(key,2)

        const url = `${this.urls[this.networkId]}?module=account&action=txlist&address=${address}&apikey=${key}`;
        return AxiosClient.make(url,{},params,{},"get");
    }

}