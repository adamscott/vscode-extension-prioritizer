(function() {
  document.body.style.outline = '1px solid transparent'
  document.body.style.outlineOffset = '-1px'

  function onFocus () {
    if (document.activeElement === document.body) {
      document.body.style.outlineColor = 'var(--vscode-focusBorder)'
    }
  }

  function onBlur () {
    if (document.activeElement === document.body) {
      document.body.style.outlineColor = 'transparent'
    }
  }

  window.addEventListener('focus', onFocus)
  window.addEventListener('blur', onBlur)
  document.body.addEventListener('mousedown', onBlur)
  document.body.addEventListener('mouseup', onFocus)
})()
