/**
 * Functionality specific to valetex.
 *
 * Provides helper functions to enhance the theme experience.
 */
"use strict";

/*------------------------------------------------------------------------------*/
/* Back to top
/*------------------------------------------------------------------------------*/

// ===== Scroll to Top ==== 
jQuery('#totop').hide();
jQuery(window).scroll(function() {
    if (jQuery(this).scrollTop() >= 100) {        // If page is scrolled more than 50px
        jQuery('#totop').fadeIn(200);    // Fade in the arrow
        jQuery('#totop').addClass('top-visible');
    } else {
        jQuery('#totop').fadeOut(200);   // Else fade out the arrow
        jQuery('#totop').removeClass('top-visible');
    }
});
jQuery('#totop').on('click', function() {    // When arrow is clicked
    jQuery('body,html').animate({
        scrollTop : 0                       // Scroll to top of body
    }, 500);
    return false;
});

/*------------------------------------------------------------------------------*/
/* Search Form
/*------------------------------------------------------------------------------*/
	
	jQuery( ".prt-header-search-link a" ).on('click', function(){	
		jQuery(".prt-search-overlay").addClass('st-show');
		jQuery(".prt-overlay-serachform").addClass('st-show');
		jQuery("body").addClass('st-prevent-scroll');			
		jQuery(".field.searchform-s").focus();					    
		return false;
	});	
	jQuery( ".prt-icon-close" ).on('click', function(){			
	  		jQuery(".prt-search-overlay").removeClass('st-show');
	  		jQuery(".prt-overlay-serachform").removeClass('st-show');
			jQuery("body").removeClass('st-prevent-scroll');					  
	 		return false;
	});	
	jQuery('.prt-site-searchform').on('click', function(event){
		event.stopPropagation();
	});
	
/*------------------------------------------------------------------------------*/
/* Enables menu toggle for small screens.
/*------------------------------------------------------------------------------*/ 
	 ( function() {
		var nav = jQuery( '#site-navigation' ), button, menu;
		if ( ! nav )
			return;

		button = nav.find( '.menu-toggle' );
		if ( ! button )
			return;

		// Hide button if menu is missing or empty.
		menu = nav.find( '.nav-menu' );
		if ( ! menu || ! menu.children().length ) {
			button.hide();
			return;
		}

		jQuery( '.menu-toggle' ).on( 'click.valetex', function() {
			nav.toggleClass( 'toggled-on' );
		} );
	} )();
	
/*------------------------------------------------------------------------------*/
/* Add plus icon in menu
/*------------------------------------------------------------------------------*/ 

	jQuery('#site-header-menu #site-navigation div.nav-menu > ul > li:has(ul), .prt-mmmenu-override-yes #site-header-menu #site-navigation .mega-menu-wrap > ul > li:has(ul)').append("<span class='righticon'><i class='prt-valetex-icon-angle-down'></i></span>");	
		
/*------------------------------------------------------------------------------*/
/* Responsive Menu
/*------------------------------------------------------------------------------*/
	jQuery('.righticon').on('click', function() {
		if(jQuery(this).siblings('.sub-menu, .children, .mega-sub-menu').hasClass('open')){
			jQuery(this).siblings('.sub-menu, .children, .mega-sub-menu').removeClass('open');
			jQuery( 'i', jQuery(this) ).removeClass('prt-valetex-icon-angle-up').addClass('prt-valetex-icon-angle-down');
		} else {
			jQuery(this).siblings('.sub-menu, .children, .mega-sub-menu').addClass('open');			
			jQuery( 'i', jQuery(this) ).removeClass('prt-valetex-icon-angle-down').addClass('prt-valetex-icon-angle-up');
		}
		return false;
 	});
	
	
/* ====================================== */
/* Circle Progress bar
/* ====================================== */
	jQuery('.prt-circle-box').each(function(){

		var this_circle = jQuery(this);

		// Circle settings
		var emptyFill_val = "rgba(0, 0, 0, 0)";
		var thickness_val = 10;
		var fill_val      = this_circle.data('fill');

		if( typeof this_circle.data('emptyfill') !== 'undefined' && this_circle.data('emptyfill')!='' ){
			emptyFill_val = this_circle.data('emptyfill');
		}
		if( typeof this_circle.data('thickness') !== 'undefined' && this_circle.data('thickness')!='' ){
			thickness_val = this_circle.data('thickness');
		}
		if( typeof this_circle.data('filltype') !== 'undefined' && this_circle.data('filltype')=='gradient' ){
			fill_val = {gradient: [ this_circle.data('gradient1') , this_circle.data('gradient2') ], gradientAngle: Math.PI / 4 };
		}

		if( typeof jQuery.fn.circleProgress == "function" ){
			var digit   = this_circle.data('digit');
			var before  = this_circle.data('before');
			var after   = this_circle.data('after');
			var c_width  = this_circle.data('id');
			var digit       = Number( digit );
			var short_digit = ( digit/100 ); 

			jQuery('.prt-circle', this_circle ).circleProgress({
				value		: 0,
				size		: c_width,
				startAngle	: -Math.PI / 4 * 2,
				thickness	: thickness_val,
				emptyFill	: emptyFill_val,
				fill		: fill_val
			}).on('circle-animation-progress', function(event, progress, stepValue) { // Rotate number when animating
				this_circle.find('.prt-fid-number').html( before + Math.round( stepValue*100 ) + after );
			});
		}

		this_circle.waypoint(function(direction) {
			if( !this_circle.hasClass('completed') ){
				// Re draw when view
				if( typeof jQuery.fn.circleProgress == "function" ){
					jQuery('.prt-circle', this_circle ).circleProgress( { value: short_digit } );
				};
				this_circle.addClass('completed');
			}
		}, { offset:'90%' });

	});
	

	/* ***************** */
	/*  Carousel effect  */
	/* ***************** */

