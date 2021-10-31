/* 
$(document).ready(function(){
    $('.slider__inner').slick({
         adaptiveHeight:true, 
        speed:1000, 
        infinity:true,
        prevArrow:'<button type="button" class="slick-prev"><img src="../img/slider/chevron-left.png"></button>',
        nextArrow:'<button type="button" class="slick-next"><img src="../img/slider/chevron-right.png"></button>',
        responsive: [
            {
              breakpoint: 992,
              settings: {              
                arrows:false,
                dots: true
              }
            }
        ]
    });
  }); */
  const slider = tns({
    container: '.slider__inner',
    items: 1,
    slideBy: 'page',
    autoplay: false,
    controls:false,
    nav:false
  });
  document.querySelector('.prev').addEventListener('click',()=>{slider.goTo('prev')})
  document.querySelector('.next').addEventListener('click',()=>{slider.goTo('next')})
