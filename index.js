$(document).ready(function(){

	var grsOffset = 0;

	function getResults() {	

		var input = $(".wp-view__input").val();

		var searchURL = "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts|info&list=&continue=gsroffset||&generator=search&exchars=100&exlimit=max&exintro=1&explaintext=1&inprop=url&gsrsearch=" + input + "&origin=*&gsrlimit=10&gsroffset=" + grsOffset + ";";

		$.getJSON(searchURL, function(data) {

			var pages = data.query.pages;
			var pagesKeys = Object.keys(pages);

			for (i = 0; i < pagesKeys.length; i++) {

				var objName = pagesKeys[i];
				var page = pages["" + objName];
				var title = page.title;
				var extract = page.extract;
				var url = page.fullurl;

				$(".wp-view__results").append("<a class=\"wp-view__card card\" href=\"" + url + "\" target=\"_blank\"><div class=\"card-header\"><h2 class=\"wp-view__title\">" + title + "<\/h2><\/div><div class=\"card-block\"><div class=\"wp-view__intro\">" + extract + "...<\/div><\/div><\/a>");

			}

		});	

		$(".wp-view__more-button").removeClass("hide");			

	}


	function getFirstResults() {

		$(".wp-view__card").remove();
		grsOffset = 0;
		getResults();		

	}


	$(".wp-view__button").on("click", function(){

		getFirstResults();

	});	


	$(".wp-view__input").bind("enterKey",function(e){

		getFirstResults();

	});

	
	$(".wp-view__input").keyup(function(e){

	    if(e.keyCode == 13)

	    {

	        $(this).trigger("enterKey");

	    }

	});	


	$(".wp-view__more-button").on("click", function(){

		grsOffset += 10;
		getResults();

	});			

});











