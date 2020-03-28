(this || self || window).Two = function(t) {
    var e;
    e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this;
    var i = Object.prototype.toString,
        r = {
            _indexAmount: 0,
            natural: {
                slice: Array.prototype.slice,
                indexOf: Array.prototype.indexOf,
                keys: Object.keys,
                bind: Function.prototype.bind,
                create: Object.create
            },
            identity: function(t) {
                return t
            },
            isArguments: function(t) {
                return "[object Arguments]" === i.call(t)
            },
            isFunction: function(t) {
                return "[object Function]" === i.call(t)
            },
            isString: function(t) {
                return "[object String]" === i.call(t)
            },
            isNumber: function(t) {
                return "[object Number]" === i.call(t)
            },
            isDate: function(t) {
                return "[object Date]" === i.call(t)
            },
            isRegExp: function(t) {
                return "[object RegExp]" === i.call(t)
            },
            isError: function(t) {
                return "[object Error]" === i.call(t)
            },
            isFinite: function(t) {
                return isFinite(t) && !isNaN(parseFloat(t))
            },
            isNaN: function(t) {
                return r.isNumber(t) && t !== +t
            },
            isBoolean: function(t) {
                return !0 === t || !1 === t || "[object Boolean]" === i.call(t)
            },
            isNull: function(t) {
                return null === t
            },
            isUndefined: function(t) {
                return void 0 === t
            },
            isEmpty: function(t) {
                return null == t || (m && (r.isArray(t) || r.isString(t) || r.isArguments(t)) ? 0 === t.length : 0 === r.keys(t).length)
            },
            isElement: function(t) {
                return !(!t || 1 !== t.nodeType)
            },
            isArray: Array.isArray || function(t) {
                return "[object Array]" === i.call(t)
            },
            isObject: function(t) {
                var e = typeof t;
                return "function" === e || "object" === e && !!t
            },
            toArray: function(t) {
                return t ? r.isArray(t) ? _.call(t) : m(t) ? r.map(t, r.identity) : r.values(t) : []
            },
            range: function(t, e, i) {
                null == e && (e = t || 0, t = 0), i = i || 1;
                for (var r = Math.max(Math.ceil((e - t) / i), 0), s = Array(r), n = 0; n < r; n++, t += i) s[n] = t;
                return s
            },
            indexOf: function(t, e) {
                if (r.natural.indexOf) return r.natural.indexOf.call(t, e);
                for (var i = 0; i < t.length; i++)
                    if (t[i] === e) return i;
                return -1
            },
            has: function(t, e) {
                return null != t && hasOwnProperty.call(t, e)
            },
            bind: function(t, e) {
                var i = r.natural.bind;
                if (i && t.bind === i) return i.apply(t, _.call(arguments, 1));
                var s = _.call(arguments, 2);
                return function() {
                    t.apply(e, s)
                }
            },
            extend: function(t) {
                for (var e = _.call(arguments, 1), i = 0; i < e.length; i++) {
                    var r = e[i];
                    for (var s in r) t[s] = r[s]
                }
                return t
            },
            defaults: function(t) {
                for (var e = _.call(arguments, 1), i = 0; i < e.length; i++) {
                    var r = e[i];
                    for (var s in r) void 0 === t[s] && (t[s] = r[s])
                }
                return t
            },
            keys: function(t) {
                if (!r.isObject(t)) return [];
                if (r.natural.keys) return r.natural.keys(t);
                var e = [];
                for (var i in t) r.has(t, i) && e.push(i);
                return e
            },
            values: function(t) {
                for (var e = r.keys(t), i = [], s = 0; s < e.length; s++) {
                    var n = e[s];
                    i.push(t[n])
                }
                return i
            },
            each: function(t, e, i) {
                for (var s = i || this, n = !m(t) && r.keys(t), a = (n || t).length, o = 0; o < a; o++) {
                    var l = n ? n[o] : o;
                    e.call(s, t[l], l, t)
                }
                return t
            },
            map: function(t, e, i) {
                for (var s = i || this, n = !m(t) && r.keys(t), a = (n || t).length, o = [], l = 0; l < a; l++) {
                    var h = n ? n[l] : l;
                    o[l] = e.call(s, t[h], h, t)
                }
                return o
            },
            once: function(t) {
                var e = !1;
                return function() {
                    return e ? t : (e = !0, t.apply(this, arguments))
                }
            },
            after: function(t, e) {
                return function() {
                    for (; --t < 1;) return e.apply(this, arguments)
                }
            },
            uniqueId: function(t) {
                var e = ++r._indexAmount + "";
                return t ? t + e : e
            }
        },
        s = Math.sin,
        n = Math.cos,
        a = (Math.acos, Math.atan2, Math.sqrt),
        o = (Math.round, Math.abs),
        l = Math.PI,
        h = l / 2,
        c = Math.pow,
        d = Math.min,
        f = Math.max,
        u = 0,
        _ = r.natural.slice,
        g = e.performance && e.performance.now ? e.performance : Date,
        p = Math.pow(2, 53) - 1,
        m = function(t) {
            var e, i = null == (e = t) ? void 0 : e.length;
            return "number" == typeof i && i >= 0 && i <= p
        },
        v = {
            temp: e.document ? e.document.createElement("div") : {},
            hasEventListeners: r.isFunction(e.addEventListener),
            bind: function(t, e, i, r) {
                return this.hasEventListeners ? t.addEventListener(e, i, !!r) : t.attachEvent("on" + e, i), v
            },
            unbind: function(t, e, i, r) {
                return v.hasEventListeners ? t.removeEventListeners(e, i, !!r) : t.detachEvent("on" + e, i), v
            },
            getRequestAnimationFrame: function() {
                var t, i = 0,
                    s = ["ms", "moz", "webkit", "o"],
                    n = e.requestAnimationFrame;
                if (!n) {
                    for (var a = 0; a < s.length; a++) n = e[s[a] + "RequestAnimationFrame"] || n, t = e[s[a] + "CancelAnimationFrame"] || e[s[a] + "CancelRequestAnimationFrame"] || t;
                    n = n || function(t, r) {
                        var s = (new Date).getTime(),
                            n = Math.max(0, 16 - (s - i)),
                            a = e.setTimeout((function() {
                                t(s + n)
                            }), n);
                        return i = s + n, a
                    }
                }
                return n.init = r.once(M), n
            }
        },
        y = e.Two = function(t) {
            var i = r.defaults(t || {}, {
                fullscreen: !1,
                width: 640,
                height: 480,
                type: y.Types.svg,
                autostart: !1
            });
            if (r.each(i, (function(t, e) {
                    /fullscreen/i.test(e) || /autostart/i.test(e) || (this[e] = t)
                }), this), r.isElement(i.domElement)) {
                var s = i.domElement.tagName.toLowerCase();
                /^(CanvasRenderer-canvas|WebGLRenderer-canvas|SVGRenderer-svg)$/.test(this.type + "-" + s) || (this.type = y.Types[s])
            }
            if (this.renderer = new y[this.type](this), y.Utils.setPlaying.call(this, i.autostart), this.frameCount = 0, i.fullscreen) {
                var n = r.bind(C, this);
                r.extend(document.body.style, {
                    overflow: "hidden",
                    margin: 0,
                    padding: 0,
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    position: "fixed"
                }), r.extend(this.renderer.domElement.style, {
                    display: "block",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    position: "fixed"
                }), v.bind(e, "resize", n), n()
            } else r.isElement(i.domElement) || (this.renderer.setSize(i.width, i.height, this.ratio), this.width = i.width, this.height = i.height);
            this.renderer.bind(y.Events.resize, r.bind(R, this)), this.scene = this.renderer.scene, y.Instances.push(this), i.autostart && F.init()
        };
    r.extend(y, {
        root: e,
        nextFrameID: null,
        Array: e.Float32Array || Array,
        Types: {
            webgl: "WebGLRenderer",
            svg: "SVGRenderer",
            canvas: "CanvasRenderer"
        },
        Version: "v0.7.0",
        PublishDate: "2020-01-22T21:17:28.421Z",
        Identifier: "two-",
        Events: {
            play: "play",
            pause: "pause",
            update: "update",
            render: "render",
            resize: "resize",
            change: "change",
            remove: "remove",
            insert: "insert",
            order: "order",
            load: "load"
        },
        Commands: {
            move: "M",
            line: "L",
            curve: "C",
            arc: "A",
            close: "Z"
        },
        Resolution: 12,
        Instances: [],
        noConflict: function() {
            return e.Two = t, y
        },
        uniqueId: function() {
            var t = u;
            return u++, t
        },
        Utils: r.extend(r, {
            performance: g,
            defineProperty: function(t) {
                var e = "_" + t,
                    i = "_flag" + t.charAt(0).toUpperCase() + t.slice(1);
                Object.defineProperty(this, t, {
                    enumerable: !0,
                    get: function() {
                        return this[e]
                    },
                    set: function(t) {
                        this[e] = t, this[i] = !0
                    }
                })
            },
            Image: null,
            isHeadless: !1,
            shim: function(t, e) {
                return y.CanvasRenderer.Utils.shim(t), r.isUndefined(e) || (y.Utils.Image = e), y.Utils.isHeadless = !0, t
            },
            release: function(t) {
                if (r.isObject(t)) return r.isFunction(t.unbind) && t.unbind(), t.vertices && (r.isFunction(t.vertices.unbind) && t.vertices.unbind(), r.each(t.vertices, (function(t) {
                    r.isFunction(t.unbind) && t.unbind()
                }))), t.children && r.each(t.children, (function(t) {
                    y.Utils.release(t)
                })), t
            },
            xhr: function(t, e) {
                var i = new XMLHttpRequest;
                return i.open("GET", t), i.onreadystatechange = function() {
                    4 === i.readyState && 200 === i.status && e(i.responseText)
                }, i.send(), i
            },
            Curve: {
                CollinearityEpsilon: c(10, -30),
                RecursionLimit: 16,
                CuspLimit: 0,
                Tolerance: {
                    distance: .25,
                    angle: 0,
                    epsilon: Number.EPSILON
                },
                abscissas: [
                    [.5773502691896257],
                    [0, .7745966692414834],
                    [.33998104358485626, .8611363115940526],
                    [0, .5384693101056831, .906179845938664],
                    [.2386191860831969, .6612093864662645, .932469514203152],
                    [0, .4058451513773972, .7415311855993945, .9491079123427585],
                    [.1834346424956498, .525532409916329, .7966664774136267, .9602898564975363],
                    [0, .3242534234038089, .6133714327005904, .8360311073266358, .9681602395076261],
                    [.14887433898163122, .4333953941292472, .6794095682990244, .8650633666889845, .9739065285171717],
                    [0, .26954315595234496, .5190961292068118, .7301520055740494, .8870625997680953, .978228658146057],
                    [.1252334085114689, .3678314989981802, .5873179542866175, .7699026741943047, .9041172563704749, .9815606342467192],
                    [0, .2304583159551348, .44849275103644687, .6423493394403402, .8015780907333099, .9175983992229779, .9841830547185881],
                    [.10805494870734367, .31911236892788974, .5152486363581541, .6872929048116855, .827201315069765, .9284348836635735, .9862838086968123],
                    [0, .20119409399743451, .3941513470775634, .5709721726085388, .7244177313601701, .8482065834104272, .937273392400706, .9879925180204854],
                    [.09501250983763744, .2816035507792589, .45801677765722737, .6178762444026438, .755404408355003, .8656312023878318, .9445750230732326, .9894009349916499]
                ],
                weights: [
                    [1],
                    [.8888888888888888, .5555555555555556],
                    [.6521451548625461, .34785484513745385],
                    [.5688888888888889, .47862867049936647, .23692688505618908],
                    [.46791393457269104, .3607615730481386, .17132449237917036],
                    [.4179591836734694, .3818300505051189, .27970539148927664, .1294849661688697],
                    [.362683783378362, .31370664587788727, .22238103445337448, .10122853629037626],
                    [.3302393550012598, .31234707704000286, .26061069640293544, .1806481606948574, .08127438836157441],
                    [.29552422471475287, .26926671930999635, .21908636251598204, .1494513491505806, .06667134430868814],
                    [.2729250867779006, .26280454451024665, .23319376459199048, .18629021092773426, .1255803694649046, .05566856711617366],
                    [.24914704581340277, .2334925365383548, .20316742672306592, .16007832854334622, .10693932599531843, .04717533638651183],
                    [.2325515532308739, .22628318026289723, .2078160475368885, .17814598076194574, .13887351021978725, .09212149983772845, .04048400476531588],
                    [.2152638534631578, .2051984637212956, .18553839747793782, .15720316715819355, .12151857068790319, .08015808715976021, .03511946033175186],
                    [.2025782419255613, .19843148532711158, .1861610000155622, .16626920581699392, .13957067792615432, .10715922046717194, .07036604748810812, .03075324199611727],
                    [.1894506104550685, .18260341504492358, .16915651939500254, .14959598881657674, .12462897125553388, .09515851168249279, .062253523938647894, .027152459411754096]
                ]
            },
            devicePixelRatio: e.devicePixelRatio || 1,
            getBackingStoreRatio: function(t) {
                return t.webkitBackingStorePixelRatio || t.mozBackingStorePixelRatio || t.msBackingStorePixelRatio || t.oBackingStorePixelRatio || t.backingStorePixelRatio || 1
            },
            getRatio: function(t) {
                return y.Utils.devicePixelRatio / k(t)
            },
            setPlaying: function(t) {
                return this.playing = !!t, this
            },
            getComputedMatrix: function(t, e) {
                e = e && e.identity() || new y.Matrix;
                for (var i = t, r = []; i && i._matrix;) r.push(i._matrix), i = i.parent;
                r.reverse();
                for (var s = 0; s < r.length; s++) {
                    var n = r[s].elements;
                    e.multiply(n[0], n[1], n[2], n[3], n[4], n[5], n[6], n[7], n[8], n[9])
                }
                return e
            },
            decomposeMatrix: function(t) {
                return {
                    translateX: t.e,
                    translateY: t.f,
                    scaleX: t.a,
                    scaleY: t.d,
                    rotation: Math.asin(-t.b)
                }
            },
            extractCSSText: function(t, e) {
                var i, s, n, a;
                e || (e = {}), i = t.split(";");
                for (var o = 0; o < i.length; o++) n = (s = i[o].split(":"))[0], a = s[1], r.isUndefined(n) || r.isUndefined(a) || (e[n] = a.replace(/\s/, ""));
                return e
            },
            getSvgStyles: function(t) {
                for (var e = {}, i = y.Utils.getSvgAttributes(t), r = Math.max(i.length, t.style.length), s = 0; s < r; s++) {
                    var n = t.style[s],
                        a = i[s];
                    n && (e[n] = t.style[n]), a && (e[a] = t.getAttribute(a))
                }
                return e
            },
            getSvgAttributes: function(t) {
                for (var e = t.getAttributeNames(), i = ["id", "class", "transform", "xmlns", "viewBox"], s = 0; s < i.length; s++) {
                    var n = i[s],
                        a = r.indexOf(e, n);
                    a >= 0 && e.splice(a, 1)
                }
                return e
            },
            applySvgViewBox: function(t, e) {
                var i = e.split(/\s/),
                    r = parseFloat(i[0]),
                    s = parseFloat(i[1]),
                    n = parseFloat(i[2]),
                    a = parseFloat(i[3]),
                    o = Math.min(this.width / n, this.height / a);
                return t.translation.x -= r * o, t.translation.y -= s * o, t.scale = o, t
            },
            applySvgAttributes: function(t, i, s) {
                var n, a, o, l, h = {},
                    c = {},
                    d = {};
                if (e.getComputedStyle) {
                    var f = e.getComputedStyle(t);
                    for (n = f.length; n--;) o = f[a = f[n]], r.isUndefined(o) || (h[a] = o)
                }
                for (n = 0; n < t.attributes.length; n++) l = t.attributes[n], /style/i.test(l.nodeName) ? y.Utils.extractCSSText(l.value, d) : c[l.nodeName] = l.value;
                for (a in r.isUndefined(h.opacity) || (h["stroke-opacity"] = h.opacity, h["fill-opacity"] = h.opacity, delete h.opacity), s && r.defaults(h, s), r.extend(h, c, d), h.visible = !(r.isUndefined(h.display) && /none/i.test(h.display)) || r.isUndefined(h.visibility) && /hidden/i.test(h.visibility), h) switch (o = h[a], a) {
                    case "transform":
                        if (/none/i.test(o)) break;
                        var u = t.transform && t.transform.baseVal && t.transform.baseVal.length > 0 ? t.transform.baseVal[0].matrix : t.getCTM ? t.getCTM() : null;
                        if (r.isNull(u)) break;
                        var _ = y.Utils.decomposeMatrix(u);
                        i.translation.set(_.translateX, _.translateY), i.rotation = Math.PI * (_.rotation / 180), i.scale = new y.Vector(_.scaleX, _.scaleY);
                        var g = parseFloat((h.x + "").replace("px")),
                            p = parseFloat((h.y + "").replace("px"));
                        g && (i.translation.x = g), p && (i.translation.y = p);
                        break;
                    case "viewBox":
                        y.Utils.applySvgViewBox.call(this, i, o);
                        break;
                    case "visible":
                        if (i instanceof y.Group) {
                            i._visible = o;
                            break
                        }
                        i.visible = o;
                        break;
                    case "stroke-linecap":
                        if (i instanceof y.Group) {
                            i._cap = o;
                            break
                        }
                        i.cap = o;
                        break;
                    case "stroke-linejoin":
                        if (i instanceof y.Group) {
                            i._join = o;
                            break
                        }
                        i.join = o;
                        break;
                    case "stroke-miterlimit":
                        if (i instanceof y.Group) {
                            i._miter = o;
                            break
                        }
                        i.miter = o;
                        break;
                    case "stroke-width":
                        if (i instanceof y.Group) {
                            i._linewidth = parseFloat(o);
                            break
                        }
                        i.linewidth = parseFloat(o);
                        break;
                    case "opacity":
                    case "stroke-opacity":
                    case "fill-opacity":
                        if (i instanceof y.Group) {
                            i._opacity = parseFloat(o);
                            break
                        }
                        i.opacity = parseFloat(o);
                        break;
                    case "fill":
                    case "stroke":
                        if (i instanceof y.Group && (a = "_" + a), /url\(#.*\)/i.test(o)) {
                            var m = y.Utils.getScene(this);
                            i[a] = m.getById(o.replace(/url\(#(.*)\)/i, "$1"))
                        } else i[a] = /none/i.test(o) ? "transparent" : o;
                        break;
                    case "id":
                        i.id = o, t.id = o + "-" + y.Identifier + "applied";
                        break;
                    case "class":
                    case "className":
                        i.classList = o.split(" ")
                }
                return h
            },
            getScene: function(t) {
                for (; t.parent;) t = t.parent;
                return t.scene
            },
            read: {
                svg: function(t) {
                    var e = y.Utils.read.g.call(this, t);
                    t.getAttribute("viewBox");
                    return e
                },
                defs: function(t) {
                    var e = new y.Utils.Error("interpret <defs /> not supported.");
                    return console.warn(e.name, e.message), null
                },
                use: function(t) {
                    var e = new y.Utils.Error("interpret <use /> not supported.");
                    return console.warn(e.name, e.message), null
                },
                g: function(t, e) {
                    var i, r = new y.Group;
                    y.Utils.applySvgAttributes.call(this, t, r, e), this.add(r), i = y.Utils.getSvgStyles.call(this, t);
                    for (var s = 0, n = t.childNodes.length; s < n; s++) {
                        var a = t.childNodes[s],
                            o = a.nodeName;
                        if (!o) return;
                        var l = o.replace(/svg:/gi, "").toLowerCase();
                        if (l in y.Utils.read) {
                            var h = y.Utils.read[l].call(r, a, i);
                            h && !h.parent && r.add(h)
                        }
                    }
                    return r
                },
                polygon: function(t, e) {
                    var i = t.getAttribute("points"),
                        r = [];
                    i.replace(/(-?[\d.?]+)[,|\s](-?[\d.?]+)/g, (function(t, e, i) {
                        r.push(new y.Anchor(parseFloat(e), parseFloat(i)))
                    }));
                    var s = new y.Path(r, !0).noStroke();
                    return s.fill = "black", y.Utils.applySvgAttributes.call(this, t, s, e), s
                },
                polyline: function(t, e) {
                    var i = y.Utils.read.polygon.call(this, t, e);
                    return i.closed = !1, i
                },
                path: function(t, e) {
                    var i = t.getAttribute("d"),
                        s = [],
                        n = !1,
                        a = !1;
                    if (i) {
                        var o, l, h = new y.Anchor,
                            d = i.match(/[a-df-z][^a-df-z]*/gi),
                            f = d.length - 1;
                        r.each(d.slice(0), (function(t, e) {
                            var i, r, s, n, a, o, l, h, c, f = t[0],
                                u = f.toLowerCase(),
                                _ = t.slice(1).trim().split(/[\s,]+|(?=\s?[+-])/),
                                g = [],
                                p = !1;
                            for (a = 0; a < _.length; a++)
                                if ((i = _[a]).indexOf(".") !== i.lastIndexOf(".")) {
                                    for (s = (r = i.split("."))[0] + "." + r[1], _.splice(a, 1, s), n = 2; n < r.length; n++) _.splice(a + n - 1, 0, "0." + r[n]);
                                    p = !0
                                } switch (p && (t = f + _.join(",")), e <= 0 && (d = []), u) {
                                case "h":
                                case "v":
                                    _.length > 1 && (c = 1);
                                    break;
                                case "m":
                                case "l":
                                case "t":
                                    _.length > 2 && (c = 2);
                                    break;
                                case "s":
                                case "q":
                                    _.length > 4 && (c = 4);
                                    break;
                                case "c":
                                    _.length > 6 && (c = 6);
                                    break;
                                case "a":
                                    _.length > 7 && (c = 7)
                            }
                            if (c) {
                                for (a = 0, l = _.length, h = 0; a < l; a += c) {
                                    if (o = f, h > 0) switch (f) {
                                        case "m":
                                            o = "l";
                                            break;
                                        case "M":
                                            o = "L"
                                    }
                                    g.push(o + _.slice(a, a + c).join(" ")), h++
                                }
                                d = Array.prototype.concat.apply(d, g)
                            } else d.push(t)
                        })), r.each(d, (function(t, e) {
                            var i, d, u, _, g, p, m, v, x, b, w, k, S = t[0],
                                A = S.toLowerCase();
                            switch (l = (l = (l = t.slice(1).trim()).replace(/(-?\d+(?:\.\d*)?)[eE]([+-]?\d+)/g, (function(t, e, i) {
                                return parseFloat(e) * c(10, i)
                            }))).split(/[\s,]+|(?=\s?[+-])/), a = S === A, A) {
                                case "z":
                                    if (e >= f) n = !0;
                                    else {
                                        d = h.x, u = h.y, i = new y.Anchor(d, u, void 0, void 0, void 0, void 0, y.Commands.close);
                                        for (var C = s.length - 1; C >= 0; C--) {
                                            var R = s[C];
                                            if (/m/i.test(R.command)) {
                                                h = R;
                                                break
                                            }
                                        }
                                    }
                                    break;
                                case "m":
                                case "l":
                                    o = void 0, d = parseFloat(l[0]), u = parseFloat(l[1]), i = new y.Anchor(d, u, void 0, void 0, void 0, void 0, /m/i.test(A) ? y.Commands.move : y.Commands.line), a && i.addSelf(h), h = i;
                                    break;
                                case "h":
                                case "v":
                                    var F = /h/i.test(A) ? "x" : "y",
                                        M = /x/i.test(F) ? "y" : "x";
                                    (i = new y.Anchor(void 0, void 0, void 0, void 0, void 0, void 0, y.Commands.line))[F] = parseFloat(l[0]), i[M] = h[M], a && (i[F] += h[F]), h = i;
                                    break;
                                case "c":
                                case "s":
                                    _ = h.x, g = h.y, o || (o = new y.Vector), /c/i.test(A) ? (p = parseFloat(l[0]), m = parseFloat(l[1]), v = parseFloat(l[2]), x = parseFloat(l[3]), b = parseFloat(l[4]), w = parseFloat(l[5])) : (p = (k = E(h, o, a)).x, m = k.y, v = parseFloat(l[0]), x = parseFloat(l[1]), b = parseFloat(l[2]), w = parseFloat(l[3])), a && (p += _, m += g, v += _, x += g, b += _, w += g), r.isObject(h.controls) || y.Anchor.AppendCurveProperties(h), h.controls.right.set(p - h.x, m - h.y), i = new y.Anchor(b, w, v - b, x - w, void 0, void 0, y.Commands.curve), h = i, o = i.controls.left;
                                    break;
                                case "t":
                                case "q":
                                    _ = h.x, g = h.y, o || (o = new y.Vector), /q/i.test(A) ? (p = parseFloat(l[0]), m = parseFloat(l[1]), v = parseFloat(l[0]), x = parseFloat(l[1]), b = parseFloat(l[2]), w = parseFloat(l[3])) : (p = (k = E(h, o, a)).x, m = k.y, v = k.x, x = k.y, b = parseFloat(l[0]), w = parseFloat(l[1])), a && (p += _, m += g, v += _, x += g, b += _, w += g), r.isObject(h.controls) || y.Anchor.AppendCurveProperties(h), h.controls.right.set(.33 * (p - h.x), .33 * (m - h.y)), i = new y.Anchor(b, w, v - b, x - w, void 0, void 0, y.Commands.curve), h = i, o = i.controls.left;
                                    break;
                                case "a":
                                    _ = h.x, g = h.y;
                                    var O = parseFloat(l[0]),
                                        P = parseFloat(l[1]),
                                        U = parseFloat(l[2]),
                                        T = parseFloat(l[3]),
                                        N = parseFloat(l[4]);
                                    b = parseFloat(l[5]), w = parseFloat(l[6]), a && (b += _, w += g);
                                    var L = new y.Anchor(b, w);
                                    L.command = y.Commands.arc, L.rx = O, L.ry = P, L.xAxisRotation = U, L.largeArcFlag = T, L.sweepFlag = N, i = L, h = L, o = void 0
                            }
                            i && (r.isArray(i) ? s = s.concat(i) : s.push(i))
                        }))
                    }(i = new y.Path(s, n, void 0, !0).noStroke()).fill = "black";
                    var u = i.getBoundingClientRect(!0);
                    return u.centroid = {
                        x: u.left + u.width / 2,
                        y: u.top + u.height / 2
                    }, r.each(i.vertices, (function(t) {
                        t.subSelf(u.centroid)
                    })), y.Utils.applySvgAttributes.call(this, t, i, e), i.translation.addSelf(u.centroid), i
                },
                circle: function(t, e) {
                    var i = parseFloat(t.getAttribute("cx")),
                        r = parseFloat(t.getAttribute("cy")),
                        s = parseFloat(t.getAttribute("r")),
                        n = new y.Circle(i, r, s).noStroke();
                    return n.fill = "black", y.Utils.applySvgAttributes.call(this, t, n, e), n
                },
                ellipse: function(t, e) {
                    var i = parseFloat(t.getAttribute("cx")),
                        r = parseFloat(t.getAttribute("cy")),
                        s = parseFloat(t.getAttribute("rx")),
                        n = parseFloat(t.getAttribute("ry")),
                        a = new y.Ellipse(i, r, s, n).noStroke();
                    return a.fill = "black", y.Utils.applySvgAttributes.call(this, t, a, e), a
                },
                rect: function(t, e) {
                    var i = parseFloat(t.getAttribute("rx")),
                        s = parseFloat(t.getAttribute("ry"));
                    if (!r.isNaN(i) || !r.isNaN(s)) return y.Utils.read["rounded-rect"](t);
                    var n = parseFloat(t.getAttribute("x")) || 0,
                        a = parseFloat(t.getAttribute("y")) || 0,
                        o = parseFloat(t.getAttribute("width")),
                        l = parseFloat(t.getAttribute("height")),
                        h = o / 2,
                        c = l / 2,
                        d = new y.Rectangle(n + h, a + c, o, l).noStroke();
                    return d.fill = "black", y.Utils.applySvgAttributes.call(this, t, d, e), d
                },
                "rounded-rect": function(t, e) {
                    var i = parseFloat(t.getAttribute("x")) || 0,
                        r = parseFloat(t.getAttribute("y")) || 0,
                        s = parseFloat(t.getAttribute("rx")) || 0,
                        n = parseFloat(t.getAttribute("ry")) || 0,
                        a = parseFloat(t.getAttribute("width")),
                        o = parseFloat(t.getAttribute("height")),
                        l = a / 2,
                        h = o / 2,
                        c = new y.Vector(s, n),
                        d = new y.RoundedRectangle(i + l, r + h, a, o, c).noStroke();
                    return d.fill = "black", y.Utils.applySvgAttributes.call(this, t, d, e), d
                },
                line: function(t, e) {
                    var i = parseFloat(t.getAttribute("x1")),
                        r = parseFloat(t.getAttribute("y1")),
                        s = parseFloat(t.getAttribute("x2")),
                        n = parseFloat(t.getAttribute("y2")),
                        a = new y.Line(i, r, s, n).noFill();
                    return y.Utils.applySvgAttributes.call(this, t, a, e), a
                },
                lineargradient: function(t, e) {
                    for (var i = parseFloat(t.getAttribute("x1")), s = parseFloat(t.getAttribute("y1")), n = parseFloat(t.getAttribute("x2")), a = parseFloat(t.getAttribute("y2")), o = (n + i) / 2, l = (a + s) / 2, h = [], c = 0; c < t.children.length; c++) {
                        var d = t.children[c],
                            f = d.getAttribute("offset");
                        /%/gi.test(f) && (f = parseFloat(f.replace(/%/gi, "")) / 100), f = parseFloat(f);
                        var u, _ = d.getAttribute("stop-color"),
                            g = d.getAttribute("stop-opacity"),
                            p = d.getAttribute("style");
                        r.isNull(_) && (_ = (u = !!p && p.match(/stop-color:\s?([#a-fA-F0-9]*)/)) && u.length > 1 ? u[1] : void 0), g = r.isNull(g) ? (u = !!p && p.match(/stop-opacity:\s?([0-9.-]*)/)) && u.length > 1 ? parseFloat(u[1]) : 1 : parseFloat(g), h.push(new y.Gradient.Stop(f, _, g))
                    }
                    var m = new y.LinearGradient(i - o, s - l, n - o, a - l, h);
                    return y.Utils.applySvgAttributes.call(this, t, m, e), m
                },
                radialgradient: function(t, e) {
                    var i = parseFloat(t.getAttribute("cx")) || 0,
                        s = parseFloat(t.getAttribute("cy")) || 0,
                        n = parseFloat(t.getAttribute("r")),
                        a = parseFloat(t.getAttribute("fx")),
                        l = parseFloat(t.getAttribute("fy"));
                    r.isNaN(a) && (a = i), r.isNaN(l) && (l = s);
                    for (var h = o(i + a) / 2, c = o(s + l) / 2, d = [], f = 0; f < t.children.length; f++) {
                        var u = t.children[f],
                            _ = u.getAttribute("offset");
                        /%/gi.test(_) && (_ = parseFloat(_.replace(/%/gi, "")) / 100), _ = parseFloat(_);
                        var g, p = u.getAttribute("stop-color"),
                            m = u.getAttribute("stop-opacity"),
                            v = u.getAttribute("style");
                        r.isNull(p) && (p = (g = !!v && v.match(/stop-color:\s?([#a-fA-F0-9]*)/)) && g.length > 1 ? g[1] : void 0), m = r.isNull(m) ? (g = !!v && v.match(/stop-opacity:\s?([0-9.-]*)/)) && g.length > 1 ? parseFloat(g[1]) : 1 : parseFloat(m), d.push(new y.Gradient.Stop(_, p, m))
                    }
                    var x = new y.RadialGradient(i - h, s - c, n, d, a - h, l - c);
                    return y.Utils.applySvgAttributes.call(this, t, x, e), x
                }
            },
            subdivide: function(t, e, i, r, s, n, a, l, h) {
                var c = (h = h || y.Utils.Curve.RecursionLimit) + 1;
                if (o(t - a) < .001 && o(e - l) < .001) return [new y.Anchor(a, l)];
                for (var d = [], f = 0; f < c; f++) {
                    var u = f / c,
                        _ = S(u, t, i, s, a),
                        g = S(u, e, r, n, l);
                    d.push(new y.Anchor(_, g))
                }
                return d
            },
            getComponentOnCubicBezier: function(t, e, i, r, s) {
                var n = 1 - t;
                return n * n * n * e + 3 * n * n * t * i + 3 * n * t * t * r + t * t * t * s
            },
            getCurveLength: function(t, e, i, r, s, n, o, l, h) {
                if (t === i && e === r && s === o && n === l) {
                    var c = o - t,
                        d = l - e;
                    return a(c * c + d * d)
                }
                var f = 9 * (i - s) + 3 * (o - t),
                    u = 6 * (t + s) - 12 * i,
                    _ = 3 * (i - t),
                    g = 9 * (r - n) + 3 * (l - e),
                    p = 6 * (e + n) - 12 * r,
                    m = 3 * (r - e);
                return A((function(t) {
                    var e = (f * t + u) * t + _,
                        i = (g * t + p) * t + m;
                    return a(e * e + i * i)
                }), 0, 1, h || y.Utils.Curve.RecursionLimit)
            },
            getCurveBoundingBox: function(t, e, i, r, s, n, a, l) {
                for (var h, c, d, f, u, _, g, p, m = [], v = [
                        [],
                        []
                    ], y = 0; y < 2; ++y)
                    if (0 == y ? (c = 6 * t - 12 * i + 6 * s, h = -3 * t + 9 * i - 9 * s + 3 * a, d = 3 * i - 3 * t) : (c = 6 * e - 12 * r + 6 * n, h = -3 * e + 9 * r - 9 * n + 3 * l, d = 3 * r - 3 * e), o(h) < 1e-12) {
                        if (o(c) < 1e-12) continue;
                        0 < (f = -d / c) && f < 1 && m.push(f)
                    } else g = c * c - 4 * d * h, p = Math.sqrt(g), g < 0 || (0 < (u = (-c + p) / (2 * h)) && u < 1 && m.push(u), 0 < (_ = (-c - p) / (2 * h)) && _ < 1 && m.push(_));
                for (var x, b = m.length, w = b; b--;) x = 1 - (f = m[b]), v[0][b] = x * x * x * t + 3 * x * x * f * i + 3 * x * f * f * s + f * f * f * a, v[1][b] = x * x * x * e + 3 * x * x * f * r + 3 * x * f * f * n + f * f * f * l;
                return v[0][w] = t, v[1][w] = e, v[0][w + 1] = a, v[1][w + 1] = l, v[0].length = v[1].length = w + 2, {
                    min: {
                        x: Math.min.apply(0, v[0]),
                        y: Math.min.apply(0, v[1])
                    },
                    max: {
                        x: Math.max.apply(0, v[0]),
                        y: Math.max.apply(0, v[1])
                    }
                }
            },
            integrate: function(t, e, i, r) {
                for (var s = y.Utils.Curve.abscissas[r - 2], n = y.Utils.Curve.weights[r - 2], a = .5 * (i - e), o = a + e, l = 0, h = r + 1 >> 1, c = 1 & r ? n[l++] * t(o) : 0; l < h;) {
                    var d = a * s[l];
                    c += n[l++] * (t(o + d) + t(o - d))
                }
                return a * c
            },
            getCurveFromPoints: function(t, e) {
                for (var i = t.length, s = i - 1, n = 0; n < i; n++) {
                    var a = t[n];
                    r.isObject(a.controls) || y.Anchor.AppendCurveProperties(a);
                    var o = e ? w(n - 1, i) : f(n - 1, 0),
                        l = e ? w(n + 1, i) : d(n + 1, s),
                        h = t[o],
                        c = a,
                        u = t[l];
                    b(h, c, u), c.command = 0 === n ? y.Commands.move : y.Commands.curve
                }
            },
            getControlPoints: function(t, e, i) {
                var a = y.Vector.angleBetween(t, e),
                    o = y.Vector.angleBetween(i, e),
                    c = y.Vector.distanceBetween(t, e),
                    d = y.Vector.distanceBetween(i, e),
                    f = (a + o) / 2;
                return c < 1e-4 || d < 1e-4 ? (r.isBoolean(e.relative) && !e.relative && (e.controls.left.copy(e), e.controls.right.copy(e)), e) : (c *= .33, d *= .33, o < a ? f += h : f -= h, e.controls.left.x = n(f) * c, e.controls.left.y = s(f) * c, f -= l, e.controls.right.x = n(f) * d, e.controls.right.y = s(f) * d, r.isBoolean(e.relative) && !e.relative && (e.controls.left.x += e.x, e.controls.left.y += e.y, e.controls.right.x += e.x, e.controls.right.y += e.y), e)
            },
            getReflection: function(t, e, i) {
                return new y.Vector(2 * t.x - (e.x + t.x) - (i ? t.x : 0), 2 * t.y - (e.y + t.y) - (i ? t.y : 0))
            },
            getAnchorsFromArcData: function(t, e, i, s, n, a, o) {
                var l = y.Resolution;
                return r.map(r.range(l), (function(t) {
                    var e = (t + 1) / l;
                    o && (e = 1 - e);
                    var r = e * a + n,
                        h = i * Math.cos(r),
                        c = s * Math.sin(r),
                        d = new y.Anchor(h, c);
                    return y.Anchor.AppendCurveProperties(d), d.command = y.Commands.line, d
                }))
            },
            lerp: function(t, e, i) {
                return i * (e - t) + t
            },
            toFixed: function(t) {
                return Math.floor(1e3 * t) / 1e3
            },
            mod: function(t, e) {
                for (; t < 0;) t += e;
                return t % e
            },
            Collection: function() {
                Array.call(this), arguments.length > 1 ? Array.prototype.push.apply(this, arguments) : arguments[0] && Array.isArray(arguments[0]) && Array.prototype.push.apply(this, arguments[0])
            },
            Error: function(t) {
                this.name = "Two.js", this.message = t
            },
            Events: {
                on: function(t, e) {
                    return this._events || (this._events = {}), (this._events[t] || (this._events[t] = [])).push(e), this
                },
                off: function(t, e) {
                    if (!this._events) return this;
                    if (!t && !e) return this._events = {}, this;
                    for (var i = t ? [t] : r.keys(this._events), s = 0, n = i.length; s < n; s++) {
                        t = i[s];
                        var a = this._events[t];
                        if (a) {
                            var o = [];
                            if (e)
                                for (var l = 0, h = a.length; l < h; l++) {
                                    var c = a[l];
                                    c = c.handler ? c.handler : c, e && e !== c && o.push(c)
                                }
                            this._events[t] = o
                        }
                    }
                    return this
                },
                trigger: function(t) {
                    if (!this._events) return this;
                    var e = _.call(arguments, 1),
                        i = this._events[t];
                    return i && x(this, i, e), this
                },
                listen: function(t, e, i) {
                    var r = this;
                    if (t) {
                        var s = function() {
                            i.apply(r, arguments)
                        };
                        s.obj = t, s.name = e, s.handler = i, t.on(e, s)
                    }
                    return this
                },
                ignore: function(t, e, i) {
                    return t.off(e, i), this
                }
            }
        })
    }), y.Utils.Events.bind = y.Utils.Events.on, y.Utils.Events.unbind = y.Utils.Events.off;
    var x = function(t, e, i) {
        var r;
        switch (i.length) {
            case 0:
                r = function(r) {
                    e[r].call(t, i[0])
                };
                break;
            case 1:
                r = function(r) {
                    e[r].call(t, i[0], i[1])
                };
                break;
            case 2:
                r = function(r) {
                    e[r].call(t, i[0], i[1], i[2])
                };
                break;
            case 3:
                r = function(r) {
                    e[r].call(t, i[0], i[1], i[2], i[3])
                };
                break;
            default:
                r = function(r) {
                    e[r].apply(t, i)
                }
        }
        for (var s = 0; s < e.length; s++) r(s)
    };
    y.Utils.Error.prototype = new Error, y.Utils.Error.prototype.constructor = y.Utils.Error, y.Utils.Collection.prototype = new Array, y.Utils.Collection.prototype.constructor = y.Utils.Collection, r.extend(y.Utils.Collection.prototype, y.Utils.Events, {
        pop: function() {
            var t = Array.prototype.pop.apply(this, arguments);
            return this.trigger(y.Events.remove, [t]), t
        },
        shift: function() {
            var t = Array.prototype.shift.apply(this, arguments);
            return this.trigger(y.Events.remove, [t]), t
        },
        push: function() {
            var t = Array.prototype.push.apply(this, arguments);
            return this.trigger(y.Events.insert, arguments), t
        },
        unshift: function() {
            var t = Array.prototype.unshift.apply(this, arguments);
            return this.trigger(y.Events.insert, arguments), t
        },
        splice: function() {
            var t, e = Array.prototype.splice.apply(this, arguments);
            return this.trigger(y.Events.remove, e), arguments.length > 2 && (t = this.slice(arguments[0], arguments[0] + arguments.length - 2), this.trigger(y.Events.insert, t), this.trigger(y.Events.order)), e
        },
        sort: function() {
            return Array.prototype.sort.apply(this, arguments), this.trigger(y.Events.order), this
        },
        reverse: function() {
            return Array.prototype.reverse.apply(this, arguments), this.trigger(y.Events.order), this
        }
    });
    y.Utils.getAnchorsFromArcData;
    var b = y.Utils.getControlPoints,
        w = (y.Utils.getCurveFromPoints, y.Utils.solveSegmentIntersection, y.Utils.decoupleShapes, y.Utils.mod),
        k = y.Utils.getBackingStoreRatio,
        S = y.Utils.getComponentOnCubicBezier,
        A = (y.Utils.getCurveLength, y.Utils.integrate),
        E = y.Utils.getReflection;

    function C() {
        var t = document.body.getBoundingClientRect(),
            e = this.width = t.width,
            i = this.height = t.height;
        this.renderer.setSize(e, i, this.ratio)
    }

    function R(t, e) {
        this.width = t, this.height = e, this.trigger(y.Events.resize, t, e)
    }
    r.extend(y.prototype, y.Utils.Events, {
        constructor: y,
        appendTo: function(t) {
            return t.appendChild(this.renderer.domElement), this
        },
        play: function() {
            return y.Utils.setPlaying.call(this, !0), F.init(), this.trigger(y.Events.play)
        },
        pause: function() {
            return this.playing = !1, this.trigger(y.Events.pause)
        },
        update: function() {
            var t = !!this._lastFrame,
                e = g.now();
            t && (this.timeDelta = parseFloat((e - this._lastFrame).toFixed(3))), this._lastFrame = e;
            var i = this.width,
                r = this.height,
                s = this.renderer;
            return i === s.width && r === s.height || s.setSize(i, r, this.ratio), this.trigger(y.Events.update, this.frameCount, this.timeDelta), this.render()
        },
        render: function() {
            return this.renderer.render(), this.trigger(y.Events.render, this.frameCount++)
        },
        add: function(t) {
            var e = t;
            return e instanceof Array || (e = r.toArray(arguments)), this.scene.add(e), this
        },
        remove: function(t) {
            var e = t;
            return e instanceof Array || (e = r.toArray(arguments)), this.scene.remove(e), this
        },
        clear: function() {
            return this.scene.remove(this.scene.children), this
        },
        makeLine: function(t, e, i, r) {
            var s = new y.Line(t, e, i, r);
            return this.scene.add(s), s
        },
        makeArrow: function(t, e, i, s, n) {
            var a = r.isNumber(n) ? n : 10,
                o = Math.atan2(s - e, i - t),
                l = [new y.Anchor(t, e, void 0, void 0, void 0, void 0, y.Commands.move), new y.Anchor(i, s, void 0, void 0, void 0, void 0, y.Commands.line), new y.Anchor(i - a * Math.cos(o - Math.PI / 4), s - a * Math.sin(o - Math.PI / 4), void 0, void 0, void 0, void 0, y.Commands.line), new y.Anchor(i, s, void 0, void 0, void 0, void 0, y.Commands.move), new y.Anchor(i - a * Math.cos(o + Math.PI / 4), s - a * Math.sin(o + Math.PI / 4), void 0, void 0, void 0, void 0, y.Commands.line)],
                h = new y.Path(l, !1, !1, !0);
            return h.noFill(), h.cap = "round", h.join = "round", this.scene.add(h), h
        },
        makeRectangle: function(t, e, i, r) {
            var s = new y.Rectangle(t, e, i, r);
            return this.scene.add(s), s
        },
        makeRoundedRectangle: function(t, e, i, r, s) {
            var n = new y.RoundedRectangle(t, e, i, r, s);
            return this.scene.add(n), n
        },
        makeCircle: function(t, e, i, r) {
            var s = new y.Circle(t, e, i, r);
            return this.scene.add(s), s
        },
        makeEllipse: function(t, e, i, r, s) {
            var n = new y.Ellipse(t, e, i, r, s);
            return this.scene.add(n), n
        },
        makeStar: function(t, e, i, r, s) {
            var n = new y.Star(t, e, i, r, s);
            return this.scene.add(n), n
        },
        makeCurve: function(t) {
            var e = arguments.length,
                i = t;
            if (!r.isArray(t)) {
                i = [];
                for (var s = 0; s < e; s += 2) {
                    var n = arguments[s];
                    if (!r.isNumber(n)) break;
                    var a = arguments[s + 1];
                    i.push(new y.Anchor(n, a))
                }
            }
            var o = arguments[e - 1],
                l = new y.Path(i, !(r.isBoolean(o) ? o : void 0), !0),
                h = l.getBoundingClientRect();
            return l.center().translation.set(h.left + h.width / 2, h.top + h.height / 2), this.scene.add(l), l
        },
        makePolygon: function(t, e, i, r) {
            var s = new y.Polygon(t, e, i, r);
            return this.scene.add(s), s
        },
        makeArcSegment: function(t, e, i, r, s, n, a) {
            var o = new y.ArcSegment(t, e, i, r, s, n, a);
            return this.scene.add(o), o
        },
        makePath: function(t) {
            var e = arguments.length,
                i = t;
            if (!r.isArray(t)) {
                i = [];
                for (var s = 0; s < e; s += 2) {
                    var n = arguments[s];
                    if (!r.isNumber(n)) break;
                    var a = arguments[s + 1];
                    i.push(new y.Anchor(n, a))
                }
            }
            var o = arguments[e - 1],
                l = new y.Path(i, !(r.isBoolean(o) ? o : void 0)),
                h = l.getBoundingClientRect();
            return r.isNumber(h.top) && r.isNumber(h.left) && r.isNumber(h.right) && r.isNumber(h.bottom) && l.center().translation.set(h.left + h.width / 2, h.top + h.height / 2), this.scene.add(l), l
        },
        makeText: function(t, e, i, r) {
            var s = new y.Text(t, e, i, r);
            return this.add(s), s
        },
        makeLinearGradient: function(t, e, i, r) {
            var s = _.call(arguments, 4),
                n = new y.LinearGradient(t, e, i, r, s);
            return this.add(n), n
        },
        makeRadialGradient: function(t, e, i) {
            var r = _.call(arguments, 3),
                s = new y.RadialGradient(t, e, i, r);
            return this.add(s), s
        },
        makeSprite: function(t, e, i, r, s, n, a) {
            var o = new y.Sprite(t, e, i, r, s, n);
            return a && o.play(), this.add(o), o
        },
        makeImageSequence: function(t, e, i, r, s) {
            var n = new y.ImageSequence(t, e, i, r);
            return s && n.play(), this.add(n), n
        },
        makeTexture: function(t, e) {
            return new y.Texture(t, e)
        },
        makeGroup: function(t) {
            var e = t;
            e instanceof Array || (e = r.toArray(arguments));
            var i = new y.Group;
            return this.scene.add(i), i.add(e), i
        },
        interpret: function(t, e, i) {
            var r = t.tagName.toLowerCase();
            if (i = void 0 === i || i, !(r in y.Utils.read)) return null;
            var s = y.Utils.read[r].call(this, t);
            return i && this.add(e && s instanceof y.Group ? s.children : s), s
        },
        load: function(t, e) {
            var i, s, n, a = new y.Group,
                o = r.bind((function(t) {
                    for (v.temp.innerHTML = t, s = 0; s < v.temp.children.length; s++)
                        if (i = v.temp.children[s], /svg/i.test(i.nodeName))
                            for (n = 0; n < i.children.length; n++) a.add(this.interpret(i.children[n]));
                        else a.add(this.interpret(i));
                    if (r.isFunction(e)) {
                        var o = v.temp.children.length <= 1 ? v.temp.children[0] : v.temp.children;
                        e(a, o)
                    }
                }), this);
            return /.*\.svg$/gi.test(t) ? (y.Utils.xhr(t, o), a) : (o(t), a)
        }
    });
    var F = v.getRequestAnimationFrame();

    function M() {
        for (var t = 0; t < y.Instances.length; t++) {
            var e = y.Instances[t];
            e.playing && e.update()
        }
        y.nextFrameID = F(M)
    }
    return "undefined" != typeof module && module.exports ? module.exports = y : "function" == typeof define && define.amd && define("two", [], (function() {
        return y
    })), y
}(("undefined" != typeof global ? global : this || self || window).Two),
function(t) {
    var e = t.Utils,
        i = t.Registry = function() {
            this.map = {}
        };
    e.extend(i.prototype, {
        constructor: i,
        add: function(t, e) {
            return this.map[t] = e, this
        },
        remove: function(t) {
            return delete this.map[t], this
        },
        get: function(t) {
            return this.map[t]
        },
        contains: function(t) {
            return t in this.map
        }
    })
}(("undefined" != typeof global ? global : this || self || window).Two),
function(t) {
    var e = t.Utils,
        i = t.Vector = function(t, e) {
            this.x = t || 0, this.y = e || 0
        };
    e.extend(i, {
        zero: new t.Vector,
        add: function(t, e) {
            return new i(t.x + e.x, t.y + e.y)
        },
        sub: function(t, e) {
            return new i(t.x - e.x, t.y - e.y)
        },
        subtract: function(t, e) {
            return i.sub(t, e)
        },
        ratioBetween: function(t, e) {
            return (t.x * e.x + t.y * e.y) / (t.length() * e.length())
        },
        angleBetween: function(t, e) {
            var i, r;
            return arguments.length >= 4 ? (i = arguments[0] - arguments[2], r = arguments[1] - arguments[3], Math.atan2(r, i)) : (i = t.x - e.x, r = t.y - e.y, Math.atan2(r, i))
        },
        distanceBetween: function(t, e) {
            return Math.sqrt(i.distanceBetweenSquared(t, e))
        },
        distanceBetweenSquared: function(t, e) {
            var i = t.x - e.x,
                r = t.y - e.y;
            return i * i + r * r
        },
        MakeObservable: function(i) {
            i.bind = i.on = function() {
                return this._bound || (this._x = this.x, this._y = this.y, Object.defineProperty(this, "x", s), Object.defineProperty(this, "y", n), e.extend(this, r), this._bound = !0), t.Utils.Events.bind.apply(this, arguments), this
            }
        }
    }), e.extend(i.prototype, t.Utils.Events, {
        constructor: i,
        set: function(t, e) {
            return this.x = t, this.y = e, this
        },
        copy: function(t) {
            return this.x = t.x, this.y = t.y, this
        },
        clear: function() {
            return this.x = 0, this.y = 0, this
        },
        clone: function() {
            return new i(this.x, this.y)
        },
        add: function(t, i) {
            return arguments.length <= 0 ? this : (arguments.length <= 1 ? e.isNumber(t) ? (this.x += t, this.y += t) : t && e.isNumber(t.x) && e.isNumber(t.y) && (this.x += t.x, this.y += t.y) : (this.x += t, this.y += i), this)
        },
        addSelf: function(t) {
            return this.add.apply(this, arguments)
        },
        sub: function(t, i) {
            return arguments.length <= 0 ? this : (arguments.length <= 1 ? e.isNumber(t) ? (this.x -= t, this.y -= t) : t && e.isNumber(t.x) && e.isNumber(t.y) && (this.x -= t.x, this.y -= t.y) : (this.x -= t, this.y -= i), this)
        },
        subtract: function() {
            return this.sub.apply(this, arguments)
        },
        subSelf: function(t) {
            return this.sub.apply(this, arguments)
        },
        subtractSelf: function(t) {
            return this.sub.apply(this, arguments)
        },
        multiply: function(t, i) {
            return arguments.length <= 0 ? this : (arguments.length <= 1 ? e.isNumber(t) ? (this.x *= t, this.y *= t) : t && e.isNumber(t.x) && e.isNumber(t.y) && (this.x *= t.x, this.y *= t.y) : (this.x *= t, this.y *= i), this)
        },
        multiplySelf: function(t) {
            return this.multiply.apply(this, arguments)
        },
        multiplyScalar: function(t) {
            return this.multiply(t)
        },
        divide: function(t, i) {
            return arguments.length <= 0 ? this : (arguments.length <= 1 ? e.isNumber(t) ? (this.x /= t, this.y /= t) : t && e.isNumber(t.x) && e.isNumber(t.y) && (this.x /= t.x, this.y /= t.y) : (this.x /= t, this.y /= i), e.isNaN(this.x) && (this.x = 0), e.isNaN(this.y) && (this.y = 0), this)
        },
        divideSelf: function(t) {
            return this.divide.apply(this, arguments)
        },
        divideScalar: function(t) {
            return this.divide(t)
        },
        negate: function() {
            return this.multiply(-1)
        },
        dot: function(t) {
            return this.x * t.x + this.y * t.y
        },
        length: function() {
            return Math.sqrt(this.lengthSquared())
        },
        lengthSquared: function() {
            return this.x * this.x + this.y * this.y
        },
        normalize: function() {
            return this.divideScalar(this.length())
        },
        distanceTo: function(t) {
            return Math.sqrt(this.distanceToSquared(t))
        },
        distanceToSquared: function(t) {
            var e = this.x - t.x,
                i = this.y - t.y;
            return e * e + i * i
        },
        setLength: function(t) {
            return this.normalize().multiplyScalar(t)
        },
        equals: function(t, e) {
            return e = void 0 === e ? 1e-4 : e, this.distanceTo(t) < e
        },
        lerp: function(t, e) {
            var i = (t.x - this.x) * e + this.x,
                r = (t.y - this.y) * e + this.y;
            return this.set(i, r)
        },
        isZero: function(t) {
            return t = void 0 === t ? 1e-4 : t, this.length() < t
        },
        toString: function() {
            return this.x + ", " + this.y
        },
        toObject: function() {
            return {
                x: this.x,
                y: this.y
            }
        },
        rotate: function(t) {
            var e = Math.cos(t),
                i = Math.sin(t);
            return this.x = this.x * e - this.y * i, this.y = this.x * i + this.y * e, this
        }
    });
    var r = {
            constructor: i,
            set: function(e, i) {
                return this._x = e, this._y = i, this.trigger(t.Events.change)
            },
            copy: function(e) {
                return this._x = e.x, this._y = e.y, this.trigger(t.Events.change)
            },
            clear: function() {
                return this._x = 0, this._y = 0, this.trigger(t.Events.change)
            },
            clone: function() {
                return new i(this._x, this._y)
            },
            add: function(i, r) {
                return arguments.length <= 0 ? this : (arguments.length <= 1 ? e.isNumber(i) ? (this._x += i, this._y += i) : i && e.isNumber(i.x) && e.isNumber(i.y) && (this._x += i.x, this._y += i.y) : (this._x += i, this._y += r), this.trigger(t.Events.change))
            },
            sub: function(i, r) {
                return arguments.length <= 0 ? this : (arguments.length <= 1 ? e.isNumber(i) ? (this._x -= i, this._y -= i) : i && e.isNumber(i.x) && e.isNumber(i.y) && (this._x -= i.x, this._y -= i.y) : (this._x -= i, this._y -= r), this.trigger(t.Events.change))
            },
            multiply: function(i, r) {
                return arguments.length <= 0 ? this : (arguments.length <= 1 ? e.isNumber(i) ? (this._x *= i, this._y *= i) : i && e.isNumber(i.x) && e.isNumber(i.y) && (this._x *= i.x, this._y *= i.y) : (this._x *= i, this._y *= r), this.trigger(t.Events.change))
            },
            divide: function(i, r) {
                return arguments.length <= 0 ? this : (arguments.length <= 1 ? e.isNumber(i) ? (this._x /= i, this._y /= i) : i && e.isNumber(i.x) && e.isNumber(i.y) && (this._x /= i.x, this._y /= i.y) : (this._x /= i, this._y /= r), e.isNaN(this._x) && (this._x = 0), e.isNaN(this._y) && (this._y = 0), this.trigger(t.Events.change))
            },
            dot: function(t) {
                return this._x * t.x + this._y * t.y
            },
            lengthSquared: function() {
                return this._x * this._x + this._y * this._y
            },
            distanceToSquared: function(t) {
                var e = this._x - t.x,
                    i = this._y - t.y;
                return e * e + i * i
            },
            lerp: function(t, e) {
                var i = (t.x - this._x) * e + this._x,
                    r = (t.y - this._y) * e + this._y;
                return this.set(i, r)
            },
            toString: function() {
                return this._x + ", " + this._y
            },
            toObject: function() {
                return {
                    x: this._x,
                    y: this._y
                }
            },
            rotate: function(t) {
                var e = Math.cos(t),
                    i = Math.sin(t);
                return this._x = this._x * e - this._y * i, this._y = this._x * i + this._y * e, this
            }
        },
        s = {
            enumerable: !0,
            get: function() {
                return this._x
            },
            set: function(e) {
                this._x = e, this.trigger(t.Events.change, "x")
            }
        },
        n = {
            enumerable: !0,
            get: function() {
                return this._y
            },
            set: function(e) {
                this._y = e, this.trigger(t.Events.change, "y")
            }
        };
    i.MakeObservable(i.prototype)
}(("undefined" != typeof global ? global : this || self || window).Two),
function(t) {
    var e = t.Commands,
        i = t.Utils,
        r = t.Anchor = function(r, s, n, a, o, l, h) {
            t.Vector.call(this, r, s), this._broadcast = i.bind((function() {
                this.trigger(t.Events.change)
            }), this), this._command = h || e.move, this._relative = !0;
            var c = i.isNumber(n),
                d = i.isNumber(a),
                f = i.isNumber(o),
                u = i.isNumber(l);
            (c || d || f || u) && t.Anchor.AppendCurveProperties(this), c && (this.controls.left.x = n), d && (this.controls.left.y = a), f && (this.controls.right.x = o), u && (this.controls.right.y = l)
        };
    i.extend(t.Anchor, {
        AppendCurveProperties: function(e) {
            e.relative = !0, e.controls = {}, e.controls.left = new t.Vector(0, 0), e.controls.right = new t.Vector(0, 0)
        },
        MakeObservable: function(n) {
            Object.defineProperty(n, "command", {
                enumerable: !0,
                get: function() {
                    return this._command
                },
                set: function(s) {
                    return this._command = s, this._command !== e.curve || i.isObject(this.controls) || r.AppendCurveProperties(this), this.trigger(t.Events.change)
                }
            }), Object.defineProperty(n, "relative", {
                enumerable: !0,
                get: function() {
                    return this._relative
                },
                set: function(e) {
                    return this._relative == e ? this : (this._relative = !!e, this.trigger(t.Events.change))
                }
            }), i.extend(n, t.Vector.prototype, s), n.bind = n.on = function() {
                var e = this._bound;
                t.Vector.prototype.bind.apply(this, arguments), e || i.extend(this, s)
            }
        }
    });
    var s = {
        constructor: t.Anchor,
        listen: function() {
            return i.isObject(this.controls) || t.Anchor.AppendCurveProperties(this), this.controls.left.bind(t.Events.change, this._broadcast), this.controls.right.bind(t.Events.change, this._broadcast), this
        },
        ignore: function() {
            return this.controls.left.unbind(t.Events.change, this._broadcast), this.controls.right.unbind(t.Events.change, this._broadcast), this
        },
        copy: function(e) {
            return this.x = e.x, this.y = e.y, i.isString(e.command) && (this.command = e.command), i.isObject(e.controls) && (i.isObject(this.controls) || t.Anchor.AppendCurveProperties(this), this.controls.left.copy(e.controls.left), this.controls.right.copy(e.controls.right)), i.isBoolean(e.relative) && (this.relative = e.relative), this.command === t.Commands.arc && (this.rx = e.rx, this.ry = e.ry, this.xAxisRotation = e.xAxisRotation, this.largeArcFlag = e.largeArcFlag, this.sweepFlag = e.sweepFlag), this
        },
        clone: function() {
            var e = this.controls,
                i = new t.Anchor(this.x, this.y, e && e.left.x, e && e.left.y, e && e.right.x, e && e.right.y, this.command);
            return i.relative = this._relative, i
        },
        toObject: function() {
            var t = {
                x: this.x,
                y: this.y
            };
            return this._command && (t.command = this._command), this._relative && (t.relative = this._relative), this.controls && (t.controls = {
                left: this.controls.left.toObject(),
                right: this.controls.right.toObject()
            }), t
        },
        toString: function() {
            return this.controls ? [this._x, this._y, this.controls.left.x, this.controls.left.y, this.controls.right.x, this.controls.right.y, this._command, this._relative ? 1 : 0].join(", ") : [this._x, this._y].join(", ")
        }
    };
    t.Anchor.MakeObservable(t.Anchor.prototype)
}(("undefined" != typeof global ? global : this || self || window).Two),
function(t) {
    var e = Math.cos,
        i = Math.sin,
        r = Math.tan,
        s = t.Utils,
        n = [],
        a = t.Matrix = function(e, i, r, n, a, o) {
            this.elements = new t.Array(9);
            var l = e;
            s.isArray(l) || (l = s.toArray(arguments)), this.identity(), l.length > 0 && this.set(l)
        };
    s.extend(a, {
        Identity: [1, 0, 0, 0, 1, 0, 0, 0, 1],
        Multiply: function(e, i, r) {
            if (i.length <= 3) {
                var s = e,
                    n = i[0] || 0,
                    a = i[1] || 0,
                    o = i[2] || 0;
                return {
                    x: s[0] * n + s[1] * a + s[2] * o,
                    y: s[3] * n + s[4] * a + s[5] * o,
                    z: s[6] * n + s[7] * a + s[8] * o
                }
            }
            var l = e[0],
                h = e[1],
                c = e[2],
                d = e[3],
                f = e[4],
                u = e[5],
                _ = e[6],
                g = e[7],
                p = e[8],
                m = i[0],
                v = i[1],
                y = i[2],
                x = i[3],
                b = i[4],
                w = i[5],
                k = i[6],
                S = i[7],
                A = i[8];
            return (r = r || new t.Array(9))[0] = l * m + h * x + c * k, r[1] = l * v + h * b + c * S, r[2] = l * y + h * w + c * A, r[3] = d * m + f * x + u * k, r[4] = d * v + f * b + u * S, r[5] = d * y + f * w + u * A, r[6] = _ * m + g * x + p * k, r[7] = _ * v + g * b + p * S, r[8] = _ * y + g * w + p * A, r
        }
    }), s.extend(a.prototype, t.Utils.Events, {
        constructor: a,
        manual: !1,
        set: function(e, i, r, n, a, o, l, h, c) {
            var d;
            return s.isUndefined(i) && (e = (d = e)[0], i = d[1], r = d[2], n = d[3], a = d[4], o = d[5], l = d[6], h = d[7], c = d[8]), this.elements[0] = e, this.elements[1] = i, this.elements[2] = r, this.elements[3] = n, this.elements[4] = a, this.elements[5] = o, this.elements[6] = l, this.elements[7] = h, this.elements[8] = c, this.trigger(t.Events.change)
        },
        copy: function(e) {
            return this.elements[0] = e.elements[0], this.elements[1] = e.elements[1], this.elements[2] = e.elements[2], this.elements[3] = e.elements[3], this.elements[4] = e.elements[4], this.elements[5] = e.elements[5], this.elements[6] = e.elements[6], this.elements[7] = e.elements[7], this.elements[8] = e.elements[8], this.manual = e.manual, this.trigger(t.Events.change)
        },
        identity: function() {
            return this.elements[0] = a.Identity[0], this.elements[1] = a.Identity[1], this.elements[2] = a.Identity[2], this.elements[3] = a.Identity[3], this.elements[4] = a.Identity[4], this.elements[5] = a.Identity[5], this.elements[6] = a.Identity[6], this.elements[7] = a.Identity[7], this.elements[8] = a.Identity[8], this.trigger(t.Events.change)
        },
        multiply: function(e, i, r, n, a, o, l, h, c) {
            if (s.isUndefined(i)) return this.elements[0] *= e, this.elements[1] *= e, this.elements[2] *= e, this.elements[3] *= e, this.elements[4] *= e, this.elements[5] *= e, this.elements[6] *= e, this.elements[7] *= e, this.elements[8] *= e, this.trigger(t.Events.change);
            if (s.isUndefined(n)) return e = e || 0, i = i || 0, r = r || 0, {
                x: (a = this.elements)[0] * e + a[1] * i + a[2] * r,
                y: a[3] * e + a[4] * i + a[5] * r,
                z: a[6] * e + a[7] * i + a[8] * r
            };
            var d = this.elements,
                f = [e, i, r, n, a, o, l, h, c],
                u = d[0],
                _ = d[1],
                g = d[2],
                p = d[3],
                m = d[4],
                v = d[5],
                y = d[6],
                x = d[7],
                b = d[8],
                w = f[0],
                k = f[1],
                S = f[2],
                A = f[3],
                E = f[4],
                C = f[5],
                R = f[6],
                F = f[7],
                M = f[8];
            return this.elements[0] = u * w + _ * A + g * R, this.elements[1] = u * k + _ * E + g * F, this.elements[2] = u * S + _ * C + g * M, this.elements[3] = p * w + m * A + v * R, this.elements[4] = p * k + m * E + v * F, this.elements[5] = p * S + m * C + v * M, this.elements[6] = y * w + x * A + b * R, this.elements[7] = y * k + x * E + b * F, this.elements[8] = y * S + x * C + b * M, this.trigger(t.Events.change)
        },
        inverse: function(e) {
            var i = this.elements;
            e = e || new t.Matrix;
            var r = i[0],
                s = i[1],
                n = i[2],
                a = i[3],
                o = i[4],
                l = i[5],
                h = i[6],
                c = i[7],
                d = i[8],
                f = d * o - l * c,
                u = -d * a + l * h,
                _ = c * a - o * h,
                g = r * f + s * u + n * _;
            return g ? (g = 1 / g, e.elements[0] = f * g, e.elements[1] = (-d * s + n * c) * g, e.elements[2] = (l * s - n * o) * g, e.elements[3] = u * g, e.elements[4] = (d * r - n * h) * g, e.elements[5] = (-l * r + n * a) * g, e.elements[6] = _ * g, e.elements[7] = (-c * r + s * h) * g, e.elements[8] = (o * r - s * a) * g, e) : null
        },
        scale: function(t, e) {
            var i = arguments.length;
            return i <= 1 && (e = t), this.multiply(t, 0, 0, 0, e, 0, 0, 0, 1)
        },
        rotate: function(t) {
            var r = e(t),
                s = i(t);
            return this.multiply(r, -s, 0, s, r, 0, 0, 0, 1)
        },
        translate: function(t, e) {
            return this.multiply(1, 0, t, 0, 1, e, 0, 0, 1)
        },
        skewX: function(t) {
            var e = r(t);
            return this.multiply(1, e, 0, 0, 1, 0, 0, 0, 1)
        },
        skewY: function(t) {
            var e = r(t);
            return this.multiply(1, 0, 0, e, 1, 0, 0, 0, 1)
        },
        toString: function(e) {
            return n.length = 0, this.toTransformArray(e, n), n.map(t.Utils.toFixed).join(" ")
        },
        toTransformArray: function(t, e) {
            var i = this.elements,
                r = !!e,
                s = i[0],
                n = i[1],
                a = i[2],
                o = i[3],
                l = i[4],
                h = i[5];
            if (t) {
                var c = i[6],
                    d = i[7],
                    f = i[8];
                return r ? (e[0] = s, e[1] = o, e[2] = c, e[3] = n, e[4] = l, e[5] = d, e[6] = a, e[7] = h, void(e[8] = f)) : [s, o, c, n, l, d, a, h, f]
            }
            return r ? (e[0] = s, e[1] = o, e[2] = n, e[3] = l, e[4] = a, void(e[5] = h)) : [s, o, n, l, a, h]
        },
        toArray: function(t, e) {
            var i = this.elements,
                r = !!e,
                s = i[0],
                n = i[1],
                a = i[2],
                o = i[3],
                l = i[4],
                h = i[5];
            if (t) {
                var c = i[6],
                    d = i[7],
                    f = i[8];
                return r ? (e[0] = s, e[1] = n, e[2] = a, e[3] = o, e[4] = l, e[5] = h, e[6] = c, e[7] = d, void(e[8] = f)) : [s, n, a, o, l, h, c, d, f]
            }
            return r ? (e[0] = s, e[1] = n, e[2] = a, e[3] = o, e[4] = l, void(e[5] = h)) : [s, n, a, o, l, h]
        },
        toObject: function() {
            return {
                elements: this.toArray(!0),
                manual: !!this.manual
            }
        },
        clone: function() {
            return (new t.Matrix).copy(this)
        }
    })
}(("undefined" != typeof global ? global : this || self || window).Two),
function(t) {
    var e = t.Utils.mod,
        i = t.Utils.toFixed,
        r = t.Utils,
        s = {
            version: 1.1,
            ns: "http://www.w3.org/2000/svg",
            xlink: "http://www.w3.org/1999/xlink",
            alignments: {
                left: "start",
                center: "middle",
                right: "end"
            },
            createElement: function(t, e) {
                var i = t,
                    n = document.createElementNS(s.ns, i);
                return "svg" === i && (e = r.defaults(e || {}, {
                    version: s.version
                })), r.isEmpty(e) || s.setAttributes(n, e), n
            },
            setAttributes: function(t, e) {
                for (var i = Object.keys(e), r = 0; r < i.length; r++) /href/.test(i[r]) ? t.setAttributeNS(s.xlink, i[r], e[i[r]]) : t.setAttribute(i[r], e[i[r]]);
                return this
            },
            removeAttributes: function(t, e) {
                for (var i in e) t.removeAttribute(i);
                return this
            },
            toString: function(r, s) {
                for (var n, a = r.length, o = a - 1, l = "", h = 0; h < a; h++) {
                    var c, d, f, u, _, g, p, m, v, y, x, b, w, k, S = r[h],
                        A = s ? e(h - 1, a) : Math.max(h - 1, 0),
                        E = s ? e(h + 1, a) : Math.min(h + 1, o),
                        C = r[A],
                        R = r[E],
                        F = i(S.x),
                        M = i(S.y);
                    switch (S.command) {
                        case t.Commands.close:
                            c = t.Commands.close;
                            break;
                        case t.Commands.arc:
                            y = S.rx, x = S.ry, b = S.xAxisRotation, w = S.largeArcFlag, k = S.sweepFlag, c = t.Commands.arc + " " + y + " " + x + " " + b + " " + w + " " + k + " " + F + " " + M;
                            break;
                        case t.Commands.curve:
                            g = C.controls && C.controls.right || t.Vector.zero, p = S.controls && S.controls.left || t.Vector.zero, C.relative ? (d = i(g.x + C.x), f = i(g.y + C.y)) : (d = i(g.x), f = i(g.y)), S.relative ? (u = i(p.x + S.x), _ = i(p.y + S.y)) : (u = i(p.x), _ = i(p.y)), c = (0 === h ? t.Commands.move : t.Commands.curve) + " " + d + " " + f + " " + u + " " + _ + " " + F + " " + M;
                            break;
                        case t.Commands.move:
                            n = S, c = t.Commands.move + " " + F + " " + M;
                            break;
                        default:
                            c = S.command + " " + F + " " + M
                    }
                    h >= o && s && (S.command === t.Commands.curve && (R = n, m = S.controls && S.controls.right || S, v = R.controls && R.controls.left || R, S.relative ? (d = i(m.x + S.x), f = i(m.y + S.y)) : (d = i(m.x), f = i(m.y)), R.relative ? (u = i(v.x + R.x), _ = i(v.y + R.y)) : (u = i(v.x), _ = i(v.y)), c += " C " + d + " " + f + " " + u + " " + _ + " " + (F = i(R.x)) + " " + (M = i(R.y))), S.command !== t.Commands.close && (c += " Z")), l += c + " "
                }
                return l
            },
            getClip: function(t) {
                var e = t._renderer.clip;
                if (!e) {
                    for (var i = t; i.parent;) i = i.parent;
                    e = t._renderer.clip = s.createElement("clipPath"), i.defs.appendChild(e)
                }
                return e
            },
            group: {
                appendChild: function(t) {
                    var e = t._renderer.elem;
                    if (e) {
                        var i = e.nodeName;
                        !i || /(radial|linear)gradient/i.test(i) || t._clip || this.elem.appendChild(e)
                    }
                },
                removeChild: function(t) {
                    var e = t._renderer.elem;
                    e && e.parentNode == this.elem && (e.nodeName && (t._clip || this.elem.removeChild(e)))
                },
                orderChild: function(t) {
                    this.elem.appendChild(t._renderer.elem)
                },
                renderChild: function(t) {
                    s[t._renderer.type].render.call(t, this)
                },
                render: function(t) {
                    if (this._update(), 0 === this._opacity && !this._flagOpacity) return this;
                    this._renderer.elem || (this._renderer.elem = s.createElement("g", {
                        id: this.id
                    }), t.appendChild(this._renderer.elem));
                    var e = this._matrix.manual || this._flagMatrix,
                        i = {
                            domElement: t,
                            elem: this._renderer.elem
                        };
                    e && this._renderer.elem.setAttribute("transform", "matrix(" + this._matrix.toString() + ")");
                    for (var r = 0; r < this.children.length; r++) {
                        var n = this.children[r];
                        s[n._renderer.type].render.call(n, t)
                    }
                    return this._flagOpacity && this._renderer.elem.setAttribute("opacity", this._opacity), this._flagClassName && this._renderer.elem.setAttribute("class", this.classList.join(" ")), this._flagAdditions && this.additions.forEach(s.group.appendChild, i), this._flagSubtractions && this.subtractions.forEach(s.group.removeChild, i), this._flagOrder && this.children.forEach(s.group.orderChild, i), this._flagMask && (this._mask ? this._renderer.elem.setAttribute("clip-path", "url(#" + this._mask.id + ")") : this._renderer.elem.removeAttribute("clip-path")), this.flagReset()
                }
            },
            path: {
                render: function(t) {
                    if (this._update(), 0 === this._opacity && !this._flagOpacity) return this;
                    var e = {};
                    if ((this._matrix.manual || this._flagMatrix) && (e.transform = "matrix(" + this._matrix.toString() + ")"), this._flagVertices) {
                        var i = s.toString(this._renderer.vertices, this._closed);
                        e.d = i
                    }
                    if (this._fill && this._fill._renderer && (this._fill._update(), s[this._fill._renderer.type].render.call(this._fill, t, !0)), this._flagFill && (e.fill = this._fill && this._fill.id ? "url(#" + this._fill.id + ")" : this._fill), this._stroke && this._stroke._renderer && (this._stroke._update(), s[this._stroke._renderer.type].render.call(this._stroke, t, !0)), this._flagStroke && (e.stroke = this._stroke && this._stroke.id ? "url(#" + this._stroke.id + ")" : this._stroke), this._flagLinewidth && (e["stroke-width"] = this._linewidth), this._flagOpacity && (e["stroke-opacity"] = this._opacity, e["fill-opacity"] = this._opacity), this._flagClassName && (e.class = this.classList.join(" ")), this._flagVisible && (e.visibility = this._visible ? "visible" : "hidden"), this._flagCap && (e["stroke-linecap"] = this._cap), this._flagJoin && (e["stroke-linejoin"] = this._join), this._flagMiter && (e["stroke-miterlimit"] = this._miter), this.dashes && this.dashes.length > 0 && (e["stroke-dasharray"] = this.dashes.join(" "), e["stroke-dashoffset"] = this.dashes.offset || 0), this._renderer.elem ? s.setAttributes(this._renderer.elem, e) : (e.id = this.id, this._renderer.elem = s.createElement("path", e), t.appendChild(this._renderer.elem)), this._flagClip) {
                        var r = s.getClip(this),
                            n = this._renderer.elem;
                        this._clip ? (n.removeAttribute("id"), r.setAttribute("id", this.id), r.appendChild(n)) : (r.removeAttribute("id"), n.setAttribute("id", this.id), this.parent._renderer.elem.appendChild(n))
                    }
                    return this.flagReset()
                }
            },
            text: {
                render: function(t) {
                    this._update();
                    var e = {};
                    if ((this._matrix.manual || this._flagMatrix) && (e.transform = "matrix(" + this._matrix.toString() + ")"), this._flagFamily && (e["font-family"] = this._family), this._flagSize && (e["font-size"] = this._size), this._flagLeading && (e["line-height"] = this._leading), this._flagAlignment && (e["text-anchor"] = s.alignments[this._alignment] || this._alignment), this._flagBaseline && (e["alignment-baseline"] = e["dominant-baseline"] = this._baseline), this._flagStyle && (e["font-style"] = this._style), this._flagWeight && (e["font-weight"] = this._weight), this._flagDecoration && (e["text-decoration"] = this._decoration), this._fill && this._fill._renderer && (this._fill._update(), s[this._fill._renderer.type].render.call(this._fill, t, !0)), this._flagFill && (e.fill = this._fill && this._fill.id ? "url(#" + this._fill.id + ")" : this._fill), this._stroke && this._stroke._renderer && (this._stroke._update(), s[this._stroke._renderer.type].render.call(this._stroke, t, !0)), this._flagStroke && (e.stroke = this._stroke && this._stroke.id ? "url(#" + this._stroke.id + ")" : this._stroke), this._flagLinewidth && (e["stroke-width"] = this._linewidth), this._flagOpacity && (e.opacity = this._opacity), this._flagClassName && (e.class = this.classList.join(" ")), this._flagVisible && (e.visibility = this._visible ? "visible" : "hidden"), this.dashes && this.dashes.length > 0 && (e["stroke-dasharray"] = this.dashes.join(" "), e["stroke-dashoffset"] = this.dashes.offset || 0), this._renderer.elem ? s.setAttributes(this._renderer.elem, e) : (e.id = this.id, this._renderer.elem = s.createElement("text", e), t.defs.appendChild(this._renderer.elem)), this._flagClip) {
                        var i = s.getClip(this),
                            r = this._renderer.elem;
                        this._clip ? (r.removeAttribute("id"), i.setAttribute("id", this.id), i.appendChild(r)) : (i.removeAttribute("id"), r.setAttribute("id", this.id), this.parent._renderer.elem.appendChild(r))
                    }
                    return this._flagValue && (this._renderer.elem.textContent = this._value), this.flagReset()
                }
            },
            "linear-gradient": {
                render: function(t, e) {
                    e || this._update();
                    var i = {};
                    if (this._flagEndPoints && (i.x1 = this.left._x, i.y1 = this.left._y, i.x2 = this.right._x, i.y2 = this.right._y), this._flagSpread && (i.spreadMethod = this._spread), this._renderer.elem ? s.setAttributes(this._renderer.elem, i) : (i.id = this.id, i.gradientUnits = "userSpaceOnUse", this._renderer.elem = s.createElement("linearGradient", i), t.defs.appendChild(this._renderer.elem)), this._flagStops) {
                        var r = this._renderer.elem.childNodes.length !== this.stops.length;
                        if (r)
                            for (; this._renderer.elem.lastChild;) this._renderer.elem.removeChild(this._renderer.elem.lastChild);
                        for (var n = 0; n < this.stops.length; n++) {
                            var a = this.stops[n],
                                o = {};
                            a._flagOffset && (o.offset = 100 * a._offset + "%"), a._flagColor && (o["stop-color"] = a._color), a._flagOpacity && (o["stop-opacity"] = a._opacity), a._renderer.elem ? s.setAttributes(a._renderer.elem, o) : a._renderer.elem = s.createElement("stop", o), r && this._renderer.elem.appendChild(a._renderer.elem), a.flagReset()
                        }
                    }
                    return this.flagReset()
                }
            },
            "radial-gradient": {
                render: function(t, e) {
                    e || this._update();
                    var i = {};
                    if (this._flagCenter && (i.cx = this.center._x, i.cy = this.center._y), this._flagFocal && (i.fx = this.focal._x, i.fy = this.focal._y), this._flagRadius && (i.r = this._radius), this._flagSpread && (i.spreadMethod = this._spread), this._renderer.elem ? s.setAttributes(this._renderer.elem, i) : (i.id = this.id, i.gradientUnits = "userSpaceOnUse", this._renderer.elem = s.createElement("radialGradient", i), t.defs.appendChild(this._renderer.elem)), this._flagStops) {
                        var r = this._renderer.elem.childNodes.length !== this.stops.length;
                        if (r)
                            for (; this._renderer.elem.lastChild;) this._renderer.elem.removeChild(this._renderer.elem.lastChild);
                        for (var n = 0; n < this.stops.length; n++) {
                            var a = this.stops[n],
                                o = {};
                            a._flagOffset && (o.offset = 100 * a._offset + "%"), a._flagColor && (o["stop-color"] = a._color), a._flagOpacity && (o["stop-opacity"] = a._opacity), a._renderer.elem ? s.setAttributes(a._renderer.elem, o) : a._renderer.elem = s.createElement("stop", o), r && this._renderer.elem.appendChild(a._renderer.elem), a.flagReset()
                        }
                    }
                    return this.flagReset()
                }
            },
            texture: {
                render: function(e, i) {
                    i || this._update();
                    var n = {},
                        a = {
                            x: 0,
                            y: 0
                        },
                        o = this.image;
                    if (this._flagLoaded && this.loaded) switch (o.nodeName.toLowerCase()) {
                        case "canvas":
                            a.href = a["xlink:href"] = o.toDataURL("image/png");
                            break;
                        case "img":
                        case "image":
                            a.href = a["xlink:href"] = this.src
                    }
                    if ((this._flagOffset || this._flagLoaded || this._flagScale) && (n.x = this._offset.x, n.y = this._offset.y, o && (n.x -= o.width / 2, n.y -= o.height / 2, this._scale instanceof t.Vector ? (n.x *= this._scale.x, n.y *= this._scale.y) : (n.x *= this._scale, n.y *= this._scale)), n.x > 0 && (n.x *= -1), n.y > 0 && (n.y *= -1)), (this._flagScale || this._flagLoaded || this._flagRepeat) && (n.width = 0, n.height = 0, o)) {
                        switch (a.width = n.width = o.width, a.height = n.height = o.height, this._repeat) {
                            case "no-repeat":
                                n.width += 1, n.height += 1
                        }
                        this._scale instanceof t.Vector ? (n.width *= this._scale.x, n.height *= this._scale.y) : (n.width *= this._scale, n.height *= this._scale)
                    }
                    return (this._flagScale || this._flagLoaded) && (this._renderer.image ? r.isEmpty(a) || s.setAttributes(this._renderer.image, a) : this._renderer.image = s.createElement("image", a)), this._renderer.elem ? r.isEmpty(n) || s.setAttributes(this._renderer.elem, n) : (n.id = this.id, n.patternUnits = "userSpaceOnUse", this._renderer.elem = s.createElement("pattern", n), e.defs.appendChild(this._renderer.elem)), this._renderer.elem && this._renderer.image && !this._renderer.appended && (this._renderer.elem.appendChild(this._renderer.image), this._renderer.appended = !0), this.flagReset()
                }
            }
        },
        n = t[t.Types.svg] = function(e) {
            this.domElement = e.domElement || s.createElement("svg"), this.scene = new t.Group, this.scene.parent = this, this.defs = s.createElement("defs"), this.domElement.appendChild(this.defs), this.domElement.defs = this.defs, this.domElement.style.overflow = "hidden"
        };
    r.extend(n, {
        Utils: s
    }), r.extend(n.prototype, t.Utils.Events, {
        constructor: n,
        setSize: function(e, i) {
            return this.width = e, this.height = i, s.setAttributes(this.domElement, {
                width: e,
                height: i
            }), this.trigger(t.Events.resize, e, i)
        },
        render: function() {
            return s.group.render.call(this.scene, this.domElement), this
        }
    })
}(("undefined" != typeof global ? global : this || self || window).Two),
function(t) {
    var e = t.Utils.mod,
        i = t.Utils.getRatio,
        r = t.Utils,
        s = [],
        n = 2 * Math.PI,
        a = Math.max,
        o = Math.min,
        l = Math.abs,
        h = Math.sin,
        c = Math.cos,
        d = Math.acos,
        f = Math.sqrt,
        u = function(t) {
            return 1 == t[0] && 0 == t[3] && 0 == t[1] && 1 == t[4] && 0 == t[2] && 0 == t[5]
        },
        _ = {
            isHidden: /(undefined|none|transparent)/i,
            alignments: {
                left: "start",
                middle: "center",
                right: "end"
            },
            shim: function(t, e) {
                return t.tagName = t.nodeName = e || "canvas", t.nodeType = 1, t.getAttribute = function(t) {
                    return this[t]
                }, t.setAttribute = function(t, e) {
                    return this[t] = e, this
                }, t
            },
            group: {
                renderChild: function(t) {
                    _[t._renderer.type].render.call(t, this.ctx, !0, this.clip)
                },
                render: function(t) {
                    this._update();
                    var e = this._matrix.elements,
                        i = this.parent;
                    this._renderer.opacity = this._opacity * (i && i._renderer ? i._renderer.opacity : 1);
                    var r = this._mask,
                        s = u(e),
                        n = !s || !!r;
                    if (this._renderer.context || (this._renderer.context = {}), this._renderer.context.ctx = t, n && (t.save(), s || t.transform(e[0], e[3], e[1], e[4], e[2], e[5])), r && _[r._renderer.type].render.call(r, t, !0), this.opacity > 0 && 0 !== this.scale)
                        for (var a = 0; a < this.children.length; a++) {
                            var o = this.children[a];
                            _[o._renderer.type].render.call(o, t)
                        }
                    return n && t.restore(), this.flagReset()
                }
            },
            path: {
                render: function(i, n, o) {
                    var l, h, c, d, f, g, p, m, v, y, x, b, w, k, S, A, E, C, R, F, M, O, P, U, T, N, L, j, V, I, G, B, z;
                    if (this._update(), l = this._matrix.elements, h = this._stroke, c = this._linewidth, d = this._fill, f = this._opacity * this.parent._renderer.opacity, g = this._visible, p = this._cap, m = this._join, v = this._miter, y = this._closed, w = (b = (x = this._renderer.vertices).length) - 1, G = u(l), z = this.dashes, I = this._clip, !n && (!g || I)) return this;
                    G || (i.save(), i.transform(l[0], l[3], l[1], l[4], l[2], l[5])), d && (r.isString(d) ? i.fillStyle = d : (_[d._renderer.type].render.call(d, i), i.fillStyle = d._renderer.effect)), h && (r.isString(h) ? i.strokeStyle = h : (_[h._renderer.type].render.call(h, i), i.strokeStyle = h._renderer.effect), c && (i.lineWidth = c), v && (i.miterLimit = v), m && (i.lineJoin = m), !y && p && (i.lineCap = p)), r.isNumber(f) && (i.globalAlpha = f), z && z.length > 0 && (i.lineDashOffset = z.offset || 0, i.setLineDash(z)), i.beginPath();
                    for (var D = 0; D < x.length; D++) switch (j = (E = x[D]).x, V = E.y, E.command) {
                        case t.Commands.close:
                            i.closePath();
                            break;
                        case t.Commands.arc:
                            var H = E.rx,
                                q = E.ry,
                                W = E.xAxisRotation,
                                X = E.largeArcFlag,
                                Y = E.sweepFlag,
                                K = (A = x[S = y ? e(D - 1, b) : a(D - 1, 0)]).x,
                                J = A.y;
                            _.renderSvgArcCommand(i, K, J, H, q, X, Y, W, j, V);
                            break;
                        case t.Commands.curve:
                            S = y ? e(D - 1, b) : Math.max(D - 1, 0), k = y ? e(D + 1, b) : Math.min(D + 1, w), A = x[S], C = x[k], U = A.controls && A.controls.right || t.Vector.zero, T = E.controls && E.controls.left || t.Vector.zero, A._relative ? (O = U.x + A.x, P = U.y + A.y) : (O = U.x, P = U.y), E._relative ? (F = T.x + E.x, M = T.y + E.y) : (F = T.x, M = T.y), i.bezierCurveTo(O, P, F, M, j, V), D >= w && y && (C = R, N = E.controls && E.controls.right || t.Vector.zero, L = C.controls && C.controls.left || t.Vector.zero, E._relative ? (O = N.x + E.x, P = N.y + E.y) : (O = N.x, P = N.y), C._relative ? (F = L.x + C.x, M = L.y + C.y) : (F = L.x, M = L.y), j = C.x, V = C.y, i.bezierCurveTo(O, P, F, M, j, V));
                            break;
                        case t.Commands.line:
                            i.lineTo(j, V);
                            break;
                        case t.Commands.move:
                            R = E, i.moveTo(j, V)
                    }
                    return y && i.closePath(), I || o || (_.isHidden.test(d) || ((B = d._renderer && d._renderer.offset) && (i.save(), i.translate(-d._renderer.offset.x, -d._renderer.offset.y), i.scale(d._renderer.scale.x, d._renderer.scale.y)), i.fill(), B && i.restore()), _.isHidden.test(h) || ((B = h._renderer && h._renderer.offset) && (i.save(), i.translate(-h._renderer.offset.x, -h._renderer.offset.y), i.scale(h._renderer.scale.x, h._renderer.scale.y), i.lineWidth = c / h._renderer.scale.x), i.stroke(), B && i.restore())), G || i.restore(), I && !o && i.clip(), z && z.length > 0 && i.setLineDash(s), this.flagReset()
                }
            },
            text: {
                render: function(t, e, i) {
                    this._update();
                    var n, a, o, l, h, c, d, f = this._matrix.elements,
                        g = this._stroke,
                        p = this._linewidth,
                        m = this._fill,
                        v = this._opacity * this.parent._renderer.opacity,
                        y = this._visible,
                        x = u(f),
                        b = m._renderer && m._renderer.offset && g._renderer && g._renderer.offset,
                        w = this.dashes,
                        k = this._clip;
                    return e || y && !k ? (x || (t.save(), t.transform(f[0], f[3], f[1], f[4], f[2], f[5])), b || (t.font = [this._style, this._weight, this._size + "px/" + this._leading + "px", this._family].join(" ")), t.textAlign = _.alignments[this._alignment] || this._alignment, t.textBaseline = this._baseline, m && (r.isString(m) ? t.fillStyle = m : (_[m._renderer.type].render.call(m, t), t.fillStyle = m._renderer.effect)), g && (r.isString(g) ? t.strokeStyle = g : (_[g._renderer.type].render.call(g, t), t.strokeStyle = g._renderer.effect), p && (t.lineWidth = p)), r.isNumber(v) && (t.globalAlpha = v), w && w.length > 0 && (t.lineDashOffset = w.offset || 0, t.setLineDash(w)), k || i || (_.isHidden.test(m) || (m._renderer && m._renderer.offset ? (c = m._renderer.scale.x, d = m._renderer.scale.y, t.save(), t.translate(-m._renderer.offset.x, -m._renderer.offset.y), t.scale(c, d), n = this._size / m._renderer.scale.y, a = this._leading / m._renderer.scale.y, t.font = [this._style, this._weight, n + "px/", a + "px", this._family].join(" "), o = m._renderer.offset.x / m._renderer.scale.x, l = m._renderer.offset.y / m._renderer.scale.y, t.fillText(this.value, o, l), t.restore()) : t.fillText(this.value, 0, 0)), _.isHidden.test(g) || (g._renderer && g._renderer.offset ? (c = g._renderer.scale.x, d = g._renderer.scale.y, t.save(), t.translate(-g._renderer.offset.x, -g._renderer.offset.y), t.scale(c, d), n = this._size / g._renderer.scale.y, a = this._leading / g._renderer.scale.y, t.font = [this._style, this._weight, n + "px/", a + "px", this._family].join(" "), o = g._renderer.offset.x / g._renderer.scale.x, l = g._renderer.offset.y / g._renderer.scale.y, h = p / g._renderer.scale.x, t.lineWidth = h, t.strokeText(this.value, o, l), t.restore()) : t.strokeText(this.value, 0, 0))), x || t.restore(), k && !i && t.clip(), w && w.length > 0 && t.setLineDash(s), this.flagReset()) : this
                }
            },
            "linear-gradient": {
                render: function(t) {
                    if (this._update(), !this._renderer.effect || this._flagEndPoints || this._flagStops) {
                        this._renderer.effect = t.createLinearGradient(this.left._x, this.left._y, this.right._x, this.right._y);
                        for (var e = 0; e < this.stops.length; e++) {
                            var i = this.stops[e];
                            this._renderer.effect.addColorStop(i._offset, i._color)
                        }
                    }
                    return this.flagReset()
                }
            },
            "radial-gradient": {
                render: function(t) {
                    if (this._update(), !this._renderer.effect || this._flagCenter || this._flagFocal || this._flagRadius || this._flagStops) {
                        this._renderer.effect = t.createRadialGradient(this.center._x, this.center._y, 0, this.focal._x, this.focal._y, this._radius);
                        for (var e = 0; e < this.stops.length; e++) {
                            var i = this.stops[e];
                            this._renderer.effect.addColorStop(i._offset, i._color)
                        }
                    }
                    return this.flagReset()
                }
            },
            texture: {
                render: function(e) {
                    this._update();
                    var i = this.image;
                    return (!this._renderer.effect || (this._flagLoaded || this._flagImage || this._flagVideo || this._flagRepeat) && this.loaded) && (this._renderer.effect = e.createPattern(this.image, this._repeat)), (this._flagOffset || this._flagLoaded || this._flagScale) && (this._renderer.offset instanceof t.Vector || (this._renderer.offset = new t.Vector), this._renderer.offset.x = -this._offset.x, this._renderer.offset.y = -this._offset.y, i && (this._renderer.offset.x += i.width / 2, this._renderer.offset.y += i.height / 2, this._scale instanceof t.Vector ? (this._renderer.offset.x *= this._scale.x, this._renderer.offset.y *= this._scale.y) : (this._renderer.offset.x *= this._scale, this._renderer.offset.y *= this._scale))), (this._flagScale || this._flagLoaded) && (this._renderer.scale instanceof t.Vector || (this._renderer.scale = new t.Vector), this._scale instanceof t.Vector ? this._renderer.scale.copy(this._scale) : this._renderer.scale.set(this._scale, this._scale)), this.flagReset()
                }
            },
            renderSvgArcCommand: function(i, r, s, o, d, u, _, g, m, v) {
                g = g * Math.PI / 180, o = l(o), d = l(d);
                var y = (r - m) / 2,
                    x = (s - v) / 2,
                    b = c(g) * y + h(g) * x,
                    w = -h(g) * y + c(g) * x,
                    k = o * o,
                    S = d * d,
                    A = b * b,
                    E = w * w,
                    C = A / k + E / S;
                if (C > 1) {
                    var R = f(C);
                    k = (o *= R) * o, S = (d *= R) * d
                }
                var F = k * E + S * A,
                    M = f(a(0, (k * S - F) / F));
                u === _ && (M = -M);
                var O = M * o * w / d,
                    P = -M * d * b / o,
                    U = c(g) * O - h(g) * P + (r + m) / 2,
                    T = h(g) * O + c(g) * P + (s + v) / 2,
                    N = p(1, 0, (b - O) / o, (w - P) / d);
                ! function(i, r, s, a, o, l, h, c, d) {
                    var f = t.Utils.Curve.Tolerance.epsilon,
                        u = h - l,
                        _ = Math.abs(u) < f;
                    (u = e(u, n)) < f && (u = _ ? 0 : n);
                    !0 !== c || _ || (u === n ? u = -n : u -= n);
                    for (var g = 0; g < t.Resolution; g++) {
                        var p = g / (t.Resolution - 1),
                            m = l + p * u,
                            v = r + a * Math.cos(m),
                            y = s + o * Math.sin(m);
                        if (0 !== d) {
                            var x = Math.cos(d),
                                b = Math.sin(d),
                                w = v - r,
                                k = y - s;
                            v = w * x - k * b + r, y = w * b + k * x + s
                        }
                        i.lineTo(v, y)
                    }
                }(i, U, T, o, d, N, N + p((b - O) / o, (w - P) / d, (-b - O) / o, (-w - P) / d) % n, 0 === _, g)
            }
        },
        g = t[t.Types.canvas] = function(e) {
            var i = !1 !== e.smoothing;
            this.domElement = e.domElement || document.createElement("canvas"), this.ctx = this.domElement.getContext("2d"), this.overdraw = e.overdraw || !1, r.isUndefined(this.ctx.imageSmoothingEnabled) || (this.ctx.imageSmoothingEnabled = i), this.scene = new t.Group, this.scene.parent = this
        };

    function p(t, e, i, r) {
        var s = t * i + e * r,
            n = f(t * t + e * e) * f(i * i + r * r),
            l = d(a(-1, o(1, s / n)));
        return t * r - e * i < 0 && (l = -l), l
    }
    r.extend(g, {
        Utils: _
    }), r.extend(g.prototype, t.Utils.Events, {
        constructor: g,
        setSize: function(e, s, n) {
            return this.width = e, this.height = s, this.ratio = r.isUndefined(n) ? i(this.ctx) : n, this.domElement.width = e * this.ratio, this.domElement.height = s * this.ratio, this.domElement.style && r.extend(this.domElement.style, {
                width: e + "px",
                height: s + "px"
            }), this.trigger(t.Events.resize, e, s, n)
        },
        render: function() {
            var t = 1 === this.ratio;
            return t || (this.ctx.save(), this.ctx.scale(this.ratio, this.ratio)), this.overdraw || this.ctx.clearRect(0, 0, this.width, this.height), _.group.render.call(this.scene, this.ctx), t || this.ctx.restore(), this
        }
    })
}(("undefined" != typeof global ? global : this || self || window).Two),
function(t) {
    var e = t.root,
        i = t.Matrix.Multiply,
        r = t.Utils.mod,
        s = [1, 0, 0, 0, 1, 0, 0, 0, 1],
        n = new t.Array(9),
        a = t.Utils.getRatio,
        o = (t.Utils.getComputedMatrix, t[t.Types.canvas].Utils),
        l = t.Utils,
        h = {
            isHidden: /(undefined|none|transparent)/i,
            canvas: e.document ? e.document.createElement("canvas") : {
                getContext: l.identity
            },
            alignments: {
                left: "start",
                middle: "center",
                right: "end"
            },
            matrix: new t.Matrix,
            group: {
                removeChild: function(t, e) {
                    if (t.children)
                        for (var i = 0; i < t.children.length; i++) h.group.removeChild(t.children[i], e);
                    else e.deleteTexture(t._renderer.texture), delete t._renderer.texture
                },
                render: function(e, r) {
                    this._update();
                    var s, a = this.parent,
                        o = a._matrix && a._matrix.manual || a._flagMatrix,
                        l = this._matrix.manual || this._flagMatrix;
                    if ((o || l) && (this._renderer.matrix || (this._renderer.matrix = new t.Array(9)), this._matrix.toTransformArray(!0, n), i(n, a._renderer.matrix, this._renderer.matrix), this._renderer.scale instanceof t.Vector || (this._renderer.scale = new t.Vector), this._scale instanceof t.Vector ? (this._renderer.scale.x = this._scale.x, this._renderer.scale.y = this._scale.y) : (this._renderer.scale.x = this._scale, this._renderer.scale.y = this._scale), /renderer/i.test(a._renderer.type) || (this._renderer.scale.x *= a._renderer.scale.x, this._renderer.scale.y *= a._renderer.scale.y), o && (this._flagMatrix = !0)), this._mask && (e.clear(e.STENCIL_BUFFER_BIT), e.enable(e.STENCIL_TEST), e.stencilFunc(e.ALWAYS, 1, 0), e.stencilOp(e.KEEP, e.KEEP, e.REPLACE), h[this._mask._renderer.type].render.call(this._mask, e, r, this), e.stencilFunc(e.EQUAL, 1, 255), e.stencilOp(e.KEEP, e.KEEP, e.KEEP)), this._flagOpacity = a._flagOpacity || this._flagOpacity, this._renderer.opacity = this._opacity * (a && a._renderer ? a._renderer.opacity : 1), this._flagSubtractions)
                        for (s = 0; s < this.subtractions.length; s++) h.group.removeChild(this.subtractions[s], e);
                    for (s = 0; s < this.children.length; s++) {
                        var c = this.children[s];
                        h[c._renderer.type].render.call(c, e, r)
                    }
                    return this._mask && e.disable(e.STENCIL_TEST), this.flagReset()
                }
            },
            path: {
                updateCanvas: function(e) {
                    var i, s, n, a, c, d, f, u, _, g, p, m, v, y, x, b = e._renderer.vertices,
                        w = this.canvas,
                        k = this.ctx,
                        S = e._renderer.scale,
                        A = e._stroke,
                        E = e._linewidth,
                        C = e._fill,
                        R = e._renderer.opacity || e._opacity,
                        F = e._cap,
                        M = e._join,
                        O = e._miter,
                        P = e._closed,
                        U = e.dashes,
                        T = b.length,
                        N = T - 1;
                    w.width = Math.max(Math.ceil(e._renderer.rect.width * S.x), 1), w.height = Math.max(Math.ceil(e._renderer.rect.height * S.y), 1);
                    var L, j = e._renderer.rect.centroid,
                        V = j.x,
                        I = j.y;
                    k.clearRect(0, 0, w.width, w.height), C && (l.isString(C) ? k.fillStyle = C : (h[C._renderer.type].render.call(C, k, e), k.fillStyle = C._renderer.effect)), A && (l.isString(A) ? k.strokeStyle = A : (h[A._renderer.type].render.call(A, k, e), k.strokeStyle = A._renderer.effect), E && (k.lineWidth = E), O && (k.miterLimit = O), M && (k.lineJoin = M), !P && F && (k.lineCap = F)), l.isNumber(R) && (k.globalAlpha = R), U && U.length > 0 && (k.lineDashOffset = U.offset || 0, k.setLineDash(U)), k.save(), k.scale(S.x, S.y), k.translate(V, I), k.beginPath();
                    for (var G = 0; G < b.length; G++) {
                        var B = b[G];
                        switch (v = B.x, y = B.y, B.command) {
                            case t.Commands.close:
                                k.closePath();
                                break;
                            case t.Commands.arc:
                                var z = B.rx,
                                    D = B.ry,
                                    H = B.xAxisRotation,
                                    q = B.largeArcFlag,
                                    W = B.sweepFlag,
                                    X = (n = b[s = P ? r(G - 1, T) : Math.max(G - 1, 0)]).x,
                                    Y = n.y;
                                o.renderSvgArcCommand(k, X, Y, z, D, q, W, H, v, y);
                                break;
                            case t.Commands.curve:
                                s = P ? r(G - 1, T) : Math.max(G - 1, 0), i = P ? r(G + 1, T) : Math.min(G + 1, N), n = b[s], a = b[i], _ = n.controls && n.controls.right || t.Vector.zero, g = B.controls && B.controls.left || t.Vector.zero, n._relative ? (f = _.x + n.x, u = _.y + n.y) : (f = _.x, u = _.y), B._relative ? (c = g.x + B.x, d = g.y + B.y) : (c = g.x, d = g.y), k.bezierCurveTo(f, u, c, d, v, y), G >= N && P && (a = L, p = B.controls && B.controls.right || t.Vector.zero, m = a.controls && a.controls.left || t.Vector.zero, B._relative ? (f = p.x + B.x, u = p.y + B.y) : (f = p.x, u = p.y), a._relative ? (c = m.x + a.x, d = m.y + a.y) : (c = m.x, d = m.y), v = a.x, y = a.y, k.bezierCurveTo(f, u, c, d, v, y));
                                break;
                            case t.Commands.line:
                                k.lineTo(v, y);
                                break;
                            case t.Commands.move:
                                L = B, k.moveTo(v, y)
                        }
                    }
                    P && k.closePath(), h.isHidden.test(C) || ((x = C._renderer && C._renderer.offset) && (k.save(), k.translate(-C._renderer.offset.x, -C._renderer.offset.y), k.scale(C._renderer.scale.x, C._renderer.scale.y)), k.fill(), x && k.restore()), h.isHidden.test(A) || ((x = A._renderer && A._renderer.offset) && (k.save(), k.translate(-A._renderer.offset.x, -A._renderer.offset.y), k.scale(A._renderer.scale.x, A._renderer.scale.y), k.lineWidth = E / A._renderer.scale.x), k.stroke(), x && k.restore()), k.restore()
                },
                getBoundingClientRect: function(t, e, i) {
                    var r, s, n = 1 / 0,
                        a = -1 / 0,
                        o = 1 / 0,
                        h = -1 / 0;
                    t.forEach((function(t) {
                        var e, i, r, s, l, c, d = t.x,
                            f = t.y,
                            u = t.controls;
                        o = Math.min(f, o), n = Math.min(d, n), a = Math.max(d, a), h = Math.max(f, h), t.controls && (l = u.left, c = u.right, l && c && (e = t._relative ? l.x + d : l.x, i = t._relative ? l.y + f : l.y, r = t._relative ? c.x + d : c.x, s = t._relative ? c.y + f : c.y, e && i && r && s && (o = Math.min(i, s, o), n = Math.min(e, r, n), a = Math.max(e, r, a), h = Math.max(i, s, h))))
                    })), l.isNumber(e) && (o -= e, n -= e, a += e, h += e), r = a - n, s = h - o, i.top = o, i.left = n, i.right = a, i.bottom = h, i.width = r, i.height = s, i.centroid || (i.centroid = {}), i.centroid.x = -n, i.centroid.y = -o
                },
                render: function(e, r, s) {
                    if (!this._visible || !this._opacity) return this;
                    this._update();
                    var a = this.parent,
                        o = a._matrix.manual || a._flagMatrix,
                        l = this._matrix.manual || this._flagMatrix,
                        c = this._flagVertices || this._flagFill || this._fill instanceof t.LinearGradient && (this._fill._flagSpread || this._fill._flagStops || this._fill._flagEndPoints) || this._fill instanceof t.RadialGradient && (this._fill._flagSpread || this._fill._flagStops || this._fill._flagRadius || this._fill._flagCenter || this._fill._flagFocal) || this._fill instanceof t.Texture && (this._fill._flagLoaded && this._fill.loaded || this._fill._flagImage || this._fill._flagVideo || this._fill._flagRepeat || this._fill._flagOffset || this._fill._flagScale) || this._stroke instanceof t.LinearGradient && (this._stroke._flagSpread || this._stroke._flagStops || this._stroke._flagEndPoints) || this._stroke instanceof t.RadialGradient && (this._stroke._flagSpread || this._stroke._flagStops || this._stroke._flagRadius || this._stroke._flagCenter || this._stroke._flagFocal) || this._stroke instanceof t.Texture && (this._stroke._flagLoaded && this._stroke.loaded || this._stroke._flagImage || this._stroke._flagVideo || this._stroke._flagRepeat || this._stroke._flagOffset || this._fill._flagScale) || this._flagStroke || this._flagLinewidth || this._flagOpacity || a._flagOpacity || this._flagVisible || this._flagCap || this._flagJoin || this._flagMiter || this._flagScale || this.dashes && this.dashes.length > 0 || !this._renderer.texture;
                    if ((o || l) && (this._renderer.matrix || (this._renderer.matrix = new t.Array(9)), this._matrix.toTransformArray(!0, n), i(n, a._renderer.matrix, this._renderer.matrix), this._renderer.scale instanceof t.Vector || (this._renderer.scale = new t.Vector), this._scale instanceof t.Vector ? (this._renderer.scale.x = this._scale.x * a._renderer.scale.x, this._renderer.scale.y = this._scale.y * a._renderer.scale.y) : (this._renderer.scale.x = this._scale * a._renderer.scale.x, this._renderer.scale.y = this._scale * a._renderer.scale.y)), c ? (this._renderer.rect || (this._renderer.rect = {}), this._renderer.opacity = this._opacity * a._renderer.opacity, h.path.getBoundingClientRect(this._renderer.vertices, this._linewidth, this._renderer.rect), h.updateTexture.call(h, e, this)) : (this._fill && this._fill._update && this._fill._update(), this._stroke && this._stroke._update && this._stroke._update()), !this._clip || s) {
                        e.bindTexture(e.TEXTURE_2D, this._renderer.texture);
                        var d = this._renderer.rect;
                        return e.uniformMatrix3fv(r.matrix, !1, this._renderer.matrix), e.uniform4f(r.rect, d.left, d.top, d.right, d.bottom), e.drawArrays(e.TRIANGLES, 0, 6), this.flagReset()
                    }
                }
            },
            text: {
                updateCanvas: function(t) {
                    var e = this.canvas,
                        i = this.ctx,
                        r = t._renderer.scale,
                        s = t._stroke,
                        n = t._linewidth * r,
                        a = t._fill,
                        o = t._renderer.opacity || t._opacity,
                        c = t.dashes;
                    e.width = Math.max(Math.ceil(t._renderer.rect.width * r.x), 1), e.height = Math.max(Math.ceil(t._renderer.rect.height * r.y), 1);
                    var d, f, u, _, g, p, m, v = t._renderer.rect.centroid,
                        y = v.x,
                        x = v.y,
                        b = a._renderer && a._renderer.offset && s._renderer && s._renderer.offset;
                    i.clearRect(0, 0, e.width, e.height), b || (i.font = [t._style, t._weight, t._size + "px/" + t._leading + "px", t._family].join(" ")), i.textAlign = "center", i.textBaseline = "middle", a && (l.isString(a) ? i.fillStyle = a : (h[a._renderer.type].render.call(a, i, t), i.fillStyle = a._renderer.effect)), s && (l.isString(s) ? i.strokeStyle = s : (h[s._renderer.type].render.call(s, i, t), i.strokeStyle = s._renderer.effect), n && (i.lineWidth = n)), l.isNumber(o) && (i.globalAlpha = o), c && c.length > 0 && (i.lineDashOffset = c.offset || 0, i.setLineDash(c)), i.save(), i.scale(r.x, r.y), i.translate(y, x), h.isHidden.test(a) || (a._renderer && a._renderer.offset ? (p = a._renderer.scale.x, m = a._renderer.scale.y, i.save(), i.translate(-a._renderer.offset.x, -a._renderer.offset.y), i.scale(p, m), d = t._size / a._renderer.scale.y, f = t._leading / a._renderer.scale.y, i.font = [t._style, t._weight, d + "px/", f + "px", t._family].join(" "), u = a._renderer.offset.x / a._renderer.scale.x, _ = a._renderer.offset.y / a._renderer.scale.y, i.fillText(t.value, u, _), i.restore()) : i.fillText(t.value, 0, 0)), h.isHidden.test(s) || (s._renderer && s._renderer.offset ? (p = s._renderer.scale.x, m = s._renderer.scale.y, i.save(), i.translate(-s._renderer.offset.x, -s._renderer.offset.y), i.scale(p, m), d = t._size / s._renderer.scale.y, f = t._leading / s._renderer.scale.y, i.font = [t._style, t._weight, d + "px/", f + "px", t._family].join(" "), u = s._renderer.offset.x / s._renderer.scale.x, _ = s._renderer.offset.y / s._renderer.scale.y, g = n / s._renderer.scale.x, i.lineWidth = g, i.strokeText(t.value, u, _), i.restore()) : i.strokeText(t.value, 0, 0)), i.restore()
                },
                getBoundingClientRect: function(t, e) {
                    var i = h.ctx;
                    i.font = [t._style, t._weight, t._size + "px/" + t._leading + "px", t._family].join(" "), i.textAlign = "center", i.textBaseline = t._baseline;
                    var r = 1.25 * i.measureText(t._value).width,
                        s = 1.25 * Math.max(t._size, t._leading);
                    this._linewidth && !h.isHidden.test(this._stroke) && (r += 2 * this._linewidth, s += 2 * this._linewidth);
                    var n = r / 2,
                        a = s / 2;
                    switch (h.alignments[t._alignment] || t._alignment) {
                        case h.alignments.left:
                            e.left = 0, e.right = r;
                            break;
                        case h.alignments.right:
                            e.left = -r, e.right = 0;
                            break;
                        default:
                            e.left = -n, e.right = n
                    }
                    switch (t._baseline) {
                        case "bottom":
                            e.top = -s, e.bottom = 0;
                            break;
                        case "top":
                            e.top = 0, e.bottom = s;
                            break;
                        default:
                            e.top = -a, e.bottom = a
                    }
                    e.width = r, e.height = s, e.centroid || (e.centroid = {}), e.centroid.x = n, e.centroid.y = a
                },
                render: function(e, r, s) {
                    if (!this._visible || !this._opacity) return this;
                    this._update();
                    var a = this.parent,
                        o = a._matrix.manual || a._flagMatrix,
                        l = this._matrix.manual || this._flagMatrix,
                        c = this._flagVertices || this._flagFill || this._fill instanceof t.LinearGradient && (this._fill._flagSpread || this._fill._flagStops || this._fill._flagEndPoints) || this._fill instanceof t.RadialGradient && (this._fill._flagSpread || this._fill._flagStops || this._fill._flagRadius || this._fill._flagCenter || this._fill._flagFocal) || this._fill instanceof t.Texture && (this._fill._flagLoaded && this._fill.loaded || this._fill._flagImage || this._fill._flagVideo || this._fill._flagRepeat || this._fill._flagOffset || this._fill._flagScale) || this._stroke instanceof t.LinearGradient && (this._stroke._flagSpread || this._stroke._flagStops || this._stroke._flagEndPoints) || this._stroke instanceof t.RadialGradient && (this._stroke._flagSpread || this._stroke._flagStops || this._stroke._flagRadius || this._stroke._flagCenter || this._stroke._flagFocal) || this._stroke instanceof t.Texture && (this._stroke._flagLoaded && this._stroke.loaded || this._stroke._flagImage || this._stroke._flagVideo || this._stroke._flagRepeat || this._stroke._flagOffset || this._fill._flagScale) || this._flagStroke || this._flagLinewidth || this._flagOpacity || a._flagOpacity || this._flagVisible || this._flagScale || this._flagValue || this._flagFamily || this._flagSize || this._flagLeading || this._flagAlignment || this._flagBaseline || this._flagStyle || this._flagWeight || this._flagDecoration || this.dashes && this.dashes.length > 0 || !this._renderer.texture;
                    if ((o || l) && (this._renderer.matrix || (this._renderer.matrix = new t.Array(9)), this._matrix.toTransformArray(!0, n), i(n, a._renderer.matrix, this._renderer.matrix), this._renderer.scale instanceof t.Vector || (this._renderer.scale = new t.Vector), this._scale instanceof t.Vector ? (this._renderer.scale.x = this._scale.x * a._renderer.scale.x, this._renderer.scale.y = this._scale.y * a._renderer.scale.y) : (this._renderer.scale.x = this._scale * a._renderer.scale.x, this._renderer.scale.y = this._scale * a._renderer.scale.y)), c ? (this._renderer.rect || (this._renderer.rect = {}), this._renderer.opacity = this._opacity * a._renderer.opacity, h.text.getBoundingClientRect(this, this._renderer.rect), h.updateTexture.call(h, e, this)) : (this._fill && this._fill._update && this._fill._update(), this._stroke && this._stroke._update && this._stroke._update()), !this._clip || s) {
                        e.bindTexture(e.TEXTURE_2D, this._renderer.texture);
                        var d = this._renderer.rect;
                        return e.uniformMatrix3fv(r.matrix, !1, this._renderer.matrix), e.uniform4f(r.rect, d.left, d.top, d.right, d.bottom), e.drawArrays(e.TRIANGLES, 0, 6), this.flagReset()
                    }
                }
            },
            "linear-gradient": {
                render: function(t, e) {
                    if (t.canvas.getContext("2d")) {
                        if (this._update(), !this._renderer.effect || this._flagEndPoints || this._flagStops) {
                            this._renderer.effect = t.createLinearGradient(this.left._x, this.left._y, this.right._x, this.right._y);
                            for (var i = 0; i < this.stops.length; i++) {
                                var r = this.stops[i];
                                this._renderer.effect.addColorStop(r._offset, r._color)
                            }
                        }
                        return this.flagReset()
                    }
                }
            },
            "radial-gradient": {
                render: function(t, e) {
                    if (t.canvas.getContext("2d")) {
                        if (this._update(), !this._renderer.effect || this._flagCenter || this._flagFocal || this._flagRadius || this._flagStops) {
                            this._renderer.effect = t.createRadialGradient(this.center._x, this.center._y, 0, this.focal._x, this.focal._y, this._radius);
                            for (var i = 0; i < this.stops.length; i++) {
                                var r = this.stops[i];
                                this._renderer.effect.addColorStop(r._offset, r._color)
                            }
                        }
                        return this.flagReset()
                    }
                }
            },
            texture: {
                render: function(e, i) {
                    if (e.canvas.getContext("2d")) {
                        this._update();
                        var r = this.image;
                        if ((this._flagLoaded || this._flagImage || this._flagVideo || this._flagRepeat) && this.loaded) this._renderer.effect = e.createPattern(r, this._repeat);
                        else if (!this._renderer.effect) return this.flagReset();
                        return (this._flagOffset || this._flagLoaded || this._flagScale) && (this._renderer.offset instanceof t.Vector || (this._renderer.offset = new t.Vector), this._renderer.offset.x = -this._offset.x, this._renderer.offset.y = -this._offset.y, r && (this._renderer.offset.x += r.width / 2, this._renderer.offset.y += r.height / 2, this._scale instanceof t.Vector ? (this._renderer.offset.x *= this._scale.x, this._renderer.offset.y *= this._scale.y) : (this._renderer.offset.x *= this._scale, this._renderer.offset.y *= this._scale))), (this._flagScale || this._flagLoaded) && (this._renderer.scale instanceof t.Vector || (this._renderer.scale = new t.Vector), this._scale instanceof t.Vector ? this._renderer.scale.copy(this._scale) : this._renderer.scale.set(this._scale, this._scale)), this.flagReset()
                    }
                }
            },
            updateTexture: function(t, e) {
                this[e._renderer.type].updateCanvas.call(h, e), e._renderer.texture || (e._renderer.texture = t.createTexture()), t.bindTexture(t.TEXTURE_2D, e._renderer.texture), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR), this.canvas.width <= 0 || this.canvas.height <= 0 || t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, t.RGBA, t.UNSIGNED_BYTE, this.canvas)
            },
            program: {
                create: function(e, i) {
                    var r, s;
                    if (r = e.createProgram(), l.each(i, (function(t) {
                            e.attachShader(r, t)
                        })), e.linkProgram(r), !e.getProgramParameter(r, e.LINK_STATUS)) throw s = e.getProgramInfoLog(r), e.deleteProgram(r), new t.Utils.Error("unable to link program: " + s);
                    return r
                }
            },
            shaders: {
                create: function(e, i, r) {
                    var s, n;
                    if (s = e.createShader(e[r]), e.shaderSource(s, i), e.compileShader(s), !e.getShaderParameter(s, e.COMPILE_STATUS)) throw n = e.getShaderInfoLog(s), e.deleteShader(s), new t.Utils.Error("unable to compile shader " + s + ": " + n);
                    return s
                },
                types: {
                    vertex: "VERTEX_SHADER",
                    fragment: "FRAGMENT_SHADER"
                },
                vertex: ["precision mediump float;", "attribute vec2 a_position;", "", "uniform mat3 u_matrix;", "uniform vec2 u_resolution;", "uniform vec4 u_rect;", "", "varying vec2 v_textureCoords;", "", "void main() {", "   vec2 rectCoords = (a_position * (u_rect.zw - u_rect.xy)) + u_rect.xy;", "   vec2 projected = (u_matrix * vec3(rectCoords, 1.0)).xy;", "   vec2 normal = projected / u_resolution;", "   vec2 clipspace = (normal * 2.0) - 1.0;", "", "   gl_Position = vec4(clipspace * vec2(1.0, -1.0), 0.0, 1.0);", "   v_textureCoords = a_position;", "}"].join("\n"),
                fragment: ["precision mediump float;", "", "uniform sampler2D u_image;", "varying vec2 v_textureCoords;", "", "void main() {", "  vec4 texel = texture2D(u_image, v_textureCoords);", "  if (texel.a == 0.0) {", "    discard;", "  }", "  gl_FragColor = texel;", "}"].join("\n")
            },
            TextureRegistry: new t.Registry
        };
    h.ctx = h.canvas.getContext("2d");
    var c = t[t.Types.webgl] = function(e) {
        var i, r, n;
        if (this.domElement = e.domElement || document.createElement("canvas"), l.isUndefined(e.offscreenElement) || (h.canvas = e.offscreenElement, h.ctx = h.canvas.getContext("2d")), this.scene = new t.Group, this.scene.parent = this, this._renderer = {
                type: "renderer",
                matrix: new t.Array(s),
                scale: 1,
                opacity: 1
            }, this._flagMatrix = !0, e = l.defaults(e || {}, {
                antialias: !1,
                alpha: !0,
                premultipliedAlpha: !0,
                stencil: !0,
                preserveDrawingBuffer: !0,
                overdraw: !1
            }), this.overdraw = e.overdraw, i = this.ctx = this.domElement.getContext("webgl", e) || this.domElement.getContext("experimental-webgl", e), !this.ctx) throw new t.Utils.Error("unable to create a webgl context. Try using another renderer.");
        r = h.shaders.create(i, h.shaders.vertex, h.shaders.types.vertex), n = h.shaders.create(i, h.shaders.fragment, h.shaders.types.fragment), this.program = h.program.create(i, [r, n]), i.useProgram(this.program), this.program.position = i.getAttribLocation(this.program, "a_position"), this.program.matrix = i.getUniformLocation(this.program, "u_matrix"), this.program.rect = i.getUniformLocation(this.program, "u_rect");
        var a = i.createBuffer();
        i.bindBuffer(i.ARRAY_BUFFER, a), i.vertexAttribPointer(this.program.position, 2, i.FLOAT, !1, 0, 0), i.enableVertexAttribArray(this.program.position), i.bufferData(i.ARRAY_BUFFER, new t.Array([0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1]), i.STATIC_DRAW), i.enable(i.BLEND), i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !0), i.blendEquation(i.FUNC_ADD), i.blendFunc(i.ONE, i.ONE_MINUS_SRC_ALPHA)
    };
    l.extend(c, {
        Utils: h
    }), l.extend(c.prototype, t.Utils.Events, {
        constructor: c,
        setSize: function(e, i, r) {
            this.width = e, this.height = i, this.ratio = l.isUndefined(r) ? a(this.ctx) : r, this.domElement.width = e * this.ratio, this.domElement.height = i * this.ratio, l.isObject(this.domElement.style) && l.extend(this.domElement.style, {
                width: e + "px",
                height: i + "px"
            }), this._renderer.matrix[0] = this._renderer.matrix[4] = this._renderer.scale = this.ratio, this._flagMatrix = !0, this.ctx.viewport(0, 0, e * this.ratio, i * this.ratio);
            var s = this.ctx.getUniformLocation(this.program, "u_resolution");
            return this.ctx.uniform2f(s, e * this.ratio, i * this.ratio), this.trigger(t.Events.resize, e, i, r)
        },
        render: function() {
            var t = this.ctx;
            return this.overdraw || t.clear(t.COLOR_BUFFER_BIT), h.group.render.call(this.scene, t, this.program), this._flagMatrix = !1, this
        }
    })
}(("undefined" != typeof global ? global : this || self || window).Two),
function(t) {
    var e = t.Utils,
        i = t.Shape = function() {
            this._renderer = {}, this._renderer.flagMatrix = e.bind(i.FlagMatrix, this), this.isShape = !0, this.id = t.Identifier + t.uniqueId(), this.classList = [], this.matrix = new t.Matrix, this.translation = new t.Vector, this.rotation = 0, this.scale = 1
        };
    e.extend(i, {
        FlagMatrix: function() {
            this._flagMatrix = !0
        },
        MakeObservable: function(r) {
            var s = {
                enumerable: !1,
                get: function() {
                    return this._translation
                },
                set: function(e) {
                    this._translation && this._translation.unbind(t.Events.change, this._renderer.flagMatrix), this._translation = e, this._translation.bind(t.Events.change, this._renderer.flagMatrix), i.FlagMatrix.call(this)
                }
            };
            Object.defineProperty(r, "translation", s), Object.defineProperty(r, "position", s), Object.defineProperty(r, "rotation", {
                enumerable: !0,
                get: function() {
                    return this._rotation
                },
                set: function(t) {
                    this._rotation = t, this._flagMatrix = !0
                }
            }), Object.defineProperty(r, "scale", {
                enumerable: !0,
                get: function() {
                    return this._scale
                },
                set: function(e) {
                    this._scale instanceof t.Vector && this._scale.unbind(t.Events.change, this._renderer.flagMatrix), this._scale = e, this._scale instanceof t.Vector && this._scale.bind(t.Events.change, this._renderer.flagMatrix), this._flagMatrix = !0, this._flagScale = !0
                }
            }), Object.defineProperty(r, "matrix", {
                enumerable: !0,
                get: function() {
                    return this._matrix
                },
                set: function(t) {
                    this._matrix = t, this._flagMatrix = !0
                }
            }), Object.defineProperty(r, "className", {
                enumerable: !0,
                get: function() {
                    return this._className
                },
                set: function(t) {
                    if (this._flagClassName = this._className !== t, this._flagClassName) {
                        for (var i = this._className.split(/\s+?/), r = t.split(/\s+?/), s = 0; s < i.length; s++) {
                            var n = i[s],
                                a = e.indexOf(this.classList, n);
                            a >= 0 && this.classList.splice(a, 1)
                        }
                        this.classList = this.classList.concat(r)
                    }
                    this._className = t
                }
            })
        }
    }), e.extend(i.prototype, t.Utils.Events, {
        _flagMatrix: !0,
        _flagScale: !1,
        _flagClassName: !1,
        _translation: null,
        _rotation: 0,
        _scale: 1,
        _className: "",
        constructor: i,
        addTo: function(t) {
            return t.add(this), this
        },
        clone: function(t) {
            var e = new i;
            return e.translation.copy(this.translation), e.rotation = this.rotation, e.scale = this.scale, this.matrix.manual && e.matrix.copy(this.matrix), t && t.add(e), e._update()
        },
        _update: function(e) {
            return !this._matrix.manual && this._flagMatrix && (this._matrix.identity().translate(this.translation.x, this.translation.y), this._scale instanceof t.Vector ? this._matrix.scale(this._scale.x, this._scale.y) : this._matrix.scale(this._scale), this._matrix.rotate(this.rotation)), e && this.parent && this.parent._update && this.parent._update(), this
        },
        flagReset: function() {
            return this._flagMatrix = this._flagScale = this._flagClassName = !1, this
        }
    }), i.MakeObservable(i.prototype)
}(("undefined" != typeof global ? global : this || self || window).Two),
function(t) {
    var e = Math.min,
        i = Math.max,
        r = (Math.round, Math.ceil),
        s = Math.floor,
        n = t.Utils.getComputedMatrix,
        a = {},
        o = t.Utils;
    o.each(t.Commands, (function(t, e) {
        a[e] = new RegExp(t)
    }));
    var l = t.Path = function(e, i, r, s) {
        t.Shape.call(this), this._renderer.type = "path", this._renderer.flagVertices = o.bind(l.FlagVertices, this), this._renderer.bindVertices = o.bind(l.BindVertices, this), this._renderer.unbindVertices = o.bind(l.UnbindVertices, this), this._renderer.flagFill = o.bind(l.FlagFill, this), this._renderer.flagStroke = o.bind(l.FlagStroke, this), this._renderer.vertices = [], this._renderer.collection = [], this._closed = !!i, this._curved = !!r, this.beginning = 0, this.ending = 1, this.fill = "#fff", this.stroke = "#000", this.linewidth = 1, this.opacity = 1, this.className = "", this.visible = !0, this.cap = "butt", this.join = "miter", this.miter = 4, this.vertices = e, this.automatic = !s, this.dashes = [], this.dashes.offset = 0
    };

    function h(t, e) {
        if (0 === e || 1 === e) return !0;
        for (var i = t._length * e, r = 0, s = 0; s < t._lengths.length; s++) {
            var n = t._lengths[s];
            if (r >= i) return i - r >= 0;
            r += n
        }
        return !1
    }

    function c(t, e) {
        var i = t._length;
        if (e <= 0) return 0;
        if (e >= i) return t._lengths.length - 1;
        for (var r = 0, s = 0; r < t._lengths.length; r++) {
            if (s + t._lengths[r] >= e) return e -= s, Math.max(r - 1, 0) + e / t._lengths[r];
            s += t._lengths[r]
        }
        return -1
    }

    function d(e, i, r) {
        var s, n, a, o, l, h, c, d, f = i.controls && i.controls.right,
            u = e.controls && e.controls.left;
        return s = i.x, l = i.y, n = (f || i).x, h = (f || i).y, a = (u || e).x, c = (u || e).y, o = e.x, d = e.y, f && i._relative && (n += i.x, h += i.y), u && e._relative && (a += e.x, c += e.y), t.Utils.getCurveLength(s, l, n, h, a, c, o, d, r)
    }

    function f(e, i, r) {
        var s, n, a, o, l, h, c, d, f = i.controls && i.controls.right,
            u = e.controls && e.controls.left;
        return s = i.x, l = i.y, n = (f || i).x, h = (f || i).y, a = (u || e).x, c = (u || e).y, o = e.x, d = e.y, f && i._relative && (n += i.x, h += i.y), u && e._relative && (a += e.x, c += e.y), t.Utils.subdivide(s, l, n, h, a, c, o, d, r)
    }
    o.extend(l, {
        Properties: ["fill", "stroke", "linewidth", "opacity", "visible", "cap", "join", "miter", "closed", "curved", "automatic", "beginning", "ending"],
        Utils: {
            getCurveLength: d
        },
        FlagVertices: function() {
            this._flagVertices = !0, this._flagLength = !0, this.parent && (this.parent._flagLength = !0)
        },
        BindVertices: function(e) {
            for (var i = e.length; i--;) e[i].bind(t.Events.change, this._renderer.flagVertices);
            this._renderer.flagVertices()
        },
        UnbindVertices: function(e) {
            for (var i = e.length; i--;) e[i].unbind(t.Events.change, this._renderer.flagVertices);
            this._renderer.flagVertices()
        },
        FlagFill: function() {
            this._flagFill = !0
        },
        FlagStroke: function() {
            this._flagStroke = !0
        },
        MakeObservable: function(e) {
            t.Shape.MakeObservable(e), o.each(l.Properties.slice(2, 8), t.Utils.defineProperty, e), Object.defineProperty(e, "fill", {
                enumerable: !0,
                get: function() {
                    return this._fill
                },
                set: function(e) {
                    (this._fill instanceof t.Gradient || this._fill instanceof t.LinearGradient || this._fill instanceof t.RadialGradient || this._fill instanceof t.Texture) && this._fill.unbind(t.Events.change, this._renderer.flagFill), this._fill = e, this._flagFill = !0, (this._fill instanceof t.Gradient || this._fill instanceof t.LinearGradient || this._fill instanceof t.RadialGradient || this._fill instanceof t.Texture) && this._fill.bind(t.Events.change, this._renderer.flagFill)
                }
            }), Object.defineProperty(e, "stroke", {
                enumerable: !0,
                get: function() {
                    return this._stroke
                },
                set: function(e) {
                    (this._stroke instanceof t.Gradient || this._stroke instanceof t.LinearGradient || this._stroke instanceof t.RadialGradient || this._stroke instanceof t.Texture) && this._stroke.unbind(t.Events.change, this._renderer.flagStroke), this._stroke = e, this._flagStroke = !0, (this._stroke instanceof t.Gradient || this._stroke instanceof t.LinearGradient || this._stroke instanceof t.RadialGradient || this._stroke instanceof t.Texture) && this._stroke.bind(t.Events.change, this._renderer.flagStroke)
                }
            }), Object.defineProperty(e, "length", {
                get: function() {
                    return this._flagLength && this._updateLength(), this._length
                }
            }), Object.defineProperty(e, "closed", {
                enumerable: !0,
                get: function() {
                    return this._closed
                },
                set: function(t) {
                    this._closed = !!t, this._flagVertices = !0
                }
            }), Object.defineProperty(e, "curved", {
                enumerable: !0,
                get: function() {
                    return this._curved
                },
                set: function(t) {
                    this._curved = !!t, this._flagVertices = !0
                }
            }), Object.defineProperty(e, "automatic", {
                enumerable: !0,
                get: function() {
                    return this._automatic
                },
                set: function(t) {
                    if (t !== this._automatic) {
                        this._automatic = !!t;
                        var e = this._automatic ? "ignore" : "listen";
                        o.each(this.vertices, (function(t) {
                            t[e]()
                        }))
                    }
                }
            }), Object.defineProperty(e, "beginning", {
                enumerable: !0,
                get: function() {
                    return this._beginning
                },
                set: function(t) {
                    this._beginning = t, this._flagVertices = !0
                }
            }), Object.defineProperty(e, "ending", {
                enumerable: !0,
                get: function() {
                    return this._ending
                },
                set: function(t) {
                    this._ending = t, this._flagVertices = !0
                }
            }), Object.defineProperty(e, "vertices", {
                enumerable: !0,
                get: function() {
                    return this._collection
                },
                set: function(e) {
                    this._renderer.flagVertices;
                    var i = this._renderer.bindVertices,
                        r = this._renderer.unbindVertices;
                    this._collection && this._collection.unbind(t.Events.insert, i).unbind(t.Events.remove, r), e instanceof t.Utils.Collection ? this._collection = e : this._collection = new t.Utils.Collection(e || []), this._collection.bind(t.Events.insert, i).bind(t.Events.remove, r), i(this._collection)
                }
            }), Object.defineProperty(e, "clip", {
                enumerable: !0,
                get: function() {
                    return this._clip
                },
                set: function(t) {
                    this._clip = t, this._flagClip = !0
                }
            }), Object.defineProperty(e, "dashes", {
                enumerable: !0,
                get: function() {
                    return this._dashes
                },
                set: function(t) {
                    o.isNumber(t.offset) || (t.offset = this._dashes.offset || 0), this._dashes = t
                }
            })
        }
    }), o.extend(l.prototype, t.Shape.prototype, {
        _flagVertices: !0,
        _flagLength: !0,
        _flagFill: !0,
        _flagStroke: !0,
        _flagLinewidth: !0,
        _flagOpacity: !0,
        _flagVisible: !0,
        _flagCap: !0,
        _flagJoin: !0,
        _flagMiter: !0,
        _flagClip: !1,
        _length: 0,
        _fill: "#fff",
        _stroke: "#000",
        _linewidth: 1,
        _opacity: 1,
        _visible: !0,
        _cap: "round",
        _join: "round",
        _miter: 4,
        _closed: !0,
        _curved: !1,
        _automatic: !0,
        _beginning: 0,
        _ending: 1,
        _clip: !1,
        _dashes: [],
        constructor: l,
        clone: function(t) {
            for (var e = new l, i = 0; i < this.vertices.length; i++) e.vertices.push(this.vertices[i].clone());
            for (var r = 0; r < l.Properties.length; r++) {
                var s = l.Properties[r];
                e[s] = this[s]
            }
            return e.className = this.className, e.translation.copy(this.translation), e.rotation = this.rotation, e.scale = this.scale, this.matrix.manual && e.matrix.copy(this.matrix), t && t.add(e), e._update()
        },
        toObject: function() {
            var e = {
                vertices: o.map(this.vertices, (function(t) {
                    return t.toObject()
                }))
            };
            return o.each(t.Shape.Properties, (function(t) {
                e[t] = this[t]
            }), this), e.className = this.className, e.translation = this.translation.toObject(), e.rotation = this.rotation, e.scale = this.scale instanceof t.Vector ? this.scale.toObject() : this.scale, this.matrix.manual && (e.matrix = this.matrix.toObject()), e
        },
        noFill: function() {
            return this.fill = "transparent", this
        },
        noStroke: function() {
            return this.stroke = void 0, this
        },
        corner: function() {
            var t = this.getBoundingClientRect(!0);
            return t.centroid = {
                x: t.left + t.width / 2,
                y: t.top + t.height / 2
            }, o.each(this.vertices, (function(e) {
                e.subSelf(t.centroid), e.x += t.width / 2, e.y += t.height / 2
            })), this
        },
        center: function() {
            var t = this.getBoundingClientRect(!0);
            return t.centroid = {
                x: t.left + t.width / 2 - this.translation.x,
                y: t.top + t.height / 2 - this.translation.y
            }, o.each(this.vertices, (function(e) {
                e.subSelf(t.centroid)
            })), this
        },
        remove: function() {
            return this.parent ? (this.parent.remove(this), this) : this
        },
        getBoundingClientRect: function(r) {
            var s, a, o, l, h, c, d, f, u = 1 / 0,
                _ = -1 / 0,
                g = 1 / 0,
                p = -1 / 0;
            if (this._update(!0), s = r ? this._matrix : n(this), a = this.linewidth / 2, (o = this._renderer.vertices.length) <= 0) return {
                width: 0,
                height: 0
            };
            for (l = 0; l < o; l++)
                if (f = this._renderer.vertices[l], (h = this._renderer.vertices[(l + o - 1) % o]).controls && f.controls) {
                    c = h.relative ? s.multiply(h.controls.right.x + h.x, h.controls.right.y + h.y, 1) : s.multiply(h.controls.right.x, h.controls.right.y, 1), h = s.multiply(h.x, h.y, 1), d = f.relative ? s.multiply(f.controls.left.x + f.x, f.controls.left.y + f.y, 1) : s.multiply(f.controls.left.x, f.controls.left.y, 1), f = s.multiply(f.x, f.y, 1);
                    var m = t.Utils.getCurveBoundingBox(h.x, h.y, c.x, c.y, d.x, d.y, f.x, f.y);
                    g = e(m.min.y - a, g), u = e(m.min.x - a, u), _ = i(m.max.x + a, _), p = i(m.max.y + a, p)
                } else l <= 1 && (h = s.multiply(h.x, h.y, 1), g = e(h.y - a, g), u = e(h.x - a, u), _ = i(h.x + a, _), p = i(h.y + a, p)), f = s.multiply(f.x, f.y, 1), g = e(f.y - a, g), u = e(f.x - a, u), _ = i(f.x + a, _), p = i(f.y + a, p);
            return {
                top: g,
                left: u,
                right: _,
                bottom: p,
                width: _ - u,
                height: p - g
            }
        },
        getPointAt: function(e, i) {
            for (var r, s, n, a, l, h, c, d, f, u, _, g, p, m, v, y = this.length * Math.min(Math.max(e, 0), 1), x = this.vertices.length, b = x - 1, w = null, k = null, S = 0, A = this._lengths.length, E = 0; S < A; S++) {
                if (E + this._lengths[S] >= y) {
                    this._closed ? (r = t.Utils.mod(S, x), s = t.Utils.mod(S - 1, x), 0 === S && (r = s, s = S)) : (r = S, s = Math.min(Math.max(S - 1, 0), b)), w = this.vertices[r], k = this.vertices[s], y -= E, e = 0 !== this._lengths[S] ? y / this._lengths[S] : 0;
                    break
                }
                E += this._lengths[S]
            }
            if (o.isNull(w) || o.isNull(k)) return null;
            if (!w) return k;
            if (!k) return w;
            v = k.controls && k.controls.right, m = w.controls && w.controls.left, l = k.x, u = k.y, h = (v || k).x, _ = (v || k).y, c = (m || w).x, g = (m || w).y, d = w.x, p = w.y, v && k.relative && (h += k.x, _ += k.y), m && w.relative && (c += w.x, g += w.y), a = t.Utils.getComponentOnCubicBezier(e, l, h, c, d), f = t.Utils.getComponentOnCubicBezier(e, u, _, g, p);
            var C = t.Utils.lerp(l, h, e),
                R = t.Utils.lerp(u, _, e),
                F = t.Utils.lerp(h, c, e),
                M = t.Utils.lerp(_, g, e),
                O = t.Utils.lerp(c, d, e),
                P = t.Utils.lerp(g, p, e),
                U = t.Utils.lerp(C, F, e),
                T = t.Utils.lerp(R, M, e),
                N = t.Utils.lerp(F, O, e),
                L = t.Utils.lerp(M, P, e);
            return o.isObject(i) ? (i.x = a, i.y = f, o.isObject(i.controls) || t.Anchor.AppendCurveProperties(i), i.controls.left.x = U, i.controls.left.y = T, i.controls.right.x = N, i.controls.right.y = L, o.isBoolean(i.relative) && !i.relative || (i.controls.left.x -= a, i.controls.left.y -= f, i.controls.right.x -= a, i.controls.right.y -= f), i.t = e, i) : ((n = new t.Anchor(a, f, U - a, T - f, N - a, L - f, this._curved ? t.Commands.curve : t.Commands.line)).t = e, n)
        },
        plot: function() {
            if (this.curved) return t.Utils.getCurveFromPoints(this._collection, this.closed), this;
            for (var e = 0; e < this._collection.length; e++) this._collection[e].command = 0 === e ? t.Commands.move : t.Commands.line;
            return this
        },
        subdivide: function(e) {
            this._update();
            var i = this.vertices.length - 1,
                r = this.vertices[i],
                s = this._closed || this.vertices[i]._command === t.Commands.close,
                n = [];
            return o.each(this.vertices, (function(a, l) {
                if (l <= 0 && !s) r = a;
                else {
                    if (a.command === t.Commands.move) return n.push(new t.Anchor(r.x, r.y)), l > 0 && (n[n.length - 1].command = t.Commands.line), void(r = a);
                    var h = f(a, r, e);
                    n = n.concat(h), o.each(h, (function(e, i) {
                        i <= 0 && r.command === t.Commands.move ? e.command = t.Commands.move : e.command = t.Commands.line
                    })), l >= i && (this._closed && this._automatic ? (h = f(a, r = a, e), n = n.concat(h), o.each(h, (function(e, i) {
                        i <= 0 && r.command === t.Commands.move ? e.command = t.Commands.move : e.command = t.Commands.line
                    }))) : s && n.push(new t.Anchor(a.x, a.y)), n[n.length - 1].command = s ? t.Commands.close : t.Commands.line), r = a
                }
            }), this), this._automatic = !1, this._curved = !1, this.vertices = n, this
        },
        _updateLength: function(e, i) {
            i || this._update();
            var r = this.vertices.length,
                s = r - 1,
                n = this.vertices[s],
                a = 0;
            return o.isUndefined(this._lengths) && (this._lengths = []), o.each(this.vertices, (function(i, r) {
                if (r <= 0 || i.command === t.Commands.move) return n = i, void(this._lengths[r] = 0);
                this._lengths[r] = d(i, n, e), a += this._lengths[r], n = i
            }), this), this._length = a, this._flagLength = !1, this
        },
        _update: function() {
            if (this._flagVertices) {
                this._automatic && this.plot(), this._flagLength && this._updateLength(void 0, !0);
                var e, i, n, a, o, l = this._collection.length,
                    d = this._closed,
                    f = Math.min(this._beginning, this._ending),
                    u = Math.max(this._beginning, this._ending),
                    _ = c(this, f * this._length),
                    g = c(this, u * this._length),
                    p = r(_),
                    m = s(g);
                this._renderer.vertices.length = 0;
                for (var v = 0; v < l; v++) this._renderer.collection.length <= v && this._renderer.collection.push(new t.Anchor), v > m && !i ? ((o = this._renderer.collection[v]).copy(this._collection[v]), this.getPointAt(u, o), o.command = this._renderer.collection[v].command, this._renderer.vertices.push(o), i = o, (n = this._collection[v - 1]) && n.controls && (o.controls.right.clear(), this._renderer.collection[v - 1].controls.right.clear().lerp(n.controls.right, o.t))) : v >= p && v <= m && (o = this._renderer.collection[v].copy(this._collection[v]), this._renderer.vertices.push(o), v === m && h(this, u) ? (i = o, !d && i.controls && i.controls.right.clear()) : v === p && h(this, f) && ((e = o).command = t.Commands.move, !d && e.controls && e.controls.left.clear()));
                p > 0 && !e && (v = p - 1, (o = this._renderer.collection[v]).copy(this._collection[v]), this.getPointAt(f, o), o.command = t.Commands.move, this._renderer.vertices.unshift(o), e = o, (a = this._collection[v + 1]) && a.controls && (o.controls.left.clear(), this._renderer.collection[v + 1].controls.left.copy(a.controls.left).lerp(t.Vector.zero, o.t)))
            }
            return t.Shape.prototype._update.apply(this, arguments), this
        },
        flagReset: function() {
            return this._flagVertices = this._flagFill = this._flagStroke = this._flagLinewidth = this._flagOpacity = this._flagVisible = this._flagCap = this._flagJoin = this._flagMiter = this._flagClip = !1, t.Shape.prototype.flagReset.call(this), this
        }
    }), l.MakeObservable(l.prototype)
}(("undefined" != typeof global ? global : this || self || window).Two),
function(t) {
    var e = t.Path,
        i = t.Utils,
        r = t.Line = function(i, r, s, n) {
            e.call(this, [new t.Anchor(i, r), new t.Anchor(s, n)]), this.vertices[0].command = t.Commands.move, this.vertices[1].command = t.Commands.line, this.automatic = !1
        };
    i.extend(r.prototype, e.prototype), r.prototype.constructor = r, e.MakeObservable(r.prototype)
}(("undefined" != typeof global ? global : this || self || window).Two),
function(t) {
    var e = t.Path,
        i = t.Utils,
        r = t.Rectangle = function(i, r, s, n) {
            e.call(this, [new t.Anchor, new t.Anchor, new t.Anchor, new t.Anchor], !0, !1, !0), this.width = s, this.height = n, this.origin = new t.Vector, this.translation.set(i, r), this._update()
        };
    i.extend(r, {
        Properties: ["width", "height"],
        MakeObservable: function(s) {
            e.MakeObservable(s), i.each(r.Properties, t.Utils.defineProperty, s), Object.defineProperty(s, "origin", {
                enumerable: !0,
                get: function() {
                    return this._origin
                },
                set: function(e) {
                    this._origin && this._origin.unbind(t.Events.change, this._renderer.flagVertices), this._origin = e, this._origin.bind(t.Events.change, this._renderer.flagVertices), this._renderer.flagVertices()
                }
            })
        }
    }), i.extend(r.prototype, e.prototype, {
        _flagWidth: 0,
        _flagHeight: 0,
        _width: 0,
        _height: 0,
        _origin: null,
        constructor: r,
        _update: function() {
            if (this._flagWidth || this._flagHeight) {
                var i = this._width / 2,
                    r = this._height / 2;
                this.vertices[0].set(-i, -r).add(this._origin).command = t.Commands.move, this.vertices[1].set(i, -r).add(this._origin).command = t.Commands.line, this.vertices[2].set(i, r).add(this._origin).command = t.Commands.line, this.vertices[3].set(-i, r).add(this._origin).command = t.Commands.line, this.vertices[4] && (this.vertices[4].set(-i, -r).add(this._origin).command = t.Commands.line)
            }
            return e.prototype._update.call(this), this
        },
        flagReset: function() {
            return this._flagWidth = this._flagHeight = !1, e.prototype.flagReset.call(this), this
        },
        clone: function(e) {
            var s = new r(0, 0, this.width, this.height);
            return s.translation.copy(this.translation), s.rotation = this.rotation, s.scale = this.scale, this.matrix.manual && s.matrix.copy(this.matrix), i.each(t.Path.Properties, (function(t) {
                s[t] = this[t]
            }), this), e && e.add(s), s
        },
        toObject: function() {
            var t = e.prototype.toObject.call(this);
            return t.width = this.width, t.height = this.height, t.origin = this.origin.toObject(), t
        }
    }), r.MakeObservable(r.prototype)
}(("undefined" != typeof global ? global : this || self || window).Two),
function(t) {
    var e = t.Path,
        i = 2 * Math.PI,
        r = Math.PI / 2,
        s = Math.cos,
        n = Math.sin,
        a = t.Utils,
        o = t.Ellipse = function(i, r, s, n, o) {
            a.isNumber(n) || (n = s);
            var l = o ? Math.max(o, 2) : 4,
                h = a.map(a.range(l), (function(e) {
                    return new t.Anchor
                }), this);
            e.call(this, h, !0, !0, !0), this.width = 2 * s, this.height = 2 * n, this._update(), this.translation.set(i, r)
        };
    a.extend(o, {
        Properties: ["width", "height"],
        MakeObservable: function(i) {
            e.MakeObservable(i), a.each(o.Properties, t.Utils.defineProperty, i)
        }
    }), a.extend(o.prototype, e.prototype, {
        _flagWidth: !1,
        _flagHeight: !1,
        _width: 0,
        _height: 0,
        constructor: o,
        _update: function() {
            if (this._flagWidth || this._flagHeight)
                for (var a = 4 / 3 * Math.tan(Math.PI / (2 * this.vertices.length)), o = this._width / 2, l = this._height / 2, h = 0, c = this.vertices.length; h < c; h++) {
                    var d = h / c * i,
                        f = o * s(d),
                        u = l * n(d),
                        _ = o * a * s(d - r),
                        g = l * a * n(d - r),
                        p = o * a * s(d + r),
                        m = l * a * n(d + r),
                        v = this.vertices[h];
                    v.command = t.Commands.curve, v.set(f, u), v.controls.left.set(_, g), v.controls.right.set(p, m)
                }
            return e.prototype._update.call(this), this
        },
        flagReset: function() {
            return this._flagWidth = this._flagHeight = !1, e.prototype.flagReset.call(this), this
        },
        clone: function(e) {
            var i = this.width / 2,
                r = this.height / 2,
                s = this.vertices.length,
                n = new o(0, 0, i, r, s);
            return n.translation.copy(this.translation), n.rotation = this.rotation, n.scale = this.scale, this.matrix.manual && n.matrix.copy(this.matrix), a.each(t.Path.Properties, (function(t) {
                n[t] = this[t]
            }), this), e && e.add(n), n
        },
        toObject: function() {
            var t = e.prototype.toObject.call(this);
            return a.each(o.Properties, (function(e) {
                t[e] = this[e]
            }), this), t
        }
    }), o.MakeObservable(o.prototype)
}(("undefined" != typeof global ? global : this || self || window).Two),
function(t) {
    var e = t.Path,
        i = 2 * Math.PI,
        r = Math.PI / 2,
        s = Math.cos,
        n = Math.sin,
        a = t.Utils,
        o = t.Circle = function(i, r, s, n) {
            var o = n ? Math.max(n, 2) : 4,
                l = a.map(a.range(o), (function(e) {
                    return new t.Anchor
                }), this);
            e.call(this, l, !0, !0, !0), this.radius = s, this._update(), a.isNumber(i) && (this.translation.x = i), a.isNumber(r) && (this.translation.y = r)
        };
    a.extend(o, {
        Properties: ["radius"],
        MakeObservable: function(i) {
            e.MakeObservable(i), a.each(o.Properties, t.Utils.defineProperty, i)
        }
    }), a.extend(o.prototype, e.prototype, {
        _flagRadius: !1,
        _radius: 0,
        constructor: o,
        _update: function() {
            if (this._flagRadius)
                for (var a = 4 / 3 * Math.tan(Math.PI / (2 * this.vertices.length)), o = this._radius, l = o * a, h = 0, c = this.vertices.length; h < c; h++) {
                    var d = h / c * i,
                        f = o * s(d),
                        u = o * n(d),
                        _ = l * s(d - r),
                        g = l * n(d - r),
                        p = l * s(d + r),
                        m = l * n(d + r),
                        v = this.vertices[h];
                    v.command = t.Commands.curve, v.set(f, u), v.controls.left.set(_, g), v.controls.right.set(p, m)
                }
            return e.prototype._update.call(this), this
        },
        flagReset: function() {
            return this._flagRadius = !1, e.prototype.flagReset.call(this), this
        },
        clone: function(e) {
            var i = new o(0, 0, this.radius, this.vertices.length);
            return i.translation.copy(this.translation), i.rotation = this.rotation, i.scale = this.scale, this.matrix.manual && i.matrix.copy(this.matrix), a.each(t.Path.Properties, (function(t) {
                i[t] = this[t]
            }), this), e && e.add(i), i
        },
        toObject: function() {
            var t = e.prototype.toObject.call(this);
            return a.each(o.Properties, (function(e) {
                t[e] = this[e]
            }), this), t
        }
    }), o.MakeObservable(o.prototype)
}(("undefined" != typeof global ? global : this || self || window).Two),
function(t) {
    var e = t.Path,
        i = 2 * Math.PI,
        r = Math.cos,
        s = Math.sin,
        n = t.Utils,
        a = t.Polygon = function(t, i, r, s) {
            s = Math.max(s || 0, 3), e.call(this), this.closed = !0, this.automatic = !1, this.width = 2 * r, this.height = 2 * r, this.sides = s, this._update(), this.translation.set(t, i)
        };
    n.extend(a, {
        Properties: ["width", "height", "sides"],
        MakeObservable: function(i) {
            e.MakeObservable(i), n.each(a.Properties, t.Utils.defineProperty, i)
        }
    }), n.extend(a.prototype, e.prototype, {
        _flagWidth: !1,
        _flagHeight: !1,
        _flagSides: !1,
        _width: 0,
        _height: 0,
        _sides: 0,
        constructor: a,
        _update: function() {
            if (this._flagWidth || this._flagHeight || this._flagSides) {
                var n = this._sides,
                    a = n + 1,
                    o = this.vertices.length;
                o > n && (this.vertices.splice(n - 1, o - n), o = n);
                for (var l = 0; l < a; l++) {
                    var h = i * ((l + .5) / n) + Math.PI / 2,
                        c = this._width * r(h) / 2,
                        d = this._height * s(h) / 2;
                    l >= o ? this.vertices.push(new t.Anchor(c, d)) : this.vertices[l].set(c, d), this.vertices[l].command = 0 === l ? t.Commands.move : t.Commands.line
                }
            }
            return e.prototype._update.call(this), this
        },
        flagReset: function() {
            return this._flagWidth = this._flagHeight = this._flagSides = !1, e.prototype.flagReset.call(this), this
        },
        clone: function(e) {
            var i = new a(0, 0, this.radius, this.sides);
            return i.translation.copy(this.translation), i.rotation = this.rotation, i.scale = this.scale, this.matrix.manual && i.matrix.copy(this.matrix), n.each(t.Path.Properties, (function(t) {
                i[t] = this[t]
            }), this), e && e.add(i), i
        },
        toObject: function() {
            var t = e.prototype.toObject.call(this);
            return n.each(a.Properties, (function(e) {
                t[e] = this[e]
            }), this), t
        }
    }), a.MakeObservable(a.prototype)
}(("undefined" != typeof global ? global : this || self || window).Two),
function(t) {
    var e = t.Path,
        i = (Math.PI, 2 * Math.PI),
        r = Math.PI / 2,
        s = (Math.cos, Math.sin, Math.abs, t.Utils),
        n = t.Utils.mod,
        a = t.ArcSegment = function(i, r, n, a, o, l, h) {
            var c = h || 3 * t.Resolution,
                d = s.map(s.range(c), (function() {
                    return new t.Anchor
                }));
            e.call(this, d, !0, !1, !0), this.innerRadius = n, this.outerRadius = a, this.startAngle = o, this.endAngle = l, this._update(), s.isNumber(i) && (this.translation.x = i), s.isNumber(r) && (this.translation.y = r)
        };
    s.extend(a, {
        Properties: ["startAngle", "endAngle", "innerRadius", "outerRadius"],
        MakeObservable: function(i) {
            e.MakeObservable(i), s.each(a.Properties, t.Utils.defineProperty, i)
        }
    }), s.extend(a.prototype, e.prototype, {
        _flagStartAngle: !1,
        _flagEndAngle: !1,
        _flagInnerRadius: !1,
        _flagOuterRadius: !1,
        _startAngle: 0,
        _endAngle: i,
        _innerRadius: 0,
        _outerRadius: 0,
        constructor: a,
        _update: function() {
            if (this._flagStartAngle || this._flagEndAngle || this._flagInnerRadius || this._flagOuterRadius) {
                var s, a = this._startAngle,
                    o = this._endAngle,
                    l = this._innerRadius,
                    h = this._outerRadius,
                    c = n(a, i) === n(o, i),
                    d = l > 0,
                    f = this.vertices,
                    u = d ? f.length / 2 : f.length,
                    _ = 0;
                c ? u-- : d || (u -= 2);
                for (var g = 0, p = u - 1; g < u; g++) {
                    var m = g / p,
                        v = f[_],
                        y = m * (o - a) + a,
                        x = (o - a) / u,
                        b = h * Math.cos(y),
                        w = h * Math.sin(y);
                    switch (g) {
                        case 0:
                            s = t.Commands.move;
                            break;
                        default:
                            s = t.Commands.curve
                    }
                    if (v.command = s, v.x = b, v.y = w, v.controls.left.clear(), v.controls.right.clear(), v.command === t.Commands.curve) {
                        var k = h * x / Math.PI;
                        v.controls.left.x = k * Math.cos(y - r), v.controls.left.y = k * Math.sin(y - r), v.controls.right.x = k * Math.cos(y + r), v.controls.right.y = k * Math.sin(y + r), 1 === g && v.controls.left.multiplyScalar(2), g === p && v.controls.right.multiplyScalar(2)
                    }
                    _++
                }
                if (d) {
                    for (c ? (f[_].command = t.Commands.close, _++) : p = --u - 1, g = 0; g < u; g++) m = g / p, v = f[_], y = (1 - m) * (o - a) + a, x = (o - a) / u, b = l * Math.cos(y), w = l * Math.sin(y), s = t.Commands.curve, g <= 0 && (s = c ? t.Commands.move : t.Commands.line), v.command = s, v.x = b, v.y = w, v.controls.left.clear(), v.controls.right.clear(), v.command === t.Commands.curve && (k = l * x / Math.PI, v.controls.left.x = k * Math.cos(y + r), v.controls.left.y = k * Math.sin(y + r), v.controls.right.x = k * Math.cos(y - r), v.controls.right.y = k * Math.sin(y - r), 1 === g && v.controls.left.multiplyScalar(2), g === p && v.controls.right.multiplyScalar(2)), _++;
                    f[_].copy(f[0]), f[_].command = t.Commands.line
                } else c || (f[_].command = t.Commands.line, f[_].x = 0, f[_].y = 0, f[++_].copy(f[0]), f[_].command = t.Commands.line)
            }
            return e.prototype._update.call(this), this
        },
        flagReset: function() {
            return e.prototype.flagReset.call(this), this._flagStartAngle = this._flagEndAngle = this._flagInnerRadius = this._flagOuterRadius = !1, this
        },
        clone: function(e) {
            var i = this.innerRadius,
                r = this.outerradius,
                n = this.startAngle,
                o = this.endAngle,
                l = this.vertices.length,
                h = new a(0, 0, i, r, n, o, l);
            return h.translation.copy(this.translation), h.rotation = this.rotation, h.scale = this.scale, this.matrix.manual && h.matrix.copy(this.matrix), s.each(t.Path.Properties, (function(t) {
                h[t] = this[t]
            }), this), e && e.add(h), h
        },
        toObject: function() {
            var t = e.prototype.toObject.call(this);
            return s.each(a.Properties, (function(e) {
                t[e] = this[e]
            }), this), t
        }
    }), a.MakeObservable(a.prototype)
}(("undefined" != typeof global ? global : this || self || window).Two),
function(t) {
    var e = t.Path,
        i = 2 * Math.PI,
        r = Math.cos,
        s = Math.sin,
        n = t.Utils,
        a = t.Star = function(t, i, r, s, a) {
            arguments.length <= 3 && (r = (s = r) / 2), (!n.isNumber(a) || a <= 0) && (a = 5);
            e.call(this), this.closed = !0, this.automatic = !1, this.innerRadius = r, this.outerRadius = s, this.sides = a, this._update(), this.translation.set(t, i)
        };
    n.extend(a, {
        Properties: ["innerRadius", "outerRadius", "sides"],
        MakeObservable: function(i) {
            e.MakeObservable(i), n.each(a.Properties, t.Utils.defineProperty, i)
        }
    }), n.extend(a.prototype, e.prototype, {
        _flagInnerRadius: !1,
        _flagOuterRadius: !1,
        _flagSides: !1,
        _innerRadius: 0,
        _outerRadius: 0,
        _sides: 0,
        constructor: a,
        _update: function() {
            if (this._flagInnerRadius || this._flagOuterRadius || this._flagSides) {
                var n = 2 * this._sides,
                    a = n + 1,
                    o = this.vertices.length;
                o > n && (this.vertices.splice(n - 1, o - n), o = n);
                for (var l = 0; l < a; l++) {
                    var h = i * ((l + .5) / n),
                        c = (l % 2 ? this._outerRadius : this._innerRadius) / 2,
                        d = c * r(h),
                        f = c * s(h);
                    l >= o ? this.vertices.push(new t.Anchor(d, f)) : this.vertices[l].set(d, f), this.vertices[l].command = 0 === l ? t.Commands.move : t.Commands.line
                }
            }
            return e.prototype._update.call(this), this
        },
        flagReset: function() {
            return this._flagInnerRadius = this._flagOuterRadius = this._flagSides = !1, e.prototype.flagReset.call(this), this
        },
        clone: function(e) {
            var i = this.innerRadius,
                r = this.outerRadius,
                s = this.sides,
                o = new a(0, 0, i, r, s);
            return o.translation.copy(this.translation), o.rotation = this.rotation, o.scale = this.scale, this.matrix.manual && o.matrix.copy(this.matrix), n.each(t.Path.Properties, (function(t) {
                o[t] = this[t]
            }), this), e && e.add(o), o
        },
        toObject: function() {
            var t = e.prototype.toObject.call(this);
            return n.each(a.Properties, (function(e) {
                t[e] = this[e]
            }), this), t
        }
    }), a.MakeObservable(a.prototype)
}(("undefined" != typeof global ? global : this || self || window).Two),
function(t) {
    var e = t.Path,
        i = t.Utils,
        r = t.RoundedRectangle = function(s, n, a, o, l) {
            i.isUndefined(l) && (l = Math.floor(Math.min(a, o) / 12));
            var h = i.map(i.range(10), (function(e) {
                return new t.Anchor(0, 0, 0, 0, 0, 0, 0 === e ? t.Commands.move : t.Commands.curve)
            }));
            e.call(this, h), this.closed = !0, this.automatic = !1, this._renderer.flagRadius = i.bind(r.FlagRadius, this), this.width = a, this.height = o, this.radius = l, this._update(), this.translation.set(s, n)
        };
    i.extend(r, {
        Properties: ["width", "height"],
        FlagRadius: function() {
            this._flagRadius = !0
        },
        MakeObservable: function(s) {
            e.MakeObservable(s), i.each(r.Properties, t.Utils.defineProperty, s), Object.defineProperty(s, "radius", {
                enumerable: !0,
                get: function() {
                    return this._radius
                },
                set: function(e) {
                    this._radius instanceof t.Vector && this._radius.unbind(t.Events.change, this._renderer.flagRadius), this._radius = e, this._radius instanceof t.Vector && this._radius.bind(t.Events.change, this._renderer.flagRadius), this._flagRadius = !0
                }
            })
        }
    }), i.extend(r.prototype, e.prototype, {
        _flagWidth: !1,
        _flagHeight: !1,
        _flagRadius: !1,
        _width: 0,
        _height: 0,
        _radius: 0,
        constructor: r,
        _update: function() {
            if (this._flagWidth || this._flagHeight || this._flagRadius) {
                var i, r, s, n = this._width,
                    a = this._height;
                this._radius instanceof t.Vector ? (i = this._radius.x, r = this._radius.y) : (i = this._radius, r = this._radius);
                var o = n / 2,
                    l = a / 2;
                (s = this.vertices[0]).x = -(o - i), s.y = -l, (s = this.vertices[1]).x = o - i, s.y = -l, s.controls.left.clear(), s.controls.right.x = i, s.controls.right.y = 0, (s = this.vertices[2]).x = o, s.y = -(l - r), s.controls.right.clear(), s.controls.left.clear(), (s = this.vertices[3]).x = o, s.y = l - r, s.controls.left.clear(), s.controls.right.x = 0, s.controls.right.y = r, (s = this.vertices[4]).x = o - i, s.y = l, s.controls.right.clear(), s.controls.left.clear(), (s = this.vertices[5]).x = -(o - i), s.y = l, s.controls.left.clear(), s.controls.right.x = -i, s.controls.right.y = 0, (s = this.vertices[6]).x = -o, s.y = l - r, s.controls.left.clear(), s.controls.right.clear(), (s = this.vertices[7]).x = -o, s.y = -(l - r), s.controls.left.clear(), s.controls.right.x = 0, s.controls.right.y = -r, (s = this.vertices[8]).x = -(o - i), s.y = -l, s.controls.left.clear(), s.controls.right.clear(), (s = this.vertices[9]).copy(this.vertices[8])
            }
            return e.prototype._update.call(this), this
        },
        flagReset: function() {
            return this._flagWidth = this._flagHeight = this._flagRadius = !1, e.prototype.flagReset.call(this), this
        },
        clone: function(e) {
            var s = this.width,
                n = this.height,
                a = this.radius,
                o = new r(0, 0, s, n, a);
            return o.translation.copy(this.translation), o.rotation = this.rotation, o.scale = this.scale, this.matrix.manual && o.matrix.copy(this.matrix), i.each(t.Path.Properties, (function(t) {
                o[t] = this[t]
            }), this), e && e.add(o), o
        },
        toObject: function() {
            var t = e.prototype.toObject.call(this);
            return i.each(r.Properties, (function(e) {
                t[e] = this[e]
            }), this), t.radius = i.isNumber(this.radius) ? this.radius : this.radius.toObject(), t
        }
    }), r.MakeObservable(r.prototype)
}(("undefined" != typeof global ? global : this || self || window).Two),
function(t) {
    t.root;
    var e = t.Utils.getComputedMatrix,
        i = t.Utils,
        r = t.Text = function(e, r, s, n) {
            if (t.Shape.call(this), this._renderer.type = "text", this._renderer.flagFill = i.bind(t.Text.FlagFill, this), this._renderer.flagStroke = i.bind(t.Text.FlagStroke, this), this.value = e, i.isNumber(r) && (this.translation.x = r), i.isNumber(s) && (this.translation.y = s), this.dashes = [], this.dashes.offset = 0, !i.isObject(n)) return this;
            i.each(t.Text.Properties, (function(t) {
                t in n && (this[t] = n[t])
            }), this)
        };
    i.extend(t.Text, {
        Ratio: .6,
        Properties: ["value", "family", "size", "leading", "alignment", "linewidth", "style", "className", "weight", "decoration", "baseline", "opacity", "visible", "fill", "stroke"],
        FlagFill: function() {
            this._flagFill = !0
        },
        FlagStroke: function() {
            this._flagStroke = !0
        },
        MakeObservable: function(e) {
            t.Shape.MakeObservable(e), i.each(t.Text.Properties.slice(0, 13), t.Utils.defineProperty, e), Object.defineProperty(e, "fill", {
                enumerable: !0,
                get: function() {
                    return this._fill
                },
                set: function(e) {
                    (this._fill instanceof t.Gradient || this._fill instanceof t.LinearGradient || this._fill instanceof t.RadialGradient || this._fill instanceof t.Texture) && this._fill.unbind(t.Events.change, this._renderer.flagFill), this._fill = e, this._flagFill = !0, (this._fill instanceof t.Gradient || this._fill instanceof t.LinearGradient || this._fill instanceof t.RadialGradient || this._fill instanceof t.Texture) && this._fill.bind(t.Events.change, this._renderer.flagFill)
                }
            }), Object.defineProperty(e, "stroke", {
                enumerable: !0,
                get: function() {
                    return this._stroke
                },
                set: function(e) {
                    (this._stroke instanceof t.Gradient || this._stroke instanceof t.LinearGradient || this._stroke instanceof t.RadialGradient || this._stroke instanceof t.Texture) && this._stroke.unbind(t.Events.change, this._renderer.flagStroke), this._stroke = e, this._flagStroke = !0, (this._stroke instanceof t.Gradient || this._stroke instanceof t.LinearGradient || this._stroke instanceof t.RadialGradient || this._stroke instanceof t.Texture) && this._stroke.bind(t.Events.change, this._renderer.flagStroke)
                }
            }), Object.defineProperty(e, "clip", {
                enumerable: !0,
                get: function() {
                    return this._clip
                },
                set: function(t) {
                    this._clip = t, this._flagClip = !0
                }
            }), Object.defineProperty(e, "dashes", {
                enumerable: !0,
                get: function() {
                    return this._dashes
                },
                set: function(t) {
                    i.isNumber(t.offset) || (t.offset = this._dashes.offset || 0), this._dashes = t
                }
            })
        }
    }), i.extend(t.Text.prototype, t.Shape.prototype, {
        _flagValue: !0,
        _flagFamily: !0,
        _flagSize: !0,
        _flagLeading: !0,
        _flagAlignment: !0,
        _flagBaseline: !0,
        _flagStyle: !0,
        _flagWeight: !0,
        _flagDecoration: !0,
        _flagFill: !0,
        _flagStroke: !0,
        _flagLinewidth: !0,
        _flagOpacity: !0,
        _flagClassName: !0,
        _flagVisible: !0,
        _flagClip: !1,
        _value: "",
        _family: "sans-serif",
        _size: 13,
        _leading: 17,
        _alignment: "center",
        _baseline: "middle",
        _style: "normal",
        _weight: 500,
        _decoration: "none",
        _fill: "#000",
        _stroke: "transparent",
        _linewidth: 1,
        _opacity: 1,
        _className: "",
        _visible: !0,
        _clip: !1,
        _dashes: [],
        constructor: t.Text,
        remove: function() {
            return this.parent ? (this.parent.remove(this), this) : this
        },
        clone: function(e) {
            var r = new t.Text(this.value);
            return r.translation.copy(this.translation), r.rotation = this.rotation, r.scale = this.scale, i.each(t.Text.Properties, (function(t) {
                r[t] = this[t]
            }), this), this.matrix.manual && r.matrix.copy(this.matrix), e && e.add(r), r._update()
        },
        toObject: function() {
            var e = {
                translation: this.translation.toObject(),
                rotation: this.rotation,
                scale: this.scale
            };
            return this.matrix.manual && (e.matrix = this.matrix.toObject()), i.each(t.Text.Properties, (function(t) {
                e[t] = this[t]
            }), this), e
        },
        noFill: function() {
            return this.fill = "transparent", this
        },
        noStroke: function() {
            return this.stroke = void 0, this.linewidth = void 0, this
        },
        getBoundingClientRect: function(t) {
            var i, s, n, a, o, l;
            this._update(!0), i = t ? this._matrix : e(this);
            var h = this.leading,
                c = this.value.length * this.size * r.Ratio;
            switch (this.alignment) {
                case "left":
                    n = 0, a = c;
                    break;
                case "right":
                    n = -c, a = 0;
                    break;
                default:
                    n = -c / 2, a = c / 2
            }
            switch (this.baseline) {
                case "top":
                    o = 0, l = h;
                    break;
                case "bottom":
                    o = -h, l = 0;
                    break;
                default:
                    o = -h / 2, l = h / 2
            }
            return {
                top: o = (s = i.multiply(n, o, 1)).y,
                left: n = s.x,
                right: a = (s = i.multiply(a, l, 1)).x,
                bottom: l = s.y,
                width: a - n,
                height: l - o
            }
        },
        flagReset: function() {
            return this._flagValue = this._flagFamily = this._flagSize = this._flagLeading = this._flagAlignment = this._flagFill = this._flagStroke = this._flagLinewidth = this._flagOpacity = this._flagVisible = this._flagClip = this._flagDecoration = this._flagClassName = this._flagBaseline = !1, t.Shape.prototype.flagReset.call(this), this
        }
    }), t.Text.MakeObservable(t.Text.prototype)
}(("undefined" != typeof global ? global : this || self || window).Two),
function(t) {
    var e = t.Utils,
        i = t.Stop = function(t, r, s) {
            this._renderer = {}, this._renderer.type = "stop", this.offset = e.isNumber(t) ? t : i.Index <= 0 ? 0 : 1, this.opacity = e.isNumber(s) ? s : 1, this.color = e.isString(r) ? r : i.Index <= 0 ? "#fff" : "#000", i.Index = (i.Index + 1) % 2
        };
    e.extend(i, {
        Index: 0,
        Properties: ["offset", "opacity", "color"],
        MakeObservable: function(t) {
            e.each(i.Properties, (function(t) {
                var e = "_" + t,
                    i = "_flag" + t.charAt(0).toUpperCase() + t.slice(1);
                Object.defineProperty(this, t, {
                    enumerable: !0,
                    get: function() {
                        return this[e]
                    },
                    set: function(t) {
                        this[e] = t, this[i] = !0, this.parent && (this.parent._flagStops = !0)
                    }
                })
            }), t)
        }
    }), e.extend(i.prototype, t.Utils.Events, {
        constructor: i,
        clone: function() {
            var t = new i;
            return e.each(i.Properties, (function(e) {
                t[e] = this[e]
            }), this), t
        },
        toObject: function() {
            var t = {};
            return e.each(i.Properties, (function(e) {
                t[e] = this[e]
            }), this), t
        },
        flagReset: function() {
            return this._flagOffset = this._flagColor = this._flagOpacity = !1, this
        }
    }), i.MakeObservable(i.prototype), i.prototype.constructor = i;
    var r = t.Gradient = function(i) {
        this._renderer = {}, this._renderer.type = "gradient", this.id = t.Identifier + t.uniqueId(), this.classList = [], this._renderer.flagStops = e.bind(r.FlagStops, this), this._renderer.bindStops = e.bind(r.BindStops, this), this._renderer.unbindStops = e.bind(r.UnbindStops, this), this.spread = "pad", this.stops = i
    };
    e.extend(r, {
        Stop: i,
        Properties: ["spread"],
        MakeObservable: function(i) {
            e.each(r.Properties, t.Utils.defineProperty, i), Object.defineProperty(i, "stops", {
                enumerable: !0,
                get: function() {
                    return this._stops
                },
                set: function(e) {
                    this._renderer.flagStops;
                    var i = this._renderer.bindStops,
                        r = this._renderer.unbindStops;
                    this._stops && this._stops.unbind(t.Events.insert, i).unbind(t.Events.remove, r), this._stops = new t.Utils.Collection((e || []).slice(0)), this._stops.bind(t.Events.insert, i).bind(t.Events.remove, r), i(this._stops)
                }
            })
        },
        FlagStops: function() {
            this._flagStops = !0
        },
        BindStops: function(e) {
            for (var i = e.length; i--;) e[i].bind(t.Events.change, this._renderer.flagStops), e[i].parent = this;
            this._renderer.flagStops()
        },
        UnbindStops: function(e) {
            for (var i = e.length; i--;) e[i].unbind(t.Events.change, this._renderer.flagStops), delete e[i].parent;
            this._renderer.flagStops()
        }
    }), e.extend(r.prototype, t.Utils.Events, {
        _flagStops: !1,
        _flagSpread: !1,
        clone: function(i) {
            var s = e.map(this.stops, (function(t) {
                    return t.clone()
                })),
                n = new r(s);
            return e.each(t.Gradient.Properties, (function(t) {
                n[t] = this[t]
            }), this), i && i.add(n), n
        },
        toObject: function() {
            var t = {
                stops: e.map(this.stops, (function(t) {
                    return t.toObject()
                }))
            };
            return e.each(r.Properties, (function(e) {
                t[e] = this[e]
            }), this), t
        },
        _update: function() {
            return (this._flagSpread || this._flagStops) && this.trigger(t.Events.change), this
        },
        flagReset: function() {
            return this._flagSpread = this._flagStops = !1, this
        }
    }), r.MakeObservable(r.prototype)
}(("undefined" != typeof global ? global : this || self || window).Two),
function(t) {
    var e = t.Utils,
        i = t.LinearGradient = function(r, s, n, a, o) {
            t.Gradient.call(this, o), this._renderer.type = "linear-gradient";
            var l = e.bind(i.FlagEndPoints, this);
            this.left = (new t.Vector).bind(t.Events.change, l), this.right = (new t.Vector).bind(t.Events.change, l), e.isNumber(r) && (this.left.x = r), e.isNumber(s) && (this.left.y = s), e.isNumber(n) && (this.right.x = n), e.isNumber(a) && (this.right.y = a)
        };
    e.extend(i, {
        Stop: t.Gradient.Stop,
        MakeObservable: function(e) {
            t.Gradient.MakeObservable(e)
        },
        FlagEndPoints: function() {
            this._flagEndPoints = !0
        }
    }), e.extend(i.prototype, t.Gradient.prototype, {
        _flagEndPoints: !1,
        constructor: i,
        clone: function(r) {
            var s = e.map(this.stops, (function(t) {
                    return t.clone()
                })),
                n = new i(this.left._x, this.left._y, this.right._x, this.right._y, s);
            return e.each(t.Gradient.Properties, (function(t) {
                n[t] = this[t]
            }), this), r && r.add(n), n
        },
        toObject: function() {
            var e = t.Gradient.prototype.toObject.call(this);
            return e.left = this.left.toObject(), e.right = this.right.toObject(), e
        },
        _update: function() {
            return (this._flagEndPoints || this._flagSpread || this._flagStops) && this.trigger(t.Events.change), this
        },
        flagReset: function() {
            return this._flagEndPoints = !1, t.Gradient.prototype.flagReset.call(this), this
        }
    }), i.MakeObservable(i.prototype)
}(("undefined" != typeof global ? global : this || self || window).Two),
function(t) {
    var e = t.Utils,
        i = t.RadialGradient = function(i, r, s, n, a, o) {
            t.Gradient.call(this, n), this._renderer.type = "radial-gradient", this.center = (new t.Vector).bind(t.Events.change, e.bind((function() {
                this._flagCenter = !0
            }), this)), this.radius = e.isNumber(s) ? s : 20, this.focal = (new t.Vector).bind(t.Events.change, e.bind((function() {
                this._flagFocal = !0
            }), this)), e.isNumber(i) && (this.center.x = i), e.isNumber(r) && (this.center.y = r), this.focal.copy(this.center), e.isNumber(a) && (this.focal.x = a), e.isNumber(o) && (this.focal.y = o)
        };
    e.extend(i, {
        Stop: t.Gradient.Stop,
        Properties: ["radius"],
        MakeObservable: function(r) {
            t.Gradient.MakeObservable(r), e.each(i.Properties, t.Utils.defineProperty, r)
        }
    }), e.extend(i.prototype, t.Gradient.prototype, {
        _flagRadius: !1,
        _flagCenter: !1,
        _flagFocal: !1,
        constructor: i,
        clone: function(r) {
            var s = e.map(this.stops, (function(t) {
                    return t.clone()
                })),
                n = new i(this.center._x, this.center._y, this._radius, s, this.focal._x, this.focal._y);
            return e.each(t.Gradient.Properties.concat(i.Properties), (function(t) {
                n[t] = this[t]
            }), this), r && r.add(n), n
        },
        toObject: function() {
            var r = t.Gradient.prototype.toObject.call(this);
            return e.each(i.Properties, (function(t) {
                r[t] = this[t]
            }), this), r.center = this.center.toObject(), r.focal = this.focal.toObject(), r
        },
        _update: function() {
            return (this._flagRadius || this._flatCenter || this._flagFocal || this._flagSpread || this._flagStops) && this.trigger(t.Events.change), this
        },
        flagReset: function() {
            return this._flagRadius = this._flagCenter = this._flagFocal = !1, t.Gradient.prototype.flagReset.call(this), this
        }
    }), i.MakeObservable(i.prototype)
}(("undefined" != typeof global ? global : this || self || window).Two),
function(t) {
    var e, i = t.root,
        r = t.Utils,
        s = {
            video: /\.(mp4|webm|ogg)$/i,
            image: /\.(jpe?g|png|gif|tiff|webp)$/i,
            effect: /texture|gradient/i
        };
    i.document && (e = document.createElement("a"));
    var n = t.Texture = function(e, i) {
        if (this._renderer = {}, this._renderer.type = "texture", this._renderer.flagOffset = r.bind(n.FlagOffset, this), this._renderer.flagScale = r.bind(n.FlagScale, this), this.id = t.Identifier + t.uniqueId(), this.classList = [], this.loaded = !1, this.repeat = "no-repeat", this.offset = new t.Vector, r.isFunction(i)) {
            var s = r.bind((function() {
                this.unbind(t.Events.load, s), r.isFunction(i) && i()
            }), this);
            this.bind(t.Events.load, s)
        }
        r.isString(e) ? this.src = e : r.isElement(e) && (this.image = e), this._update()
    };
    r.extend(n, {
        Properties: ["src", "loaded", "repeat"],
        RegularExpressions: s,
        ImageRegistry: new t.Registry,
        getAbsoluteURL: function(t) {
            return e ? (e.href = t, e.href) : t
        },
        loadHeadlessBuffer: new Function("texture", "loaded", ['var fs = require("fs");', "var buffer = fs.readFileSync(texture.src);", "texture.image.src = buffer;", "loaded();"].join("\n")),
        getImage: function(e) {
            var r, a = n.getAbsoluteURL(e);
            return n.ImageRegistry.contains(a) ? n.ImageRegistry.get(a) : (t.Utils.Image ? (r = new t.Utils.Image, t.CanvasRenderer.Utils.shim(r, "img")) : i.document ? r = s.video.test(a) ? document.createElement("video") : document.createElement("img") : console.warn("Two.js: no prototypical image defined for Two.Texture"), r.crossOrigin = "anonymous", r)
        },
        Register: {
            canvas: function(t, e) {
                t._src = "#" + t.id, n.ImageRegistry.add(t.src, t.image), r.isFunction(e) && e()
            },
            img: function(e, i) {
                var s = function(t) {
                        r.isFunction(e.image.removeEventListener) && (e.image.removeEventListener("load", s, !1), e.image.removeEventListener("error", a, !1)), r.isFunction(i) && i()
                    },
                    a = function(i) {
                        throw r.isFunction(e.image.removeEventListener) && (e.image.removeEventListener("load", s, !1), e.image.removeEventListener("error", a, !1)), new t.Utils.Error("unable to load " + e.src)
                    };
                r.isNumber(e.image.width) && e.image.width > 0 && r.isNumber(e.image.height) && e.image.height > 0 ? s() : r.isFunction(e.image.addEventListener) && (e.image.addEventListener("load", s, !1), e.image.addEventListener("error", a, !1)), e._src = n.getAbsoluteURL(e._src), e.image && e.image.getAttribute("two-src") || (e.image.setAttribute("two-src", e.src), n.ImageRegistry.add(e.src, e.image), t.Utils.isHeadless ? n.loadHeadlessBuffer(e, s) : e.image.src = e.src)
            },
            video: function(e, i) {
                var s = function(t) {
                        e.image.removeEventListener("canplaythrough", s, !1), e.image.removeEventListener("error", a, !1), e.image.width = e.image.videoWidth, e.image.height = e.image.videoHeight, e.image.play(), r.isFunction(i) && i()
                    },
                    a = function(i) {
                        throw e.image.removeEventListener("canplaythrough", s, !1), e.image.removeEventListener("error", a, !1), new t.Utils.Error("unable to load " + e.src)
                    };
                if (e._src = n.getAbsoluteURL(e._src), e.image.addEventListener("canplaythrough", s, !1), e.image.addEventListener("error", a, !1), !e.image || !e.image.getAttribute("two-src")) {
                    if (t.Utils.isHeadless) throw new t.Utils.Error("video textures are not implemented in headless environments.");
                    e.image.setAttribute("two-src", e.src), n.ImageRegistry.add(e.src, e.image), e.image.src = e.src, e.image.loop = !0, e.image.load()
                }
            }
        },
        load: function(t, e) {
            t.src;
            var i = t.image,
                r = i && i.nodeName.toLowerCase();
            t._flagImage && (/canvas/i.test(r) ? n.Register.canvas(t, e) : (t._src = i.getAttribute("two-src") || i.src, n.Register[r](t, e))), t._flagSrc && (i || (t.image = n.getImage(t.src)), r = t.image.nodeName.toLowerCase(), n.Register[r](t, e))
        },
        FlagOffset: function() {
            this._flagOffset = !0
        },
        FlagScale: function() {
            this._flagScale = !0
        },
        MakeObservable: function(e) {
            r.each(n.Properties, t.Utils.defineProperty, e), Object.defineProperty(e, "image", {
                enumerable: !0,
                get: function() {
                    return this._image
                },
                set: function(t) {
                    var e;
                    switch (t && t.nodeName.toLowerCase()) {
                        case "canvas":
                            e = "#" + t.id;
                            break;
                        default:
                            e = t.src
                    }
                    n.ImageRegistry.contains(e) ? this._image = n.ImageRegistry.get(t.src) : this._image = t, this._flagImage = !0
                }
            }), Object.defineProperty(e, "offset", {
                enumerable: !0,
                get: function() {
                    return this._offset
                },
                set: function(e) {
                    this._offset && this._offset.unbind(t.Events.change, this._renderer.flagOffset), this._offset = e, this._offset.bind(t.Events.change, this._renderer.flagOffset), this._flagOffset = !0
                }
            }), Object.defineProperty(e, "scale", {
                enumerable: !0,
                get: function() {
                    return this._scale
                },
                set: function(e) {
                    this._scale instanceof t.Vector && this._scale.unbind(t.Events.change, this._renderer.flagScale), this._scale = e, this._scale instanceof t.Vector && this._scale.bind(t.Events.change, this._renderer.flagScale), this._flagScale = !0
                }
            })
        }
    }), r.extend(n.prototype, t.Utils.Events, t.Shape.prototype, {
        _flagSrc: !1,
        _flagImage: !1,
        _flagVideo: !1,
        _flagLoaded: !1,
        _flagRepeat: !1,
        _flagOffset: !1,
        _flagScale: !1,
        _src: "",
        _image: null,
        _loaded: !1,
        _repeat: "no-repeat",
        _scale: 1,
        _offset: null,
        constructor: n,
        clone: function() {
            var t = new n(this.src);
            return t.repeat = this.repeat, t.offset.copy(this.origin), t.scale = this.scale, t
        },
        toObject: function() {
            return {
                src: this.src,
                repeat: this.repeat,
                origin: this.origin.toObject(),
                scale: r.isNumber(this.scale) ? this.scale : this.scale.toObject()
            }
        },
        _update: function() {
            return (this._flagSrc || this._flagImage) && (this.trigger(t.Events.change), (this._flagSrc || this._flagImage) && (this.loaded = !1, n.load(this, r.bind((function() {
                this.loaded = !0, this.trigger(t.Events.change).trigger(t.Events.load)
            }), this)))), this._image && this._image.readyState >= 4 && (this._flagVideo = !0), this
        },
        flagReset: function() {
            return this._flagSrc = this._flagImage = this._flagLoaded = this._flagVideo = this._flagScale = this._flagOffset = !1, this
        }
    }), n.MakeObservable(n.prototype)
}(("undefined" != typeof global ? global : this || self || window).Two),
function(t) {
    var e = t.Utils,
        i = t.Path,
        r = t.Rectangle,
        s = t.Sprite = function(r, s, n, a, o, l) {
            i.call(this, [new t.Anchor, new t.Anchor, new t.Anchor, new t.Anchor], !0), this.noStroke(), this.noFill(), r instanceof t.Texture ? this.texture = r : e.isString(r) && (this.texture = new t.Texture(r)), this.origin = new t.Vector, this._update(), this.translation.set(s || 0, n || 0), e.isNumber(a) && (this.columns = a), e.isNumber(o) && (this.rows = o), e.isNumber(l) && (this.frameRate = l), this.index = 0
        };
    e.extend(s, {
        Properties: ["texture", "columns", "rows", "frameRate", "index"],
        MakeObservable: function(i) {
            r.MakeObservable(i), e.each(s.Properties, t.Utils.defineProperty, i)
        }
    }), e.extend(s.prototype, r.prototype, {
        _flagTexture: !1,
        _flagColumns: !1,
        _flagRows: !1,
        _flagFrameRate: !1,
        flagIndex: !1,
        _amount: 1,
        _duration: 0,
        _startTime: 0,
        _playing: !1,
        _firstFrame: 0,
        _lastFrame: 0,
        _loop: !0,
        _texture: null,
        _columns: 1,
        _rows: 1,
        _frameRate: 0,
        _index: 0,
        _origin: null,
        constructor: s,
        play: function(t, i, r) {
            return this._playing = !0, this._firstFrame = 0, this._lastFrame = this.amount - 1, this._startTime = e.performance.now(), e.isNumber(t) && (this._firstFrame = t), e.isNumber(i) && (this._lastFrame = i), e.isFunction(r) ? this._onLastFrame = r : delete this._onLastFrame, this._index !== this._firstFrame && (this._startTime -= 1e3 * Math.abs(this._index - this._firstFrame) / this._frameRate), this
        },
        pause: function() {
            return this._playing = !1, this
        },
        stop: function() {
            return this._playing = !1, this._index = 0, this
        },
        clone: function(t) {
            var e = new s(this.texture, this.translation.x, this.translation.y, this.columns, this.rows, this.frameRate);
            return this.playing && (e.play(this._firstFrame, this._lastFrame), e._loop = this._loop), t && t.add(e), e
        },
        toObject: function() {
            var t = r.prototype.toObject.call(this);
            return t.texture = this.texture.toObject(), t.columns = this.columns, t.rows = this.rows, t.frameRate = this.frameRate, t.index = this.index, t._firstFrame = this._firstFrame, t._lastFrame = this._lastFrame, t._loop = this._loop, t
        },
        _update: function() {
            var t, i, s, n, a, o, l, h, c, d = this._texture,
                f = this._columns,
                u = this._rows;
            if ((this._flagColumns || this._flagRows) && (this._amount = this._columns * this._rows), this._flagFrameRate && (this._duration = 1e3 * this._amount / this._frameRate), this._flagTexture && (this.fill = this._texture), this._texture.loaded) {
                t = (l = d.image.width) / f, i = (h = d.image.height) / u, n = this._amount, this.width !== t && (this.width = t), this.height !== i && (this.height = i), this._playing && this._frameRate > 0 && (e.isNaN(this._lastFrame) && (this._lastFrame = n - 1), s = e.performance.now() - this._startTime, a = 1e3 * ((c = this._lastFrame + 1) - this._firstFrame) / this._frameRate, this._loop ? s %= a : s = Math.min(s, a), o = e.lerp(this._firstFrame, c, s / a), (o = Math.floor(o)) !== this._index && (this._index = o, o >= this._lastFrame - 1 && this._onLastFrame && this._onLastFrame()));
                var _ = -t * (this._index % f) + (l - t) / 2,
                    g = -i * Math.floor(this._index / f) + (h - i) / 2;
                _ !== d.offset.x && (d.offset.x = _), g !== d.offset.y && (d.offset.y = g)
            }
            return r.prototype._update.call(this), this
        },
        flagReset: function() {
            return this._flagTexture = this._flagColumns = this._flagRows = this._flagFrameRate = !1, r.prototype.flagReset.call(this), this
        }
    }), s.MakeObservable(s.prototype)
}(("undefined" != typeof global ? global : this || self || window).Two),
function(t) {
    var e = t.Utils,
        i = t.Path,
        r = t.Rectangle,
        s = t.ImageSequence = function(r, n, a, o) {
            i.call(this, [new t.Anchor, new t.Anchor, new t.Anchor, new t.Anchor], !0), this._renderer.flagTextures = e.bind(s.FlagTextures, this), this._renderer.bindTextures = e.bind(s.BindTextures, this), this._renderer.unbindTextures = e.bind(s.UnbindTextures, this), this.noStroke(), this.noFill(), e.isObject(r) ? this.textures = e.map(r, s.GenerateTexture, this) : this.textures = [s.GenerateTexture(r)], this.origin = new t.Vector, this._update(), this.translation.set(n || 0, a || 0), e.isNumber(o) ? this.frameRate = o : this.frameRate = s.DefaultFrameRate, this.index = 0
        };
    e.extend(s, {
        Properties: ["frameRate", "index"],
        DefaultFrameRate: 30,
        FlagTextures: function() {
            this._flagTextures = !0
        },
        BindTextures: function(e) {
            for (var i = e.length; i--;) e[i].bind(t.Events.change, this._renderer.flagTextures);
            this._renderer.flagTextures()
        },
        UnbindTextures: function(e) {
            for (var i = e.length; i--;) e[i].unbind(t.Events.change, this._renderer.flagTextures);
            this._renderer.flagTextures()
        },
        MakeObservable: function(i) {
            r.MakeObservable(i), e.each(s.Properties, t.Utils.defineProperty, i), Object.defineProperty(i, "textures", {
                enumerable: !0,
                get: function() {
                    return this._textures
                },
                set: function(e) {
                    this._renderer.flagTextures;
                    var i = this._renderer.bindTextures,
                        r = this._renderer.unbindTextures;
                    this._textures && this._textures.unbind(t.Events.insert, i).unbind(t.Events.remove, r), this._textures = new t.Utils.Collection((e || []).slice(0)), this._textures.bind(t.Events.insert, i).bind(t.Events.remove, r), i(this._textures)
                }
            })
        },
        GenerateTexture: function(i) {
            return i instanceof t.Texture ? i : e.isString(i) ? new t.Texture(i) : void 0
        }
    }), e.extend(s.prototype, r.prototype, {
        _flagTextures: !1,
        _flagFrameRate: !1,
        _flagIndex: !1,
        _amount: 1,
        _duration: 0,
        _index: 0,
        _startTime: 0,
        _playing: !1,
        _firstFrame: 0,
        _lastFrame: 0,
        _loop: !0,
        _textures: null,
        _frameRate: 0,
        _origin: null,
        constructor: s,
        play: function(t, i, r) {
            return this._playing = !0, this._firstFrame = 0, this._lastFrame = this.amount - 1, this._startTime = e.performance.now(), e.isNumber(t) && (this._firstFrame = t), e.isNumber(i) && (this._lastFrame = i), e.isFunction(r) ? this._onLastFrame = r : delete this._onLastFrame, this._index !== this._firstFrame && (this._startTime -= 1e3 * Math.abs(this._index - this._firstFrame) / this._frameRate), this
        },
        pause: function() {
            return this._playing = !1, this
        },
        stop: function() {
            return this._playing = !1, this._index = this._firstFrame, this
        },
        clone: function(t) {
            var e = new s(this.textures, this.translation.x, this.translation.y, this.frameRate);
            return e._loop = this._loop, this._playing && e.play(), t && t.add(e), e
        },
        toObject: function() {
            var t = r.prototype.toObject.call(this);
            return t.textures = e.map(this.textures, (function(t) {
                return t.toObject()
            })), t.frameRate = this.frameRate, t.index = this.index, t._firstFrame = this._firstFrame, t._lastFrame = this._lastFrame, t._loop = this._loop, t
        },
        _update: function() {
            var i, s, n, a, o, l, h, c, d = this._textures;
            return this._flagTextures && (this._amount = d.length), this._flagFrameRate && (this._duration = 1e3 * this._amount / this._frameRate), this._playing && this._frameRate > 0 ? (a = this._amount, e.isNaN(this._lastFrame) && (this._lastFrame = a - 1), n = e.performance.now() - this._startTime, o = 1e3 * ((c = this._lastFrame + 1) - this._firstFrame) / this._frameRate, this._loop ? n %= o : n = Math.min(n, o), h = e.lerp(this._firstFrame, c, n / o), (h = Math.floor(h)) !== this._index && (this._index = h, (l = d[this._index]).loaded && (i = l.image.width, s = l.image.height, this.width !== i && (this.width = i), this.height !== s && (this.height = s), this.fill = l, h >= this._lastFrame - 1 && this._onLastFrame && this._onLastFrame()))) : !this._flagIndex && this.fill instanceof t.Texture || ((l = d[this._index]).loaded && (i = l.image.width, s = l.image.height, this.width !== i && (this.width = i), this.height !== s && (this.height = s)), this.fill = l), r.prototype._update.call(this), this
        },
        flagReset: function() {
            return this._flagTextures = this._flagFrameRate = !1, r.prototype.flagReset.call(this), this
        }
    }), s.MakeObservable(s.prototype)
}(("undefined" != typeof global ? global : this || self || window).Two),
function(t) {
    var e = Math.min,
        i = Math.max,
        r = t.Utils,
        s = function() {
            t.Utils.Collection.apply(this, arguments), Object.defineProperty(this, "_events", {
                value: {},
                enumerable: !1
            }), this.ids = {}, this.on(t.Events.insert, this.attach), this.on(t.Events.remove, this.detach), s.prototype.attach.apply(this, arguments)
        };
    s.prototype = new t.Utils.Collection, r.extend(s.prototype, {
        constructor: s,
        attach: function(t) {
            for (var e = 0; e < t.length; e++) this.ids[t[e].id] = t[e];
            return this
        },
        detach: function(t) {
            for (var e = 0; e < t.length; e++) delete this.ids[t[e].id];
            return this
        }
    });
    var n = t.Group = function(e) {
        t.Shape.call(this, !0), this._renderer.type = "group", this.additions = [], this.subtractions = [], this.children = r.isArray(e) ? e : arguments
    };

    function a(t, e) {
        var i, s = t.parent;

        function n() {
            e.subtractions.length > 0 && (i = r.indexOf(e.subtractions, t)) >= 0 && e.subtractions.splice(i, 1), e.additions.length > 0 && (i = r.indexOf(e.additions, t)) >= 0 && e.additions.splice(i, 1), t.parent = e, e.additions.push(t), e._flagAdditions = !0
        }

        function a() {
            (i = r.indexOf(s.additions, t)) >= 0 && s.additions.splice(i, 1), (i = r.indexOf(s.subtractions, t)) < 0 && (s.subtractions.push(t), s._flagSubtractions = !0)
        }
        s !== e ? (s && s.children.ids[t.id] && (i = r.indexOf(s.children, t), s.children.splice(i, 1), a()), e ? n() : (a(), s._flagAdditions && 0 === s.additions.length && (s._flagAdditions = !1), s._flagSubtractions && 0 === s.subtractions.length && (s._flagSubtractions = !1), delete t.parent)) : n()
    }
    r.extend(n, {
        Children: s,
        InsertChildren: function(t) {
            for (var e = 0; e < t.length; e++) a.call(this, t[e], this)
        },
        RemoveChildren: function(t) {
            for (var e = 0; e < t.length; e++) a.call(this, t[e])
        },
        OrderChildren: function(t) {
            this._flagOrder = !0
        },
        Properties: ["fill", "stroke", "linewidth", "visible", "cap", "join", "miter", "closed", "curved", "automatic"],
        MakeObservable: function(e) {
            var i = t.Group.Properties;
            Object.defineProperty(e, "opacity", {
                enumerable: !0,
                get: function() {
                    return this._opacity
                },
                set: function(t) {
                    this._flagOpacity = this._opacity !== t, this._opacity = t
                }
            }), Object.defineProperty(e, "beginning", {
                enumerable: !0,
                get: function() {
                    return this._beginning
                },
                set: function(t) {
                    this._flagBeginning = this._beginning !== t, this._beginning = t
                }
            }), Object.defineProperty(e, "ending", {
                enumerable: !0,
                get: function() {
                    return this._ending
                },
                set: function(t) {
                    this._flagEnding = this._ending !== t, this._ending = t
                }
            }), Object.defineProperty(e, "length", {
                enumerable: !0,
                get: function() {
                    if (this._flagLength || this._length <= 0) {
                        if (this._length = 0, !this.children) return this._length;
                        for (var t = 0; t < this.children.length; t++) {
                            var e = this.children[t];
                            this._length += e.length
                        }
                    }
                    return this._length
                }
            }), t.Shape.MakeObservable(e), n.MakeGetterSetters(e, i), Object.defineProperty(e, "children", {
                enumerable: !0,
                get: function() {
                    return this._children
                },
                set: function(e) {
                    var i = r.bind(n.InsertChildren, this),
                        a = r.bind(n.RemoveChildren, this),
                        o = r.bind(n.OrderChildren, this);
                    this._children && this._children.unbind(), this._children = new s(e), this._children.bind(t.Events.insert, i), this._children.bind(t.Events.remove, a), this._children.bind(t.Events.order, o)
                }
            }), Object.defineProperty(e, "mask", {
                enumerable: !0,
                get: function() {
                    return this._mask
                },
                set: function(t) {
                    this._mask = t, this._flagMask = !0, t.clip || (t.clip = !0)
                }
            })
        },
        MakeGetterSetters: function(t, e) {
            r.isArray(e) || (e = [e]), r.each(e, (function(e) {
                n.MakeGetterSetter(t, e)
            }))
        },
        MakeGetterSetter: function(t, e) {
            var i = "_" + e;
            Object.defineProperty(t, e, {
                enumerable: !0,
                get: function() {
                    return this[i]
                },
                set: function(t) {
                    this[i] = t;
                    for (var r = 0; r < this.children.length; r++) {
                        this.children[r][e] = t
                    }
                }
            })
        }
    }), r.extend(n.prototype, t.Shape.prototype, {
        _flagAdditions: !1,
        _flagSubtractions: !1,
        _flagOrder: !1,
        _flagOpacity: !0,
        _flagBeginning: !1,
        _flagEnding: !1,
        _flagLength: !1,
        _flagMask: !1,
        _fill: "#fff",
        _stroke: "#000",
        _linewidth: 1,
        _opacity: 1,
        _visible: !0,
        _cap: "round",
        _join: "round",
        _miter: 4,
        _closed: !0,
        _curved: !1,
        _automatic: !0,
        _beginning: 0,
        _ending: 1,
        _length: 0,
        _mask: null,
        constructor: n,
        clone: function(t) {
            var e = new n,
                i = r.map(this.children, (function(t) {
                    return t.clone()
                }));
            return e.add(i), e.opacity = this.opacity, this.mask && (e.mask = this.mask), e.translation.copy(this.translation), e.rotation = this.rotation, e.scale = this.scale, e.className = this.className, this.matrix.manual && e.matrix.copy(this.matrix), t && t.add(e), e._update()
        },
        toObject: function() {
            var e = {
                children: [],
                translation: this.translation.toObject(),
                rotation: this.rotation,
                scale: this.scale instanceof t.Vector ? this.scale.toObject() : this.scale,
                opacity: this.opacity,
                className: this.className,
                mask: this.mask ? this.mask.toObject() : null
            };
            return this.matrix.manual && (e.matrix = this.matrix.toObject()), r.each(this.children, (function(t, i) {
                e.children[i] = t.toObject()
            }), this), e
        },
        corner: function() {
            var t = this.getBoundingClientRect(!0),
                e = {
                    x: t.left,
                    y: t.top
                };
            return this.children.forEach((function(t) {
                t.translation.sub(e)
            })), this
        },
        center: function() {
            var t = this.getBoundingClientRect(!0);
            return t.centroid = {
                x: t.left + t.width / 2 - this.translation.x,
                y: t.top + t.height / 2 - this.translation.y
            }, this.children.forEach((function(e) {
                e.isShape && e.translation.sub(t.centroid)
            })), this
        },
        getById: function(t) {
            var e = null;
            return function i(r) {
                if (r.id === t) return r;
                if (r.children)
                    for (var s = 0; s < r.children.length; s++)
                        if (e = i(r.children[s])) return e;
                return null
            }(this)
        },
        getByClassName: function(t) {
            var e = [];
            return function i(s) {
                if (r.indexOf(s.classList, t) >= 0 && e.push(s), s.children)
                    for (var n = 0; n < s.children.length; n++) {
                        i(s.children[n])
                    }
                return e
            }(this)
        },
        getByType: function(t) {
            var e = [];
            return function i(r) {
                if (r instanceof t && e.push(r), r.children)
                    for (var s = 0; s < r.children.length; s++) {
                        i(r.children[s])
                    }
                return e
            }(this)
        },
        add: function(t) {
            t = t instanceof Array ? t.slice() : r.toArray(arguments);
            for (var e = 0; e < t.length; e++) {
                var i = t[e];
                if (i && i.id) {
                    var s = r.indexOf(this.children, i);
                    s >= 0 && this.children.splice(s, 1), this.children.push(i)
                }
            }
            return this
        },
        remove: function(t) {
            var e = arguments.length,
                i = this.parent;
            if (e <= 0 && i) return i.remove(this), this;
            t = t instanceof Array ? t.slice() : r.toArray(arguments);
            for (var s = 0; s < t.length; s++) t[s] && this.children.ids[t[s].id] && this.children.splice(r.indexOf(this.children, t[s]), 1);
            return this
        },
        getBoundingClientRect: function(s) {
            var n;
            this._update(!0);
            for (var a = 1 / 0, o = -1 / 0, l = 1 / 0, h = -1 / 0, c = t.Texture.RegularExpressions.effect, d = 0; d < this.children.length; d++) {
                var f = this.children[d];
                f.visible && !c.test(f._renderer.type) && (n = f.getBoundingClientRect(s), r.isNumber(n.top) && r.isNumber(n.left) && r.isNumber(n.right) && r.isNumber(n.bottom) && (l = e(n.top, l), a = e(n.left, a), o = i(n.right, o), h = i(n.bottom, h)))
            }
            return {
                top: l,
                left: a,
                right: o,
                bottom: h,
                width: o - a,
                height: h - l
            }
        },
        noFill: function() {
            return this.children.forEach((function(t) {
                t.noFill()
            })), this
        },
        noStroke: function() {
            return this.children.forEach((function(t) {
                t.noStroke()
            })), this
        },
        subdivide: function() {
            var t = arguments;
            return this.children.forEach((function(e) {
                e.subdivide.apply(e, t)
            })), this
        },
        _update: function() {
            if (this._flagBeginning || this._flagEnding)
                for (var e = Math.min(this._beginning, this._ending), i = Math.max(this._beginning, this._ending), r = this.length, s = 0, n = e * r, a = i * r, o = 0; o < this.children.length; o++) {
                    var l = this.children[o],
                        h = l.length;
                    n > s + h ? (l.beginning = 1, l.ending = 1) : a < s ? (l.beginning = 0, l.ending = 0) : n > s && n < s + h ? (l.beginning = (n - s) / h, l.ending = 1) : a > s && a < s + h ? (l.beginning = 0, l.ending = (a - s) / h) : (l.beginning = 0, l.ending = 1), s += h
                }
            return t.Shape.prototype._update.apply(this, arguments)
        },
        flagReset: function() {
            return this._flagAdditions && (this.additions.length = 0, this._flagAdditions = !1), this._flagSubtractions && (this.subtractions.length = 0, this._flagSubtractions = !1), this._flagOrder = this._flagMask = this._flagOpacity = this._flagBeginning = this._flagEnding = !1, t.Shape.prototype.flagReset.call(this), this
        }
    }), n.MakeObservable(n.prototype)
}(("undefined" != typeof global ? global : this || self || window).Two);