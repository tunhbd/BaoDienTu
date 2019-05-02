

function showBaoDienTuDialog(container, dialogType = 'small', dialogTitle, dialogContent, dialogActions, dialogInitedCallback = null) {
  const DIALOG_UI =
    `<div class="modal fade bao-dien-tu-dialog" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog bao-dien-tu-dialog-${dialogType}" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title bao-dien-tu-dialog__title">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body bao-dien-tu-dialog__content">
          
          </div>
          <div class="modal-footer bao-dien-tu-dialog__actions">
            <button type="button" class="btn btn-secondary btn-close" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>`
  container.append(DIALOG_UI)
  let dialogObj = $('.bao-dien-tu-dialog')

  dialogObj.on('show.bs.modal', () => {
    dialogInitedCallback !== null && dialogInitedCallback()
  })

  dialogObj.on('shown.bs.modal', () => {
    dialogInitedCallback !== null && dialogInitedCallback()
  })

  dialogObj.on('hidden.bs.modal', function (e) {
    dialogObj.remove()
  })

  dialogObj.on('hide.bs.modal', function (e) {
    dialogObj.remove()
  })

  $('.bao-dien-tu-dialog__title').html(dialogTitle)
  $('.bao-dien-tu-dialog__content').html(dialogContent)

  let actionsObj = $('.bao-dien-tu-dialog__actions')
  dialogActions.forEach(action => {
    let btn = $(`<button type="button" class="btn btn-success ${action.class}" data-dismiss="modal">${action.title}</button>`)
    btn.click(() => {
      dialogObj.modal('hide')
      action.callback()
    })

    actionsObj.append(btn)
  });

  
  dialogObj.modal('show')
}