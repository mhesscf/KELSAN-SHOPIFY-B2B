$(document).ready(function () {
    function loadOneElement($el) {
        var dfd = $.Deferred();

        var filter = $el.data('caturl');
        var params = new URLSearchParams(window.location.search);
        var productType = encodeURIComponent(params.get("product_type")); // becomes "null" if missing
        var finalresponse = "";

        var page = 1;
        var productcount = 0;

        function fetchNext() {
            if (page > 4) {
                $el.html(finalresponse);
                dfd.resolve();
                $('.b2b-company-products-container .product-count').html("("+productcount+")");
                return;
            }

            var fetchUrl;
            if (productType === "null") {
                fetchUrl = window.Theme.routes.all_products_collection_url +
                    "?view=b2b-list-ajax&page=" + page +
                    "&filter.p.m.plytix.b2b_catalogs_list=" + filter;
            } else {
                fetchUrl = window.Theme.routes.all_products_collection_url +
                    "?view=b2b-list-ajax&page=" + page +
                    "&filter.p.m.plytix.b2b_catalogs_list=" + filter +
                    "&filter.p.product_type=" + productType;
            }

            $.get(fetchUrl)
                .done(function (response) {
                    if (response && response.indexOf("returned-product") !== -1) {
                        $(".parts-data-area .loading-text").hide();
                        finalresponse += response;


                        const parser = new DOMParser();
                        const doc = parser.parseFromString(response, 'text/html');

                        const count = Number(
                            doc.querySelector('span[data-productcount]')
                                ?.getAttribute('data-productcount')
                        );

                        productcount += count;
                    }
                })
                .fail(function (err) {
                    console.log("Error loading page " + page, err);
                })
                .always(function () {
                    page++;
                    fetchNext(); // keep going sequentially
                });
        }

        fetchNext();
        return dfd.promise();
    }

    var requests = $(".b2b-company-product-list .b2b-collection-ajax").map(function () {
        return loadOneElement($(this));
    }).get();

    // Wait for ALL elements to finish
    $.when.apply($, requests).done(function () {
        b2blistscripts();
        loadfilters();
    });

});





