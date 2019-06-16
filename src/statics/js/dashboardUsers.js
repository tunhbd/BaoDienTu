// function initPageCountFromUserList() {
//   pageCount = Math.ceil(usersList.length / userCountPerPage)
// }

// function generateUserItemControlTooltip(user) {
//   let controlObj = $('<td class="user-list__cell user-list__control"></td>')

//   let controlIconObj = $('<i class="fas fa-ellipsis-v user-list__control-icon"></i>')
//   controlObj.append(controlIconObj)

//   let controlMenuObj = $(`<div class="btn-group user-list__control-menu" role="group" aria-label="Basic example"></div>`)

//   let controlMenuButtonsObj = $('<div class="user-list__control-menu__buttons"></div>')
//   controlMenuObj.append(controlMenuButtonsObj)

//   let editBtn = $('<button type="button" class="btn btn-secondary user-list__control-menu__buttons__button user-list__control-menu__buttons__button-edit"><i class="fas fa-pen"></i></button>')
//   controlMenuButtonsObj.append(editBtn)
//   editBtn.click(() => {
//     $.get({
//       url: `/dashboard-ui/edit-user/${user.rule}`,
//       data: {},
//       success: function(data) {
//         showBaoDienTuDialog(
//           $('body'),
//           'small',
//           'Edit User',
//           data,
//           [
//             {
//               title: 'Save',
//               callback: function() {

//               }
//             }
//           ],
//           function() {
//             showExistsUserData(user)
//           }
//         )
//       },
//       dataType: 'html'
//     })
//   })
//   let deleteBtn = $('<button type="button" class="btn btn-secondary user-list__control-menu__buttons__button user-list__control-menu__buttons__button-delete"><i class="fas fa-times"></i></button>')
//   controlMenuButtonsObj.append(deleteBtn)
//   deleteBtn.click(() => {
//     showBaoDienTuDialog($('body'), 'small', 'Deleting user confirmation', 'Do you want to delete this user?', [
//       {
//         title: 'Yes, I want',
//         callback: () => {
//           usersList = usersList.filter(userData => userData.account !== user.account)
//           let selectedPageNum = paginationObj.pagination('getSelectedPageNum')
//           selectedPageNum = selectedPageNum > Math.ceil(usersList.length / userCountPerPage) ? selectedPageNum - 1 : selectedPageNum

//           showDataListWithPagination(userCountPerPage, $('.pagination'), usersList, $('.user-list__content'), generateUserList)
//           paginationObj.pagination('go', selectedPageNum)
//         }
//       }
//     ])
//   })

//   controlObj.mouseenter(() => {
//     controlMenuObj.fadeIn(100)

//     controlMenuObj.mouseenter(() => {
//       controlMenuObj.show()
//     })
//     controlMenuObj.mouseleave(() => {
//       controlMenuObj.hide()
//     })
//   })
//   controlObj.mouseleave(() => {
//     controlMenuObj.fadeOut(100)
//   })

//   controlObj.append(controlMenuObj)

//   return controlObj
// }

// function showExistsUserData(user) {
//   if (user.rule === USERS.EDITOR) {
//     user.assigned_categories.forEach(categoryId => {
//       $(`#category-${categoryId}`).attr('checked', true)
//     });
//   }
//   else if (user.rule === USERS.SUBSCRIBER) {
//     setEventForEdituser()
//     $('#expirationDateInput').val(user.expiration_usage)
//   }
// }

// function setEventForEdituser() {
//   $('#expirationDateInput').datepicker({
//     minDate: new Date(),
//   })
// }

// function generateUserItem(user) {
//   let userObj = $('<tr class="user-list__row"></tr>')

//   let userUserObj = $('<td class="user-list__cell user-list__cell-user"></td>')

//   let avatarObj = $(`<img src="${user.avatar}" />`)
//   userUserObj.append(avatarObj)

//   let userNameObj = $(`<span>${user.fullname}</span>`)
//   userUserObj.append(userNameObj)

//   userObj.append(userUserObj)

//   let userAccountObj = $(`<td class="user-list__cell">${user.account}</td>`)
//   userObj.append(userAccountObj)

//   let userBirthdayObj = $(`<td class="user-list__cell">${formatVietnameseDate(user.birthday)}</td>`)
//   userObj.append(userBirthdayObj)

//   let userRuleObj = $(`<td class="user-list__cell">
//     ${
//     user.rule === USERS.ADMIN
//       ? 'Admin'
//       : user.rule === USERS.WRITER
//         ? 'Writer'
//         : user.rule === USERS.EDITOR
//           ? 'Editor'
//           : 'Subscriber'
//     }
//   </td>`)
//   userObj.append(userRuleObj)

//   let userStatusObj = $(`<td class="user-list__cell"><span class="badge badge-success p-2">${user.status}</span></td>`)
//   userObj.append(userStatusObj)

