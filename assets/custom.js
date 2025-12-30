// ---------------------------------------------------------------------------
// Money format handler
// ---------------------------------------------------------------------------
const money_format = "${{amount}}";

const formatMoney = function (cents, format) {
    if (typeof cents == 'string') {
        cents = cents.replace('.', '');
    }
    let value = '';
    const placeholderRegex = /\{\{\s*(\w+)\s*}}/;
    const formatString = format || money_format;

    function defaultOption(opt, def) {
        return (typeof opt == 'undefined' ? def : opt);
    }

    function formatWithDelimiters(number, precision, thousands, decimal) {
        precision = defaultOption(precision, 2);
        thousands = defaultOption(thousands, ',');
        decimal = defaultOption(decimal, '.');

        if (isNaN(number) || number == null) {
            return 0;
        }

        number = (number / 100.0).toFixed(precision);

        const parts = number.split('.'),
            dollars = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands),
            cents = parts[1] ? (decimal + parts[1]) : '';

        return dollars + cents;
    }

    switch (formatString.match(placeholderRegex)[1]) {
        case 'amount':
            value = formatWithDelimiters(cents, 2);
            break;
        case 'amount_no_decimals':
            value = formatWithDelimiters(cents, 0);
            break;
        case 'amount_with_comma_separator':
            value = formatWithDelimiters(cents, 2, '.', ',');
            break;
        case 'amount_no_decimals_with_comma_separator':
            value = formatWithDelimiters(cents, 0, '.', ',');
            break;
    }

    return formatString.replace(placeholderRegex, value);
};
var links = document.links;
for (let i = 0, linksLength = links.length ; i < linksLength ; i++) {
    if (links[i].hostname !== window.location.hostname) {
        links[i].target = '_blank';
        links[i].rel = 'noreferrer noopener';
    }
}


function updateCart(){
    setTimeout(function(){
            $('#update-cart').attr('href',"/cart");
            window.location = $('#update-cart').attr('href');

    }, 500);
}