var preyantechnosys_carousel = function() {
	jQuery('.preyantechnosys-boxes-view-carousel').each(function(){
		
		var thisElement = jQuery(this);

		// Column
		var tm_column         = 3;
		var tm_slidestoscroll = 3;
		
		var tm_slidestoscroll_1200 = 3;
		var tm_slidestoscroll_992  = 3;
		var tm_slidestoscroll_768  = 2;
		var tm_slidestoscroll_479  = 1;
		var tm_slidestoscroll_0    = 1;
		if( jQuery(this).data('prt-slidestoscroll')=='1' ){  // slides to scroll
			var tm_slidestoscroll      = 1;
			var tm_slidestoscroll_1200 = 1;
			var tm_slidestoscroll_992  = 1;
			var tm_slidestoscroll_768  = 1;
			var tm_slidestoscroll_479  = 1;
			var tm_slidestoscroll_0    = 1;
		}		
		
		// responsive
		var tm_responsive = [
			{ breakpoint: 1200, settings: {
				slidesToShow  : 3,
				slidesToScroll: tm_slidestoscroll_1200
			} },
			{ breakpoint: 768, settings: {
				slidesToShow  : 2,
				slidesToScroll: tm_slidestoscroll_768
			} },
			{ breakpoint: 574, settings: {
				slidesToShow  : 1,
				slidesToScroll: tm_slidestoscroll_479
			} },
			{ breakpoint: 0, settings: {
				slidesToShow  : 1,
				slidesToScroll: tm_slidestoscroll_0
			} }
		];
								
		if( jQuery(this).hasClass('preyantechnosys-boxes-col-three') ){
			tm_column         = 3;
			tm_slidestoscroll = 3;
			
			var tm_slidestoscroll_1200 = 3;
			var tm_slidestoscroll_992  = 2;
			var tm_slidestoscroll_768  = 2;
			var tm_slidestoscroll_479  = 1;
			var tm_slidestoscroll_0    = 1;
			if( jQuery(this).data('prt-slidestoscroll')=='1' ){  // slides to scroll
				var tm_slidestoscroll      = 1;
				var tm_slidestoscroll_1200 = 1;
				var tm_slidestoscroll_992  = 1;
				var tm_slidestoscroll_768  = 1;
				var tm_slidestoscroll_479  = 1;
				var tm_slidestoscroll_0    = 1;
			}
			
			tm_responsive     = [
				{ breakpoint: 1200, settings: {
					slidesToShow  : 3,
					centerMode: false,
					centerPadding: '0px',
					slidesToScroll: tm_slidestoscroll_1200,
				} },
				{ breakpoint: 992, settings: {
					slidesToShow  : 2,
					centerMode: false,
					centerPadding: '0px',
					slidesToScroll: tm_slidestoscroll_992
				} },
				{ breakpoint: 768, settings: {
					slidesToShow  : 2,
					centerMode: false,
					centerPadding: '0px',
					slidesToScroll: tm_slidestoscroll_768
				} },
				{ breakpoint: 574, settings: {
					slidesToShow  : 1,
					centerMode: false,
					centerPadding: '0px',
					slidesToScroll: tm_slidestoscroll_479
				} },
				{ breakpoint: 0, settings: {
					slidesToShow  : 1,
					slidesToScroll: tm_slidestoscroll_0
				} }
			];
		
		} else if( jQuery(this).hasClass('preyantechnosys-boxes-col-one') ){
		
			tm_column         = 1;
			tm_slidestoscroll = 1;
			
			tm_responsive     = [
				{ breakpoint: 1200, settings: {
					slidesToShow  : 1,
					slidesToScroll: 1,
					centerMode: false,
					centerPadding: '0px',
					arrows: false
				} },
				{ breakpoint: 768, settings: {
					slidesToShow  : 1,
					slidesToScroll: 1,
					centerMode: false,
					centerPadding: '0px',
					arrows: false
				} },
				{ breakpoint: 574, settings: {
					slidesToShow  : 1,
					centerMode: false,
					centerPadding: '0px',
					slidesToScroll: 1
				} },
				{ breakpoint: 0, settings: {
					slidesToShow  : 1,
					slidesToScroll: 1
				} }
			];
			
		} else if( jQuery(this).hasClass('preyantechnosys-boxes-col-two') ){
			tm_column         = 2;
			tm_slidestoscroll = 2;
			
			var tm_slidestoscroll_1200 = 2;
			var tm_slidestoscroll_768  = 2;
			var tm_slidestoscroll_479  = 1;
			var tm_slidestoscroll_0    = 1;
			if( jQuery(this).data('prt-slidestoscroll')=='1' ){  // slides to scroll
				var tm_slidestoscroll      = 1;
				var tm_slidestoscroll_1200 = 1;
				var tm_slidestoscroll_768  = 1;
				var tm_slidestoscroll_479  = 1;
				var tm_slidestoscroll_0    = 1;
			}
			
			tm_responsive     = [
				{ breakpoint: 1200, settings: {
					slidesToShow  : 2,
					centerMode: false,
					centerPadding: '0px',
					slidesToScroll: tm_slidestoscroll_1200
				} },
				{ breakpoint: 768, settings: {
					slidesToShow  : 2,
					centerMode: false,
					centerPadding: '0px',
					slidesToScroll: tm_slidestoscroll_768
				} },
				{ breakpoint: 574, settings: {
					slidesToShow  : 1,
					centerMode: false,
					centerPadding: '0px',
					slidesToScroll: tm_slidestoscroll_479
				} },
				{ breakpoint: 0, settings: {
					slidesToShow  : 1,
					slidesToScroll: tm_slidestoscroll_0
				} }
			];
		
		} else if( jQuery(this).hasClass('preyantechnosys-boxes-col-four') ){
			tm_column         = 4;
			tm_slidestoscroll = 4;
			
			var tm_slidestoscroll_1200 = 4;
			var tm_slidestoscroll_992  = 2;
			var tm_slidestoscroll_768  = 2;
			var tm_slidestoscroll_479  = 1;
			var tm_slidestoscroll_0    = 1;
			if( jQuery(this).data('prt-slidestoscroll')=='1' ){  // slides to scroll
				var tm_slidestoscroll      = 1;
				var tm_slidestoscroll_1200 = 1;
				var tm_slidestoscroll_992  = 1;
				var tm_slidestoscroll_768  = 1;
				var tm_slidestoscroll_479  = 1;
				var tm_slidestoscroll_0    = 1;
			}
			
			tm_responsive     = [
				{ breakpoint: 1200, settings: {
					slidesToShow  : 4,
					centerMode: false,
					centerPadding: '0px',
					slidesToScroll: tm_slidestoscroll_1200
				} },
				{ breakpoint: 992, settings: {
					slidesToShow  : 2,
					centerMode: false,
					centerPadding: '0px',
					slidesToScroll: tm_slidestoscroll_992
				} },
				{ breakpoint: 768, settings: {
					slidesToShow  : 2,
					centerMode: false,
					centerPadding: '0px',
					slidesToScroll: tm_slidestoscroll_768
				} },
				{ breakpoint: 574, settings: {
					slidesToShow  : 1,
					centerMode: false,
					centerPadding: '0px',
					slidesToScroll: tm_slidestoscroll_479
				} },
				{ breakpoint: 0, settings: {
					slidesToShow  : 1,
					slidesToScroll: tm_slidestoscroll_0
				} }
			];			
			
		} else if( jQuery(this).hasClass('preyantechnosys-boxes-col-five') ){
			tm_column         = 5;
			tm_slidestoscroll = 5;
			
			var tm_slidestoscroll_1200 = 5;
			var tm_slidestoscroll_992  = 3;
			var tm_slidestoscroll_768  = 3;
			var tm_slidestoscroll_479  = 1;
			var tm_slidestoscroll_0    = 1;
			if( jQuery(this).data('prt-slidestoscroll')=='1' ){  // slides to scroll
				var tm_slidestoscroll      = 1;
				var tm_slidestoscroll_1200 = 1;
				var tm_slidestoscroll_992  = 1;
				var tm_slidestoscroll_768  = 1;
				var tm_slidestoscroll_479  = 1;
				var tm_slidestoscroll_0    = 1;
			}
			
			tm_responsive     = [
				{ breakpoint: 1200, settings: {
					slidesToShow  : 5,
					slidesToScroll: tm_slidestoscroll_1200,
					centerMode: false,
					centerPadding: '0px'
				} },
				{ breakpoint: 992, settings: {
					slidesToShow  : 3,
					centerMode: false,
					centerPadding: '0px',
					slidesToScroll: tm_slidestoscroll_992
				} },
				{ breakpoint: 768, settings: {
					slidesToShow  : 3,
					centerMode: false,
					centerPadding: '0px',
					slidesToScroll: tm_slidestoscroll_768
				} },
				{ breakpoint: 574, settings: {
					slidesToShow  : 1,
					centerMode: false,
					centerPadding: '0px',
					slidesToScroll: tm_slidestoscroll_479
				} },
				{ breakpoint: 0, settings: {
					slidesToShow  : 1,
					slidesToScroll: tm_slidestoscroll_0
				} }
			];
			
		} else if( jQuery(this).hasClass('preyantechnosys-boxes-col-six') ){
			tm_column         = 6;
			tm_slidestoscroll = 6;
			
			var tm_slidestoscroll_1200 = 6;
			var tm_slidestoscroll_992  = 3;
			var tm_slidestoscroll_768  = 3;
			var tm_slidestoscroll_479  = 1;
			var tm_slidestoscroll_0    = 1;
			if( jQuery(this).data('prt-slidestoscroll')=='1' ){  // slides to scroll
				var tm_slidestoscroll      = 1;
				var tm_slidestoscroll_1200 = 1;
				var tm_slidestoscroll_992  = 1;
				var tm_slidestoscroll_768  = 1;
				var tm_slidestoscroll_479  = 1;
				var tm_slidestoscroll_0    = 1;
			}
			
			tm_responsive     = [
				{ breakpoint: 1200, settings: {
					slidesToShow  : 6,
					centerMode: false,
					centerPadding: '0px',
					slidesToScroll: tm_slidestoscroll_1200
				} },
				{ breakpoint: 992, settings: {
					slidesToShow  : 3,
					centerMode: false,
					centerPadding: '0px',
					slidesToScroll: tm_slidestoscroll_992
				} },
				{ breakpoint: 768, settings: {
					slidesToShow  : 3,
					centerMode: false,
					centerPadding: '0px',
					slidesToScroll: tm_slidestoscroll_768
				} },
				{ breakpoint: 574, settings: {
					slidesToShow  : 1,
					centerMode: false,
					centerPadding: '0px',
					slidesToScroll: tm_slidestoscroll_479
				} },
				{ breakpoint: 0, settings: {
					slidesToShow  : 1,
					slidesToScroll: tm_slidestoscroll_0
				} }
			];

		} else if( jQuery(this).hasClass('preyantechnosys-boxes-col-seven') ){
			tm_column         = 7;
			tm_slidestoscroll = 7;
			
			var tm_slidestoscroll_1200 = 7;
			var tm_slidestoscroll_992  = 3;
			var tm_slidestoscroll_768  = 3;
			var tm_slidestoscroll_479  = 1;
			var tm_slidestoscroll_0    = 1;
			if( jQuery(this).data('prt-slidestoscroll')=='1' ){  // slides to scroll
				var tm_slidestoscroll      = 1;
				var tm_slidestoscroll_1200 = 1;
				var tm_slidestoscroll_992  = 1;
				var tm_slidestoscroll_768  = 1;
				var tm_slidestoscroll_479  = 1;
				var tm_slidestoscroll_0    = 1;
			}
			
			tm_responsive     = [
				{ breakpoint: 1200, settings: {
					slidesToShow  : 7,
					centerMode: false,
					centerPadding: '0px',
					slidesToScroll: tm_slidestoscroll_1200
				} },
				{ breakpoint: 992, settings: {
					slidesToShow  : 3,
					centerMode: false,
					centerPadding: '0px',
					slidesToScroll: tm_slidestoscroll_992
				} },
				{ breakpoint: 768, settings: {
					slidesToShow  : 3,
					centerMode: false,
					centerPadding: '0px',
					slidesToScroll: tm_slidestoscroll_768
				} },
				{ breakpoint: 574, settings: {
					slidesToShow  : 1,
					centerMode: false,
					centerPadding: '0px',
					slidesToScroll: tm_slidestoscroll_479
				} },
				{ breakpoint: 0, settings: {
					slidesToShow  : 1,
					slidesToScroll: tm_slidestoscroll_0
				} }
			];
			
		} else if( jQuery(this).hasClass('preyantechnosys-boxes-col-eight') ){
			tm_column         = 8;
			tm_slidestoscroll = 8;
			
			var tm_slidestoscroll_1200 = 8;
			var tm_slidestoscroll_992  = 3;
			var tm_slidestoscroll_768  = 3;
			var tm_slidestoscroll_479  = 1;
			var tm_slidestoscroll_0    = 1;
			if( jQuery(this).data('prt-slidestoscroll')=='1' ){  // slides to scroll
				var tm_slidestoscroll      = 1;
				var tm_slidestoscroll_1200 = 1;
				var tm_slidestoscroll_992  = 1;
				var tm_slidestoscroll_768  = 1;
				var tm_slidestoscroll_479  = 1;
				var tm_slidestoscroll_0    = 1;
			}
			
			tm_responsive     = [
				{ breakpoint: 1200, settings: {
					slidesToShow  : 8,
					centerMode: false,
					centerPadding: '0px',
					slidesToScroll: tm_slidestoscroll_1200
				} },
				{ breakpoint: 992, settings: {
					slidesToShow  : 3,
					centerMode: false,
					centerPadding: '0px',
					slidesToScroll: tm_slidestoscroll_992
				} },
				{ breakpoint: 768, settings: {
					slidesToShow  : 3,
					centerMode: false,
					centerPadding: '0px',
					slidesToScroll: tm_slidestoscroll_768
				} },
				{ breakpoint: 574, settings: {
					slidesToShow  : 1,
					centerMode: false,
					centerPadding: '0px',
					slidesToScroll: tm_slidestoscroll_479
				} },
				{ breakpoint: 0, settings: {
					slidesToShow  : 1,
					slidesToScroll: tm_slidestoscroll_0
				} }
			];
			
		} else if( jQuery(this).hasClass('tm_1200slidestoshow_2') ){
			tm_column         = 3;
			tm_slidestoscroll = 3;
			
			var tm_slidestoscroll_1200 = 3;
			var tm_slidestoscroll_768  = 2;
			var tm_slidestoscroll_479  = 1;
			var tm_slidestoscroll_0    = 1;
			if( jQuery(this).data('prt-slidestoscroll')=='1' ){  // slides to scroll
				var tm_slidestoscroll      = 1;
				var tm_slidestoscroll_1200 = 1;
				var tm_slidestoscroll_768  = 1;
				var tm_slidestoscroll_479  = 1;
				var tm_slidestoscroll_0    = 1;
			}
			tm_responsive     = [
				{ breakpoint: 1400, settings: {
					slidesToShow  : 2,
					centerMode: false,
					centerPadding: '0px',
					slidesToScroll: tm_slidestoscroll_1200,
				} },
				{ breakpoint: 768, settings: {
					slidesToShow  : 2,
					centerMode: false,
					centerPadding: '0px',
					slidesToScroll: tm_slidestoscroll_768
				} },
				{ breakpoint: 574, settings: {
					slidesToShow  : 1,
					centerMode: false,
					centerPadding: '0px',
					slidesToScroll: tm_slidestoscroll_479
				} },
				{ breakpoint: 0, settings: {
					slidesToShow  : 1,
					slidesToScroll: tm_slidestoscroll_0
				} }
			];	
		
		}
         
		// Fade effect
		var tm_fade = false;
		if( jQuery(this).data('prt-effecttype')=='fade' ){
			tm_fade = true;
		}
		

		// Transaction Speed
		var tm_speed = 4500;
		if( jQuery.trim( jQuery(this).data('prt-speed') ) != '' ){
			tm_speed = jQuery.trim( jQuery(this).data('prt-speed') );
		}
		
		// Autoplay
		var tm_autoplay = false;
		if( jQuery(this).data('prt-autoplay')=='1' ){
			tm_autoplay = true;
		}
		
		// Autoplay Speed
		var tm_autoplayspeed = 4500;
		if( jQuery.trim( jQuery(this).data('prt-autoplayspeed') ) != '' ){
			tm_autoplayspeed = jQuery.trim( jQuery(this).data('prt-autoplayspeed') );
		}
		
		// Loop
		var tm_loop = false;
		if( jQuery.trim( jQuery(this).data('prt-loop') ) == '1' ){
			tm_loop = true;
		}

		// Loop
		var tm_cssease = 'linear';
		if( jQuery.trim( jQuery(this).data('prt-cssease') ) != '' ){
			tm_cssease = jQuery.trim( jQuery(this).data('prt-cssease') );
		}

		
		// Dots
		var tm_dots = false;
		if( jQuery.trim( jQuery(this).data('prt-dots') ) == '1' ){
			tm_dots = true;
		}
		
		// Next / Prev navigation
		var tm_nav = false;
		if( jQuery.trim( jQuery(this).data('prt-nav') ) == '1' || jQuery.trim( jQuery(this).data('prt-nav') ) == 'above' || jQuery.trim( jQuery(this).data('prt-nav') ) == 'below' ){
			tm_nav = true;
		}
		
		// Center mode
		var tm_centermode = false;
		if( jQuery.trim( jQuery(this).data('prt-centermode') ) == '1' ){
			tm_centermode = true;
		}
		
		// Center padding
		var tm_centerpadding = 800;
		if( jQuery.trim( jQuery(this).data('prt-centerpadding') ) != '' ){
			var tm_centerpadding = jQuery.trim( jQuery(this).data('prt-centerpadding') );
		}
		
		// Pause on Focus
		var tm_pauseonfocus = false;
		if( jQuery.trim( jQuery(this).data('prt-pauseonfocus') ) == '1' ){
			tm_pauseonfocus = true;
		}
		
		// Pause on Hover
		var tm_pauseonhover = false;
		if( jQuery.trim( jQuery(this).data('prt-pauseonhover') ) == '1' ){
			tm_pauseonhover = true;
		}

		// rtl
		var tm_rtl = false;
		if( jQuery.trim( jQuery(this).data('prt-rtl') ) == 'true' ){
			tm_rtl = true;
		}


		var tm_vertical = false;
		var tm_verticalSwiping = false;
		if( jQuery(this).parent().parent().hasClass('tm-vertical-slide') ){
			tm_vertical = true;
			tm_column    = 1;
			tm_slidestoscroll = 1;
			tm_verticalSwiping = true;
		}

		
		jQuery('.preyantechnosys-boxes-row-wrapper > div', this).removeClass (function (index, css) {
			return (css.match (/(^|\s)col-\S+/g) || []).join(' ');
		});
	
		jQuery('.preyantechnosys-boxes-row-wrapper', this).not('.slick-initialized').slick({
			fade             : tm_fade,
			speed            : tm_speed,
			centerMode       : tm_centermode,
			centerPadding    : tm_centerpadding+'px',
			pauseOnFocus     : tm_pauseonfocus,
			pauseOnHover     : true,
			slidesToShow     : tm_column,
			slidesToScroll   : tm_slidestoscroll,
			autoplay         : tm_autoplay,
			autoplaySpeed    : tm_autoplayspeed,
			rtl              : tm_rtl,
			dots             : tm_dots,
			pauseOnDotsHover : false,
			arrows           : tm_nav,
			vertical		 : tm_vertical,
			verticalSwiping	 : tm_verticalSwiping,
			adaptiveHeight   : false,
			infinite         : tm_loop,
			cssEase          : tm_cssease,
			responsive       : tm_responsive
  
		});
	});
		
	// On resize.. it will re-arrange the Flexslider
	jQuery('.preyantechnosys-boxes-row-wrapper', this).on('setPosition', function(event, slick){
		jQuery( this ).find( ".prt-flexslider" ).each(function(){
			jQuery(this).resize();
		});
	});
	
	// Next button in heading area
	jQuery(".prt-slick-arrow.prt-slick-next", this ).on('click', function(){
		jQuery('.preyantechnosys-boxes-row-wrapper', jQuery(this).closest('.preyantechnosys-boxes-view-carousel') ).slick('slickNext');
	});
	
	// Pre button in heading area
	jQuery(".prt-slick-arrow.prt-slick-prev", this).on('click', function(){
		jQuery('.preyantechnosys-boxes-row-wrapper', jQuery(this).closest('.preyantechnosys-boxes-view-carousel') ).slick('slickPrev');
	});	
	
	
	
	// Testimonials Slick view
	jQuery('.preyantechnosys-boxes-view-slickview').each(function(){

		// Fade effect
		var tm_fade = false;
		if( jQuery(this).data('prt-effecttype')=='fade' ){
			tm_fade = true;
		}
		
		// Transaction Speed
		var tm_speed = 800;
		if( jQuery.trim( jQuery(this).data('prt-speed') ) != '' ){
			tm_speed = jQuery.trim( jQuery(this).data('prt-speed') );
		}
		
		// Autoplay
		var tm_autoplay = false;
		if( jQuery(this).data('prt-autoplay')=='1' ){
			tm_autoplay = true;
		}
		
		// Autoplay Speed
		var tm_autoplayspeed = 2000;
		if( jQuery.trim( jQuery(this).data('prt-autoplayspeed') ) != '' ){
			tm_autoplayspeed = jQuery.trim( jQuery(this).data('prt-autoplayspeed') );
		}
		
		// Loop
		var tm_loop = false;
		if( jQuery.trim( jQuery(this).data('prt-loop') ) == '1' ){
			tm_loop = true;
		}
		
		// Dots
		var tm_dots = false;
		if( jQuery.trim( jQuery(this).data('prt-dots') ) == '1' ){
			tm_dots = true;
		}
		
		// Next / Prev navigation
		var tm_nav = false;
		if( jQuery.trim( jQuery(this).data('prt-nav') ) == '1' ){
			tm_nav = true;
		}
		
	
		var testinav 	= jQuery('.testimonials-nav', this);
		var testiinfo 	= jQuery('.testimonials-info', this);
		
		/* Options for "Owl Carousel 2"
		 * http://owlcarousel.owlgraphic.com/index.html
		 */
		var rtloption = false;
		if( jQuery('body').hasClass('rtl') ){
			rtloption = true;
		}
		
		// Info
		jQuery('.testimonials-info', this).not('.slick-initialized').slick({
			fade			: tm_fade,
			//arrows			: tm_nav,
			arrows			: true,
			asNavFor		: testinav,
			adaptiveHeight	: true,
			speed			: tm_speed,
			autoplay		: tm_autoplay,
			autoplaySpeed	: tm_autoplayspeed,
			infinite		: tm_loop,
			rtl             : rtloption
		});
		// Navigation
	   jQuery('.testimonials-nav', this).not('.slick-initialized').slick({
			slidesToShow	: 1,
			asNavFor		: testiinfo,
			centerMode		: true,
			centerPadding	: 0,
			focusOnSelect	: true,
			draggable: false,
			autoplay		: tm_autoplay,
			autoplaySpeed	: tm_autoplayspeed,
			speed			: tm_speed,
			arrows			: tm_nav,
			//arrows			: false,
			dots			: tm_dots,
			variableWidth	: true,
			infinite		: tm_loop,
			rtl             : rtloption
		});


	   /********** testimonial vertical slider *************/
jQuery('.tm-vertical-slide .preyantechnosys-element-testimonialbox-style-1.preyantechnosys-boxes-view-carousel .preyantechnosys-boxes-row-wrapper').not('.slick-initialized').slick({
		slidesToShow: 2,
		slidesToScroll: 1,
	    vertical: true,
	    autoplay:true,
        verticalSwiping: true
});
	});
	
};	


	
var preyantechnosys_coverimgbox = function() {

	jQuery('.prt_coverimgbox_wrapper').each(function(){
		var parentDiv = jQuery(this);

				jQuery('.prt_coverimgbox_wrapper .prt_coverbox_contents:not(.prt-last)').hover(function () {
					jQuery('.prt_coverimgbox_wrapper .prt_coverbox_img').removeClass('active');
				    jQuery(this).next('.prt_coverbox_img').addClass('active');
				});
	});
};	

