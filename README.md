# Screenshoteer

forked from [vladocar/screenshoteer](https://github.com/vladocar/screenshoteer)

## Installation

```shell script
# Using Ubuntu Node.js v14.x
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -

sudo apt install -y nodejs

# program
git clone https://github.com/jansanw/screenshoteer.git

cd screenshoteer & npm install
```

## run as server

```shell script
    NODE_PATH=/usr/bin/node PORT=8060 /usr/bin/node ./server.js

    # proxy supported
    NODE_PATH=/usr/bin/node PORT=8060 PROXY=127.0.0.1:1080 /usr/bin/node ./server.js

```

### fetch
```
http://localhost:8060/screenshot?url=https://www.baidu.com

# and surpprt command params
http://localhost:8060/screenshot?url=https://www.baidu.com&w=375
```

## run as command

```shell script
node ./index.js  --url https://www.example.com

or .html localy copy the url path from the browser

node ./index.js --url file:///Users/../index.html
node ./index.js --url file:///C:/Users/../Random-HTML-file.html
```

```
Parameters:  


-h help  
--url web page url  
--proxy use a proxy  
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
--file - output file name (optional, otherwise based on page title and timestamp)
--theme - switch to dark or light color theme
--vd - Emulate vision deficiency 'achromatopsia', 'deuteranopia', 'protanopia', 'tritanopia', 'blurredVision', and 'none'
```

### Example: 

```shell script
node ./index.js  --url https://news.ycombinator.com --fullpage false

node ./index.js --url https://www.baidu.com --file google.png

node ./index.js  --url https://www.reddit.com/r/nodejs --emulate "iPhone 7"

node ./index.js  --url https://www.nytimes.com  --emulate "Nexus 4"

node ./index.js --url https://www.reddit.com/r/javascript/ --w 600 --h 800 --fullpage false

node ./index.js --url https://www.reddit.com/r/javascript/ --w 600 --h 0 --fullpage false

node ./index.js --url https://lobste.rs --pdf

node ./index.js --url https://lobste.rs --w 500

node ./index.js --url  https://news.ycombinator.com/item?id=18598672 --el ".fatitem"

node ./index.js --url  https://site.com --auth "username;password"

node ./index.js --url https://www.nytimes.com --no "image"

node ./index.js --url https://www.nytimes.com --no "script"

node ./index.js --url https://www.economist.com/ --click ".ribbon__close-button"

node ./index.js --url file:///Users/../index.html

node ./index.js --url https://www.slashdot.org --file /tmp/slashdot.png

node ./index.js --url https://mxb.dev/blog/color-theme-switcher/ --theme dark

node ./index.js --url https://news.ycombinator.com --vd blurredVision
```