//   userObj.append(generateUserItemControlTooltip(user))

//   return userObj
// }

// function initUserListUI() {
//   $('.user-list__content').html('')
// }

// function generateUserList(dataList) {
//   let usersListContainer = $('<div></div>')
//   // let startPos = (pageNum - 1) * userCountPerPage
//   // let endPos = pageNum * userCountPerPage
//   // endPos = endPos > usersList.length ? usersList.length : endPos

//   usersListContainer.html('')

//   dataList.forEach(data => {
//     usersListContainer.append(generateUserItem(data))
//   })

//   return usersListContainer.children()
// }

function goToPreviousPage() {
  if (currentPage > 1) {
    switchToPage(currentPage - 1)
  }
}

function goToNextPage() {
  if (currentPage < pageCount) {
    switchToPage(currentPage + 1)
  }
}

function goToPage(pageObj) {
  let page = parseInt($(pageObj).text())

  if (page !== currentPage) {
    switchToPage(page)
  }
}

function switchToPage(pageNum) {
  let role = $('#roleSelection').val()

  window.location = `${window.location.origin}${window.location.pathname}?role=${role}&page=${pageNum}`
}

function filterUsersByRole() {
  switchToPage(1)
}

function editSubscriber(user) {
  let form =
    `<form id="editUserForm" class="p-1" method="POST" action="/admin/dashoard/edit/update-assigned-categories">
      <div class="info">
        <p><b>Account: </b>${user.account}</p>
        <p><b>Fullname: </b>${user.fullname}</p>
      </div>
      <div class="form-group">
        <label class="d-block"><h4 class="text-center">Expiration</h4></label>
        <p style="font-size: 12pt;"><b>Expiration date: </b>${moment(user.expirationDate).format('DD/MM/YYYY')}</p>
      </div>
      <div class="form-group d-flex align-items-center">
        <label class="m-0" for="extendDate">Extend date</label>
        <input type="number" class="form-control ml-2 mr-2" style="width: 100px;" id="extendDate" placeholder="0" min="0" value="0" name="extendDate" aria-label="Username">
        date
      </div>
    </form>`

  showBaoDienTuDialog(
    $('body'),
    'small',
    'Edit user',
    form,
    [
      {
        type: 'submit',
        form: 'editUserForm',
        class: 'btn-success',
        title: 'Update',
        callback: null
      }
    ],
    function () {
      $('#editUserForm').submit(function (e) {
        e.preventDefault()

        let loading = showLoading($('.modal-content'))
        let extendDate = parseInt($('input#extendDate').val())

        if (extendDate <= 0) {
          hideLoading(loading)
          closeDialog()
        }
        else {
          $.ajax({
            type: 'POST',
            url: '/admin/dashboard/subscriber/extend-expiration-date',
            data: {
              account: user.account,
              expirationDate: user.expirationDate,
              extendDate
            },
            success: function (res) {
              hideLoading(loading)
              closeDialog()
              if (res.error) {
                swal.fire({
                  type: 'error',
                  title: 'Oops!',
                  text: 'There is some error on server. You can try this in other time.',
                })
              }
              else {
                user.expirationDate = res.data.expirationDate
                console.log('user', user)
              }
            }
          })
        }

      })
    }
  )
}

function matchCategory(categories, categoryId) {
  return categories.filter(categ => categ.categoryId === categoryId).length > 0
}

