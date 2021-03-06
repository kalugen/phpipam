/**
 *
 * Javascript / jQuery login functions
 *
 *
 */


$(document).ready(function() {

/* hide error div if jquery loads ok
*********************************************/
$('div.jqueryError').hide();
$('div.loading').hide();


/*	loading spinner functions
*******************************/
function showSpinner() {
    $('div.loading').show();
}
function hideSpinner() {
    $('div.loading').fadeOut('fast');
}

/*	Login redirect function if success
****************************************/
function loginRedirect() {
	var base = $('.iebase').html();
	window.location=base;
}

/*	submit login
*********************/
$('form#login').submit(function() {
	//show spinner
	showSpinner();
    //stop all active animations
    $('div#loginCheck').stop(true,true);

    var logindata = $(this).serialize();

    $('div#loginCheck').hide();
    //post to check form
    $.post('app/login/login_check.php', logindata, function(data) {
        $('div#loginCheck').html(data).fadeIn('fast');
        //reload after 2 seconds if succeeded!
        if(data.search("alert alert-danger") == -1) {
            showSpinner();
            //search for redirect
            if($('form#login input#phpipamredirect').length > 0) { setTimeout(function (){window.location=$('form#login input#phpipamredirect').val();}, 1000); }
            else 												 { setTimeout(loginRedirect, 1000);	}
        }
        else {
	        hideSpinner();
        }
    });
    return false;
});

/*	auto-suggest first available IP in selected subnet
********************************************************/
$(document).on("change", "select#subnetId", function() {
	showSpinner();
	var subnetId = $('select#subnetId option:selected').attr('value');
	//post it via json to request_ip_first_free.php
	$.post('app/login/request_ip_first_free.php', { subnetId:subnetId}, function(data) {
		$('input.ip_addr').val(data);
		hideSpinner();
	});
});

/*	submit IP request
*****************************************/
$(document).on("submit", "#requestIP", function() {
	var subnet = $('#requestIPsubnet').serialize();
	var IPdata = $(this).serialize();
	var postData = subnet + "&" + IPdata;

	showSpinner();

    //post to check form
    $.post('app/login/request_ip_result.php', postData, function(data) {
        $('div#requestIPresult').html(data).slideDown('fast');
        hideSpinner();
        //reset sender to prevent duplicates
        $('input[name=requester]').val('');
    });
	return false;
});

});


