var gkitPopupIsOpen = false;
var gkitBackCloses = false;
function gkitSmoothLoadTiles(elem, portfolioId, page) {
    if (jQuery(elem).parent('.ftg-pages').length != 0) {//is page
        jQuery("#gallery-"+portfolioId+" .ftg-pages a").removeClass("selected");
        jQuery(elem).addClass("selected");
    } else if(jQuery(elem).parent('.ftg-filters').length != 0) {//is filter
        jQuery("#gallery-"+portfolioId+" .ftg-filters a").removeClass("selected");
        jQuery(elem).addClass("selected");
    }

    var filter = '';
    if (jQuery("#crp-content-"+portfolioId+" .ftg-filters a.selected").length != 0) {
        filter = jQuery("#crp-content-"+portfolioId+" .ftg-filters a.selected").attr('data-filter');
    } else if(jQuery("#crp-content-"+portfolioId+" .crp-filter-by").length != 0) {
        filter = jQuery("#crp-content-"+portfolioId+" .crp-filter-by").val();
    } else if(jQuery("#crp-content-"+portfolioId+" .crp-filter-by-sidebar").length != 0) {
        filter = jQuery(elem).attr('data-value');
        jQuery("#crp-content-"+portfolioId+" .crp-filter-by-sidebar").removeClass('crp-cat-selected');
        jQuery(elem).addClass('crp-cat-selected');
    }

    var sendData = {
        action: 'gkit_load_tiles',
        pid: portfolioId,
        grid_url: gkitPermalink,
        filter: filter
    };
    if (page != '') {
        sendData.pg = page;
    }
    if (jQuery("#crp-content-"+portfolioId+" .gkit-catalog-search-form input[name=gkit-s]").val() != '') {
        sendData['gkit-s'] = jQuery("#crp-content-"+portfolioId+" .gkit-catalog-search-form input[name=gkit-s]").val();
    } else if (crp_getQueryParam('gkit-s') != null) {
        sendData['gkit-s'] = crp_getQueryParam('gkit-s');
    }

    if (jQuery("#crp-content-"+portfolioId+" .crp-sort-by").val() != '') {
        sendData['sort-by'] = jQuery("#crp-content-" + portfolioId + " .crp-sort-by").val();
    }
    if (jQuery("#crp-content-"+portfolioId+" .crp-sort-in").val() != '') {
        sendData['sort-in'] = jQuery("#crp-content-"+portfolioId+" .crp-sort-in").val();
    }


    var h = jQuery("#gallery-"+portfolioId+" .ftg-items").height();
    jQuery("#gallery-"+portfolioId+" .ftg-items").animate({opacity: 0}, 100, function(){
        jQuery("#gallery-"+portfolioId+" .ftg-items").replaceWith('<div style="height: '+h+'px;padding-top:'+((h-20)/2)+'px;" id="loader-'+portfolioId+'" class="crp-smooth-loader"><i class="fa fa-spinner"></i></div>');
    });
    jQuery.ajax ( {
        type		:	'get',
        data        :   sendData,
        url			: 	GKIT_NO_PRIV_AJAX_URL,
        dataType	: 	'json',
        success		: 	function( response ) {
            if (typeof response.html != 'undefined') {
                jQuery("#gallery-"+portfolioId).removeAttr('id');
                var container = jQuery("<div/>");
                container.append(response.html);
                jQuery("#crp-content-buffer-"+portfolioId, container).css("width", jQuery("#crp-content-"+portfolioId+" .crp-wrapper").width());
                jQuery(container.html()).insertAfter(jQuery("#crp-content-"+portfolioId));
                jQuery("#crp-content-buffer-"+portfolioId).css("width", jQuery("#crp-content-"+portfolioId+" .crp-wrapper").width());
                crp_configureCatalog();
            }
        },
        error:function( response ) {
            alert('Oops... Something wrong happened');
        }
    } );
}
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function crpShowNoResult(portfolioId)
{
    if (jQuery("#crp-content-"+portfolioId+" .crp-wrapper").hasClass('crp-wrapper-catalog') && jQuery.isEmptyObject(jQuery("#crp-content-" + portfolioId + " .crp-wrapper .ftg-items").html())) {
        jQuery("#crp-content-" + portfolioId + " .crp-wrapper .ftg-items").html('<div class="catalog-empty-result">No result found</div>');
        jQuery("#crp-content-" + portfolioId).animate({height: 300}, 200);
    }
}

