function formatVietnameseDate(dateStr) {
  let date = new Date(dateStr)
  let returnDateStr = `${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}/${date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}/${date.getFullYear()}`

  return returnDateStr
}

const STATUS = {
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
}

function toastify(status, message) {
  if (!$('.toast-container')) {
    let toastContainer = $('<div class="toast-container"></div>')
    $('body').append(toastContainer)
  }
  if (status === STATUS.SUCCESS) {
    let toastItem = $(`<div class="alert alert-success toast-item" role="alert">${message}</div>`)
    $('.toast-container').append(toastItem)
    setTimeout(function () {
      toastItem.fadeOut(300).remove()
    }, 2000)
  }

}