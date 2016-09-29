const test = require('tape')
const onlyOneProcess = require('../')
const {spawn} = require('child_process')

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
        onlyOneFn()
      }
    })
    return p
  }
  const onlyOneFn = onlyOneProcess(fn)
  onlyOneFn()
})
