const dns = require("dns").promises;

(async () => {
    for (var i = 0; i < 256; i++) {
        const hex = i.toString(16).padStart(2, "0");
        const address = `${hex}.spst.no`;

        const txt = await dns.resolveTxt(address);
        const cname = await dns.resolveCname(address);

        console.log(`${address} - TXT: ${txt} - CNAME: ${cname}`);
    }
})();