var preyantechnosys_sliderimgbox = function() {

	jQuery('.tm_sliderimgbox_wrapper').each(function(){
		var parentDiv = jQuery(this);

				jQuery('.tm_sliderimgbox_wrapper .tm_sliderbox_contents').hover(function () {
					jQuery('.tm_sliderimgbox_wrapper .tm_sliderbox_img').removeClass('active');
				    jQuery(this).next('.tm_sliderbox_img').addClass('active');
				});
	});
};	

var preyantechnosys_teambox = function() {

	jQuery('.preyantechnosys-teambox-style2').each(function(){
		var parentDiv = jQuery(this);

				jQuery('.preyantechnosys-teambox-style2 .preyantechnosys-box-content').hover(function () {
					jQuery('.preyantechnosys-teambox-style2 .preyantechnosys-team-image-box').removeClass('active');
				    jQuery(this).next('.preyantechnosys-team-image-box').addClass('active');
				});
	});
};	

jQuery(document).ready(function() {
   
		setTimeout(function(){
			preyantechnosys_carousel();
			preyantechnosys_teambox();
		}, 100);
	
		jQuery('.preyantechnosys-teambox-style2 .preyantechnosys-boxes-row-wrapper .prt-box-col-wrapper:first').addClass("active");
		 jQuery('.preyantechnosys-teambox-style2 .preyantechnosys-boxes-row-wrapper .prt-box-col-wrapper').hover(function(){
		 	jQuery('.preyantechnosys-teambox-style2 .preyantechnosys-boxes-row-wrapper .prt-box-col-wrapper').removeClass("active");
			jQuery(this).addClass("active");
		 });
		 
});


