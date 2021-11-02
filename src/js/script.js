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
    controls: false,
    nav: false
});
document.querySelector('.prev').addEventListener('click', () => { slider.goTo('prev') })
document.querySelector('.next').addEventListener('click', () => { slider.goTo('next') })

$(document).ready(function () {
    $('ul.catalog__tabs').on('click', 'li:not(catalog__tab_active)', function () {
        $(this)
            .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
            .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active')
            .eq($(this).index()).addClass('catalog__content_active');
    });
    toggleSlide('.catalog-item__back');
    toggleSlide('.catalog-item__link');

    function toggleSlide(item) {
        $(item).each(function (i) {
            $(this).on('click', function (e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        });
    }

    //modal
    $('[data-model=consultation]').on('click', function () {
        $('.overlay,#consultation').fadeIn('slow');
    });
    $('.modal__close').on('click', function () {
        $('.overlay,#consultation,#thanks,#order').fadeOut('slow');
    });
    $('.btn_mini').on('click', function () {
        $('.btn_mini').each(function (i) {
            $(this).on('click', function () {
                $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text())
            });
            $('.overlay,#order').fadeIn('slow');
        })
    });

    //validate

    function validateForm(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2,
                },
                phone: {
                    required: true,
                },
                'e-mail': {
                    required: true,
                    email: true
                },

            },
            
            messages: {
                name: {
                    required: "Пожуалуйста, введите свое имя",
                    minlength: jQuery.validator.format("Введите {0} символа!")
                },
                phone: {
                    required: 'Пожалуйства, введите свой номер телефона',
                },
                'e-mail': {
                    required: 'Пожалуйста, введите свою почту',
                    email: 'Неправильно введен адрес почты',
                }
            },
        });
    };
    validateForm('#consultation form');
    validateForm('#order form');
    validateForm('#consultation-form');

    $('input[name=phone]').mask('+7 (999) 999-99-99');
    
    $('form').submit(function (e) {
        e.preventDefault();      
        if(! $(this).valid()) return false; 
        console.log($(this).serialize());       
        $.ajax({
            type: "POST",
            url: "/src/js/mailer/smart.php",
            data: $(this).serialize(),
        }).done(function () {
            $(this).find('input').val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');
            $('form').trigger('reset');
        });
        return false;
    });


}); 
 


