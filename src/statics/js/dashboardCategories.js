//const CATEGORY_COUNT_PER_PAGE = 10

// function showCategoriesList(a, dataSource) {
//   "use strict";

//   let categories = dataSource

//   // pagination
//   $("#pagination-container").pagination({
//     dataSource: categories,
//     pageSize: CATEGORY_COUNT_PER_PAGE,
//     showGoInput: true,
//     showGoButton: true,
//     className: 'paginationjs-theme-bao-dien-tu paginationjs-big',
//     callback: function (data, pagination) {
//       var html = listCategories(data);
//       $("#data-container").html(html);

//       // reset countCheck
//       a("#delete-all")
//         .addClass("btn-outline-secondary")
//         .removeClass("btn-outline-danger")
//         .attr("disabled", true);

//       // click table
//       a("tr td:not(:first-child)").click(function (event) {
//         let checkbox = a(this)
//           .closest("tr")
//           .find("input[type='checkbox']");

//         checkbox.attr("checked")
//           ? checkbox.attr("checked", false).change()
//           : checkbox.attr("checked", true).change();
//       });

//       // change checkbox
//       a('.checkbox input[type="checkbox"]').change(function (event) {
//         a(this)
//           .closest("tr")
//           .toggleClass("selected");

//         let check = a('.checkbox input[type="checkbox"]');
//         //if check, open remove all checked
//         let countCheck = 0;
//         check.each(function () {
//           if (a(this).attr("checked")) {
//             countCheck++;
//           }
//         });
//         countCheck !== 0
//           ? a("#delete-all")
//             .removeClass("btn-outline-secondary")
//             .addClass("btn-outline-danger")
//             .attr("disabled", false)
//           : a("#delete-all")
//             .addClass("btn-outline-secondary")
//             .removeClass("btn-outline-danger")
//             .attr("disabled", true);
//       });

//       // delete
//       a(".delete-btn").click(function (event) {
//         event.preventDefault();
//         a(this)
//           .closest("tr")
//           .remove();
//       });

//       // edit
//       a(".update-btn").click(function (event) {
//         event.preventDefault();
//         event.stopPropagation();
//         $("#submit-modal-btn").text("Update");
//         $("#tag-modal-label").text("Update Category");
//         $("#tag-modal").modal("show");
//       });
//     }
//   });

//   // add new
//   a("#add-new").click(function (event) {
//     $("#submit-modal-btn").text("Add New");
//     $("#tag-modal-label").text("Add New Category");
//     $("#tag-modal").modal("show");
//   });
// }

// function setUpForCategorieslist() {
//     // reset countCheck
//     $("#delete-all")
//         .addClass("btn-outline-secondary")
//         .removeClass("btn-outline-danger")
//         .attr("disabled", true);

//     // click table
//     $("tr td:not(:first-child)").click(function(event) {
//         let checkbox = $(this)
//             .closest("tr")
//             .find("input[type='checkbox']");

//         checkbox.attr("checked") ?
//             checkbox.attr("checked", false).change() :
//             checkbox.attr("checked", true).change();
//     });

//     // change checkbox
//     $('.checkbox input[type="checkbox"]').change(function(event) {
//         $(this)
//             .closest("tr")
//             .toggleClass("selected");

//         let check = $('.checkbox input[type="checkbox"]');
//         //if check, open remove all checked
//         let countCheck = 0;
//         check.each(function() {
//             if ($(this).attr("checked")) {
//                 countCheck++;
//             }
//         });
//         countCheck !== 0 ?
//             $("#delete-all")
//             .removeClass("btn-outline-secondary")
//             .addClass("btn-outline-danger")
//             .attr("disabled", false) :
//             $("#delete-all")
//             .addClass("btn-outline-secondary")
//             .removeClass("btn-outline-danger")
//             .attr("disabled", true);
//     });

//     // delete
//     $(".delete-btn").click(function(event) {
//         event.preventDefault();
//         let thisCategory = $(this).closest('tr')

