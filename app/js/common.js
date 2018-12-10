$(function() {
  
  // open.side.html
  $(document).ready(function() {
    var main = function() {
    
    $('.menu__open').click(function() {
      $('.side-menu').animate({
        left: "0"
      }, 200);
    });

    $('.menu__close').click(function() {
      $('.side-menu').animate({
        left: "-285px"
      }, 200);
    });

    };

    $(document).ready(main);
  });
  
  // mmenu.html
  $(document).ready(function() {
    $("#mmenu").mmenu({
        "extensions": [
          "position-right",
          "effect-menu-slide",
          "pagedim-black",
          "border-none"
        ]
    });
    
    var API = $("#mmenu").data("mmenu");

    API.bind("open:finish", function() {
       $('.hamburger').addClass('is-active');
    });
    API.bind("close:finish", function() {
       $('.hamburger').removeClass('is-active');
    });

    $(".mm-navbar__title").html('<img class="mm-logo" src="img/logo.svg" width="50" height="50" alt="Логотип">');
   });  
  
  
  // adaptive.html
  $(".toggle-mnu").click(function() {
    $(this).toggleClass("on");
    $(".hidden-mnu").slideToggle();
    return false;
  });
  
  
  // fixed.html
  $(document).ready(function(){
    var options = {
    offset: 100 // точка от высоты экрана, появления нового фиксированного меню
    }

    var header = new Headhesive('.header-fixed', options); // класс для элемента для фиксированного меню
  });
  
  
  // multilevel.html
  $.fn.menumaker = function(options) {
      
      var cssmenu = $(this), settings = $.extend({
        title: "Меню",
        format: "dropdown",
        sticky: false
      }, options);

      return this.each(function() {
        cssmenu.prepend('<nav id="menu-button">' + settings.title + '</nav>');
        $(this).find("#menu-button").on('click', function(){
          $(this).toggleClass('menu-opened');
          var mainmenu = $(this).next('ul');
          if (mainmenu.hasClass('open')) { 
            mainmenu.hide().removeClass('open');
          }
          else {
            mainmenu.show().addClass('open');
            if (settings.format === "dropdown") {
              mainmenu.find('ul').show();
            }
          }
        });

        cssmenu.find('li ul').parent().addClass('has-sub');

        multiTg = function() {
          cssmenu.find(".has-sub").prepend('<span class="submenu-button"></span>');
          cssmenu.find('.submenu-button').on('click', function() {
            $(this).toggleClass('submenu-opened');
            if ($(this).siblings('ul').hasClass('open')) {
              $(this).siblings('ul').removeClass('open').hide();
            }
            else {
              $(this).siblings('ul').addClass('open').show();
            }
          });
        };

        if (settings.format === 'multitoggle') multiTg();
        else cssmenu.addClass('dropdown');

        if (settings.sticky === true) cssmenu.css('position', 'fixed');

        resizeFix = function() {
          if ($( window ).width() > 768) {
            cssmenu.find('ul').show();
          }

          if ($(window).width() <= 768) {
            cssmenu.find('ul').hide().removeClass('open');
          }
        };
        resizeFix();
        return $(window).on('resize', resizeFix);

      });
  };

  $(document).ready(function(){

  $(".nav-multilevel").menumaker({
     title: "Меню",
     format: "multitoggle"
  });

  });


});
