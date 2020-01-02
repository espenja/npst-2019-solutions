const axios = require("axios");

for(var i = 0; i < 256; i++) {
    const hex = i.toString(16).padStart(2, "0");
    const address = `https://${hex}.spst.no`;
    axios.get(address)
        .then(response => {
            console.log(`${address}: ${response.data}`)
        })
        .catch(error => {
            console.log(`${address}: Nothing found`)
        });
}
