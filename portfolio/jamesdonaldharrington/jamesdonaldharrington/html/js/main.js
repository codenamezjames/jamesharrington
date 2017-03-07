jQuery(document).ready(function($) {
	function getURLParameters(url)
{
  
    var result = {};
    var searchIndex = url.indexOf("?");
    if (searchIndex == -1 ) return result;
    var sPageURL = url.substring(searchIndex +1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {     
        var sParameterName = sURLVariables[i].split('=');      
        result[sParameterName[0]] = sParameterName[1];
    }
    return result;
}

	$.ajax({async:false})

	
	$('header').load('/tpl/header.html');
	if($('.resume')){
		$('.resume').load("/tpl/resume.html");
	}
	// $('footer').load('tpl/footer.html', function(){
	// 	var header_height = $("header").height()
	// 	var article_height = $("article").height()
	// 	var footer_height = $("footer").height()

	// 	$(".push").height( $(window).height() - header_height - article_height - footer_height )
	// 	$(window).resize(function(event) {
	// 		$(".push").height( $(window).height() - header_height - article_height - footer_height )
	// 	});
		
		
	// });
	
	


	if(location.pathname.slice(-8) == "web.html" || location.pathname.slice(-11) == "mobile.html"){
		$.getJSON('/data/data.json', function(data) {
			web = data.web;
			mobile = data.mobile;

			$.each(web, function(index, site) {
				if (site.display) {
					$("#web_json").append('<li class="cover"><a href="project.html?id='+site.id+'"><img src="'+ site.img +'"></a></li>')
				};
			});
			$.each(mobile, function(index, site) {
				if (site.display) {
					$("#mobile_json").append('<li class="cover"><a href="project.html?id='+site.id+'"><img src="'+ site.img +'"></a></li>')
				}
			});
		});
	}

	if(location.pathname.slice(-12) == "project.html"){
		url_params = getURLParameters(document.URL)
		if (url_params.id){
			$.getJSON('/data/data.json', function(data) {
				web = data.web;
				mobile = data.mobile;
				
				$("article").find('#list').append('<option value="" id="list_item">--Web--</option>')
				$.each(web, function(index, val) {
					if (val.display) {
						$("article").find('#list').append('<option value="'+val.id+'" id="list_item">'+val.title+'</option>')
					}
				});
				$("article").find('#list').append('<option value="" id="list_item"></option><option value="" id="list_item">--Mobile--</option>')
				$.each(mobile, function(index, val) {
					if (val.display) {
						$("article").find('#list').append('<option value="'+val.id+'" id="list_item">'+val.title+'</option>')
					}
				});

				$.each(data, function(ind, cat) {
					$.each(cat, function(index, val) {

						if(val.id == url_params.id){
						 	$("article").find('#title').html(val.title)
						 	$("article").find('#info').html(val.info)

						 	$.each(val.imgs, function(i, v) {
						 		$("article").find('#imageHolder').append('<img src="'+ v +'"><br><br>')
						 	});

						}
					});
				});
			
			$("article").on('change', '#list', function(event) {
				event.preventDefault();
				

				$.each(data, function(ind, cat) {
					$.each(cat, function(index, val) {

						if(val.id == url_params.id){
						 	$("article").find('#title').html(val.title)
						 	$("article").find('#info').html(val.info)

						 	$.each(val.imgs, function(i, v) {
						 		$("article").find('#imageHolder').append('<img src="'+ v +'"><br><br>')
						 	});

						}
					});
				});
			});
			$("article").on('change', '#list', function(event) {
				event.preventDefault();
				window.location.href = ("/project.html?id="+$(this).find(':selected').attr('value'))
			});
			});
		}else{
			window.location.href = "/project.html?id=1";
		}

	}
	setTimeout(function() { $('body').show()}, 100);
	// $(document).on('click', 'a', function(event) {
	// 	that = $(this)
	// 	event.preventDefault();
	// 	$('body').fadeOut('100', function  () {
	// 		window.location = that.attr('href')
	// 	});
		
	// });
	


	if ($('.floater').html()){
		
		$(window).scroll(function(event) {
			// console.log($(window).scrollTop())
			if ($(window).scrollTop() > 210){
				$('.floater').css('top', $(window).scrollTop() - 210 + 'px' );
				console.log($(window).scrollTop() -200)
			}

		});
	}

	$.getJSON('/data/data.json', function(data) {
			$.each(data, function(index, web_mob) {
				 $.each(web_mob, function(index, val) {
				 	if (val.proud === true){
				 	 	$('.works').append(' '+val.title + ',')
				 	}
				 });
			});
	});



	function validate(form){

		var error_loger = "";
		form.find(':input').change(function(event) {
			$(this).removeClass('error')
		});
		form.find(':input').each(function(index, el) {

			var that = $(this)

			if (that.hasClass('require')){

				if (that.attr('type') == "text"){

					if (that.val() == undefined || $(this).val() == "") {
						error_loger += $(this).attr('placeholder') + " can't be blank <br>"
						$(this).addClass('error');

					}else if (that.val().length < 3) {
						error_loger += $(this).attr('placeholder') + " is not long enough <br>";
						$(this).addClass('error');
					};

				}
			
			}
		});

		if(error_loger != ""){
			$("#error_message").html(error_loger)
			$("#error_message").slideDown('fast');
			return false;
		}else{return true}
	};

	$("form").submit(function(e){
		$("#sliderVal").val($("#slider").slider( "value" ));
		return validate($("form"))
		
	});



});