jQuery(document).ready(function($){


    if (document.cookie.indexOf("AlertClosed") >= 0) {
        $('#shopify-section-static-announcement #alert-bar').hide();
    }

    $('#alert-bar .close').on('click', function(){
        /*
        var now = new Date();
        var time = now.getTime();
        var expireTime = time + 24 * 60 * 60 * 1000;
        //expires in 24 hours
        now.setTime(expireTime);
        document.cookie = "AlertClosed=yes; expires=" + now.toGMTString() + "; path=/";
         */
        $('#shopify-section-static-announcement #alert-bar').hide();
        //console.log(document.cookie);
    });

    $('.sitemain-product select').on('change', function(){
        setTimeout(function(){
            var updPrice = $('.template-product .product-pricing .price__current .money').text();
            var pOnly = updPrice.replace("$", "");
            console.log(pOnly);
            $('#bbsTotal').text(pOnly);
        }, 1000);
    });

    $('.top-product-showcase .product-showcase-slides').slick({
        arrows: true,
        autoplay: false,
        dots: false,
        fade: false,
        infinite: false,
//lazyLoad: 'ondemand',
        slidesToShow: 2,
        slidesToScroll: 1,
        appendArrows: $('#top-slide-arrows'),
        prevArrow: '<button class="slide-arrow prev-arrow"><div class="visually-hidden">previous slide</div><i class="fa-regular fa-arrow-left"></i></button>',
        nextArrow: '<button class="slide-arrow next-arrow"><div class="visually-hidden">next slide</div><i class="fa-regular fa-arrow-right"></i></button>',
        variableWidth: true,
        responsive: [
            {
                breakpoint: 960,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    });
    // equalize height
    var highestTitleBox = 0;
    var highestBox = 0;

    //Title Height (exclude frequently bought together)
    $('.top-product-showcase .productitem--title').css({'height': ''});
    $('.top-product-showcase .productitem--title').each(function () {
        // If this box is higher than the cached highest then store it
        if ($(this).height() > highestTitleBox) {
            highestTitleBox = $(this).height();
        }
    });
    $('.top-product-showcase .productitem--title').height(highestTitleBox);
    //box height (exclude frequently bought together)
    $('.top-product-showcase .productgrid--item').css({'height': ''});
    $('.top-product-showcase .productgrid--item').each(function () {
        // If this box is higher than the cached highest then store it
        if ($(this).height() > highestBox) {
            highestBox = $(this).height();
        }
    });
    $('.top-product-showcase .productgrid--item').height(highestBox);





    $('.product-slider').slick({
        arrows: false,
        autoplay: false,
        dots: true,
        slidesToShow: 5,
        slidesToScroll: 5,
        fade: true,
        infinite: false,
        loop: false,
        lazyLoad: 'ondemand',
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                }
            },
            {
                breakpoint: 720,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    })

    $('.top-product-slider').slick({
        arrows: false,
        autoplay: false,
        dots: false,
        appendArrows: $('.slide-arrows'),
        prevArrow: '<button class="slide-arrow prev-arrow"><div class="visually-hidden">previous slide</div><i class="fa-regular fa-arrow-left"></i></button>',
        nextArrow: '<button class="slide-arrow next-arrow"><div class="visually-hidden">next slide</div><i class="fa-regular fa-arrow-right"></i></button>',
        lazyLoad: 'ondemand',
        fade: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: false,
        loop: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 720,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
        ]
    })

    //was org       slidesToShow: 3,
    //         slidesToScroll: 2,
    //variableWidth: true,
    $( ".f-cat-wrapper" ).each(function() {
        $(this).find('.category-featured-slider').slick({
            arrows: true,
            autoplay: false,
            dots: false,
            infinite: false,
            lazyLoad: 'ondemand',
            slidesToShow: 5,
            slidesToScroll: 3,
            appendArrows: $(this).find('.f-cat-slider__content .slide-arrows'),
            prevArrow: '<button class="slide-arrow prev-arrow"><div class="visually-hidden">previous slide</div><i class="fa-regular fa-arrow-left"></i></button>',
            nextArrow: '<button class="slide-arrow next-arrow"><div class="visually-hidden">next slide</div><i class="fa-regular fa-arrow-right"></i></button>',
            variableWidth: true,
            responsive: [
                {
                    breakpoint: 960,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                    }
                },
                {
                    breakpoint: 640,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    }
                }
            ]
        })
    });

    // equalize height
    var highestTitleBox = 0;
    var highestBox = 0;

    //Title Height (exclude frequently bought together)
    $('.f-cat-slider__content .productitem--title').css({'height': ''});
    $('.f-cat-slider__content .productitem--title').each(function () {
        // If this box is higher than the cached highest then store it
        if ($(this).height() > highestTitleBox) {
            highestTitleBox = $(this).height();
        }
    });
    $('.f-cat-slider__content .productitem--title').height(highestTitleBox);
    //box height (exclude frequently bought together)
    $('.f-cat-slider__content .productgrid--item').css({'height': ''});
    $('.f-cat-slider__content .productgrid--item').each(function () {
        // If this box is higher than the cached highest then store it
        if ($(this).height() > highestBox) {
            highestBox = $(this).height();
        }
    });
    $('.f-cat-slider__content .productgrid--item').height(highestBox);


    // equalize height
    var tileHighestTitleBox = 0;
    var tileHighestBox = 0;

    //Title Height (exclude frequently bought together)
    var tileHighestBox = $('.f-cat-slider__content .rel-slider-item').first().height();

    $('.f-cat-slider__content .slider-fade-r').height(tileHighestBox);


    $('.brand-slider').slick({
        arrows: true,
        autoplay: false,
        dots: false,
        infinite: false,
        lazyLoad: 'ondemand',
        //slide: '.brand-slide',
        slidesToShow: 5,
        slidesToScroll: 5,
        fade: false,
        variableWidth: true,
        appendArrows: $('.brand-slider__content .slide-arrows'),
        prevArrow: '<button class="slide-arrow prev-arrow"><div class="visually-hidden">previous slide</div><i class="fa-regular fa-arrow-left"></i></button>',
        nextArrow: '<button class="slide-arrow next-arrow"><div class="visually-hidden">next slide</div><i class="fa-regular fa-arrow-right"></i></button>',
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                }
            },
            {
                breakpoint: 720,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
        ]
    })
    let searchParams = new URLSearchParams(window.location.search)
    $(".options-selection__input-select").change(function(){
        setTimeout(()=>{
            count = 1;
            let searchParams = new URLSearchParams(window.location.search)
            searchParams.has('variant')
            let param = searchParams.get('variant')
            $('.variant-sku').css('display', 'none');
            //console.log(param)
            $('#v' + param).css('display', 'block');
            //other var specs like stock status and master qty. FYI Var-specs and Var are uses in more than one place for this functionality
            $('.product--outer .var-specs').css('display', 'none');
            $('.var' + param).css('display', 'block');

            var vid = $('#v' + param).data('vid');
            var vstep = $('#v' + param).data('increment');
            var erpsku = $('#v' + param).data('erpsku');
            var tier = $('#v' + param).data('tier');
            var org_price = $('#v' + param).data('orgprice');
            var availqty = $('#v' + param).data('available-qty');
            var sku = $('#v' + param + " span").html(); //needed to show sku on checkout
            if($('.var' + param + ".status-area .status-time").html()){
                var status = $('.var' + param + ".status-area .main-notice").html()+" ("+$('.var' + param + ".status-area .status-time").html()+")";
            }else{
                var status = $('.var' + param + ".status-area .main-notice").html();
            }
            if(vid == param){
                $('input[name="properties[_erp_sku]"]').attr('value', erpsku);
                $('input[name="properties[Sku]"]').attr('value', sku);
                $('input[name="properties[Status]"]').attr('value', status);
                $('input[name="properties[_tiered_pricing]"]').attr('value', tier);
                $('input[name="properties[_org_price]"]').attr('value', org_price);
                $('input[name="properties[_available_qty]"]').attr('value', availqty);
                $('#product-quantity-input').data('step', vstep);
                $('.qtyminus').data('step', vstep);
                $('.qtyplus').data('step', vstep);
                $('#product-quantity-input').attr('data-step', vstep);
                $('#product-quantity-input').attr('value',vstep);
                $('.qtyminus').attr('data-step', vstep);
                $('.qtyplus').attr('data-step', vstep);
                $('#product-quantity-input').val(vstep);
                $('.product_step').attr('value', vstep);
                // $('properties[_product_step]').attr('value', vstep);
                $('input[name="properties[_product_step]"]').attr('value', vstep);
            }
            $('.rel-product-tab-header.active-tab').click();


        },300);
    });
    if(searchParams.has('variant')){
        searchParams.has('variant')
        let param = searchParams.get('variant')
        $('.variant-sku').css('display', 'none');
        $('#v' + param).css('display', 'block');
        console.log(param)
    }else{
        $('.variant-sku').css('display', 'none');
        $('.variant-sku.current').css('display', 'block');
    }

    $('.productitem .jdgm-prev-badge__stars').attr('tabindex',-1);
    $('.category-slider-wrapper .slides .product-slide .jdgm-prev-badge__stars').attr('tabindex',-1);
    $('.category-featured-slider .product-slide .jdgm-prev-badge__stars').attr('tabindex',-1);
    $('.productgrid--item').attr('tabindex',-1);
    $('.productgrid--item .jdgm-prev-badge__stars').attr('tabindex',-1);
    $('form[aria-expanded="true"]').removeAttr('aria-expanded');
    $('.collection-filters__filter-range').removeAttr('aria-expanded');

    // This button will increment the value
    $('.qtyplus').click(function(e){
        // Stop acting like a button
        e.preventDefault();
        // Get the field name
        const $field = $('input[name='+ $(this).data('field') + ']');
        if($('#product-quantity-input').data('step')){
            var step = $('#product-quantity-input').data('step');
        } else {
            var step = 1
        }
        // Get its current value
        const currentVal = parseInt($field.val());
        const value = !isNaN(currentVal) ? currentVal + step : 0
        $field.val(value);
        $('#qtybox').trigger('qty.changed', {value})
    });

    $('#product-quantity-input').change(function() {
        if($('#product-quantity-input').data('step')){
            var step = $('#product-quantity-input').data('step');
        } else {
            var step = 1
        }
        var val = $(this).val()
        if(val % step == 0){
            console.log('true')
        }else{
            console.log('false');
            var htmlString = 'The quantity must be in multiples of '+ step +'';
            $('.qtyMsg').text( htmlString );
            $(this).val(step);
        }
    });

    // This button will decrement the value till 0
    $(".qtyminus").click(function(e) {
        // Stop acting like a button
        e.preventDefault();
        // Get the field name
        if($('#product-quantity-input').data('step')){
            var step = $('#product-quantity-input').data('step');
        } else {
            var step = 1
        }
        const $field = $('input[name='+ $(this).data('field') + ']');
        // Get its current value
        const currentVal = parseInt($field.val());
        const value = !isNaN(currentVal) && currentVal > 0 ? currentVal - step : 0

        $field.val(value);
        $('#qtybox').trigger('qty.changed', {value})
    });

    $('.stepValItem .form-field-number').change(function() {
        var step = $(this).data('step');
        if($(this).data('step')){
            var step = $(this).data('step');
        } else {
            var step = 1
        }
        var original = $(this).data('original');
        var qtkey = $(this).data('qtkey').replace(':', '');
        var val = $(this).val()
        if(val % step == 0){
            console.log('true')
            $('#'+qtkey).text('');
        }else{
            $('#'+qtkey).text('The quantity must be in multiples of '+ step );
            $(this).val(original);
        }
    });

    $('.qty').on('change', () => {
        $('#qtybox').trigger('qty.changed', {value: $(this).val()})
        // $("#product-quantity-input").val({value: $(this).val()});
    })

    $('.p-disc-info-toggle').click(function(e) {
        e.preventDefault();
        $('#quantity-discount-infobox').toggleClass('hidden');
    });

    $('.readmore').click(function (event) {
        event.preventDefault();
        // var descriptionFull = document.querySelector('.product-description-full');
        // descriptionFull.style.display = 'block';
        // var descriptionShort = document.querySelector('.product-description-short');
        // descriptionShort.style.display = 'none';
        var targetEle = this.hash;
        var $targetEle = $(targetEle);
        $('html, body').stop().animate({
            'scrollTop': $targetEle.offset().top
        }, 800, 'swing', function () {
            window.location.hash = targetEle;
        });
    });

    $('.readless').click(function (event) {
        event.preventDefault();
        var descriptionFull = document.querySelector('.product-description-full');
        descriptionFull.style.display = 'none';
        var descriptionShort = document.querySelector('.product-description-short');
        descriptionShort.style.display = 'block';
    });

    $('.main-slider').slick({
        arrows: true,
        autoplay: false,
        dots: false,
        infinite: false,
        lazyLoad: 'ondemand',
        slidesToShow: 1,
        slidesToScroll: 1,
        appendArrows: $('#main-slide-arrows'),
        prevArrow: '<button class="slide-arrow prev-arrow"><div class="visually-hidden">previous slide</div><i class="fa-regular fa-arrow-left"></i></button>',
        nextArrow: '<button class="slide-arrow next-arrow"><div class="visually-hidden">next slide</div><i class="fa-regular fa-arrow-right"></i></button>',
    });
    $window = $(window);
    $frequent_slider = $('.frequently-bought-together .container .row');
    freqsettings = {
        arrows: false,
        autoplay: false,
        dots: false,
        infinite: false,
        //lazyLoad: 'ondemand',
        slidesToShow: 1,
        slidesToScroll: 1,
        //appendArrows: $('#main-slide-arrows'),
        //prevArrow: '<button class="slide-arrow prev-arrow"><i class="fa-regular fa-arrow-left"></i></button>',
        //nextArrow: '<button class="slide-arrow next-arrow"><i class="fa-regular fa-arrow-right"></i></button>',
        responsive: [
            {
                breakpoint: 960,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };
    if ($window.width() < 1200) {
        $frequent_slider.slick(freqsettings);
    }

    $window.on('resize', function() {
        if ($window.width() > 1200) {
            if ($frequent_slider.hasClass('slick-initialized'))
                $frequent_slider.slick('unslick');
            return
        }
        if ( ! $frequent_slider.hasClass('slick-initialized'))
            return $frequent_slider.slick(freqsettings);
    });

    $('.related-blog-product-contain').slick({
        arrows: true,
        autoplay: false,
        dots: false,
        infinite: false,
        lazyLoad: 'ondemand',
        //slide: '.brand-slide',
        slidesToShow: 5,
        slidesToScroll: 5,
        fade: false,
        variableWidth: true,
        appendArrows: $('.brand-slider__content .slide-arrows'),
        prevArrow: '<button class="slide-arrow prev-arrow"><div class="visually-hidden">previous slide</div><i class="fa-regular fa-arrow-left"></i></button>',
        nextArrow: '<button class="slide-arrow next-arrow"><div class="visually-hidden">next slide</div><i class="fa-regular fa-arrow-right"></i></button>',
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 4,
                }
            },
            {
                breakpoint: 720,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 2,
                }
            },
        ]
    });


    $('#gift-slds').slick({
        arrows: true,
        autoplay: false,
        dots: false,
        infinite: false,
        lazyLoad: 'ondemand',
        slidesToShow: 6,
        slidesToScroll: 3,
        appendArrows: $('#sim-slide-arrows'),
        prevArrow: '<div class="slide-arrow prev-arrow"><div class="visually-hidden">previous slide</div><i class="fa-regular fa-arrow-left"></i></div>',
        nextArrow: '<div class="slide-arrow next-arrow"><div class="visually-hidden">next slide</div><i class="fa-regular fa-arrow-right"></i></div>',
        variableWidth: false,
        responsive: [
            {
                breakpoint: 960,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    });
    setTimeout(()=>{
        count = 1;
        $('#sim-slds').slick({
            arrows: true,
            autoplay: false,
            dots: false,
            infinite: true,
            lazyLoad: 'ondemand',
            slidesToShow: 5,
            slidesToScroll: 3,
            appendArrows: $('#sim-slide-arrows'),
            prevArrow: '<button class="slide-arrow prev-arrow"><div class="visually-hidden">previous slide</div><i class="fa-regular fa-arrow-left"></i></button>',
            nextArrow: '<button class="slide-arrow next-arrow"><div class="visually-hidden">next slide</div><i class="fa-regular fa-arrow-right"></i></button>',
            variableWidth: true,
            responsive: [
                {
                    breakpoint: 960,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                    }
                },
                {
                    breakpoint: 640,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    }
                }
            ]
        });
    },1500);


    // load related sliders
    /* Moved to empire to allow for button binding
    setTimeout(()=>{
        $( ".rel-slider-item-ajax" ).each(function() {
            const handle = $(this).data('handle');
            const fetchUrl = `${window.Theme.routes.all_products_collection_url}/products/${handle}?view=slider-card`;
            $.get(fetchUrl).then(response => {
                if (response) {
                    if(response.includes("data-product-item")){
                        $( ".parts-data-area .loading-text" ).hide();
                        $(this).html(response);
                    }
                }else{
                    console.log('product not returned');
                }
            })
        });
    },500);
*/


    // tabbed related products code
    $('.rel-product-tab-header').on('click', function(){
        var varid = $('.product-detail-sku:visible').data('vid');
        var itemId = $(this).attr('id').replace('tab-','').replace('-header','');
        $('.rel-product-tab-header').removeClass('active-tab');
        $('#tab-'+itemId+'-header').addClass('active-tab');
        // $('.tabbed-rel-slider').hide();
        // $('#'+itemId+'-slider').show();
        // $('.rel-slide-arrows').hide();
        // $('#'+itemId+'-slider-arrows').show();

        $('.tabbed-rel-slider').addClass("sliderhidden");
        if($('#'+itemId+'-'+varid+'-slider').length > 0 ) {
            // var
            $('#' + itemId + '-' + varid + '-slider').removeClass("sliderhidden");
            $('.rel-slide-arrows').addClass("sliderhidden");
            $('#' + itemId + '-' + varid + '-slider-arrows').removeClass("sliderhidden");
        }else{
            // main
            $('#'+itemId+'-slider').removeClass("sliderhidden");
            $('.rel-slide-arrows').addClass("sliderhidden");
            $('#'+itemId+'-slider-arrows').removeClass("sliderhidden");
        }


        // equalize height
        var highestTitleBox = 0;
        var highestBox = 0;
        var slideritemId = itemId+'-rel-item';

        //Title Height (exclude frequently bought together)
        $('.' + slideritemId + ' .productitem--title').css({'height': ''});
        $('.' + slideritemId + ' .productitem--title').each(function () {
            // If this box is higher than the cached highest then store it
            if ($(this).height() > highestTitleBox) {
                highestTitleBox = $(this).height();
            }
        });

        $('.' + slideritemId + ' .productitem--title').height(highestTitleBox);
        $('.related-fade-r').addClass("sliderhidden");

        if(slideritemId != "freq_bought-rel-item") {
            //box height (exclude frequently bought together)
            $('.' + slideritemId + ' .productgrid--item').css({'height': ''});
            $('.' + slideritemId + ' .productgrid--item').each(function () {
                // If this box is higher than the cached highest then store it
                if ($(this).height() > highestBox) {
                    highestBox = $(this).height();
                }
            });
            $('.' + slideritemId + ' .productgrid--item').height(highestBox);

            $('#' + slideritemId + '-slider-fade-r').height(highestBox+20).removeClass("sliderhidden");


            if(slideritemId == "part_items-rel-item" || slideritemId == "part_used_on-rel-item") {
                $( ".parts-data-area .part-item" ).each(function() {
                    const handle = $(this).data('handle');
                    const fetchUrl = `${window.Theme.routes.all_products_collection_url}/products/${handle}?view=partsrow`;
                    $.get(fetchUrl).then(response => {
                        if (response) {
                            if(response.includes("data-part-title")){
                                $( ".parts-data-area .loading-text" ).hide();
                                $(this).html(response);
                            }
                        }else{
                            console.log('product not returned');
                        }
                    })
                });
            }


        }



    });

    //tabbed sliders:
    function sliderGo() {
        $(".rel-product-tabbed-area .tabbed-rel-slider:not('.tabbed-rel-freq, .resource-tabbed-rel-slider, #part_items-slider, #part_used_on-slider')").each(function (index) {
            var itemId = $(this).attr('id');
            var sliderArrows = '#' + itemId + '-arrows';
            $('#' + itemId).slick({
                arrows: true,
                autoplay: false,
                dots: false,
                infinite: false,
                lazyLoad: 'ondemand',
                slidesToShow: 5,
                slidesToScroll: 4,
                appendArrows: $(sliderArrows),
                prevArrow: '<button class="slide-arrow prev-arrow"><div class="visually-hidden">previous slide</div><i class="fa-regular fa-arrow-left"></i></button>',
                nextArrow: '<button class="slide-arrow next-arrow"><div class="visually-hidden">next slide</div><i class="fa-regular fa-arrow-right"></i></button>',
                variableWidth: true,
                responsive: [
                    {
                        breakpoint: 960,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3,
                        }
                    },
                    {
                        breakpoint: 640,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                        }
                    }
                ]
            });
        });

        // Equalize Title Height which is exlcuded above
        $(".rel-product-tabbed-area .tabbed-rel-freq").each(function (index) {
            var itemId = $(this).attr('id');

            // Equalize Box and Title Height
            // var slideritemId = itemId.replace('-slider', '-rel-item');
            var slideritemId = itemId;
            //Title Height
            var highestTitleBox = 0;
            $('#' + slideritemId + ' .productitem--title').each(function () {
                if ($(this).height() > highestTitleBox) {
                    highestTitleBox = $(this).height();
                }
            });
            $('#' + slideritemId + ' .productitem--title').height(highestTitleBox);
        });
    }
    //check for slider, initiate slider if not found, continue to run since atc functionlity will remove it if slider runs early
    function checkRelSlider(){
        if($('.rel-product-tabbed-area .slick-initialized').length) {
            equalRelCards();
            // console.log('slider found');
            /*
            $(".rel-product-tabbed-area .tabbed-rel-freq").each(function (index) {
                var itemId = $(this).attr('id');

                // Equalize Box and Title Height
                var slideritemId = itemId.replace('-slider', '-rel-item');

                //Title Height
                var highestTitleBox = 0;
                $('.' + slideritemId + ' .productitem--title', this).each(function () {
                    if ($(this).height() > highestTitleBox) {
                        highestTitleBox = $(this).height();
                    }
                });
                $('.' + slideritemId + ' .productitem--title', this).height(highestTitleBox);
            });


            // related products equalize title height

            var highestTitleBox = 0;
            $('.tabbed-rel-slider .productitem--title').each(function () {
                if ($(this).height() > highestTitleBox) {
                    highestTitleBox = $(this).height();
                }
            });
            var highestBox = 0;
            $('.tabbed-rel-slider .productgrid--item').each(function () {
                if ($(this).height() > highestBox) {
                    highestBox = $(this).height();
                }
            });
            if($(window).width() > 719){
                $('.tabbed-rel-slider .productitem--title').height(highestTitleBox);
                $('.tabbed-rel-slider .productgrid--item').height(highestBox);
            }
*/

        }else{
            // console.log('slider not found');
            sliderGo();
            equalRelCards();
        }
    }

    //check for slide ever 2 seconds for 10 seconds
    var i=0;
    var myfunc = setInterval(function(){
        i = i + 1;
        checkRelSlider();
        // console.log('slide check at '+ 2*i + ' seconds');
        if(i==5) {
            clearInterval(myfunc);
        }
    }, 3000);


    setTimeout(()=>{
        //first load. show only images
        var orig_html = $('.gallery-navigation-horizontal-scroller-slick').html();
        $('.gall-placeholder').html(orig_html);
        $('.gallery-navigation-horizontal-scroller-slick .product-gallery--video-thumbnail').remove();

        $('.gallery-navigation-horizontal-scroller-slick').slick({
            arrows: true,
            autoplay: false,
            dots: false,
            infinite: false,
            //lazyLoad: 'ondemand',
            slidesToScroll: 3,
            appendArrows: $('.slickbuttons'),
            prevArrow: '<button class="slide-arrow prev-arrow"><div class="visually-hidden">previous slide</div><i class="fa-regular fa-arrow-left"></i></button>',
            nextArrow: '<button class="slide-arrow next-arrow"><div class="visually-hidden">next slide</div><i class="fa-regular fa-arrow-right"></i></button>',
            slidesToShow: 4,
            responsive: [
                {
                    breakpoint: 1079,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 2
                    }
                }
            ]
        });
    },500);

    $('.product-gallery .thumb-show').on('click', function(){
        $( '.product-gallery .thumb-show' ).removeClass('active-tab');
        $( this ).addClass('active-tab');
        $('.product-gallery--media-thumbnail').hide();

        $('.gallery-navigation-horizontal-scroller-slick').slick('unslick');

        if($('.gall-placeholder').html() == ""){
            var orig_html = $('.gallery-navigation-horizontal-scroller-slick').html();
            $('.gall-placeholder').html(orig_html);
        }else{
            var orig_html = $('.gall-placeholder').html();
            $('.gallery-navigation-horizontal-scroller-slick').html(orig_html);
        }


        if ( $( this ).hasClass( "video-thumbs" ) ) {
            $('.gallery-navigation-horizontal-scroller-slick .product-gallery--image-thumbnail').remove();
        }else if($( this ).hasClass( "imgs-thumbs" )){
            $('.gallery-navigation-horizontal-scroller-slick .product-gallery--video-thumbnail').remove();
        }
        setTimeout(()=>{
            $('.gallery-navigation-horizontal-scroller-slick').slick({
                arrows: true,
                autoplay: false,
                dots: false,
                infinite: false,
                //lazyLoad: 'ondemand',
                slidesToScroll: 3,
                appendArrows: $('.slickbuttons'),
                prevArrow: '<button class="slide-arrow prev-arrow"><div class="visually-hidden">previous slide</div><i class="fa-regular fa-arrow-left"></i></button>',
                nextArrow: '<button class="slide-arrow next-arrow"><div class="visually-hidden">next slide</div><i class="fa-regular fa-arrow-right"></i></button>',
                slidesToShow: 4,
                responsive: [
                    {
                        breakpoint: 1079,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 2
                        }
                    }
                ]
            });

        },10);
        setTimeout(()=>{
        $('.product-gallery--media-thumbnail').show();
        },100);
    });

    $('.js-load-more').on('click', function(){
        var $this =$(this),
            totalPages = parseInt($('[data-all-pages]').val()),
            currentPage = parseInt($('[data-this-page]').val()),
            datacollurl = $('[data-coll-url]').val();
        $this.attr('disabled', true);
        $this.find('[load-more-text]').addClass('hide');
        $this.find('[loader]').removeClass('hide');
        var nextUrl = $('[data-next-link]').val();
        var current_page_new = currentPage + 1;
        var next_coll = currentPage + 2;
        //alert(current_page_new)
        //return false;
        $.ajax({
            url: nextUrl,
            type: 'GET',
            dataType: 'html',
            success: function(responseHTML){
                $('[data-next-link]').val(datacollurl + "?page="+next_coll);
                $('[data-this-page]').val(current_page_new);
                $('.grid--view-items').append($(responseHTML).find('.grid--view-items').html());
            },
            complete: function() {
                if(current_page_new < totalPages) {
                    $this.attr('disabled', false); $this.find('[load-more-text]').removeClass('hide'); $this.find('[loader]').addClass('hide');
                }
                if(current_page_new >= totalPages) {
                    $this.find('[load-more-text]').text('Products Finished').removeClass('hide'); $this.find('[loader]').addClass('hide');
                }
            }
        })
    });

    $('.productgrid--sidebar-title').on('click',function(){
        $(this).siblings().toggleClass('hidden');
        $(this).children().toggleClass('rotate-180');
    });

    //Adding Back Button and Menu title to mobile submenus
    $(document).on('click', 'a[title="Back"]', function(){
        $(this).closest('.tmenu_submenu').animate(
            {left: "-99999px"}, 750, 'swing', function () {
                $(this).closest('.tmenu_item_active').removeClass('tmenu_item_active');
                $(this).closest('.tmenu_submenu').css('left', 0);
            });
    });

    //Collapse filters groups after the 3rd one
    var expanded = 0;
    $('.collection-filters__filter-group-heading').each(function(){
        expanded++;
        if(expanded > 3){
            $(this).trigger('click');
        }
    });

    //Add show more button after 4 filter items in each group
    $('.collection-filters__filter-list').each(function(){
        var filterChoices = 0;
        var $this = $(this);
        $this.children('.collection-filters__filter-list-item').each(function(){
            filterChoices++;
            if(filterChoices > 4){
                $(this).addClass('closed');
            }
        });
        if(filterChoices > 4){
            $(this).append('<div class="showItems">Show More</div>');
        }
    })

    $(document).on('click','.showItems', function(){
        $(this).siblings('li').removeClass('closed');
        $(this).toggle();
    });

    // Bundle qty handling
    const $sub_product_container = $('[data-bundle-subproducts]')
    const $bundle_price = $('[data-bundle-price]')
    const $bundle_button = $('[data-bundle-product-atc]')
    if($sub_product_container.length) {
        if($('#product-quantity-input').val() > 1){
            $bundle_price.html('—')
        }

        $('#qtybox').on('qty.changed', function (_, data){
            const $bundle_price = $('[data-bundle-price]')
            const baseValue = parseInt(data.value, 10)
            const value = isNaN(baseValue) ? 1 : baseValue
            let price = 0
            $sub_product_container.find('[data-bundle-subproduct], [data-bundle-subproduct-free]').each(function(){
                const baseQty = $(this).data('qty')
                $(this).val(baseQty * value)
                price += ($(this).data('price') * baseQty * value)
            })
            const price_output = formatMoney(price)
            $bundle_price.html(price_output)
        })

        $bundle_button.on('click', async function(e) {
            e.preventDefault()
            $(this).find('.atc-button--text').hide();
            $(this).find('.atc-button--icon').css({"visibility": "visible", "opacity": "100"});
            const bundle = $(this).data('bundle')
            const form_template = {
                form_type: 'product',
                utf8: '✓',
                'properties[_erp_sku]': '',
                'properties[Sku]': '',
                'properties[_tiered_pricing]': '',
                'properties[_bundle_product]': bundle,
                'properties[_available_qty]': '',
                'properties[_org_price]': '',
                'properties[Notification]': '',
                'id': '',
                'quantity': 0
            }

            const form_datas = []
            $sub_product_container.find('[data-bundle-subproduct], [data-bundle-subproduct-free]').each(function() {
                form_template["properties[_erp_sku]"] = $(this).data('erpsku')
                form_template["properties[_sf_eligible]"] = $(this).data('sfeligible')
                form_template["properties[Sku]"] = $(this).data('vissku')
                form_template["properties[Status]"] = $(this).data('status')
                form_template["properties[_tiered_pricing]"] = $(this).data('tieredpricing')
                form_template["properties[_available_qty]"] = $(this).data('availqty')
                form_template["properties[_org_price]"] = $(this).data('price')
                form_template["properties[Notification]"] = $(this).data('notification')
                form_template.id = $(this).data('id') + ""
                form_template.quantity = $(this).val() + ""

                form_datas.push({...form_template})

                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                    event: 'ee_addToCart',
                    product_name: $(this).data('title'),
                    product_id : $(this).data('parentid'),
                    product_price: $(this).data('price')/100,
                    product_brand:  $(this).data('brand'),
                    currency: "USD",
                    product_type: $(this).data('type'),
                    category_id: "",
                    category_title: "",
                    variant_id: $(this).data('id'),
                    variant_title: $(this).data('vartitle'),
                    product_sku: $(this).data('vissku'),
                    quantity: $(this).val(),
                    atc_loc: "Bundle Item"
                });


                var name = "atcloc";
                var thisCookie = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
                if (thisCookie){
                    var newCookieVal = thisCookie[2] + "::"+$(this).data('vissku')+":"+"Bundle Item";
                }else{
                    var newCookieVal = $(this).data('vissku')+":"+"Bundle Item";
                }
                document.cookie = "atcloc="+newCookieVal+"; expires=0; path=/";

            });
            // console.log(window.dataLayer);

            form_datas.reverse();
            for(const f of form_datas){
                await $.ajax({
                    type: 'POST',
                    url: `${window.Theme.routes.cart_add_url}.js`,
                    data: f,
                    dataType: 'json'
                })
            }

            location.href = window.Theme.routes.cart_url
        })
    }


    // Frequently Bought Together Add to cart (Bundle qty handling)
    const $freq_sub_product_container = $('.freq-bought-items') //items
    const $freq_bundle_button = $('[data-freqbundle-product-atc]')
    if($freq_sub_product_container.length) {
        //trigger price on load
        freqPriceCalc();

        //add to cart
        $freq_bundle_button.on('click', async function(e) {
            console.log('adding products');
            e.preventDefault();
            $(this).find('.atc-button--text').hide();
            $(this).find('.atc-button--icon').css({"visibility": "visible", "opacity": "100"});
            const form_template = {
                form_type: 'product',
                utf8: '✓',
                'properties[_erp_sku]': '',
                'properties[_sf_eligible]': '',
                'properties[Sku]': '',
                'properties[_tiered_pricing]': '',
                'properties[_org_price]': '',
                'properties[_available_qty]': '',
                'properties[Notification]': '',
                'id': '',
                'quantity': 0
            }

            const form_datas = []
            var missingOptions = 0;
            $freq_sub_product_container.find('[data-freqbundle-subproducts]').each(function() {
                $(this).find('.freq-var-select').css('border','');
                if($(this).find('.freq-check').is(':checked')){
                    if($(this).find('.current-freq-var [data-freqbundle-subproduct]').data('var_vissku')){

                        // console.log("ERP: "+$(this).find('.current-freq-var [data-freqbundle-subproduct]').data('var_erpsku'));
                        // console.log("vissku: "+$(this).find('.current-freq-var [data-freqbundle-subproduct]').data('var_vissku'));
                        // console.log("status: "+$(this).find('.current-freq-var [data-freqbundle-subproduct]').data('var_status'));
                        // console.log("tier: "+$(this).find('.current-freq-var [data-freqbundle-subproduct]').data('var_tieredpricing'));
                        // console.log("var id: "+$(this).find('.current-freq-var [data-freqbundle-subproduct]').data('var_id'));
                        // console.log("--------");

                        // log ee_addToCart for analytics
                        window.dataLayer = window.dataLayer || [];

                        window.dataLayer.push({
                            event: 'ee_addToCart',
                            product_name: $(this).find('.productitem--title').text().trim(),
                            product_id : $(this).find('[data-product-item]').attr('id').replace("freq-product-",""),
                            product_price: $(this).find('.current-freq-var [data-freqbundle-subproduct]').data('var_price')/100,
                            product_brand:  $(this).find('.current-freq-var [data-freqbundle-subproduct]').data('brand'),
                            currency: "USD",
                            product_type: $(this).find('.current-freq-var [data-freqbundle-subproduct]').data('producttype'),
                            variant_id: $(this).find('.current-freq-var [data-freqbundle-subproduct]').data('var_id'),
                            product_sku:  $(this).find('.current-freq-var [data-freqbundle-subproduct]').data('var_vissku'),
                            quantity: "1",
                            atc_loc: "Frequently Bought Together"
                        });


                        var name = "atcloc";
                        var thisCookie = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
                        if (thisCookie){
                            var newCookieVal = thisCookie[2] + "::"+$(this).find('.current-freq-var [data-freqbundle-subproduct]').data('var_vissku')+":"+"Frequently Bought Together";
                        }else{
                            var newCookieVal = $(this).find('.current-freq-var [data-freqbundle-subproduct]').data('var_vissku')+":"+"Frequently Bought Together";
                        }
                        document.cookie = "atcloc="+newCookieVal+"; expires=0; path=/";

                        // console.log(window.dataLayer);
                        // missingOptions = 1;

                        form_template["properties[_erp_sku]"] = $(this).find('.current-freq-var [data-freqbundle-subproduct]').data('var_erpsku');
                        form_template["properties[_sf_eligible]"] = $(this).find('.current-freq-var [data-freqbundle-subproduct]').data('sfeligible');
                        form_template["properties[Sku]"] = $(this).find('.current-freq-var [data-freqbundle-subproduct]').data('var_vissku');
                        form_template["properties[Status]"] = $(this).find('.current-freq-var [data-freqbundle-subproduct]').data('var_status');
                        form_template["properties[_tiered_pricing]"] = $(this).find('.current-freq-var [data-freqbundle-subproduct]').data('var_tieredpricing');
                        form_template["properties[_available_qty]"] = $(this).find('.current-freq-var [data-freqbundle-subproduct]').data('var_availqty');
                        form_template["properties[_org_price]"] = $(this).find('.current-freq-var [data-freqbundle-subproduct]').data('var_price');
                        form_template["properties[Notification]"] = $(this).find('.current-freq-var [data-freqbundle-subproduct]').data('notification');
                        form_template["properties[_bundle_product]"] = $(this).find('.current-freq-var [data-freqbundle-subproduct]').data('bundle');
                        form_template.id = $(this).find('.current-freq-var [data-freqbundle-subproduct]').data('var_id') + ""
                        form_template.quantity = "1" + ""

                        form_datas.push({...form_template})
                    }else{
                        $(this).find('.freq-var-select').css('border','2px solid red');
                        missingOptions = 1;
                    }

                };
            });
            if(missingOptions != 1 && $('.freq-price span').text() != "0.00") {
                form_datas.reverse();
                for (const f of form_datas) {
                    await $.ajax({
                        type: 'POST',
                        url: `${window.Theme.routes.cart_add_url}.js`,
                        data: f,
                        dataType: 'json'
                    })
                }

                location.href = window.Theme.routes.cart_url
            }else {
                if(missingOptions == 1){
                    alert('Please choose an option.');
                }else{
                    alert("Please add a product.");
                }
                $(this).find('.atc-button--text').show();
                $(this).find('.atc-button--icon').css({"visibility": "hidden", "opacity": "0"});
            }
        })
    }

    // Frequently Bought Together total price calc

    function freqPriceCalc(){
        var freqBundPrice = 0;
        $freq_sub_product_container.find('[data-freqbundle-subproducts]').each(function() {
            if($(this).find('.freq-check').is(':checked')){
                if($(this).find('.current-freq-var .money').data("price")){
                    freqBundPrice = freqBundPrice + $(this).find('.current-freq-var .money').data("price");
                }
            }

        });
        freqBundPrice = freqBundPrice/100;
        // thisPrice = parseFloat(freqBundPrice);
        freqBundPrice = freqBundPrice.toLocaleString("en-US", {minimumFractionDigits: 2, maximumFractionDigits: 2});
        $('.freq-price span').html(freqBundPrice);
    }
    //update freq pricing on checkbox toggle
    $('.freq-check').click(function() {
        freqPriceCalc();
    });


    // Frequently Bought Together Variation Change
    $('.freq-var-select').on('change', function() {
        var thisProductId = $(this).attr('id').replace("freq-var-select-","");
        var thisVariantId = this.value;
        if(thisVariantId == ""){
            $("#freq-product-"+thisProductId+" .freq-check").prop('checked', false);

        }else{
            $("#freq-product-"+thisProductId+" .freq-check").prop('checked', true);
            $("#freq-product-"+thisProductId+" .freq-var-variables").removeClass("current-freq-var");
            $("#freq-product-"+thisProductId+" .freq-var"+thisVariantId).addClass("current-freq-var");


            $("#freq-product-"+thisProductId+" .product-data").attr('data-id', $("#freq-product-"+thisProductId+" #data-freq-var"+thisVariantId).attr('data-var_id'));
            $("#freq-product-"+thisProductId+" .product-data").attr('data-vissku', $("#freq-product-"+thisProductId+" #data-freq-var"+thisVariantId).attr('data-var_vissku'));
            $("#freq-product-"+thisProductId+" .product-data").attr('data-status', $("#freq-product-"+thisProductId+" #data-freq-var"+thisVariantId).attr('data-var_status'));
            $("#freq-product-"+thisProductId+" .product-data").attr('data-erpsku', $("#freq-product-"+thisProductId+" #data-freq-var"+thisVariantId).attr('data-var_erpsku'));
            $("#freq-product-"+thisProductId+" .product-data").attr('data-availqty', $("#freq-product-"+thisProductId+" #data-freq-var"+thisVariantId).attr('data-var_availqty'));
            $("#freq-product-"+thisProductId+" .product-data").attr('data-tieredpricing', $("#freq-product-"+thisProductId+" #data-freq-var"+thisVariantId).attr('data-var_tieredpricing'));
            $("#freq-product-"+thisProductId+" .product-data").attr('data-price', $("#freq-product-"+thisProductId+" #data-freq-var"+thisVariantId).attr('data-var_price'));
        }
        //recalc price
        freqPriceCalc();
    });

    $(document).on('click', '.site-header-menu-toggle--button', function(){
        if($(window).width() < 1130){
            if($('.site-mobile-nav').prop('data-open') === false || $('.site-mobile-nav').prop('data-open') === undefined){
                $('html').addClass('scroll-locked');
                $('.mobile-nav-panel').attr('data-animation-state', 'open')
                $('.mobile-nav-overlay').attr('data-animation-state', 'open')
                $('.site-mobile-nav').attr('data-open', true).attr('tabindex', -1)
            }
        }
    });

    $(document).on('click', '.mobile-nav-close', function(){
        $('html').removeClass('scroll-locked');
        $('.mobile-nav-panel').attr('data-animation-state', 'closed')
        $('.mobile-nav-overlay').attr('data-animation-state', 'closed')
        $('.site-mobile-nav').attr('data-open', false).attr('tabindex', 0)
    })

    $('.add-to-cart-btn.bundle-atc').on('click', async function(e){
        e.preventDefault();
        const bid = $(this).data('bid');

        const $bsub_product_container = $('[data-bundle-subproducts-'+bid+']')
        const $bbundle_price = $('[data-bundle-price]')


        const bundle = $(this).data('bundle')
        const form_template = {
            form_type: 'product',
            utf8: '✓',
            'properties[_erp_sku]': '',
            'properties[_tiered_pricing]': '',
            'properties[_bundle_product]': bundle,
            'id': '',
            'quantity': 0
        }
        const form_datas = []
        $bsub_product_container.find('[data-bundle-subproduct], [data-bundle-subproduct-free]').each(function() {
            form_template["properties[_erp_sku]"] = $(this).data('erpsku')
            form_template["properties[Sku]"] = $(this).data('vissku')
            form_template["properties[Status]"] = $(this).data('status')
            form_template["properties[_tiered_pricing]"] = $(this).data('tieredpricing')
            form_template["properties[_available_qty]"] = $(this).find('.current-freq-var [data-freqbundle-subproduct]').data('var_availqty');
            form_template["properties[_org_price]"] = $(this).find('.current-freq-var [data-freqbundle-subproduct]').data('var_price');
            form_template.id = $(this).data('id') + ""
            form_template.quantity = $(this).val() + ""

            form_datas.push({...form_template})
        });
        form_datas.reverse();
        for(const f of form_datas){
            await $.ajax({
                type: 'POST',
                url: `${window.Theme.routes.cart_add_url}.js`,
                data: f,
                dataType: 'json',
            })
        }

        location.href = window.Theme.routes.cart_url


    });


    $('#empty-cart').on('click', function(){
        window.location = $(this).data('href');
    })

    $('#bottom-strap-atc').click(function(e){
        e.preventDefault();
        //$("#p-atc").click();
        $('[data-product-form]').submit();
    });

    $('.cartitems .cartitems--list select').on('change', function(){
        setTimeout(function(){
            updateCart();
        }, 1000);
    });

    $('.form-field input[data-available-qty]').on( "blur", function(e) {
        e.preventDefault();
        var original = $(this).data('original');
        var available = $(this).data('available-qty');
        var newvalue = $(this).val();


        if(newvalue > available){
            $(this).val(original);
            $(this).closest( ".cart-item--info" ).find(".package-qt-info").show();
        }else{
            $(this).closest( ".cart-item--info" ).find(".package-qt-info").hide();
        }
    });

    $('.cart-item--remove-popup').on('click', function(e){
        e.preventDefault();
        var bundleItemClass = $(this).data('gall');
        var bundleName = $(this).data('name');
        $('#bundle-remove-alert').toggleClass('show');
        $('#bundle-remove-alert .remove').attr('data-gall', bundleItemClass);
        $('#itemName').text(bundleName);
        if(bundleName == "Free Gift Promo"){
            $('#bundle-remove-alert p').text("You are about to remove all items from the Free Gift Promo.")
        }
    });

    $('#bundle-remove-alert .remove').on('click', async function(e){
        e.preventDefault();
        var bundleItemClass = $(this).data('gall');
        var bundleClass = $('.'+bundleItemClass+'');
        var updates = {};
        //console.log(bundleClass); //output input for debug
        $.each(bundleClass, function (index, item) {
            updates[$(item).data('cartitem-key')]= 0;
        });
        console.log(updates)
        await $.ajax({
            type: 'POST',
            url: window.Shopify.routes.root + 'cart/update.js',
            data: {updates},
            dataType: 'json'
        }).success(function(data){
            //console.log('success',data);
            location.reload();
        });
        $('#bundle-remove-alert').removeClass('show');
    });
    $('#bundle-remove-alert .cancel').on('click', function(e){
        e.preventDefault();
        $('#bundle-remove-alert').removeClass('show');
    });

    if(window.location.pathname.includes('/apps/advanced-wishlist')){
        setTimeout(function(){
            $('.fancy_title').find('h3[data-wishlisttitle]').replaceWith(function() {
                return '<h1 data-wishlisttitle >' + $(this).text() + '</h1>';
            });
        }, 500);
    }

    //Link to bundles from parent popup (code duplicated in algolia_instant_search.js)
    var bndpopCounter = 0;
    $( ".bnd-pop" ).click(function( e ) {
        e.stopPropagation();
        if(bndpopCounter == 0){
            bndpopCounter++
            const handleArr = $(this).data('bndhandle').split(", ");
            $('.popup-container .content').append("<h2 style='margin-top:0;'>Package Options</h2>");
            var counter = 0;
            if($(this).hasClass("bnd-pop-2col")){
                var max = 2;
                $('.popup-container .content').append("<div class='package-option-container contain-2col'></div>");
            }else{
                var max = 1;
                $('.popup-container .content').append("<div class='package-option-container'></div>");
            }
            if($(this).hasClass("bnd-pop-extra")){
                const currHandle = $(this).data('currhandle')
                var randomNum = Math.floor(Math.random() * 100);
                $('.popup-container .content').append("<div class='package-extra'><a href='/products/"+currHandle+"?"+randomNum+"#bundles'>View More <i class='fa-solid fa-arrow-right-to-bracket'></i></a></div>");
            }
            $.each ( handleArr, function (indexes, handle){
                if(handle != "undefined" && handle != "" && counter < max){
                    var fetchUrl = `${window.Theme.routes.all_products_collection_url}/products/${handle}?view=bundle-pop`;
                    $.get(fetchUrl).then(response => {
                        if (response) {
                            $('.popup-container .content .package-option-container').append(response);
                        }else{
                            console.log('product not returned');
                        }
                    })
                    counter++
                }
            });

            setTimeout(() => {
                if($(this).hasClass("bnd-pop-2col")){
                    $('.popup-container').addClass('widepop');
                }
                $('.popup-container').removeClass('hidden');
                $(".pop-grad-head").removeClass('hidden');
                bndpopCounter = 0;
            }, "500");
        }
    });

    // Cart upsell popup
    $('.cart-upsell-btn').on('click', function(e){
        const handle = $(this).data('handle');
        const lineid = $(this).data('lineid');

        const linetitle = $('.cart-item[data-cartitem-id="'+lineid+'"] .cart-item--content-title').html();
        const linepic = $('.cart-item[data-cartitem-id="'+lineid+'"] .cart-item--image-wrapper').html();
        const orglinehtml = '<div class="org-lineitem"><div class="org-image">'+linepic+'</div><div class="org-title"><h2>'+linetitle+'</h2></div></div>';
        // const fetchUrl = `${window.Theme.routes.all_products_collection_url}/products/${handle}?view=itemcard`;
        const fetchUrl = `${window.Theme.routes.all_products_collection_url}/products/${handle}?view=accdrop`;
        $.get(fetchUrl).then(response => {
            if (response) {
                if(response.includes("data-product-quickshop-url")){
                    $('.popup-container .content').html(orglinehtml+response);
                    $('.popup-container').addClass('rightpop');
                }else{
                    $('.popup-container .content').html('<div class="noproducts">No accessories found for this product.</div>');
                }

                $('.popup-container').removeClass('hidden');
                $(".pop-grad").removeClass('hidden');
                $('.cart-item--upsell a').attr("target", "_blank");

                // equalize title height
                var highestTitleBox = 0;
                $('.upsell--item .productitem--title').each(function () {
                    if ($(this).height() > highestTitleBox) {
                        highestTitleBox = $(this).height();
                    }
                });
                if($(window).width() > 719){
                    $('.upsell--item .productitem--title').height(highestTitleBox);
                }

            }else{
                console.log('product not returned');
            }
        })
    });

    //look for discount code cookie. Popup message saying it was applied
   if(readCookie('applied_discount_code') && readCookie('discount_code')){
        $('.popup-container').removeClass('hidden');
        $(".pop-grad").removeClass('hidden');
        if(readCookie('discount_code') == "SUPERFREAK"){
            var newhtml = "<div style='text-align:center'><div style='text-align:left; font-weight:bold' ><img style='width:50px; height:50px; float:left; margin:-6px 7px 0 12px;' src='https://cdn.shopify.com/s/files/1/0624/3270/6740/files/superfreak-logo-sm.jpg' alt='SuperFreak Link' />The SuperFreak promo code has been applied.</div><br/>Your discount will be applied at the checkout.<br/><br/><button class='main-atc-button' style='width:70px;' onClick='event.stopPropagation(); closechildPop(\"bund-pop-\")'><span class='btn-text'>OK</span></button></div>";
        }else if(readCookie('thewheel') == "spun"){
            var newhtml = "<div style='text-align:center; margin-top:20px;'>Your prize has been claimed and will appear at the checkout.<br/><br/><button class='main-atc-button' style='width:70px;' onClick='event.stopPropagation(); closechildPop(\"bund-pop-\")'><span class='btn-text'>OK</span></button></div>";
        }else{
            var newhtml = "<div style='text-align:center'>The promo code<br/><span style='color:#d74018'>&quot;"+readCookie('discount_code')+"&quot;</span><br/>has been applied.<br/><br/>Your discount will be applied at the checkout.<br/><br/><button class='main-atc-button' style='width:70px;' onClick='event.stopPropagation(); closechildPop(\"bund-pop-\")'><span class='btn-text'>OK</span></button></div>";
        }
        $('.popup-container .content').html(newhtml);
        //remove cookie
        document.cookie = "applied_discount_code=NA; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/";
   };

    setTimeout(function(){
        $('a').on('click', function(e){
            //ignore any links with onclick events which may handle the trigger instead of this
            if ($(this).attr("onClick") == undefined) {
                var linkloc = 'NA';
                var mainloc = 'NA';
                var href = $(this).attr('href');
                if ($(this).closest('.tmenu_item').length > 0) {
                    //doesn't work
                    mainloc = 'Header';
                    linkloc = 'Menu/Nav';
                } else if ($(this).closest('.site-header-logo').length > 0) {
                    mainloc = 'Header';
                    linkloc = 'Logo';
                } else if ($(this).closest('.site-header-actions').length > 0) {
                    mainloc = 'Header';
                    linkloc = 'Action Icons';
                } else if ($(this).closest('.breadcrumbs-container').length > 0) {
                    mainloc = 'Header';
                    linkloc = 'Breadcrumbs';
                } else if ($(this).closest('.top-menu-container').length > 0) {
                    mainloc = 'Header';
                    linkloc = 'Top Mini Menu';
                } else if ($(this).closest('.description').length > 0) {
                    mainloc = 'Product Page';
                    linkloc = 'Long Descriptions';
                } else if ($(this).closest('.product-detail-sku').length > 0) {
                    mainloc = 'Product Page';
                    linkloc = 'Vendor';
                } else if ($(this).closest('.freq-bought-items').length > 0) {
                    mainloc = 'Product Page';
                    linkloc = 'Frequently Bought Together';
                } else if ($(this).closest('.product-single-techtip').length > 0) {
                    mainloc = 'Product Page';
                    linkloc = 'SuperFreak Techtip';
                } else if ($(this).closest('.product-icons').length > 0) {
                    mainloc = 'Product Page';
                    linkloc = 'Product Icons';
                } else if ($(this).closest('.data-sheets').length > 0) {
                    mainloc = 'Product Page';
                    linkloc = 'SDS/Manuals';
                } else if ($(this).closest('.prod-used-pads-block').length > 0) {
                    mainloc = 'Product Page';
                    linkloc = 'Pad Capability';
                } else if ($(this).closest('.padcharacteristics').length > 0) {
                    mainloc = 'Product Page';
                    linkloc = 'Pad Characteristics';
                } else if ($(this).closest('.pad-grid-table').length > 0) {
                    mainloc = 'Collection';
                    linkloc = 'Pad Grid Table';
                }else if ($(this).closest('.collection-main-area .ais-Hits-item .product-description').length > 0) {
                    mainloc = 'Collection';
                    linkloc = 'Main Card Desc';
                }else if ($(this).closest('.collection-main-area .ais-Hits-item').length > 0) {
                    mainloc = 'Collection';
                    linkloc = 'Main Card';
                }else if ($(this).closest('.search-main-area .ais-Hits-item .product-description').length > 0) {
                    mainloc = 'Search';
                    linkloc = 'Main Card Desc';
                }else if ($(this).closest('.search-main-area .ais-Hits-item').length > 0) {
                    mainloc = 'Search';
                    linkloc = 'Main Card';
                }else if ($(this).closest('.site-footer-item .social-icons').length > 0) {
                    mainloc = 'Footer';
                    linkloc = 'Social Icons';
                }else if ($(this).closest('.site-footer-item .about-us-nav').length > 0) {
                    mainloc = 'Footer';
                    linkloc = 'About Us';
                }else if ($(this).closest('.site-footer-item .footer-customer-service-nav').length > 0) {
                    mainloc = 'Footer';
                    linkloc = 'Customer Service';
                }else if ($(this).closest('.site-footer-item .footer-news').length > 0) {
                    mainloc = 'Footer';
                    linkloc = 'Newsletter';
                }else if ($(this).closest('.cartitems .cart-item').length > 0) {
                    mainloc = 'Cart';
                    linkloc = 'Cart Items';
                }else if ($(this).closest('#gift-slds').length > 0) {
                    mainloc = 'Cart';
                    linkloc = 'Free Gift';
                }else if ($(this).hasClass('cart-continue')) {
                    mainloc = 'Cart';
                    linkloc = 'Continue Shopping';
                }else if ($(this).closest('.popular-categories-links').length > 0) {
                    mainloc = 'Homepage';
                    linkloc = 'Popular Categories';
                }else if ($(this).closest('.template-index .image-gradient-section').length > 0) {
                    mainloc = 'Homepage';
                    linkloc = 'Gradient Text';
                }else if ($(this).closest('.template-index .custom-html--container').length > 0) {
                    mainloc = 'Homepage';
                    linkloc = 'Custom HTML';
                }else if ($(this).closest('.template-index .slideshow-slide').length > 0) {
                    mainloc = 'Homepage';
                    linkloc = 'Banner';
                }else if ($(this).closest('.category-types').length > 0) {
                    mainloc = 'Department Page';
                    linkloc = 'By Type Area';
                }else if ($(this).closest('.category-types-v2').length > 0) {
                    mainloc = 'Department Page';
                    linkloc = 'By Type Area';
                }else if ($(this).closest('.related-cat-types-v2__container').length > 0) {
                    mainloc = 'Department Page';
                    linkloc = 'Related Categories';
                }else if ($(this).closest('.brand-wrapper .brand-slider__content').length > 0) {
                    mainloc = 'Department Page';
                    linkloc = 'Featured Brands';
                }else if ($(this).closest('.category-resources-section__container').length > 0) {
                    mainloc = 'Department Page';
                    linkloc = 'Resources';
                }else if ($(this).closest('.template-article .left-sub-nav').length > 0) {
                    mainloc = 'Blog';
                    linkloc = 'Left Nav';
                }else if ($(this).closest('.template-article .article--outer').length > 0) {
                    mainloc = 'Blog';
                    linkloc = 'Main Area Link';
                }else if ($(this).closest('.template-page .left-sub-nav').length > 0) {
                    mainloc = 'CMS';
                    linkloc = 'Left Nav';
                }else if ($(this).closest('.template-page .productitem').length > 0) {
                    mainloc = 'CMS';
                    linkloc = 'Product Block';
                }else if ($(this).closest('.template-page .article--outer').length > 0) {
                    mainloc = 'CMS';
                    linkloc = 'Main Area Link';
                }
                //custom values will have their own onclick. Adding this to avoid accidental double log.
                linkdl(mainloc, linkloc, href);
            }
        });

        $('.ais-RefinementList-label').on('click', function(e){
            var linkloc = 'Filter';
            if ($(this).closest('.search-main-area .ais-facets').length > 0) {
                var mainloc = 'Search';
            }else if($(this).closest('.collection-main-area .ais-facets').length > 0) {
                var mainloc = 'Collection';
            }
            //get filter lable
            var label = $(this).clone();
            label.children("span").remove();

            linkdl(mainloc, linkloc, "#"+label.text());
        });


        $('.ais-SortBy-select').change(function () {
            var optionSelected = $(this).find("option:selected").text();
            var linkloc = 'Sorting';
            var mainloc = 'na';
            if ($(this).closest('.search-main-area .ais-block').length > 0) {
                var mainloc = 'Search';
            }else if($(this).closest('.collection-main-area .ais-block').length > 0) {
                var mainloc = 'Collection';
            }
            linkdl(mainloc, linkloc, "#"+optionSelected);
        });


        $('.template-cart .cart-title .cart-title-button').on('click', function(e){
            linkdl("Cart", "Top Checkout Button", "/checkout");
        });
        $('.template-cart .cart-checkout button').on('click', function(e){
            linkdl("Cart", "Bottom Checkout Button", "/checkout");
        });
    }, 700);

    // qikify nav menu tracking
    setTimeout(() => {
        $('.tmenu_nav > .tmenu_item > a').hover(function(e) {
            console.log('hovertrig2');
            setTimeout(() => {
                $('.tmenu_nav a').on('click', function(e) {
                    var navlinkloc = 'Main Nav';
                    var navmainloc = 'Header';
                    var navhref = $(this).attr('href');
                    if ($(this).closest('.cat-shopall').length > 0) {
                        navlinkloc = 'Shop All Main Nav';
                        navmainloc = 'Header';
                    }
                    linkdl(mainloc, linkloc, href);
                });
            }, 300);
        });
    }, 200);

    setTimeout(() => {
        $('.tmenu_item_link,.tmenu_item_display_header').on('mouseenter', function(e){
            setTimeout(() => {
                $(".tmenu_nav a").unbind('click');
                $('.tmenu_nav a').on('click', function(e){
                    linkloc = 'Basic Menu';
                    if ($(this).closest('.cat-shopall').length > 0) {
                        linkloc = 'Shop All';
                    }else if ($(this).closest('.cat-brand').length > 0) {
                        linkloc = 'Brands';
                    }else if ($(this).closest('.cat-cheater').length > 0) {
                        linkloc = 'Cheater Nav';
                    }else if ($(this).closest('.cat-education').length > 0) {
                        linkloc = 'Education';
                    }
                    var href = $(this).attr('href');
                     linkdl('Header Menu',linkloc,href)

                });
            }, "500");
        });
    }, "500");

    $(document).ready(function() {

        $('.site-header-menu-toggle').on('click', function(e){
            if($(this).hasClass("active")){
                $(this).removeClass("active")
                $('.site-header').removeClass('site-header-nav--open');
            }else{
                $(this).addClass("active")
                $('.site-header').addClass('site-header-nav--open');
            }
        });
        var lastScrollTop = 0;

        $(window).scroll(function() {
            var currentScroll = $(this).scrollTop();
            if (currentScroll < 120) {
                // Scroll down, hide the header
                $(".top-menu-wrapper").show();
                $('.site-header').addClass('site-header-nav--open').removeClass('site-header-sticky--scrolled').css({"position": "fixed", "top": "0"});
                //$('#shopify-section-static-announcement').css({"margin-top": "0"});
            } else if (currentScroll > lastScrollTop) {
                // Scroll down, hide the header
                $(".top-menu-wrapper").hide();
                $('.site-header').removeClass('site-header-nav--open').removeClass('site-header-sticky--scrolled').css({"position": "fixed", "top": "-200px"});
                //$('#shopify-section-static-announcement').css({"margin-top": "85px"});
            } else {
                // Scroll up, show the header and make it sticky
                $(".top-menu-wrapper").hide();
                $('.site-header').addClass('site-header-sticky--scrolled').removeClass('site-header-nav--open').css({"position": "fixed", "top": "0"});
                //$('#shopify-section-static-announcement').css({"margin-top": "85px"});
            }
            lastScrollTop = currentScroll;
        });
    });


});