//         showBaoDienTuDialog(
//             $('body'),
//             'small',
//             'Deleting Category Confirmation',
//             'Do you want to delete this category', [{
//                 title: 'Yes, I want',
//                 callback: () => {
//                     let selectedPage = paginationObj.pagination('getSelectedPageNum')
//                     categoriesList = categoriesList.filter(category => category.category_id !== thisCategory.attr('category-id'))
//                     console.log(categoriesList)
//                     let pageCount = Math.ceil(categoriesList.length / CATEGORY_COUNT_PER_PAGE)
//                     selectedPage = selectedPage > pageCount ? pageCount : selectedPage
//                     showDataListWithPagination(CATEGORY_COUNT_PER_PAGE, $("#pagination-container"), categoriesList, $("#data-container"), listCategories, setUpForCategorieslist)
//                     paginationObj.pagination('go', selectedPage)
//                 }
//             }]
//         )
//     });

//     // edit
//     $(".update-btn").click(function(event) {
//         event.preventDefault();
//         event.stopPropagation();
//         $("#submit-modal-btn").text("Update");
//         $("#tag-modal-label").text("Update Category");
//         $("#tag-modal").modal("show");
//     });

//     // add new
//     $("#add-new").click(function(event) {
//         $("#submit-modal-btn").text("Add New");
//         $("#tag-modal-label").text("Add New Category");
//         $("#tag-modal").modal("show");
//     });
// }

// function listCategories(data) {
//     return data
//         .map(item => {
//                 return `
//         <tr category-id="${item.category_id}">
//           <td scope="row">
//             <label class="checkbox position-relative">
//               <input type="checkbox" />
//               <span class="label-text"></span>
//             </label>
//           </td>
//           <td scope="row">
//             <span
//               >${item.category_name}</span
//             >
//           </td>
//           <td scope="row">
//             <span
//               >${item.parent_category !== null ? item.parent_category.category_name : 'Null'}</span
//             >
//           </td>
//           <td scope="row">
//             <span
//               >${item.category_active === 1 ? `<span class="badge badge-success p-2">Active</span>` : `<span class="badge badge-danger p-2">Disabled</span>`}</span
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

function toggleIconExpand(icon) {
  icon.toggleClass('fa-plus').toggleClass('fa-minus')
}

function toggleSubCategory(categoryId) {
  let icon = $(`button.expand-btn[expand-for="${categoryId}"] i`)
  toggleIconExpand(icon)

  $(`button.expand-btn:not([expand-for="${categoryId}"]) i`).removeClass('fa-minus').addClass('fa-plus')
  $(`.subCategoryList.expanded:not([of-category="${categoryId}"])`).toggleClass('expanded').slideUp(200)
  $(`.subCategoryList[of-category="${categoryId}"]`).toggleClass('expanded').slideToggle(200)
}

function addCategory(parentId = null) {
  let parent = null
  if (parentId !== null) {
    parent = categories.filter(categ => categ.categoryId === parentId)[0]
  }

  showAddCategoryForm(parent)
}

function editCategory(categoryId, parentId = null) {
  let category = null
  let parent = null
  if (parentId === null) {
    category = categories.filter(categ => categ.categoryId === categoryId)[0]
  }
  else {
    parent = categories.filter(categ => categ.categoryId === parentId)[0]
    category = parent.subCategories.filter(categ => categ.categoryId === categoryId)[0]
  }

  showEditCategoryForm(category, parent)
}

