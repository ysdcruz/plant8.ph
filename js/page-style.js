let data;
let delData = [];
let selReg = "";
let selProv = "";
let selCity = "";

$(document).on('click', 'input, select, textarea', function() {
	$(this).removeClass('error-input');
});

$(document).on('focus', 'input, select, textarea', function() {
	$(this).removeClass('error-input');
});

$(document).on('keypress', '#signup-contact, #info-contact, .deli-contact', function(event) {
	if($(this).val().length < 10)
		$(this).addClass('error-input');
	else
		$(this).removeClass('error-input');

	if(!(event.key >= 0 && event.key <= 9))
		event.preventDefault();
});

$(document).on('keypress', '#signup-zip, #info-zip, .deli-zip', function(event) {
	if($(this).val().length < 3)
		$(this).addClass('error-input');
	else
		$(this).removeClass('error-input');
		
	if(!(event.key >= 0 && event.key <= 9))
		event.preventDefault();
});

$(document).on('keyup', '#signup-email, #info-email', function() {
	if(!checkEmail($(this).val()))
		$(this).addClass('error-input');
	else
		$(this).removeClass('error-input');
});

$(document).on('click', '.show-pass', function() {
	if(!$(this).prev().attr('disabled')) {
		$(this).toggleClass('fa-eye fa-eye-slash');
		if($(this).prev().attr('type') == 'password')
			$(this).prev().attr('type', 'text');
		else
			$(this).prev().attr('type', 'password');
	}
});

$(document).on('click', '#profile', function() {
	data = $('#edit-info').serializeArray();
});

$(document).on('change', '#new-dp', function() {
	let file = document.getElementById('new-dp');
	let url = file.value;
	let ext = url.substring(url.lastIndexOf('.') + 1).toLowerCase();
	if(file.files && file.files[0] && (ext == 'gif' || ext == 'png' || ext == 'jpeg' || ext == 'jpg')) {
		let reader = new FileReader();

		reader.onload = function(event) {
			$('#dp-current').attr('src', event.target.result);
		}
		reader.readAsDataURL(file.files[0]);
	}
});

$(document).on('click', '#cancel-dp', function() {
	let execute = confirm('Are you sure? Data will not be saved.');

	if(execute) {
		$('#dp-current').attr('src', $(this).attr('data-Cust_Img'));
		$('#dp-init').css('display', 'block');
		$('#dp-options').css('display', 'none');
	}
});

$(document).on('click', '#save-dp', function() {
	let file = $('#new-dp')[0].files;

	if(file.length > 0) {
		alert('Display picture changed.');
		location.reload();
	} else
		alert("Please select a file.");
});

$(document).on('click', '#info-save', function() {
	let isComplete = true;

	$('#edit-info input').each(function() {
		if($(this).val() === "") {
			isComplete = false;
			$(this).addClass('error-input');
		}
		if($(this).hasClass('error-input'))
			isComplete = false;
	});

	if($('#info-contact').val().length != 11) {
		isComplete = false;
		$('#info-contact').addClass('error-input');
	}

	if($('#city option:selected').val() == '') {
		isComplete = false;
		$('#city').addClass('error-input');
	}

	if($('#info-home').val() == '') {
		isComplete = false;
		$('#info-home').addClass('error-input');
	}

	if($('#info-zip').val().length != 4) {
		isComplete = false;
		$('#info-zip').addClass('error-input');
	}

	if(isComplete) {
		let execute = true;

		if(JSON.stringify(data) === JSON.stringify(checkForm))
			execute = false;

		alert('Profile updated.');

		if(execute)
			location.reload();
		else
			disableEditInfo();
	} else
		alert('Please complete all fields.');
});

$(document).on('click', '#change-update', function() {
	let isComplete = true;

	$('#change-pass input').each(function() {
		if($(this).val() === '')
			isComplete = false;
		
		if($(this).hasClass('error-input'))
			isComplete = false;
	});

	if($('#change-curpassword').val() === $('#change-password').val()) {
		alert('New password cannot be the same as previous.');
		$('#change-password').val('');
		$('#change-password').trigger('change');
		return;
	}

	if(isComplete) {
		alert('Password changed.');
		location.reload();
	} else
		alert('Please complete all fields.');
});

$(document).on('click', '.deli-checkmark', function() {
	let checkCtr = 0;
	$('.deli-checkbox').each(function() {
		if($(this).prop('checked'))
			checkCtr++;
	});

	let rem = $('.deli-checkbox').length - checkCtr;

	if((rem > 1) || (rem == 1 && $(this).prev().prop('checked')))
		$(this).prev().click();
});

