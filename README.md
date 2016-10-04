# exclusive-process

Use this when you have a function that creates and returns a child process, and you want that process to be killed and recreated on successive calls so that there is only one process.

## install

```sh
npm install exclusive-process
```

## example

```js
const exclusiveProcess = require('exclusive-process')

const fn = () => spawn('whatever')
const exclusiveFn = exclusiveProcess(fn)

exclusiveFn() // start process
exclusiveFn() // kill running process and start again
```

## API

### exclusiveProcess(fn)

- `fn: function` a function that creates and returns a child process
- **returns**: `function` a function that calls `fn` after killing the process from the previous call. Arguments are passed through to `fn`.