function showAddCategoryForm(parent) {
  let form =
    `<form id="addCategoryForm" method="POST" action="/admin/dashboard/create-category">
      <div class="form-group">
        <label for="categoryName">Category Name</label>
        <input type="text" class="form-control" id="categoryName" name="categoryName" aria-describedby="categoryNameHelp" placeholder="Enter category name">
        <small id="categoryNameHelp" class="form-text text-muted">Example: Kinh tế</small>
      </div>
      ${
    parent !== null
      ? `<div class="form-group" >
            <label for="parentCategory">Parent Category</label>
            <select class="custom-select" id="parentCategory" name="parentCategory">
              <option value="${parent.categoryId}" selected>${parent.categoryName}</option>
            </select>
          </div>`
      : ''}
    </form>`

  showBaoDienTuDialog(
    $('body'),
    'small',
    'Add New Category',
    form,
    [
      {
        type: 'submit',
        form: 'addCategoryForm',
        class: 'btn-success',
        title: 'Add',
        callback: null
      }
    ],
    function () {
      $('#addCategoryForm').validate({
        submitHandler: function (form, e) {
          e.preventDefault()
          let loading = showLoading($('.modal-content'))
          // $(form).ajaxSubmit({
          //   error: function (xhr) {
          //     closeDialog()
          //     showBaoDienTuDialog($('body'), 'small', 'Error', 'There is some error on server. You can try this in other time.')
          //   },
          //   success: function (res) {
          //     closeDialog()
          //     if (res.error) {
          //       showBaoDienTuDialog($('body'), 'small', 'Error', 'There is some error on server. You can try this in other time.')
          //     }
          //     else {
          //       showNewCategoryIntoUI(res.data.category)
          //     }
          //   }
          // });
          console.log(form.parentCategory)
          $.ajax({
            type: 'POST',
            url: '/admin/dashboard/create-category',
            data: {
              categoryName: form.categoryName.value,
              parentCategory: form.parentCategory ? form.parentCategory.value : null
            },
            success: function (res) {
              hideLoading(loading)
              closeDialog()

              if (res.error) {
                showBaoDienTuDialog($('body'), 'small', 'Error', 'There is some error on server. You can try this in other time.')
              }
              else {
                console.log(res.data.category)
                showNewCategoryIntoUI(res.data.category)
              }
            }
          })
        },
        rules: {
          categoryName: 'required'
        },
        messages: {
          categoryName: 'You forgot to enter category name'
        },
        errorElement: 'small',
        errorClass: 'd-block help-block text-danger',
        highlight: function (e) {
          $(e).removeClass('is-valid').addClass('is-invalid');
        },
        unhighlight: function (e) {
          $(e).removeClass('is-invalid').addClass('is-valid');
        }
      })
    })
}

function showEditCategoryForm(category, parent = null) {
  let form =
    `<form id="editCategoryForm" method="POST" action="/admin/dashboard/update-category">
      <div class="form-group">
        <label for="categoryName">Category Name</label>
        <input type="text" class="form-control" id="categoryName" name="categoryName" aria-describedby="categoryNameHelp" placeholder="Enter category name" value="${category.categoryName}">
        <small id="categoryNameHelp" class="form-text text-muted">Example: Kinh tế</small>
      </div>
      ${
    parent !== null
      ? `<div class="form-group" >
            <label for="parentCategory">Parent Category</label>
            <select class="custom-select" id="parentCategory" name="parentCategory">
              <option value="${parent.categoryId}" selected>${parent.categoryName}</option>
            </select>
          </div>`
      : ''}
    </form>`

  showBaoDienTuDialog(
    $('body'),
    'small',
    'Edit Category',
    form,
    [
      {
        type: 'submit',
        form: 'editCategoryForm',
        class: 'btn-success',
        title: 'Update',
        callback: null
      }
    ],
    function () {
      $('#editCategoryForm').validate({
        submitHandler: function (form, e) {
          e.preventDefault()
          let loading = showLoading($('.modal-content'))

          $.ajax({
            type: 'POST',
            url: '/admin/dashboard/update-category',
            data: {
              categoryId: category.categoryId,
              categoryName: form.categoryName.value,
              parentCategory: category.parent
            },
            success: function (res) {
              hideLoading(loading)
              closeDialog()

              if (res.error) {
                showBaoDienTuDialog($('body'), 'small', 'Error', 'There is some error on server. You can try this in other time.')
              }
              else {
                updateCategoryIntoUI(res.data.category)
              }
            }
          })
        },
        rules: {
          categoryName: 'required'
        },
        messages: {
          categoryName: 'You forgot to enter category name'
        },
        errorElement: 'small',
        errorClass: 'd-block help-block text-danger',
        highlight: function (e) {
          $(e).removeClass('is-valid').addClass('is-invalid');
        },
        unhighlight: function (e) {
          $(e).removeClass('is-invalid').addClass('is-valid');
        }
      })
    })
}

