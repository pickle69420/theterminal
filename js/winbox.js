/**
 * WinBox.js v0.2.1
 * Copyright 2021 Nextapps GmbH
 * Author: Thomas Wilkerling
 * Licence: Apache-2.0
 * https://github.com/nextapps-de/winbox
 */
 (function () {
    "use strict";
    var g,
        k = document.createElement("div");
    k.innerHTML =
        "<div class=wb-header><div class=wb-icon><span class=wb-min></span><span class=wb-max></span></span><span class=wb-close></span></div><div class=wb-title> </div></div><div class=wb-body></div><div class=wb-n></div><div class=wb-s></div><div class=wb-w></div><div class=wb-e></div><div class=wb-nw></div><div class=wb-ne></div><div class=wb-se></div><div class=wb-sw></div>";
    function l(a, b, c, e) {
        a.addEventListener(b, c, e || !1 === e ? e : !0);
    }
    function m(a) {
        a.stopPropagation();
        a.cancelable && a.preventDefault();
    }
    function n(a, b, c) {
        c = "" + c;
        a["_s_" + b] !== c && (a.style.setProperty(b, c), (a["_s_" + b] = c));
    }
    var r = [],
        w,
        y = 0,
        z = 0,
        C,
        D,
        E,
        F,
        G,
        K,
        P;
    function R(a, b) {
        if (!(this instanceof R)) return new R(a);
        C || S();
        var c, e;
        if (a) {
            if (b) {
                var d = a;
                a = b;
            }
            if ("string" === typeof a) d = a;
            else {
                if ((e = a.modal)) var h = (c = "center");
                var p = a.id;
                var t = a.root;
                var H = a.template;
                d = d || a.title;
                var f = a.mount;
                var q = a.html;
                var x = a.url;
                var u = a.width;
                var v = a.height;
                var A = a.minwidth;
                var B = a.minheight;
                h = a.x || h;
                c = a.y || c;
                var L = a.max;
                var Z = a.hidden;
                var I = a.top;
                var J = a.left;
                var M = a.bottom;
                var N = a.right;
                C = a.index || C;
                var aa = a.onclose;
                var ba = a.onfocus;
                var ca = a.onblur;
                var da = a.onmove;
                var ea = a.onresize;
                var V = a.background;
                var Q = a.border;
                var O = a["class"];
                var fa = a.splitscreen;
            }
        }
        this.g = H ? H : k.cloneNode(!0);
        this.body = this.g.getElementsByClassName("wb-body")[0];
        V && this.setBackground(V);
        Q && n(this.body, "margin", Q + (isNaN(Q) ? "" : "px"));
        this.setTitle(d || "");
        a = K;
        b = P;
        I = I ? T(I, b) : 0;
        M = M ? T(M, b) : 0;
        J = J ? T(J, a) : 0;
        N = N ? T(N, a) : 0;
        a -= J + N;
        b -= I + M;
        u = u ? T(u, a) : (a / 2) | 0;
        v = v ? T(v, b) : (b / 2) | 0;
        A = A ? T(A, a) : 0;
        B = B ? T(B, b) : 0;
        h = h ? T(h, a, u) : J;
        c = c ? T(c, b, v) : I;
        C = C || 10;
        this.g.id = this.id = p || "winbox-" + ++y;
        this.g.className = "winbox" + (O ? " " + ("string" === typeof O ? O : O.join(" ")) : "") + (e ? " modal" : "");
        this.x = h;
        this.y = c;
        this.width = u;
        this.height = v;
        this.j = A;
        this.i = B;
        this.top = I;
        this.right = N;
        this.bottom = M;
        this.left = J;
        this.max = this.min = !1;
        this.onclose = aa;
        this.onfocus = ba;
        this.onblur = ca;
        this.onmove = da;
        this.onresize = ea;
        this.l = fa;
        L ? this.maximize() : this.move().resize();
        f ? this.mount(f) : q ? (this.body.innerHTML = q) : x && this.setUrl(x);
        Z ? this.hide() : this.focus();
        this.g.winbox = this;
        ha(this);
        (t || w).appendChild(this.g);
    }
    R["new"] = function (a) {
        return new R(a);
    };
    function T(a, b, c) {
        "string" === typeof a && ("center" === a ? (a = ((b - c) / 2) | 0) : "right" === a || "bottom" === a ? (a = b - c) : ((c = parseFloat(a)), (a = "%" === ("" + c !== a && a.substring(("" + c).length)) ? ((b / 100) * c) | 0 : c)));
        return a;
    }
    function S() {
        w = document.body;
        w[(F = "requestFullscreen")] || w[(F = "msRequestFullscreen")] || w[(F = "webkitRequestFullscreen")] || w[(F = "mozRequestFullscreen")] || (F = "");
        G = F && F.replace("request", "exit").replace("mozRequest", "mozCancel").replace("Request", "Exit");
        l(window, "resize", function () {
            K = w.clientWidth;
            P = w.clientHeight;
            U();
        });
        K = w.clientWidth;
        P = w.clientHeight;
    }
    function ha(a) {
        W(a, "title");
        W(a, "n");
        W(a, "s");
        W(a, "w");
        W(a, "e");
        W(a, "nw");
        W(a, "ne");
        W(a, "se");
        W(a, "sw");
        l(a.g.getElementsByClassName("wb-min")[0], "click", function (b) {
            m(b);
            a.minimize();
        });
        l(a.g.getElementsByClassName("wb-max")[0], "click", function (b) {
            m(b);
            a.focus().maximize();
        });
        l(a.g.getElementsByClassName("wb-close")[0], "click", function (b) {
            m(b);
            a.close() || (a = null);
        });
        l(
            a.g,
            "click",
            function () {
                a.focus();
            },
            !1
        );
    }
    function X(a) {
        r.splice(r.indexOf(a), 1);
        U();
        a.removeClass("min");
        a.min = !1;
        a.g.title = "";
    }
    function U() {
        for (var a = r.length, b = {}, c = {}, e = 0, d; e < a; e++) (d = r[e]), (d = d.left + ":" + d.top), c[d] ? c[d]++ : (c[d] = 1);
        e = 0;
        for (var h, p, t; e < a; e++)
            (d = r[e]),
                (h = d.left + ":" + d.top),
                (p = Math.min((K - d.left - d.right) / c[h], 250)),
                (t = d.g.getElementsByClassName("wb-title")[0]),
                (t = t.clientHeight),
                b[h] || (b[h] = 0),
                d.resize((p + 1) | 0, 0, !0).move((d.left + b[h] * p) | 0, P - d.bottom - t, !0),
                b[h]++;
    }
    function W(a, b) {
        function c(f) {
            m(f);
            if (a.min) a.minimize();
            else {
                var q;
                if ((q = "title" === b)) q = !a.g.classList.contains("no-max");
                if (q) {
                    q = Date.now();
                    var x = q - z;
                    z = q;
                    if (250 > x) {
                        a.maximize();
                        return;
                    }
                }
                a.max ||
                    (w.classList.add("wb-drag"),
                    (p = f.touches) && (p = p[0]) ? ((f = p), l(window, "touchmove", e), l(window, "touchend", d)) : (l(window, "mousemove", e), l(window, "mouseup", d)),
                    (t = f.pageX),
                    (H = f.pageY),
                    a.focus());
            }
        }
        function e(f) {
            m(f);
            p && (f = f.touches[0]);
            var q = f.pageX;
            f = f.pageY;
            var x = q - t,
                u = f - H,
                v;
            if ("title" === b) {
                a.x += x;
                a.y += u;
                var A = (v = 1);
            } else {
                if ("e" === b || "se" === b || "ne" === b) {
                    a.width += x;
                    var B = 1;
                } else if ("w" === b || "sw" === b || "nw" === b) (a.x += x), (a.width -= x), (A = B = 1);
                if ("s" === b || "se" === b || "sw" === b) {
                    a.height += u;
                    var L = 1;
                } else if ("n" === b || "ne" === b || "nw" === b) (a.y += u), (a.height -= u), (v = L = 1);
            }
            if (B || L) B && (a.width = Math.max(Math.min(a.width, K - a.x - a.right), 150)), L && (a.height = Math.max(Math.min(a.height, P - a.y - a.bottom), 0)), a.resize();
            if (A || v) A && (a.x = Math.max(Math.min(a.x, K - a.width - a.right), a.left)), v && (a.y = Math.max(Math.min(a.y, P - a.height - a.bottom), a.top)), a.move();
            t = q;
            H = f;
        }
        function d(f) {
            m(f);
            w.classList.remove("wb-drag");
            p ? (window.removeEventListener("touchmove", e, !0), window.removeEventListener("touchend", d, !0)) : (window.removeEventListener("mousemove", e, !0), window.removeEventListener("mouseup", d, !0));
        }
        var h = a.g.getElementsByClassName("wb-" + b)[0],
            p,
            t,
            H;
        l(h, "mousedown", c);
        l(h, "touchstart", c, { passive: !1 });
    }
    g = R.prototype;
    g.mount = function (a) {
        this.unmount();
        a.h || (a.h = a.parentNode);
        this.body.textContent = "";
        this.body.appendChild(a);
        return this;
    };
    g.unmount = function (a) {
        var b = this.body.firstChild;
        if (b) {
            var c = a || b.h;
            c && c.appendChild(b);
            b.h = a;
        }
        return this;
    };
    g.setTitle = function (a) {
        a = this.title = a;
        this.g.getElementsByClassName("wb-title")[0].firstChild.nodeValue = a;
        return this;
    };
    g.setBackground = function (a) {
        n(this.g, "background", a);
        return this;
    };
    g.setUrl = function (a) {
        this.body.innerHTML = '<iframe src="' + a + '"></iframe>';
        return this;
    };
    g.focus = function () {
        E !== this && (n(this.g, "z-index", C++), this.addClass("focus"), E && (E.removeClass("focus"), E.onblur && E.onblur()), (E = this), this.onfocus && this.onfocus());
        return this;
    };
    g.hide = function () {
        return this.addClass("hide");
    };
    g.show = function () {
        return this.removeClass("hide");
    };
    g.minimize = function (a) {
        D && Y();
        !a && this.min ? (X(this), this.resize().move().focus()) : !1 === a || this.min || (r.push(this), U(), (this.g.title = this.title), this.addClass("min"), (this.min = !0));
        this.max && (this.removeClass("max"), (this.max = !1));
        return this;
    };
    g.maximize = function (a) {
        if ("undefined" === typeof a || a !== this.max)
            this.min && X(this),
                (this.max = !this.max)
                    ? this.addClass("max")
                          .resize(K - this.left - this.right, P - this.top - this.bottom, !0)
                          .move(this.left, this.top, !0)
                    : this.resize().move().removeClass("max");
        return this;
    };
    g.fullscreen = function (a) {
        if ("undefined" === typeof a || a !== D) this.min && (this.resize().move(), X(this)), (D && Y()) || (this.body[F](), (D = !0));
        return this;
    };
    function Y() {
        D = !1;
        if (document.fullscreen || document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement) return document[G](), !0;
    }
    g.close = function (a) {
        if (this.onclose && this.onclose(a)) return !0;
        this.min && X(this);
        this.unmount();
        this.g.parentNode.removeChild(this.g);
        E === this && (E = null);
    };
    g.move = function (a, b, c) {
        a || 0 === a
            ? c || ((this.x = a ? (a = T(a, K - this.left - this.right, this.width)) : 0), (this.y = b ? (b = T(b, P - this.top - this.bottom, this.height)) : 0))
            : ((a = this.x), (b = this.y), this.l && (0 === a ? this.resize(K / 2, P) : a === K - this.width && this.resize(K / 2, P)));
        n(this.g, "transform", "translate(" + a + "px," + b + "px)");
        this.onmove && this.onmove(a, b);
        return this;
    };
    g.resize = function (a, b, c) {
        a || 0 === a ? c || ((this.width = a ? (a = T(a, K - this.left - this.right)) : 0), (this.height = b ? (b = T(b, P - this.top - this.bottom)) : 0)) : ((a = this.width), (b = this.height));
        a = Math.max(a, this.j);
        b = Math.max(b, this.i);
        n(this.g, "width", a + "px");
        n(this.g, "height", b + "px");
        this.onresize && this.onresize(a, b);
        return this;
    };
    g.addClass = function (a) {
        this.g.classList.add(a);
        return this;
    };
    g.removeClass = function (a) {
        this.g.classList.remove(a);
        return this;
    };
    window.WinBox = R;
}.call(this));
