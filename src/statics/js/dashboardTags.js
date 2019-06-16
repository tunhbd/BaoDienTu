// // function showTagsList(a, dataSource) {
// //   "use strict";

// //   let tags = dataSource

// //   // pagination
// //   $("#pagination-container").pagination({
// //     dataSource: tags,
// //     pageSize: 10,
// //     showGoInput: true,
// //     showGoButton: true,
// //     className: 'paginationjs-theme-bao-dien-tu paginationjs-big',
// //     callback: function (data, pagination) {
// //       var html = listTags(data);
// //       $("#data-container").html(html);

// //       // reset countCheck
// //       a("#delete-all")
// //         .addClass("btn-outline-secondary")
// //         .removeClass("btn-outline-danger")
// //         .attr("disabled", true);

// //       // click table
// //       a("tr td:not(:first-child)").click(function (event) {
// //         let checkbox = a(this)
// //           .closest("tr")
// //           .find("input[type='checkbox']");

// //         checkbox.attr("checked")
// //           ? checkbox.attr("checked", false).change()
// //           : checkbox.attr("checked", true).change();
// //       });

// //       // change checkbox
// //       a('.checkbox input[type="checkbox"]').change(function (event) {
// //         a(this)
// //           .closest("tr")
// //           .toggleClass("selected");

// //         let check = a('.checkbox input[type="checkbox"]');
// //         //if check, open remove all checked
// //         let countCheck = 0;
// //         check.each(function () {
// //           if (a(this).attr("checked")) {
// //             countCheck++;
// //           }
// //         });
// //         countCheck !== 0
// //           ? a("#delete-all")
// //             .removeClass("btn-outline-secondary")
// //             .addClass("btn-outline-danger")
// //             .attr("disabled", false)
// //           : a("#delete-all")
// //             .addClass("btn-outline-secondary")
// //             .removeClass("btn-outline-danger")
// //             .attr("disabled", true);
// //       });

// //       // delete
// //       a(".delete-btn").click(function (event) {
// //         event.preventDefault();
// //         a(this)
// //           .closest("tr")
// //           .remove();
// //       });

// //       // edit
// //       a(".update-btn").click(function (event) {
// //         event.preventDefault();
// //         event.stopPropagation();
// //         $("#submit-modal-btn").text("Update");
// //         $("#tag-modal-label").text("Update Tag");
// //         $("#tag-modal").modal("show");
// //       });
// //     }
// //   });

// //   // add new
// //   a("#add-new").click(function (event) {
// //     $("#submit-modal-btn").text("Add New");
// //     $("#tag-modal-label").text("Add New Tag");
// //     $("#tag-modal").modal("show");
// //   });
// // }
// const TAG_COUNT_PER_PAGE = 10

// function setUpForTagsList() {
//   // reset countCheck
//   $("#delete-all")
//     .addClass("btn-outline-secondary")
//     .removeClass("btn-outline-danger")
//     .attr("disabled", true);

//   // click table
//   $("tr td:not(:first-child)").click(function (event) {
//     let checkbox = $(this)
//       .closest("tr")
//       .find("input[type='checkbox']");

//     checkbox.attr("checked") ?
//       checkbox.attr("checked", false).change() :
//       checkbox.attr("checked", true).change();
//   });

//   // change checkbox
//   $('.checkbox input[type="checkbox"]').change(function (event) {
//     $(this)
//       .closest("tr")
//       .toggleClass("selected");

//     let check = $('.checkbox input[type="checkbox"]');
//     //if check, open remove all checked
//     let countCheck = 0;
//     check.each(function () {
//       if ($(this).attr("checked")) {
//         countCheck++;
//       }
//     });
//     countCheck !== 0 ?
//       $("#delete-all")
//         .removeClass("btn-outline-secondary")
//         .addClass("btn-outline-danger")
//         .attr("disabled", false) :
//       $("#delete-all")
//         .addClass("btn-outline-secondary")
//         .removeClass("btn-outline-danger")
//         .attr("disabled", true);
//   });