function accdropSelect(selectObject,productid){
    var value = selectObject.value;
    var productelementid = "#accdrop-product-"+productid;

    $(productelementid+" .accdrop-var-variables").hide().removeClass("accdrop-var-variables-current");

    if( value == ""){
        $(productelementid+" .accdrop-var-select").addClass('notselected');
    }else {
        $(productelementid + " .accdrop-var-select").removeClass('notselected');
        $(productelementid+" .accdrop-var"+value).show().addClass("accdrop-var-variables-current");
    }
}


function accdropATC(productid){

    if (window.location.pathname.includes("/cart")){
        $(".close-pop").attr("onclick","location.reload()");
    }
    var productelementid = "#accdrop-product-"+productid;
    var dataid = $(productelementid+" .accdrop-var-variables-current .data-accdrop-var");
    var thisBtn = $(productelementid+" .accdropAtcBtn")

    if (dataid.length ){

    }else{
        $(productelementid+" .accdrop-var-select").addClass('notselected')
        return false;
    }


    // values for atc
    var atcVarId = $(dataid).attr('data-var_id');
    var atcSku = $(dataid).attr('data-var_vissku');
    var atcName = $(dataid).attr('data-productname');
    var atcStatus = $(dataid).attr('data-var_status');
    var atcERPSku = $(dataid).attr('data-var_erpsku');
    var atcAvailQty = $(dataid).attr('data-var_availqty');
    var atcType = $(dataid).attr('data-producttype');
    var atcBrand = $(dataid).attr('data-brand');
    var atcTier = $(dataid).attr('data-var_tieredpricing');
    var atcPrice = $(dataid).attr('data-var_price');
    atcPrice = atcPrice/100;
    var atcOrgPrice = $(dataid).attr('data-var_price');

    var placement = "Minicart Upsell";
     window.dataLayer = window.dataLayer || [];
     window.dataLayer.push({
         event: 'ee_addToCart',
         product_name: atcName,
         product_id : productid,
         product_price: atcPrice,
         product_brand:  atcBrand,
         currency: "USD",
         product_type: "",
         category_id: "",
         category_title: "",
         variant_id: atcVarId,
         variant_title: "Default Title",
         product_sku: atcSku,
         quantity: 1,
         atc_loc: placement
     });


    var cookname = "atcloc";
    var thisCookie = document.cookie.match(new RegExp('(^| )' + cookname + '=([^;]+)'));
    if (thisCookie){
        var newCookieVal = thisCookie[2] + "::"+"CartDrop"+":"+placement;
    }else{
        var newCookieVal = "CartDrop"+":"+placement;
    }
    document.cookie = "atcloc="+newCookieVal+"; expires=0; path=/";

     data = {
         form_type: 'product',
         utf8: '✓',
         'properties[_erp_sku]': atcERPSku,
         'properties[_tiered_pricing]': atcTier,
         'properties[_org_price]': atcOrgPrice,
         'properties[Status]': atcStatus,
         'properties[Sku]': atcSku,
         'properties[_available_qty]': atcAvailQty,
         'id': atcVarId,
         'quantity': 1,
     }
// alert(atcTier);
    $(thisBtn).html("Adding...");

    // alert(atcVarId+"/"+productid+"/"+atcName+"/"+atcSku+"/"+atcStatus+"/"+atcERPSku+"/"+atcType+"/"+atcBrand+"/"+atcTier+"/"+atcPrice);
    $.ajax({
        type: 'POST',
        url: `${window.Theme.routes.cart_add_url}.js`,
        data: data,
        dataType: 'json',
        success: function () {
            console.log('upsell added to cart');
            $(thisBtn).addClass("upsell-added").html("Item Added!").attr('onClick',"");
            var newCartTotal = parseInt($('[data-header-cart-count]').attr("data-header-cart-count")) + 1;
            $('[data-header-cart-count]').attr("data-header-cart-count", newCartTotal);
            $('[data-atc-banner-cart-button] span').text(newCartTotal)
            var newCartPrice = parseFloat($('.atc-subtotal--price').text().replace(/[$,]/g, '')) + (atcPrice);
            $('.atc-subtotal--price').text("$" + newCartPrice.toLocaleString());
            //if(placement == "cart"){
              //  location.href = window.Theme.routes.cart_url
            //}

        }
    });
}


