var jQuery, Adapter, mskpda = null;
jQuery(document).ready(function() {
    var t, e, o, n, s, r, a, h, l, p;
    mskpda = (t = window,
        e = document,
        s = (o = jQuery)(t),
        r = o(e),
        a = jQuery(e.body),
        h = s.scrollTop(),
        l = {},
        t.Cookies,
        l.settings = {
            menuMaxWidth: 992,
            isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(t.navigator.userAgent),
            isAppleDevice: /iPhone|iPad|iPod/i.test(t.navigator.userAgent),
            popUpActive: !!o(".popup-active").length,
            originalScroll: 0
        },
        p = {
            toggleButtonContentUniversal: function(t, e) {
                t.classList.contains("active") ? (e && (t.firstElementChild.innerHTML = e.default),
                    t.classList.remove("active")) : (e && (t.firstElementChild.innerHTML = e.active),
                    t.classList.add("active"))
            },
            toggleContentHeight: function(t, e) {
                if (t.classList.contains("active")) {
                    var o = e.firstElementChild.offsetHeight;
                    e.style.height = o + "px"
                } else
                    e.style.height = "0px"
            },
            methodsExists: function(t, e) {
                if (e === n || t === n)
                    return !1;
                "string" != typeof t || (t = [t]);
                for (var o = 0; o < t.length; o++)
                    if (n === e[t[o]])
                        return !1;
                return !0
            },
            debug: function(e, o) {
                p.methodsExists(["log", "dir"], t.console) && (("string" == typeof o && t.console.log(o),
                "string" == typeof e) ? t.console.log(e) : t.console.dir(e))
            },
            randomInt: function(t, e) {
                return Math.floor(Math.random() * (e - t + 1)) + t
            },
            scrollingUp: function(t) {
                var e = !1;
                return t < h && (e = !0),
                    console.log(h),
                    h = t,
                    e
            },
            removeModal: function(t) {
                t.preventDefault(),
                    o(".modal").remove()
            },
            mobMenuInit: function(t) {
                var e = t.find(".mobile__menu");
                o(".mobile_menu__item.current").parents(".mobile_menu__item").addClass("active"),
                    e.find(".active > ul").show(),
                    e.find(".active > .mobile_submenu__toggle .fa-angle-down").removeClass("fa-angle-down").addClass("fa-angle-up")
            },
            mobMenuShow: function(t) {
                a.addClass("menu-mobile-active"),
                    t.find(".menu_toggle__open").removeClass("menu_toggle__open").addClass("menu_toggle__close"),
                    t.find(".mobile__menu").slideDown(),
                    t.parent().find(".navigation__account").removeClass("arrow"),
                    t.parent().parent().find(".navigation__account__menu").stop().slideUp(),
                    t.parent().find(".mobile__search").removeClass("arrow"),
                    t.parent().parent().find(".mobile__searchfield").stop().slideUp()
            },
            mobMenuHide: function(t) {
                a.removeClass("menu-mobile-active"),
                    t.find(".menu_toggle__close").removeClass("menu_toggle__close").addClass("menu_toggle__open"),
                    t.find(".mobile__menu").slideUp()
            },
            mobMenuToggle: function() {
                var t = o("#navigation-mobile");
                a.hasClass("menu-mobile-active") ? p.mobMenuHide(t) : p.mobMenuShow(t)
            },
            mobSubmenuShow: function(t) {
                var e = t.children(".nav-child")
                    , o = t.children(".mobile_submenu__toggle").children()
                    , n = t.siblings(".parent.active");
                t.addClass("active"),
                    e.slideDown(),
                    o.removeClass("fa-angle-down").addClass("fa-angle-up");
                for (var s = 0; s < n.length; s++)
                    p.mobSubmenuHide(n.eq(s))
            },
            mobSubmenuHide: function(t) {
                var e = t.children(".nav-child")
                    , o = t.children(".mobile_submenu__toggle").children()
                    , n = e.find(".parent.active");
                t.removeClass("active"),
                    e.slideUp(),
                    o.removeClass("fa-angle-up").addClass("fa-angle-down");
                for (var s = 0; s < n.length; s++)
                    p.mobSubmenuHide(n.eq(s))
            },
            mobSubmenuToggle: function(t) {
                t.hasClass("active") ? p.mobSubmenuHide(t) : p.mobSubmenuShow(t)
            },
            mobMenuClick: function(t) {
                var o = jQuery("#navigation-mobile .current-lang")
                    , n = e.querySelector(".navigation__mobile .lang-menu");
                o.hasClass("active") && (e.body.classList.remove("lang-open"),
                    p.toggleButtonContentUniversal(o[0]),
                    p.toggleContentHeight(o[0], n.firstElementChild)),
                    t.preventDefault(),
                    p.mobMenuToggle()
            },
            mobSubmenuClick: function(t) {
                t.preventDefault();
                var e = o(this).parent();
                p.mobSubmenuToggle(e)
            },
            isDesktop: function() {
                return s.width() >= 991
            },
            customCheckbox: function() {
                var t = o('input[type="checkbox"]');
                o(t).each(function() {
                    o(this).wrap("<span class='custom-checkbox'></span>"),
                    o(this).is(":checked") && o(this).parent().addClass("selected")
                }),
                    o(t).click(function() {
                        o(this).parent().toggleClass("selected")
                    })
            },
            smoothScroll: function() {
                if (location.pathname.replace(/^\//, "") === this.pathname.replace(/^\//, "") && location.hostname === this.hostname) {
                    var e = this.hash
                        , n = o(this.hash);
                    if ((n = n.length ? n : o("[name=" + this.hash.slice(1) + "]")).length)
                        return p.isDesktop() ? o("html,body").animate({
                            scrollTop: n.offset().top - 10
                        }, 1e3, function() {
                            t.location.hash = e
                        }) : o("html,body").animate({
                            scrollTop: n.offset().top - 90
                        }, 1e3),
                            !1
                }
            },
            winScrollDelayed: function() {
                t.didScroll && (t.didScroll = !1)
            },
            winScroll: function() {
                t.didScroll = !0
            },
            onAgeChange: function() {
                var t = o("#jform_age")
                    , e = o("#jform_email1-parent")
                    , n = o("#parentEmailBox");
                function s(t) {
                    var e = parseInt(o(t).val())
                        , n = parseInt(o(t).data("age"));
                    return !!isNaN(e) || !e || e > n
                }
                function r(t) {
                    if (s(t)) {
                        n.slideUp(),
                            e.attr("disabled", !0);
                        return
                    }
                    n.slideDown(),
                        e.attr("disabled", !1)
                }
                t.on("keyup", function(t) {
                    if (s(this)) {
                        n.slideUp(),
                            e.attr("disabled", !0);
                        return
                    }
                    setTimeout(r, 1500, this)
                })
            },
            initCustomTitles: function() {
                var t = o(".info-title");
                for (let e = 0; e < t.length; e++) {
                    var n = o(t[e]).data("title");
                    new Opentip(t[e],n,{
                        tipJoint: "top",
                        background: "#fff",
                        borderRadius: 0,
                        borderColor: "#ebebeb",
                        fixed: !0,
                        target: !0
                    })
                }
            },
            changeLocationHref: function() {
                var e = t.location.href;
                e.includes("#_=_") && (e = e.replace("#_=_", ""),
                    history.pushState({
                        param: "Value"
                    }, "", e))
            },
            initFirefoxStyle: function() {
                console.log("initFirefoxStyle"),
                    jQuery(".form-select").css({
                        padding: 0,
                        "text-indent": "6px"
                    })
            },
            domReady: function() {
                l.settings.isMobile ? a.addClass("is-mobile") : a.addClass("is-desktop");
                var t = o("#navigation-mobile");
                p.mobMenuInit(t),
                    t.find(".mobile_menu__toggle").click(p.mobMenuClick),
                    t.find(".mobile_submenu__toggle").click(p.mobSubmenuClick),
                    t.find(".mobile_menu__item.deeper > a").click(p.mobSubmenuClick),
                    p.customCheckbox(),
                    o("audio").audioPlayer(),
                    o(".navigation__account").click(function() {
                        var e = o(this).siblings(".mobile__search");
                        (a.hasClass("menu-mobile-active") || e.hasClass("arrow")) && (p.mobMenuHide(t),
                            o(this).parent().find(".mobile__search").removeClass("arrow"),
                            o(this).parent().parent().find(".mobile__searchfield").stop().slideUp()),
                            o(this).hasClass("arrow") ? (o(this).removeClass("arrow"),
                                o(this).parent().parent().find(".navigation__account__menu").stop().slideUp()) : (o(this).parent().parent().find(".navigation__account__menu").stop().slideDown(),
                                o(this).addClass("arrow"))
                    }),
                    o(".sdata").each(function() {
                        var t = o(this);
                        t.text(t.attr("title"))
                    }),
                -1 != navigator.userAgent.indexOf("Firefox") && (console.log(-1 != navigator.userAgent.indexOf("Firefox")),
                    p.initFirefoxStyle()),
                o("#jform_age").length && p.onAgeChange(),
                    p.changeLocationHref(),
                    p.initCustomTitles(),
                    s.scroll(p.winScroll),
                    setInterval(p.winScrollDelayed, 100),
                    o("#parentEmailBox").hide()
            },
            imgReady: function() {}
        },
        r.ready(p.domReady),
        s.on("load", p.imgReady),
        p)
}),
    jQuery(document).ready(function() {
        var t = jQuery(document.body)
            , e = jQuery("#navigation-mobile")
            , o = document.querySelector(".navigation__mobile .lang_button .current-lang")
            , n = document.querySelector(".navigation__mobile .lang-menu");
        t.on("click", function(e) {
            if (t.hasClass("lang-open")) {
                for (var s = jQuery(e.target); "BODY" != s.prop("tagName"); ) {
                    if (s.hasClass("current-lang"))
                        return;
                    s = s.parent()
                }
                mskpda.toggleButtonContentUniversal(o),
                    o.classList.contains("active") ? document.body.classList.add("lang-open") : document.body.classList.remove("lang-open"),
                    mskpda.toggleContentHeight(o, n.firstElementChild)
            }
        }),
        o && (o.onclick = function(s) {
                t.hasClass("menu-mobile-active") && mskpda.mobMenuHide(e),
                    mskpda.toggleButtonContentUniversal(this),
                    o.classList.contains("active") ? document.body.classList.add("lang-open") : document.body.classList.remove("lang-open"),
                    mskpda.toggleContentHeight(this, n.firstElementChild)
            }
        ),
        jQuery("#contact").length && jQuery("#contact .button[type=submit]").on("click", function() {
            jQuery("html, body").animate({
                scrollTop: 0
            }, 100)
        })
    }),
    function(t, e, o, n) {
        var s = "ontouchstart"in e
            , r = s ? "touchstart" : "mousedown"
            , a = s ? "touchmove" : "mousemove"
            , h = s ? "touchcancel" : "mouseup"
            , l = function(t) {
            var e = Math.floor(t / 3600)
                , o = Math.floor(t % 3600 / 60)
                , n = Math.ceil(t % 3600 % 60);
            return (0 == e ? "" : e > 0 && e.toString().length < 2 ? "0" + e + ":" : e + ":") + (o.toString().length < 2 ? "0" + o : o) + ":" + (n.toString().length < 2 ? "0" + n : n)
        }
            , p = function(t) {
            var e = o.createElement("audio");
            return !!(e.canPlayType && e.canPlayType("audio/" + t.split(".").pop().toLowerCase() + ";").replace(/no/, ""))
        };
        t.fn.audioPlayer = function(e) {
            var e = t.extend({
                classPrefix: "audioplayer",
                strPlay: "Play",
                strPause: "Pause"
            }, e)
                , o = {}
                , n = {
                playPause: "playpause",
                playing: "playing",
                time: "time",
                timeCurrent: "time-current",
                timeDuration: "time-duration",
                bar: "bar",
                barLoaded: "bar-loaded",
                barPlayed: "bar-played",
                mute: "mute",
                mini: "mini"
            };
            for (var d in n)
                o[d] = e.classPrefix + "-" + n[d];
            return this.each(function() {
                if ("audio" != t(this).prop("tagName").toLowerCase())
                    return !1;
                var n = t(this)
                    , d = n.attr("src")
                    , u = n.get(0).getAttribute("autoplay")
                    , u = "" === u || "autoplay" === u
                    , c = n.get(0).getAttribute("loop")
                    , c = "" === c || "loop" === c
                    , f = !1;
                void 0 === d ? n.find("source").each(function() {
                    if (void 0 !== (d = t(this).attr("src")) && p(d))
                        return f = !0,
                            !1
                }) : p(d) && (f = !0);
                var g = t('<div class="' + e.classPrefix + '">' + (f ? t("<div>").append(n.eq(0).clone()).html() : '<embed src="' + d + '" width="0" height="0" volume="100" autostart="' + u.toString() + '" loop="' + c.toString() + '" />') + '<div class="' + o.playPause + '" title="' + e.strPlay + '"><a href="#">' + e.strPlay + "</a></div></div>")
                    , m = f ? g.find("audio") : g.find("embed")
                    , m = m.get(0);
                if (f) {
                    g.find("audio").css({
                        width: 0,
                        height: 0,
                        visibility: "hidden"
                    }),
                        g.append('<div class="' + o.time + " " + o.timeCurrent + '"></div><div class="' + o.bar + '"><div class="' + o.barLoaded + '"></div><div class="' + o.barPlayed + '"></div></div><div class="' + o.time + " " + o.timeDuration + '"></div>');
                    var v = g.find("." + o.bar)
                        , y = g.find("." + o.barPlayed)
                        , b = g.find("." + o.barLoaded)
                        , w = g.find("." + o.timeCurrent)
                        , _ = g.find("." + o.timeDuration)
                        , x = function(t) {
                        theRealEvent = s ? t.originalEvent.touches[0] : t,
                            m.currentTime = Math.round(m.duration * (theRealEvent.pageX - v.offset().left) / v.width())
                    }
                        , C = function() {
                        isNaN(m.duration) ? b.width("0%") : b.width(m.buffered.end(0) / m.duration * 100 + "%")
                    };
                    _.html("&hellip;"),
                        w.text(l(0)),
                        m.addEventListener("loadeddata", function() {
                            _.text(l(m.duration))
                        }),
                        m.addEventListener("timeupdate", function() {
                            w.text(l(m.currentTime)),
                                y.width(m.currentTime / m.duration * 100 + "%")
                        }),
                        m.addEventListener("progress", C),
                        m.addEventListener("ended", function() {
                            g.removeClass(o.playing)
                        }),
                        v.on(r, function(t) {
                            x(t),
                                v.on(a, function(t) {
                                    x(t)
                                })
                        }).on(h, function() {
                            v.unbind(a)
                        })
                } else
                    g.addClass(o.mini);
                u && g.addClass(o.playing),
                    g.find("." + o.playPause).on("click", function() {
                        return g.hasClass(o.playing) ? (t(this).attr("title", e.strPlay).find("a").html(e.strPlay),
                            g.removeClass(o.playing),
                            f ? m.pause() : m.Stop()) : (t(this).attr("title", e.strPause).find("a").html(e.strPause),
                            g.addClass(o.playing),
                            f ? m.play() : m.Play()),
                            !1
                    }),
                    n.replaceWith(g)
            }),
                this
        }
    }(jQuery, window, document);
var Opentip, firstAdapter, i, mouseMoved, mousePosition, mousePositionObservers, position, vendors, _i, _len, _ref, __slice = [].slice, __indexOf = [].indexOf || function(t) {
    for (var e = 0, o = this.length; e < o; e++)
        if (e in this && this[e] === t)
            return e;
    return -1
}
    , __hasProp = {}.hasOwnProperty;
for (Opentip = function() {
    function t(e, o, n, s) {
        var r, a, h, l, p, d, u, c, f, g, m, v, y, b, w = this;
        if (this.id = ++t.lastId,
            this.debug("Creating Opentip."),
            t.tips.push(this),
            this.adapter = t.adapter,
            (r = this.adapter.data(e, "opentips") || []).push(this),
            this.adapter.data(e, "opentips", r),
            this.triggerElement = this.adapter.wrap(e),
        this.triggerElement.length > 1)
            throw Error("You can't call Opentip on multiple elements.");
        if (this.triggerElement.length < 1)
            throw Error("Invalid element.");
        for (this.loaded = !1,
                 this.loading = !1,
                 this.visible = !1,
                 this.waitingToShow = !1,
                 this.waitingToHide = !1,
                 this.currentPosition = {
                     left: 0,
                     top: 0
                 },
                 this.dimensions = {
                     width: 100,
                     height: 50
                 },
                 this.content = "",
                 this.redraw = !0,
                 this.currentObservers = {
                     showing: !1,
                     visible: !1,
                     hiding: !1,
                     hidden: !1
                 },
                 s = this.adapter.clone(s),
                 "object" == typeof o ? (s = o,
                     o = n = void 0) : "object" == typeof n && (s = n,
                     n = void 0),
             null != n && (s.title = n),
             null != o && this.setContent(o),
             null == s.extends && (null != s.style ? s.extends = s.style : s.extends = t.defaultStyle),
                 l = [s],
                 b = s; b.extends; ) {
            if (d = b.extends,
            null == (b = t.styles[d]))
                throw Error("Invalid style: " + d);
            l.unshift(b),
            null == b.extends && "standard" !== d && (b.extends = "standard")
        }
        for ((s = (m = this.adapter).extend.apply(m, [{}].concat(__slice.call(l)))).hideTriggers = function() {
            var t, e, o, n;
            for (n = [],
                     t = 0,
                     e = (o = s.hideTriggers).length; t < e; t++)
                a = o[t],
                    n.push(a);
            return n
        }(),
             s.hideTrigger && 0 === s.hideTriggers.length && s.hideTriggers.push(s.hideTrigger),
                 u = 0,
                 f = (v = ["tipJoint", "targetJoint", "stem"]).length; u < f; u++)
            s[p = v[u]] && "string" == typeof s[p] && (s[p] = new t.Joint(s[p]));
        for (!s.ajax || !0 !== s.ajax && s.ajax || ("A" === this.adapter.tagName(this.triggerElement) ? s.ajax = this.adapter.attr(this.triggerElement, "href") : s.ajax = !1),
             "click" === s.showOn && "A" === this.adapter.tagName(this.triggerElement) && this.adapter.observe(this.triggerElement, "click", function(t) {
                 return t.preventDefault(),
                     t.stopPropagation(),
                     t.stopped = !0
             }),
             s.target && (s.fixed = !0),
             !0 === s.stem && (s.stem = new t.Joint(s.tipJoint)),
                 !0 === s.target ? s.target = this.triggerElement : s.target && (s.target = this.adapter.wrap(s.target)),
                 this.currentStem = s.stem,
             null == s.delay && (s.delay = "mouseover" === s.showOn ? .2 : 0),
             null == s.targetJoint && (s.targetJoint = new t.Joint(s.tipJoint).flip()),
                 this.showTriggers = [],
                 this.showTriggersWhenVisible = [],
                 this.hideTriggers = [],
             s.showOn && "creation" !== s.showOn && this.showTriggers.push({
                 element: this.triggerElement,
                 event: s.showOn
             }),
             null != s.ajaxCache && (s.cache = s.ajaxCache,
                 delete s.ajaxCache),
                 this.options = s,
                 this.bound = {},
                 c = 0,
                 g = (y = ["prepareToShow", "prepareToHide", "show", "hide", "reposition"]).length; c < g; c++)
            h = y[c],
                this.bound[h] = function(t) {
                    return function() {
                        return w[t].apply(w, arguments)
                    }
                }(h);
        this.adapter.domReady(function() {
            if (w.activate(),
            "creation" === w.options.showOn)
                return w.prepareToShow()
        })
    }
    return t.prototype.STICKS_OUT_TOP = 1,
        t.prototype.STICKS_OUT_BOTTOM = 2,
        t.prototype.STICKS_OUT_LEFT = 1,
        t.prototype.STICKS_OUT_RIGHT = 2,
        t.prototype.class = {
            container: "opentip-container",
            opentip: "opentip",
            header: "ot-header",
            content: "ot-content",
            loadingIndicator: "ot-loading-indicator",
            close: "ot-close",
            goingToHide: "ot-going-to-hide",
            hidden: "ot-hidden",
            hiding: "ot-hiding",
            goingToShow: "ot-going-to-show",
            showing: "ot-showing",
            visible: "ot-visible",
            loading: "ot-loading",
            ajaxError: "ot-ajax-error",
            fixed: "ot-fixed",
            showEffectPrefix: "ot-show-effect-",
            hideEffectPrefix: "ot-hide-effect-",
            stylePrefix: "style-"
        },
        t.prototype._setup = function() {
            var t, e, o, n, s, r, a, h, l, p, d;
            for (this.debug("Setting up the tooltip."),
                     this._buildContainer(),
                     this.hideTriggers = [],
                     n = s = 0,
                     a = (l = this.options.hideTriggers).length; s < a; n = ++s) {
                if (e = l[n],
                    o = null,
                    t = this.options.hideOn instanceof Array ? this.options.hideOn[n] : this.options.hideOn,
                "string" == typeof e)
                    switch (e) {
                        case "trigger":
                            t = t || "mouseout",
                                o = this.triggerElement;
                            break;
                        case "tip":
                            t = t || "mouseover",
                                o = this.container;
                            break;
                        case "target":
                            t = t || "mouseover",
                                o = this.options.target;
                            break;
                        case "both":
                            t = t || "mouseout",
                                o = this.triggerElement,
                                hideTriggerElement2 = this.container;
                            break;
                        case "closeButton":
                            break;
                        default:
                            throw Error("Unknown hide trigger: " + e + ".")
                    }
                else
                    t = t || "mouseover",
                        o = this.adapter.wrap(e);
                o && this.hideTriggers.push({
                    element: o,
                    event: t,
                    original: e
                }),
                hideTriggerElement2 && this.hideTriggers.push({
                    element: hideTriggerElement2,
                    event: t,
                    original: e
                })
            }
            for (d = [],
                     r = 0,
                     h = (p = this.hideTriggers).length; r < h; r++)
                e = p[r],
                    d.push(this.showTriggersWhenVisible.push({
                        element: e.element,
                        event: "mouseover"
                    }));
            return d
        }
        ,
        t.prototype._buildContainer = function() {
            if (this.container = this.adapter.create('<div id="opentip-' + this.id + '" class="' + this.class.container + " " + this.class.hidden + " " + this.class.stylePrefix + this.options.className + '"></div>'),
                this.adapter.css(this.container, {
                    position: "absolute"
                }),
            this.options.ajax && this.adapter.addClass(this.container, this.class.loading),
            this.options.fixed && this.adapter.addClass(this.container, this.class.fixed),
            this.options.showEffect && this.adapter.addClass(this.container, "" + this.class.showEffectPrefix + this.options.showEffect),
                this.options.hideEffect)
                return this.adapter.addClass(this.container, "" + this.class.hideEffectPrefix + this.options.hideEffect)
        }
        ,
        t.prototype._buildElements = function() {
            var t, e;
            return this.tooltipElement = this.adapter.create('<div class="' + this.class.opentip + '"><div class="' + this.class.header + '"></div><div class="' + this.class.content + '"></div></div>'),
                this.backgroundCanvas = this.adapter.wrap(document.createElement("canvas")),
                this.adapter.css(this.backgroundCanvas, {
                    position: "absolute"
                }),
            "undefined" != typeof G_vmlCanvasManager && null !== G_vmlCanvasManager && G_vmlCanvasManager.initElement(this.adapter.unwrap(this.backgroundCanvas)),
                t = this.adapter.find(this.tooltipElement, "." + this.class.header),
            this.options.title && (e = this.adapter.create("<h1></h1>"),
                this.adapter.update(e, this.options.title, this.options.escapeTitle),
                this.adapter.append(t, e)),
            this.options.ajax && !this.loaded && this.adapter.append(this.tooltipElement, this.adapter.create('<div class="' + this.class.loadingIndicator + '"><span>?</span></div>')),
            __indexOf.call(this.options.hideTriggers, "closeButton") >= 0 && (this.closeButtonElement = this.adapter.create('<a href="javascript:undefined;" class="' + this.class.close + '"><span>Close</span></a>'),
                this.adapter.append(t, this.closeButtonElement)),
                this.adapter.append(this.container, this.backgroundCanvas),
                this.adapter.append(this.container, this.tooltipElement),
                this.adapter.append(document.body, this.container),
                this._newContent = !0,
                this.redraw = !0
        }
        ,
        t.prototype.setContent = function(t) {
            if (this.content = t,
                this._newContent = !0,
                "function" == typeof this.content ? (this._contentFunction = this.content,
                    this.content = "") : this._contentFunction = null,
                this.visible)
                return this._updateElementContent()
        }
        ,
        t.prototype._updateElementContent = function() {
            var t;
            return (this._newContent || !this.options.cache && this._contentFunction) && (null != (t = this.adapter.find(this.container, "." + this.class.content)) && (this._contentFunction && (this.debug("Executing content function."),
                this.content = this._contentFunction(this)),
                this.adapter.update(t, this.content, this.options.escapeContent)),
                this._newContent = !1),
                this._storeAndLockDimensions(),
                this.reposition()
        }
        ,
        t.prototype._storeAndLockDimensions = function() {
            var t;
            if (this.container)
                return t = this.dimensions,
                    this.adapter.css(this.container, {
                        width: "auto",
                        left: "0px",
                        top: "0px"
                    }),
                    this.dimensions = this.adapter.dimensions(this.container),
                    this.dimensions.width += 1,
                    this.adapter.css(this.container, {
                        width: this.dimensions.width + "px",
                        top: this.currentPosition.top + "px",
                        left: this.currentPosition.left + "px"
                    }),
                    this._dimensionsEqual(this.dimensions, t) ? void 0 : (this.redraw = !0,
                        this._draw())
        }
        ,
        t.prototype.activate = function() {
            return this._setupObservers("hidden", "hiding")
        }
        ,
        t.prototype.deactivate = function() {
            return this.debug("Deactivating tooltip."),
                this.hide(),
                this._setupObservers("-showing", "-visible", "-hidden", "-hiding")
        }
        ,
        t.prototype._setupObservers = function() {
            var t, e, o, n, s, r, a, h, l, p, d, u, c, f, g, m, v = this;
            for (r = 0,
                     p = (n = 1 <= arguments.length ? __slice.call(arguments, 0) : []).length; r < p; r++)
                if (o = n[r],
                    e = !1,
                "-" === o.charAt(0) && (e = !0,
                    o = o.substr(1)),
                !e !== this.currentObservers[o])
                    switch (this.currentObservers[o] = !e,
                        t = function() {
                            var t, o, n;
                            return t = 1 <= arguments.length ? __slice.call(arguments, 0) : [],
                                e ? (o = v.adapter).stopObserving.apply(o, t) : (n = v.adapter).observe.apply(n, t)
                        }
                        ,
                        o) {
                        case "showing":
                            for (a = 0,
                                     d = (f = this.hideTriggers).length; a < d; a++)
                                t((s = f[a]).element, s.event, this.bound.prepareToHide);
                            t(null != document.onresize ? document : window, "resize", this.bound.reposition),
                                t(window, "scroll", this.bound.reposition);
                            break;
                        case "visible":
                            for (h = 0,
                                     u = (g = this.showTriggersWhenVisible).length; h < u; h++)
                                t((s = g[h]).element, s.event, this.bound.prepareToShow);
                            break;
                        case "hiding":
                            for (l = 0,
                                     c = (m = this.showTriggers).length; l < c; l++)
                                t((s = m[l]).element, s.event, this.bound.prepareToShow);
                            break;
                        case "hidden":
                            break;
                        default:
                            throw Error("Unknown state: " + o)
                    }
            return null
        }
        ,
        t.prototype.prepareToShow = function() {
            if (this._abortHiding(),
                this._abortShowing(),
                !this.visible)
                return this.debug("Showing in " + this.options.delay + "s."),
                null == this.container && this._setup(),
                this.options.group && t._abortShowingGroup(this.options.group, this),
                    this.preparingToShow = !0,
                    this._setupObservers("-hidden", "-hiding", "showing"),
                    this._followMousePosition(),
                this.options.fixed && !this.options.target && (this.initialMousePosition = mousePosition),
                    this.reposition(),
                    this._showTimeoutId = this.setTimeout(this.bound.show, this.options.delay || 0)
        }
        ,
        t.prototype.show = function() {
            var e = this;
            if (this._abortHiding(),
                !this.visible)
                return this._clearTimeouts(),
                    this._triggerElementExists() ? (this.debug("Showing now."),
                    null == this.container && this._setup(),
                    this.options.group && t._hideGroup(this.options.group, this),
                        this.visible = !0,
                        this.preparingToShow = !1,
                    null == this.tooltipElement && this._buildElements(),
                        this._updateElementContent(),
                    !this.options.ajax || this.loaded && this.options.cache || this._loadAjax(),
                        this._searchAndActivateCloseButtons(),
                        this._startEnsureTriggerElement(),
                        this.adapter.css(this.container, {
                            zIndex: t.lastZIndex++
                        }),
                        this._setupObservers("-hidden", "-hiding", "-showing", "-visible", "showing", "visible"),
                    this.options.fixed && !this.options.target && (this.initialMousePosition = mousePosition),
                        this.reposition(),
                        this.adapter.removeClass(this.container, this.class.hiding),
                        this.adapter.removeClass(this.container, this.class.hidden),
                        this.adapter.addClass(this.container, this.class.goingToShow),
                        this.setCss3Style(this.container, {
                            transitionDuration: "0s"
                        }),
                        this.defer(function() {
                            var t;
                            if (e.visible && !e.preparingToHide)
                                return e.adapter.removeClass(e.container, e.class.goingToShow),
                                    e.adapter.addClass(e.container, e.class.showing),
                                    t = 0,
                                e.options.showEffect && e.options.showEffectDuration && (t = e.options.showEffectDuration),
                                    e.setCss3Style(e.container, {
                                        transitionDuration: t + "s"
                                    }),
                                    e._visibilityStateTimeoutId = e.setTimeout(function() {
                                        return e.adapter.removeClass(e.container, e.class.showing),
                                            e.adapter.addClass(e.container, e.class.visible)
                                    }, t),
                                    e._activateFirstInput()
                        }),
                        this._draw()) : this.deactivate()
        }
        ,
        t.prototype._abortShowing = function() {
            if (this.preparingToShow)
                return this.debug("Aborting showing."),
                    this._clearTimeouts(),
                    this._stopFollowingMousePosition(),
                    this.preparingToShow = !1,
                    this._setupObservers("-showing", "-visible", "hiding", "hidden")
        }
        ,
        t.prototype.prepareToHide = function() {
            if (this._abortShowing(),
                this._abortHiding(),
                this.visible)
                return this.debug("Hiding in " + this.options.hideDelay + "s"),
                    this.preparingToHide = !0,
                    this._setupObservers("-showing", "visible", "-hidden", "hiding"),
                    this._hideTimeoutId = this.setTimeout(this.bound.hide, this.options.hideDelay)
        }
        ,
        t.prototype.hide = function() {
            var t = this;
            if (this._abortShowing(),
            this.visible && (this._clearTimeouts(),
                this.debug("Hiding!"),
                this.visible = !1,
                this.preparingToHide = !1,
                this._stopEnsureTriggerElement(),
                this._setupObservers("-showing", "-visible", "-hiding", "-hidden", "hiding", "hidden"),
            this.options.fixed || this._stopFollowingMousePosition(),
                this.container))
                return this.adapter.removeClass(this.container, this.class.visible),
                    this.adapter.removeClass(this.container, this.class.showing),
                    this.adapter.addClass(this.container, this.class.goingToHide),
                    this.setCss3Style(this.container, {
                        transitionDuration: "0s"
                    }),
                    this.defer(function() {
                        var e;
                        return t.adapter.removeClass(t.container, t.class.goingToHide),
                            t.adapter.addClass(t.container, t.class.hiding),
                            e = 0,
                        t.options.hideEffect && t.options.hideEffectDuration && (e = t.options.hideEffectDuration),
                            t.setCss3Style(t.container, {
                                transitionDuration: e + "s"
                            }),
                            t._visibilityStateTimeoutId = t.setTimeout(function() {
                                if (t.adapter.removeClass(t.container, t.class.hiding),
                                    t.adapter.addClass(t.container, t.class.hidden),
                                    t.setCss3Style(t.container, {
                                        transitionDuration: "0s"
                                    }),
                                    t.options.removeElementsOnHide)
                                    return t.debug("Removing HTML elements."),
                                        t.adapter.remove(t.container),
                                        delete t.container,
                                        delete t.tooltipElement
                            }, e)
                    })
        }
        ,
        t.prototype._abortHiding = function() {
            if (this.preparingToHide)
                return this.debug("Aborting hiding."),
                    this._clearTimeouts(),
                    this.preparingToHide = !1,
                    this._setupObservers("-hiding", "showing", "visible")
        }
        ,
        t.prototype.reposition = function() {
            var t, e, o, n = this;
            if (null != (t = this.getPosition()) && (e = this.options.stem,
            this.options.containInViewport && (t = (o = this._ensureViewportContainment(t)).position,
                e = o.stem),
                !this._positionsEqual(t, this.currentPosition)))
                return this.options.stem && !e.eql(this.currentStem) && (this.redraw = !0),
                    this.currentPosition = t,
                    this.currentStem = e,
                    this._draw(),
                    this.adapter.css(this.container, {
                        left: t.left + "px",
                        top: t.top + "px"
                    }),
                    this.defer(function() {
                        var t;
                        return (t = n.adapter.unwrap(n.container)).style.visibility = "hidden",
                            t.offsetHeight,
                            t.style.visibility = "visible"
                    })
        }
        ,
        t.prototype.getPosition = function(t, e, o) {
            var n, s, r, a, h, l, p, d, u;
            if (this.container)
                return null == t && (t = this.options.tipJoint),
                null == e && (e = this.options.targetJoint),
                    a = {},
                    this.options.target ? (p = this.adapter.offset(this.options.target),
                        l = this.adapter.dimensions(this.options.target),
                        a = p,
                        e.right ? null != (d = this.adapter.unwrap(this.options.target)).getBoundingClientRect ? a.left = d.getBoundingClientRect().right + (null != (u = window.pageXOffset) ? u : document.body.scrollLeft) : a.left += l.width : e.center && (a.left += Math.round(l.width / 2)),
                        e.bottom ? a.top += l.height : e.middle && (a.top += Math.round(l.height / 2)),
                    this.options.borderWidth && (this.options.tipJoint.left && (a.left += this.options.borderWidth),
                    this.options.tipJoint.right && (a.left -= this.options.borderWidth),
                        this.options.tipJoint.top ? a.top += this.options.borderWidth : this.options.tipJoint.bottom && (a.top -= this.options.borderWidth))) : a = this.initialMousePosition ? {
                        top: this.initialMousePosition.y,
                        left: this.initialMousePosition.x
                    } : {
                        top: mousePosition.y,
                        left: mousePosition.x
                    },
                this.options.autoOffset && (r = (h = this.options.stem ? this.options.stemLength : 0) && this.options.fixed ? 2 : 10,
                    n = t.middle && !this.options.fixed ? 15 : 0,
                    s = t.center && !this.options.fixed ? 15 : 0,
                    t.right ? a.left -= r + n : t.left && (a.left += r + n),
                    t.bottom ? a.top -= r + s : t.top && (a.top += r + s),
                h && (null == o && (o = this.options.stem),
                    o.right ? a.left -= h : o.left && (a.left += h),
                    o.bottom ? a.top -= h : o.top && (a.top += h))),
                    a.left += this.options.offset[0],
                    a.top += this.options.offset[1],
                    t.right ? a.left -= this.dimensions.width : t.center && (a.left -= Math.round(this.dimensions.width / 2)),
                    t.bottom ? a.top -= this.dimensions.height : t.middle && (a.top -= Math.round(this.dimensions.height / 2)),
                    a
        }
        ,
        t.prototype._ensureViewportContainment = function(e) {
            var o, n, s, r, a, h, l, p, d, u, c;
            if (s = {
                position: e,
                stem: l = this.options.stem
            },
            !this.visible || !e || !(p = this._sticksOut(e))[0] && !p[1])
                return s;
            if (u = new t.Joint(this.options.tipJoint),
            this.options.targetJoint && (d = new t.Joint(this.options.targetJoint)),
                h = this.adapter.scrollOffset(),
                c = this.adapter.viewportDimensions(),
                e.left,
                h[0],
                e.top,
                h[1],
                o = !1,
            c.width >= this.dimensions.width && p[0])
                switch (o = !0,
                    p[0]) {
                    case this.STICKS_OUT_LEFT:
                        u.setHorizontal("left"),
                        this.options.targetJoint && d.setHorizontal("right");
                        break;
                    case this.STICKS_OUT_RIGHT:
                        u.setHorizontal("right"),
                        this.options.targetJoint && d.setHorizontal("left")
                }
            if (c.height >= this.dimensions.height && p[1])
                switch (o = !0,
                    p[1]) {
                    case this.STICKS_OUT_TOP:
                        u.setVertical("top"),
                        this.options.targetJoint && d.setVertical("bottom");
                        break;
                    case this.STICKS_OUT_BOTTOM:
                        u.setVertical("bottom"),
                        this.options.targetJoint && d.setVertical("top")
                }
            return o ? (this.options.stem && (l = u),
                e = this.getPosition(u, d, l),
                r = !1,
                a = !1,
            (n = this._sticksOut(e))[0] && n[0] !== p[0] && (r = !0,
                u.setHorizontal(this.options.tipJoint.horizontal),
            this.options.targetJoint && d.setHorizontal(this.options.targetJoint.horizontal)),
            n[1] && n[1] !== p[1] && (a = !0,
                u.setVertical(this.options.tipJoint.vertical),
            this.options.targetJoint && d.setVertical(this.options.targetJoint.vertical)),
                r && a ? s : ((r || a) && (this.options.stem && (l = u),
                    e = this.getPosition(u, d, l)),
                    {
                        position: e,
                        stem: l
                    })) : s
        }
        ,
        t.prototype._sticksOut = function(t) {
            var e, o, n, s;
            return o = this.adapter.scrollOffset(),
                s = this.adapter.viewportDimensions(),
                n = [!1, !1],
                (e = [t.left - o[0], t.top - o[1]])[0] < 0 ? n[0] = this.STICKS_OUT_LEFT : e[0] + this.dimensions.width > s.width && (n[0] = this.STICKS_OUT_RIGHT),
                e[1] < 0 ? n[1] = this.STICKS_OUT_TOP : e[1] + this.dimensions.height > s.height && (n[1] = this.STICKS_OUT_BOTTOM),
                n
        }
        ,
        t.prototype._draw = function() {
            var e, o, n, s, r, a, h, l, p, d, u, c, f, g, m, v, y, b, w, _, x, C, T = this;
            if (this.backgroundCanvas && this.redraw) {
                if (this.debug("Drawing background."),
                    this.redraw = !1,
                    this.currentStem) {
                    for (b = 0,
                             w = (_ = ["top", "right", "bottom", "left"]).length; b < w; b++)
                        m = _[b],
                            this.adapter.removeClass(this.container, "stem-" + m);
                    this.adapter.addClass(this.container, "stem-" + this.currentStem.horizontal),
                        this.adapter.addClass(this.container, "stem-" + this.currentStem.vertical)
                }
                return p = [0, 0],
                    d = [0, 0],
                __indexOf.call(this.options.hideTriggers, "closeButton") >= 0 && (l = new t.Joint("top right" === (null != (x = this.currentStem) ? x.toString() : void 0) ? "top left" : "top right"),
                    p = [this.options.closeButtonRadius + this.options.closeButtonOffset[0], this.options.closeButtonRadius + this.options.closeButtonOffset[1]],
                    d = [this.options.closeButtonRadius - this.options.closeButtonOffset[0], this.options.closeButtonRadius - this.options.closeButtonOffset[1]]),
                    a = this.adapter.clone(this.dimensions),
                    h = [0, 0],
                this.options.borderWidth && (a.width += 2 * this.options.borderWidth,
                    a.height += 2 * this.options.borderWidth,
                    h[0] -= this.options.borderWidth,
                    h[1] -= this.options.borderWidth),
                this.options.shadow && (a.width += 2 * this.options.shadowBlur,
                    a.width += Math.max(0, this.options.shadowOffset[0] - 2 * this.options.shadowBlur),
                    a.height += 2 * this.options.shadowBlur,
                    a.height += Math.max(0, this.options.shadowOffset[1] - 2 * this.options.shadowBlur),
                    h[0] -= Math.max(0, this.options.shadowBlur - this.options.shadowOffset[0]),
                    h[1] -= Math.max(0, this.options.shadowBlur - this.options.shadowOffset[1])),
                    r = {
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0
                    },
                this.currentStem && (this.currentStem.left ? r.left = this.options.stemLength : this.currentStem.right && (r.right = this.options.stemLength),
                    this.currentStem.top ? r.top = this.options.stemLength : this.currentStem.bottom && (r.bottom = this.options.stemLength)),
                l && (l.left ? r.left = Math.max(r.left, d[0]) : l.right && (r.right = Math.max(r.right, d[0])),
                    l.top ? r.top = Math.max(r.top, d[1]) : l.bottom && (r.bottom = Math.max(r.bottom, d[1]))),
                    a.width += r.left + r.right,
                    a.height += r.top + r.bottom,
                    h[0] -= r.left,
                    h[1] -= r.top,
                this.currentStem && this.options.borderWidth && (y = (C = this._getPathStemMeasures(this.options.stemBase, this.options.stemLength, this.options.borderWidth)).stemLength,
                    v = C.stemBase),
                    (s = this.adapter.unwrap(this.backgroundCanvas)).width = a.width,
                    s.height = a.height,
                    this.adapter.css(this.backgroundCanvas, {
                        width: s.width + "px",
                        height: s.height + "px",
                        left: h[0] + "px",
                        top: h[1] + "px"
                    }),
                    (u = s.getContext("2d")).setTransform(1, 0, 0, 1, 0, 0),
                    u.clearRect(0, 0, s.width, s.height),
                    u.beginPath(),
                    u.fillStyle = this._getColor(u, this.dimensions, this.options.background, this.options.backgroundGradientHorizontal),
                    u.lineJoin = "miter",
                    u.miterLimit = 500,
                    g = this.options.borderWidth / 2,
                    this.options.borderWidth ? (u.strokeStyle = this.options.borderColor,
                        u.lineWidth = this.options.borderWidth) : (y = this.options.stemLength,
                        v = this.options.stemBase),
                null == v && (v = 0),
                    f = function(t, e, o) {
                        if (o && u.moveTo(Math.max(v, T.options.borderRadius, p[0]) + 1 - g, -g),
                            e)
                            return u.lineTo(t / 2 - v / 2, -g),
                                u.lineTo(t / 2, -y - g),
                                u.lineTo(t / 2 + v / 2, -g)
                    }
                    ,
                    c = function(t, e, o) {
                        var n, s, r, a;
                        return t ? (u.lineTo(-v + g, 0 - g),
                            u.lineTo(y + g, -y - g),
                            u.lineTo(g, v - g)) : e ? (a = T.options.closeButtonOffset,
                            r = p[0],
                        o % 2 != 0 && (a = [a[1], a[0]],
                            r = p[1]),
                            n = Math.acos(a[1] / T.options.closeButtonRadius),
                            s = Math.acos(a[0] / T.options.closeButtonRadius),
                            u.lineTo(-r + g, -g),
                            u.arc(g - a[0], -g + a[1], T.options.closeButtonRadius, -(Math.PI / 2 + n), s, !1)) : (u.lineTo(-T.options.borderRadius + g, -g),
                            u.quadraticCurveTo(g, -g, g, T.options.borderRadius - g))
                    }
                    ,
                    u.translate(-h[0], -h[1]),
                    u.save(),
                    function() {
                        var e, o, n, s, r, a, h, p, d, g, m;
                        for (m = [],
                                 o = d = 0,
                                 g = t.positions.length / 2; 0 <= g ? d < g : d > g; o = 0 <= g ? ++d : --d)
                            r = 2 * o,
                                a = 0 === o || 3 === o ? 0 : T.dimensions.width,
                                h = o < 2 ? 0 : T.dimensions.height,
                                p = Math.PI / 2 * o,
                                n = o % 2 == 0 ? T.dimensions.width : T.dimensions.height,
                                s = new t.Joint(t.positions[r]),
                                e = new t.Joint(t.positions[r + 1]),
                                u.save(),
                                u.translate(a, h),
                                u.rotate(p),
                                f(n, s.eql(T.currentStem), 0 === o),
                                u.translate(n, 0),
                                c(e.eql(T.currentStem), e.eql(l), o),
                                m.push(u.restore())
                    }(),
                    u.closePath(),
                    u.save(),
                this.options.shadow && (u.shadowColor = this.options.shadowColor,
                    u.shadowBlur = this.options.shadowBlur,
                    u.shadowOffsetX = this.options.shadowOffset[0],
                    u.shadowOffsetY = this.options.shadowOffset[1]),
                    u.fill(),
                    u.restore(),
                this.options.borderWidth && u.stroke(),
                    u.restore(),
                    l ? (T.options.closeButtonRadius,
                        e = "top right" === l.toString() ? [(n = [T.dimensions.width - T.options.closeButtonOffset[0], T.options.closeButtonOffset[1]])[0] + g, n[1] - g] : [(n = [T.options.closeButtonOffset[0], T.options.closeButtonOffset[1]])[0] - g, n[1] - g],
                        u.translate(e[0], e[1]),
                        o = T.options.closeButtonCrossSize / 2,
                        u.save(),
                        u.beginPath(),
                        u.strokeStyle = T.options.closeButtonCrossColor,
                        u.lineWidth = T.options.closeButtonCrossLineWidth,
                        u.lineCap = "round",
                        u.moveTo(-o, -o),
                        u.lineTo(o, o),
                        u.stroke(),
                        u.beginPath(),
                        u.moveTo(o, -o),
                        u.lineTo(-o, o),
                        u.stroke(),
                        u.restore(),
                        T.adapter.css(T.closeButtonElement, {
                            left: n[0] - o - T.options.closeButtonLinkOverscan + "px",
                            top: n[1] - o - T.options.closeButtonLinkOverscan + "px",
                            width: T.options.closeButtonCrossSize + 2 * T.options.closeButtonLinkOverscan + "px",
                            height: T.options.closeButtonCrossSize + 2 * T.options.closeButtonLinkOverscan + "px"
                        })) : void 0
            }
        }
        ,
        t.prototype._getPathStemMeasures = function(t, e, o) {
            var n, s, r, a;
            if (r = o / 2,
                n = 2 * (s = Math.atan(t / 2 / e)),
            (a = r + e - 2 * (r / Math.sin(n)) * Math.cos(s)) < 0)
                throw Error("Sorry but your stemLength / stemBase ratio is strange.");
            return {
                stemLength: a,
                stemBase: Math.tan(s) * a * 2
            }
        }
        ,
        t.prototype._getColor = function(t, e, o, n) {
            var s, r, a, h, l;
            if (null == n && (n = !1),
            "string" == typeof o)
                return o;
            for (r = n ? t.createLinearGradient(0, 0, e.width, 0) : t.createLinearGradient(0, 0, 0, e.height),
                     a = h = 0,
                     l = o.length; h < l; a = ++h)
                s = o[a],
                    r.addColorStop(s[0], s[1]);
            return r
        }
        ,
        t.prototype._searchAndActivateCloseButtons = function() {
            var t, e, o, n;
            for (e = 0,
                     o = (n = this.adapter.findAll(this.container, "." + this.class.close)).length; e < o; e++)
                t = n[e],
                    this.hideTriggers.push({
                        element: this.adapter.wrap(t),
                        event: "click"
                    });
            if (this.currentObservers.showing && this._setupObservers("-showing", "showing"),
                this.currentObservers.visible)
                return this._setupObservers("-visible", "visible")
        }
        ,
        t.prototype._activateFirstInput = function() {
            var t;
            return null != (t = this.adapter.unwrap(this.adapter.find(this.container, "input, textarea"))) && "function" == typeof t.focus ? t.focus() : void 0
        }
        ,
        t.prototype._followMousePosition = function() {
            if (!this.options.fixed)
                return t._observeMousePosition(this.bound.reposition)
        }
        ,
        t.prototype._stopFollowingMousePosition = function() {
            if (!this.options.fixed)
                return t._stopObservingMousePosition(this.bound.reposition)
        }
        ,
        t.prototype._clearShowTimeout = function() {
            return clearTimeout(this._showTimeoutId)
        }
        ,
        t.prototype._clearHideTimeout = function() {
            return clearTimeout(this._hideTimeoutId)
        }
        ,
        t.prototype._clearTimeouts = function() {
            return clearTimeout(this._visibilityStateTimeoutId),
                this._clearShowTimeout(),
                this._clearHideTimeout()
        }
        ,
        t.prototype._triggerElementExists = function() {
            var t;
            for (t = this.adapter.unwrap(this.triggerElement); t.parentNode; ) {
                if ("BODY" === t.parentNode.tagName)
                    return !0;
                t = t.parentNode
            }
            return !1
        }
        ,
        t.prototype._loadAjax = function() {
            var t = this;
            if (!this.loading)
                return this.loaded = !1,
                    this.loading = !0,
                    this.adapter.addClass(this.container, this.class.loading),
                    this.setContent(""),
                    this.debug("Loading content from " + this.options.ajax),
                    this.adapter.ajax({
                        url: this.options.ajax,
                        method: this.options.ajaxMethod,
                        onSuccess: function(e) {
                            return t.debug("Loading successful."),
                                t.adapter.removeClass(t.container, t.class.loading),
                                t.setContent(e)
                        },
                        onError: function(e) {
                            var o;
                            return o = t.options.ajaxErrorMessage,
                                t.debug(o, e),
                                t.setContent(o),
                                t.adapter.addClass(t.container, t.class.ajaxError)
                        },
                        onComplete: function() {
                            return t.adapter.removeClass(t.container, t.class.loading),
                                t.loading = !1,
                                t.loaded = !0,
                                t._searchAndActivateCloseButtons(),
                                t._activateFirstInput(),
                                t.reposition()
                        }
                    })
        }
        ,
        t.prototype._ensureTriggerElement = function() {
            if (!this._triggerElementExists())
                return this.deactivate(),
                    this._stopEnsureTriggerElement()
        }
        ,
        t.prototype._ensureTriggerElementInterval = 1e3,
        t.prototype._startEnsureTriggerElement = function() {
            var t = this;
            return this._ensureTriggerElementTimeoutId = setInterval(function() {
                return t._ensureTriggerElement()
            }, this._ensureTriggerElementInterval)
        }
        ,
        t.prototype._stopEnsureTriggerElement = function() {
            return clearInterval(this._ensureTriggerElementTimeoutId)
        }
        ,
        t
}(),
         vendors = ["khtml", "ms", "o", "moz", "webkit"],
         Opentip.prototype.setCss3Style = function(t, e) {
             var o, n, s, r, a;
             for (o in t = this.adapter.unwrap(t),
                 a = [],
                 e)
                 __hasProp.call(e, o) && (n = e[o],
                     null != t.style[o] ? a.push(t.style[o] = n) : a.push((function() {
                             var e, a, h;
                             for (h = [],
                                      e = 0,
                                      a = vendors.length; e < a; e++)
                                 s = vendors[e],
                                     r = "" + this.ucfirst(s) + this.ucfirst(o),
                                     null != t.style[r] ? h.push(t.style[r] = n) : h.push(void 0);
                             return h
                         }
                     ).call(this)));
             return a
         }
         ,
         Opentip.prototype.defer = function(t) {
             return setTimeout(t, 0)
         }
         ,
         Opentip.prototype.setTimeout = function(t, e) {
             return setTimeout(t, e ? 1e3 * e : 0)
         }
         ,
         Opentip.prototype.ucfirst = function(t) {
             return null == t ? "" : t.charAt(0).toUpperCase() + t.slice(1)
         }
         ,
         Opentip.prototype.dasherize = function(t) {
             return t.replace(/([A-Z])/g, function(t, e) {
                 return "-" + e.toLowerCase()
             })
         }
         ,
         mousePositionObservers = [],
         mousePosition = {
             x: 0,
             y: 0
         },
         mouseMoved = function(t) {
             var e, o, n, s;
             for (mousePosition = Opentip.adapter.mousePosition(t),
                      s = [],
                      o = 0,
                      n = mousePositionObservers.length; o < n; o++)
                 e = mousePositionObservers[o],
                     s.push(e());
             return s
         }
         ,
         Opentip.followMousePosition = function() {
             return Opentip.adapter.observe(document.body, "mousemove", mouseMoved)
         }
         ,
         Opentip._observeMousePosition = function(t) {
             return mousePositionObservers.push(t)
         }
         ,
         Opentip._stopObservingMousePosition = function(t) {
             var e;
             return mousePositionObservers = function() {
                 var o, n, s;
                 for (s = [],
                          o = 0,
                          n = mousePositionObservers.length; o < n; o++)
                     (e = mousePositionObservers[o]) !== t && s.push(e);
                 return s
             }()
         }
         ,
         Opentip.Joint = function() {
             function t(t) {
                 null != t && (t instanceof Opentip.Joint && (t = t.toString()),
                     this.set(t))
             }
             return t.prototype.set = function(t) {
                 return t = t.toLowerCase(),
                     this.setHorizontal(t),
                     this.setVertical(t),
                     this
             }
                 ,
                 t.prototype.setHorizontal = function(t) {
                     var e, o, n, s, r, a, h;
                     for (n = 0,
                              r = (o = ["left", "center", "right"]).length; n < r; n++)
                         e = o[n],
                         ~t.indexOf(e) && (this.horizontal = e.toLowerCase());
                     for (null == this.horizontal && (this.horizontal = "center"),
                              h = [],
                              s = 0,
                              a = o.length; s < a; s++)
                         e = o[s],
                             h.push(this[e] = this.horizontal === e ? e : void 0);
                     return h
                 }
                 ,
                 t.prototype.setVertical = function(t) {
                     var e, o, n, s, r, a, h;
                     for (n = 0,
                              r = (o = ["top", "middle", "bottom"]).length; n < r; n++)
                         e = o[n],
                         ~t.indexOf(e) && (this.vertical = e.toLowerCase());
                     for (null == this.vertical && (this.vertical = "middle"),
                              h = [],
                              s = 0,
                              a = o.length; s < a; s++)
                         e = o[s],
                             h.push(this[e] = this.vertical === e ? e : void 0);
                     return h
                 }
                 ,
                 t.prototype.eql = function(t) {
                     return null != t && this.horizontal === t.horizontal && this.vertical === t.vertical
                 }
                 ,
                 t.prototype.flip = function() {
                     var t;
                     return t = (Opentip.position[this.toString(!0)] + 4) % 8,
                         this.set(Opentip.positions[t]),
                         this
                 }
                 ,
                 t.prototype.toString = function(t) {
                     var e, o;
                     return null == t && (t = !1),
                         o = "middle" === this.vertical ? "" : this.vertical,
                         e = "center" === this.horizontal ? "" : this.horizontal,
                     o && e && (e = t ? Opentip.prototype.ucfirst(e) : " " + e),
                     "" + o + e
                 }
                 ,
                 t
         }(),
         Opentip.prototype._positionsEqual = function(t, e) {
             return null != t && null != e && t.left === e.left && t.top === e.top
         }
         ,
         Opentip.prototype._dimensionsEqual = function(t, e) {
             return null != t && null != e && t.width === e.width && t.height === e.height
         }
         ,
         Opentip.prototype.debug = function() {
             var t;
             if (t = 1 <= arguments.length ? __slice.call(arguments, 0) : [],
             Opentip.debug && null != ("undefined" != typeof console && null !== console ? console.debug : void 0))
                 return t.unshift("#" + this.id + " |"),
                     console.debug.apply(console, t)
         }
         ,
         Opentip.findElements = function() {
             var t, e, o, n, s, r, a, h, l, p;
             for (p = [],
                      a = 0,
                      h = (l = (t = Opentip.adapter).findAll(document.body, "[data-ot]")).length; a < h; a++) {
                 for (n in o = l[a],
                     r = {},
                 "" !== (e = t.data(o, "ot")) && "true" !== e && "yes" !== e || (e = t.attr(o, "title"),
                     t.attr(o, "title", "")),
                     e = e || "",
                     Opentip.styles.standard)
                     null != (s = t.data(o, "ot" + Opentip.prototype.ucfirst(n))) && ("yes" === s || "true" === s || "on" === s ? s = !0 : "no" !== s && "false" !== s && "off" !== s || (s = !1),
                         r[n] = s);
                 p.push(new Opentip(o,e,r))
             }
             return p
         }
         ,
         Opentip.version = "2.4.6",
         Opentip.debug = !1,
         Opentip.lastId = 0,
         Opentip.lastZIndex = 100,
         Opentip.tips = [],
         Opentip._abortShowingGroup = function(t, e) {
             var o, n, s, r, a;
             for (a = [],
                      n = 0,
                      s = (r = Opentip.tips).length; n < s; n++)
                 (o = r[n]) !== e && o.options.group === t ? a.push(o._abortShowing()) : a.push(void 0);
             return a
         }
         ,
         Opentip._hideGroup = function(t, e) {
             var o, n, s, r, a;
             for (a = [],
                      n = 0,
                      s = (r = Opentip.tips).length; n < s; n++)
                 (o = r[n]) !== e && o.options.group === t ? a.push(o.hide()) : a.push(void 0);
             return a
         }
         ,
         Opentip.adapters = {},
         Opentip.adapter = null,
         firstAdapter = !0,
         Opentip.addAdapter = function(t) {
             if (Opentip.adapters[t.name] = t,
                 firstAdapter)
                 return Opentip.adapter = t,
                     t.domReady(Opentip.findElements),
                     t.domReady(Opentip.followMousePosition),
                     firstAdapter = !1
         }
         ,
         Opentip.positions = ["top", "topRight", "right", "bottomRight", "bottom", "bottomLeft", "left", "topLeft"],
         Opentip.position = {},
         i = _i = 0,
         _len = (_ref = Opentip.positions).length; _i < _len; i = ++_i)
    position = _ref[i],
        Opentip.position[position] = i;
var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i)
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i)
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i)
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i)
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i)
    },
    any: function() {
        return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()
    }
};
Opentip.styles = {
    standard: {
        extends: null,
        title: void 0,
        escapeTitle: !0,
        escapeContent: !1,
        className: "standard",
        stem: !0,
        delay: null,
        hideDelay: .1,
        fixed: !0,
        showOn: isMobile.any() ? "click" : "mouseover",
        hideTrigger: "both",
        hideTriggers: [],
        hideOn: isMobile.any() ? "click" : "mouseout",
        removeElementsOnHide: !1,
        offset: [0, 0],
        containInViewport: !0,
        autoOffset: !0,
        showEffect: "appear",
        hideEffect: "fade",
        showEffectDuration: .3,
        hideEffectDuration: .2,
        stemLength: 7,
        stemBase: 14,
        tipJoint: "top",
        target: !0,
        targetJoint: null,
        cache: !0,
        ajax: !1,
        ajaxMethod: "GET",
        ajaxErrorMessage: "There was a problem downloading the content.",
        group: null,
        style: null,
        background: "#fff",
        backgroundGradientHorizontal: !1,
        closeButtonOffset: [5, 5],
        closeButtonRadius: 7,
        closeButtonCrossSize: 4,
        closeButtonCrossColor: "#d2c35b",
        closeButtonCrossLineWidth: 1.5,
        closeButtonLinkOverscan: 6,
        borderRadius: 1,
        borderWidth: .5,
        borderColor: "#cccccc",
        shadow: !0,
        shadowBlur: 40,
        shadowOffset: [0, 10],
        shadowColor: "rgba(0, 0, 0, 0.08)"
    },
    glass: {
        extends: "standard",
        className: "glass",
        background: [[0, "rgba(252, 252, 252, 0.8)"], [.5, "rgba(255, 255, 255, 0.8)"], [.5, "rgba(250, 250, 250, 0.9)"], [1, "rgba(245, 245, 245, 0.9)"]],
        borderColor: "#eee",
        closeButtonCrossColor: "rgba(0, 0, 0, 0.2)",
        borderRadius: 15,
        closeButtonRadius: 10,
        closeButtonOffset: [8, 8]
    },
    dark: {
        extends: "standard",
        className: "dark",
        borderRadius: 13,
        borderColor: "#444",
        closeButtonCrossColor: "rgba(240, 240, 240, 1)",
        shadowColor: "rgba(0, 0, 0, 0.3)",
        shadowOffset: [2, 2],
        background: [[0, "rgba(30, 30, 30, 0.7)"], [.5, "rgba(30, 30, 30, 0.8)"], [.5, "rgba(10, 10, 10, 0.8)"], [1, "rgba(10, 10, 10, 0.9)"]]
    },
    alert: {
        extends: "standard",
        className: "alert",
        borderRadius: 1,
        borderColor: "#AE0D11",
        closeButtonCrossColor: "rgba(255, 255, 255, 1)",
        shadowColor: "rgba(0, 0, 0, 0.3)",
        shadowOffset: [2, 2],
        background: [[0, "rgba(203, 15, 19, 0.7)"], [.5, "rgba(203, 15, 19, 0.8)"], [.5, "rgba(189, 14, 18, 0.8)"], [1, "rgba(179, 14, 17, 0.9)"]]
    }
},
    Opentip.defaultStyle = "standard",
    "undefined" != typeof module && null !== module ? module.exports = Opentip : window.Opentip = Opentip,
    __hasProp = ({}).hasOwnProperty,
    __slice = [].slice,
    Adapter = function() {
        var t, e;
        function o() {}
        return o.prototype.name = "native",
            o.prototype.domReady = function(t) {
                var e, o, n, s, r, a, h, l, p, d, u;
                if (n = !1,
                    p = !0,
                    d = window,
                "complete" === (u = (o = document).readyState) || "loaded" === u)
                    return t();
                if (l = o.documentElement,
                    e = o.addEventListener ? "addEventListener" : "attachEvent",
                    h = o.addEventListener ? "removeEventListener" : "detachEvent",
                    a = o.addEventListener ? "" : "on",
                    s = function(e) {
                        if ("readystatechange" !== e.type || "complete" === o.readyState)
                            return ("load" === e.type ? d : o)[h](a + e.type, s, !1),
                                n ? void 0 : (n = !0,
                                    t())
                    }
                    ,
                    r = function() {
                        try {
                            l.doScroll("left")
                        } catch (t) {
                            return void setTimeout(r, 50)
                        }
                        return s("poll")
                    }
                    ,
                "complete" !== o.readyState) {
                    if (o.createEventObject && l.doScroll) {
                        try {
                            p = !d.frameElement
                        } catch (c) {}
                        p && r()
                    }
                    return o[e](a + "DOMContentLoaded", s, !1),
                        o[e](a + "readystatechange", s, !1),
                        d[e](a + "load", s, !1)
                }
            }
            ,
            o.prototype.create = function(t) {
                var e;
                return (e = document.createElement("div")).innerHTML = t,
                    this.wrap(e.childNodes)
            }
            ,
            o.prototype.wrap = function(t) {
                var e;
                return t ? "string" == typeof t ? t = (t = this.find(document.body, t)) ? [t] : [] : t instanceof NodeList ? t = function() {
                    var o, n, s;
                    for (s = [],
                             o = 0,
                             n = t.length; o < n; o++)
                        e = t[o],
                            s.push(e);
                    return s
                }() : t instanceof Array || (t = [t]) : t = [],
                    t
            }
            ,
            o.prototype.unwrap = function(t) {
                return this.wrap(t)[0]
            }
            ,
            o.prototype.tagName = function(t) {
                return this.unwrap(t).tagName
            }
            ,
            o.prototype.attr = function(t, e, o) {
                return 3 === arguments.length ? this.unwrap(t).setAttribute(e, o) : this.unwrap(t).getAttribute(e)
            }
            ,
            e = 0,
            t = {},
            o.prototype.data = function(o, n, s) {
                var r;
                return (r = this.attr(o, "data-id")) || (r = ++e,
                    this.attr(o, "data-id", r),
                    t[r] = {}),
                    3 === arguments.length ? t[r][n] = s : (null != (s = t[r][n]) || (s = this.attr(o, "data-" + Opentip.prototype.dasherize(n))) && (t[r][n] = s),
                        s)
            }
            ,
            o.prototype.find = function(t, e) {
                return this.unwrap(t).querySelector(e)
            }
            ,
            o.prototype.findAll = function(t, e) {
                return this.unwrap(t).querySelectorAll(e)
            }
            ,
            o.prototype.update = function(t, e, o) {
                return t = this.unwrap(t),
                    o ? (t.innerHTML = "",
                        t.appendChild(document.createTextNode(e))) : t.innerHTML = e
            }
            ,
            o.prototype.append = function(t, e) {
                var o;
                return o = this.unwrap(e),
                    this.unwrap(t).appendChild(o)
            }
            ,
            o.prototype.remove = function(t) {
                var e;
                if (null != (e = (t = this.unwrap(t)).parentNode))
                    return e.removeChild(t)
            }
            ,
            o.prototype.addClass = function(t, e) {
                return this.unwrap(t).classList.add(e)
            }
            ,
            o.prototype.removeClass = function(t, e) {
                return this.unwrap(t).classList.remove(e)
            }
            ,
            o.prototype.css = function(t, e) {
                var o, n, s;
                for (o in t = this.unwrap(this.wrap(t)),
                    s = [],
                    e)
                    __hasProp.call(e, o) && (n = e[o],
                        s.push(t.style[o] = n));
                return s
            }
            ,
            o.prototype.dimensions = function(t) {
                var e, o;
                return (e = {
                    width: (t = this.unwrap(this.wrap(t))).offsetWidth,
                    height: t.offsetHeight
                }).width && e.height || (o = {
                    position: t.style.position || "",
                    visibility: t.style.visibility || "",
                    display: t.style.display || ""
                },
                    this.css(t, {
                        position: "absolute",
                        visibility: "hidden",
                        display: "block"
                    }),
                    e = {
                        width: t.offsetWidth,
                        height: t.offsetHeight
                    },
                    this.css(t, o)),
                    e
            }
            ,
            o.prototype.scrollOffset = function() {
                return [window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft, window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop]
            }
            ,
            o.prototype.viewportDimensions = function() {
                return {
                    width: document.documentElement.clientWidth,
                    height: document.documentElement.clientHeight
                }
            }
            ,
            o.prototype.mousePosition = function(t) {
                var e;
                if (e = {
                    x: 0,
                    y: 0
                },
                null == t && (t = window.event),
                null != t) {
                    try {
                        t.pageX || t.pageY ? (e.x = t.pageX,
                            e.y = t.pageY) : (t.clientX || t.clientY) && (e.x = t.clientX + document.body.scrollLeft + document.documentElement.scrollLeft,
                            e.y = t.clientY + document.body.scrollTop + document.documentElement.scrollTop)
                    } catch (o) {}
                    return e
                }
            }
            ,
            o.prototype.offset = function(t) {
                var e;
                for (e = {
                    top: (t = this.unwrap(t)).offsetTop,
                    left: t.offsetLeft
                }; t = t.offsetParent; )
                    e.top += t.offsetTop,
                        e.left += t.offsetLeft,
                    t !== document.body && (e.top -= t.scrollTop,
                        e.left -= t.scrollLeft);
                return e
            }
            ,
            o.prototype.observe = function(t, e, o) {
                return this.unwrap(t).addEventListener(e, o, !1)
            }
            ,
            o.prototype.stopObserving = function(t, e, o) {
                return this.unwrap(t).removeEventListener(e, o, !1)
            }
            ,
            o.prototype.ajax = function(t) {
                var e, o, n;
                if (null == t.url)
                    throw Error("No url provided");
                if (window.XMLHttpRequest)
                    e = new XMLHttpRequest;
                else if (window.ActiveXObject)
                    try {
                        e = new ActiveXObject("Msxml2.XMLHTTP")
                    } catch (s) {
                        try {
                            e = new ActiveXObject("Microsoft.XMLHTTP")
                        } catch (r) {}
                    }
                if (!e)
                    throw Error("Can't create XMLHttpRequest");
                return e.onreadystatechange = function() {
                    if (4 === e.readyState) {
                        try {
                            200 === e.status ? "function" == typeof t.onSuccess && t.onSuccess(e.responseText) : "function" == typeof t.onError && t.onError("Server responded with status " + e.status)
                        } catch (o) {
                            "function" == typeof t.onError && t.onError(o.message)
                        }
                        return "function" == typeof t.onComplete ? t.onComplete() : void 0
                    }
                }
                    ,
                    e.open(null != (o = null != (n = t.method) ? n.toUpperCase() : void 0) ? o : "GET", t.url),
                    e.send()
            }
            ,
            o.prototype.clone = function(t) {
                var e, o, n;
                for (e in o = {},
                    t)
                    __hasProp.call(t, e) && (n = t[e],
                        o[e] = n);
                return o
            }
            ,
            o.prototype.extend = function() {
                var t, e, o, n, s, r, a;
                for (n = arguments[0],
                         r = 0,
                         a = (o = 2 <= arguments.length ? __slice.call(arguments, 1) : []).length; r < a; r++)
                    for (t in e = o[r])
                        __hasProp.call(e, t) && (s = e[t],
                            n[t] = s);
                return n
            }
            ,
            o
    }(),
    Opentip.addAdapter(new Adapter),