function updateCategoryIntoUI(category) {
  console.log(category)
  if (category.parent === null) {
    $(`[category-id="${category.categoryId}"] .rootCategory .rootCategory__content`).text(category.categoryName)
  }
  else {
    $(`[category-id="${category.categoryId}"] .subCategory__content`).text(category.categoryName)
  }
}

function showNewCategoryIntoUI(category) {
  let container = null

  if (category.parent === null) {
    container = $('#rootCategoryList')
    let item = $(
      `<div class="rootCategoryContainer w-100 border rounded mt-1 mb-1" category-id="${category.categoryId}" style="display: none;">
        <div class="rootCategory w-100 justify-content-between align-items-center p-2">
          <div class="rootCategory__content">${category.categoryName}</div>
          <div class="controls d-flex align-content-center">
            <div class="functionButtons d-flex align-content-center">
              <button type="button" class="btn btn-secondary edit-btn" edit-for="${category.categoryId}"
                onclick="editCategory('${category.categoryId}')">
                <i class="fas fa-pencil-alt"></i>
              </button>
              <button type="button" class="btn btn-danger delete-btn" delete-for="${category.categoryId}"
                onclick="deleteCategory('${category.categoryId}')">
                <i class="fas fa-trash-alt"></i>
              </button>
            </div>
            <button type="button" class="btn btn-light expand-btn ml-1 mr-1" expand-for="${category.categoryId}"
              onclick="toggleSubCategory('${category.categoryId}')">
              <i class="fas fa-plus"></i>
            </button>
          </div>
        </div>
        <div class="subCategoryList w-100" style="display: none;" of-category="${category.categoryId}">
          <div class="subCategoryList__content">
          </div>
          <button type="button" class="btn btn-success add-btn d-block ml-auto mr-auto mt-2 mb-2"
          parent="${category.categoryId}" onclick="addCategory('${category.categoryId}')">
          <i class="fas fa-plus-circle"></i>
        </button>
        </div>
        
      </div>`
    )

    container.append(item)
    item.slideDown(300)
    categories.push(category)
  }
  else {
    container = $(`.subCategoryList[of-category="${category.parent}"] .subCategoryList__content`)
    let item = $(
      `<div class="subCategory border rounded w-100 p-2 pl-3 pr-3 justify-content-between align-items-center" category-id="${category.categoryId}" style="display: none;">
        <div class="subCategory__content">${category.categoryName}</div>
        <div class="controls d-flex clign-content-center">
          <div class="functionButtons d-flex align-content-center">
            <button type="button" class="btn btn-secondary edit-btn" edit-for="${category.categoryId}"
              onclick="editCategory('${category.categoryId}', true)">
              <i class="fas fa-pencil-alt"></i>
            </button>
            <button type="button" class="btn btn-danger delete-btn" delete-for="${category.categoryId}"
              onclick="deleteCategory('${category.categoryId}', '${category.parent}')">
              <i class="fas fa-trash-alt"></i>
            </button>
          </div>
        </div>
      </div>`
    )

    container.append(item)
    item.fadeIn(300)
    categories.filter(function (categ) {
      return categ.categoryId === category.parent
    })[0].subCategories.push(category)
  }
}

function deleteCategory(categoryId, parentId = null) {
  showBaoDienTuDialog(
    $('body'),
    'small',
    'Confirmation',
    'Do you want to delete this category',
    [
      {
        title: 'Yes, I want',
        class: 'btn-success',
        callback: function () {
          closeDialog()
          let item = $(`[category-id="${categoryId}"]`)
          let loading = showLoading(item)
          $.ajax({
            type: 'POST',
            url: '/admin/dashboard/delete-category',
            data: {
              categoryId,
              isParent: parentId === null
            },
            success: function (res) {
              hideLoading(loading)
              if (res.error) {
                showBaoDienTuDialog($('body'), 'small', 'Error', 'There is some error on server. You can try this in other time.')
              }
              else {
                item.fadeOut(300)

                if (parentId === null) {
                  categories = categories.filter(categ => categ.categoryId !== categoryId)
                }
                else {
                  let category = categories.filter(categ => categ.categoryId === parentId)[0]
                  category.subCategories = category.subCategories.filter(categ => categ.categoryId !== categoryId)
                }
              }
            }
          })
        }
      }
    ]
  )

}