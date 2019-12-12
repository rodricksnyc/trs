"use strict";

$(document).ready(() => {
   $("a[href]").each(function () {
       var url = $(this).attr("href");
       if (url.search(location.hostname) == -1 && url.match("://")) {
           $(this)
               .children("i")
               .addClass("fa-external-link");
           $(this).attr("target", "_blank");
       }
   });
   // Scroll to Top
   function scrollfn(t) {
       let n = $(t),
           o = "#home" === t ? 0 : n.offset().top;
       $("html, body").stop().animate({
           scrollTop: o
       }, 1200, "swing")
   }

   $('.back-to-top').click(() => {
       scrollfn("#home");
   })

   $(window).scroll(function () {
       ((window.pageYOffset || document.documentElement.scrollTop) > 100) ? $('.back-to-top').css({ opacity: 1, visibility: "visible" }) : $('.back-to-top').css({ opacity: 0, visibility: "hidden" });
   });


   let openTopSearch = () => {
       $(".top-search-container").css({
           marginTop: "0",
           padding: "1rem 2rem 1rem 1rem"
       });
   },
       closeTopSearch = () => {
           $(".top-search-container").css({
               marginTop: "calc(-2.25rem - 2px)",
               padding: "0rem 2rem 0rem 1rem"
           });
       },
       addUpdateTiles = () => {
           $(".default-tile").each((i, el) => {
               $(el).data("tile-expires")
                   ? $(el).append(
                       `<span class="tile-badge-expires">Expires&nbsp;Soon</span>`
                   )
                   : $(el)
                       .find(".tile-badge-expires")
                       .remove();
               $(el).data("tile-isnew")
                   ? $(el).append(`<span class="tile-badge-new">New</span>`)
                   : $(el)
                       .find(".tile-badge-new")
                       .remove();
               $(el).data("tile-bookmarked") == true
                   ? $(el).append(`<span class="tile-icon-bookmark"><i class="fas fa-bookmark"></i></span>`)
                   : ($(el).data("tile-bookmarked") == false ? $(el).append(`<span class="tile-icon-bookmark"><i class="far fa-bookmark"></i></span>`)
                       : $(el).find(".tile-icon-bookmark").remove());
               if ($(el).data("tile-strech")) {
                   $(el).find('.close').click(function (e) {
                       $(this).parent().removeClass("default-tile-w-100");
                       e.stopPropagation();
                   })
                   $(el).click(function (e) {
                       $(this).addClass("default-tile-w-100");
                   });
               }
           });
       },
       tooltipContent = el => {
           if ($(el).find(".tooltip-content").length < 1 && $(el).data("tooltip")) {
               $(el).append(
                   `<span class="tooltip-content">${$(el).data("tooltip-html")}</span>`
               );
           }
       };

   // Open/Close Global Search
   $(`[data-event*='openTopSearch']`).click(() => {
       openTopSearch();
   });
   $(`[data-event*='closeTopSearch']`).click(() => {
       closeTopSearch();
   });


   // Add/Update badges to tiles
   addUpdateTiles();


   // ToolTip El
   $(`i[data-tooltip='true']`).hover(el => {
       tooltipContent(el.target);
   });
   $(`i[data-tooltip='true']`).focus(el => {
       tooltipContent(el.target);
   });


   // Page right nav/btn group
   $('.right-nav-tabs .nav-tabs .nav-link[data-toggle="tab"]').on(
       "shown.bs.tab",
       function (e) {
           $(".right-nav-tabs").addClass("right-nav-tabs--open");
           $(".right-nav-tabs-overlay").show();
       }
   );
   $('.right-nav-tabs .nav-tabs .nav-link[data-toggle="tab"]').on(
       "hidden.bs.tab",
       function (e) {
           $(".right-nav-tabs").removeClass("right-nav-tabs--open");
           $(".right-nav-tabs-overlay").hide();
       }
   );
   $(".right-nav-tabs .close, .right-nav-tabs-overlay").click(() => {
       $('#right-nav-tab.nav-tabs .nav-link[data-toggle="tab"]').removeClass("active");
       $(".right-nav-tabs").removeClass("right-nav-tabs--open");
       $(".right-nav-tabs-overlay").hide();
   });

   // Set minHeight for main block based on child
   $("main .section-one-bg-clr")
       .parent()
       .css({ minHeight: "calc(100vh - 9rem)" });

   // Collapse logic

   $('.collapse-el-list').parent().find('[data-action="expand"]').click(function () {
       $(this).html($(this).text().indexOf('Expand') > -1 ? '<i class="fal fa-compress-alt mr-1"></i>Collapse All' : '<i class="fal fa-expand-alt mr-1"></i>Expand All');
       $(this).closest('.collapse-list-wrapper').find('.collapse-el-list .collapse-wrapper').each(function () {
           $(this).find('.collapse').collapse('toggle');
       })
   })

   $(".collapse-wrapper").each(function (i, el) {
       let createId = `collapse_${$(el).data("node")}_res_${i}`;
       $(el)
           .find(".req")
           .attr("href", `#${createId}`);
       $(el)
           .find(".req")
           .attr("aria-controls", createId);
       $(el)
           .find(".collapse")
           .attr("id", createId);
   });

   // Section Search/Filter
   $('.section-search-container #sec-tabs li .nav-link').on('shown.bs.tab', function (e) {
       $(this.hash).attr('data-search-criteria', ($(this).data('search-criteria') !== "" && $(this).data('search-criteria') !== undefined) ? $(this).data('search-criteria') : "all");
   });

   $(".section-search-container .input-wrapper input").focus(
       function (e) {
           $(this)
               .parent()
               .find(".dropdown-wrapper")
               .addClass("dropdown-wrapper--open");
       }
   );

   $(".section-search-container .input-wrapper input").blur(
       function (e) {
           $(this)
               .parent()
               .find(".dropdown-wrapper")
               .removeClass("dropdown-wrapper--open");
       }
   );

   // Button group
   $('.button-group').each(function () {
       $(this).find('button').click((e) => {
           $(this).find('button.active').removeClass('active');
           $(e.currentTarget).addClass('active');
       })
   });

   // Profile page

   $('.filter-toggle').click(() => {
       $('.filter-attr-list--available').toggle("100");
       $('.filter-toggle').toggle();
   })

   // // For development purposes only
   // let nowShowing = a => {
   //     switch (
   //     ($("main")
   //         .find("section")
   //         .remove(),
   //         a)
   //     ) {
   //         case "announcements":
   //             $("main").load("announcements.html", () => addUpdateTiles());
   //             break;
   //         case "opportunities":
   //             $("main").load("opportunities.html", () => addUpdateTiles());
   //             break;
   //         case "learningLibrary":
   //             $("main").load("learningLibrary.html", () => {
   //                 addUpdateTiles(),
   //                     $(
   //                         "main section:not([data-attached='learningLibrary'])"
   //                     ).hide(),
   //                     $(".collapse-wrapper").each(function (a, e) {
   //                         let i = `collapse_${$(e).data("node")}_res_${a}`;
   //                         $(e)
   //                             .find(".req")
   //                             .attr("href", `#${i}`),
   //                             $(e)
   //                                 .find(".req")
   //                                 .attr("aria-controls", i),
   //                             $(e)
   //                                 .find(".collapse")
   //                                 .attr("id", i);
   //                     }),
   //                     [
   //                         {
   //                             landingTileHeader: "Special Issues",
   //                             iconClassName: "fal fa-star",
   //                             memberPage: !1,
   //                             target: "specialIssues"
   //                         },
   //                         {
   //                             landingTileHeader: "CTP & TRSP Resources",
   //                             iconClassName: "fal fa-clipboard-list",
   //                             memberPage: !1,
   //                             target: "ctpTrspResources"
   //                         },
   //                         {
   //                             landingTileHeader: "Grantsmanship",
   //                             iconClassName: "fal fa-envelope-open-dollar",
   //                             memberPage: !1,
   //                             target: "grantsmanshipResources"
   //                         },
   //                         {
   //                             landingTileHeader: "Docket Submission",
   //                             iconClassName: "fal fa-calendar",
   //                             memberPage: !1,
   //                             target: "docketSubmissionsPublicComment"
   //                         },
   //                         {
   //                             landingTileHeader: "Data Resources",
   //                             iconClassName: "fal fa-file-chart-line",
   //                             memberPage: !1,
   //                             target: "dataResources"
   //                         },
   //                         {
   //                             landingTileHeader: "All Courses & Materials",
   //                             iconClassName: "fal fa-tasks",
   //                             memberPage: !0,
   //                             target: "allCoursesMaterials"
   //                         },
   //                         {
   //                             landingTileHeader: "CASEL/CECTR Webinars",
   //                             iconClassName: "fal fa-video",
   //                             memberPage: !0,
   //                             target: "webinars"
   //                         },
   //                         {
   //                             landingTileHeader: "TRS Reading List",
   //                             iconClassName: "fal fa-books",
   //                             memberPage: !0,
   //                             target: "trsReadingList"
   //                         }
   //                     ].map(a => {
   //                         $(
   //                             `section[data-attached='learningLibrary'] .sec-landing-tile-list:nth-child(${
   //                             a.memberPage ? 2 : 1
   //                             })`
   //                         ).append(
   //                             ` <li class="sec-landing-tile" data-href='${
   //                             a.target
   //                             }'>\n                    <div class="tile-container">\n                        <div class="landing-tile-icon">\n                            <i class="${
   //                             a.iconClassName
   //                             } t-green f-28"></i>\n                        </div>\n                        <div class="landing-tile-hdr t-white f-700 f-24">\n                            ${
   //                             a.landingTileHeader
   //                             }\n                        </div>\n                        <div class="landing-tile-txt t-white f-300">\n                            Lorem ipsum dolor sit amet, consectetuer\n                            adipiscing elit, sed diam nonummy nibh\n                            euismod tincidunt ut laoreet dolore magna\n                        </div>\n                    </div>\n                    <i class="fal fa-arrow-right t-white"></i>\n                </li>`
   //                         );
   //                     }),
   //                     $(
   //                         "section[data-attached='learningLibrary'] .sec-landing-tile-list .sec-landing-tile"
   //                     ).bind("click", function () {
   //                         $("section").hide(),
   //                             void 0 !== $(this).data("href")
   //                                 ? $(
   //                                     `section[data-attached='${$(this).data("href")}']`
   //                                 ).show()
   //                                 : $("section[data-attached='learningLibrary']").show();
   //                     }),
   //                     $(".section-search-container #sec-tabs li .nav-link").on(
   //                         "shown.bs.tab",
   //                         function (a) {
   //                             $(this.hash).attr(
   //                                 "data-search-criteria",
   //                                 "" !== $(this).data("search-criteria") &&
   //                                     void 0 !== $(this).data("search-criteria")
   //                                     ? $(this).data("search-criteria")
   //                                     : "all"
   //                             );
   //                         }
   //                     ),
   //                     $(".button-group").each(function () {
   //                         $(this)
   //                             .find("button")
   //                             .click(a => {
   //                                 $(this)
   //                                     .find("button.active")
   //                                     .removeClass("active"),
   //                                     $(a.currentTarget).addClass("active");
   //                             });
   //                     }),
   //                     $(".section-search-container .input-wrapper input").focus(
   //                         function (a) {
   //                             $(this)
   //                                 .parent()
   //                                 .find(".dropdown-wrapper")
   //                                 .addClass("dropdown-wrapper--open");
   //                         }
   //                     ),
   //                     $(".section-search-container .input-wrapper input").blur(
   //                         function (a) {
   //                             $(this)
   //                                 .parent()
   //                                 .find(".dropdown-wrapper")
   //                                 .removeClass("dropdown-wrapper--open");
   //                         }
   //                     );
   //                 tooltipContent = el => {
   //                     if ($(el).find(".tooltip-content").length < 1 && $(el).data("tooltip")) {
   //                         $(el).append(
   //                             `<span class="tooltip-content">${$(el).data("tooltip-html")}</span>`
   //                         );
   //                     }
   //                 };
   //
   //                 // Open/Close Global Search
   //                 $(`[data-event*='openTopSearch']`).click(() => {
   //                     openTopSearch();
   //                 });
   //                 $(`[data-event*='closeTopSearch']`).click(() => {
   //                     closeTopSearch();
   //                 });
   //
   //
   //                 // Add/Update badges to tiles
   //                 addUpdateTiles();
   //                 $('.collapse-el-list').parent().find('[data-action="expand"]').click(function () {
   //                     $(this).html($(this).text().indexOf('Expand') > -1 ? '<i class="fal fa-compress-alt mr-1"></i>Collapse All' : '<i class="fal fa-expand-alt mr-1"></i>Expand All');
   //                     $(this).closest('.collapse-list-wrapper').find('.collapse-el-list .collapse-wrapper').each(function () {
   //                         $(this).find('.collapse').collapse('toggle');
   //                     })
   //                 })
   //
   //
   //                 // ToolTip El
   //                 $(`i[data-tooltip='true']`).hover(el => {
   //                     tooltipContent(el.target);
   //                 });
   //                 $(`i[data-tooltip='true']`).focus(el => {
   //                     tooltipContent(el.target);
   //                 });
   //             });
   //             break;
   //         case "tcors":
   //             $("main").load("tcors.html", () => {
   //                 addUpdateTiles();
   //             });
   //             break;
   //         case "login":
   //             $("main").load("login.html", () => {
   //                 addUpdateTiles();
   //             });
   //             break;
   //         case "groups":
   //             $("main").load("groups.html", () => {
   //                 addUpdateTiles();
   //             });
   //             break;
   //         case "careerNetwork":
   //             $("main").load("careerNetwork.html", () => {
   //                 addUpdateTiles();
   //             });
   //             break;
   //         case "portal":
   //             $("main").load("portal.html", () => {
   //                 addUpdateTiles();
   //             });
   //             break;
   //         case "profile":
   //             $("main").load("profile.html", () => {
   //                 addUpdateTiles();
   //                 $('.filter-toggle').click(() => {
   //                     $('.filter-attr-list--available').toggle("100");
   //                     $('.filter-toggle').toggle();
   //                 })
   //             });
   //             break;
   //         default:
   //             $("main").load("frontpage.html", () => {
   //                 addUpdateTiles(),
   //                     $("i[data-tooltip='true']").hover(a => {
   //                         tooltipContent(a.target);
   //                     }),
   //                     $("i[data-tooltip='true']").focus(a => {
   //                         tooltipContent(a.target);
   //                     });
   //             });
   //     }
   // };
   // $(".hdr-container .nav-item a").click(function (a) {
   //     "#" !== $(this).attr("href")
   //         ? nowShowing(
   //             $(this)
   //                 .attr("href")
   //                 .replace("#", "")
   //         )
   //         : a.stopPropagation();
   // }),
   //     nowShowing();
});