//   // delete
//   $(".delete-btn").click(function (event) {
//     event.preventDefault();
//     let thisTag = $(this).closest('tr')

//     showBaoDienTuDialog(
//       $('body'),
//       'small',
//       'Deleting Tag Confirmation',
//       'Do you want to delete this tag', [{
//         title: 'Yes, I want',
//         callback: () => {
//           let selectedPage = paginationObj.pagination('getSelectedPageNum')
//           tagsList = tagsList.filter(tag => tag.tag_id !== thisTag.attr('tag-id'))
//           let pageCount = Math.ceil(tagsList.length / TAG_COUNT_PER_PAGE)
//           selectedPage = selectedPage > pageCount ? pageCount : selectedPage
//           showDataListWithPagination(TAG_COUNT_PER_PAGE, $("#pagination-container"), tagsList, $("#data-container"), listTags, setUpForTagsList)
//           paginationObj.pagination('go', selectedPage)
//           // thisTag.remove();
//         }
//       }]
//     )
//   });

//   // edit
//   $(".update-btn").click(function (event) {
//     event.preventDefault();
//     event.stopPropagation();
//     $("#submit-modal-btn").text("Update");
//     $("#tag-modal-label").text("Update Tag");
//     $("#tag-modal").modal("show");
//   });

//   // add new
//   $("#add-new").click(function (event) {
//     $("#submit-modal-btn").text("Add New");
//     $("#tag-modal-label").text("Add New Tag");
//     $("#tag-modal").modal("show");
//   })
// }

// function listTags(data) {
//   return data
//     .map(item => {
//       return `
//         <tr tag-id=${item.tag_id}>
//           <td scope="row">
//             <label class="checkbox position-relative">
//               <input type="checkbox" />
//               <span class="label-text"></span>
//             </label>
//           </td>
//           <td scope="row">
//             <span
//               >${item.tag_name}</span
//             >
//           </td>
//           <td scope="row">
//             <span
//               >${item.tag_active === 1 ? `<span class="badge badge-success p-2">Active</span>` : `<span class="badge badge-danger p-2">Disabled</span>`}</span
//             >
//           </td>
//           <td  class="text-center" scope="row">
//             <span class="badge badge-success p-2">${item.post_num}</span>
//           </td>
//           <td  class="text-center" scope="row">
//             ${formatVietnameseDate(item.created_date)}
//           </td>
//           <td scope="row">
//             <div class="w-table-actions">
//               <a
//                 href=""
//                 class="update-btn badge badge-primary p-2 text-light"
//               >
//                 <i class="fas fa-pen"></i>
//               </a>
//               <a
//                 href=""
//                 class="delete-btn badge badge-danger text-light p-2 text-danger"
//               >
//                 <i class="fas fa-window-close"></i>
//               </a>
//             </div>
//           </td>
//         </tr>`;
//     })
//     .join("");
// }

// function addTag() {
//   let target = document.getElementById('tag-modal')
//   let loading = showLoading(target)
//   let tag = {
//     tagName: $('input[name="tagName"]').val(),
//     tagActive: $('input[name="active"]').val() === 'on' ? true : false,
//   }
//   // $('#createTagForm').ajaxSubmit({
//   //   error: function (xhr) {

//   //   },
//   //   success: function (res) {
//   //     console.log(res)
//   //   }
//   // })
//   $.ajax({
//     type: 'POST',
//     url: '/dashboard/create-tag',
//     data: tag,
//     success: function (data) {
//       if (!data.error) {
//         hideLoading(loading)
//         $(target).modal('hide')
//         tagsList.push(data.tag)
//         console.log('success')
//       }
//     }
//   })
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

  window.location = `${window.location.origin}${window.location.pathname}?page=${pageNum}`
}

function changeDeleteStatus() {
  if ($('input.tagSelection').length > 0) {
    $('button#deleteButton').removeAttr('disabled')
  }
  else {
    $('button#deleteButton').attr('disabled', true)
  }
}

