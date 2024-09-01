import {ethers} from "ethers";

export class BlockUtils {
    public static roundGwei(networkName:string, feeData:{gasPrice:any,maxPriorityFeePerGas:any}) {
        const prioryOrGas = networkName.toLowerCase() == "base" ? feeData.maxPriorityFeePerGas : feeData.gasPrice
        const format = ethers.formatUnits(prioryOrGas,"gwei")

        return Math.round(Number(format))
    }

    public static gasUsedInpercent(gasUsed:bigint,gasLimit:bigint) {
        return Number(gasUsed) * 100 / Number(gasLimit);
    }

}