function gkitConfigureGrid(portfolioId, tileParams, portfolioOptions, viewerOptions, crpGalleryDatasource, crpDatasource, fromAjax)
{

    if (typeof fromAjax != 'undefined' && fromAjax == 1) {
        var isSidebar = (jQuery("#crp-content-" + portfolioId + " .crp-widget-LeftSidebar").length != 0 ||
            jQuery("#crp-content-" + portfolioId + " .crp-widget-RightSidebar").length != 0);
        if (isSidebar && jQuery(window).width() < 1024) {
            jQuery("#crp-content-" + portfolioId + " .crp-wrapper").get(0).style.setProperty('width', '100%', 'important');
        }
        tileParams.onComplete = function () {
            var height = jQuery("#crp-content-buffer-" + portfolioId).height();
            if (jQuery("#crp-content-" + portfolioId + " .crp-widget-TopBar").length != 0) {
                height += jQuery("#crp-content-" + portfolioId + " .crp-widget-TopBar").outerHeight(true);
            }
            jQuery("#crp-content-" + portfolioId).css("position", "relative");

            jQuery("#crp-content-buffer-" + portfolioId + " .crp-wrapper .ftg-items").css("opacity", 0);
            var top = 0;
            if (jQuery("#crp-content-" + portfolioId + " .crp-widget-TopBar").length != 0 ||
                (isSidebar && jQuery(window).width() < 1024)) {
                top = jQuery("#crp-content-" + portfolioId + " .crp-catalog-widget").outerHeight(true);
            }
            var left = 0;
            if (jQuery("#crp-content-" + portfolioId + " .crp-widget-LeftSidebar").length != 0 && jQuery(window).width() >= 1024) {
                left = jQuery("#crp-content-" + portfolioId + " .crp-catalog-widget").outerWidth(true);
            }

            if (jQuery("#crp-content-" + portfolioId + " .crp-widget-RightSidebar").length != 0 && jQuery(window).width() >= 1024) {
                var right = jQuery("#crp-content-" + portfolioId + " .crp-catalog-widget").outerWidth(true);
                jQuery("#crp-content-buffer-" + portfolioId + " .crp-wrapper").css("right", right);
            }

            jQuery("#crp-content-buffer-" + portfolioId + " .crp-wrapper").css("position", "absolute").css("top", top).css("left", left);

            jQuery("#crp-content-" + portfolioId + " .crp-wrapper .ftg-pages").remove();
            jQuery("#crp-content-" + portfolioId).prepend(jQuery("#crp-content-buffer-" + portfolioId + " .crp-wrapper"));

            jQuery("#crp-content-buffer-" + portfolioId).remove();

            jQuery("#crp-content-" + portfolioId).animate({height: height}, 200, function(){
                jQuery("#crp-content-" + portfolioId + " .crp-wrapper .ftg-items").animate({opacity: 1}, 200);
                jQuery("#crp-content-" + portfolioId + " .crp-wrapper").last().remove();
                crpShowNoResult(portfolioId);
            });
        };
    } else {
        tileParams.onComplete = function () {
            crpShowNoResult(portfolioId);
        };
    }

    jQuery('#gallery-'+portfolioId).crpTiledLayer(tileParams);

    if(!portfolioOptions.kEnableGridLazyLoad){
        jQuery('#gallery-'+portfolioId).show();
    }

    var selectedTile;
    jQuery('#gallery-'+portfolioId+' .crp-tile').on('click', function (event){
            //Trick: Make hover effect visible for mobile devices
        if (!jQuery(".crp-tile-inner", jQuery(this)).hasClass("image-none")) {
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                var tile = jQuery(event.target).closest(".crp-tile");
                if (!tile.hasClass("crp-active-tile")) {
                    tile.addClass("crp-active-tile");

                    if (selectedTile) {
                        selectedTile.removeClass("crp-active-tile");
                    }
                    selectedTile = tile;

                    return;
                } else {
                    tile.removeClass("crp-active-tile");
                    selectedTile = null;
                }
            }
        }

        if(jQuery(event.target).parent().hasClass("ic-share")){
            return;
        }
        if(jQuery(event.target).hasClass("crp-video-play-icon")){
            var tileInner = jQuery(event.target).closest('.crp-tile-inner');
            var videoSrc = tileInner.attr('data-src');
            if (tileInner.hasClass('crp-video-tile-inline') && typeof videoSrc != 'undefined' && videoSrc != '') {
                replacement = '';
                if (tileInner.hasClass('crp-tile-youtube')) {
                    var replacement = '<iframe class="crp-inline-video-player" width="100%" height="100%" src="'+videoSrc+'" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
                } else if (tileInner.hasClass('crp-tile-vimeo')) {
                    var replacement = '<iframe class="crp-inline-video-player" width="100%" height="100%" src="'+videoSrc+'" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
                } else if (tileInner.hasClass('crp-tile-video')) {
                    var replacement = '<iframe class="crp-inline-video-player" width="100%" height="100%" src="'+videoSrc+'" frameborder="0"></iframe>';
                }
                jQuery(tileInner).append(replacement);
                return false;
            }
        }

        if (jQuery(event.target).hasClass('crp-product-buy-button')) {
            return false;
        } else if(jQuery(this).hasClass('crp-product-click-form')) {
            crp_openProductEnquiryForm(jQuery(this).attr('data-catalog-id'), jQuery(this).attr('data-id'));
            return false;
        }  else if(jQuery(this).hasClass('crp-product-click-none')) {
            return false;
        }

        if (portfolioOptions.kDirectLinking) {
            event.preventDefault();
            if(jQuery(event.target).parent().hasClass("ic-fb-link") || jQuery(event.target).parent().hasClass("ic-ln-link")) {
                var url = jQuery(event.target).parent().attr('href');
            } else {
                var url = jQuery(this).attr("data-url");
            }
            if (url == '') {
                return false;
            }
            crp_loadHref(url, portfolioOptions.kLoadUrlBlank);
            return false;
        }

        if(!jQuery(event.target).parent().hasClass("ic-link")){

            if(portfolioOptions.albumViewerTypeIsGrid){
                if (jQuery(event.target).closest('.crp-tile-inner').length >0) {
                    crp_loadHref(jQuery(event.target).closest('.crp-tile-inner').attr('data-album-url'), portfolioOptions.kLoadUrlBlank);
                }
                return false;
            }
            if(jQuery(event.target).parent().hasClass('crp-video-tile-inline')) {
                return false;
            }

            event.preventDefault();

            var tileId = jQuery(this).attr("id");
            var projectId = jQuery("#" + tileId + " .crp-tile-inner").attr("id");

            var defaultSelection = 0;
            var isGallery = portfolioOptions.kDisableAlbumStylePresentation;
            if(isGallery) {
                //Find default selection
                for(var pIdx=0; pIdx<crpGalleryDatasource.length; pIdx++) {
                    var project = crpGalleryDatasource[pIdx];
                    if(project.id == projectId) {
                        defaultSelection = pIdx;
                        break;
                    }
                }
            }
            var params = {
                dynamic: true,
                dynamicEl: isGallery ? crpGalleryDatasource : crpDatasource[projectId],
                index: defaultSelection,
                youtubePlayerParams: {rel: 0}
            };
            jQuery.extend(params, viewerOptions);
            var $lg = jQuery(this).lightGallery(params);

            $lg.on("onAfterOpen.lg", function(){
                jQuery(".lg-backdrop").addClass(portfolioOptions.kViewerBackdropClass);
                jQuery(".lg-backdrop").addClass('crp-popup-backdrop-'+portfolioId);

                if (typeof viewerOptions.showTextToggle != 'undefined' && viewerOptions.showTextToggle) {
                    if (jQuery('.lg-toolbar .crp-popup-info-toggler').length == 0) {
                        jQuery('.lg-toolbar').append('<a class=\"lg-icon crp-popup-info-toggler\" href=\"javascript:crp_toggleCaption()\">i</a>');
                    }
                }
                window.history.pushState('forward', null, './#gkit-popup');
                gkitPopupIsOpen = true

            });
            $lg.on("onCloseAfter.lg", function(){
                gkitPopupIsOpen = false;
                if (!gkitBackCloses) {
                    gkitBackCloses = false;
                    window.history.back();
                } else {
                    gkitBackCloses = false;
                }
            });
        }
    });

    crpConfigureSocialButtons();
}

