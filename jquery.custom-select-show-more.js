/**
 * @project: Show More Custom Select Picklist
 * @projectDescription: JQuery plugin for replacing default <select> to Custom UI to work with IE7+
 * @usage: $(element).ShowMoreCustomSelect({options});
 * @version: 0.03 - Unstable - Not Production Ready
 * @changeLog:  1) Fixed Tabbing through multiple instances. 2) Fixed traversing through menu items
 * @author: Jenkin Joyer Dsouza
 * @Web: https://github.com/hsenet
 */

$.fn.ShowMoreCustomSelect = function(options) {
				var settings = $.extend({
					defaultText: "Please Select...",
					defaultTextCss: "",
					noOfListItems:3,
					ActiveItem:0
				}, options);
				
				if(this.length>0){ // Run the script Only if the element exists
					var ItemsToShow = settings.noOfListItems; 
					var $thisElementAll = $(this);
					$thisElementAll.each(function(i) {
						var $thisElement = $(this);
						var $showMoreSelect = $thisElement.find("select");
						if(!($showMoreSelect.hasClass("hidden"))) {// Only run the script once
							var __inputFieldVal = settings.defaultText;
							var __inputFieldValColor = settings.defaultTextCss;
							var __inputField = $("<div tabIndex='0' class='showMoreDropInput valueRegion' >"+__inputFieldVal+"</div>").appendTo($thisElement);
							//$thisElement.append(__inputField);
							$showMoreSelect.addClass("hidden");
							if(__inputFieldValColor != '') { __inputField.addClass(__inputFieldValColor);}
							var __dropdownMenu =$("<div class='showMoreDropDiv hidden'><ul class='showMoreDropUL'></ul></div>").appendTo($thisElement);
							//$thisElement.append(__dropdownMenu);
							var __NoSelectItems = $showMoreSelect.find("option").length;
							$showMoreSelect.find("option").each(function(i){
								//console.log(i);
								var $this =$(this);
								var activeClass = "";
								if(i===0) {activeClass= __inputFieldValColor;}
								if(settings.ActiveItem===i) {activeClass="active"; if(i===0) { activeClass="active "+ __inputFieldValColor; }}
								if(i<ItemsToShow) {
									var ClassName;
									if(i==0) { var ClassName =__inputFieldValColor} else {}
									var __item = "<li class='showMoreDropLI "+activeClass+"'  rel='" + $this.attr("value") + "'> " + $this.text() + "</li>";
									$thisElement.find(".showMoreDropDiv ul").append(__item);
								} else {
									if(i===(__NoSelectItems-1)) {
										var __item = "<li  class='hidden showMoreDropLI' rel='" + $this.attr("value") + "'> " + $this.text() + "</li>";
											__item += "<li class='showMoreDropLI' id='showMore'><a href='#'>Show All</a></li>";
									} else {
										var __item = "<li class='hidden showMoreDropLI' rel='" + $this.attr("value") + "'> " + $this.text() + "</li>";
									}
									$thisElement.find(".showMoreDropDiv ul").append(__item);
								}
							});
							
							
							$thisElement.find(".showMoreDropInput").live("click",function(e){
									$DropDown = $thisElement.find(".showMoreDropDiv");
									$innerWidth = $(this).innerWidth();
									$leftMargin = $(this).outerWidth() *-1;
									$DropDown.removeClass("hidden").width($innerWidth);
									if($("html").hasClass("ie8")){ $DropDown.width($(this).innerWidth());}
									//if($("html").hasClass("ie7")){ $DropDown.css({"margin-left":$leftMargin,"margin-top":24})}
									//if($("html").hasClass("ie7")){ $DropDown.css({"margin-top":33})}
									//console.log(e.keyCode);
							});
							
							$thisElement.find(".showMoreDropDiv #showMore").live("click", function(e){
								__inputField.focus();
								e.preventDefault();
								$(this).parents("ul").find("li").removeClass("hidden");
								$(this).addClass("hidden");
								return false;
							});
							
							$thisElement.find(".showMoreDropDiv li:not('#showMore')").live("click",function(e){
								$thisElement.find(".showMoreDropInput").html($(this).text()); //.val($(this).text());
								if($(this).hasClass(__inputFieldValColor)) {
									$thisElement.find(".showMoreDropInput").addClass(__inputFieldValColor);
								} else {
									$thisElement.find(".showMoreDropInput").removeClass(__inputFieldValColor);
								}
								$thisElement.find(".showMoreDropDiv li:not('#showMore')").removeClass("active");
								$(this).addClass("active");
								$thisElement.find(".showMoreDropDiv").addClass("hidden");
							});
							$thisElement.find(".showMoreDropDiv ul li").live("hover",function(){
								$thisElement.find(".showMoreDropDiv ul li").removeClass("active");
								if($(this).attr("id") !== "showMore") {
									$(this).addClass("active");
								}
							});
							
							
							$("html").live("click",function(e){
								//console.log(e.target.className);
								if(e.target.className !=="showMoreDropLI" 
									&& e.target.className !== 'showMoreDropInput'
									&& e.target.className !=='' 
									&& e.target.className !=='showMoreDropInput valueRegion' 
									&& e.target.className !=='showMoreDropInput valueRegion onFocus'
									&& e.target.className !=='showMoreDropInput valueRegion '+__inputFieldValColor  
									&& e.target.className !=='showMoreDropInput valueRegion '+__inputFieldValColor +' onFocus') {
									$thisElement.find(".showMoreDropDiv").addClass("hidden");
								}
							});
							
							__inputField
							.focus(function(){
								__inputField.addClass('onFocus');
							})
							.blur(function(){
								__inputField.removeClass('onFocus');
							});
							
							var __PosCount = 0;
							__inputField.keydown(function(e) {
							
									var __dropDownHeight = $thisElement.find(".showMoreDropDiv ul").height();
									 e.preventDefault();
									 e = e || window.event;  
									 var keyCode = e.keyCode || e.which;
									 
									 if(__dropdownMenu.is(":visible")) {
										var __active = $thisElement.find(".showMoreDropDiv ul").find('.active');
										if(keyCode === 40){ // When Down key is pressed
											
												if(!($(".showMoreDropDiv ul li:not('#showMore'):last").hasClass("active"))) { // Prevent from looping
													if(__active.next().length>0 && __active.next().is(":visible")){
														if(__active.removeClass('active').next().attr("id") !== 'showMore') {
															__active.removeClass('active').next().addClass('active');
														}
														
													 }else{
														__active.removeClass('active');
														$thisElement.find(".showMoreDropDiv ul li:first").addClass('active');
													} 
													
													if(__dropdownMenu.find("#showMore").hasClass("hidden")) {
														var __activePos = $thisElement.find(".showMoreDropDiv ul").find('.active');
														if(__PosCount < __dropDownHeight) {
															__PosCount = __activePos.position().top;
														} else {
															__PosCount = __dropDownHeight+__activePos.position().top;
														}
														//$thisElement.find(".showMoreDropDiv ul").scrollTop(__PosCount);
														$thisElement.find(".showMoreDropDiv ul").animate({scrollTop:'+=17px'}, 100);
													}	
												}
											
											//}
										}
										if(keyCode === 38){ // When Up key is pressed
											if(!($(".showMoreDropDiv ul li:not('#showMore'):first").hasClass("active"))) { // Prevent from Looping
												if(__active.prev().length>0 && __active.prev().is(":visible")){
													__active.removeClass('active').prev().addClass('active');
												 }else{
													__active.removeClass('active');
													if($thisElement.find(".showMoreDropDiv ul li:last").is(":visible")){
														if($thisElement.find(".showMoreDropDiv ul li:last").attr("id") !=="showMOre") {
															$thisElement.find(".showMoreDropDiv ul li:last").addClass('active');
														}
													}
												}  
												if(__dropdownMenu.find("#showMore").hasClass("hidden")) {
													var __activePos = $thisElement.find(".showMoreDropDiv ul").find('.active');
													if(__PosCount < __dropDownHeight) {
														__PosCount = __activePos.position().top;
													} else {
														__PosCount = __dropDownHeight+__activePos.position().top;
													}
													//$thisElement.find(".showMoreDropDiv ul").scrollTop(__PosCount);
													$thisElement.find(".showMoreDropDiv ul").animate({scrollTop:'-=17px'}, 100);
												}	
											}
											
										}
										if(keyCode === 13){ // enter key is pressed
											if($thisElement.find(".showMoreDropDiv").hasClass("hidden")) {
												$thisElement.find(".showMoreDropDiv").removeClass("hidden")
											
											} else {
												if($thisElement.find(".showMoreDropDiv li").hasClass("active")) {
													$thisElement.find(".showMoreDropDiv li.active").trigger("click");
												} else {
													if($thisElement.find(".showMoreDropDiv li").attr("id") === 'showMore') {
														$thisElement.find(".showMoreDropDiv #showMore").trigger("click");
													}
												}
											}
											
										}
										if(keyCode === 27){ // Escape key is pressed
											$thisElement.find(".showMoreDropDiv").addClass("hidden");
										}
									 } else {
										if(keyCode !== 9) {
											__inputField.trigger("click");
										} else {
											var thisElementPointer = 0;
											$("div[tabIndex=0]").map(function(){ // find the next tabbed item manually
												if(thisElementPointer = 1) {$(this).focus();}
												if($(this).hasClass("onFocus")) { thisElementPointer = 1}
											});
											
										}
									 
									 }
									 return false;
									
							});
							
						}// Only run the script once
					});
					
				}// Run the script Only if the element exists
	
};