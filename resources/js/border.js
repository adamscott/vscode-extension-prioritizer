(function() {
  const borderElement = document.getElementById("ep-border")

  function onFocus () {
    borderElement.style.visibility = 'visible'
  }

  function onBlur () {
    borderElement.style.visibility = 'hidden'
  }

  window.addEventListener('focus', onFocus)
  window.addEventListener('blur', onBlur)
})()