$(document).on('click', '.deli-action', function() {
	let isComplete = true;

	if($(this).html() == 'Save' || $(this).html() == 'Update') {
		let type = $(this).html() == 'Save' ? 1 : 2;
		let form = $(this).parent().siblings('form');

		$(form).find('input').each(function() {
			if($(this).val() === '') {
				$(this).addClass('error-input');
				isComplete = false;
			}
		});

		if($(form).find('.deli-contact').val().length != 11) {
			isComplete = false;
			$(form).find('.deli-contact').addClass('error-input');
		}

		if($(form).find('select').val() === null || $(form).find('select').val() === '') {
			$(form).find('select').addClass('error-input');
			isComplete = false;
		}

		if($(form).find('textarea').val() === '') {
			$(form).find('textarea').addClass('error-input');
			isComplete = false;
		}

		if($(form).find('.deli-zip').val().length != 4) {
			isComplete = false;
			$(form).find('.deli-zip').addClass('error-input');
		}

		if(isComplete) {
			alert('Delivery address ' + (type == 1 ? 'added' : 'updated') + '!');
			location.reload();
		} else
			alert('Please complete all fields.');
	} else {
		if($('.deli-checkbox:checked').length) {
			alert('Delivery address deleted.');
			location.reload();
		} else
			alert('Please check at least one (1) address.');
	}
});

$(document).on('click', '#log-out', function() {
	alert('You have been logged out successfully.');
	location.reload();
});

$(document).on('click', '#message-btn', function() {
	let isComplete = true;

	$('#message-form input').each(function() {
		if($(this).val() === '') {
			isComplete = false;
			return false;
		}
	});

	if($('#message-main').val() === '')
		isComplete = false;

	if(isComplete) {
		$('#message-notif').fadeIn('fast').delay(1000).fadeOut('fast');
		document.getElementById('message-form').reset();
	} else
		alert('Please complete all fields.');
});

// add event listener to nav-icon when clicked to open sidebar
$(document).on('click', '#nav-icon', function() {
	hideMenu(true);
	$('#center-item').toggleClass('animate-side');
});

// add event listener to search-icon when clicked to open sidebar
$(document).on('click', '#search-icon', function() {
	if(window.innerWidth < 901) {
		$('#search-sidebar').toggleClass('animate-side');
		hideMenu(true);
	}
});

// add event listener to modal when clicked to open modal
$(document).on('click', '.modal', function() {
	$(document.body).removeClass('unscroll');
});

// add event listener to modal when clicked to close modal
$(document).on('hidden.bs.modal', '.modal', function() {
	$(document.body).removeClass('unscroll');
});

// add event listener to user-icon when clicked to open sidebar
$(document).on('click', '#user-icon', function() {
	if(window.innerWidth < 901) {
		hideMenu(true);
		$('#right-sidebar').toggleClass('animate-side');
	} else {
		if($('#user-settings').hasClass('active'))
			$('#user-settings').removeClass('active');
		else
			$('#user-settings').addClass('active');
	}
});

// add event listener to filter when clicked to open sidebar
$(document).on('click', '#filter', function() {
	if(window.innerWidth < 901) {
		$('#category-sidebar').toggleClass('animate-side');
		hideMenu(false);
	}
});

// add event listener to bg when clicked to hide self and sidebar
$(document).on('click', '.bg', function() {
	$('#center-item').removeClass('animate-side');
	$('#search-sidebar').removeClass('animate-side');
	$('#right-sidebar').removeClass('animate-side');

	$(this).removeClass('active');

	if($('#category-sidebar').length) {
		$('#category-sidebar').removeClass('animate-side');
		setTimeout(function() {
			closePop(false, null);
		}, 200);
	} else
		closePop(true, null);
});

// add event listener to left-close when clicked to hide center-item
$(document).on('click', '#left-close, #search-close, #right-close, #category-close', function() {
	let isHeader = $(this).attr('id') != $('#category-close').attr('id');
	closePop(isHeader, $(this).parent()[0]);
});

$(document).on('click', '#scroll-top', function() {
	$('html, body').animate({
		scrollTop: 0
	}, 280);
});

$(document).on('click', '#search-button, #product-search-button', function() {
	let execute = true;
	let productName;
	if($('#search-bar').length) {
		execute = $('#search-bar').val() != '';
		if(execute) {
			productName = $('#search-bar').val().replace(/ /g, '+');
			searchLocation = 'shop.html#all?prod=' + productName;
		}
	}
	if($('#product-search').length) {
		execute = $('#product-search').val() != '';
		if(execute) {
			productName = $('#product-search').val().replace(/ /g, '+');
			searchLocation = window.location.toString() + '?prod=' + productName;
			searchProduct($('#product-search').val());
		}
	}

	if(execute) {
		window.location = searchLocation;
	}
});