// function addTag() {
//   let form =
//     `<form id="addTagForm" class="p-1" method="POST">
//       <div class="form-group">
//         <label for="tagName">Tag name</label>
//         <input type="text" class="form-control" id="tagName" name="tagName" aria-describedby="tagNameHelp" placeholder="Enter tag name">
//         <small id="tagNameHelp" class="form-text text-muted">Example: kinh tế</small>
//       </div>
//     </form>`

//   showBaoDienTuDialog(
//     $('body'),
//     'small',
//     'Add new tag',
//     form,
//     [
//       {
//         type: 'submit',
//         form: 'addTagForm',
//         title: 'Add',
//         callback: null
//       }
//     ],
//     function () {
//       $('#addTagForm').validate({
//         rules: {
//           tagName: 'required'
//         },
//         messages: {
//           tagName: 'You have not enter tag name yet.'
//         }
//       })

//       $('#addTagForm').submit(function (e) {
//         e.preventDefault()

//         let loading = showLoading($('.modal-content'))
//         let tagName = $('input#tagName').val().trim()
//         $.ajax({
//           type: 'POST',
//           url: '/admin/dashboard/create-tag',
//           data: {
//             tagName
//           },
//           success: function (res) {
//             hideLoading(loading)
//             closeDialog()
//             if (res.error) {
//               swal.fire({
//                 type: 'error',
//                 title: 'Oops!',
//                 text: 'There is some error on server. You can try this in other time.',
//               })
//             }
//             else {
//               switchToPage(currentPage)
//             }
//           }
//         })
//       })
//     }
//   )
// }

function addOrEditTag(tagId = null) {
  let tag = tagId === null ? null : tags.filter(function (t) {
    return t.tagId === tagId
  })[0]

  let form =
    `<form id="tagForm" class="p-1" method="POST">
      <div class="form-group">
        <label for="tagName">Tag name</label>
        <input type="text" class="form-control" id="tagName" name="tagName" aria-describedby="tagNameHelp" placeholder="Enter tag name" value="${tag !== null ? tag.tagName : ''}">
        <small id="tagNameHelp" class="form-text text-muted">Example: kinh tế</small>
      </div>
    </form>`

  showBaoDienTuDialog(
    $('body'),
    'small',
    tag === null ? 'Add new tag' : 'Edit tag',
    form,
    [
      {
        type: 'submit',
        form: 'tagForm',
        class: 'btn-success',
        title: tag === null ? 'Add' : 'Update',
        callback: null
      }
    ],
    function () {
      $('#tagForm').validate({
        rules: {
          tagName: 'required'
        },
        messages: {
          tagName: 'You have not enter tag name yet.'
        },
        errorElement: 'small',
        errorClass: 'd-block help-block text-danger',
        highlight: function (e) {
          $(e).removeClass('is-valid').addClass('is-invalid');
        },
        unhighlight: function (e) {
          $(e).removeClass('is-invalid').addClass('is-valid');
        },
        submitHandler: function (form, e) {
          e.preventDefault()

          let loading = showLoading($('.modal-content'))
          let tagName = $('input#tagName').val().trim()
          $.ajax({
            type: 'POST',
            url: tag === null ? '/admin/dashboard/create-tag' : '/admin/dashboard/update-tag',
            data: tag == null
              ? {
                tagName
              }
              : {
                tagId: tag.tagId,
                tagName
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
                switchToPage(currentPage)
              }
            }
          })
        }
      })
    }
  )
}

function deleteTags() {
  let tagIds = []

  $('input.tagSelection:checked').each(function (index) {
    tagIds.push($(this).val())
  })

  let loading = showLoading($('body'))

  $.ajax({
    type: 'POST',
    url: '/admin/dashboard/delete-tags',
    data: {
      tagIds,
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
        if ($('.tagItem').length === tagIds.length && currentPage > 1) {
          currentPage === pageCount ? currentPage-- : null
        }
        switchToPage(currentPage)
      }
    }
  })
}