const crypto = require("crypto");

// Create arrays of allowed characters in ASCII-table-order
var signs = [..."!#%&()*"];
var number = [..."0123456789"];
var signs2 = [..."@"];
var upper = [..."ABCDEFGHIJKLMNOPQRSTVUWXYZ"];
var signs3 = [..."^"];
var lower = [..."abcdefghijklmnopqrstuvwxyz"];
var signs4 = [..."{}~"];

// Make the valid combos ready
var combo = [signs, number, upper, lower];
var combo2 = [number, signs2, upper, lower];
var combo3 = [number, upper, signs3, lower];
var combo4 = [number, upper, lower, signs4];

// Make an array of all valid combos of combos
var comboOfCombos = [combo, combo2, combo3, combo4];

// Recursive function to generate (almost) valid passwords
const generatePasswords = (arrays, arrayIndex) => {
    if (arrayIndex === arrays.length - 1) return arrays[arrayIndex].map(c => "" + c);

    let passwords = [];

    for (var i = 0; i < arrays[arrayIndex].length; i++) {
        var password = "" + arrays[arrayIndex][i];
        var newPasswords = generatePasswords(arrays, arrayIndex + 1);

        if (newPasswords && newPasswords.length > 0) {
            passwords = [...passwords, ...newPasswords.map(newPassword => password + newPassword)];
        } else {
            passwords.push(password);
        }
    }

    return passwords;
};

const targetHash = "42f82ae6e57626768c5f525f03085decfdc5c6fe";

// Iterate over all valid combos and generate (almost) valid passwords
for (var combo of comboOfCombos) {
    var generatedPasswords = generatePasswords(combo, 0);

    // Iterate over all generated passwords
    for (var password of generatedPasswords) {
        // Create a SHA-1 hash of our generated password
        const sha1 = crypto.createHash("sha1");
        const sha1Hash = sha1.update(password).digest("hex");

        // Compare it with the known password hash
        if (sha1Hash == targetHash) {
            console.log("Username: admin");
            console.log("Password: " + password);
            return;
        }
    }
}
