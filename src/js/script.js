window.addEventListener("DOMContentLoaded", () => {
  $("a[href]").on("click", function (event) {
    event.preventDefault();
    var id = $(this).attr("href"),
      top = $(id).offset().top;
    $("body,html").animate({ scrollTop: top }, 1500);
  });

  $("img.img-svg").each(function () {
    var $img = $(this);
    var imgClass = $img.attr("class");
    var imgURL = $img.attr("src");
    $.get(
      imgURL,
      function (data) {
        var $svg = $(data).find("svg");
        if (typeof imgClass !== "undefined") {
          $svg = $svg.attr("class", imgClass + " replaced-svg");
        }
        $svg = $svg.removeAttr("xmlns:a");
        if (
          !$svg.attr("viewBox") &&
          $svg.attr("height") &&
          $svg.attr("width")
        ) {
          $svg.attr(
            "viewBox",
            "0 0 " + $svg.attr("height") + " " + $svg.attr("width")
          );
        }
        $img.replaceWith($svg);
      },
      "xml"
    );
  });

  const menu = () => {
    const menu = document.querySelector(".header__menu");
    const menuItem = document.querySelectorAll(".header__item");
    const hamburger = document.querySelector(".hamburger");

    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("hamburger_active");
      menu.classList.toggle("header__menu_active");

      if (hamburger.classList.contains("hamburger_active")) {
        document.body.style.cssText = "overflow: hidden";
      } else {
        document.body.style.cssText = "overflow: auto";
      }
    });

    menuItem.forEach((item) => {
      item.addEventListener("click", () => {
        document.body.style.cssText = "overflow: auto";
        hamburger.classList.toggle("hamburger_active");
        menu.classList.toggle("header__menu_active");
      });
    });
  };

  function servicesTabs() {
    $(".services").each(function () {
      let ths = $(this);
      ths.find(".services__content").not(":first").hide();
      ths
        .find(".services__tab")
        .click(function () {
          ths
            .find(".services__tab")
            .removeClass("services__tab_active")
            .eq($(this).index())
            .addClass("services__tab_active");
          ths.find(".services__content").hide().eq($(this).index()).fadeIn();
        })
        .eq(0)
        .addClass("active");
    });
  }

  const formSender = () => {
    const btn = document.querySelector(".request-form__button");
    const btnText = document.querySelector(".request-form__button-text");
    const btnSpinner = document.querySelector(".request-form__button-spinner");
    const phoneInput = document.getElementsByName("phone");

    new Inputmask("+48 (999) 999 999").mask(phoneInput);

    $(".request-form__form").on("submit", function () {
      btn.disabled = true;
      btnText.style.opacity = "0";
      btnSpinner.style.opacity = "1";
      const form = $(this);

      $.ajax({
        url: "/php/mail.php",
        method: form.attr("method"),
        data: form.serialize(),
        success: function (result) {
          btn.disabled = false;
          btnText.style.opacity = "1";
          btnSpinner.style.opacity = "0";

          document.querySelectorAll("input").forEach((item) => {
            item.value = "";
          });

          if (result) {
            $(".modal").fadeIn("slow");
          }
        },
      });

      return false;
    });

    $(".modal__button").on("click", function () {
      $(".modal").fadeOut("slow");
    });
  };

  menu();
  servicesTabs();
  formSender();
});
