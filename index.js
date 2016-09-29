function onlyOneProcess (fn) {
  let p
  return () => {
    p && p.kill()
    p = (() => {
      const _p = fn().on('close', () => {
        if (_p === p) {
          p = undefined
        }
      })
      return _p
    })()
    return p
  }
}

module.exports = onlyOneProcess
