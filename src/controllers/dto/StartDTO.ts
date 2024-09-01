export function StartDTO(arg: string) {
    if(!arg) throw new Error("invalid parameters")
    return {webhook:arg};
}