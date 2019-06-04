function showLoading(target) {
  $(target).css('pointer-events', 'none')
  var mask = $('<div class="loading-mask"></div>')
  $(target).append(mask)

  var opts = {
    lines: 9, // The number of lines to draw
    length: 19, // The length of each line
    width: 3, // The line thickness
    radius: 19, // The radius of the inner circle
    scale: 0.95, // Scales overall size of the spinner
    corners: 0.4, // Corner roundness (0..1)
    color: '#e91e63', // CSS color or array of colors
    fadeColor: 'transparent', // CSS color or array of colors
    speed: 1.4, // Rounds per second
    rotate: 23, // The rotation offset
    animation: 'spinner-line-fade-more', // The CSS animation name for the lines
    direction: 1, // 1: clockwise, -1: counterclockwise
    zIndex: 2e9, // The z-index (defaults to 2000000000)
    className: 'spinner', // The CSS class to assign to the spinner
    top: '50%', // Top position relative to parent
    left: '50%', // Left position relative to parent
    shadow: '0 0 1px transparent', // Box-shadow for the lines
    position: 'absolute' // Element positioning
  };

  var loading = new Spinner(opts).spin(document.querySelector('.loading-mask'));

  return {
    loading,
    target,
    mask,
    maskSelector: '.loading-mask',
  }
}

function hideLoading(loading) {
  loading.loading.stop()
  $(loading.target).css('pointer-events', 'auto')
  $(loading.mask).remove()
}