function crp_toggleCaption() {
    var curVal = jQuery('.lg-sub-html').css('visibility');
    jQuery('.lg-sub-html').css('visibility', curVal == 'hidden' ? 'visible' : 'hidden');
}

function crp_openProductEnquiryForm(catalogId, productId) {
    jQuery("#crp-product-enquiry-dialog-"+catalogId+" .crp-product-enquiry-form input[name=product_id]").val(productId);
    jQuery("#crp-product-enquiry-dialog-"+catalogId).dialog('open');
}

function crp_getQueryParam( name, url ) {
    if (!url) url = location.href;
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( url );
    return results == null ? null : results[1];
}

function crp_configureCatalog()
{
    jQuery(".crp-success-dialog").dialog({
        title: 'Alert!',
        autoOpen: false,
        modal: true,
        close: function(){
        },
        open: function( event, ui ) {
            var catalogId = jQuery(event.target).attr('data-catalog-id');
            jQuery('[aria-describedby="crp-success-dialog-'+catalogId+'"] .ui-dialog-titlebar-close').removeAttr('title');
        },
        width: 400
    });

    jQuery(".crp-success-dialog .crp-close-btn").click(function(){
        jQuery(this).closest('.crp-success-dialog').dialog('close');
        return false;
    });

    jQuery(".crp-product-enquiry-dialog").dialog({
        autoOpen: false,
        modal: true,
        closeText: "X",
        close: function(){
            jQuery("html, body").css('overflow', '');
        },
        open: function( event, ui ) {
            jQuery("html, body").css('overflow', 'hidden');
            var catalogId = jQuery(event.target).attr('data-catalog-id');
            jQuery('[aria-describedby="crp-product-enquiry-dialog-'+catalogId+'"] .ui-dialog-titlebar-close').removeAttr('title');
            jQuery(".crp-product-enquiry-form .crp-error-text").text('').hide();
            jQuery(".crp-product-enquiry-form .crp-enquiry-input input, .crp-product-enquiry-form .crp-enquiry-input textarea").val('');
            jQuery(".crp-product-enquiry-form input, .crp-product-enquiry-form textarea").removeClass('crp-form-error');
        },
        width: 600
    });

    // jQuery("#crp-product-enquiry-dialog .crp-close-btn").click(function(){
    //     jQuery("#crp-product-enquiry-dialog").dialog('close');
    //     return false;
    // });

    jQuery(".crp-product-enquiry-form").off().on('submit', function(){
        var form = jQuery(this);
        var catalogId = jQuery(this).closest('.crp-product-enquiry-dialog').attr('data-catalog-id');
        var sendData = {
            action :'gkit_submit_enquiry',
            data: form.serializeArray()
        };
        jQuery.ajax ( {
            type		:	form.attr('method'),
            data        :   sendData,
            url			: 	GKIT_NO_PRIV_AJAX_URL,
            dataType	: 	'json',
            success		: 	function( response ) {
                if (typeof response.status != 'undefined' && response.status == 'OK') {
                    jQuery("#crp-success-dialog-"+catalogId).dialog('open');
                    jQuery(".crp-enquiry-input input, .crp-enquiry-input textarea", form).val('');
                    jQuery("#crp-product-enquiry-dialog-"+catalogId).dialog('close');
                } else if (typeof response.status != 'undefined' && response.status == 'ERROR') {
                    if (typeof response.errors != 'undefined') {
                        jQuery(".crp-product-enquiry-form input, .crp-product-enquiry-form textarea").removeClass('crp-form-error');
                        for (var i in response.errors) {
                            jQuery(".crp-product-enquiry-form [name="+response.errors[i]+"]").addClass('crp-form-error');
                        }
                    }
                    jQuery(".crp-error-text", form).text(response.message).show();
                }
            },
            error:function( response ) {
                alert('Oops... Something wrong happened');
            }
        } );
        return false;
    });

    jQuery("#crp-product-review-form").off().on('submit', function(){

        var catalogId = jQuery(this).attr('data-catalog-id');

        var sendData = {
            action :'gkit_submit_review',
            data: jQuery(this).serializeArray()
        };
        jQuery.ajax ( {
            type		:	jQuery("#crp-product-review-form").attr('method'),
            data        :   sendData,
            url			: 	GKIT_NO_PRIV_AJAX_URL,
            dataType	: 	'json',
            success		: 	function( response ) {
                if (typeof response.status != 'undefined' && response.status == 'OK') {
                    jQuery("#crp-product-review-form .crp-error-text").text('').hide();
                    jQuery("#crp-product-review-form input, #crp-product-review-form textarea").removeClass('crp-form-error');
                    jQuery("#crp-product-review-form .crp-review-input input, #crp-product-review-form .crp-review-input textarea").val('');
                    jQuery("#crp-review-form-container").fadeOut(300, function(){
                        jQuery("#crp-success-dialog-"+catalogId).dialog('open');
                        jQuery(this).remove();
                    });
                    crp_productRater.setRating(0);
                } else if (typeof response.status != 'undefined' && response.status == 'ERROR') {
                    if (typeof response.errors != 'undefined') {
                        jQuery("#crp-product-review-form input, #crp-product-review-form textarea").removeClass('crp-form-error');
                        for (var i in response.errors) {
                            jQuery("#crp-product-review-form [name="+response.errors[i]+"]").addClass('crp-form-error');
                        }
                    }
                    jQuery("#crp-product-review-form .crp-error-text").text(response.message).show();
                }
            },
            error:function( response ) {
                alert('Oops... Something wrong happened');
            }
        } );
        return false;
    });

    jQuery(".crp-sort-by.crp-not-smooth-load, .crp-sort-in.crp-not-smooth-load, .crp-filter-by.crp-not-smooth-load").off().on('change', function(){
        window.location.href = jQuery("option:selected", jQuery(this)).attr('data-link');
    });

    jQuery(".crp-filter-by-sidebar.crp-not-smooth-load").off().on('click', function(){
        window.location.href = jQuery(this).attr('data-link');
    });

    if (jQuery(".crp-rater").length > 0) {
        jQuery(".crp-rater").each(function(){
            crp_rater({
                starSize: 20,
                element: this,
                showToolTip: false
            });
        });
    }
    var crp_productRater = null;
    if (jQuery("#crp-product-rater").length > 0) {
        var crp_productRater = crp_rater({
            starSize: 20,
            element: document.querySelector("#crp-product-rater"),
            showToolTip: false,
            rateCallback: function rateCallback(rating, done) {
                this.setRating(rating);
                jQuery("#crp-review-rating").val(this.getRating());
                done();
            }
        });
    }

}

