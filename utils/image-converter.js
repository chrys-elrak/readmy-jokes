// Path: utils/image-converter.js
const { spawnSync, exec } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

function url2base65(imageUrl) {
    if (imageUrl.startsWith('http')) {
        // read image from internet wiht curl
        const curl = spawnSync('curl', [imageUrl]);
        const image = curl.stdout;
        // convert image to base64
        const base64 = image.toString('base64');
        return base64;
    }
    // read image from local file
    const image = fs.readFileSync(imageUrl);
    // convert image to base64
    const base64 = image.toString('base64');
    return base64;
}

function main() {
    const args = process.argv.slice(2);
    const imageUrl = args[0];
    const base64 = url2base65(imageUrl);
    // copy base64 to clipboard
    console.log("WAITING FOR COPY ...");
    try {
        const child = exec(`echo ${base64} | xclip -selection clipboard`);
        child.on('exit', () => {
            child.kill();
            console.log('base64 copied to clipboard');
            process.exit(0);
        });
    } catch (e) {
        console.log('Failed to copy to clipboard');
        const file = path.join(__dirname, Date.now().toString() + '.txt');
        // write base64 to file
        fs.writeFileSync(file, base64);
        console.log('base64 saved to ' + file);
    }
}

main();