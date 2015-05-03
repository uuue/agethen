
//Interventi responsive javascript

var cambioSchema = false;
var schemaPrecedente = -1;
var schemaCorrente = 1;


// For now is only case 3
var readMore = function( max_length ){

	// For each openText in the page.
	$('.opentext').each(function(index, elem){
		var $elem = $(elem),
				$text_cont = $elem.find('.text-cont'),
				$button_show = $elem.find('a.read-more'),
				original_text = $elem.data('original_text') || false,
				replace_short_text = function(){
					$text_cont.text(original_text.substr(0, max_length));
				};

				if( !original_text ){
					original_text = $text_cont.text();
					$elem.data('original_text', original_text );
				}

				// Everytime I click on read-more which is a nested element of $elem
				// I want switch a class 'expanded' that then show the rest of the chars

				// Add class spoiler to show and hide the button
				$elem.addClass('spoiler').removeClass('expanded');
				if(max_length) replace_short_text();

				// Add the event to do the toggle class
				$elem.unbind('click');
				$elem.on('click', function(e){
					e.preventDefault();
					$elem.toggleClass('expanded');
					if($elem.hasClass('expanded')){
						$text_cont.text(original_text);
					}else{
						replace_short_text();
					}
					return false;
				});

	});

	$( ".close" ).click(function() {
		$(this).parents(".contact-bar").hide();
		$("body").css("overflow","auto");
	});

};

function responsiveInit(){
	// modifiche dipendenti dalla risoluzione

	cambioSchema = false;

	var finestra_l = 0;

	finestra_l = $('body').width();

	// default
	var schema = 1;

	if(finestra_l >= 1024)
		{
		schema = 0;
		}
	else if(finestra_l >= 768 && finestra_l < 1024)
		{
		schema = 1;
		}
	else if(finestra_l >= 481 && finestra_l < 768 )
		{
		schema = 2;
		}
	else if(finestra_l <= 480)
		{
		schema = 3;
		}

	schemaCorrente = schema;

	if(schema != schemaPrecedente){
		cambioSchema = true;
		schemaPrecedente = schema;
	}

	switch(schema)
		{

		/* Gestione schermi con risoluzione superiore o uguale a 1024px */
		case 0:

			if(cambioSchema)
				{
					console.log ("risoluzione >= 1024px;");

					$( ".info-icon-wrapper" ).click(function() {
						var contact_id = "#" + $(this).attr("id").substring(5);
						$(contact_id).toggle();
					});
					$( ".close" ).click(function() {
						var contact_id = "#" + $(".info-icon-wrapper").attr("id").substring(5);
						var contact_bar = $(contact_id);
						$(this).parents(".contact-bar").hide();
					});

				}

		break;

		/* Gestione schermi PC/tablet con risoluzione superiore o uguale a 768px e inferiori a 1024px; */
		case 1:

			if(cambioSchema)
				{
					console.log ("risoluzione < 1024px e >= 768px;");

					$( ".info-icon-wrapper" ).click(function() {
						var contact_id = "#" + $(this).attr("id").substring(5);
						$(contact_id).toggle();
					});
					$( ".close" ).click(function() {
						var contact_id = "#" + $(".info-icon-wrapper").attr("id").substring(5);
						var contact_bar = $(contact_id);
						$(this).parents(".contact-bar").hide();
					});

				}

		break;

		/* Gestione schermi smartphone/tablet con risoluzione superiore o uguale 481px e inferiori a 768px; */
		case 2:

			if(cambioSchema)
				{
					console.log ("risoluzione < 768px e >= 481px;");

					if( $('#page2').find('#contact_2').length == 0 ){
						$('#page2').find('.bottom-bar').append($('#contact_2'));
					}
					if( $('#page3').find('#contact_3').length == 0 ){
						$('#page3').find('.bottom-bar').append($('#contact_3'));
					}
					if( $('#page4').find('#contact_4').length == 0 ){
						$('#page4').find('.bottom-bar').append($('#contact_4'));
					}
					if( $('#page5').find('#contact_5').length == 0 ){
						$('#page5').find('.bottom-bar').append($('#contact_5'));
					}

					readMore(160);

					// CASE 2
					$( ".info-icon-wrapper" ).click(function() {
						var contact_id = "#" + $(this).attr("id").substring(5);
						$(contact_id).toggle();
						$("body").css("overflow","hidden")
					});

					$( ".info-icon-wrapper" ).click(function() {

						var contact_id = "#" + $(this).attr("id").substring(5);

						var contact_bar = $(contact_id);
						var leistungen = $(this).parents(".section").find('.leistungen');
						var kontakte = $(this).parents(".section").find('.kontakte');

						//$(this).parents("section").before(contact_bar);
						$('body').prepend(contact_bar);

						contact_bar.css("bottom","0");
						kontakte.before(leistungen);
						contact_bar.show();

					});


				}

		break;

		/* Gestione schermi smartphone con risoluzione uguale o inferiore a 480px; */
		case 3:

			if(cambioSchema){
				readMore( 80 );

					// CASE 3
					$( ".info-icon-wrapper" ).click(function() {

						var contact_id = "#" + $(this).attr("id").substring(5);

						var contact_bar = $(contact_id);
						var leistungen = $(this).parents(".section").find('.leistungen');
						var kontakte = $(this).parents(".section").find('.kontakte');

						//$(this).parents("section").before(contact_bar);
						$('body').prepend(contact_bar);

						contact_bar.css("bottom","0");
						kontakte.before(leistungen);
						contact_bar.show();
						$("body").css("overflow","hidden");

					});
			}

		break;

		}

}