function crp_configureImageZoom(){
    jQuery('.crp-product-image')
        .on('mouseover', function(){
            jQuery(this).children('.crp-product-photo').css({'transform': 'scale('+ jQuery(this).attr('data-scale') +')'});
        })
        .on('touchstart', function(){
            jQuery(this).children('.crp-product-photo').css({'transform': 'scale('+ jQuery(this).attr('data-scale') +')'});
        })
        .on('mouseout', function(){
            jQuery(this).children('.crp-product-photo').css({'transform': 'scale(1)'});
        })
        .on('touchend', function(){
            jQuery(this).children('.crp-product-photo').css({'transform': 'scale(1)'});
            jQuery("body").removeClass('lock-screen');
        })
        .on('mousemove', function(e){
            jQuery(this).children('.crp-product-photo').css({'transform-origin': ((e.pageX - jQuery(this).offset().left) / jQuery(this).width()) * 100 + '% ' + ((e.pageY - jQuery(this).offset().top) / jQuery(this).height()) * 100 +'%'});
        })
        .on('touchmove', function(e){
            jQuery(this).children('.crp-product-photo').css({'transform-origin': ((e.originalEvent.touches[0].pageX - jQuery(this).offset().left) / jQuery(this).width()) * 100 + '% ' + (( e.originalEvent.touches[0].pageY - jQuery(this).offset().top) / jQuery(this).height()) * 100 +'%'});
        })
        .each(function(){
            jQuery(this)
                .append('<div class="crp-product-photo gkit-noselect"></div>')
                .children('.crp-product-photo').css({'background-image': 'url('+ jQuery(this).attr('data-image') +')'});
        });
}

