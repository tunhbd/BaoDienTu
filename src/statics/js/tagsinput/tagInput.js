var tagInputSettings = {};
$.fn.tagInput = function(action, options) {
  return this.each(function() {
    var tagInput = $(this);
    var hiddenInput = $(this).children("input[type=hidden]");
    var textInput = $(this).children("input[type=text]");

    cleanUpHiddenField();

    switch (action) {
      case "init":
        var settings = $.extend(
          {},
          { labelClass: "label label-success" },
          options
        );
        tagInputSettings[$(this).attr("id")] = settings;
        // var defaultValues = hiddenInput.val().split(',');
        if (hiddenInput.val() != "") {
          console.log(hiddenInput.val());
          let tagsStr = hiddenInput.val().replace(/\\\"/gim, '"');
          var defaultValues = JSON.parse(tagsStr);
          for (i = 0; i < defaultValues.length; i++) {
            addLabel(defaultValues[i]);
          }
        }
        textInput.keydown(function(event) {
          var str = $(this).val();
          if (event.keyCode == 8) {
            //Backspace
            if (str.length == 0) {
              closeLabel(-1);
            }
          } else if (event.keyCode == 13) {
            //Enter
            makeBadge();
            event.preventDefault();
            return false;
          }
        });

        textInput.keyup(function(event) {
          var str = $(this).val();
          if (event.keyCode == 27) {
            //Escape
            textInput.val("");
            textInput.blur();
          } else if (event.keyCode == 13) {
            //Enter
            makeBadge();
            event.preventDefault();
            return false;
          }
          if (str.indexOf(",") >= 0) {
            makeBadge();
          }
          console.log(settings.processEachChange);
          settings.processEachChange && settings.processEachChange(str);
        });

        textInput.change(function() {
          console.log("change");
          makeBadge();
        });
        break;
      case "add":
        var settings = tagInputSettings[$(this).attr("id")];
        if (settings === undefined) {
          throw "This component is not inited";
        } else {
          makeBadge(options.tag);
        }
        break;
    }

    function makeBadge(tag = null) {
      if (tag === null) {
        str = textInput.val();
        if (/\S/.test(str)) {
          str = str.replace(",", "");
          str = str.trim();
          textInput.val("");

          tag = { tagId: str, tagName: str };
          addLabel(tag);
          var result = textInput.next();
          let tags = JSON.parse(result.val());
          tags = [...tags, tag];
          result.val(JSON.stringify(tags));

          cleanUpHiddenField();
        }
      } else {
        addLabel(tag);
        var result = textInput.next();
        let tags = JSON.parse(result.val());
        tags = [...tags, tag];
        result.val(JSON.stringify(tags));

        cleanUpHiddenField();
      }
    }

    function closeLabel(id, tagId = null) {
      tagId !== null &&
        $(`.tag-hint[tag-id="${tagId}"]`).show() &&
        $(`.tag-hint[tag-id="${tagId}"]`).removeAttr("hidden");
      if (id > 0) {
        label = tagInput.children("span.tagLabel[data-badge=" + id + "]");
      } else {
        label = tagInput.children("span.tagLabel").last();
      }
      // hiddenInput.val(hiddenInput.val().replace((label.text().slice(0, -2)), ''));
      hiddenInput.val(
        JSON.stringify(
          JSON.parse(hiddenInput.val()).filter(function(tag) {
            return tag.tagId !== label.attr("tag-id");
          })
        )
      );
      cleanUpHiddenField();
      label.remove();
    }

    function addLabel(tag) {
      $(`.tag-hint[tag-id="${tag.tagId}"]`).hide();
      $(`.tag-hint[tag-id="${tag.tagId}"]`).attr("hidden", "1");
      if (tagInput.children("span.tagLabel").length > 0) {
        badge = textInput.prev();
        var id = badge.data("badge") + 1;
        label = $(
          '<span class="' +
            settings.labelClass +
            ' tagLabel" data-badge="' +
            id +
            '" tag-id="' +
            tag.tagId +
            '">' +
            tag.tagName +
            ' <a href="#" data-badge="' +
            id +
            '" aria-label="close" class="closelabel">&times;</a></span> '
        ).insertAfter(badge);
      } else {
        label = $(
          '<span class="' +
            settings.labelClass +
            ' tagLabel" data-badge="1" tag-id="' +
            tag.tagId +
            '">' +
            tag.tagName +
            ' <a href="#" data-badge="1" aria-label="close" class="closelabel">&times;</a></span> '
        ).insertBefore(textInput);
      }
      label.children(".closelabel").click(function() {
        closeLabel($(this).data("badge"), tag.tagId);
      });
    }

    function cleanUpHiddenField() {
      s = hiddenInput.val();
      s = s.replace(/^( *, *)+|(, *(?=,|$))+/g, "");
      hiddenInput.val(s);
    }
  });
};
