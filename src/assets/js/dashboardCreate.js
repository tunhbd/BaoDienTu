function showEditingSpace(a) {
  "use strict";
  let titleInput = a(".title-input");
  let textHarsh = a(".title-harsh");
  let tagInput = a(".tag-input");
  let smallHarsh = a(".tag-harsh");
  let summaryInput = a(".summary-input");
  let summaryHarsh = a(".summary-harsh");

  titleInput.on("focus", function() {
    titleInput.prop("placeholder", "");
  });
  titleInput.on("focusout", function() {
    titleInput.prop("placeholder", "Tiêu đề...");
  });
  titleInput.on("keyup", function() {
    if (titleInput.val() !== "") {
      textHarsh.addClass("text-harsh-active");
      titleInput.addClass("title-input-focus");
    } else {
      textHarsh.removeClass("text-harsh-active");
      titleInput.removeClass("title-input-focus");
    }
  });

  tagInput.on("focus", function() {
    tagInput.prop("placeholder", "");
    tagInput.val() === "" && smallHarsh.show();
  });
  tagInput.on("focusout", function() {
    tagInput.prop("placeholder", "TAGS");
    tagInput.val() === "" && smallHarsh.hide();
  });
  tagInput.on("keyup", function() {
    if (tagInput.val() !== "") {
      tagInput.addClass("tag-input-focus");
    } else {
      tagInput.removeClass("tag-input-focus");
    }
  });

  summaryInput.on("focus", function() {
    summaryInput.prop("placeholder", "");
    summaryInput.val() === "" && summaryHarsh.show();
  });
  summaryInput.on("focusout", function() {
    summaryInput.prop("placeholder", "Tóm tắt");
    summaryInput.val() === "" && summaryHarsh.hide();
  });
  summaryInput.on("keyup", function() {
    if (summaryInput.val() !== "") {
      summaryHarsh.show();
      summaryInput.addClass("summary-input-focus");
    } else {
      summaryInput.removeClass("summary-input-focus");
    }
  });

  CKEDITOR.replace("create-post-editor");
}