$(document).on('click', '.category-tab', function(event) {
	event.preventDefault();
	$('#product-search').val('');
	setCurrentCategory(this);
});

$(document).on('mouseenter', '.product', function() {
	if($('#selected-custom').length)
		hideCustomSelect();
});

$(document).on('click', '#popular', function() {
	let products = $('.product-link');
	products.sort(function(a, b) {
		if($(a).attr('data-Prod_Popularity') > $(b).attr('data-Prod_Popularity'))
			return -1;
		else if($(a).attr('data-Prod_Popularity') < $(b).attr('data-Prod_Popularity'))
			return 1;
		else
			return $(a).attr('data-Prod_ID') - $(b).attr('data-Prod_ID')
	});
	$('#product-grid').html(products);
	removeCustomSelect();
});

$(document).on('click', '#latest', function() {
	let products = $('.product-link');
	products.sort(function(a, b) {
		return $(b).attr('data-Prod_ID') - $(a).attr('data-Prod_ID');
	});
	$('#product-grid').html(products);
	removeCustomSelect();
});

$(document).on('click', '#selected-custom, #price-arrow', function() {
	if($('#options-custom').css('visibility') == 'hidden') {
		$('#options-custom').css({
			'visibility': 'visible',
			'opacity': '1'
		});
		$('#price-arrow').css('transform', 'rotate(90deg)');
	} else
		hideCustomSelect();
});

$(document).on('click', '.option-custom', function() {
	$('#price').prop('checked', true);
	$('#selected-custom').html($(this).html());
	$('.option-custom').removeClass('selected-option');
	$(this).addClass('selected-option');
	$('#price-arrow').css('color', 'white');

	let products = $('.product-link');

	if($(this).attr('data-value') == 'up')
		products.sort(function(a, b) {
			return $(a).attr('data-Prod_Price') - $(b).attr('data-Prod_Price')
		});
	else
		products.sort(function(a, b) {
			return $(b).attr('data-Prod_Price') - $(a).attr('data-Prod_Price')
		});

	$('#product-grid').html(products);

	hideCustomSelect();
});

$(document).on('click', '#cart-icon', function() {
	$(document.body).addClass('unscroll');
	$('#cart-empty').css('display', 'none');
	$('#cart-items').css('display', 'block');
	$('#cart-modal').css('display', 'flex');
});

$(document).on('click', '#notif-close, #cart-notif', function() {
	$('#cart-notif').hide();
	$(document.body).removeClass('unscroll');
});

$(document).on('click', '#login-redirect', function() {
	window.location = 'login.html';
});

$(document).on('click', '#shop-redirect', function() {
	window.location = 'shop.html';
});

$(document).on('click', '#select-all', function() {
	if($(this).prop('checked'))
		$('.ord-checkbox').each(function() {
			$(this).prop('checked', true);
		});
	else
		$('.ord-checkbox').each(function() {
			$(this).prop('checked', false);
		});
	enableCartBtn();
});

$(document).on('click', '.cart-checkmark', function() {
	$(this).prev().click();
	if(!$(this).prev().prop('checked'))
		$('#select-all').prop('checked', false);
	enableCartBtn();
});

$(document).on('click', '.modal-open', function() {
	$(document.body).addClass('unscroll');
});

$(document).on('click', '.qty-minus', function() {
	if($(this).hasClass('disabled'))
		return;
	else {
		let remQty;
		setCartCount(1, 2);
		if(parseInt($(this).siblings('.qty-value').html()) - 1 == 0) {
			let conf = confirm('Remove this product from your cart?');

			if(conf) {
				delData = [];
				$(this).parent().parent().parent().parent().parent().remove();
				delData.push($(this).attr('data-Cart_ID'));
				deleteCart($(this).attr('data-Cust_ID'));
				$('#cart-empty').css('display', $('#ord-all .modal-field').length == 0 ? 'block' : 'none');
				$('#cart-items').css('display', $('#ord-all .modal-field').length > 0 ? 'block' : 'none');
				if($('#ord-all .modal-field').length > 0)
					setTotal();
				remQty = 0;
			}
		} else {
			$(this).siblings('.qty-value').html(parseInt($(this).siblings('.qty-value').html()) - 1);
			remQty = $(this).siblings('.qty-value').html();
			$(this).siblings('.qty-add').removeClass('disabled');
			let newTotal = $(this).attr('data-Prod_Price') * parseInt($(this).siblings('.qty-value').html());
			$(this).parent().parent().parent().find('.ord-sub-price').html('&#8369; ' + addComma(newTotal.toFixed(2).toString()));
			setTotal();
		}

		if($('#prod-ID').length > 0) {
			if($(this).attr('data-Prod_ID') == $('#prod-ID').val())
				$('#cart-qty').val(remQty).trigger('change');
		}
	}
});

