const lines = require("fs").readFileSync("./8a2a8e12017977d9dbf0ed33e254e94e.txt").toString().split("\n");

for (var line of lines) {
    for (var char of line) {
        process.stdout.write(parseInt(char.charCodeAt(0)) + ", ");
    }
}