function preyantechnosys_sticky(){
	
	if( typeof jQuery.fn.stick_in_parent == "function" ){
		
		// Admin bar
		var offset_px = 0;
		if( jQuery('body').hasClass('admin-bar') ){
			offset_px = jQuery('#wpadminbar').height();
		}		

		// Returns width of browser viewport
		var pageWidth = jQuery( window ).width();	
		// setting height for spacer
		
		if( parseInt(pageWidth) > parseInt(tm_breakpoint) ){
			jQuery('.prt-stickable-header').stick_in_parent({'parent':'body', 'spacer':false, 'offset_top':offset_px });
		} else {
			jQuery('.prt-stickable-header').trigger("sticky_kit:detach");
		}
	
	}
}

function preyantechnosys_setCookie(c_name,value,exdays){
	var now  = new Date();
	var time = now.getTime();
	time    += (3600 * 1000) * 24;
	now.setTime(time);

	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+now.toGMTString() );
	document.cookie=c_name + "=" + c_value;
} // END function preyantechnosys_setCookie

/*------------------------------------------------------------------------------*/
/* Function to set dynamic height of Testimonial columns
/*------------------------------------------------------------------------------*/
function setHeight(column) {
    var maxHeight = 0;
    //Get all the element with class = col
    column = jQuery(column);
    column.css('height', 'auto');
	
	// Responsive condition: Work only in tablet, desktop and other bigger devices.
	if( jQuery( window ).width() > 479 ){
		
		//Loop all the column
		column.each(function() {       
			//Store the highest value
			if(jQuery(this).height() > maxHeight) {
				maxHeight = jQuery(this).height();
			}
		});
		//Set the height
		column.height(maxHeight);
		
	} // if( jQuery( window ).width() > 479 )
} // END function setHeight
/**************************************************************************/

/*------------------------------------------------------------------------------*/
/* Search form on search results page
/*------------------------------------------------------------------------------*/
if( jQuery('.prt-sresult-form-wrapper').length>0 ){

	jQuery('.prt-sresult-form-wrapper .prt-sresults-settings-btn').on('click', function(){
		jQuery('.prt-sresult-form-wrapper .prt-sresult-form-bottom').slideToggle('400',function(){
			if( jQuery('.prt-sresult-form-wrapper .prt-sresult-form-bottom').is(":hidden") ){
				jQuery('.prt-sresult-form-wrapper .prt-sresults-settings-btn').removeClass('prt-sresult-btn-active');
			} else {
				jQuery('.prt-sresult-form-wrapper .prt-sresults-settings-btn').addClass('prt-sresult-btn-active');
			}
		});
		return false;
	});

	// Check if post_type input is available or not
	if(jQuery('.prt-sresult-form-wrapper form.search-form').length > 0 ){
		if( jQuery(".prt-sresult-form-wrapper form.search-form input[name='post_type']").length==0 ){
		
			jQuery('<input>').attr({
				type : 'hidden',
				name : 'post_type'
			}).appendTo('.prt-sresult-form-wrapper form.search-form');
		}
	}

	// On change of the CPT dropdown
	jQuery(".prt-sresult-form-wrapper .prt-sresult-cpt-select").change(function(){
		jQuery(".prt-sresult-form-wrapper form.search-form input[name='post_type']").val( jQuery(this).val() );
	});

	// Submit the form
	jQuery(".prt-sresult-form-wrapper .prt-sresult-form-sbtbtn").on('click', function(){
		jQuery(".prt-sresult-form-wrapper form.search-form").submit();
	});

}

/*------------------------------------------------------------------------------*/
/* Function to Set Blog Masonry view
/*------------------------------------------------------------------------------*/
function preyantechnosys_blogmasonry(){
	if( jQuery().isotope ){
			if( jQuery('.preyantechnosys-boxes.preyantechnosys-boxes-view-default .preyantechnosys-boxes-row-wrapper').length > 0 ){
			
			jQuery('.preyantechnosys-boxes.preyantechnosys-boxes-view-default .preyantechnosys-boxes-row-wrapper.prt-box-masnory').each(function(){
				var thisBoxes   = jQuery(this).closest('.preyantechnosys-boxes');
				var thisWrapper = jQuery(this);
				if( !thisBoxes.hasClass('preyantechnosys-boxes-col-metro') ){
					thisWrapper.isotope({
						itemSelector: '.prt-box-col-wrapper',
						masonry: {
								
						},
						sortBy : 'original-order'
					});
				}
			});
			
		}
	}
}

/*------------------------------------------------------------------------------*/
/* Function to set margin bottom for sticky footer
/*------------------------------------------------------------------------------*/
function preyantechnosys_stickyFooter(){
	if( jQuery('body').hasClass('preyantechnosys-sticky-footer')){
		jQuery('div#content-wrapper').css( 'marginBottom', jQuery('footer#colophon').height() );
	}
}

/*------------------------------------------------------------------------------*/
/* Function to add class to select box if default option selected
/*------------------------------------------------------------------------------*/
function setEmptySelectBox(element){
	if(jQuery(element).val() == ""){
		jQuery(element).addClass("empty");
	} else {
		jQuery(element).removeClass("empty");
	}
}

function preyantechnosys_hide_togle_link(){
	if( jQuery('#navbar div.mega-menu-wrap ul.mega-menu').length > 0 ){
		jQuery('h3.menu-toggle').css('display','none');
	}
}