$(document).on('click', '.qty-add', function() {
	if($(this).hasClass('disabled'))
		return;
	else {
		setCartCount(1, 1);
		if(parseInt($(this).siblings('.qty-value').html()) + 1 == $(this).attr('data-maxQty'))
			$(this).addClass('disabled');

		$(this).siblings('.qty-value').html(parseInt($(this).siblings('.qty-value').html()) + 1);
		$(this).siblings('.qty-minus').removeClass('disabled');
		let newTotal = $(this).attr('data-Prod_Price') * parseInt($(this).siblings('.qty-value').html());
		$(this).parent().parent().parent().find('.ord-sub-price').html('&#8369; ' + addComma(newTotal.toFixed(2).toString()));
		setTotal();

		if($('#prod-ID').length > 0) {
			if($(this).attr('data-Prod_ID') == $('#prod-ID').val())
				$('#cart-qty').val($(this).siblings('.qty-value').html()).trigger('change');
		}
	}
});

$(document).on('click', '#delete-cart', function() {
	delData = [];
	let fieldIndex = [];
	$('.ord-checkbox:checked:not(#select-all)').each(function() {
		fieldIndex.push($(this).parent().parent().index());
		delData.push($(this).attr('data-Cart_ID'));
	});

	let conf = confirm('Remove ' + (delData.length > 1 ? 'products' : 'product') + ' from your cart?');
	if(conf) {
		deleteCart($(this).attr('data-Cust_ID'));
		for(let i = fieldIndex.length - 1; i >= 0; i--) {
			let index = fieldIndex[i] + 1;
			setCartCount(parseInt($('#ord-all .modal-field:nth-child(' + index + ') .qty-value').html()), 2);
			$('#ord-all .modal-field:nth-child(' + index + ')').remove();
		}

		$('#cart-empty').css('display', $('#ord-all .modal-field').length == 0 ? 'block' : 'none');
		$('#cart-items').css('display', $('#ord-all .modal-field').length > 0 ? 'block' : 'none');
		if($('#ord-all .modal-field').length > 0)
			setTotal();
	}
});

$(document).on('click', '.checkout-back', function() {
	let conf = confirm('Are you sure you want to leave checkout?');

	if(conf)
		window.location = 'shop.html';
});

$(document).on('click', '#checkout-cart', function() {
	if(!$(this).hasClass('btn-disabled')) {
		let checkoutData = [];
		$('.ord-checkbox:checked:not(#select-all)').each(function() {
			checkoutData.push($(this).attr('data-Cart_ID'));
		});
		let checkoutSerial = checkoutData.join(';');
		window.location = 'checkout.html?cart=' + checkoutSerial;
	}
});

$(document).on('click', '#checkout-now', function() {
	window.location = 'checkout.html?cart=' + $(this).attr('data-Cart_ID');
});

$(document).on('click', '.history-link', function() {
	let scrollSet;

	if($(this).attr('id') == 'rating-link')
		scrollSet = $('#rating-container').offset().top - 100;
	else
		scrollSet = $('#review-container').offset().top - 100;

	$([document.documentElement, document.body]).animate({
		scrollTop: scrollSet
	}, 500);
});

$(document).on('click', '#add-order', function() {
	if(!$('input[name = "deli-choose"]:checked').length) {
		alert('Please select where you want the items to be delivered.')
		$('html, body').animate({
			scrollTop: 0
		}, 300);
		return;
	}

	if(!$('input[name = "payOp"]:checked').length) {
		alert('Please choose one payment option.')
		$('html, body').animate({
			scrollTop: $('#payment-op').offset().top - 85
		}, 300);
		return;
	}

	alert('Thank you for your order.');
	window.location = 'shop.html';
});

$(document).on('click', '.review-btn', function() {
	$(document.body).addClass('unscroll');
	$('#review-product').html($(this).attr('data-Prod_Name'));
	$('#review-submit').attr('data-Order_ID', $(this).attr('data-Order_ID'));
	$('#review-submit').attr('data-Prod_ID', $(this).attr('data-Prod_ID'));
});

$(document).on('click', '#review-submit', function() {
	isComplete = true;
	let rating = 0;
	$($('.star-select').get().reverse()).each(function() {
		if($(this).hasClass('fa-star')) {
			rating = $(this).index() + 1;
			return false;
		}
		if($(this).index() == 0)
			isComplete = false;
	});


	if($('#review-text').val() === '')
		isComplete = false;
	
	if(isComplete) {
		alert('Review successfully posted!');
		location.reload();
	} else
		alert('Please complete all fields.');
});

