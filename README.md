# @uix / icon sprite generator

> User-friendly SVG sprite generation 

## Features

- Promise API
- Supports glob file matching (patterns based on [globby](https://github.com/sindresorhus/globby))
- Fully compatible with [@uix/icons](https://stash.code.g2a.com/projects/UIX/repos/icons/browse)
- Exports sprite on disk


## Install

```
$ npm install @uix/icon-sprite-generator --save
```

## Usage

```javascript
const generator = require("@uix/icon-sprite-generator");

/* async/await */
(async () => {
    const sprite = await generator({
        output: "file.svg",
    });

    console.log(sprite);
})();

/* Promises */
generator({
    output: "file.svg",
}).then(sprite => {
    console.log(sprite);
});
```

## API

### generator([options])

Returns a Promise<String> of generated sprite.

#### options

Type: `Object`

##### input

Type: **[`globby pattern`](https://github.com/sindresorhus/globby)** (`string` `Array`)<br>
Default: `path` from **[@uix/icons](https://stash.code.g2a.com/projects/UIX/repos/icons/browse)**

Path/s to your directory with icons (supports multiple patterns).

##### output

Type: `string`<br>
Default: `false`

Provide output path and full filename (with extension) if you want to save it on disk.

**Note:** Sprite will be wrapped with JS loader in case of extension equals ".js".

##### mode

Type: `string`<br>
Default: `auto`

You can natively set mode to `jsLoader` if you want wrap sprite with JS Loader.

## JS Loader

This additional option can wrap generated sprite with JavaScript code for browsers. 
It inserts your sprite into DOM on `DOMContentLoaded` event. 

You can include this file into `<head>`. 

That's how it looks:

```js
(function() {
var ready = false;
var inject = function() {
if (ready) { return; }
ready = true;
var svgHolder = document.createElement("div");
svgHolder.className += "svg-sprites-holder";
svgHolder.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\....";
document.body.appendChild(svgHolder);
};
if (document.readyState === "complete") { inject(); }
else { document.addEventListener("DOMContentLoaded", inject); }
})();
```

## Getting Help
[framework@g2a.com](mailto:framework@g2a.com)