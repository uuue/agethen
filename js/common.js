(function(w, d, $){
	var app = app || {};

	app.elements = {
			body: 'body',
			icon_wrapper: '.info-icon-wrapper',
			close: '.close',
			btn_show_map: '.b_map',
			btn_close_map: '#closeMap',
			map: '#map',
			i_map: '#iMap',
			
			menu: '#cbp-spmenu-s2',
			showMenu: '#showRight, #showRight2, #showRight3',
			closeMenu: '#closeRight'
	};

	app.$ = {};

	for(var k in app.elements){
		app.$[k] = $(app.elements[k]);
	};

	// This function is encharge to collapse text based on the resolution
	// of the screen and the max_length of chars allow
	// if max_length is not passed then the text is expanded
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
						if(max_length){
							replace_short_text();
						}else{
						  $elem.addClass('expanded');
							$text_cont.text(original_text);
						}

						// Add the event to do the toggle class
						$elem.unbind('click');
						$elem.on('click', function(e){
							if(!max_length) return false;
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
		app.$.i_map.css({visibility: v, opacity: op, 'z-index': op});
		app.$.body.css("overflow", ov).toggleClass('showMap',visible);

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


	app.cleanUpProfileTab = function(){
			var body = $('body')
			body.find('.contact-bar').hide();
			body.css("overflow","visible");
			var body_contact_bar = body.find('> .contact-bar');
			if(body_contact_bar.length > 0) body_contact_bar.remove();
	};

	app.bindProfileTab = function(){
		var _onClose = function(e){
				e.preventDefault();
				$(this).parents(".contact-bar").hide();
				app.cleanUpProfileTab();
				return false;
		};

		$( app.elements.icon_wrapper ).click(function() {
			var contact_id = "#" + $(this).attr("id").substring(5),
					contact_bar = $(contact_id);


			if(app.schema === 2 || app.schema === 3){
				var elem = contact_bar.clone();
						elem.prepend(elem.find('.leistungen'));

				contact_bar = app.$.body.prepend(elem).find('> .contact-bar');
				contact_bar.find(app.elements.close).click(_onClose);
				app.$.body.css({overflow: 'hidden'})
				contact_bar.css({bottom: 0}).show();
			}else{
				$(this).closest('.bottom-bar').find('.contact-bar').toggle();
			}

		});

		app.$.close.click(_onClose);
	};

	app.bindMenu = function(){
		app.$.showMenu.on('click', function(e){
			$(this).addClass('active');
			app.$.addClass('cbp-spmenu-open');
		});

		app.$.closeMenu.on('click', function(e){
			app.$.showMenu.removeClass('active');
			app.$.removeClass('cbp-spmenu-open');
		});
	};

	app.bindElOnStarts = function(){
			if(typeof app.schema === 'undefined') return false;

			app.bindMap();
			app.bindProfileTab();
			app.bindMenu();

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
				// @todo mauro: MoveTo not found in ie9
				$.fn.moveTo(parseInt($(this).attr('data-index')) + 1);
				$('#mainmenu > li').removeClass('active');
				$( "#mainmenu > li[data-index='"+$(this).attr('data-index')+"']" ).addClass('active');
			});

			$(".b_impressum").on('click', function(){
				$("#impressum").css("visibility","visible");
				$("body").css("overflow","hidden").addClass('showImpressum');
			});

			$("#closeImpressum").on('click', function(){
				$("#impressum").css("visibility","hidden");
				$("body").css("overflow","auto").removeClass('showImpressum');
			});

	};

	app.pageToggler = function(){
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

	};

	app.onResizeWindow = function(){

		var bw = app.$.body.width(),//Body Width
		 		isChange = false;

		if(typeof app.isFirstTime === 'undefined') app.isFirstTime = false;
		;
		if(!app.schema) app.schema = 1;
		switch(true){

			case bw >= 1024:
				if(app.schema === 0) return false;
				app.schema = 0;
				app.toggleText();
			break;

			case bw >= 768 && bw < 1024:
				if(app.schema === 1) return false;
				app.schema = 1;
				app.toggleText();
			break;

			case bw >= 481 && bw < 768:
				if(app.schema === 2) return false;
				app.schema = 2;
				app.toggleText(160);
				app.pageToggler();
			break;

			case bw < 481:
				if(app.schema === 3) return false;
				app.schema = 3;
				app.toggleText(80);
			break;

		};

		if(!app.isFirstTime) {
			app.isFirstTime = true;
			return true;
		}
		app.cleanUpProfileTab();
	};

	app.init = function(){
			app.onResizeWindow();
			app.bindElOnStarts();
	};

	$(d).ready(app.init);
	$(w).resize(app.onResizeWindow);

})(window, document, jQuery);