function checkEmail(strEmail) {
	let emailRegex = /^(([^.@()[\]\\;:"\s<>]+(\.[^.@()[\]\\;:"\s<>]+)*)|(".+"))@(([A-Za-z\-0-9]+\.)+[A-Za-z]{2,})$/;
	return strEmail.match(emailRegex) != null;
}

function disableEditInfo() {
	$('#edit-active').css('display', 'block');
	$('#info-cancel').parent().css('display', 'none');

	$('#info-username').val($('#info-username').attr('data-Cust_User'));
	$('#info-fname').val($('#info-fname').attr('data-Cust_Fname'));
	$('#info-lname').val($('#info-lname').attr('data-Cust_Lname'));
	$('#info-contact').val($('#info-contact').attr('data-Contact_Num'));
	$('#info-email').val($('#info-email').attr('data-Cust_Email'));
	$('#info-home').val($('#info-home').attr('data-Home_Add'));
	$('#info-zip').val($('#info-zip').attr('data-Home_ZIP'));

	$('#edit-info input').each(function() {
		$(this).prev().removeClass('req');
		$(this).attr('readonly', '');
	});

	$('.info-container').css('display', 'none');

	$('#city').html('');
	let op = new Option($('#city').attr('data-Home_City'), $('#city').attr('data-Home_City'), false, true);
	$('#city').append(op);

	$('#city').attr('readonly', '');
	$('#city').css('background-color', '#EEE');
}

function disableEditAdd(element) {
	let form;
	if($(element).parent().hasClass('account-btn')) {
		$(element).parent().css('display', 'none');
		$(element).parent().siblings('.deli-edit').css('display', 'block');
		form = $(element).parent().siblings('form');
	}

	$(form).find('.deli-username').val($(form).find('.deli-username').attr('data-Cust_User'));
	$(form).find('.deli-fname').val($(form).find('.deli-fname').attr('data-Deli_FName'));
	$(form).find('.deli-lname').val($(form).find('.deli-lname').attr('data-Deli_LName'));
	$(form).find('.deli-contact').val($(form).find('.deli-contact').attr('data-Deli_Contact'));
	$(form).find('.deli-home').val($(form).find('.deli-home').attr('data-Deli_Add'));
	$(form).find('.deli-zip').val($(form).find('.deli-zip').attr('data-Deli_ZIP'));

	$(form).find('input').each(function() {
		$(this).prev().removeClass('req');
		$(this).attr('readonly', '');
	});
	$(form).find('.select-read-only').css('background-color', '#EEE');
	$(form).find('textarea').attr('readonly', '');

	let NCR = listCity;
	$(form).find('.city').html('');
	let op = new Option($(form).find('.city').attr('data-Deli_City'), $(form).find('.city').attr('data-Deli_City'), false, true);
	$(form).find('.city').append(op);

	$(form).find('.city').attr('readonly', '');
	$(form).find('.city').css('background-color', '#EEE');
}

function enableCartBtn() {
	let checkCount = $('.ord-checkbox:checked').length;
	if(checkCount > 0) {
		$('#delete-cart').removeClass('btn-disabled');
		$('#checkout-cart').removeClass('btn-disabled');
	} else {
		$('#delete-cart').addClass('btn-disabled');
		$('#checkout-cart').addClass('btn-disabled');
	}
}

function addComma(value) {
	let whole;
	let newNum;
	if(value.indexOf(".") > -1) {
		let parts = value.split(".");
		whole = parseInt(parts[0]);
		newNum = new Number(whole).toLocaleString("en-US") + "." + parts[1];
		return newNum;
	} else {
		whole = parseFloat(value);
		newNum = new Number(whole).toLocaleString("en-US");
		return newNum;
	}
}

function setTotal() {
	let total = 0;
	let sub;
	$('.ord-sub-price').each(function() {
		sub = $(this).html().substring(2).replace(/,/g, '');
		total += parseFloat(sub);
	})


	$('#ord-total-price').html(addComma(total.toFixed(2).toString()));
}

function setCartCount(qty, type) {
	let curCount = $('#cart-count').text();
	let newCount;

	if(type == 1)
		newCount = parseInt(curCount) + qty;
	else if(type == 2)
		newCount = parseInt(curCount) - qty;
	
	$('#cart-count').html(newCount);
	if(newCount < 1)
		$('#cart-count').css('display', 'none');
	else
		$('#cart-count').css('display', 'inline-block');
}

function deleteCart() {
	alert('Successfully removed from your cart.');
}

function setCartNotif() {
	$(document.body).addClass('unscroll');
	$('#cart-notif').css('display', 'flex');
}

