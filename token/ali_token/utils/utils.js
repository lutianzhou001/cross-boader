const aesjs = require('aes-js')
const config = require('../../../conf/config')

function Str2Hex(str) {
    return new Promise((resolve, rejext) => {
        var textBytes = aesjs.utils.utf8.toBytes(str)
        var aesCtr = new aesjs.ModeOfOperation.ctr(config.cryptoKey, new aesjs.Counter(config.cryptoCount));
        var encryptedBytes = aesCtr.encrypt(textBytes);
        var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
        hex = '0x' + encryptedHex
        resolve({ hex })
    })
}

function Hex2Str(hex) {
    return new Promise((resolve, rejext) => {
        var length = hex.length
        var handledHex = hex.slice(2, length)
        var encryptedBytes = aesjs.utils.hex.toBytes(handledHex);
        var aesCtr = new aesjs.ModeOfOperation.ctr(config.cryptoKey, new aesjs.Counter(config.cryptoCount));
        var decryptedBytes = aesCtr.decrypt(encryptedBytes);
        var str = aesjs.utils.utf8.fromBytes(decryptedBytes);
        resolve({ str })
    })
}

module.exports = {
    Str2Hex,
    Hex2Str,
}
