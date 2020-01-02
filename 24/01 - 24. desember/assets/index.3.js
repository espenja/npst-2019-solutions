const { Resolver } = require("dns").promises;

const dns = new Resolver();
dns.setServers(["1.1.1.1"]);

const list = [];

const slowLookup = async i => {
    i = i.toString(16);
    if (i.length < 2) i = "0" + i;
    const site = i + ".spst.no";

    const txt = await dns.resolve(site, "TXT");
    const cname = await dns.resolve(site, "CNAME");
    list.push({
        cname: cname[0],
        txt: txt[0].join(""),
        site: site
    });
    console.log(i + ": " + cname + " - " + txt);
};

const fastLookup = async () => {
    const promises = Array.from(Array(256).keys()).map(async index => {
        let hex = index.toString(16).padStart(2, "0");
        const site = hex + ".spst.no";

        return Promise.all([dns.resolveCname(site), dns.resolveTxt(site)])
            .then(([cname, txt]) => {
                return {
                    i: index,
                    hex: hex,
                    site: site,
                    cname: cname[0],
                    txt: txt[0].join("")
                }
            })
            .catch(error => {
                console.log(error);
                return error;
            })
    });

    return await Promise.all(promises);
};

const runQueries = async () => {
    const now = new Date();

     // Slow lookup, in case we hit dns caching issues
    // for (let i = 0; i < 256; i++) {
    //     await slowLookup(i);
    // }
    
    // Fast lookup
    let list = undefined;
    try {
        list = await fastLookup();
    } catch (error) {
        console.log(error.message);
    }

    var root = list.find(c => c.cname === "slutt.spst.no");

    if (root === undefined) {
        console.log(now.toString() + ": Could not find slutt.spst.no");
        return;
    }

    let value = "";
    while (root !== undefined) {
        value += root.txt;
        root = list.find(c => c.cname == root.site);
    }

    console.log(value);
    const reversedValue = [...value].reverse().join("");
    console.log(reversedValue);
};

runQueries();