// superfreak infopop
function sf_info_pop(){
    $('.popup-container').removeClass('hidden');
    $(".pop-grad").removeClass('hidden');
    var newhtml = $(".sf-pop-html").html();
    $('.popup-container .content').html(newhtml);
    $('.popup-container').addClass('widepop');
};

// superfreak add to cart
function sf_atc(btn,placement,plan = ""){
    var sf_plan_item = $(btn).data('plan-item');
    var sf_plan_item_handle = $(btn).data('plan-item-handle');
    var sf_price = 99.99;
    var sf_qty = parseInt($(btn).data('plan-qty'));
    var sf_var_id = $(btn).data('at');
    // var siteDomain = window.location.hostname;
    // if(siteDomain.includes('dev.cleanfreak.com') || siteDomain.includes('127.0.0.1') ){
    //  var sf_var_id = '43956946534612';
    // } else if (siteDomain.includes('www.cleanfreak.com')){
    //  var sf_var_id = '42413671612596';
    // }


    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        event: 'ee_addToCart',
        product_name: "SuperFreak Customer Loyalty Program",
        product_id : "7431697825972",
        product_price: "99.99",
        product_brand:  "CleanFreak",
        currency: "USD",
        product_type: "",
        category_id: "",
        category_title: "",
        variant_id: sf_var_id,
        variant_title: "Default Title",
        product_sku: "SUPERFREAK",
        quantity: sf_qty,
        atc_loc: placement
    });


    var name = "atcloc";
    var thisCookie = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (thisCookie){
        var newCookieVal = thisCookie[2] + "::"+"SUPERFREAK"+":"+placement;
    }else{
        var newCookieVal = "SUPERFREAK"+":"+placement;
    }
    document.cookie = "atcloc="+newCookieVal+"; expires=0; path=/";

    data = {
        form_type: 'product',
        utf8: '✓',
        'properties[_erp_sku]': 'SUPERFREAK',
        'properties[SuperFreak Item]': sf_plan_item,
        'id': sf_var_id,
        'quantity': sf_qty,
        'selling_plan': plan
    }

    $(btn).addClass("sf-added").html("...");

    $.ajax({
        type: 'POST',
        url: `${window.Theme.routes.cart_add_url}.js`,
        data: data,
        dataType: 'json',
        success: function () {
            $(btn).addClass("sf-added").html("Plan Added!").attr('onClick',"");
            var newCartTotal = parseInt($('[data-header-cart-count]').attr("data-header-cart-count")) + sf_qty;
            $('[data-header-cart-count]').attr("data-header-cart-count", newCartTotal);
            $('[data-atc-banner-cart-button] span').text(newCartTotal)
            var newCartPrice = parseFloat($('.atc-subtotal--price').text().replace(/[$,]/g, '')) + (sf_price*sf_qty);
            $('.atc-subtotal--price').text("$" + newCartPrice.toLocaleString());
            if(placement == "cart"){
                location.href = window.Theme.routes.cart_url
            }
        }
    });

}


