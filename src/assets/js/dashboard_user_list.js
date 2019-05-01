function initPageCountFromUserList() {
  pageCount = Math.ceil(usersList.length / userCountPerPage)
  console.log('page count', pageCount)
}

function generateUserItemControlTooltip() {
  let controlObj = $('<td class="user-list__cell user-list__control"></td>')

  let controlIconObj = $('<i class="fas fa-ellipsis-v user-list__control-icon"></i>')
  controlObj.append(controlIconObj)

  let controlMenuObj = $(`<div class="btn-group user-list__control-menu" role="group" aria-label="Basic example"></div>`)

  let controlMenuButtonsObj = $('<div class="user-list__control-menu__buttons"></div>')
  controlMenuObj.append(controlMenuButtonsObj)

  let editBtn = $('<button type="button" class="btn btn-secondary user-list__control-menu__buttons__button user-list__control-menu__buttons__button-edit"><i class="fas fa-pen"></i></button>')
  controlMenuButtonsObj.append(editBtn)
  editBtn.click(() => {

  })
  let deleteBtn = $('<button type="button" class="btn btn-secondary user-list__control-menu__buttons__button user-list__control-menu__buttons__button-delete"><i class="fas fa-times"></i></button>')
  controlMenuButtonsObj.append(deleteBtn)
  deleteBtn.click(() => {

  })

  controlObj.mouseenter(() => {
    controlMenuObj.fadeIn(100)

    controlMenuObj.mouseenter(() => {
      controlMenuObj.show()
    })
    controlMenuObj.mouseleave(() => {
      controlMenuObj.hide()
    })
  })
  controlObj.mouseleave(() => {
    controlMenuObj.fadeOut(100)
  })

  controlObj.append(controlMenuObj)

  return controlObj
}

function generateUserItem(user) {
  let userObj = $('<tr class="user-list__row"></tr>')

  let userUserObj = $('<td class="user-list__cell user-list__cell-user"></td>')

  let avatarObj = $(`<img src="${user.avatar}" />`)
  userUserObj.append(avatarObj)

  let userNameObj = $(`<span>${user.fullname}</span>`)
  userUserObj.append(userNameObj)

  userObj.append(userUserObj)

  let userAccountObj = $(`<td class="user-list__cell">${user.account}</td>`)
  userObj.append(userAccountObj)

  let userBirthdayObj = $(`<td class="user-list__cell">${formatVietnameseDate(user.birthday)}</td>`)
  userObj.append(userBirthdayObj)

  let userRuleObj = $(`<td class="user-list__cell">${user.rule}</td>`)
  userObj.append(userRuleObj)

  let userStatusObj = $(`<td class="user-list__cell">${user.status}</td>`)
  userObj.append(userStatusObj)

  userObj.append(generateUserItemControlTooltip())

  return userObj
}

function initUserListUI() {
  $('.user-list__content').html('')
}

function showUserList(pageNum) {
  let usersListContainer = $('.user-list__content')
  let startPos = (pageNum - 1) * userCountPerPage
  let endPos = pageNum * userCountPerPage
  endPos = endPos > usersList.length ? usersList.length : endPos

  usersListContainer.html('')
  for (let index = startPos; index < endPos; index++) {
    usersListContainer.append(generateUserItem(usersList[index]))
  }
}