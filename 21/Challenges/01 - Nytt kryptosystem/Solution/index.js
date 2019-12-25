const crypto = require("crypto");

const aes256gcm = key => {
    const ALGO = "aes-256-gcm";
    const decrypt = (enc, iv, authTag) => {
        const decipher = crypto.createDecipheriv(ALGO, key, iv);
        decipher.setAuthTag(authTag);
        let str = decipher.update(enc, "hex", "utf8");
        str += decipher.final("utf8");
        return str;
    };

    return {
        decrypt
    };
};

function bin2hex(b) {
    return b.match(/.{4}/g).reduce(function(acc, i) {
        return acc + parseInt(i, 2).toString(16);
    }, "");
}

function hex2bin(h) {
    return h.split("").reduce(function(acc, i) {
        return acc + ("000" + parseInt(i, 16).toString(2)).substr(-4, 4);
    }, "");
}

console.log(new Buffer(crypto.randomBytes(16), "utf8"));

const iv = Buffer.from("d97c2e3410f37ac7b5dcd8df", "hex");
const authTag = Buffer.from("76fe172806c0b41816887630ca74f2f8", "hex");
const cipherText =
    "69cf99390e143fbab3ea8326c05b2fde58c964555bd673de10ff4cf2bf49586454b0466afd01c36b0e4dc1e3361d8ffec8998d88c13b6ff83798a4607b86f3d14f20f63486d256e65d2164ac90a931d7c36fed071321298ce6eb4206bbc31dbdbd08d72dca0f5ce486e68979f083e0e4f46d1f0eee0fec2aa48de030cb2f2069eb719563443c324b052a913e5007f114de4ed7ae44044c03278e2392b46e7815626424d735196f93adc446c4a4a30373e936fa7164112d0867e63e63a4d809d10e90e805130eb7114422ae17fddd3a272cee6100087fb37eb0268ab187721fc7e8dc8b2b79e91a1d9e276a16bcb79c36a7c91b127ea3b08fe57a33ba7d0767e35508b4ab2127aa0a2948cd2a1aace305a49cf63d03a41ca110e9d04636a85956aa1b9eac89bc4091ab59bd1ea9d9cd1c225422a7a40ef56d4b65d1e56f138df24dcf74557a72ba055160f82bf39470f785b12633584ae9639a4352ef08fe5c7f788b0f83021ccf13d7a99a0c088abf72ccc36a30e2447ce10157113a56461bfafd68be40f6f79dbdf2c901028cfe06a96e5ab9a1121c7e2d8b91e495c9722b2cd97d378844328bfba9870b814df60282fec98f70d1639d35205d399d0a858a5cf7210cd9110faecc55c79ae7fe963d908aaa8a34d68b4c0556aeaa4db1ec74cd321b249602c24dabc961b30ae456199fb1deca09f36cdf8a5d9b0b492e42f7f841cb4627880f9fdd4b2e2d94a553c61c5c9a0a253a4616af93310eb7a55a74316d595c017cd2953e505d893f85f324a50fecd459e6bce60294aef9e34b7d57c98f4e9dc5e09a9a6fe620865308d807d767e4c9fec6041b58d003b152d18473e8ce5a9bfe5203b748945a8f4c4683177b09c6b97603d37451a6220c7cf94fa4cb2f8c26331e08f8b8035acebdeaba4cec24bbdacad448b332ba67d355a91363d13a4030a7f4e5b3e0d12a5cca08d6431e356a1bf5050c9bb6373a375a58909cb59d851c0da4905a62389aef2809e354fb2d6b672071ded673f50a3ca475b229999d5a8566e3d7742a271c91f97d8182cb6dcbd3811276cea2386e66b10f047f5cfd0628e3a55ed420412a4fd1b568ef4a62384694dc6b966defe4226afcc545ff10cd61c181d5df9ce6011995df72a219f45ac44eccc63450989df746edbc7165ae008caa158c9298e6c8f8907be02c89313ec55be8eef3521a251518e394071b9deb5af8d2273cf7fe2ed9ddc96609a8057ca50e5a5c1b0a9b9e4dfa04e58be60feee17632dd713257916416471560c82da72e49962d1bfcda8db174948765bfc51159e98d38cad9a7ba51a7c8658af998534a6b223d25ba4805c4a12bf0807e043abc0b47e4562a800b6f79fca703bbd93b1c617d3a8b9244ebfcaffd7f8e44440a20ce1ed7ab8039d5cf182c7c16e7be51856ac8a516ca25acf79001af3612d7b4d304c2a5b9671620b80db4fedca8df2ec6b57ddbcf4fe9ece3da44bf47e0f3b21b61f0699e6c38a3169b2890f57636757a894caf22879b1515d1aa00ee8131d3cf7b61ab9c747690bd6ef3d93ed002c1f3a8e9b7a6b056f76cad42d67ae3f01c1d8d4d8576b950efe65b6312b700f2000f8c3821a70ba1e4800b5bdb4223f9db27c509495eb638025c4dc898c13ae9f86c944e5428209a111701bc4e2db44a7c890774b0063e20158fd0d9cebf4f05d40c74afd168d0e8968b14a56c95b0a3b657cbe0ad270170e4154d596c112156c2a9a9fc30898be1f362ca2ce1fe4e4399ab8ea3735b8f091ada9d613411b54760b7c39c956f225bb9724bd4fd8174a4703151d1b5acf2c979f446d8a33036ec652add04478a44f34bab617f15ed40451cf7603ead7f8f58f8e2fc02ca7c75c7d37cbcd9f09811abd881ef16a15e6bb4e1fe37ff96fe03421286fe37f19120fc66a105fb2b1ee0cbd19feb4e9f20b02fc5d06f6b0d8bbf393da408e2f7e7cae536852b5f81690596e78b66ca1ec10af873a8acd62cb716bdb40107019e7f3acb4d11d3e50590c2ca485c0b4a47f0c28847ee0afaa617284e5ef1fcf9fc5ec00c6cc2404016a565e4154538f93d0adee6cdb72665efb4a319a98dd58dd81e52263516a006c037a27ad249ce0efd69e4f6a685a1b6404e95938325bb1b2db35984bc37c4e9751825aaa592089511344328c84e18a470b718e3a3fa7cd6f06cf2c2352d5e6895c734bf1c8d22eb9c2037378f0609211298f71fa633ed923f31c934b05ece2375bbf700f4fd30525a20a510b7f0102f24ff2b7eb76ac77d98bc";

var keyHex = "800816b1629bcfa519f57a502a6a841298a9f5c20203d8818fdd18271a3b1682";
var binary = hex2bin(keyHex);

var counter = 0;

for (var i = 0; i < binary.length; i++) {
    for (var j = 0; j < 2; j++) {
        for (var k = i + 1; k < binary.length; k++) {
            for (var m = 0; m < 2; m++) {
                var shifted = binary.split("");
                shifted[i] = j;
                shifted[k] = m;

                var binshifted = shifted.join("");
                var hexkey = bin2hex(binshifted);
                const KEY = Buffer.from(hexkey, "hex");
                const aesCipher = aes256gcm(KEY);
                counter++;
                console.log(binshifted);

                try {
                    const decrypted = aesCipher.decrypt(cipherText, iv, authTag);
                    console.log(decrypted);
                    console.log("Faulty key : " + keyHex);
                    console.log("Correct key: " + hexkey);
                    console.log("Number of tries: " + counter);
                    return;
                } catch (e) {}
            }
        }
    }
}