// Promo Redirect. Look for "discount_code" cookie
function promoRedirect(code,url){
    console.log("applying promo!!!");
    document.cookie = "applied_discount_code="+code+"; expires=0; path=/";
    var decodedUrl = encodeURIComponent(url);
    var promoUrl = "/discount/"+code+"?redirect="+decodedUrl;

    var cpage = window.location.href;
    var pageLoc = "NA"
    if (cpage.includes("/collections/")){
        pageLoc = "Collection"
    }else if(cpage.includes("/products/")){
        pageLoc = "Product Page"
    }else{
        pageLoc = "Homepage"
    }

    linkdl(pageLoc,'Promo Code Link',promoUrl)
    location.href = promoUrl;
}

function readCookie(name) {
    return (name = new RegExp('(?:^|;\\s*)' + ('' + name).replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') + '=([^;]*)').exec(document.cookie)) && name[1];
}
function sfApply(enable){
    document.cookie = "superfreakPromo="+enable+"; expires=0; path=/";
    if(enable ==1){
        promoRedirect('SUPERFREAK',window.location.pathname)
    }else{
        closechildPop('bund-pop-');
    }
}


function linkdl(mainloc,linkloc,href){
    var cpage = window.location.pathname;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        event: 'ee_linkClick',
        current_page: cpage,
        href: href,
        link_location: linkloc,
        main_location: mainloc,
    })
    // console.log(mainloc+"/"+linkloc+"/"+href+"/"+cpage);
}