function b2blistscripts(){

    const $b2blist_sub_product_container = $('.b2b-company-product-list') //items
    const $b2blist_bundle_button = $('[data-b2blist-productlist-atc]')
    const $b2blist_single_atc_button = $('[data-b2blist-product-atc]')
    if($b2blist_sub_product_container.length) {

        $b2blist_single_atc_button.on('click', async function(e) {
            $thisproductid = $(this).data('returned-product');
            $thisproduct = $("#"+$thisproductid);

            if (1==1) {
                var totalproducts = 0;
                console.log('adding product');

                $thisproduct.find('.atc-button--text').hide();
                $thisproduct.find('.atc-button--icon').css({"visibility": "visible", "opacity": "100"});
                $thisproduct.find('.productitem--action-atc').addClass("loading");
                $('.productitem--action-atc:not(.loading,.loaded)').addClass("disabled");

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

                $thisproduct.find('.b2blist-var-select').css('border', '');
                    if ($thisproduct.find('.current-b2blist-var [data-b2blistbundle-subproduct]').data('var_vissku')) {

                        console.log("ERP: " + $thisproduct.find('.current-b2blist-var [data-b2blistbundle-subproduct]').data('var_erpsku'));
                        console.log("vissku: " + $thisproduct.find('.current-b2blist-var [data-b2blistbundle-subproduct]').data('var_vissku'));
                        console.log("status: " + $thisproduct.find('.current-b2blist-var [data-b2blistbundle-subproduct]').data('var_status'));
                        console.log("tier: " + $thisproduct.find('.current-b2blist-var [data-b2blistbundle-subproduct]').data('var_tieredpricing'));
                        console.log("var id: " + $thisproduct.find('.current-b2blist-var [data-b2blistbundle-subproduct]').data('var_id'));
                        console.log("product id: " + $thisproduct.attr('id').replace("b2blist-product-", ""));
                        console.log("qty: " + $thisproduct.find('.b2b-product-qty input').val());
                        console.log("--------");

                        // log ee_addToCart for analytics
                        window.dataLayer = window.dataLayer || [];

                        window.dataLayer.push({
                            event: 'ee_addToCart',
                            product_name: $thisproduct.find('.productitem--title').text().trim(),
                            product_id: $thisproduct.attr('id').replace("b2blist-product-", ""),
                            product_price: $thisproduct.find('.current-b2blist-var [data-b2blistbundle-subproduct]').data('var_price') / 100,
                            product_brand: $thisproduct.find('.current-b2blist-var [data-b2blistbundle-subproduct]').data('brand'),
                            currency: "USD",
                            product_type: $thisproduct.find('.current-b2blist-var [data-b2blistbundle-subproduct]').data('producttype'),
                            variant_id: $thisproduct.find('.current-b2blist-var [data-b2blistbundle-subproduct]').data('var_id'),
                            product_sku: $thisproduct.find('.current-b2blist-var [data-b2blistbundle-subproduct]').data('var_vissku'),
                            quantity: $thisproduct.find('.b2b-product-qty input').val(),
                            atc_loc: "B2B List Single"
                        });


                        var name = "atcloc";
                        var thisCookie = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
                        if (thisCookie) {
                            var newCookieVal = thisCookie[2] + "::" + $(this).find('.current-b2blist-var [data-b2blistbundle-subproduct]').data('var_vissku') + ":" + "B2B List Single";
                        } else {
                            var newCookieVal = $(this).find('.current-b2blist-var [data-b2blistbundle-subproduct]').data('var_vissku') + ":" + "B2B List Single";
                        }
                        document.cookie = "atcloc=" + newCookieVal + "; expires=0; path=/";

                        // console.log(window.dataLayer);
                        // missingOptions = 1;

                        form_template["properties[_erp_sku]"] = $thisproduct.find('.current-b2blist-var [data-b2blistbundle-subproduct]').data('var_erpsku');
                        form_template["properties[_sf_eligible]"] = $thisproduct.find('.current-b2blist-var [data-b2blistbundle-subproduct]').data('sfeligible');
                        form_template["properties[Sku]"] = $thisproduct.find('.current-b2blist-var [data-b2blistbundle-subproduct]').data('var_vissku');
                        form_template["properties[Status]"] = $thisproduct.find('.current-b2blist-var [data-b2blistbundle-subproduct]').data('var_status');
                        form_template["properties[_tiered_pricing]"] = $thisproduct.find('.current-b2blist-var [data-b2blistbundle-subproduct]').data('var_tieredpricing');
                        form_template["properties[_available_qty]"] = $thisproduct.find('.current-b2blist-var [data-b2blistbundle-subproduct]').data('var_availqty');
                        form_template["properties[_org_price]"] = $thisproduct.find('.current-b2blist-var [data-b2blistbundle-subproduct]').data('var_price');
                        form_template["properties[Notification]"] = $thisproduct.find('.current-b2blist-var [data-b2blistbundle-subproduct]').data('notification');
                        form_template["properties[_bundle_product]"] = $thisproduct.find('.current-b2blist-var [data-b2blistbundle-subproduct]').data('bundle');
                        form_template.id = $thisproduct.find('.current-b2blist-var [data-b2blistbundle-subproduct]').data('var_id') + ""
                        form_template.quantity = $thisproduct.find('.b2b-product-qty input').val() + ""

                        form_datas.push({...form_template})
                        totalproducts++
                    } else {
                        $(this).find('.b2blist-var-select').css('border', '2px solid red');
                        missingOptions = 1;
                    }



                if (missingOptions != 1 && totalproducts != 0) {
                    form_datas.reverse();
                    for (const f of form_datas) {
                        await $.ajax({
                            type: 'POST',
                            url: `${window.Theme.routes.cart_add_url}.js`,
                            data: f,
                            dataType: 'json'
                        })
                    }

                    // location.href = window.Theme.routes.cart_url;

                    $thisproduct.find('.atc-button--text').text('Added').show();
                    $thisproduct.find('.atc-button--icon').hide().css({"visibility": "hidden", "opacity": "0"});
                    $('.productitem--action-atc').removeClass("disabled");
                    $thisproduct.find('.productitem--action-atc').addClass("loaded");


                } else {
                    if (missingOptions == 1) {
                        alert('Please choose an option.');
                    } else {
                        alert("Please add a product.");
                    }
                    $thisproduct.find('.atc-button--text').show();
                    $thisproduct.find('.atc-button--icon').css({"visibility": "hidden", "opacity": "0"});
                    $('.productitem--action-atc').removeClass("disabled");
                }
            }
        })

        //add to cart list
        $b2blist_bundle_button.on('click', async function(e) {
            var totalproducts = 0;
            console.log('adding products');
            e.preventDefault();
            $(this).find('.atc-button--text').hide();
            $(this).find('.atc-button--icon').css({"visibility": "visible", "opacity": "100"});


            // $thisproduct.find('.atc-button--text').hide();
            // $thisproduct.find('.atc-button--icon').css({"visibility": "visible", "opacity": "100"});
            // $thisproduct.find('.productitem--action-atc').addClass("loading");
            $('.productitem--action-atc:not(.loading,.loaded)').addClass("disabled");



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
            $b2blist_sub_product_container.find('.returned-product').each(function() {
                $(this).find('.b2blist-var-select').css('border','');
                if($(this).find('.b2blist-check').is(':checked')){
                    if($(this).find('.current-b2blist-var [data-b2blistbundle-subproduct]').data('var_vissku')){

                        console.log("ERP: "+$(this).find('.current-b2blist-var [data-b2blistbundle-subproduct]').data('var_erpsku'));
                        console.log("vissku: "+$(this).find('.current-b2blist-var [data-b2blistbundle-subproduct]').data('var_vissku'));
                        console.log("status: "+$(this).find('.current-b2blist-var [data-b2blistbundle-subproduct]').data('var_status'));
                        console.log("tier: "+$(this).find('.current-b2blist-var [data-b2blistbundle-subproduct]').data('var_tieredpricing'));
                        console.log("var id: "+$(this).find('.current-b2blist-var [data-b2blistbundle-subproduct]').data('var_id'));
                        console.log("product id: "+$(this).attr('id').replace("b2blist-product-",""));
                        console.log("qty: "+$(this).find('.b2b-product-qty input').val());
                        console.log("--------");

                        // log ee_addToCart for analytics
                        window.dataLayer = window.dataLayer || [];

                        window.dataLayer.push({
                            event: 'ee_addToCart',
                            product_name: $(this).find('.productitem--title').text().trim(),
                            product_id : $(this).attr('id').replace("b2blist-product-",""),
                            product_price: $(this).find('.current-b2blist-var [data-b2blistbundle-subproduct]').data('var_price')/100,
                            product_brand:  $(this).find('.current-b2blist-var [data-b2blistbundle-subproduct]').data('brand'),
                            currency: "USD",
                            product_type: $(this).find('.current-b2blist-var [data-b2blistbundle-subproduct]').data('producttype'),
                            variant_id: $(this).find('.current-b2blist-var [data-b2blistbundle-subproduct]').data('var_id'),
                            product_sku:  $(this).find('.current-b2blist-var [data-b2blistbundle-subproduct]').data('var_vissku'),
                            quantity: $(this).find('.b2b-product-qty input').val(),
                            atc_loc: "B2B List"
                        });


                        var name = "atcloc";
                        var thisCookie = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
                        if (thisCookie){
                            var newCookieVal = thisCookie[2] + "::"+$(this).find('.current-b2blist-var [data-b2blistbundle-subproduct]').data('var_vissku')+":"+"B2B List";
                        }else{
                            var newCookieVal = $(this).find('.current-b2blist-var [data-b2blistbundle-subproduct]').data('var_vissku')+":"+"B2B List";
                        }
                        document.cookie = "atcloc="+newCookieVal+"; expires=0; path=/";

                        // console.log(window.dataLayer);
                        // missingOptions = 1;

                        form_template["properties[_erp_sku]"] = $(this).find('.current-b2blist-var [data-b2blistbundle-subproduct]').data('var_erpsku');
                        form_template["properties[_sf_eligible]"] = $(this).find('.current-b2blist-var [data-b2blistbundle-subproduct]').data('sfeligible');
                        form_template["properties[Sku]"] = $(this).find('.current-b2blist-var [data-b2blistbundle-subproduct]').data('var_vissku');
                        form_template["properties[Status]"] = $(this).find('.current-b2blist-var [data-b2blistbundle-subproduct]').data('var_status');
                        form_template["properties[_tiered_pricing]"] = $(this).find('.current-b2blist-var [data-b2blistbundle-subproduct]').data('var_tieredpricing');
                        form_template["properties[_available_qty]"] = $(this).find('.current-b2blist-var [data-b2blistbundle-subproduct]').data('var_availqty');
                        form_template["properties[_org_price]"] = $(this).find('.current-b2blist-var [data-b2blistbundle-subproduct]').data('var_price');
                        form_template["properties[Notification]"] = $(this).find('.current-b2blist-var [data-b2blistbundle-subproduct]').data('notification');
                        form_template["properties[_bundle_product]"] = $(this).find('.current-b2blist-var [data-b2blistbundle-subproduct]').data('bundle');
                        form_template.id = $(this).find('.current-b2blist-var [data-b2blistbundle-subproduct]').data('var_id') + ""
                        form_template.quantity = $(this).find('.b2b-product-qty input').val() + ""

                        form_datas.push({...form_template})
                        totalproducts++
                    }else{
                        $(this).find('.b2blist-var-select').css('border','2px solid red');
                        missingOptions = 1;
                    }

                };
            });

            if(missingOptions != 1 && totalproducts != 0 ) {
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
                $('.productitem--action-atc:not(.loading,.loaded)').removeClass("disabled");
            }
        })
    }



    // B2B List Bought Together Variation Change
    $('.b2blist-var-select').on('change', function() {
        var thisProductId = $(this).attr('id').replace("b2blist-var-select-","");
        var thisVariantId = this.value;

        if(thisVariantId == ""){
            $("#b2blist-product-"+thisProductId+" .b2blist-check").prop('checked', false);
        }else{
            // $("#b2blist-product-"+thisProductId+" .b2blist-check").prop('checked', true);
            $("#b2blist-product-"+thisProductId+" .b2blist-var-variables").removeClass("current-b2blist-var");
            $("#b2blist-product-"+thisProductId+" .b2blist-var"+thisVariantId).addClass("current-b2blist-var");


            $("#b2blist-product-"+thisProductId+" .product-data").attr('data-id', $("#b2blist-product-"+thisProductId+" #data-b2blist-var"+thisVariantId).attr('data-var_id'));
            $("#b2blist-product-"+thisProductId+" .product-data").attr('data-vissku', $("#b2blist-product-"+thisProductId+" #data-b2blist-var"+thisVariantId).attr('data-var_vissku'));
            $("#b2blist-product-"+thisProductId+" .product-data").attr('data-status', $("#b2blist-product-"+thisProductId+" #data-b2blist-var"+thisVariantId).attr('data-var_status'));
            $("#b2blist-product-"+thisProductId+" .product-data").attr('data-erpsku', $("#b2blist-product-"+thisProductId+" #data-b2blist-var"+thisVariantId).attr('data-var_erpsku'));
            $("#b2blist-product-"+thisProductId+" .product-data").attr('data-availqty', $("#b2blist-product-"+thisProductId+" #data-b2blist-var"+thisVariantId).attr('data-var_availqty'));
            $("#b2blist-product-"+thisProductId+" .product-data").attr('data-tieredpricing', $("#b2blist-product-"+thisProductId+" #data-b2blist-var"+thisVariantId).attr('data-var_tieredpricing'));
            $("#b2blist-product-"+thisProductId+" .product-data").attr('data-price', $("#b2blist-product-"+thisProductId+" #data-b2blist-var"+thisVariantId).attr('data-var_price'));
        }
        //recalc price
        // b2blistPriceCalc();
    });

}

