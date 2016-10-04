function exclusiveProcess (fn) {
  let p
  return (...args) => {
    p && p.kill()
    p = (() => {
      const _p = fn(...args).on('close', () => {
        if (_p === p) {
          p = undefined
        }
      })
      return _p
    })()
    return p
  }
}

module.exports = exclusiveProcess