function addtoCart(qty, btn) {
	if(!$(this).hasClass('btn-disabled')) {
		if($(btn).hasClass('btn-cart')) {
			setCartCount(parseInt(qty), 1);
			setCartNotif();
			$('#cart-qty').trigger('change');
			$('#qty-minus').addClass('disabled');
			$('#qty-value').html('1');
		} else if($(btn).hasClass('btn-buy'))
			window.location = 'checkout.html?cart=18';
	}
}

function addCartProduct(dataResult, ID) {
	let modalField = document.createElement('div');
	$(modalField).attr('class', 'modal-field');
	let product = document.createElement('div');
	$(product).attr('class', 'ord-product');

	let productImage = document.createElement('div');
	$(productImage).attr('class', 'ord-image');
	let imgSrc = document.createElement('img');
	$(imgSrc).attr('src', dataResult.Prod_Img);

	$(productImage).append(imgSrc);

	let productSummary = document.createElement('div');
	$(productSummary).attr('class', 'ord-summary');

	let productDesc = document.createElement('div');
	$(productDesc).attr('class', 'ord-desc');
	let productName = document.createElement('p');
	$(productName).attr('class', 'ord-name');
	$(productName).html(dataResult.Prod_Name);
	let productPrice = document.createElement('p');
	$(productPrice).attr('class', 'ord-price');
	$(productPrice).html('&#8369; ' + addComma(dataResult.Prod_Price));

	let productQty = document.createElement('div');
	$(productQty).attr('class', 'qty-set');
	let qtyMinus = document.createElement('div');
	$(qtyMinus).attr('class', 'qty-minus unselectable');
	$(qtyMinus).attr('data-Cust_ID', ID);
	$(qtyMinus).attr('data-Cart_ID', dataResult.Cart_ID);
	$(qtyMinus).attr('data-Prod_ID', dataResult.Prod_ID);
	$(qtyMinus).attr('data-Prod_Price', dataResult.Prod_Price);
	$(qtyMinus).html('-');
	let qtyValue = document.createElement('div');
	$(qtyValue).attr('class', 'qty-value');
	$(qtyValue).html(dataResult.Qty);
	let qtyAdd = document.createElement('div');
	$(qtyAdd).attr('class', 'qty-add unselectable');
	$(qtyAdd).attr('data-maxQty', dataResult.Prod_Amount);
	$(qtyAdd).attr('data-Cart_ID', dataResult.Cart_ID);
	$(qtyAdd).attr('data-Prod_ID', dataResult.Prod_ID);
	$(qtyAdd).attr('data-Prod_Price', dataResult.Prod_Price);
	$(qtyAdd).html('+');
	if(dataResult.Prod_Amount == dataResult.Qty)
		$(qtyAdd).addClass('disabled');

	$(productQty).append(qtyMinus, qtyValue, qtyAdd);

	let availQty = document.createElement('div');
	$(availQty).attr('class', 'qty-avail');
	let avail = dataResult.Prod_Amount > 0 ? dataResult.Prod_Amount + (dataResult.Prod_Amount == 1 ? ' piece' : ' pieces') + ' left' : 'Out of Stock';
	$(availQty).html(avail);
	if(dataResult.Prod_Amount == 0)
		$(availQty).addClass('warning');

	$(productDesc).append(productName, productPrice, productQty, availQty);

	let subPrice = document.createElement('p');
	$(subPrice).attr('class', 'ord-sub-price');
	$(subPrice).html('&#8369; ' + addComma(dataResult.Prod_Total));

	$(productSummary).append(productDesc);
	$(productSummary).append(subPrice);

	let checkbox = document.createElement('input');
	$(checkbox).attr('type', 'checkbox');
	$(checkbox).attr('class', 'ord-checkbox');
	$(checkbox).attr('data-Cart_ID', dataResult.Cart_ID);
	let checkmark = document.createElement('span');
	$(checkmark).attr('class', 'checkmark cart-checkmark');

	$(product).append(checkbox);
	$(product).append(checkmark);
	$(product).append(productImage);
	$(product).append(productSummary);

	let hr = document.createElement('hr');
	$(hr).attr('class', 'horizontal');

	$(modalField).append(product);
	$(modalField).append(hr);

	$('#ord-all').append(modalField);
}

function searchProduct(product) {
	let prodName;
	let searchName = product.toLowerCase();
	$('.product-link').each(function() {
		prodName = $(this).attr('data-Prod_Name');
		if(prodName.toLowerCase().indexOf(searchName) == -1)
			$(this).addClass('hidden');
	});

	if($('.product-link:visible').length == 0) {
		$('#error-title').html('Sorry, no result found.');
		$('#error-message').html('We couldn&#39;t find a match for "' + product + '"');
		$('#error-image').removeClass('hidden');
		$('#no-record').removeClass('hidden');
		$('#search-tips').removeClass('hidden');
	} else {
		$('#error-image').addClass('hidden');
		$('#no-record').addClass('hidden');
		$('#search-tips').addClass('hidden');
	}
}

