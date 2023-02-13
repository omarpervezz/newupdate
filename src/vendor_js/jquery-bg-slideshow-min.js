/**
 * Author  : Sunil Samuel (web_github@sunilsamuel.com)
 * License : GPLv3
 * GIT URL : https://github.com/sunil-samuel/jquery-responsive-background-slideshow
 * Version: 1.5
 */
!(function (e) {
  (e.fn.bgSlideShow = function (n) {
    var t = new Array(),
      a = e.extend(
        {
          current: -1,
          images: [],
          transitionDelay: 5e3,
          transitionSpeed: 3e3,
          transitionEffect: "fade-in",
          randomize: !1,
          initialBackground: null,
          debug: !1,
          eventHandlers: {
            beforeInit: null,
            afterInit: null,
            beforeChange: null,
            afterChange: null,
          },
          slideControls: { enabled: !0, classes: null },
        },
        n
      );
    return this.each(function (n, t) {
      var i = (function (n, t) {
        var i = {};
        (i.uniqueId =
          ((a = n),
          (s = e(a).attr("id")),
          s ||
            (s =
              "ABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(
                Math.floor(Math.random() * "ABCDEFGHIJKLMNOPQRSTUVWXYZ".length)
              ) + Date.now()),
          s)),
          (i.current = e(n).data("current") || t.current || 0),
          (i.images = t.images),
          (i.slideControls = t.slideControls),
          (i.slideControls.enabled =
            e(n).data("slidecontrols.enabled") || t.slideControls.enabled),
          (i.slideControls.classes =
            e(n).data("slidecontrols.classes") || t.slideControls.classes),
          e(n).data("images") &&
            (i.images = e(n)
              .data("images")
              .split(",")
              .map((e) => e.trim()));
        var a, s;
        return (
          (i.initialBackground =
            e(n).data("initialbackground") || t.initialBackground),
          (i.transitionDelay =
            e(n).data("transitiondelay") || t.transitionDelay),
          (i.transitionSpeed =
            e(n).data("transitionspeed") || t.transitionSpeed),
          (i.transitionEffect =
            e(n).data("transitioneffect") || t.transitionEffect),
          (i.randomize = r(e(n).data("randomize"), t.randomize)),
          (i.debug = r(e(n).data("debug"), t.debug)),
          (i.eventHandlers = t.eventHandlers),
          (i.defaultDisplay = e(n).css("display") || "block"),
          i
        );
      })(this, a);
      i.eventHandlers.beforeInit && i.eventHandlers.beforeInit(this, i),
        (function (n, t) {
          s(t.debug, "ProcessShow with element [" + n + "]"),
            e(n).data("bgSlideShowApplied", !0),
            (function (n, t) {
              if (!t.initialBackground) return;
              s(t.debug, "Setting initial image");
              var i = t.initialBackground,
                a = "";
              if (!isNaN(i) && i < t.images.length)
                (a = t.images[i]), (t.current = i + 1);
              else if ("random" == i.toLowerCase()) {
                var r = t.randomize;
                (t.randomize = !0), (a = l(t)), (t.randomize = r);
              } else a = t.initialBackground;
              e(n).css("background-image", "url(" + a + ")");
            })(n, t),
            u(t.images),
            (t.wrapBgElement = e("<div/>", {
              class: "jquery-bg-slideshow-wrap-bg-element",
              id: t.uniqueId + "-wrap-widget",
            })),
            e(n).wrap(t.wrapBgElement);
          var i = e(n).css("position", "absolute");
          (function (n, t, i) {
            if (
              (s(i.debug, "List controls enabled: " + i.slideControls.enabled),
              1 == i.slideControls.enabled)
            ) {
              i.slideControlsElement = e("<div/>", {
                class:
                  "jquery-bg-slideshow-list-control-element" +
                  (i.slideControls.classes
                    ? " " + i.slideControls.classes
                    : ""),
              });
              for (var a = i.images.length, r = 0; r < a; r++) {
                var l = i.uniqueId + "-image" + r;
                e("<div/>", {
                  class: "jquery-bg-slideshow-list-control-image-element",
                  id: l,
                }).appendTo(i.slideControlsElement);
              }
              e(t).append(i.slideControlsElement),
                e("[id^='" + i.uniqueId + "-image']")
                  .off("click")
                  .on("click", function () {
                    e(i.cloned).remove();
                    var t = e(this).attr("id"),
                      a = parseInt(t.match(/-image(\d+)/)[1]);
                    (i.current = a + 1),
                      e(n).css("background-image", "url(" + i.images[a] + ")"),
                      d(i, i.current - 1),
                      console.log("clicked on [" + e(this).attr("id") + "]");
                  });
            }
          })(n, i.parent(), t),
            s(t.debug, "Setting timeout for element [" + n + "]"),
            d(t, t.current),
            (t.timerId = setTimeout(o, t.transitionDelay, n, t));
        })(this, i),
        i.eventHandlers.afterInit && i.eventHandlers.afterInit(this, i),
        s(i.debug, "Done processing element [" + t + "] number [" + n + "]");
    });
    function r(e, n) {
      return void 0 === e
        ? n
        : "boolean" == typeof e
        ? e
        : (e = e.trim().toLowerCase()).startsWith("t") ||
          e.startsWith("y") ||
          1 == e;
    }
    function s(e, n) {
      e && console.log(n);
    }
    function l(e) {
      if (e.randomize) {
        for (var n = e.current; n == e.current; )
          n = Math.floor(Math.random() * e.images.length);
        return (e.current = n), e.images[n];
      }
      e.current >= e.images.length && (e.current = 0);
      var t = e.images[e.current];
      return (e.current = e.current + 1), t;
    }
    function o(n, t) {
      s(t.debug, "Calling timer for element [" + n + "]"),
        (function (n, t, i) {
          t.eventHandlers.beforeChange && t.eventHandlers.beforeChange(n, t, i);
          e(t.cloned).length && e(t.cloned).remove();
          (t.cloned = e(n).clone()),
            e(t.cloned)
              .addClass("jquery-bg-slideshow-cloned")
              .css({ "background-image": "url(" + i + ")" })
              .insertAfter(e(n)),
            e(t.cloned).css("display", t.defaultDisplay),
            s(t.debug, "Before element fadeout"),
            e(n)
              .stop()
              .fadeOut(t.transitionSpeed, function () {
                s(t.debug, "Fading out is done - should remove cloned element"),
                  e(this).css({
                    "background-image": "url(" + i + ")",
                    position: "absolute",
                    display: t.defaultDisplay,
                  }),
                  t.eventHandlers.afterChange &&
                    t.eventHandlers.afterChange(n, t, i),
                  d(t, t.current),
                  (t.timerId = setTimeout(o, t.transitionDelay, n, t));
              });
        })(n, t, l(t));
    }
    function d(n, t) {
      if (n.slideControls.enabled) {
        var i = "#" + n.uniqueId + "-image" + t;
        e("[id^='" + n.uniqueId + "-image']").removeClass(
          "jquery-bg-slideshow-list-control-image-active-element"
        ),
          e(i).addClass(
            "jquery-bg-slideshow-list-control-image-active-element"
          );
      }
    }
    function u(e) {
      for (i = 0; i < e.length; i++) {
        var n = u.length;
        (t[n] = new Image()), (t[n].src = e[i]);
      }
    }
  }),
    (e.fn.bgSlideshowApplied = function () {
      return 1 == e(this).data("bgSlideShowApplied");
    });
})(jQuery);
