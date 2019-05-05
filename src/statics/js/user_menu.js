function setEventForAvatarUser() {
    $('#avatar-user').click(function () {
        if ($(this).hasClass('user-menu-is-collapse')) {
            $('.user-menu').slideDown(300)
            $(this).removeClass('user-menu-is-collapse')
        }
        else {
            $('.user-menu').slideUp(300)
            $(this).addClass('user-menu-is-collapse')
        }
    })
}