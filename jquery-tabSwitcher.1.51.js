/*
	Copyright 2017-01-20 Jake Nicholson (https://jakenicholson.co.uk/)
	
	This is free and unencumbered software released into the public domain.

	Anyone is free to copy, modify, publish, use, compile, sell, or
	distribute this software, either in source code form or as a compiled
	binary, for any purpose, commercial or non-commercial, and by any
	means.
	
	In jurisdictions that recognize copyright laws, the author or authors
	of this software dedicate any and all copyright interest in the
	software to the public domain. We make this dedication for the benefit
	of the public at large and to the detriment of our heirs and
	successors. We intend this dedication to be an overt act of
	relinquishment in perpetuity of all present and future rights to this
	software under copyright law.
	
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
	IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
	OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
	ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
	OTHER DEALINGS IN THE SOFTWARE.
	
	For more information, please refer to <http://unlicense.org/>
*/
(function(){
	$.fn.tabTHIS = function(u){
		var t,o,a,d,s;
		d = {
			selectedClass: 'selected',/* class for active tab/div */
			tabClass: 'tabs',/* class for tab anchors' parent */
			switchClass: 'toSwitch',/* class for target divs' parent */
			ignoreClass: 'clear',/* class of element to ignore */
			downTime: 300,/* slideDown animation duration */
			upTime: 300/* slideUp animation duration */
		};
		o = $.extend(d,u);
		t = $(this);
		a = t.find('.' + o.tabClass + ' a').not('.' + o.ignoreClass);
		s = t.find('.' + o.switchClass).children().not('.' + o.ignoreClass);
		
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
			
			s.css({'max-width': w + 'px'});
			e.css({'max-width': w + 'px'});
			t.css({'max-width': w + 'px'});
			
			e.css({'height':t.find('.' + o.switchClass + ' .' + o.selectedClass).height() + 'px'});
			
			s.not('.selected').hide();
			
		}
		
		function init(){
			setDimensions();
			
			var bFirst;
			bFirst = true;
			
			s.each(function(){
				
				if($(this).text() === '' || $(this).children().text() === ''){
					var sRemove;
					sRemove = $(this).attr('id');
					$(a).filter(function(){
						return $(this).attr('href') === '#' + sRemove;
					}).hide();
				} else if(bFirst) {
					
					var sId;
					sId = $(this).attr('id');
					
					$(this).addClass(o.selectedClass);
					
					$(a).filter(function(){
						return $(this).attr('href') === '#' + sId;
					}).addClass(o.selectedClass);
					
					bFirst = false;
				}
			});
			
			a.on('click tap', function(event){/* add listener for click and tap events */
			
				event.stopImmediatePropagation();/* stops click/tap firing twice in succession (Android) */
				event.preventDefault();
				
				if(!$(this).hasClass(o.selectedClass)){
					doSwitch(this);
				}
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
