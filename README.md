# spfx-vue-sfc-one-file
This sample demonstrates how to use SPFx web part with Vue.js and single file components without splitting code and styles between separate files. This approach uses common Vue "all-in-one" style.   
This sample is more like POC and has some drawbacks\issues, which might adressed in the future. For now I still think safer approach is using separate `.ts` and `.css` (`.scss` or whatever) files when building SPFx web parts with Vue, like demonstarted [here](https://github.com/SharePoint/sp-dev-fx-webparts/tree/master/samples/vuejs-todo-single-file-component)  

## Minimal path to awesome: 
1. Clone the repo
2. `npm i`
3. `gulp serve`

## Issues
 - Latests version of Typescript doesn't work (2.2.<b>2</b>). This package use 2.2.<b>0</b> which is working. The reason is that TS since 2.2.2 version included `whatwg-fetch` into the core defenitions, SPFx from the other side uses `@types/whatwg-fetch`, as a result multiple "duplicate identifier" errors. SPFx uses it's own version of TS (2.1.6 currently) and in general it's good to use the same version for you build. But, as said, 2.2.0 also works
 - build approxemetly 2-2.5x times slower in comparison to "normal" approach. Difficualt to use watchers
 - many changes to build pipeline, SPFx's `typescript` task is disabled and replaced with webpack's `ts-loader`. May be that's not so bad, but who knows..
 - there are some issues with source maps - difficult to identify the right file with source code
 - general issues with `.vue` files - intellisense, real time type checking, etc.

 ## Brief overview of changes
  1. Almost all changes are about `gulpfile.js` and build pipeline. 
  2. TS code, html template, styles are in `.vue` file. 
  3. `tsconfig.json` - add "`include`" option to explicitly provide source folder (otherwise `duplicate identifier`, `cannot redeclare variable`, etc. errors)
  4. `gulpfile.js`:
     - disable `typescript` task - `build.typescript.enabled = false;`
     - in bundle name replace `.js` with `.ts` - `config.entry['to-do.bundle'] = config.entry['to-do.bundle'].replace('ToDoWebPart.js', 'ToDoWebPart.ts');`
     - add extensions to resolve option: `extensions: ['', '.ts', '.js']`
     - configure `ts-loader` and `vue-loader`
     - update copy static assets task to include `.ts` as well as other files: `['vue', 'scss', 'ts', 'js']`
 5. Some values in `gulpfile.js` hardcoded and code can be improved