function loadfiltersoff(){


        const productTypes = $('.returned-product')
            .map(function () {
                return $(this).data('producttype');
            })
            .get()                             // convert jQuery object to array
            .filter(Boolean);                  // remove null/undefined

        const uniqueSorted = [...new Set(productTypes)]
            .sort((a, b) => a.localeCompare(b));

        const linksHtml = uniqueSorted
            .map(value => {
                const encodedValue = encodeURIComponent(value);
                return `<li><a href="/pages/b2b-product-list-quick-order?product_type=${encodedValue}">${value}</a></li>`;
            })
            .join('');

        // Example: insert into a container
        $('#product-type-links').html(linksHtml);

}


function loadfilters(){
    let productTypes = $('.returned-product')
        .map(function () {
            return $(this).data('producttype');
        })
        .get()
        .filter(Boolean);

    // Add "All Products" before dedupe & sort
    productTypes.push('All Products');

    const uniqueSorted = [...new Set(productTypes)]
        .sort((a, b) => a.localeCompare(b));

    const linksHtml = uniqueSorted
        .map(value => {
            // Special-case the "All Products" link
            if (value === 'All Products') {
                return `<li><a href="/pages/b2b-product-list-quick-order">All Products</a></li>`;
            }

            const encodedValue = encodeURIComponent(value);
            return `<li><a href="/pages/b2b-product-list-quick-order?product_type=${encodedValue}">${value}</a></li>`;
        })
        .join('');

    $('#product-type-links').html(linksHtml);
}



$(document).ready(function () {
    const triggerEl = document.querySelector('.b2b-company-products-container');
    const targetEl  = document.querySelector('.list-atc-container');

    if (triggerEl && targetEl) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                targetEl.classList.toggle('bottomfix', entry.isIntersecting);
            });
        }, {
            threshold: 0.1 // adjust visibility % if needed
        });

        observer.observe(triggerEl);
    }

});