function playVideo(localvidid) {
    const vid = document.getElementById('localv-'+localvidid);
    vid.scrollIntoView({ behavior: 'smooth', block: 'center' });
    vid.play();
}

function equalRelCards(itemId){

    $(".rel-product-tabbed-area .tabbed-rel-slider:not('.tabbed-rel-freq, #part_items-slider, #part_used_on-slider')").each(function (index) {

        var itemId = $(this).attr('id');
        var sliderArrows = '#' + itemId + '-arrows';

    // Equalize Box and Title Height
    // var slideritemId = itemId.replace('-slider', '-rel-item');
    var slideritemId = itemId;
    var highestBox = 0;
    var highestTitleBox = 0;

    //Title Height
    var highestTitleBox = 0;
    $('#' + slideritemId + ' .productitem--title').each(function () {
        if ($(this).height() > highestTitleBox) {
            highestTitleBox = $(this).height();
        }
    });
    $('#' + slideritemId + ' .productitem--title').height(highestTitleBox);

    //box height
    $('#' + slideritemId + ' .productgrid--item').each(function () {
        if ($(this).height() > highestBox) {
            highestBox = $(this).height();
        }
    });
    $('#' + slideritemId + ' .productgrid--item').height(highestBox);
    var fadid = slideritemId.replace("-slider", "");
    $('#' + fadid + '-rel-item-slider-fade-r').height(highestBox+20);
    });


}