function checkCurrentCategory(string, type) {
	let category;

	$('.category-tab').each(function() {

		if(type == 1)
			category = $(this).text();
		else if(type == 2)
			category = $(this).attr('id');
		if(category == string) {
			setCurrentCategory($(this));
			return false;
		}
	});
}

function setCurrentCategory(element) {
	if($('.product-link:visible').length != 0)
		$('#no-record').addClass('hidden');
	window.location.hash = $(element).attr('id');
	$('.category-tab').removeClass('current-category');
	$(element).addClass('current-category');
	
	$('.product-link').each(function() {
		$(this).removeClass('hidden');
	});
	
	switch(window.location.hash) {
		case '#new-release':
			$('.product-link').each(function(i) {
				$(this).addClass('hidden');
				if(i == $('.product-link').length - 13)
					return false;
			});
			break;
		case '#flowers-plants':
			$('.product-link').each(function() {
				if($(this).hasClass('Pot/Planters'))
					$(this).addClass('hidden');
			});
			break;
		case '#pots-planters':
			$('.product-link').each(function() {
				if($(this).hasClass('Plant/Flowers'))
					$(this).addClass('hidden');
			});
			break;
	}

	if($('.product-link:visible').length == 0) {
		$('#error-title').html('Oops, something went wrong.');
		$('#error-message').html('Sorry, please refresh page to load data.');
		$('#error-image').addClass('hidden');
		$('#no-record').removeClass('hidden');
		$('#search-tips').addClass('hidden');
	} else 
		$('#no-record').addClass('hidden');

	$('html, body').animate({
		scrollTop: 0
	}, 0);
}

function removeCustomSelect() {
	$('#selected-custom').html('Price');
	$('.option-custom').removeClass('selected-option');
	$('#price-arrow').css('color', 'black');
	hideCustomSelect();
}

function hideCustomSelect() {
	$('#price-arrow').css('transform', 'rotate(-90deg)');
	$('#options-custom').css({
		'visibility': 'hidden',
		'opacity': '0'
	});
}

function strengthChecker(password) {
	let strongCheck = new RegExp('^(?=.{14,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$', 'g');
	let mediumCheck = new RegExp('^(?=.{8,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$', 'g');
	let weakCheck = new RegExp('(?=.{8,}).*', 'g');
			
	if(strongCheck.test(password))
		return 3;
	else if(mediumCheck.test(password))
		return 2;
	else if(weakCheck.test(password))
		return 1;
	else
		return 0;
}

function isBrowserIE() {
	userAgent = navigator.userAgent;
	let isIE = userAgent.indexOf('MSIE ') > -1 || userAgent.indexOf('Trident/') > -1;

	return isIE; 
}

function classIndex(className, element) {
	for(i = 0; i < className.length; i++)
		if(className[i] == element)
			return i;
	return -1;
}

// remove sticky header, display bg, and disable main scrolling
function hideMenu(isHeader) {
	if(!isHeader) {
		$('#header-menu').css('z-index', '0');
		$('#main').css('z-index', '1');
	}

	let bgGray = isHeader ? $('.bg').first() : $('.bg').last();

	setTimeout(function() {
		$(bgGray).toggleClass('active');
		$(document.body).css('overflow', 'hidden');
	}, 200);
}

// hide sidebar and bg, add sticky header, and enable main scrolling
function closePop(isHeader, element) {
	let bgGray = isHeader ? $('.bg').first() : $('.bg').last();
	$(bgGray).removeClass('active');

	if(element != null)
		$(element).toggleClass('animate-side');
	
	if(!isHeader)
		setTimeout(function() {
			setPageStyle(isHeader)
		}, 200);
	else
		setPageStyle(isHeader);
}

function setPageStyle(isHeader) {
	if(!isHeader) {
		$('#header-menu').css('z-index', '1');
		$('#main').css('z-index', '0');
	}

	$(document.body).css({
		'overflow': '', 
		'position': ''
	});
}

function isHome() {
	let pathName = window.location.pathname;
	let home = pathName.indexOf('index.html');

	return home > -1;
}

function removeNavStyle() {
	$('.nav-link').each(function() {
		$(this).removeClass('shadow');
	});

	$('#user-navigation').removeClass('shadow');
	$('#current').css('color', 'black');
}

$(document).on('click', '#scroll-prompt', function() {
	let scrollSet;

	if($(this).hasClass('home-scroll'))
		scrollSet = $('.row-home').offset().top - 100;
	else
		scrollSet = $('#send-message').offset().top - 100;

	$([document.documentElement, document.body]).animate({
		scrollTop: scrollSet
	}, 500);
});

