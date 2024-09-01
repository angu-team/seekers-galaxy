export function ApplyRpcDTO(arg: string) {
    const endpoint = arg

    if(!endpoint) throw new Error("invalid parameters")

    return {endpoint};
}