function editEditor(user) {
  let loading = showLoading($('body'))
  let form = $(
    `<div><form id="editUserForm" class="p-1" method="POST" action="/admin/dashoard/edit/update-assigned-categories">
      <div class="info">
        <p><b>Account: </b>${user.account}</p>
        <p><b>Fullname: </b>${user.fullname}</p>
      </div>
      <div class="form-group">
        <label class="d-block"><h4 class="text-center">Assign categories</h4></label>
        <div class="categoryList d-flex flex-wrap">
          
        </div>
      </div>
    </form></div>`
  )

  $.ajax({
    type: 'GET',
    url: '/admin/dashboard/data/categories',
    success: function (res) {
      hideLoading(loading)
      if (res.error) {
        swal.fire({
          type: 'error',
          title: 'Oops!',
          text: 'There is some error on server, we can not get data now.',
        })
      }
      else {
        let categoryList = form.find('.categoryList')
        res.data.categories.forEach(function (category) {
          let item = $(
            `<div class="categoryItemContainer border rounded m-1 p-1" style="width: 45%;" category-id="${category.categoryId}">
              <div class="categoryItem">
                <div class="custom-control custom-checkbox">
                  <input type="checkbox" class="category custom-control-input" value="${category.categoryId}" id="${category.categoryId}" onclick="changeSelection(this, '${category.categoryId}')" ${matchCategory(user.assignedCategories, category.categoryId) ? `checked` : ''}>
                  <label class="custom-control-label" for="${category.categoryId}">${category.categoryName}</label>
                </div>
              </div>
            </div>`
          )

          if (category.subCategories.length > 0) {
            let subCategories = $(`<div class="categoryItem__subCategories p-2"></div>`)
            category.subCategories.forEach(function (subCateg) {
              subCategories.append(`
                <div class="custom-control custom-checkbox">
                  <input type="checkbox" class="category custom-control-input" value="${subCateg.categoryId}" id="${subCateg.categoryId}" ${matchCategory(user.assignedCategories, category.categoryId) ? `checked` : ''}>
                  <label class="custom-control-label" for="${subCateg.categoryId}">${subCateg.categoryName}</label>
                </div>
              `)
            })
            item.append(subCategories)
          }

          categoryList.append(item)
        })

        showBaoDienTuDialog(
          $('body'),
          'small',
          'Edit user',
          form.html(),
          [
            {
              type: 'submit',
              form: 'editUserForm',
              class: 'btn-success',
              title: 'Update',
              callback: null
            }
          ],
          function () {
            $('#editUserForm').submit(function (e) {
              e.preventDefault()

              let loading = showLoading($('.modal-content'))
              let categoryIds = []
              $('input.category:checked').each(function (index) {
                categoryIds.push($(this).val())
              })

              $.ajax({
                type: 'POST',
                url: '/admin/dashboard/editor/update-assigned-categories',
                data: {
                  account: user.account,
                  categoryIds
                },
                success: function (res) {
                  hideLoading(loading)
                  closeDialog()
                  if (res.error) {
                    swal.fire({
                      type: 'error',
                      title: 'Oops!',
                      text: 'There is some error on server. You can try this in other time.',
                    })
                  }
                  else {
                    user.assignedCategories = res.data.categories
                    console.log('users', users)
                  }
                }
              })
            })
          }
        )
      }
    }
  })
}

function editUser(account) {
  let user = users.filter(u => u.account === account)[0]

  user.role === 'EDITOR'
    ? editEditor(user)
    : user.role === 'SUBSCRIBER'
      ? editSubscriber(user)
      : ''
}

function changeSelection(input, categoryId) {
  let children = document.querySelectorAll(`.categoryItemContainer[category-id="${categoryId}"] .categoryItem__subCategories input`)
  if (input.checked) {
    children.forEach(function (child) {
      child.checked = true
    })
  }
  else {
    children.forEach(function (child) {
      child.checked = false
    })
  }
}

function showUserInfo(account) {
  let user = users.filter(u => u.account === account)[0]

  let info =
    `<div class="userInfoContainer p-2">
      <div class="userInfoItem d-flex justify-content-between p-1">
        <div class="userInfoItem__label font-weight-bold">Account: </div>
        <div class="userInfoItem__content">${user.account}</div>
      </div>
      <div class="userInfoItem d-flex justify-content-between p-1">
        <div class="userInfoItem__label font-weight-bold">Fullname: </div>
        <div class="userInfoItem__content">${user.fullname}</div>
      </div>
      <div class="userInfoItem d-flex justify-content-between p-1">
        <div class="userInfoItem__label font-weight-bold">Birthday: </div>
        <div class="userInfoItem__content">${moment(user.birthday).format('DD/MM/YYYY')}</div>
      </div>
      <div class="userInfoItem d-flex justify-content-between p-1">
        <div class="userInfoItem__label font-weight-bold">Email: </div>
        <div class="userInfoItem__content">${user.email}</div>
      </div>
      <div class="userInfoItem d-flex justify-content-between p-1">
        <div class="userInfoItem__label font-weight-bold">Role: </div>
        <div class="userInfoItem__content">${user.role}</div>
      </div>
      ${
    user.role === 'SUBSCRIBER'
      ? `<div class="userInfoItem d-flex justify-content-between p-1">
          <div class="userInfoItem__label font-weight-bold">Expiration date: </div>
          <div class="userInfoItem__content">${moment(user.expirationDate).format('DD/MM/YYYY')}</div>
        </div>`
      : user.role === 'WRITER'
        ? `<div class="userInfoItem d-flex justify-content-between p-1">
            <div class="userInfoItem__label font-weight-bold">Pseudonym: </div>
            <div class="userInfoItem__content">${user.pseudonym}</div>
          </div>`
        : user.role === 'EDITOR'
          ? `<div class="userInfoItem d-flex justify-content-between p-1">
              <div class="userInfoItem__label font-weight-bold" style="width: 150px;">Assigned categories: </div>
              <div class="userInfoItem__content">${user.assignedCategories.map(function (categ) {
            return categ.categoryName
          }).join(', ')}</div>
            </div>`
          : ''
    }
    </div>`

  showBaoDienTuDialog(
    $('body'),
    'small',
    'User Information',
    info,
    [],
    null
  )
}