import {ethers, TransactionReceipt} from "ethers";

export type tokenInfoType = {
    name: any,
    supply: any,
    symbol: any,
    owner: any,
    supportsNftInterface: any,
    reserves: any,
    contractAddress: string,
    callerAddress: string,
    tokenAddress:string,
    decimals:number,
    receipt?: TransactionReceipt,
}

export type handleTokenBurnType = {
    networkName:string,
    feeData: ethers.FeeData,
    block: ethers.Block,
    userId:number,
    tokens: ({ pairV2: string, pairV3: string, burnPercent: any } & tokenInfoType)[]
}

export type handleTokenDeploymentType = {
    networkName:string,
    feeData: ethers.FeeData,
    block: ethers.Block,
    userId:number,
    tokens: tokenInfoType[]
}

export type handleLockv3Type = {
    userId: number,
    block: ethers.Block,
    feeData: ethers.FeeData,
    token: tokenInfoType,
    lockInfo: {
        lockPercent: number,
        unlockDate: number
    }
}

export type handleRemoveLiquidityType = {
    userId:number,
    block:ethers.Block,
    feeData: ethers.FeeData,
    tokens: (tokenInfoType & {liquidity:any})[]
}

export type handlePendingTokenFailedType = {
    networkName:string,
    feeData: ethers.FeeData,
    block: ethers.Block,
    userId:number,
    tokens: tokenInfoType[]
}