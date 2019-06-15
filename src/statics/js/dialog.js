function closeDialog() {
  $('.bao-dien-tu-dialog').fadeOut(500).remove()
}

function showBaoDienTuDialog(container, dialogType = 'small', dialogTitle, dialogContent, dialogActions = [], dialogInitedCallback = null) {
  const DIALOG_UI =
    `<div class="modal d-block bao-dien-tu-dialog bao-dien-tu-scrollbar" aria-hidden="true">
      <div class="modal-dialog bao-dien-tu-dialog-style-zoom  bao-dien-tu-dialog-${dialogType}" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title bao-dien-tu-dialog__title">${dialogTitle}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" onclick="closeDialog()">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body bao-dien-tu-dialog__content">
            ${dialogContent}
          </div>
          <div class="modal-footer bao-dien-tu-dialog__actions">
            <button type="button" class="btn btn-secondary btn-close" onclick="closeDialog()">Close</button>
          </div>
        </div>
      </div>
    </div>`

  let dialog = $(DIALOG_UI)

  let dialogObj = $('.bao-dien-tu-dialog')

  // dialogObj.on('show.bs.modal', () => {
  //   dialogInitedCallback !== null && dialogInitedCallback()
  // })

  // dialogObj.on('shown.bs.modal', () => {
  //   dialogInitedCallback !== null && dialogInitedCallback()
  // })

  // dialogObj.on('hidden.bs.modal', function (e) {
  //   dialogObj.remove()
  // })

  // dialogObj.on('hide.bs.modal', function (e) {
  //   dialogObj.remove()
  // })

  // dialog.children('.bao-dien-tu-dialog__title').html(dialogTitle)
  // dialog.children('.bao-dien-tu-dialog__content').html(dialogContent)

  let actionsObj = dialog.find('.bao-dien-tu-dialog__actions')
  dialogActions.forEach(action => {
    let btn = $(`<button type="${action.type ? action.type : 'button'}" ${action.type ? `form="${action.form}"` : ''} class="btn ${action.class}">${action.title}</button>`)
    action.callback !== null && btn.click(() => {
      action.callback()
    })
    actionsObj.append(btn)
  });
  console.log(actionsObj.html())
  container.append(dialog)

  dialogInitedCallback !== null && dialogInitedCallback()
}