document.createElement("canvas").getContext || function() {
    var t = Math
        , e = t.round
        , o = t.sin
        , n = t.cos
        , s = t.abs
        , r = t.sqrt;
    function a() {
        return this.context_ || (this.context_ = new y(this))
    }
    var h = Array.prototype.slice
        , l = {
        init: function(t) {
            if (/MSIE/.test(navigator.userAgent) && !window.opera) {
                var e = t || document;
                e.createElement("canvas"),
                    e.attachEvent("onreadystatechange", function(t, e, o) {
                        var n = h.call(arguments, 2);
                        return function() {
                            return t.apply(e, n.concat(h.call(arguments)))
                        }
                    }(this.init_, this, e))
            }
        },
        init_: function(t) {
            if (t.namespaces.g_vml_ || t.namespaces.add("g_vml_", "urn:schemas-microsoft-com:vml", "#default#VML"),
            t.namespaces.g_o_ || t.namespaces.add("g_o_", "urn:schemas-microsoft-com:office:office", "#default#VML"),
                !t.styleSheets.ex_canvas_) {
                var e = t.createStyleSheet();
                e.owningElement.id = "ex_canvas_",
                    e.cssText = "canvas{display:inline-block;overflow:hidden;text-align:left;width:300px;height:150px}g_vml_\\:*{behavior:url(#default#VML)}g_o_\\:*{behavior:url(#default#VML)}"
            }
            for (var o = t.getElementsByTagName("canvas"), n = 0; n < o.length; n++)
                this.initElement(o[n])
        },
        initElement: function(t) {
            if (!t.getContext) {
                t.getContext = a,
                    t.innerHTML = "",
                    t.attachEvent("onpropertychange", p),
                    t.attachEvent("onresize", d);
                var e = t.attributes;
                e.width && e.width.specified ? t.style.width = e.width.nodeValue + "px" : t.width = t.clientWidth,
                    e.height && e.height.specified ? t.style.height = e.height.nodeValue + "px" : t.height = t.clientHeight
            }
            return t
        }
    };
    function p(t) {
        var e = t.srcElement;
        switch (t.propertyName) {
            case "width":
                e.style.width = e.attributes.width.nodeValue + "px",
                    e.getContext().clearRect();
                break;
            case "height":
                e.style.height = e.attributes.height.nodeValue + "px",
                    e.getContext().clearRect()
        }
    }
    function d(t) {
        var e = t.srcElement;
        e.firstChild && (e.firstChild.style.width = e.clientWidth + "px",
            e.firstChild.style.height = e.clientHeight + "px")
    }
    l.init();
    for (var u = [], c = 0; c < 16; c++)
        for (var f = 0; f < 16; f++)
            u[16 * c + f] = c.toString(16) + f.toString(16);
    function g(t, e) {
        for (var o = [[1, 0, 0], [0, 1, 0], [0, 0, 1]], n = 0; n < 3; n++)
            for (var s = 0; s < 3; s++) {
                for (var r = 0, a = 0; a < 3; a++)
                    r += t[n][a] * e[a][s];
                o[n][s] = r
            }
        return o
    }
    function m(t, e) {
        e.fillStyle = t.fillStyle,
            e.lineCap = t.lineCap,
            e.lineJoin = t.lineJoin,
            e.lineWidth = t.lineWidth,
            e.miterLimit = t.miterLimit,
            e.shadowBlur = t.shadowBlur,
            e.shadowColor = t.shadowColor,
            e.shadowOffsetX = t.shadowOffsetX,
            e.shadowOffsetY = t.shadowOffsetY,
            e.strokeStyle = t.strokeStyle,
            e.globalAlpha = t.globalAlpha,
            e.arcScaleX_ = t.arcScaleX_,
            e.arcScaleY_ = t.arcScaleY_,
            e.lineScale_ = t.lineScale_
    }
    function v(t) {
        var e, o = 1;
        if ("rgb" == (t = String(t)).substring(0, 3)) {
            var n = t.indexOf("(", 3)
                , s = t.indexOf(")", n + 1)
                , r = t.substring(n + 1, s).split(",");
            e = "#";
            for (var a = 0; a < 3; a++)
                e += u[Number(r[a])];
            4 == r.length && "a" == t.substr(3, 1) && (o = r[3])
        } else
            e = t;
        return {
            color: e,
            alpha: o
        }
    }
    function y(t) {
        this.m_ = [[1, 0, 0], [0, 1, 0], [0, 0, 1]],
            this.mStack_ = [],
            this.aStack_ = [],
            this.currentPath_ = [],
            this.strokeStyle = "#000",
            this.fillStyle = "#000",
            this.lineWidth = 1,
            this.lineJoin = "miter",
            this.lineCap = "butt",
            this.miterLimit = 10,
            this.globalAlpha = 1,
            this.canvas = t;
        var e = t.ownerDocument.createElement("div");
        e.style.width = t.clientWidth + "px",
            e.style.height = t.clientHeight + "px",
            e.style.position = "absolute",
            t.appendChild(e),
            this.element_ = e,
            this.arcScaleX_ = 1,
            this.arcScaleY_ = 1,
            this.lineScale_ = 1
    }
    var b = y.prototype;
    function w(t, e, o, n) {
        t.currentPath_.push({
            type: "bezierCurveTo",
            cp1x: e.x,
            cp1y: e.y,
            cp2x: o.x,
            cp2y: o.y,
            x: n.x,
            y: n.y
        }),
            t.currentX_ = n.x,
            t.currentY_ = n.y
    }
    function _(t, e, o) {
        if (function(t) {
            for (var e = 0; e < 3; e++)
                for (var o = 0; o < 2; o++)
                    if (!isFinite(t[e][o]) || isNaN(t[e][o]))
                        return !1;
            return !0
        }(e) && (t.m_ = e,
            o)) {
            var n = e[0][0] * e[1][1] - e[0][1] * e[1][0];
            t.lineScale_ = r(s(n))
        }
    }
    function x(t) {
        this.type_ = t,
            this.x0_ = 0,
            this.y0_ = 0,
            this.r0_ = 0,
            this.x1_ = 0,
            this.y1_ = 0,
            this.r1_ = 0,
            this.colors_ = []
    }
    function C() {}
    b.clearRect = function() {
        this.element_.innerHTML = ""
    }
        ,
        b.beginPath = function() {
            this.currentPath_ = []
        }
        ,
        b.moveTo = function(t, e) {
            var o = this.getCoords_(t, e);
            this.currentPath_.push({
                type: "moveTo",
                x: o.x,
                y: o.y
            }),
                this.currentX_ = o.x,
                this.currentY_ = o.y
        }
        ,
        b.lineTo = function(t, e) {
            var o = this.getCoords_(t, e);
            this.currentPath_.push({
                type: "lineTo",
                x: o.x,
                y: o.y
            }),
                this.currentX_ = o.x,
                this.currentY_ = o.y
        }
        ,
        b.bezierCurveTo = function(t, e, o, n, s, r) {
            var a = this.getCoords_(s, r);
            w(this, this.getCoords_(t, e), this.getCoords_(o, n), a)
        }
        ,
        b.quadraticCurveTo = function(t, e, o, n) {
            var s = this.getCoords_(t, e)
                , r = this.getCoords_(o, n)
                , a = {
                x: this.currentX_ + 2 / 3 * (s.x - this.currentX_),
                y: this.currentY_ + 2 / 3 * (s.y - this.currentY_)
            };
            w(this, a, {
                x: a.x + (r.x - this.currentX_) / 3,
                y: a.y + (r.y - this.currentY_) / 3
            }, r)
        }
        ,
        b.arc = function(t, e, s, r, a, h) {
            s *= 10;
            var l = t + n(r) * s - 5
                , p = e + o(r) * s - 5
                , d = t + n(a) * s - 5
                , u = e + o(a) * s - 5;
            l != d || h || (l += .125);
            var c = this.getCoords_(t, e)
                , f = this.getCoords_(l, p)
                , g = this.getCoords_(d, u);
            this.currentPath_.push({
                type: h ? "at" : "wa",
                x: c.x,
                y: c.y,
                radius: s,
                xStart: f.x,
                yStart: f.y,
                xEnd: g.x,
                yEnd: g.y
            })
        }
        ,
        b.rect = function(t, e, o, n) {
            this.moveTo(t, e),
                this.lineTo(t + o, e),
                this.lineTo(t + o, e + n),
                this.lineTo(t, e + n),
                this.closePath()
        }
        ,
        b.strokeRect = function(t, e, o, n) {
            var s = this.currentPath_;
            this.beginPath(),
                this.moveTo(t, e),
                this.lineTo(t + o, e),
                this.lineTo(t + o, e + n),
                this.lineTo(t, e + n),
                this.closePath(),
                this.stroke(),
                this.currentPath_ = s
        }
        ,
        b.fillRect = function(t, e, o, n) {
            var s = this.currentPath_;
            this.beginPath(),
                this.moveTo(t, e),
                this.lineTo(t + o, e),
                this.lineTo(t + o, e + n),
                this.lineTo(t, e + n),
                this.closePath(),
                this.fill(),
                this.currentPath_ = s
        }
        ,
        b.createLinearGradient = function(t, e, o, n) {
            var s = new x("gradient");
            return s.x0_ = t,
                s.y0_ = e,
                s.x1_ = o,
                s.y1_ = n,
                s
        }
        ,
        b.createRadialGradient = function(t, e, o, n, s, r) {
            var a = new x("gradientradial");
            return a.x0_ = t,
                a.y0_ = e,
                a.r0_ = o,
                a.x1_ = n,
                a.y1_ = s,
                a.r1_ = r,
                a
        }
        ,
        b.drawImage = function(o, n) {
            var s, r, a, h, l, p, d, u, c = o.runtimeStyle.width, f = o.runtimeStyle.height;
            o.runtimeStyle.width = "auto",
                o.runtimeStyle.height = "auto";
            var g = o.width
                , m = o.height;
            if (o.runtimeStyle.width = c,
                o.runtimeStyle.height = f,
            3 == arguments.length)
                s = arguments[1],
                    r = arguments[2],
                    l = p = 0,
                    d = a = g,
                    u = h = m;
            else if (5 == arguments.length)
                s = arguments[1],
                    r = arguments[2],
                    a = arguments[3],
                    h = arguments[4],
                    l = p = 0,
                    d = g,
                    u = m;
            else {
                if (9 != arguments.length)
                    throw Error("Invalid number of arguments");
                l = arguments[1],
                    p = arguments[2],
                    d = arguments[3],
                    u = arguments[4],
                    s = arguments[5],
                    r = arguments[6],
                    a = arguments[7],
                    h = arguments[8]
            }
            var v = this.getCoords_(s, r)
                , y = [];
            if (y.push(" <g_vml_:group", ' coordsize="', 100, ",", 100, '"', ' coordorigin="0,0"', ' style="width:', 10, "px;height:", 10, "px;position:absolute;"),
            1 != this.m_[0][0] || this.m_[0][1]) {
                var b = [];
                b.push("M11=", this.m_[0][0], ",", "M12=", this.m_[1][0], ",", "M21=", this.m_[0][1], ",", "M22=", this.m_[1][1], ",", "Dx=", e(v.x / 10), ",", "Dy=", e(v.y / 10), "");
                var w = v
                    , _ = this.getCoords_(s + a, r)
                    , x = this.getCoords_(s, r + h)
                    , C = this.getCoords_(s + a, r + h);
                w.x = t.max(w.x, _.x, x.x, C.x),
                    w.y = t.max(w.y, _.y, x.y, C.y),
                    y.push("padding:0 ", e(w.x / 10), "px ", e(w.y / 10), "px 0;filter:progid:DXImageTransform.Microsoft.Matrix(", b.join(""), ", sizingmethod='clip');")
            } else
                y.push("top:", e(v.y / 10), "px;left:", e(v.x / 10), "px;");
            y.push(' ">', '<g_vml_:image src="', o.src, '"', ' style="width:', 10 * a, "px;", " height:", 10 * h, 'px;"', ' cropleft="', l / g, '"', ' croptop="', p / m, '"', ' cropright="', (g - l - d) / g, '"', ' cropbottom="', (m - p - u) / m, '"', " />", "</g_vml_:group>"),
                this.element_.insertAdjacentHTML("BeforeEnd", y.join(""))
        }
        ,
        b.stroke = function(o) {
            var n = []
                , s = v(o ? this.fillStyle : this.strokeStyle)
                , r = s.color
                , a = s.alpha * this.globalAlpha;
            n.push("<g_vml_:shape", ' filled="', !!o, '"', ' style="position:absolute;width:', 10, "px;height:", 10, 'px;"', ' coordorigin="0 0" coordsize="', 100, " ", 100, '"', ' stroked="', !o, '"', ' path="');
            for (var h = {
                x: null,
                y: null
            }, l = {
                x: null,
                y: null
            }, p = 0; p < this.currentPath_.length; p++) {
                var d = this.currentPath_[p];
                switch (d.type) {
                    case "moveTo":
                        n.push(" m ", e(d.x), ",", e(d.y));
                        break;
                    case "lineTo":
                        n.push(" l ", e(d.x), ",", e(d.y));
                        break;
                    case "close":
                        n.push(" x "),
                            d = null;
                        break;
                    case "bezierCurveTo":
                        n.push(" c ", e(d.cp1x), ",", e(d.cp1y), ",", e(d.cp2x), ",", e(d.cp2y), ",", e(d.x), ",", e(d.y));
                        break;
                    case "at":
                    case "wa":
                        n.push(" ", d.type, " ", e(d.x - this.arcScaleX_ * d.radius), ",", e(d.y - this.arcScaleY_ * d.radius), " ", e(d.x + this.arcScaleX_ * d.radius), ",", e(d.y + this.arcScaleY_ * d.radius), " ", e(d.xStart), ",", e(d.yStart), " ", e(d.xEnd), ",", e(d.yEnd))
                }
                d && ((null == h.x || d.x < h.x) && (h.x = d.x),
                (null == l.x || d.x > l.x) && (l.x = d.x),
                (null == h.y || d.y < h.y) && (h.y = d.y),
                (null == l.y || d.y > l.y) && (l.y = d.y))
            }
            if (n.push(' ">'),
                o) {
                if ("object" == typeof this.fillStyle) {
                    var u = this.fillStyle
                        , c = 0
                        , f = {
                        x: 0,
                        y: 0
                    }
                        , g = 0
                        , m = 1;
                    if ("gradient" == u.type_) {
                        var y, b = u.x0_ / this.arcScaleX_, w = u.y0_ / this.arcScaleY_, _ = u.x1_ / this.arcScaleX_, x = u.y1_ / this.arcScaleY_, C = this.getCoords_(b, w), T = this.getCoords_(_, x);
                        (c = 180 * Math.atan2(T.x - C.x, T.y - C.y) / Math.PI) < 0 && (c += 360),
                        c < 1e-6 && (c = 0)
                    } else {
                        C = this.getCoords_(u.x0_, u.y0_);
                        var S = l.x - h.x
                            , O = l.y - h.y;
                        f = {
                            x: (C.x - h.x) / S,
                            y: (C.y - h.y) / O
                        },
                            S /= 10 * this.arcScaleX_,
                            O /= 10 * this.arcScaleY_;
                        var E = t.max(S, O);
                        g = 2 * u.r0_ / E,
                            m = 2 * u.r1_ / E - g
                    }
                    var P = u.colors_;
                    P.sort(function(t, e) {
                        return t.offset - e.offset
                    });
                    var L = P.length
                        , k = P[0].color
                        , B = P[L - 1].color
                        , M = P[0].alpha * this.globalAlpha
                        , H = P[L - 1].alpha * this.globalAlpha
                        , A = [];
                    for (p = 0; p < L; p++) {
                        var I = P[p];
                        A.push(I.offset * m + g + " " + I.color)
                    }
                    n.push('<g_vml_:fill type="', u.type_, '"', ' method="none" focus="100%"', ' color="', k, '"', ' color2="', B, '"', ' colors="', A.join(","), '"', ' opacity="', H, '"', ' g_o_:opacity2="', M, '"', ' angle="', c, '"', ' focusposition="', f.x, ",", f.y, '" />')
                } else
                    n.push('<g_vml_:fill color="', r, '" opacity="', a, '" />')
            } else {
                var R = this.lineScale_ * this.lineWidth;
                R < 1 && (a *= R),
                    n.push("<g_vml_:stroke", ' opacity="', a, '"', ' joinstyle="', this.lineJoin, '"', ' miterlimit="', this.miterLimit, '"', ' endcap="', function(t) {
                        switch (t) {
                            case "butt":
                                return "flat";
                            case "round":
                                return "round";
                            default:
                                return "square"
                        }
                    }(this.lineCap), '"', ' weight="', R, 'px"', ' color="', r, '" />')
            }
            n.push("</g_vml_:shape>"),
                this.element_.insertAdjacentHTML("beforeEnd", n.join(""))
        }
        ,
        b.fill = function() {
            this.stroke(!0)
        }
        ,
        b.closePath = function() {
            this.currentPath_.push({
                type: "close"
            })
        }
        ,
        b.getCoords_ = function(t, e) {
            var o = this.m_;
            return {
                x: 10 * (t * o[0][0] + e * o[1][0] + o[2][0]) - 5,
                y: 10 * (t * o[0][1] + e * o[1][1] + o[2][1]) - 5
            }
        }
        ,
        b.save = function() {
            var t = {};
            m(this, t),
                this.aStack_.push(t),
                this.mStack_.push(this.m_),
                this.m_ = g([[1, 0, 0], [0, 1, 0], [0, 0, 1]], this.m_)
        }
        ,
        b.restore = function() {
            m(this.aStack_.pop(), this),
                this.m_ = this.mStack_.pop()
        }
        ,
        b.translate = function(t, e) {
            _(this, g([[1, 0, 0], [0, 1, 0], [t, e, 1]], this.m_), !1)
        }
        ,
        b.rotate = function(t) {
            var e = n(t)
                , s = o(t);
            _(this, g([[e, s, 0], [-s, e, 0], [0, 0, 1]], this.m_), !1)
        }
        ,
        b.scale = function(t, e) {
            this.arcScaleX_ *= t,
                this.arcScaleY_ *= e,
                _(this, g([[t, 0, 0], [0, e, 0], [0, 0, 1]], this.m_), !0)
        }
        ,
        b.transform = function(t, e, o, n, s, r) {
            _(this, g([[t, e, 0], [o, n, 0], [s, r, 1]], this.m_), !0)
        }
        ,
        b.setTransform = function(t, e, o, n, s, r) {
            _(this, [[t, e, 0], [o, n, 0], [s, r, 1]], !0)
        }
        ,
        b.clip = function() {}
        ,
        b.arcTo = function() {}
        ,
        b.createPattern = function() {
            return new C
        }
        ,
        x.prototype.addColorStop = function(t, e) {
            e = v(e),
                this.colors_.push({
                    offset: t,
                    color: e.color,
                    alpha: e.alpha
                })
        }
        ,
        G_vmlCanvasManager = l,
        CanvasRenderingContext2D = y,
        CanvasGradient = x,
        CanvasPattern = C
}(),
"undefined" == typeof document || "classList"in document.createElement("a") || function(t) {
    "use strict";
    if ("HTMLElement"in t || "Element"in t) {
        var e = (t.HTMLElement || t.Element).prototype
            , o = Object
            , n = String.prototype.trim || function() {
            return this.replace(/^\s+|\s+$/g, "")
        }
            , s = Array.prototype.indexOf || function(t) {
            for (var e = 0, o = this.length; e < o; e++)
                if (e in this && this[e] === t)
                    return e;
            return -1
        }
            , r = function(t, e) {
            this.name = t,
                this.code = DOMException[t],
                this.message = e
        }
            , a = function(t, e) {
            if ("" === e)
                throw new r("SYNTAX_ERR","An invalid or illegal string was specified");
            if (/\s/.test(e))
                throw new r("INVALID_CHARACTER_ERR","String contains an invalid character");
            return s.call(t, e)
        }
            , h = function(t) {
            for (var e = n.call(t.className), o = e ? e.split(/\s+/) : [], s = 0, r = o.length; s < r; s++)
                this.push(o[s]);
            this._updateClassName = function() {
                t.className = this.toString()
            }
        }
            , l = h.prototype = []
            , p = function() {
            return new h(this)
        };
        if (r.prototype = Error.prototype,
            l.item = function(t) {
                return this[t] || null
            }
            ,
            l.contains = function(t) {
                return -1 !== a(this, t += "")
            }
            ,
            l.add = function() {
                var t, e = arguments, o = 0, n = e.length, s = !1;
                do
                    -1 === a(this, t = e[o] + "") && (this.push(t),
                        s = !0);
                while (++o < n);
                s && this._updateClassName()
            }
            ,
            l.remove = function() {
                var t, e = arguments, o = 0, n = e.length, s = !1;
                do {
                    var r = a(this, t = e[o] + "");
                    -1 !== r && (this.splice(r, 1),
                        s = !0)
                } while (++o < n);
                s && this._updateClassName()
            }
            ,
            l.toggle = function(t, e) {
                t += "";
                var o = this.contains(t)
                    , n = o ? !0 !== e && "remove" : !1 !== e && "add";
                return n && this[n](t),
                    o
            }
            ,
            l.toString = function() {
                return this.join(" ")
            }
            ,
            o.defineProperty) {
            var d = {
                get: p,
                enumerable: !0,
                configurable: !0
            };
            try {
                o.defineProperty(e, "classList", d)
            } catch (u) {
                -2146823252 === u.number && (d.enumerable = !1,
                    o.defineProperty(e, "classList", d))
            }
        } else
            o.prototype.__defineGetter__ && e.__defineGetter__("classList", p)
    }
}(self),
window.addEventListener || function(t, e, o, n, s, r, a) {
    t.addEventListener = e.addEventListener = o.addEventListener = function(t, e) {
        var o = this;
        a.unshift([o, t, e, function(t) {
            t.currentTarget = o,
                t.preventDefault = function() {
                    t.returnValue = !1
                }
                ,
                t.stopPropagation = function() {
                    t.cancelBubble = !0
                }
                ,
                t.target = t.srcElement || o,
                e.call(o, t)
        }
        ]),
            this.attachEvent("on" + t, a[0][3])
    }
        ,
        t.removeEventListener = e.removeEventListener = o.removeEventListener = function(t, e) {
            for (var o, n = 0; o = a[n]; ++n)
                if (o[0] == this && o[1] == t && o[2] == e)
                    return this.detachEvent("on" + t, a.splice(n, 1)[0][3])
        }
        ,
        t.dispatchEvent = e.dispatchEvent = o.dispatchEvent = function(t) {
            return this.fireEvent("on" + t.type, t)
        }
}(Window.prototype, HTMLDocument.prototype, Element.prototype, 0, 0, 0, []),
    $,
    function() {
        var t = $(".navigation__left .sidebar__title a");
        if (t.length) {
            var e = $(".navigation__top .menu_main .menu__item .top_level");
            if (e.length)
                for (var o = 0; o < e.length; o++)
                    e[o].innerHTML == t.text() ? e[o].parentElement.classList.add("active") : e[o].parentElement.classList.remove("active")
        }
    }(),
    $(".password-group button").hide();