function crp_ReadMoreDesc(elem, longSelector)
{
    if (jQuery(elem).attr('data-more') == '1') {
        //Stuff to do when btn is in the read more state
        jQuery(elem).text(jQuery(elem).attr('data-less-text'));
        jQuery(longSelector).removeClass('crp-dn');
        jQuery(elem).attr('data-more', 0);
    } else {
        //Stuff to do when btn is in the read less state
        jQuery(elem).text(jQuery(elem).attr('data-more-text'));
        jQuery(longSelector).addClass('crp-dn');
        jQuery(elem).attr('data-more', 1);
    }
}

jQuery(document).ready(function(){
    crp_configureCatalog();
    crp_configureImageZoom();

    jQuery(".crp-product-img-thumb").click(function () {
        if (jQuery(".crp-product-main-image").hasClass("crp-product-main-image-full")) {
            jQuery(".crp-product-main-image img").attr('src', jQuery(this).attr('src'));
        } else {
            jQuery(".crp-product-image").attr('data-image', jQuery(this).attr('src'));
            crp_configureImageZoom();
        }
    });

    jQuery(window).resize(function(){
        if (jQuery(".crp-catalog-product-wrapper").width() <= 1020) {
            jQuery(".crp-product-media-box").addClass('gkit-mobile');
            jQuery(".crp-product-media-box .crp-product-main-image").addClass('gkit-mobile');
            jQuery(".crp-product-media-box .crp-product-images").addClass('gkit-mobile');
            jQuery(".crp-product-info-box").addClass('gkit-mobile');
        } else {
            jQuery(".crp-product-media-box").removeClass('gkit-mobile');
            jQuery(".crp-product-media-box .crp-product-main-image").removeClass('gkit-mobile');
            jQuery(".crp-product-media-box .crp-product-images").removeClass('gkit-mobile');
            jQuery(".crp-product-info-box").removeClass('gkit-mobile');
        }
        if (jQuery(".crp-catalog-product-wrapper").width() <= 480) {
            jQuery(".crp-product-media-box .crp-product-main-image").addClass('gkit-mobile-480');
        } else {
            jQuery(".crp-product-media-box .crp-product-main-image").removeClass('gkit-mobile-480');
        }
        if (jQuery(".crp-catalog-wrapper").width() < 880) {
            jQuery(".crp-catalog-widget-item").addClass('gkit-mobile-880');
            jQuery(".crp-catalog-widget").addClass('gkit-mobile-880');
        } else {
            jQuery(".crp-catalog-widget-item").removeClass('gkit-mobile-880');
            jQuery(".crp-catalog-widget").removeClass('gkit-mobile-880');
        }

    });

    jQuery(window).on('hashchange, popstate', function (event) {
        if(gkitPopupIsOpen) {
            gkitPopupIsOpen = false;
            gkitBackCloses = true;
            jQuery('.lg-close').click();
        }
    });

    jQuery(window).resize();
});