function activateSticky() {
	let menuY = document.getElementById('header-menu').offsetTop;
	let active = window.pageYOffset > menuY;

	if(active) {
		$('#header-menu').addClass('sticky');
		$('#logo-name').removeClass('title-shadow');
		if(window.innerWidth > 500)
			$('#scroll-prompt').fadeOut(100);
	} else {
		$('#header-menu').removeClass('sticky');
		$('#logo-name').addClass('title-shadow');
		if(window.innerWidth > 500)
			$('#scroll-prompt').fadeIn(100);
	}

	if(window.innerWidth > 900)
		if($('#user-icon').children('img').length)
			$('#user-icon').removeClass('hiddenUser');
		else
			$('#user-icon').addClass('hiddenUser');

	$('#scroll-top').css('display', active ? 'block' : 'none');
	if(isHome()) {
		if(active) {
			$('#header-menu').css({
				'position': 'fixed',
				'background-color': '#F4FEF6'
			});
			$('#logo-name').css('color', '#9D5E35');
			$('#nav-icon').css('color', '#27473A');
			$('#search-icon').removeClass('white-icon');
			$('#cart-icon').removeClass('white-icon');
			if($('#user-icon').has('i').children('i').length)
				$('#user-icon').removeClass('white-icon');
		} else {
			$('#header-menu').css({
				'position': 'absolute',
				'background-color': 'rgba(255, 255, 255, 0)'
			});
			$('#logo-name').css('color', 'white');
			$('#nav-icon').css('color', 'white');
			$('#search-icon').addClass('white-icon');
			$('#cart-icon').addClass('white-icon');
			if($('#user-icon').children('i').length)
				$('#user-icon').addClass('white-icon');
		}

		if(window.innerWidth > 900) {
			$('.nav-link').each(function() {
				if(active)
					$(this).removeClass('shadow');
				else
					$(this).addClass('shadow');
				$(this).css('color', active ? 'gray' : 'white');
			});

			if(active) {
				$('#user-navigation').removeClass('shadow');
			} else {
				$('#user-navigation').addClass('shadow');
			}

			$('#signup').css('color', active ? 'gray' : 'white');
			$('#login').css('color', active ? '#27473A' : 'white');
		} else
			$('.nav-link').each(function() {
				$(this).css('color', 'gray');
			});

		$('#current').css('color', active ? 'black' : 'white');
	}

	if(!isHome()) {
		$('#logo-name').removeClass('title-shadow');
		$('#header-menu').css('position', active ? 'fixed' : 'relative');
		removeNavStyle();
	}

	if(window.innerWidth < 901)
		removeNavStyle();
}

function recommendProduct(dataResult1, cartrecommend){
	let a_tag = document.createElement('a');
	$(a_tag).attr('href', "product.html?ID=" + dataResult1.RHS_Prod_ID + '&prod=' + dataResult1.RHS_Name.replace(" ", "+").toLowerCase());
	
	let recodisplay = document.createElement('div');
	$(recodisplay).attr('class', "recom-display");
	
	let recoimg = document.createElement('div');
	$(recoimg).attr('class', "recom-image");
	let recoimgsrc = document.createElement('img');
	$(recoimgsrc).attr('src', dataResult1.Prod_Img);
	
	$(recoimg).append(recoimgsrc);
	
	let recoinfo = document.createElement('div');
	$(recoinfo).attr('class', "recom-info");
	
	let reconame = document.createElement('div');
	$(reconame).attr('class', "recom-name");
	let reconamesrc = document.createElement('p');
	$(reconamesrc).html(dataResult1.RHS_Name);
	
	$(reconame).append(reconamesrc);
	
	let recoprice = document.createElement('p');
	$(recoprice).attr('class', "recom-price");
	$(recoprice).html('&#8369; ' + addComma(dataResult1.Prod_Price));
	
	$(recoinfo).append(reconame, recoprice);
	$(recodisplay).append(recoimg, recoinfo);
	$(a_tag).append(recodisplay);
	
	$(cartrecommend).append(a_tag);
	}

$(document).ready(function() {
	$(document).on({
		ajaxStart: function() {
			if((!$('#signup-username').length || !($('#signup-username').length && $('#signup-username').is(':focus'))) 
				&& (!$('#info-username').length || !($('#info-username').length && $('#info-username').is(':focus')))
				&& (!$('#change-curpassword').length || !($('#change-curpassword').length && $('#change-curpassword').is(':focus'))))
				$('#load-modal').addClass('loading');
		},
		ajaxStop: function() {
			$('#load-modal').removeClass('loading');
		}
	});
});