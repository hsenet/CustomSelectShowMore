/**
 * @project: Show More Custom Select Picklist
 * @projectDescription: JQuery plugin for replacing default <select> to Custom UI to work with IE7+
 * @version: 0.01
 * @author: Jenkin Joyer Dsouza
 * @Web: https://github.com/hsenet
 */

$.fn.ShowMoreCustomSelect = function() {
				if(this.length>0){
					var ItemsToShow = 3; 
					var $thisElement =this;
					var $showMoreSelect = $thisElement.find("select");
					var __inputFieldVal = "Please Select...";
					var __inputField = "<input class='showMoreDropInput valueRegion' value='"+__inputFieldVal+"'></input>";
					$thisElement.append(__inputField);
					$showMoreSelect.addClass("hidden");
					var __dropdownMenu ="<div class='showMoreDropDiv hidden'><ul class='showMoreDropUL'></ul></div>";
					$thisElement.append(__dropdownMenu);
					
					$showMoreSelect.find("option").each(function(i){
						var $this =$(this);
						if(i<ItemsToShow) {
							var __item = "<li class='showMoreDropLI'  value='" + $this.attr("value") + "'> " + $this.text() + "</li>";
							$thisElement.find(".showMoreDropDiv ul").append(__item);
						} else {
							if(i===ItemsToShow) {
								var __item = "<li class='showMoreDropLI' id='showMore'><a href='#'>Show More</a></li>";
								    __item += "<li  class='hidden showMoreDropLI' value='" + $this.attr("value") + "'> " + $this.text() + "</li>";
							} else {
								var __item = "<li class='hidden showMoreDropLI' value='" + $this.attr("value") + "'> " + $this.text() + "</li>";
							}
							$thisElement.find(".showMoreDropDiv ul").append(__item);
						}
					});
					
					
					$thisElement.find(".showMoreDropInput").live("click",function(e){
							//$(this).next(".showMoreDropDiv").removeClass("hidden").width($(this).innerWidth());
							$DropDown = $thisElement.find(".showMoreDropDiv");
							$innerWidth = $(this).innerWidth();
							$leftMargin = $(this).outerWidth() *-1;
							$DropDown.removeClass("hidden").width($innerWidth);
							if($("html").hasClass("ie8")){ $DropDown.width($(this).innerWidth()-1);}
							if($("html").hasClass("ie7")){ $DropDown.css({"margin-left":$leftMargin,"margin-top":24})}
					});
					
					$thisElement.find(".showMoreDropDiv li:not('#showMore')").live("click",function(e){
						$(".showMoreDropInput").val($(this).text()); //.html($(this).text());
						$thisElement.find(".showMoreDropDiv li:not('#showMore')").removeClass("active");
						$(this).addClass("active");
						$thisElement.find(".showMoreDropDiv").addClass("hidden");
					});
					
					$thisElement.find(".showMoreDropDiv #showMore").live("click", function(e){
						e.preventDefault();
						$(this).parents("ul").find("li").removeClass("hidden");
						$(this).addClass("hidden");
					});
					
					$("html").live("click",function(e){
						if(e.target.className !=="showMoreDropLI" && e.target.className !== 'showMoreDropInput'  && e.target.className !=='' && e.target.className !=='showMoreDropInput valueRegion') {
							$thisElement.find(".showMoreDropDiv").addClass("hidden");
						}
					});
					
				}
	
};