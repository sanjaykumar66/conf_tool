$(document).ready(function() {
		$drawerRight = $('.cart-drawer-right');
		$cart_list = $('.cart-btn, .close-btn');
		
		$cart_list.click(function() {
			$(this).toggleClass('active');
			$('.cart-drawer-push').toggleClass('cart-drawer-pushtoleft');
			$drawerRight.toggleClass('cart-drawer-open');
		}); 
var element = $('.floating-chat');
var messages = element.find('.messages');
var textInput = element.find('.text-box');
element.find('>i').hide();
element.addClass('expand');
element.find('.chat').addClass('enter');
var strLength = textInput.val().length * 2;
// textInput.keydown(onMetaAndEnter).prop("disabled", false).focus();
// element.off('click', openElement);
// element.find('.header button').click(closeElement);
// element.find('#sendMessage').click(sendNewMessage);
messages.scrollTop(messages.prop("scrollHeight"));




	});