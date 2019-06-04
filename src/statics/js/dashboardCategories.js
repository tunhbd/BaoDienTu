const CATEGORY_COUNT_PER_PAGE = 10

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

function setUpForCategorieslist() {
    // reset countCheck
    $("#delete-all")
        .addClass("btn-outline-secondary")
        .removeClass("btn-outline-danger")
        .attr("disabled", true);

    // click table
    $("tr td:not(:first-child)").click(function(event) {
        let checkbox = $(this)
            .closest("tr")
            .find("input[type='checkbox']");

        checkbox.attr("checked") ?
            checkbox.attr("checked", false).change() :
            checkbox.attr("checked", true).change();
    });

    // change checkbox
    $('.checkbox input[type="checkbox"]').change(function(event) {
        $(this)
            .closest("tr")
            .toggleClass("selected");

        let check = $('.checkbox input[type="checkbox"]');
        //if check, open remove all checked
        let countCheck = 0;
        check.each(function() {
            if ($(this).attr("checked")) {
                countCheck++;
            }
        });
        countCheck !== 0 ?
            $("#delete-all")
            .removeClass("btn-outline-secondary")
            .addClass("btn-outline-danger")
            .attr("disabled", false) :
            $("#delete-all")
            .addClass("btn-outline-secondary")
            .removeClass("btn-outline-danger")
            .attr("disabled", true);
    });

    // delete
    $(".delete-btn").click(function(event) {
        event.preventDefault();
        let thisCategory = $(this).closest('tr')

        showBaoDienTuDialog(
            $('body'),
            'small',
            'Deleting Category Confirmation',
            'Do you want to delete this category', [{
                title: 'Yes, I want',
                callback: () => {
                    let selectedPage = paginationObj.pagination('getSelectedPageNum')
                    categoriesList = categoriesList.filter(category => category.category_id !== thisCategory.attr('category-id'))
                    console.log(categoriesList)
                    let pageCount = Math.ceil(categoriesList.length / CATEGORY_COUNT_PER_PAGE)
                    selectedPage = selectedPage > pageCount ? pageCount : selectedPage
                    showDataListWithPagination(CATEGORY_COUNT_PER_PAGE, $("#pagination-container"), categoriesList, $("#data-container"), listCategories, setUpForCategorieslist)
                    paginationObj.pagination('go', selectedPage)
                }
            }]
        )
    });

    // edit
    $(".update-btn").click(function(event) {
        event.preventDefault();
        event.stopPropagation();
        $("#submit-modal-btn").text("Update");
        $("#tag-modal-label").text("Update Category");
        $("#tag-modal").modal("show");
    });

    // add new
    $("#add-new").click(function(event) {
        $("#submit-modal-btn").text("Add New");
        $("#tag-modal-label").text("Add New Category");
        $("#tag-modal").modal("show");
    });
}

function listCategories(data) {
    return data
        .map(item => {
                return `
        <tr category-id="${item.category_id}">
          <td scope="row">
            <label class="checkbox position-relative">
              <input type="checkbox" />
              <span class="label-text"></span>
            </label>
          </td>
          <td scope="row">
            <span
              >${item.category_name}</span
            >
          </td>
          <td scope="row">
            <span
              >${item.parent_category !== null ? item.parent_category.category_name : 'Null'}</span
            >
          </td>
          <td scope="row">
            <span
              >${item.category_active === 1 ? `<span class="badge badge-success p-2">Active</span>` : `<span class="badge badge-danger p-2">Disabled</span>`}</span
            >
          </td>
          <td  class="text-center" scope="row">
            <span class="badge badge-success p-2">${item.post_num}</span>
          </td>
          <td  class="text-center" scope="row">
            ${formatVietnameseDate(item.created_date)}
          </td>
          <td scope="row">
            <div class="w-table-actions">
              <a
                href=""
                class="update-btn badge badge-primary p-2 text-light"
              >
                <i class="fas fa-pen"></i>
              </a>
              <a
                href=""
                class="delete-btn badge badge-danger text-light p-2 text-danger"
              >
                <i class="fas fa-window-close"></i>
              </a>
            </div>
          </td>
        </tr>`;
    })
    .join("");
}