const test = require('tape')
const exclusiveProcess = require('../')
const {spawn, ChildProcess} = require('child_process')

const code = `
  let c = 0
  setInterval(() => {
    ++c
    console.log(c)
  }, 50)
`

test('sanity check - unwrapped process fn', t => {
  t.plan(3)
  const fn = () => {
    const p = spawn('node', ['-e', code])
    p.stdout.on('data', data => {
      t.equal(String(data), (t.assertCount + 1) + '\n', `data is "${data}"`)
      if (t.assertCount === 3) {
        p.kill()
      }
    })
    return p
  }
  fn()
})

test('kills old process', t => {
  t.plan(3)
  const fn = () => {
    const p = spawn('node', ['-e', code])
    p.stdout.on('data', data => {
      t.equal(String(data), '1\n', `data is "${data}"`)
      if (t.assertCount === 3) {
        p.kill()
      } else {
        exclusiveFn()
      }
    })
    return p
  }
  const exclusiveFn = exclusiveProcess(fn)
  exclusiveFn()
})

test('returns new process', t => {
  t.plan(3)
  const fn = () => spawn('node', ['-e', code])
  const exclusiveFn = exclusiveProcess(fn)
  const a = exclusiveFn()
  const b = exclusiveFn()
  a.kill()
  b.kill()
  t.true(a instanceof ChildProcess, 'return value is a ChildProcess')
  t.true(b instanceof ChildProcess, 'return value is a ChildProcess')
  t.notDeepEqual(a, b, 'a different process was returned on the next call')
})

test('arguments pass through', t => {
  t.plan(1)
  const fn = (a) => spawn ('node', ['-e', `console.log('${a}')`])
    .stdout.on('data', data => {
      t.equal(String(data), 'abc\n')
    })
  const exclusiveFn = exclusiveProcess(fn)
  exclusiveFn('abc')
})
