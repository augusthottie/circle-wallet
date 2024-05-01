export function isValidEthereumAddress(address: string) {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
}

export function hashNormalizer(hash?: string) {
    if (!hash) return "";
    return hash.slice(0, 6) + "..." + hash.slice(hash.length - 4, hash.length);
}
