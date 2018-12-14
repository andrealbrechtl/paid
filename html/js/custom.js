/*
 TEMPLATE NAME: Sinewave - One Page Hosting Landing Page HTML Template
 TEMPLATE URI: - http://froid.works/themeforest/sinewave/resource/
 DESCRIPTION: Hosting HTML Template
 VERSION: 1.0
 AUTHOR: Ajay Kumar Choudhary
 AUTHOR URL: http://codecanyon.net/user/ajay138/
 DESIGN BY: Rakesh Kumar

 ##TABLE OF CONTENT##

 1. LOGIN, REGISTER & FORGOT PASSWORD FORM
 2. PAGE SCROLL ANIMATION
 3. COLLAPSE NAVBAR ON SCROLL
 4. GOOGLE MAPS
 5. CONTACT FORM
 6. SUBSCRIBE FORM
 7. WOW JS
 8. MOBILE MENU
 9. INPUT FIELD EFFECT

 */
(function () {
  'use strict';

  $(function () {





    /*(1) LOGIN, REGISTER & FORGOT PASSWORD FORM
     ========================================================================== */
    var loginDiv = $('#login');
    var forgetDiv = $('#forgetPassword');
    var signUpDiv = $('#signUp');
    var loginModal = $('#loginModal');

    var registerModel = function () {
         loginDiv.add(forgetDiv).hide();
         signUpDiv.fadeIn(700);
    }

    var LoginModel = function () {
        signUpDiv.add(forgetDiv).hide();
        loginDiv.fadeIn(700);
    }

    $('#forgotFormBtn').on("click", function () {
        signUpDiv.add(loginDiv).hide();
        forgetDiv.fadeIn(700).css({"margin-top": "30px"});
        return false;
    });

    $('.login-btn').on("click", function () {
      loginModal.modal('show');
      LoginModel();
      return false;
    });
    $('#modal-login-btn').on("click", function () {
      LoginModel();
      return false;
    });

    $('#signUpModal').on("click", function () {
      registerModel();
      return false
    });

    $('.sign-up-btn').on("click", function () {
      loginModal.modal('show');
      registerModel();
      return false
    });

    $('#formloginModal').on("click", function () {
      LoginModel();
      return false
    });

    /* PAGE SCROLL ANIMATION
     ========================================================================== */
    $(document).on('click', 'a.page-scroll', function (event) {
      var $anchor = $(this);
      $('html,body').stop().animate({
        scrollTop: $($anchor.attr('href')).offset().top
      }, 1500, 'easeInOutExpo');
      event.preventDefault();
    });

  });


  /*(2) COLLAPSE NAVBAR ON SCROLL
   ========================================================================== */
  $(window).on('scroll', function () {
    var navBarFixTop = $('.navbar-fixed-top');
    if ($('.navbar').offset().top > 50) {
      navBarFixTop.addClass('top-nav-collapse').css('background', '#526193');
    } else {
      navBarFixTop.removeClass('top-nav-collapse').css('background', 'transparent');
    }
  });


  /*(3) BACK TO TOP BUTTON
   ========================================================================== */





  /*(5) CONTACT FORM
   ========================================================================== */
  $('#contact-submit').on("click", function () {
    var un = $('#fullName').val();
    var em = $('#email').val();
    var msg = $('#message').val();
    $.ajax({
      type: "POST",
      url: "ajaxmail.php",
      data: {
        'username': un,
        'email': em,
        'msg': msg,
      },
      success: function (message) {
        var response = JSON.parse(message);
        if (response.status === 'success') {
          $('.contact-form')[0].reset();
        }
        $('#error_contact').html(response.message);
      }
    });
  });

  /*(6) SUBSCRIBE FORM
   ========================================================================== */
  $('#subscribe-submit').on("click", function () {
    var subscribeMail = $('#subscribe-email');
    var em = subscribeMail.val();
    $.ajax({
      type: "POST",
      url: "subscribemail.php",
      data: {
        'email': em,
      },
      success: function (message) {
        subscribeMail.removeClass('subscriber-success');
        subscribeMail.removeClass('subscriber-error');
        var response = JSON.parse(message);
        if (response.status === 'success') {
          subscribeMail.addClass('subscriber-success');

        } else {
          subscribeMail.addClass('subscriber-error');
        }
        subscribeMail.attr("placeholder", response.message);
        subscribeMail.val("");
      }
    });
  });


  /*(7) WOW JS
   ========================================================================== */

  var wow = new WOW(
    {
      boxClass: 'wow',      // animated element css class (default is wow)
      animateClass: 'animated', // animation css class (default is animated)
      offset: 10,          // distance to the element when triggering the animation (default is 0)
      mobile: true,       // trigger animations on mobile devices (default is true)
      live: true,
      // act on asynchronously loaded content (default is true)
      callback: function (box) {
        // the callback is fired every time an animation is started
        // the argument that is passed in is the DOM node being animated
      },
      scrollContainer: null // optional scroll container selector, otherwise use window
    }
  );
  wow.init();


  /*(8) MOBILE MENU
   ========================================================================== */

  if ('ontouchstart' in window) {
    var click = 'touchstart';
  }
  else {
    var click = 'click';
  }

  var burgerDiv = 'div.burger';
  var xDiv = 'div.x';
  var yDiv = 'div.y';
  var zDiv = 'div.z';
  var menuBg = 'div.menu-bg';
  var menuLi = '.menu li';
  var screen = '.screen';

  $(burgerDiv).on(click, function () {
    if (!$(this).hasClass('open')) {
      openMenu();
    }
    else {
      closeMenu();
    }
  });


  $('div.menu ul li a').on(click, function () {
    closeMenu();
  });

  function openMenu() {
    $(`${menuBg},${menuLi}`).addClass('animate');
    $(burgerDiv).addClass('open');
    $(`${xDiv}, ${zDiv}`).addClass('collapse');
    $(screen).show();

    setTimeout(function () {
      $(yDiv).hide();
      $(xDiv).addClass('rotate30');
      $(zDiv).addClass('rotate150');
    }, 70);
    setTimeout(function () {
      $(xDiv).addClass('rotate45');
      $(zDiv).addClass('rotate135');
    }, 120);

  }

  function closeMenu() {
    $(menuLi).removeClass('animate');
    setTimeout(function () {
      $(burgerDiv).removeClass('open');
      $(xDiv).removeClass('rotate45').addClass('rotate30');
      $(zDiv).removeClass('rotate135').addClass('rotate150');
      $(menuBg).removeClass('animate');
      $(screen).hide();

      setTimeout(function () {
        $(xDiv).removeClass('rotate30');
        $(zDiv).removeClass('rotate150');
      }, 50);
      setTimeout(function () {
        $(yDiv).show();
        $(`${xDiv},${zDiv}`).removeClass('collapse');
      }, 70);
    }, 100);

  }

  /*(9) INPUT FIELD EFFECT
   ========================================================================== */
  if (!String.prototype.trim) {
    (function () {
      // Make sure we trim BOM and NBSP
      var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
      String.prototype.trim = function () {
        return this.replace(rtrim, '');
      };
    })();
  }
  var inputFilled = 'input--filled';

  [].slice.call(document.querySelectorAll('input.input__field')).forEach(function (inputEl) {
    // in case the input is already filled..
    if (inputEl.value.trim() !== '') {
      classie.add(inputEl.parentNode, inputFilled);
    }

    // events:
    inputEl.addEventListener('focus', onInputFocus);
    inputEl.addEventListener('blur', onInputBlur);
  });

  [].slice.call(document.querySelectorAll('textarea.input__field')).forEach(function (inputEl) {
    // in case the input is already filled..
    if (inputEl.value.trim() !== '') {
      classie.add(inputEl.parentNode, inputFilled);
    }

    // events:
    inputEl.addEventListener('focus', onInputFocus);
    inputEl.addEventListener('blur', onInputBlur);
  });


  function onInputFocus(ev) {
    classie.add(ev.target.parentNode, inputFilled);
  }

  function onInputBlur(ev) {
    if (ev.target.value.trim() === '') {
      classie.remove(ev.target.parentNode, inputFilled);
    }
  }

//sendform

function sendform(form) {
  var request = $.ajax({
                    url: "https://workersapp.herokuapp.com/request-form",
                    type: "POST",
                    data: form,
                    dataType: "json"
                    });
}
function payment(email) {
  var request = $.ajax({
                    url: "https://workersapp.herokuapp.com/payment_button",
                    type: "POST",
                    data: {"email":email},
                    dataType: "json"
                    });
}

//reset on click
document.getElementById('btn_sup_free').addEventListener('click', function(e) {
  $('#request_sent_1').attr('style', "display:none;");
  $('#contact-form_sup_free').attr('style', "");
  $('#contact-form_sup_free')[0].reset();
})

document.getElementById('btn_sup_2').addEventListener('click', function(e) {
  $('#request_sent_2').attr('style', "display:none;");
  $('#request_sent_2_p').attr('style', "display:none;");

  $('#contact-form_sup_2').attr('style', "");
  $('#contact-form_sup_2')[0].reset();
})

document.getElementById('btn_sup_3').addEventListener('click', function(e) {
  $('#request_sent_3').attr('style', "display:none;");
  $('#request_sent_3_p').attr('style', "display:none;");
  $('#contact-form_sup_3').attr('style', "");
  $('#contact-form_sup_3')[0].reset();
})

document.getElementById('btn_sup_4').addEventListener('click', function(e) {
  $('#request_sent_4').attr('style', "display:none;");
  $('#contact-form_sup_4').attr('style', "");
  $('#contact-form_sup_4')[0].reset();
})

document.getElementById('btn_sup_5').addEventListener('click', function(e) {
  $('#request_sent_5').attr('style', "display:none;");
  $('#request_sent_5_p').attr('style', "display:none;");

  $('#contact-form_sup_5').attr('style', "");
  $('#contact-form_sup_5')[0].reset();
})



//pricing buttons
  $('#contact-form_sup_free').on('submit', function(e) {
  //document.getElementById('btn_sup_free_s').addEventListener('submit', function(e) {
      e.preventDefault()

      var formData = $('#contact-form_sup_free').serializeArray().reduce(function(a, x) { a[x.name] = x.value; return a; }, {});
      formData["previous_url"] = document.referrer
      sendform(formData)

      console.log(formData)
      var style = "width:" + $('#body_sup_1').width().toString() + "px;height:" + $('#body_sup_1').height().toString() + "px;"
      console.log($('#request_sent_1'))
      $('#request_sent_1').attr('style', style);
      $('#contact-form_sup_free').attr('style', "display:none;");
      localStorage.setItem('email', formData["email"]);

})
$('#contact-form_sup_2').on('submit', function(e) {
//document.getElementById('btn_sup_2_s').addEventListener('click', function(e) {

    var formData = $('#contact-form_sup_2').serializeArray().reduce(function(a, x) { a[x.name] = x.value; return a; }, {});
    sendform(formData)

    console.log(formData)
    var style = "width:" + $('#body_sup_2').width().toString() + "px;height:" + $('#body_sup_2').height().toString() + "px;"
    console.log($('#request_sent_2'))
    $('#request_sent_2').attr('style', style);
    $('#contact-form_sup_2').attr('style', "display:none;");
    localStorage.setItem('email', formData["email"]);
    e.preventDefault()

})
$('#contact-form_sup_3').on('submit', function(e) {
//document.getElementById('btn_sup_3_s').addEventListener('click', function(e) {
    e.preventDefault()
    var formData = $('#contact-form_sup_3').serializeArray().reduce(function(a, x) { a[x.name] = x.value; return a; }, {});
    sendform(formData)

    console.log(formData)
    var style = "width:" + $('#body_sup_3').width().toString() + "px;height:" + $('#body_sup_3').height().toString() + "px;"
    console.log($('#request_sent_3'))
    $('#request_sent_3').attr('style', style);
    $('#contact-form_sup_3').attr('style', "display:none;");
    localStorage.setItem('email', formData["email"]);


})

$('#contact-form_sup_4').on('submit', function(e) {
//document.getElementById('btn_sup_3_s').addEventListener('click', function(e) {
    e.preventDefault()
    var formData = $('#contact-form_sup_3').serializeArray().reduce(function(a, x) { a[x.name] = x.value; return a; }, {});
    sendform(formData)

    console.log(formData)
    var style = "width:" + $('#body_sup_4').width().toString() + "px;height:" + $('#body_sup_4').height().toString() + "px;"
    console.log($('#request_sent_3'))
    $('#request_sent_4').attr('style', style);
    $('#contact-form_sup_4').attr('style', "display:none;");
    localStorage.setItem('email', formData["email"]);



})
$('#contact-form_sup_5').on('submit', function(e) {
//document.getElementById('btn_sup_3_s').addEventListener('click', function(e) {
    e.preventDefault()
    var formData = $('#contact-form_sup_5').serializeArray().reduce(function(a, x) { a[x.name] = x.value; return a; }, {});
    sendform(formData)

    console.log(formData)
    var style = "width:" + $('#body_sup_5').width().toString() + "px;height:" + $('#body_sup_5').height().toString() + "px;"
    console.log($('#request_sent_3'))
    $('#request_sent_5').attr('style', style);
    $('#contact-form_sup_5').attr('style', "display:none;");
    localStorage.setItem('email', formData["email"]);


})
//Pay buttons
document.getElementById('btn_sup_2_p').addEventListener('click', function(e) {
    e.preventDefault()
    //var formData = $('#contact-form_sup_3').serializeArray().reduce(function(a, x) { a[x.name] = x.value; return a; }, {});
    //console.log(formData)
    var style = "width:" + $('#body_sup_2').width().toString() + "px;height:" + $('#body_sup_2').height().toString() + "px;"
    console.log($('#request_sent_2_p'))
    $('#request_sent_2_p').attr('style', style);
    $('#request_sent_2').attr('style', "display:none;");
    payment(localStorage.getItem('email'))



})

document.getElementById('btn_sup_3_p').addEventListener('click', function(e) {
    e.preventDefault()
    //var formData = $('#contact-form_sup_3').serializeArray().reduce(function(a, x) { a[x.name] = x.value; return a; }, {});
    //console.log(formData)
    var style = "width:" + $('#body_sup_3').width().toString() + "px;height:" + $('#body_sup_3').height().toString() + "px;"
    console.log($('#request_sent_3_p'))
    $('#request_sent_3_p').attr('style', style);
    $('#request_sent_3').attr('style', "display:none;");
    payment(localStorage.getItem('email'))

})

document.getElementById('btn_sup_5_p').addEventListener('click', function(e) {
    e.preventDefault()
    //var formData = $('#contact-form_sup_3').serializeArray().reduce(function(a, x) { a[x.name] = x.value; return a; }, {});
    //console.log(formData)
    var style = "width:" + $('#body_sup_5').width().toString() + "px;height:" + $('#body_sup_5').height().toString() + "px;"
    console.log($('#request_sent_5_p'))
    $('#request_sent_5_p').attr('style', style);
    $('#request_sent_5').attr('style', "display:none;");
    payment(localStorage.getItem('email'))

})

//analytics
<!-- Global site tag (gtag.js) - Google Analytics -->


  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-85033665-5');



//hotjar


    (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:724187,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');


//intercom

  window.intercomSettings = {
    app_id: "dtn6xl4q"
  };

(function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',intercomSettings);}else{var d=document;var i=function(){i.c(arguments)};i.q=[];i.c=function(args){i.q.push(args)};w.Intercom=i;function l(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/dtn6xl4q';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);}if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})()





})();
