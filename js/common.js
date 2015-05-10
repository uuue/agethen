//esecuzioni a dom pronto
$( document ).ready(function() {

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

});


(function(w, d, $){
	var app = app || {};

	app.elements = {
			body: 'body',
			icon_wrapper: '.info-icon-wrapper',
			close: '.close',
			btn_show_map: '.b_map',
			btn_close_map: '#closeMap',
			map: '#map',
			i_map: '#iMap'
	};

	app.$ = {};

	for(var k in app.elements){
		app.$[k] = $(app.elements[k]);
	};

	app.toggleText = function( max_length ){
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
	};

	// Hide and show map function
	app.showMap = function(e, visible){
		e.preventDefault();

		visible = visible || false;

		var op = 0, // opacity
				v = 'hidden', // visible
				ov = 'auto'; // overflow

		if(visible){
			op = 1;
			v = 'visible';
			ov = 'hidden';
		}
		app.$.map.css({visibility: v, opacity: op});
		app.$.i_map.css({visibility: v, opacity: op});
		app.$.body.css("overflow", ov);

		return false;
	};

	app.bindMap = function(){
		/* Questo é map related */
		app.$.btn_show_map.on('click', function(e){
			app.showMap(e, true);
		});

		app.$.btn_close_map.on('click', function(e){
			app.showMap(e, false);
		});
	};

	app.bindElOnStarts = function(){
			if(typeof app.schema === 'undefined') return false;

			app.bindMap();

			$('input, textarea').jvFloat();

			$('#fullpage').fullpage({
				sectionsColor: [],
				anchors: ['home', 'page1', 'page2', 'page3', 'page4', 'page5', 'a-feedback'],
				menu: '#mainmenu',
				loopTop: true,
				loopBottom: true,
				responsive: 767,
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

			$(".b_impressum").on('click', function(){
				$("#impressum").css("visibility","visible");
				$("body").css("overflow","hidden");
			});

			$("#closeImpressum").on('click', function(){
				$("#impressum").css("visibility","hidden");
				$("body").css("overflow","auto");
			});

			// CASE 0 and 1
			$( app.elements.icon_wrapper ).click(function() {
				var contact_id = "#" + $(this).attr("id").substring(5);
				$(contact_id).toggle();

				console.log(contact_id);

				if(app.schema === 2){
					$("body").css("overflow","hidden");
					var contact_id = "#" + $(this).attr("id").substring(5);

					var contact_bar = $(contact_id);
					var leistungen = $(this).parents(".section").find('.leistungen');
					var kontakte = $(this).parents(".section").find('.kontakte');

					//$(this).parents("section").before(contact_bar);
					$('body').prepend(contact_bar);

					contact_bar.css("bottom","0");
					kontakte.before(leistungen);
					contact_bar.show();
				}

				if(app.schema === 3){
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
				}

			});

			$( app.elements.close ).click(function() {
				$(this).parents(".contact-bar").hide();
				$("body").css("overflow","visible");
			});

	};

	app.onResizeWindow = function(){

		var bw = $('body').width(); //Body Width

		if(!app.schema) app.schema = 1;
		switch(true){

			case bw >= 1024:
				if(app.schema === 0) return false;
				app.schema = 0;
			break;

			case bw >= 768 && bw < 1024:
				if(app.schema === 1) return false;
				app.schema = 1;
			break;

			case bw >= 481 && bw < 768:
				if(app.schema === 2) return false;
				app.schema = 2;
				app.toggleText(160);

				// Ci sono cose che non ti domandi perché
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


			break;

			case bw >= 480:
				if(app.schema === 3) return false;
				app.schema = 3;
				app.toggleText(80);
			break;

		};
	};

	app.init = function(){
			app.onResizeWindow();
			app.bindElOnStarts();
	};

	$(d).ready(app.init);
	$(w).resize(app.onResizeWindow);

})(window, document, jQuery);