/*------------------------------------------------------------------------------*/
/* Google Map in Header area
/*------------------------------------------------------------------------------*/
function preyantechnosys_reset_gmap(){
	jQuery('.preyantechnosys-fbar-box-w > div > aside').each(function(){
		var mainthis = jQuery(this);
		jQuery( 'iframe[src^="https://www.google.com/maps/"], iframe[src^="http://www.google.com/maps/"]',mainthis ).each(function(){
			if( !jQuery(this).hasClass('preyantechnosys-set-gmap') ){
				jQuery(this).attr('src',jQuery(this).attr('src')+'');
				jQuery(this).load(function(){
					jQuery(this).addClass('preyantechnosys-set-gmap').animate({opacity: 1 }, 1000 );
				});	

			}
		})
	});
}

function preyantechnosys_hide_gmap(){
	jQuery('.preyantechnosys-fbar-box-w > div > aside').each(function(){
		var mainthis = jQuery(this);
		jQuery( 'iframe[src^="https://www.google.com/maps/"], iframe[src^="http://www.google.com/maps/"]',mainthis ).each(function(){
			if( !jQuery(this).hasClass('preyantechnosys-set-gmap') ){
				jQuery(this).css({opacity: 0});				
				jQuery(this).css('display', 'block');
			}
		})
	});
}	
	
function preyantechnosys_isotope() {
	jQuery('.preyantechnosys-sortable-yes').each(function(){	
		var gallery_item = jQuery('.preyantechnosys-boxes-row-wrapper', this );
		var filterLinks  = jQuery('.prt-sortable-wrapper a', this );			
		gallery_item.isotope({
			animationEngine : 'best-available'
		})
		filterLinks.on('click', function(e){
			var selector = jQuery(this).attr('data-filter');
			gallery_item.isotope({
				filter : selector,
				itemSelector : '.isotope-item'
			});

			filterLinks.removeClass('selected');
			jQuery('#filter-by li').removeClass('current-cat');
			jQuery(this).addClass('selected');
			e.preventDefault();
		});
		
	});
};	


/* ====================================== */
/* Animate on scroll : Number rotator
/* ====================================== */
var tm_number_rotate = function() {
	jQuery(".prt-number-rotate").each(function() {
		var self      = jQuery(this);
		var delay     = (self.data("appear-animation-delay") ? self.data("appear-animation-delay") : 0);
		var animation = self.data("appear-animation");

		if( jQuery(window).width() > 959 ) {
			self.html('0');
			self.waypoint(function(direction) {
				if( !self.hasClass('completed') ){
					var from     = self.data('from');
					var to       = self.data('to');
					var interval = self.data('interval');
					self.numinate({
						format: '%counter%',
						from: from,
						to: to,
						runningInterval: 2000,
						stepUnit: interval,
						onComplete: function(elem) {
							self.addClass('completed');
						}
					});
				}
			}, { offset:'85%' });
		} else {
			if( animation == 'animateWidth' ) {
				self.css('width', self.data("width"));
			}
		}
	});
};


/* ============================================== */
/* BG Image yes class in each Section and Column
/* ============================================== */
 var tm_bgimage_class = function() {
	jQuery('.elementor-section').each(function() {
		if( jQuery(this).css('background-image')!='' && jQuery(this).css('background-image')!='none' ){
			jQuery(this).addClass('prt-bgimage-yes' ).removeClass('prt-bgimage-no' );
		} else {
			jQuery(this).addClass('prt-bgimage-no' ).removeClass('prt-bgimage-yes' );
		}
	});
	jQuery('.elementor-column').each(function() {
		if( jQuery(this).children('.elementor-widget-wrap').children('.prt-stretched-div').length ){
			if( jQuery(this).children('.elementor-widget-wrap').children('.prt-stretched-div').css('background-image')!='' && jQuery(this).children('.elementor-widget-wrap').children('.prt-stretched-div').css('background-image')!='none' ){
				jQuery(this).addClass('prt-bgimage-yes' ).removeClass('prt-bgimage-no' );
			} else {
				jQuery(this).addClass('prt-bgimage-no' ).removeClass('prt-bgimage-yes' );
			}
		} else {
			if( jQuery(this).children('.elementor-widget-wrap').css('background-image')!='' && jQuery(this).children('.elementor-widget-wrap').css('background-image')!='none' ){
				jQuery(this).addClass('prt-bgimage-yes' ).removeClass('prt-bgimage-no' );
			} else {
				jQuery(this).addClass('prt-bgimage-no' ).removeClass('prt-bgimage-yes' );
			}
		}
	});
}; 

/* ============================================== */
/* BG Color yes class in each Section and Column
/* ============================================== */
var tm_bgcolor_class = function() {
	var section_idd ='';
	jQuery('.elementor-section').each(function() {
		if( jQuery(this).css('background-color')!='' && jQuery(this).css('background-color')!='transparent' ){
			jQuery(this).addClass('prt-bgcolor-yes');
		}

		if( jQuery(this).hasClass('prt-highlight-bg-yes')){
			section_idd = jQuery(this).attr("data-id");
			jQuery(this).append( '<div class="prt-section-hili-dot prt-hilidot-left prt-highlight-bg-'+section_idd+'" ></div>' );
			jQuery(this).append( '<div class="prt-section-hili-dot prt-hilidot-right prt-highlight-bg-'+section_idd+'" ></div>' );
		}
		
	});
	jQuery('.elementor-column').each(function() {
		if( jQuery(this).children('.prt-stretched-div').length ){
			if( jQuery(this).children('.prt-stretched-div').css('background-color')!='' && jQuery(this).children('.prt-stretched-div').css('background-color')!='transparent' ){
				jQuery(this).addClass('prt-bgcolor-yes' ).removeClass('prt-bgcolor-no' );
			} else {
				jQuery(this).addClass('prt-bgcolor-no' ).removeClass('prt-bgcolor-yes' );
			}
		} else {
			if( jQuery(this).children('.elementor-widget-wrap').css('background-color')!='' && jQuery(this).children('.elementor-widget-wrap').css('background-color')!='transparent' ){
				jQuery(this).addClass('prt-bgcolor-yes' ).removeClass('prt-bgcolor-no' );
			} else {
				jQuery(this).addClass('prt-bgcolor-no' ).removeClass('prt-bgcolor-yes' );
			}
		}
	});
};


var tm_tabbox_class = function() {
	var tabs = '';
	var tab_number = '';
	jQuery('.prt-elementor-tabs').each(function(){
		tabs = jQuery(this);
		jQuery('.prt-elementor-tab-title', tabs).on('click', function(){
			if( !jQuery( this ).hasClass('prt-tab-active') ){
				jQuery('.prt-elementor-tab-title', tabs).removeClass('prt-tab-active');
				jQuery( this ).addClass('prt-tab-active');

				tab_number = jQuery( this ).data('prt-tab');
				jQuery('.prt-tab-content', tabs).removeClass('prt-tab-active');
				jQuery('.prt-tab-content-'+tab_number, tabs).addClass('prt-tab-active');
			}
		});

		jQuery('.prt-tab-content-title', tabs).on('click', function(){
			tab_number = jQuery( this ).data('prt-tab');
			jQuery('li.prt-elementor-tab-title[data-prt-tab="'+tab_number+'"]').trigger('click');
		});
	});
};

/* ====================================== */
/* Reset and rearrange Stretched Column
/* ====================================== */
var tm_rearrange_stretched_col = function( model_id ) {
	if( jQuery('body').hasClass('elementor-editor-active') ){
		jQuery( '*[data-id="'+model_id+'"]' ).each(function(){
			jQuery('.prt-stretched-div', this).remove();
			jQuery('.elementor-widget-wrap', this).removeAttr('style');
			setTimeout(function(){ tm_stretched_col(); }, 50);
		});	
	}
}

