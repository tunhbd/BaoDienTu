function showTagsList(a, dataSource) {
  "use strict";

  let tags = dataSource

  // pagination
  $("#pagination-container").pagination({
    dataSource: tags,
    pageSize: 10,
    showGoInput: true,
    showGoButton: true,
    className: 'paginationjs-theme-bao-dien-tu paginationjs-big',
    callback: function(data, pagination) {
      var html = listTags(data);
      $("#data-container").html(html);

      // reset countCheck
      a("#delete-all")
        .addClass("btn-outline-secondary")
        .removeClass("btn-outline-danger")
        .attr("disabled", true);

      // click table
      a("tr td:not(:first-child)").click(function(event) {
        let checkbox = a(this)
          .closest("tr")
          .find("input[type='checkbox']");

        checkbox.attr("checked")
          ? checkbox.attr("checked", false).change()
          : checkbox.attr("checked", true).change();
      });

      // change checkbox
      a('.checkbox input[type="checkbox"]').change(function(event) {
        a(this)
          .closest("tr")
          .toggleClass("selected");

        let check = a('.checkbox input[type="checkbox"]');
        //if check, open remove all checked
        let countCheck = 0;
        check.each(function() {
          if (a(this).attr("checked")) {
            countCheck++;
          }
        });
        countCheck !== 0
          ? a("#delete-all")
              .removeClass("btn-outline-secondary")
              .addClass("btn-outline-danger")
              .attr("disabled", false)
          : a("#delete-all")
              .addClass("btn-outline-secondary")
              .removeClass("btn-outline-danger")
              .attr("disabled", true);
      });

      // delete
      a(".delete-btn").click(function(event) {
        event.preventDefault();
        a(this)
          .closest("tr")
          .remove();
      });

      // edit
      a(".update-btn").click(function(event) {
        event.preventDefault();
        event.stopPropagation();
        $("#submit-modal-btn").text("Cập nhật");
        $("#tag-modal-label").text("Chỉnh sửa");
        $("#tag-modal").modal("show");
      });
    }
  });

  // add new
  a("#add-new").click(function(event) {
    $("#submit-modal-btn").text("Thêm");
    $("#tag-modal-label").text("Thêm mới");
    $("#tag-modal").modal("show");
  });
}

function listTags(data) {
  return data
    .map(item => {
      return `
        <tr>
          <td scope="row">
            <label class="checkbox position-relative">
              <input type="checkbox" />
              <span class="label-text"></span>
            </label>
          </td>
          <td scope="row">
            <span
              >${item.tag_name}</span
            >
          </td>
          <td  class="text-center" scope="row">
            <span class="badge badge-success p-2">${item.post_num}</span>
          </td>
          <td  class="text-center" scope="row">
            ${item.created_date}
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
