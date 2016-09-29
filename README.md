# only-one-process

Use this when you have a function that creates and returns a child process, and you want that process to be killed and recreated on successive calls so that there is only one process.

Takes a function that creates and returns a child process.

## install

```sh
npm install only-one-process
```

## example

```js
const onlyOneProcess = require('only-one-process')

const fn = () => spawn('whatever')
const onlyOneFn = onlyOneProcess(fn)

onlyOneProcess() // start process
onlyOneProcess() // kill running process and start again
```

## API

### onlyOneProcess(fn)

- `fn: function` a function that creates and returns a child process
- **returns**: `function` a function that calls `fn` after killing the process from the previous call


