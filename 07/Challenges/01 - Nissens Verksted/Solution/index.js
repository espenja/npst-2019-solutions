var findImages = () => {
    // Find all the images
    const images = document.getElementsByTagName("img");
    const numberOfImages = images.length;

    const lookup = {};
    let counter = 0;

    // Create a canvas that we can use to draw and get pixel data
    const body = document.getElementsByTagName("body")[0];
    const canvas = document.createElement("canvas");
    canvas.width = 60;
    canvas.height = 60;

    body.insertBefore(canvas, document.getElementsByTagName("img")[0]);

    const context = canvas.getContext("2d");

    // Iterate over all of the pictures
    for (var image of images) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        canvas.width = image.width;
        canvas.height = image.height;
        try {
            context.drawImage(image, 0, 0, image.width, image.height);
        } catch (exception) {
            continue;
        }

        let sum = 0;

        // Get pixel data and create a sort of checksum for each picture by summing the Red value for each pixel
        // To make this a bit more efficient, we just focus on a small 10x10 square of the picture
        // 10x10 * 12 202 === 1 220 200 pixels to check, 60x60 * 12 202 === 43 927 200 pixels to check
        for (var x = 30; x < 40; x++) {
            for (var y = 30; y < 40; y++) {
                const pixelData = context.getImageData(x, y, 1, 1).data;
                sum += pixelData[0];
            }
        }

        // Store the checksum in a lookup table, so we can keep track of how many equal checksums there are
        if (lookup[sum] === undefined) {
            lookup[sum] = [];
        }

        console.log((++counter / numberOfImages).toFixed(2) * 100 + "%");
        lookup[sum].push(image);
    }

    // Iterate over all lists that have more than 3 equal checksums,
    // and remove the images from the DOM, leaving only the unique ones
    for (var list of Object.values(lookup).filter(list => list.length > 3)) {
        for (var image of list) {
            image.remove();
        }
    }
};