/* ====================================== */
/* Stretched Column
/* ====================================== */
var tm_stretched_col = function() {

	jQuery('.elementor-section.elementor-top-section').each(function(){
		if( jQuery(this).hasClass('prt-col-stretched-left') || jQuery(this).hasClass('prt-col-stretched-right') || jQuery(this).hasClass('prt-col-stretched-both') ){
			jQuery(this).addClass('prt-col-stretched-yes').removeClass('prt-col-stretched-no');
		} else {
			jQuery(this).addClass('prt-col-stretched-no').removeClass('prt-col-stretched-yes');
		}
	});

	// remove all stretched related changes in each column
	jQuery('.elementor-section.elementor-top-section').each(function(){
		var ThisSection = jQuery(this);
		var ThisColumn	= '';
		jQuery( '.elementor-column:not(.elementor-inner-column)', ThisSection ).each(function(){
			ThisColumn	= jQuery(this);
			jQuery( '.prt-stretched-div', ThisColumn ).remove();
			ThisColumn.removeClass('prt-col-stretched-yes prt-col-stretched-left prt-col-stretched-right prt-col-stretched-content-yes');
		});
	});

	jQuery('.elementor-section.prt-col-stretched-yes.elementor-top-section').each(function(){

		var ThisSection		= jQuery(this);
		var ThisColumn		= '';
		var ColWrapper		= '';
		var StretchedEle	= '';

		if( ThisSection.hasClass('prt-col-stretched-left') || ThisSection.hasClass('prt-col-stretched-both') ){
			ThisColumn = jQuery( '.elementor-column:not(.elementor-inner-column):first-child', ThisSection );
			
			if( jQuery('.prt-stretched-div', ThisColumn).length==0 ){
				ColWrapper = ThisColumn.children('.elementor-widget-wrap');
				ColWrapper.prepend( '<div class="prt-stretched-div"></div>' );

				// Stretched Element
				StretchedEle = ColWrapper.children('.prt-stretched-div');

				StretchedEle.addClass( 'prt-stretched-left' );
				ThisColumn.addClass('prt-col-stretched-yes prt-col-stretched-left');

				if( ThisSection.hasClass('prt-left-col-stretched-content-yes') ){
					ThisColumn.addClass('prt-col-stretched-content-yes');
				} else {
					ThisColumn.removeClass('prt-col-stretched-content-yes');
				}

				// background move to stretched div
				ColWrapper.css('background-image', '');
				var bgImage =  ColWrapper.css('background-image');
				if( bgImage!='none' && bgImage!='' ){
					StretchedEle.css('background-image', bgImage );
					ColWrapper.css('background-image', 'none');
				}

				// border radious
				ColWrapper.css('border-top-left-radius', '');
				ColWrapper.css('border-top-right-radius', '');
				ColWrapper.css('border-bottom-left-radius', '');
				ColWrapper.css('border-bottom-right-radius', '');
				var radius_t_left  =  ColWrapper.css('border-top-left-radius');
				var radius_t_right =  ColWrapper.css('border-top-right-radius');
				var radius_b_left  =  ColWrapper.css('border-bottom-left-radius');
				var radius_b_right =  ColWrapper.css('border-bottom-right-radius');
				if( radius_t_left!='0' && radius_t_left!='' ){
					StretchedEle.css('border-top-left-radius', radius_t_left );
					ColWrapper.css('border-top-left-radius', '0');
				}
				if( radius_t_right!='0' && radius_t_right!='' ){
					StretchedEle.css('border-top-right-radius', radius_t_right );
					ColWrapper.css('border-top-right-radius', '0');
				}
				if( radius_b_left!='0' && radius_b_left!='' ){
					StretchedEle.css('border-bottom-left-radius', radius_b_left );
					ColWrapper.css('border-bottom-left-radius', '0');
				}
				if( radius_b_right!='0' && radius_b_right!='' ){
					StretchedEle.css('border-bottom-right-radius', radius_b_right );
					ColWrapper.css('border-bottom-right-radius', '0');
				}



				// Background Color
				var bgColor = ColWrapper.css('background-color');
				if( bgColor!='' ){
					StretchedEle.css('background-color', bgColor );
					ColWrapper.css('background-color', 'transparent');
				}

				// Background Position
				var bgPosition = ColWrapper.css('background-position');
				if( bgPosition!='' ){
					StretchedEle.css('background-position', bgPosition );
				}

				// Background Repeat
				var bgRepeat = ColWrapper.css('background-repeat');
				if( bgRepeat!='' ){
					StretchedEle.css('background-repeat', bgRepeat );
				}

				// Background Size
				var bgSize = ColWrapper.css('background-size');
				if( bgSize!='' ){
					StretchedEle.css('background-size', bgSize );
				}

				tm_stretched_col_calc();

			}

		}

		if( ThisSection.hasClass('prt-col-stretched-right') || ThisSection.hasClass('prt-col-stretched-both') ){
			ThisColumn = jQuery( '.elementor-column:not(.elementor-inner-column):last-child', ThisSection );
	
			if( jQuery('.prt-stretched-div', ThisColumn).length==0 ){
				ColWrapper = ThisColumn.children('.elementor-widget-wrap');
				ColWrapper.prepend( '<div class="prt-stretched-div"></div>' );
	
				// Stretched Element
				StretchedEle = ColWrapper.children('.prt-stretched-div');

				StretchedEle.addClass( 'prt-stretched-right' );
				ThisColumn.addClass('prt-col-stretched-yes prt-col-stretched-right');

				if( ThisSection.hasClass('prt-right-col-stretched-content-yes') ){
					ThisColumn.addClass('prt-col-stretched-content-yes');
				} else {
					ThisColumn.removeClass('prt-col-stretched-content-yes');
				}

				// background move to stretched div
				ColWrapper.css('background-image', '');
				var bgImage = ColWrapper.css('background-image');
				if( bgImage!='none' && bgImage!='' ){
					StretchedEle.css('background-image', bgImage );
					ColWrapper.css('background-image', 'none');
				}

				// border radious
				ColWrapper.css('border-top-left-radius', '');
				ColWrapper.css('border-top-right-radius', '');
				ColWrapper.css('border-bottom-left-radius', '');
				ColWrapper.css('border-bottom-right-radius', '');
				var radius_t_left  =  ColWrapper.css('border-top-left-radius');
				var radius_t_right =  ColWrapper.css('border-top-right-radius');
				var radius_b_left  =  ColWrapper.css('border-bottom-left-radius');
				var radius_b_right =  ColWrapper.css('border-bottom-right-radius');
				if( radius_t_left!='0' && radius_t_left!='' ){
					StretchedEle.css('border-top-left-radius', radius_t_left );
					ColWrapper.css('border-top-left-radius', '0');
				}
				if( radius_t_right!='0' && radius_t_right!='' ){
					StretchedEle.css('border-top-right-radius', radius_t_right );
					ColWrapper.css('border-top-right-radius', '0');
				}
				if( radius_b_left!='0' && radius_b_left!='' ){
					StretchedEle.css('border-bottom-left-radius', radius_b_left );
					ColWrapper.css('border-bottom-left-radius', '0');
				}
				if( radius_b_right!='0' && radius_b_right!='' ){
					StretchedEle.css('border-bottom-right-radius', radius_b_right );
					ColWrapper.css('border-bottom-right-radius', '0');
				}

				// Background Color
				var bgColor = ColWrapper.css('background-color');
				if( bgColor!='' ){
					StretchedEle.css('background-color', bgColor );
					ColWrapper.css('background-color', 'transparent');
				}

				// Background Position
				var bgPosition = ColWrapper.css('background-position');
				if( bgPosition!='' ){
					StretchedEle.css('background-position', bgPosition );
				}

				// Background Repeat
				var bgRepeat = ColWrapper.css('background-repeat');
				if( bgRepeat!='' ){
					StretchedEle.css('background-repeat', bgRepeat );
				}

				// Background Size
				var bgSize = ColWrapper.css('background-size');
				if( bgSize!='' ){
					StretchedEle.css('background-size', bgSize );
				}

				tm_stretched_col_calc();

			}
		}

	});

};

var tm_stretched_col_calc = function() {

	// padding left or right
	if( jQuery('.elementor-section.elementor-top-section > .elementor-container > .elementor-column.prt-col-stretched-yes').length>0 ){

		// Returns width of browser viewport
		var window_width = jQuery( window ).width();

		// Returns width of HTML document
		var document_width = jQuery( document ).width();

		jQuery('.elementor-section.elementor-top-section > .elementor-container > .elementor-column.prt-col-stretched-yes').each(function(){
	
			var this_ele    = jQuery(this);
			var curr_width  = jQuery(this).closest('.elementor-container').width();
			var extra_width = ((window_width - curr_width)/2);
			var parent_width = '';

			var position = 'left';
			if( jQuery(this).hasClass('prt-col-stretched-right') ){
				position = 'right';
			}

			// set width to 100% if parent is 100%
			parent_width = jQuery('.elementor-widget-wrap', jQuery(this)).parent().width();
			if( parent_width == '100%' ){
				jQuery('.elementor-widget-wrap', jQuery(this)).css('width','100%');
			} else {
				jQuery('.elementor-widget-wrap', jQuery(this)).css('width','');
			}

			jQuery('.prt-stretched-div', jQuery(this)).css( 'margin-'+position,'-'+extra_width+'px' );

			// stretched column content too
			if( jQuery(this).hasClass('prt-col-stretched-content-yes') ){
				var stretched_width = jQuery('.prt-stretched-div', jQuery(this) ).width();
				jQuery(this).children('.elementor-widget-wrap').css( 'margin-'+position,'-'+extra_width+'px' );
				jQuery(this).children('.elementor-widget-wrap').css( 'width', stretched_width+'px' );
			} else {
				jQuery(this).children('.elementor-widget-wrap').css( 'margin-'+position,'' );
				jQuery(this).children('.elementor-widget-wrap').css( 'width', '' );
			}
		});
	}

}

jQuery(window).resize(function() {
		
	/*------------------------------------------------------------------------------*/
	/*  Timeline view
	/*------------------------------------------------------------------------------*/	
	
	setTimeout(function() {
		tm_stretched_col_calc();
	}, 100);
	
	/*------------------------------------------------------------------------------*/
	/* onResize: Set height of boxes inside row-column view of Blog and Portfolio
	/*------------------------------------------------------------------------------*/
	if( jQuery('.preyantechnosys-testimonial-box' ).length > 0 ){
		setHeight('.preyantechnosys-testimonial-box.col-lg-4.col-sm-6.col-md-4');
		setHeight('.preyantechnosys-testimonial-box.col-lg-6.col-sm-6.col-md-6');
		setHeight('.preyantechnosys-testimonial-box.col-lg-3.col-sm-6.col-md-3');
	}
	
	/*------------------------------------------------------------------------------*/
	/* Call header sticky function
	/*------------------------------------------------------------------------------*/
	preyantechnosys_sticky();
	
		
	
});  // END of window.resize


