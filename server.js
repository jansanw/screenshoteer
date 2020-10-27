const http = require('http');
const url = require('url');
const fs = require('fs');
const util = require('util');
const crypto = require('crypto');
const {exec} = require('child_process');

const port = process.env.PORT || 8060
const proxy = process.env.PROXY || ''
const NODE_PATH = process.env.NODE_PATH || 'NODE_PATH'

const help = `
Path:
/screenshot

Parameters:  
-h help  
--url web page url  
--emulate - emulate web device example: --emulate "Huawei Meta 40"  
--fullpage - can be true or false. It will take screenshot of entire web page if is true. True is the default parameter.  
--pdf - generate additional pdf  
--w - width of the Web Page in px  
--h - height of the Web Page in px  
--waitfor - wait time for the page load in milliseconds  
--waitforselector - wait for the selector to appear in page
--el - css selector document.querySelector  
--auth - basic http authentication  
--no - exclude "image", "stylesheet", "script", "font"  
--click - example: ".selector>a" excellent way to close popups or to click some buttons on the page.  
--theme - switch to dark or light color theme
--vd - Emulate vision deficiency 'achromatopsia', 'deuteranopia', 'protanopia', 'tritanopia', 'blurredVision', and 'none'
`
// --proxy use a proxy
// --file - output file name (optional, otherwise based on page title and timestamp)

const server = http.createServer();

server.on('request', async (request, response) => {
    const {pathname, query} = url.parse(request.url);
    console.log(pathname, query)
    switch (pathname) {
        case '/screenshot/': {
            try {
                const stream = await screenshot(query)
                const contentType = 'image/png';
                response.writeHead(200, {
                    'Content-Type': contentType
                });
                response.write(stream, "binary");
                response.end();
            } catch (err) {
                response.writeHead(500, {
                    'Content-Type': 'text/plain'
                });
                response.end(err);
            }
            break
        }
        default: {
            response.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            response.end(help);
        }
    }

});

function screenshot(query) {
    const filename = `/tmp/${md5(query)}.png`
    const command = util.format(`${NODE_PATH} ./index.js --file %s --%s`,
        filename,
        query.replace(/&/g, ' --').replace(/=/g, ' '))
        + (proxy ? ` --proxy ${proxy}` : '')
    console.log(command)

    return new Promise((resolve, reject) => {
        exec(command, (err, stdout, stderr) => {
            if (err) {
                console.log(err);
                reject(err)
                return;
            }
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);

            fs.readFile(filename, "binary", function (err, stream) {
                if (err) {
                    reject(err)
                } else {
                    resolve(stream)
                }
            });
        })
    })
}

// 以md5的格式创建一个哈希值
function md5(data) {
    let hash = crypto.createHash('md5');
    return hash.update(data).digest('base64');
}

server.listen(port);