//resize iniziale
$(window).on('load', function(){
	responsiveInit();
});

//esecuzioni a dom pronto
$( document ).ready(function() {

	var slide_counter = 0;


	// esecuzione sul resize
	$( window ).resize(function() {
		responsiveInit();
	});

	// Collego il pulsante Home alla prima <section>
	$('#home-4-icon').on('click', function(){
		$.fn.moveTo(1);
	});

	// al click dei due menu principali simulo il comportamento del one page scroll
	$('#mainmenu_home > ul > li').on('click', function(){
		$.fn.moveTo(parseInt($(this).attr('data-index')) + 1);
		$('#mainmenu > li').removeClass('active');
		$( "#mainmenu > li[data-index='"+$(this).attr('data-index')+"']" ).addClass('active');
	});

	$('#mainmenu > li').on('click', function(){
		$.fn.moveTo(parseInt($(this).attr('data-index')) + 1);
		$('#mainmenu > li').removeClass('active');
		$(this).addClass('active');
	});

	// Gestione del menu laterale
	$('#cbp-spmenu-s2 > a').on('click', function(){
		$.fn.moveTo(parseInt($(this).attr('data-index')) + 1);
		$('#mainmenu > li').removeClass('active');
		$( "#mainmenu > li[data-index='"+$(this).attr('data-index')+"']" ).addClass('active');
	});

	var menuRight = document.getElementById( 'cbp-spmenu-s2' );

	showRight.onclick = function() {
		classie.toggle( this, 'active' );
		classie.toggle( menuRight, 'cbp-spmenu-open' );
		//disableOther( 'showRight' );
		$("body").css("overflow","hidden");
	};
	showRight2.onclick = function() {
		classie.toggle( this, 'active' );
		classie.toggle( menuRight, 'cbp-spmenu-open' );
		//disableOther( 'showRight2' );
		$("body").css("overflow","hidden");
	};
	showRight3.onclick = function() {
		classie.toggle( this, 'active' );
		classie.toggle( menuRight, 'cbp-spmenu-open' );
		//disableOther( 'showRight2' );
		$("body").css("overflow","hidden");
    };
	closeRight.onclick = function() {
		classie.toggle( this, 'active' );
		classie.toggle( menuRight, 'cbp-spmenu-open' );
		//disableOther( 'closeRight' );
		$("body").css("overflow","auto");
	};

	// Map, Impressum

//		var windowwidth			= $(window).width();
//		var windowheight		= $(window).height();
//		var w_map				= $('#map').outerWidth();
//		var w_closeMap			= $('#closeMap').outerWidth();
//		var w_impressum			= $('#impressum').outerWidth();
//		var w_closeImpressum	= $('#closeImpressum').outerWidth();
//
//		$("#map").css("left",-w_map+"px");
//		$("#map").outerWidth(windowwidth);
//		$("#iMap").css("left",-w_map+"px");
//		$("#iMap").outerWidth(windowwidth);
//		$("#iMap").outerHeight(windowheight);
//		$("#closeMap").css("left",-w_closeImpressum-30+"px");
//		$("#impressum").css("left",-w_impressum+"px");
//		$("#closeImpressum").css("left",-w_closeImpressum-30+"px");
//
//		$(window).resize(function() {
//			$("#map").css("left",-w_map+"px");
//			$("#map").width(windowwidth);
//			$("#iMap").css("left",-w_map+"px");
//			$("#iMap").width(windowwidth);
//			$("#iMap").outerHeight(windowheight);
//			$("#closeMap").css("left",-w_closeImpressum-30+"px");
//			$("#impressum").css("left",-w_impressum+"px");
//			$("#closeImpressum").css("left",-w_closeImpressum-30+"px");
//			if(windowwidth <= 480) {
//				$("#impressum").outerWidth(windowwidth);
//			} else {
//				$("#impressum").outerWidth(480);
//			}
//		});
//
//		$(".b_map").on('click', function(){
//			$("#map").css("left","0");
//			$("#closeMap").css("left",w_map-w_closeMap-30+"px");
//			$("body").css("overflow","hidden");
//			console.log ("w_map: "+w_map+"px");
//		});
//
//		$("#closeMap").on('click', function(){
//			$("#map").css("left",-w_map+"px");
//			$(this).css("left",-60+"px");
//			$("body").css("overflow","auto");
//		});
//
//		$(".b_impressum").on('click', function(){
//			$("#impressum").css("left","0");
//			$("#closeImpressum").css("left",w_impressum-w_closeImpressum-30+"px");
//			$("body").css("overflow","hidden");
//			console.log ("w_impressum: "+w_impressum+"px");
//		});
//
//		$("#closeImpressum").on('click', function(){
//			$("#impressum").css("left",-w_impressum+"px");
//			$(this).css("left",-60+"px");
//			$("body").css("overflow","auto");
//		});


	// Map, Impressum (lite)

		$(".b_map").on('click', function(){
			$("#map").css("visibility","visible");
			$("#iMap").css("visibility","visible");
			$("body").css("overflow","hidden");
		});

		$("#closeMap").on('click', function(){
			$("#map").css("visibility","hidden");
			$("#iMap").css("visibility","hidden");
			$("body").css("overflow","auto");
		});

		$(".b_impressum").on('click', function(){
			$("#impressum").css("visibility","visible");
			$("body").css("overflow","hidden");
		});

		$("#closeImpressum").on('click', function(){
			$("#impressum").css("visibility","hidden");
			$("body").css("overflow","auto");
		});

});
