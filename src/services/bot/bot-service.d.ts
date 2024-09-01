import {ethers, TransactionReceipt} from "ethers";

export type tokenDeploymentType = {
    name: any,
    supply: any,
    symbol: any,
    owner: any,
    supportsNftInterface: any,
    reserves: any,
    contractAddress: string,
    callerAddress: string,
    receipt: TransactionReceipt
}

export type tokenDeploymentHandleType = {
    networkName:string,
    feeData: ethers.FeeData,
    block: ethers.Block,
    userId:number,
    tokens: tokenDeploymentType[]
}

export type TelegramUpdateMessageHandleType = {
    reply:{
        replyTo:number,
        replyMessage:string
    }

}