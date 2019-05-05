var menuIsShow = false

$(document).ready(function () {
  // var slideout = new Slideout({
  //   'panel': document.getElementById('wrapper'),
  //   'menu': document.getElementById('menu'),
  //   'padding': 200,
  //   'tolerance': 50
  // });
  // document.querySelector('.btn-menu.js-slideout-toggle').addEventListener('click', function () {
  //   slideout.toggle();
  // });

  $('.btn-menu').click(function() {
    $('#menu').show()
    $('#menu').removeClass('collapsed-main-menu')
    $('#menu').addClass('expanded-main-menu')
  })

  $('.close-menu-button').click(function() {
    $('#menu').removeClass('expanded-main-menu')
    $('#menu').addClass('collapsed-main-menu')
    setTimeout(function() {$('#menu').hide()}, 500)
  })

  $('.expand-sub-menu-button').click(function(e) {
    e.stopPropagation()
    e.preventDefault()
    $(this).parent().next('.menu-list-item-dropdown__menu').slideToggle(300)
  })

  $('.slick-image').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    infinite: true,

    dots: true,
    arrows: false,
    autoplaySpeed: 2000,
    // fade: true,
    // cssEase: 'linear'
  });
});
var arrImageLink = ["nn-1.jpg", "nn-2.jpg", "vh-2.jpg", "gt-1.jpg", "tt-2.jpg", "xh-1.jpg", "tg-1.jpg", "cn-1.jpg", "pl-1.jpg", "gd-1.jpg"];
var arrTopic = ["KINH TẾ", "KINH TẾ", "VĂN HÓA", "GIẢI TRÍ", "THỂ THAO", "XÃ HỘI", "THẾ GIỚI", "CÔNG NGHỆ", "PHÁP LUẬT", "GIÁO DỤC"];
var arrTitle = ["Tuyên Quang: Đưa gỗ rừng vươn ra thế giới",
  "Dự án Bất động sản tại Việt Nam đầu tiên sử dụng vật liệu từ nhựa tái chế"
  , "Thái Nguyên: Long trọng tổ chức Lễ giỗ tổ Hùng Vương",
  "Hoa hậu Tiểu Vy: Tôi đi con đường riêng của mình",
  "Tiger Woods vô địch Masters 2019",
  "Nắng nóng 'đổ lửa' 39-40 độ C trên đường phố TP.HCM",
  "Tỉ phú Jack Ma khuyên giới trẻ 'vắt kiệt sức mà làm'",
  "Viettel mở công ty an ninh mạng gồm các chuyên gia hàng đầu Việt Nam",
  "Hàng chục cảnh sát phong tỏa phố, vây bắt vụ nghi mua bán ma túy",
  "Thí sinh Hòa Bình được nâng điểm đang học trường tư"];

var arrDay = ["15-4-2019", "15-4-2019", "15-4-2019", "14-4-2019", "15-4-2019", "15-4-2019", "15-4-2019", "12-4-2019", "15-4-2019", "15-4-2019"];
for (var i = 0; i < arrImageLink.length - 1; i++) {
  var a = `
  <div class="new-post mt-1" style="background-image: url(media/images/`+ arrImageLink[i] + `">
    <a href="/post/post_sample">
      <div class="d-flex topic-post">
        <p class="topic">`+ arrTopic[i] + `</p>

      </div>
      <p class="title-post">`+ arrTitle[i] + `</p>
      <p class="date-post"><strong>Ngày đăng:</strong> <i class="date-post">`+ arrDay[i] + `</i></p>
    </a>
  </div>`;
  $('.slick-new-image').append(a);

}
for (var i = 0; i < arrImageLink.length - 1; i++) {
  var a = `
  <div class="mv col-md-4">
  <div class="item-most-view">
    <a href="/post/post_sample">
      <div class="mv-image">
        <img src="media/images/`+ arrImageLink[i] + `" alt="">
      </div>
      <div class="mv-title">
        <span class="title">
          `+ arrTitle[i] + `
        </span>
      </div>
      <div class="mv-topic float-right">
        <span class="topic">
          `+ arrTopic[i] + `
        </span>
      </div>
      <div class="mv-day ">
        <span class="day"><strong>Ngày đăng:</strong> <i class="date-post">`+ arrDay[i] + `</i></span>
      </div>
    </a>
  </div>
    </div>`;
  $('.list-mv').append(a);

}
for (var i = 0; i < arrImageLink.length - 1; i++) {
  var a = `
  <div class="item-top-10">
    <a href="/post/post_sample">
      <div class=" row">

        <div class="col-md-6">
          <div class="image-item">

            <img src="media/images/`+ arrImageLink[i] + `" alt="">

          </div>
        </div>
        <div class="col-md-6">
          <div class="item-topic">
            <span class="topic">`+ arrTopic[i] + `</span>
          </div>
          <div class="item-title">
            <span class="title">`+ arrTitle[i] + `</span>
          </div>
          <div class="item-day">
            <span class="day"><strong>Ngày đăng:</strong> <i class="date-post">`+ arrDay[i] + `</i></span>
          </div>
        </div>

      </div>
    </a>
  </div>`;
  $('.top-10-content').append(a);

}

setEventForAvatarUser()
// $(document).ready(function(){
//   $('.slick-new-image').slick({
//
//    vertical: true,
//    slidesToShow: 2,
//    slidesToScroll: 2,
//    verticalSwiping: true,
//    arrows:false,
//    infinite: false,
//    rtl:false,
//      // accessibility: false,
//   });
// });
// $('.slick-new-image').on('wheel', (function(e) {
//   e.preventDefault();
//
//   if (e.originalEvent.deltaY > 0) {
//     $(this).slick('slickNext');
//   } else {
//     $(this).slick('slickPrev');
//   }
// }));
