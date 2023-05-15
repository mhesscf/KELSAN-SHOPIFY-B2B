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
jQuery(document).ready(function($){


    if (document.cookie.indexOf("AlertClosed") >= 0) {
        $('#shopify-section-static-announcement').hide();
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
        $('#shopify-section-static-announcement').hide();
        //console.log(document.cookie);
    });

    $('.template-product select').on('change', function(){
        setTimeout(function(){
            var updPrice = $('.template-product .product-pricing .price__current .money').text();
            var pOnly = updPrice.replace("$", "");
            console.log(pOnly);
            $('#bbsTotal').text(pOnly);
        }, 1000);
    });
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

    $('.category-featured-slider').slick({
        arrows: true,
        autoplay: false,
        dots: false,
        infinite: true,
        lazyLoad: 'ondemand',
        slidesToShow: 3,
        slidesToScroll: 2,
        appendArrows: $('.f-cat-slider__content .slide-arrows'),
        prevArrow: '<button class="slide-arrow prev-arrow"><div class="visually-hidden">previous slide</div><i class="fa-regular fa-arrow-left"></i></button>',
        nextArrow: '<button class="slide-arrow next-arrow"><div class="visually-hidden">next slide</div><i class="fa-regular fa-arrow-right"></i></button>',
        variableWidth: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
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

    $('.brand-slider').slick({
        arrows: true,
        autoplay: false,
        dots: false,
        infinite: true,
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
            $('.var-specs').css('display', 'none');
            $('.var' + param).css('display', 'block');

            var vid = $('#v' + param).data('vid');
            var vstep = $('#v' + param).data('increment');
            var erpsku = $('#v' + param).data('erpsku');
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

    $('#gift-slds').slick({
        arrows: true,
        autoplay: false,
        dots: false,
        infinite: false,
        lazyLoad: 'ondemand',
        slidesToShow: 6,
        slidesToScroll: 3,
        appendArrows: $('#sim-slide-arrows'),
        prevArrow: '<button class="slide-arrow prev-arrow"><div class="visually-hidden">previous slide</div><i class="fa-regular fa-arrow-left"></i></button>',
        nextArrow: '<button class="slide-arrow next-arrow"><div class="visually-hidden">next slide</div><i class="fa-regular fa-arrow-right"></i></button>',
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

    setTimeout(()=>{
        $('.gallery-navigation-horizontal-scroller-slick').slick({
            arrows: true,
            autoplay: false,
            dots: false,
            infinite: true,
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
                'id': '',
                'quantity': 0
            }

            const form_datas = []
            $sub_product_container.find('[data-bundle-subproduct], [data-bundle-subproduct-free]').each(function() {
                form_template["properties[_erp_sku]"] = $(this).data('erpsku')
                form_template["properties[Sku]"] = $(this).data('vissku')
                form_template["properties[Status]"] = $(this).data('status')
                form_template["properties[_tiered_pricing]"] = $(this).data('tieredpricing')
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
                    dataType: 'json'
                })
            }

            location.href = window.Theme.routes.cart_url
        })
    }

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
            window.location = $('#update-cart').attr('href');
        }, 1000);
    });

    $('.cart-item--remove-popup').on('click', function(e){
        e.preventDefault();
        var bundleItemClass = $(this).data('gall');
        var bundleName = $(this).data('name');
        $('#bundle-remove-alert').toggleClass('show');
        $('#bundle-remove-alert .remove').attr('data-gall', bundleItemClass);
        $('#itemName').text(bundleName);
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

});

