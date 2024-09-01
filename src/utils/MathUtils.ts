export class MathUtils {

    public static percentOfAValue(value1:number, value2:number){
        return value1 * 100 / value2;
    }

    public static getRandomInt(min:number, max:number) {
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
    }

}