jQuery( document ).ready(function($) {
	
	"use strict";
	tm_stretched_col();
	tm_stretched_col_calc();
	tm_bgimage_class();
	tm_bgcolor_class();
	tm_number_rotate();
	tm_tabbox_class();
	/*------------------------------------------------------------------------------*/
	/* Floating Bar code
	/*------------------------------------------------------------------------------*/

	preyantechnosys_hide_gmap();
	
		
// Top btn click event
	jQuery(".preyantechnosys-fbar-btn > a.preyantechnosys-fbar-btn-link").on('click', function(){		
		if( jQuery(this).closest('.preyantechnosys-fbar-main-w').hasClass('preyantechnosys-fbar-position-default') ){
			// Fbar top position
			if( jQuery('.preyantechnosys-fbar-box-w').css('display')=='none' ){
				jQuery('.prt-fbar-open-icon', this).fadeOut();
				jQuery('.prt-fbar-close-icon', this).fadeIn();
				
				jQuery('.preyantechnosys-fbar-box-w').slideDown();
			} else {
				jQuery('.prt-fbar-open-icon', this).fadeIn();
				jQuery('.prt-fbar-close-icon', this).fadeOut();
				
				jQuery('.preyantechnosys-fbar-box-w').slideUp();
			}
		} else {
			// Fbar right position
		}		
		
		return false;
	});	
		
	// Right btn click event
	jQuery('.prt-fbar-close, .preyantechnosys-fbar-btn > a.preyantechnosys-fbar-btn-link, .prt-float-overlay').on('click', function(){
		jQuery('.preyantechnosys-fbar-box-w').toggleClass('animated');
		jQuery('.prt-float-overlay').toggleClass('animated');
		jQuery('.preyantechnosys-fbar-btn').toggleClass('animated');		
	});
	
	/*------------------------------------------------------------------------------*/
	/* Masonry View settings
	/*------------------------------------------------------------------------------*/
	preyantechnosys_blogmasonry();
		
	
	jQuery('.prt-mmmenu-override-yes #site-navigation .mega-menu-wrap > ul > li.menu-item-language ul').addClass("mega-sub-menu");		
	jQuery('.prt-mmmenu-override-yes #navbar #site-navigation .mega-menu-wrap .mega-menu.mega-menu-horizontal > li.menu-item-language > a').show();
	jQuery('.prt-mmmenu-override-yes #site-navigation .mega-menu-wrap > ul > li.menu-item-language').hover(
         function () {			 		 
		   jQuery('.prt-mmmenu-override-yes #navbar #site-navigation .mega-menu-wrap .mega-menu.mega-menu-horizontal .mega-menu-flyout .mega-sub-menu').css("display", "none");	
           jQuery(this).find('ul').show();		   
         }, 
         function () {
           jQuery(this).find('ul').hide();
         }
     );
	
	
	jQuery('.menu li.current-menu-item').parents('li.mega-menu-megamenu').addClass('mega-current-menu-ancestor');	
	if (!jQuery('body').hasClass("prt-header-invert")) {	
		
		jQuery( ".prt-headerstyle-classic-highlight div.nav-menu ul:not(.children,.sub-menu)>li:eq(-4)" ).addClass( "lastfourth" );
		jQuery( ".prt-headerstyle-classic-highlight div.nav-menu ul:not(.children,.sub-menu)>li:eq(-3)" ).addClass( "lastthird" );
		
		jQuery( ".nav-menu ul:not(.children,.sub-menu) > li:eq(-2), #site-header-menu #site-navigation div.mega-menu-wrap ul.mega-menu.mega-menu-horizontal > li:eq(-2)" ).addClass( "lastsecond" );
		jQuery( ".nav-menu ul:not(.children,.sub-menu) > li:eq(-1), #site-header-menu #site-navigation div.mega-menu-wrap ul.mega-menu.mega-menu-horizontal > li:eq(-1)" ).addClass( "last" );	
	}	
		
	jQuery( ".widget_nav_menu li a" ).each(function() {
			if(!jQuery(this).attr('href')) {
				jQuery(this).closest("li").addClass("empty_link");
			}
		});
	
	/*------------------------------------------------------------------------------*/
	/* adding prettyPhoto in Gallery
	/*------------------------------------------------------------------------------*/
	jQuery("a[data-gal^='prettyPhoto']").prettyPhoto({hook: 'data-gal'});
		
	/*------------------------------------------------------------------------------*/
	/* Revolution Slider - Removing extra margin for no slider message
	/*------------------------------------------------------------------------------*/
	jQuery( ".preyantechnosys-slider-wrapper > div > div > div:contains('Revolution Slider Error')" ).css( "margin-top", "0" );
		
	
	/*------------------------------------------------------------------------------*/
	/* Select2 library for all SELECT element
	/*------------------------------------------------------------------------------*/
	jQuery('select').select2();
		
			 	
	 /*------------------------------------------------------------------------------*/
	 /* Applying prettyPhoto to all images
	 /*------------------------------------------------------------------------------*/
	if( typeof jQuery.fn.prettyPhoto == "function" ){
				
		// Gallery
		jQuery('div.gallery a[href*=".jpg"], div.gallery a[href*=".jpeg"], div.gallery a[href*=".png"], div.gallery a[href*=".gif"]').each(function(){
			if( jQuery(this).attr('target')!='_blank' ){
				jQuery(this).attr('rel','prettyPhoto[wp-gallery]');
			}
		});
		
		// WordPress Gallery
		jQuery('.gallery-item a[href*=".jpg"], .gallery-item a[href*=".jpeg"], .gallery-item a[href*=".png"], .gallery-item a[href*=".gif"]').each(function(){
			if( jQuery(this).attr('target')!='_blank' ){
				jQuery(this).attr('rel','prettyPhoto[coregallery]');
			}
		});
		
		// Normal link
		jQuery('a[href*=".jpg"], a[href*=".jpeg"], a[href*=".png"], a[href*=".gif"]').each(function(){
			if( jQuery(this).attr('target')!='_blank' && !jQuery(this).hasClass('prettyphoto') ){
				var attr = $(this).attr('rel');
				if (typeof attr !== typeof undefined && attr !== false && attr!='prettyPhoto' ) {
					jQuery(this).attr('data-rel','prettyPhoto');
				}
			}
		});		

		jQuery('a[data-rel^="prettyPhoto"]').prettyPhoto();
		jQuery('a.prt_prettyphoto').prettyPhoto();
		jQuery('a[rel^="prettyPhoto"]').prettyPhoto();

		
		/*------------------------------------------------------------------------------*/
		/* Settting for lightbox content in Portfolio slider
		/*------------------------------------------------------------------------------*/
		jQuery("a.preyantechnosys-open-gallery").on('click', function(){
			var id   = jQuery(this).data('id');
			var currid = window[ 'api_images_' + id ];
			jQuery.prettyPhoto.open( window[ 'api_images_' + id ] , window[ 'api_titles_' + id ] , window[ 'api_desc_' + id ] );
		});
		
	}

	/*------------------------------------------------------------------------------*/
	/* Set height of boxes inside row-column view of Blog and Portfolio
	/*------------------------------------------------------------------------------*/
	if( jQuery('.preyantechnosys-testimonial-box' ).length > 0 ){
		setHeight('.preyantechnosys-testimonial-box.col-lg-6.col-sm-6.col-md-6');
		setHeight('.preyantechnosys-testimonial-box.col-lg-4.col-sm-6.col-md-4');
		setHeight('.preyantechnosys-testimonial-box.col-lg-3.col-sm-6.col-md-3');
	}
	
	/*------------------------------------------------------------------------------*/
	/* Sticky
	/*------------------------------------------------------------------------------*/
	if( jQuery('.prt-stickable-header').length > 0 ){		

		preyantechnosys_sticky();
	}	

	/*------------------------------------------------------------------------------*/
	/* Return Fasle when # Url
	/*------------------------------------------------------------------------------*/
	$('#site-navigation a[href="#"]').on('click', function(){return false;});
	
	
	/*------------------------------------------------------------------------------*/
	/* Welcome bar close button
	/*------------------------------------------------------------------------------*/
	$(".preyantechnosys-close-icon").on('click', function(){
		$("#page").css('padding-top', (parseInt($("#page").css('padding-top')) - parseInt($(".preyantechnosys-wbar").height()) ) + 'px' );
		$(".preyantechnosys-wbar").slideUp();
		preyantechnosys_setCookie('kw_hidewbar','1',1);
	});

	/*------------------------------------------------------------------------------*/
	/* Removing BR tag added by shortcode generator
	/*------------------------------------------------------------------------------*/
	var galleryHTML = jQuery(".gallery-size-full br").each(function(){
		jQuery(this).remove();
	});	

	/*------------------------------------------------------------------------------*/
	/* Settting for lightbox content in Blog
	/*------------------------------------------------------------------------------*/
	jQuery("a.preyantechnosys-open-gallery").on('click', function(){
		var href   = jQuery(this).attr('href');
		var id     = href.replace("#preyantechnosys-embed-code-", "");
		var currid = window[ 'api_images_' + id ];
		jQuery.prettyPhoto.open( window[ 'api_images_' + id ] , window[ 'api_titles_' + id ] , window[ 'api_desc_' + id ] );
	});
			
	/*-----------------------------------------------------------------------------------*/
	/*	Isotope
	/*-----------------------------------------------------------------------------------*/
	if( jQuery().isotope ){
		jQuery(window).load(function () {
			"use strict";
			preyantechnosys_isotope();		
		});
		jQuery(window).resize(function(){
			preyantechnosys_isotope();
		});
	}
	
	
	
	/*------------------------------------------------------------------------------*/
	/* Sticky Footer
	/*------------------------------------------------------------------------------*/
	jQuery('footer#colophon').resize(function(){
		preyantechnosys_stickyFooter();
	});
	preyantechnosys_stickyFooter();	
	preyantechnosys_hide_togle_link();
	
	jQuery( "#prt-header-slider > div > div:contains('Revolution Slider Error')" ).css( "margin", "auto" );
	
	
	
	/*------------------------------------------------------------------------------*/
	/* One Page setting
	/*------------------------------------------------------------------------------*/	
	if( jQuery('body').hasClass('preyantechnosys-one-page-site') ){
		var sections = jQuery('.elementor-section, #prt-header-slider'),
		nav          = jQuery('.mega-menu-wrap, div.nav-menu'),
		nav_height   = jQuery('#site-navigation').data('sticky-height')-1;
		
		jQuery(window).on('scroll', function () {
			
			// active first menu
			if( jQuery('body').scrollTop() < 5 ){
				nav.find('a').parent().removeClass('mega-current-menu-item mega-current_page_item current-menu-ancestor current-menu-item current_page_item');						
				nav.find('a[href="#prt-home"]').parent().addClass('mega-current-menu-item mega-current_page_item current-menu-ancestor current-menu-item current_page_item');
			}			
				
				var cur_pos = jQuery(this).scrollTop(); 
				sections.each(function() {
					
					var top = jQuery(this).offset().top - (nav_height+2),
					bottom = top + jQuery(this).outerHeight(); 
		
					if (cur_pos >= top && cur_pos <= bottom) {

						if( typeof jQuery(this) != 'undefined' && typeof jQuery(this).attr('id')!='undefined' && jQuery(this).attr('id')!='' ){
							
							var mainThis = jQuery(this);							
							nav.find('a').removeClass('mega-current-menu-item mega-current_page_item current-menu-ancestor current-menu-item current_page_item');						
							jQuery(this).addClass('mega-current-menu-item mega-current_page_item current-menu-ancestor current-menu-item current_page_item');
							var arr = mainThis.attr('id');							
							
							// Applying active class
							nav.find('a').parent().removeClass('mega-current-menu-item mega-current_page_item current-menu-ancestor current-menu-item current_page_item');
							nav.find('a').each(function(){
								var menuAttr = jQuery(this).attr('href').split('#')[1];						
								if( menuAttr == arr ){
									jQuery(this).parent().addClass('mega-current-menu-item mega-current_page_item current-menu-ancestor current-menu-item current_page_item');
								}
							})
						
						}
					}
				});
			//}
		});
		
		nav.find('a').on('click', function () {
			var $el = jQuery(this), 
			id = $el.attr('href');
			var arr=id.split('#')[1];	  
			jQuery('html, body').animate({
				scrollTop: jQuery('#'+ arr).offset().top - nav_height
			}, 500);  
			return false;
		});
		
	}
	
} ); // END of  document.ready



