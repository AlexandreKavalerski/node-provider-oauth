var aesjs = require('aes-js');

// Bibliotecas para encriptação
var crypto = require('crypto'),
algorithm = 'aes-256-ctr';

// An example 128-bit key (16 bytes * 8 bits/byte = 128 bits) 
var key = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ];

module.exports = {
    criptoToHex: function (texto){
    
        var textoBytes = aesjs.utils.utf8.toBytes(texto);
        var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
        var encryptedBytes = aesCtr.encrypt(textoBytes);

        var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
        return encryptedHex;
    },
    decriptFromHex: function (texto){
        
        var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
    
        var encryptedBytes = aesjs.utils.hex.toBytes(texto);
      
        var decryptedBytes = aesCtr.decrypt(encryptedBytes);
      
        // Convert our bytes back into text 
        var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
        
        return decryptedText;          
    }
}
