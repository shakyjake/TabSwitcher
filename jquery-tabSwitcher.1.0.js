/*
	Function for showing a div with id of href target
	Copyright © 07/01/14 Jake Nicholson (www.eskdale.net)
	Licensed under The :) License
	http://licence.visualidiot.com/
*/
(function(){
	$.fn.tabTHIS = function(u){
		var t,o,a,d,s;
		d = {
			selectedClass: 'selected',/* class for active tab/div */
			tabClass: 'tabs',/* class for tab anchors' parent */
			switchClass: 'toSwitch',/* class for target divs' parent */
			ignoreClass: 'clear',/* class of element to ignore */
			downTime: 200,/* slideDown animation duration */
			upTime: 200/* slideUp animation duration */
		};
		o = $.extend(d,u);
		t = $(this);
		a = t.find('.'+o.tabClass + ' a').not('.'+o.ignoreClass);
		s = t.find('.'+o.switchClass).children().not('.'+o.ignoreClass);
		
		function doSwitch(x){
			
			a.removeClass(o.selectedClass);
			$(x).addClass(o.selectedClass);
			
			s.removeClass(o.selectedClass);
			s.slideUp(o.upTime);
				
			var h;
			h = $(x).attr('href');/* href="#target" */
			
			$(h).addClass('selected').slideDown(o.downTime, function(){
				var h,i;
				h = this;
				i = $(h).height();
				t.find('.'+o.switchClass).animate({height : i}, o.downTime);
			});/* id="target" */
			
		}
		
		function setDimensions(){
			
			s.show();
			
			var m,e,w;
			
			e = s.parent();
			
			w = $(window).width();
			
			s.css({'max-width':w+'px'});
			e.css({'max-width':w+'px'});
			t.css({'max-width':w+'px'});
			
			e.css({'height':t.find('.'+o.switchClass + ' .'+o.selectedClass).height()+'px'});
			
			s.not('.selected').hide();
			
		}
		
		function init(){
			a.first().addClass(o.selectedClass);
			s.first().addClass(o.selectedClass);
			setDimensions();
			
			a.on('click tap', function(event){/* add listener for click and tap events */
			
				event.stopImmediatePropagation();/* stops click/tap firing twice in succession (Android) */
				event.preventDefault();
				
				doSwitch(this);
			});
		}
		
		if(a.length > 0){
			init();
		}
		
		var f;
		$(window).resize(function(){/* prolly a biiiig performance hit doing stuff everytime this fires so just do stuff after 100ms have passed (post-resize) */
			clearTimeout(f);
			f = setTimeout(setDimensions, 100);
		});
		$(window).on('orientationchange', $(window).resize());
		
	};
})(jQuery);