jQuery(window).load(function(){

	"use strict";
	
	/*------------------------------------------------------------------------------*/
	/* Masonry View settings
	/*------------------------------------------------------------------------------*/
	preyantechnosys_blogmasonry();
	
	/*------------------------------------------------------------------------------*/
	/* Hide pre-loader
	/*------------------------------------------------------------------------------*/
	function preyantechnosys_preloader_fade_out(){ jQuery( '.prt-page-loader-wrapper' ).fadeOut( 1000 ); }
	if ( jQuery( '.prt-page-loader-wrapper' ).length > 0 ) {
		setTimeout(preyantechnosys_preloader_fade_out, 100);
	}
				
	/*------------------------------------------------------------------------------*/
	/* Hide page-loader on load.
	/*------------------------------------------------------------------------------*/
	jQuery('#pageoverlay').fadeOut(500);
	
	/*------------------------------------------------------------------------------*/
	/* IsoTope
	/*------------------------------------------------------------------------------*/
	var $container = jQuery('.portfolio-wrapper');
	$container.isotope({
		filter: '*',
		animationOptions: {
			duration: 750,
			easing: 'linear',
			queue: false,
		}
	});
	jQuery('nav.portfolio-sortable-list ul li a').on('click', function(){
		var selector = jQuery(this).attr('data-filter');
		$container.isotope({
			filter: selector,
			animationOptions: {
				duration: 750,
				easing: 'linear',
				queue: false,
			}
		});
		// Selected class
		jQuery('nav.portfolio-sortable-list').find('a.selected').removeClass('selected');
		jQuery(this).addClass('selected'); 
		return false;
	});
	
	/*------------------------------------------------------------------------------*/
	/* Nivo Slider
	/*------------------------------------------------------------------------------*/
	if( jQuery('.preyantechnosys-slider-wrapper .nivoSlider').length>0 ){
		jQuery('.preyantechnosys-slider-wrapper .nivoSlider').nivoSlider();
	}
	
	
	
	/*------------------------------------------------------------------------------*/
	/* Responsive Menu : Open by clicking on the menu text too
	/*------------------------------------------------------------------------------*/
	jQuery('.righticon').each(function() {
		var mainele = this;
		if( jQuery( mainele ).prev().prev().length > 0 ){
			if( jQuery( mainele ).prev().prev().attr('href')=='#' ){
				jQuery( mainele ).prev().prev().on('click', function(){
					jQuery( mainele ).trigger( "click" );
				});
			}
		}
	});
	
	
	/*------------------------------------------------------------------------------*/
	/* Blog masonry view for 2, 3 and 4 columns
	/*------------------------------------------------------------------------------*/
	preyantechnosys_blogmasonry();	

		jQuery(".preyantechnosys-fbar-content-wrapper").perfectScrollbar({
			suppressScrollX:true,
			includePadding:true
		});
		
		jQuery(".prt-header-style-classic-vertical .prt-header-block").perfectScrollbar({
			suppressScrollX:true,
			includePadding:true
		});
	

}); // END of window.load


 jQuery(document).ready(function() {

		setTimeout(function(){
			preyantechnosys_carousel();
			preyantechnosys_coverimgbox();
		}, 100);

		 jQuery('.prt_listimgbox_wrapper .prt_listimgbox_wrap').hover(function(){
		 	jQuery('.prt_listimgbox_wrapper .prt_listimgbox_wrap').removeClass("active");
			jQuery(this).addClass("active");
		 });
 });

jQuery(document).ready(function() {
   
		setTimeout(function(){
			preyantechnosys_carousel();
			preyantechnosys_sliderimgbox();
		}, 100);
	
});


jQuery(document).ready(function() {
	
	var i_type = 'iframe';
	jQuery('a.tm_playvideo, .tm_playvideo a').each(function(){
		if( jQuery(this).hasClass('tm_playvideo') || jQuery(this).closest('.vc_icon_element').hasClass('tm_playvideo') ){
			i_type = 'iframe';
		} 
		jQuery(this).magnificPopup({type:i_type});
	});
		
  var $window = jQuery(window);  
  var $sidebar = jQuery(".prt-pf-view-left-image .preyantechnosys-pf-single-detail-box"); 
  var $sidebarHeight = $sidebar.innerHeight();   
  var $footerOffsetTop = jQuery(".prt-pf-view-left-image .prt-pf-single-content-area"); 
  var $sidebarOffset = $sidebar.offset();
  
  $window.scroll(function() {
    if($window.scrollTop() > $sidebarOffset) {
      $sidebar.addClass("fixed");   
    } else {
      $sidebar.removeClass("fixed");   
    }    
    if($window.scrollTop() + $sidebarHeight > $footerOffsetTop) {
      $sidebar.css({"top" : ($window.scrollTop() + $sidebarHeight - $footerOffsetTop +30)});        
    } else  {
      $sidebar.css({"top": "0",});  
    } 
     
  });   

   });  


if(jQuery('.curved-circle').length) {
    jQuery('.curved-circle').circleType({position: 'absolute', dir: 1, radius: 62, forceHeight: true, forceWidth: true});
}

jQuery(window).load(function(){

	var $li = jQuery('.footer_customheading span');
    $li.hide().first().show().addClass('active');

    function footerloop() {
        jQuery('.footer_customheading .active').each(function(index){
            var $this = jQuery(this);
            var $next = $this.next().length > 0 ? $this.next() : $li.first();

            $this.hide().removeClass('active');
            $next.show().addClass('active');

            if( $next.index() == 0) {
                //clearInterval(myTimer);
                setTimeout(function(){
                    //myTimer=setInterval(function(){loop()},1000);
                }, 3000);
            }
        });
    }

    setInterval(function(){footerloop()},2000);//timer running every 2 seconds

});

function typetext() {
var type_list = document.querySelector( '#typed_lists' );

  if( type_list ) {
    var typed = new Typed('#typed', {
      stringsElement: '#typed_lists',
      typeSpeed: 50,
      backSpeed: 50,
      cursorChar: '_',
      loop: true
    });
  }
 }
 
 gsap.registerPlugin(ScrollTrigger, SplitText);
gsap.config({
    nullTargetWarn: false,
    trialWarn: false
});

 jQuery(window).load(function(){
 	typetext();
	  tm_reveal_img_animation(); 
	  gsap.delayedCall(1, () =>
        ScrollTrigger.getAll().forEach((t) => {
            t.refresh();
        })
    );
 });

function tm_reveal_img_animation() {
    const boxes = gsap.utils.toArray('.tm-reveal-effects-yes');
    boxes.forEach(img => {
        gsap.to(img, {
            scrollTrigger: {
                trigger: img,
                start: "top 70%",
                end: "bottom bottom",
                toggleClass: "active",
                once: true,
            }
        });
    });
}