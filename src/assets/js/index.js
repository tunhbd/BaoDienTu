$(document).ready(function(){
  $('.slick-image').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    infinite: true,
    dots:false,
    arrows:false,
    autoplaySpeed: 2500,
  });
});
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
