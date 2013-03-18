/* mapbox.js 0.6.7 */
!
function() {
  var define;
  !
  function(e, t, n) {
    typeof module != "undefined" ? module.exports = n(e, t) : typeof define == "function" && typeof define.amd == "object" ? define(n) : t[e] = n(e, t)
  }("bean", this, function(e, t) {
    var n = window,
        r = t[e],
        i = /over|out/,
        s = /[^\.]*(?=\..*)\.|.*/,
        o = /\..*/,
        u = "addEventListener",
        a = "attachEvent",
        f = "removeEventListener",
        l = "detachEvent",
        c = "ownerDocument",
        h = "target",
        p = "querySelectorAll",
        d = document || {},
        v = d.documentElement || {},
        m = v[u],
        g = m ? u : a,
        y = Array.prototype.slice,
        b = /click|mouse(?!(.*wheel|scroll))|menu|drag|drop/i,
        w = /mouse.*(wheel|scroll)/i,
        E = /^text/i,
        S = /^touch|^gesture/i,
        x = {},
        T = function(e, t, n) {
        for (n = 0; n < t.length; n++) e[t[n]] = 1;
        return e
        }({}, ("click dblclick mouseup mousedown contextmenu mousewheel mousemultiwheel DOMMouseScroll mouseover mouseout mousemove selectstart selectend keydown keypress keyup orientationchange focus blur change reset select submit load unload beforeunload resize move DOMContentLoaded readystatechange message error abort scroll " + (m ? "show input invalid touchstart touchmove touchend touchcancel gesturestart gesturechange gestureend readystatechange pageshow pagehide popstate hashchange offline online afterprint beforeprint dragstart dragenter dragover dragleave drag drop dragend loadstart progress suspend emptied stalled loadmetadata loadeddata canplay canplaythrough playing waiting seeking seeked ended durationchange timeupdate play pause ratechange volumechange cuechange checking noupdate downloading cached updateready obsolete " : "")).split(" ")),
        N = function() {
        function n(e) {
          var n = e.relatedTarget;
          return n ? n !== this && n.prefix !== "xul" && !/document/.test(this.toString()) && !t(n, this) : n === null
        }
        var e = "compareDocumentPosition",
            t = e in v ?
            function(t, n) {
            return n[e] && (n[e](t) & 16) === 16
            } : "contains" in v ?
            function(e, t) {
            return t = t.nodeType === 9 || t === window ? v : t, t !== e && t.contains(e)
            } : function(e, t) {
            while (e = e.parentNode) if (e === t) return 1;
            return 0
            };
        return {
          mouseenter: {
            base: "mouseover",
            condition: n
          },
          mouseleave: {
            base: "mouseout",
            condition: n
          },
          mousewheel: {
            base: /Firefox/.test(navigator.userAgent) ? "DOMMouseScroll" : "mousewheel"
          }
        }
        }(),
        C = function() {
        var e = "altKey attrChange attrName bubbles cancelable ctrlKey currentTarget detail eventPhase getModifierState isTrusted metaKey relatedNode relatedTarget shiftKey srcElement target timeStamp type view which".split(" "),
            t = e.concat("button buttons clientX clientY dataTransfer fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" ")),
            n = t.concat("wheelDelta wheelDeltaX wheelDeltaY wheelDeltaZ axis".split(" ")),
            r = e.concat("char charCode key keyCode keyIdentifier keyLocation".split(" ")),
            s = e.concat(["data"]),
            o = e.concat("touches targetTouches changedTouches scale rotation".split(" ")),
            u = e.concat(["data", "origin", "source"]),
            a = "preventDefault",
            f = function(e) {
            return function() {
              e[a] ? e[a]() : e.returnValue = !1
            }
            },
            l = "stopPropagation",
            c = function(e) {
            return function() {
              e[l] ? e[l]() : e.cancelBubble = !0
            }
            },
            p = function(e) {
            return function() {
              e[a](), e[l](), e.stopped = !0
            }
            },
            m = function(e, t, n) {
            var r, i;
            for (r = n.length; r--;) i = n[r], !(i in t) && i in e && (t[i] = e[i])
            };
        return function(g, y) {
          var x = {
            originalEvent: g,
            isNative: y
          };
          if (!g) return x;
          var T, N = g.type,
              C = g[h] || g.srcElement;
          x[a] = f(g), x[l] = c(g), x.stop = p(x), x[h] = C && C.nodeType === 3 ? C.parentNode : C;
          if (y) {
            if (N.indexOf("key") !== -1) T = r, x.keyCode = g.keyCode || g.which;
            else if (b.test(N)) {
              T = t, x.rightClick = g.which === 3 || g.button === 2, x.pos = {
                x: 0,
                y: 0
              };
              if (g.pageX || g.pageY) x.clientX = g.pageX, x.clientY = g.pageY;
              else if (g.clientX || g.clientY) x.clientX = g.clientX + d.body.scrollLeft + v.scrollLeft, x.clientY = g.clientY + d.body.scrollTop + v.scrollTop;
              i.test(N) && (x.relatedTarget = g.relatedTarget || g[(N === "mouseover" ? "from" : "to") + "Element"])
            } else S.test(N) ? T = o : w.test(N) ? T = n : E.test(N) ? T = s : N === "message" && (T = u);
            m(g, x, T || e)
          }
          return x
        }
        }(),
        k = function(e, t) {
        return !m && !t && (e === d || e === n) ? v : e
        },
        L = function() {
        function e(e, t, n, r, i) {
          var s = this.isNative = T[t] && e[g];
          this.element = e, this.type = t, this.handler = n, this.original = r, this.namespaces = i, this.custom = N[t], this.eventType = m || s ? t : "propertychange", this.customType = !m && !s && t, this[h] = k(e, s), this[g] = this[h][g]
        }
        return e.prototype = {
          inNamespaces: function(e) {
            var t, n;
            if (!e) return !0;
            if (!this.namespaces) return !1;
            for (t = e.length; t--;) for (n = this.namespaces.length; n--;) if (e[t] === this.namespaces[n]) return !0;
            return !1
          },
          matches: function(e, t, n) {
            return this.element === e && (!t || this.original === t) && (!n || this.handler === n)
          }
        }, e
        }(),
        A = function() {
        var e = {},
            t = function(n, r, i, s, o) {
            if (!r || r === "*") for (var u in e) u.charAt(0) === "$" && t(n, u.substr(1), i, s, o);
            else {
              var a = 0,
                  f, l = e["$" + r],
                  c = n === "*";
              if (!l) return;
              for (f = l.length; a < f; a++) if (c || l[a].matches(n, i, s)) if (!o(l[a], l, a, r)) return
            }
            },
            n = function(t, n, r) {
            var i, s = e["$" + n];
            if (s) for (i = s.length; i--;) if (s[i].matches(t, r, null)) return !0;
            return !1
            },
            r = function(e, n, r) {
            var i = [];
            return t(e, n, r, null, function(e) {
              return i.push(e)
            }), i
            },
            i = function(t) {
            return (e["$" + t.type] || (e["$" + t.type] = [])).push(t), t
            },
            s = function(n) {
            t(n.element, n.type, null, n.handler, function(t, n, r) {
              return n.splice(r, 1), n.length === 0 && delete e["$" + t.type], !1
            })
            },
            o = function() {
            var t, n = [];
            for (t in e) t.charAt(0) === "$" && (n = n.concat(e[t]));
            return n
            };
        return {
          has: n,
          get: r,
          put: i,
          del: s,
          entries: o
        }
        }(),
        O = d[p] ?
        function(e, t) {
        return t[p](e)
        } : function() {
        throw new Error("Bean: No selector engine installed")
        },
        M = function(e) {
        O = e
        },
        _ = m ?
        function(e, t, n, r) {
        e[r ? u : f](t, n, !1)
        } : function(e, t, n, r, i) {
        i && r && e["_on" + i] === null && (e["_on" + i] = 0), e[r ? a : l]("on" + t, n)
        },
        D = function(e, t, r) {
        var i = t.__beanDel,
            s = function(s) {
            return s = C(s || ((this[c] || this.document || this).parentWindow || n).event, !0), i && (s.currentTarget = i.ft(s[h], e)), t.apply(e, [s].concat(r))
            };
        return s.__beanDel = i, s
        },
        P = function(e, t, r, i, s, o) {
        var u = t.__beanDel,
            a = function(a) {
            var f = u ? u.ft(a[h], e) : this;
            if (i ? i.apply(f, arguments) : m ? !0 : a && a.propertyName === "_on" + r || !a) a && (a = C(a || ((this[c] || this.document || this).parentWindow || n).event, o), a.currentTarget = f), t.apply(e, a && (!s || s.length === 0) ? arguments : y.call(arguments, a ? 0 : 1).concat(s))
            };
        return a.__beanDel = u, a
        },
        H = function(e, t, n, r, i) {
        return function() {
          e(t, n, i), r.apply(this, arguments)
        }
        },
        B = function(e, t, n, r) {
        var i, s, u, a = t && t.replace(o, ""),
            f = A.get(e, a, n);
        for (i = 0, s = f.length; i < s; i++) f[i].inNamespaces(r) && ((u = f[i])[g] && _(u[h], u.eventType, u.handler, !1, u.type), A.del(u))
        },
        j = function(e, t, n, r, i) {
        var u, a = t.replace(o, ""),
            f = t.replace(s, "").split(".");
        if (A.has(e, a, n)) return e;
        a === "unload" && (n = H(B, e, a, n, r)), N[a] && (N[a].condition && (n = P(e, n, a, N[a].condition, i, !0)), a = N[a].base || a), u = A.put(new L(e, a, n, r, f[0] && f)), u.handler = u.isNative ? D(e, u.handler, i) : P(e, u.handler, a, !1, i, !1), u[g] && _(u[h], u.eventType, u.handler, !0, u.customType)
        },
        F = function(e, t, n) {
        var r = function(t, r) {
          var i, s = typeof e == "string" ? n(e, r) : e;
          for (; t && t !== r; t = t.parentNode) for (i = s.length; i--;) if (s[i] === t) return t
        },
            i = function(e) {
            var n = r(e[h], this);
            n && t.apply(n, arguments)
            };
        return i.__beanDel = {
          ft: r,
          selector: e,
          $: n
        }, i
        },
        I = function(e, t, n) {
        var r, i, u, a, f = B,
            l = t && typeof t == "string";
        if (l && t.indexOf(" ") > 0) {
          t = t.split(" ");
          for (a = t.length; a--;) I(e, t[a], n);
          return e
        }
        i = l && t.replace(o, ""), i && N[i] && (i = N[i].type);
        if (!t || l) {
          if (u = l && t.replace(s, "")) u = u.split(".");
          f(e, i, n, u)
        } else if (typeof t == "function") f(e, null, t);
        else
        for (r in t) t.hasOwnProperty(r) && I(e, r, t[r]);
        return e
        },
        q = function(e, t, n, r, i) {
        var s, o, u, a, f = n,
            l = n && typeof n == "string";
        if (t && !n && typeof t == "object") for (s in t) t.hasOwnProperty(s) && q.apply(this, [e, s, t[s]]);
        else {
          a = arguments.length > 3 ? y.call(arguments, 3) : [], o = (l ? n : t).split(" "), l && (n = F(t, f = r, i || O)) && (a = y.call(a, 1)), this === x && (n = H(I, e, t, n, f));
          for (u = o.length; u--;) j(e, o[u], n, f, a)
        }
        return e
        },
        R = function() {
        return q.apply(x, arguments)
        },
        U = m ?
        function(e, t, r) {
        var i = d.createEvent(e ? "HTMLEvents" : "UIEvents");
        i[e ? "initEvent" : "initUIEvent"](t, !0, !0, n, 1), r.dispatchEvent(i)
        } : function(e, t, n) {
        n = k(n, e), e ? n.fireEvent("on" + t, d.createEventObject()) : n["_on" + t]++
        },
        z = function(e, t, n) {
        var r, i, u, a, f, l = t.split(" ");
        for (r = l.length; r--;) {
          t = l[r].replace(o, "");
          if (a = l[r].replace(s, "")) a = a.split(".");
          if (!a && !n && e[g]) U(T[t], t, e);
          else {
            f = A.get(e, t), n = [!1].concat(n);
            for (i = 0, u = f.length; i < u; i++) f[i].inNamespaces(a) && f[i].handler.apply(e, n)
          }
        }
        return e
        },
        W = function(e, t, n) {
        var r = 0,
            i = A.get(t, n),
            s = i.length,
            o, u;
        for (; r < s; r++) i[r].original && (u = i[r].handler.__beanDel, u ? o = [e, u.selector, i[r].type, i[r].original, u.$] : o = [e, i[r].type, i[r].original], q.apply(null, o));
        return e
        },
        X = {
        add: q,
        one: R,
        remove: I,
        clone: W,
        fire: z,
        setSelectorEngine: M,
        noConflict: function() {
          return t[e] = r, this
        }
        };
    if (n[a]) {
      var V = function() {
        var e, t = A.entries();
        for (e in t) t[e].type && t[e].type !== "unload" && I(t[e].element, t[e].type);
        n[l]("onunload", V), n.CollectGarbage && n.CollectGarbage()
      };
      n[a]("onunload", V)
    }
    return X
  }), !
  function(e, t) {
    typeof module != "undefined" ? module.exports = t() : typeof define == "function" && define.amd ? define(t) : this[e] = t()
  }("reqwest", function() {
    function handleReadyState(e, t, n) {
      return function() {
        e && e[readyState] == 4 && (twoHundo.test(e.status) ? t(e) : n(e))
      }
    }
    function setHeaders(e, t) {
      var n = t.headers || {},
          r;
      n.Accept = n.Accept || defaultHeaders.accept[t.type] || defaultHeaders.accept["*"], !t.crossOrigin && !n[requestedWith] && (n[requestedWith] = defaultHeaders.requestedWith), n[contentType] || (n[contentType] = t.contentType || defaultHeaders.contentType);
      for (r in n) n.hasOwnProperty(r) && e.setRequestHeader(r, n[r])
    }
    function setCredentials(e, t) {
      typeof t.withCredentials != "undefined" && typeof e.withCredentials != "undefined" && (e.withCredentials = !! t.withCredentials)
    }
    function generalCallback(e) {
      lastValue = e
    }
    function urlappend(e, t) {
      return e + (/\?/.test(e) ? "&" : "?") + t
    }
    function handleJsonp(e, t, n, r) {
      var i = uniqid++,
          s = e.jsonpCallback || "callback",
          o = e.jsonpCallbackName || reqwest.getcallbackPrefix(i),
          u = new RegExp("((^|\\?|&)" + s + ")=([^&]+)"),
          a = r.match(u),
          f = doc.createElement("script"),
          l = 0,
          c = navigator.userAgent.indexOf("MSIE 10.0") !== -1;
      a ? a[3] === "?" ? r = r.replace(u, "$1=" + o) : o = a[3] : r = urlappend(r, s + "=" + o), win[o] = generalCallback, f.type = "text/javascript", f.src = r, f.async = !0, typeof f.onreadystatechange != "undefined" && !c && (f.event = "onclick", f.htmlFor = f.id = "_reqwest_" + i), f.onload = f.onreadystatechange = function() {
        if (f[readyState] && f[readyState] !== "complete" && f[readyState] !== "loaded" || l) return !1;
        f.onload = f.onreadystatechange = null, f.onclick && f.onclick(), e.success && e.success(lastValue), lastValue = undefined, head.removeChild(f), l = 1
      }, head.appendChild(f)
    }
    function getRequest(e, t, n) {
      var r = (e.method || "GET").toUpperCase(),
          i = typeof e == "string" ? e : e.url,
          s = e.processData !== !1 && e.data && typeof e.data != "string" ? reqwest.toQueryString(e.data) : e.data || null,
          o;
      return (e.type == "jsonp" || r == "GET") && s && (i = urlappend(i, s), s = null), e.type == "jsonp" ? handleJsonp(e, t, n, i) : (o = xhr(), o.open(r, i, !0), setHeaders(o, e), setCredentials(o, e), o.onreadystatechange = handleReadyState(o, t, n), e.before && e.before(o), o.send(s), o)
    }
    function Reqwest(e, t) {
      this.o = e, this.fn = t, init.apply(this, arguments)
    }
    function setType(e) {
      var t = e.match(/\.(json|jsonp|html|xml)(\?|$)/);
      return t ? t[1] : "js"
    }
    function init(o, fn) {
      function complete(e) {
        o.timeout && clearTimeout(self.timeout), self.timeout = null;
        while (self._completeHandlers.length > 0) self._completeHandlers.shift()(e)
      }
      function success(resp) {
        var r = resp.responseText;
        if (r) switch (type) {
        case "json":
          try {
            resp = win.JSON ? win.JSON.parse(r) : eval("(" + r + ")")
          } catch (err) {
            return error(resp, "Could not parse JSON in response", err)
          }
          break;
        case "js":
          resp = eval(r);
          break;
        case "html":
          resp = r;
          break;
        case "xml":
          resp = resp.responseXML
        }
        self._responseArgs.resp = resp, self._fulfilled = !0, fn(resp);
        while (self._fulfillmentHandlers.length > 0) self._fulfillmentHandlers.shift()(resp);
        complete(resp)
      }
      function error(e, t, n) {
        self._responseArgs.resp = e, self._responseArgs.msg = t, self._responseArgs.t = n, self._erred = !0;
        while (self._errorHandlers.length > 0) self._errorHandlers.shift()(e, t, n);
        complete(e)
      }
      this.url = typeof o == "string" ? o : o.url, this.timeout = null, this._fulfilled = !1, this._fulfillmentHandlers = [], this._errorHandlers = [], this._completeHandlers = [], this._erred = !1, this._responseArgs = {};
      var self = this,
          type = o.type || setType(this.url);
      fn = fn ||
      function() {}, o.timeout && (this.timeout = setTimeout(function() {
        self.abort()
      }, o.timeout)), o.success && this._fulfillmentHandlers.push(function() {
        o.success.apply(o, arguments)
      }), o.error && this._errorHandlers.push(function() {
        o.error.apply(o, arguments)
      }), o.complete && this._completeHandlers.push(function() {
        o.complete.apply(o, arguments)
      }), this.request = getRequest(o, success, error)
    }
    function reqwest(e, t) {
      return new Reqwest(e, t)
    }
    function normalize(e) {
      return e ? e.replace(/\r?\n/g, "\r\n") : ""
    }
    function serial(e, t) {
      var n = e.name,
          r = e.tagName.toLowerCase(),
          i = function(e) {
          e && !e.disabled && t(n, normalize(e.attributes.value && e.attributes.value.specified ? e.value : e.text))
          };
      if (e.disabled || !n) return;
      switch (r) {
      case "input":
        if (!/reset|button|image|file/i.test(e.type)) {
          var s = /checkbox/i.test(e.type),
              o = /radio/i.test(e.type),
              u = e.value;
          (!s && !o || e.checked) && t(n, normalize(s && u === "" ? "on" : u))
        }
        break;
      case "textarea":
        t(n, normalize(e.value));
        break;
      case "select":
        if (e.type.toLowerCase() === "select-one") i(e.selectedIndex >= 0 ? e.options[e.selectedIndex] : null);
        else
        for (var a = 0; e.length && a < e.length; a++) e.options[a].selected && i(e.options[a])
      }
    }
    function eachFormElement() {
      var e = this,
          t, n, r, i = function(t, n) {
          for (var i = 0; i < n.length; i++) {
            var s = t[byTag](n[i]);
            for (r = 0; r < s.length; r++) serial(s[r], e)
          }
          };
      for (n = 0; n < arguments.length; n++) t = arguments[n], /input|select|textarea/i.test(t.tagName) && serial(t, e), i(t, ["input", "select", "textarea"])
    }
    function serializeQueryString() {
      return reqwest.toQueryString(reqwest.serializeArray.apply(null, arguments))
    }
    function serializeHash() {
      var e = {};
      return eachFormElement.apply(function(t, n) {
        t in e ? (e[t] && !isArray(e[t]) && (e[t] = [e[t]]), e[t].push(n)) : e[t] = n
      }, arguments), e
    }
    var win = window,
        doc = document,
        twoHundo = /^20\d$/,
        byTag = "getElementsByTagName",
        readyState = "readyState",
        contentType = "Content-Type",
        requestedWith = "X-Requested-With",
        head = doc[byTag]("head")[0],
        uniqid = 0,
        callbackPrefix = "reqwest_" + +(new Date),
        lastValue, xmlHttpRequest = "XMLHttpRequest",
        isArray = typeof Array.isArray == "function" ? Array.isArray : function(e) {
        return e instanceof Array
        },
        defaultHeaders = {
        contentType: "application/x-www-form-urlencoded",
        requestedWith: xmlHttpRequest,
        accept: {
          "*": "text/javascript, text/html, application/xml, text/xml, */*",
          xml: "application/xml, text/xml",
          html: "text/html",
          text: "text/plain",
          json: "application/json, text/javascript",
          js: "application/javascript, text/javascript"
        }
        },
        xhr = win[xmlHttpRequest] ?
        function() {
        return new XMLHttpRequest
        } : function() {
        return new ActiveXObject("Microsoft.XMLHTTP")
        };
    return Reqwest.prototype = {
      abort: function() {
        this.request.abort()
      },
      retry: function() {
        init.call(this, this.o, this.fn)
      },
      then: function(e, t) {
        return this._fulfilled ? e(this._responseArgs.resp) : this._erred ? t(this._responseArgs.resp, this._responseArgs.msg, this._responseArgs.t) : (this._fulfillmentHandlers.push(e), this._errorHandlers.push(t)), this
      },
      always: function(e) {
        return this._fulfilled || this._erred ? e(this._responseArgs.resp) : this._completeHandlers.push(e), this
      },
      fail: function(e) {
        return this._erred ? e(this._responseArgs.resp, this._responseArgs.msg, this._responseArgs.t) : this._errorHandlers.push(e), this
      }
    }, reqwest.serializeArray = function() {
      var e = [];
      return eachFormElement.apply(function(t, n) {
        e.push({
          name: t,
          value: n
        })
      }, arguments), e
    }, reqwest.serialize = function() {
      if (arguments.length === 0) return "";
      var e, t, n = Array.prototype.slice.call(arguments, 0);
      return e = n.pop(), e && e.nodeType && n.push(e) && (e = null), e && (e = e.type), e == "map" ? t = serializeHash : e == "array" ? t = reqwest.serializeArray : t = serializeQueryString, t.apply(null, n)
    }, reqwest.toQueryString = function(e) {
      var t = "",
          n, r = encodeURIComponent,
          i = function(e, n) {
          t += r(e) + "=" + r(n) + "&"
          };
      if (isArray(e)) for (n = 0; e && n < e.length; n++) i(e[n].name, e[n].value);
      else
      for (var s in e) {
        if (!Object.hasOwnProperty.call(e, s)) continue;
        var o = e[s];
        if (isArray(o)) for (n = 0; n < o.length; n++) i(s, o[n]);
        else i(s, e[s])
      }
      return t.replace(/&$/, "").replace(/%20/g, "+")
    }, reqwest.getcallbackPrefix = function(e) {
      return callbackPrefix
    }, reqwest.compat = function(e, t) {
      return e && (e.type && (e.method = e.type) && delete e.type, e.dataType && (e.type = e.dataType), e.jsonpCallback && (e.jsonpCallbackName = e.jsonpCallback) && delete e.jsonpCallback, e.jsonp && (e.jsonpCallback = e.jsonp)), new Reqwest(e, t)
    }, reqwest
  })
}();
var Mustache = function() {
  function o(e) {
    return String(e).replace(/&(?!\w+;)|[<>"']/g, function(e) {
      return s[e] || e
    })
  }
  var e = Object.prototype.toString;
  Array.isArray = Array.isArray ||
  function(t) {
    return e.call(t) == "[object Array]"
  };
  var t = String.prototype.trim,
      n;
  if (t) n = function(e) {
    return e == null ? "" : t.call(e)
  };
  else {
    var r, i;
    /\S/.test("Â ") ? (r = /^[\s\xA0]+/, i = /[\s\xA0]+$/) : (r = /^\s+/, i = /\s+$/), n = function(e) {
      return e == null ? "" : e.toString().replace(r, "").replace(i, "")
    }
  }
  var s = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  },
      u = {},
      a = function() {};
  return a.prototype = {
    otag: "{{",
    ctag: "}}",
    pragmas: {},
    buffer: [],
    pragmas_implemented: {
      "IMPLICIT-ITERATOR": !0
    },
    context: {},
    render: function(e, t, n, r) {
      r || (this.context = t, this.buffer = []);
      if (!this.includes("", e)) {
        if (r) return e;
        this.send(e);
        return
      }
      e = this.render_pragmas(e);
      var i = this.render_section(e, t, n);
      i === !1 && (i = this.render_tags(e, t, n, r));
      if (r) return i;
      this.sendLines(i)
    },
    send: function(e) {
      e !== "" && this.buffer.push(e)
    },
    sendLines: function(e) {
      if (e) {
        var t = e.split("\n");
        for (var n = 0; n < t.length; n++) this.send(t[n])
      }
    },
    render_pragmas: function(e) {
      if (!this.includes("%", e)) return e;
      var t = this,
          n = this.getCachedRegex("render_pragmas", function(e, t) {
          return new RegExp(e + "%([\\w-]+) ?([\\w]+=[\\w]+)?" + t, "g")
        });
      return e.replace(n, function(e, n, r) {
        if (!t.pragmas_implemented[n]) throw {
          message: "This implementation of mustache doesn't understand the '" + n + "' pragma"
        };
        t.pragmas[n] = {};
        if (r) {
          var i = r.split("=");
          t.pragmas[n][i[0]] = i[1]
        }
        return ""
      })
    },
    render_partial: function(e, t, r) {
      e = n(e);
      if (!r || r[e] === undefined) throw {
        message: "unknown_partial '" + e + "'"
      };
      return !t || typeof t[e] != "object" ? this.render(r[e], t, r, !0) : this.render(r[e], t[e], r, !0)
    },
    render_section: function(e, t, n) {
      if (!this.includes("#", e) && !this.includes("^", e)) return !1;
      var r = this,
          i = this.getCachedRegex("render_section", function(e, t) {
          return new RegExp("^([\\s\\S]*?)" + e + "(\\^|\\#)\\s*(.+)\\s*" + t + "\n*([\\s\\S]*?)" + e + "\\/\\s*\\3\\s*" + t + "\\s*([\\s\\S]*)$", "g")
        });
      return e.replace(i, function(e, i, s, o, u, a) {
        var f = i ? r.render_tags(i, t, n, !0) : "",
            l = a ? r.render(a, t, n, !0) : "",
            c, h = r.find(o, t);
        return s === "^" ? !h || Array.isArray(h) && h.length === 0 ? c = r.render(u, t, n, !0) : c = "" : s === "#" && (Array.isArray(h) ? c = r.map(h, function(e) {
          return r.render(u, r.create_context(e), n, !0)
        }).join("") : r.is_object(h) ? c = r.render(u, r.create_context(h), n, !0) : typeof h == "function" ? c = h.call(t, u, function(e) {
          return r.render(e, t, n, !0)
        }) : h ? c = r.render(u, t, n, !0) : c = ""), f + c + l
      })
    },
    render_tags: function(e, t, n, r) {
      var i = this,
          s = function() {
          return i.getCachedRegex("render_tags", function(e, t) {
            return new RegExp(e + "(=|!|>|&|\\{|%)?([^#\\^]+?)\\1?" + t + "+", "g")
          })
          },
          u = s(),
          a = function(e, r, a) {
          switch (r) {
          case "!":
            return "";
          case "=":
            return i.set_delimiters(a), u = s(), "";
          case ">":
            return i.render_partial(a, t, n);
          case "{":
          case "&":
            return i.find(a, t);
          default:
            return o(i.find(a, t))
          }
          },
          f = e.split("\n");
      for (var l = 0; l < f.length; l++) f[l] = f[l].replace(u, a, this), r || this.send(f[l]);
      if (r) return f.join("\n")
    },
    set_delimiters: function(e) {
      var t = e.split(" ");
      this.otag = this.escape_regex(t[0]), this.ctag = this.escape_regex(t[1])
    },
    escape_regex: function(e) {
      if (!arguments.callee.sRE) {
        var t = ["/", ".", "*", "+", "?", "|", "(", ")", "[", "]", "{", "}", "\\"];
        arguments.callee.sRE = new RegExp("(\\" + t.join("|\\") + ")", "g")
      }
      return e.replace(arguments.callee.sRE, "\\$1")
    },
    find: function(e, t) {
      function r(e) {
        return e === !1 || e === 0 || e
      }
      e = n(e);
      var i;
      if (e.match(/([a-z_]+)\./ig)) {
        var s = this.walk_context(e, t);
        r(s) && (i = s)
      } else r(t[e]) ? i = t[e] : r(this.context[e]) && (i = this.context[e]);
      return typeof i == "function" ? i.apply(t) : i !== undefined ? i : ""
    },
    walk_context: function(e, t) {
      var n = e.split("."),
          r = t[n[0]] != undefined ? t : this.context,
          i = r[n.shift()];
      while (i != undefined && n.length > 0) r = i, i = i[n.shift()];
      return typeof i == "function" ? i.apply(r) : i
    },
    includes: function(e, t) {
      return t.indexOf(this.otag + e) != -1
    },
    create_context: function(e) {
      if (this.is_object(e)) return e;
      var t = ".";
      this.pragmas["IMPLICIT-ITERATOR"] && (t = this.pragmas["IMPLICIT-ITERATOR"].iterator);
      var n = {};
      return n[t] = e, n
    },
    is_object: function(e) {
      return e && typeof e == "object"
    },
    map: function(e, t) {
      if (typeof e.map == "function") return e.map(t);
      var n = [],
          r = e.length;
      for (var i = 0; i < r; i++) n.push(t(e[i]));
      return n
    },
    getCachedRegex: function(e, t) {
      var n = u[this.otag];
      n || (n = u[this.otag] = {});
      var r = n[this.ctag];
      r || (r = n[this.ctag] = {});
      var i = r[e];
      return i || (i = r[e] = t(this.otag, this.ctag)), i
    }
  }, {
    name: "mustache.js",
    version: "0.4.0",
    to_html: function(e, t, n, r) {
      var i = new a;
      r && (i.send = r), i.render(e, t || {}, n);
      if (!r) return i.buffer.join("\n")
    }
  }
}();
typeof module != "undefined" && module.exports && (exports.name = Mustache.name, exports.version = Mustache.version, exports.to_html = function() {
  return Mustache.to_html.apply(this, arguments)
});
var previousMM = MM;
if (!com) {
  var com = {};
  com.modestmaps || (com.modestmaps = {})
}
var MM = com.modestmaps = {
  noConflict: function() {
    return MM = previousMM, this
  }
};
(function(e) {
  e.extend = function(e, t) {
    for (var n in t.prototype) typeof e.prototype[n] == "undefined" && (e.prototype[n] = t.prototype[n]);
    return e
  }, e.getFrame = function() {
    return function(e) {
      (window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
      function(e) {
        window.setTimeout(function() {
          e(+(new Date))
        }, 10)
      })(e)
    }
  }(), e.transformProperty = function(e) {
    if (!this.document) return;
    var t = document.documentElement.style;
    for (var n = 0; n < e.length; n++) if (e[n] in t) return e[n];
    return !1
  }(["transform", "WebkitTransform", "OTransform", "MozTransform", "msTransform"]), e.matrixString = function(t) {
    t.scale * t.width % 1 && (t.scale += (1 - t.scale * t.width % 1) / t.width);
    var n = t.scale || 1;
    return e._browser.webkit3d ? "translate3d(" + t.x.toFixed(0) + "px," + t.y.toFixed(0) + "px, 0px)" + "scale3d(" + n + "," + n + ", 1)" : "translate(" + t.x.toFixed(6) + "px," + t.y.toFixed(6) + "px)" + "scale(" + n + "," + n + ")"
  }, e._browser = function(e) {
    return {
      webkit: "WebKitCSSMatrix" in e,
      webkit3d: "WebKitCSSMatrix" in e && "m11" in new WebKitCSSMatrix
    }
  }(this), e.moveElement = function(t, n) {
    if (e.transformProperty) {
      n.scale || (n.scale = 1), n.width || (n.width = 0), n.height || (n.height = 0);
      var r = e.matrixString(n);
      t[e.transformProperty] !== r && (t.style[e.transformProperty] = t[e.transformProperty] = r)
    } else t.style.left = n.x + "px", t.style.top = n.y + "px", n.width && n.height && n.scale && (t.style.width = Math.ceil(n.width * n.scale) + "px", t.style.height = Math.ceil(n.height * n.scale) + "px")
  }, e.cancelEvent = function(e) {
    return e.cancelBubble = !0, e.cancel = !0, e.returnValue = !1, e.stopPropagation && e.stopPropagation(), e.preventDefault && e.preventDefault(), !1
  }, e.coerceLayer = function(t) {
    return typeof t == "string" ? new e.Layer(new e.TemplatedLayer(t)) : "draw" in t && typeof t.draw == "function" ? t : new e.Layer(t)
  }, e.addEvent = function(e, t, n) {
    e.addEventListener ? (e.addEventListener(t, n, !1), t == "mousewheel" && e.addEventListener("DOMMouseScroll", n, !1)) : e.attachEvent && (e["e" + t + n] = n, e[t + n] = function() {
      e["e" + t + n](window.event)
    }, e.attachEvent("on" + t, e[t + n]))
  }, e.removeEvent = function(e, t, n) {
    e.removeEventListener ? (e.removeEventListener(t, n, !1), t == "mousewheel" && e.removeEventListener("DOMMouseScroll", n, !1)) : e.detachEvent && (e.detachEvent("on" + t, e[t + n]), e[t + n] = null)
  }, e.getStyle = function(e, t) {
    if (e.currentStyle) return e.currentStyle[t];
    if (window.getComputedStyle) return document.defaultView.getComputedStyle(e, null).getPropertyValue(t)
  }, e.Point = function(e, t) {
    this.x = parseFloat(e), this.y = parseFloat(t)
  }, e.Point.prototype = {
    x: 0,
    y: 0,
    toString: function() {
      return "(" + this.x.toFixed(3) + ", " + this.y.toFixed(3) + ")"
    },
    copy: function() {
      return new e.Point(this.x, this.y)
    }
  }, e.Point.distance = function(e, t) {
    return Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2))
  }, e.Point.interpolate = function(t, n, r) {
    return new e.Point(t.x + (n.x - t.x) * r, t.y + (n.y - t.y) * r)
  }, e.Coordinate = function(e, t, n) {
    this.row = e, this.column = t, this.zoom = n
  }, e.Coordinate.prototype = {
    row: 0,
    column: 0,
    zoom: 0,
    toString: function() {
      return "(" + this.row.toFixed(3) + ", " + this.column.toFixed(3) + " @" + this.zoom.toFixed(3) + ")"
    },
    toKey: function() {
      return this.zoom + "," + this.row + "," + this.column
    },
    copy: function() {
      return new e.Coordinate(this.row, this.column, this.zoom)
    },
    container: function() {
      return new e.Coordinate(Math.floor(this.row), Math.floor(this.column), Math.floor(this.zoom))
    },
    zoomTo: function(t) {
      var n = Math.pow(2, t - this.zoom);
      return new e.Coordinate(this.row * n, this.column * n, t)
    },
    zoomBy: function(t) {
      var n = Math.pow(2, t);
      return new e.Coordinate(this.row * n, this.column * n, this.zoom + t)
    },
    up: function(t) {
      return t === undefined && (t = 1), new e.Coordinate(this.row - t, this.column, this.zoom)
    },
    right: function(t) {
      return t === undefined && (t = 1), new e.Coordinate(this.row, this.column + t, this.zoom)
    },
    down: function(t) {
      return t === undefined && (t = 1), new e.Coordinate(this.row + t, this.column, this.zoom)
    },
    left: function(t) {
      return t === undefined && (t = 1), new e.Coordinate(this.row, this.column - t, this.zoom)
    }
  }, e.Location = function(e, t) {
    this.lat = parseFloat(e), this.lon = parseFloat(t)
  }, e.Location.prototype = {
    lat: 0,
    lon: 0,
    toString: function() {
      return "(" + this.lat.toFixed(3) + ", " + this.lon.toFixed(3) + ")"
    },
    copy: function() {
      return new e.Location(this.lat, this.lon)
    }
  }, e.Location.distance = function(e, t, n) {
    n || (n = 6378e3);
    var r = Math.PI / 180,
        i = e.lat * r,
        s = e.lon * r,
        o = t.lat * r,
        u = t.lon * r,
        a = Math.cos(i) * Math.cos(s) * Math.cos(o) * Math.cos(u),
        f = Math.cos(i) * Math.sin(s) * Math.cos(o) * Math.sin(u),
        l = Math.sin(i) * Math.sin(o);
    return Math.acos(a + f + l) * n
  }, e.Location.interpolate = function(t, n, r) {
    if (t.lat === n.lat && t.lon === n.lon) return new e.Location(t.lat, t.lon);
    var i = Math.PI / 180,
        s = t.lat * i,
        o = t.lon * i,
        u = n.lat * i,
        a = n.lon * i,
        f = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin((s - u) / 2), 2) + Math.cos(s) * Math.cos(u) * Math.pow(Math.sin((o - a) / 2), 2))),
        l = Math.sin((1 - r) * f) / Math.sin(f),
        c = Math.sin(r * f) / Math.sin(f),
        h = l * Math.cos(s) * Math.cos(o) + c * Math.cos(u) * Math.cos(a),
        p = l * Math.cos(s) * Math.sin(o) + c * Math.cos(u) * Math.sin(a),
        d = l * Math.sin(s) + c * Math.sin(u),
        v = Math.atan2(d, Math.sqrt(Math.pow(h, 2) + Math.pow(p, 2))),
        m = Math.atan2(p, h);
    return new e.Location(v / i, m / i)
  }, e.Location.bearing = function(e, t) {
    var n = Math.PI / 180,
        r = e.lat * n,
        i = e.lon * n,
        s = t.lat * n,
        o = t.lon * n,
        u = Math.atan2(Math.sin(i - o) * Math.cos(s), Math.cos(r) * Math.sin(s) - Math.sin(r) * Math.cos(s) * Math.cos(i - o)) / -(Math.PI / 180);
    return u < 0 ? u + 360 : u
  }, e.Extent = function(t, n, r, i) {
    if (t instanceof e.Location && n instanceof e.Location) {
      var s = t,
          o = n;
      t = s.lat, n = s.lon, r = o.lat, i = o.lon
    }
    isNaN(r) && (r = t), isNaN(i) && (i = n), this.north = Math.max(t, r), this.south = Math.min(t, r), this.east = Math.max(i, n), this.west = Math.min(i, n)
  }, e.Extent.prototype = {
    north: 0,
    south: 0,
    east: 0,
    west: 0,
    copy: function() {
      return new e.Extent(this.north, this.west, this.south, this.east)
    },
    toString: function(e) {
      return isNaN(e) && (e = 3), [this.north.toFixed(e), this.west.toFixed(e), this.south.toFixed(e), this.east.toFixed(e)].join(", ")
    },
    northWest: function() {
      return new e.Location(this.north, this.west)
    },
    southEast: function() {
      return new e.Location(this.south, this.east)
    },
    northEast: function() {
      return new e.Location(this.north, this.east)
    },
    southWest: function() {
      return new e.Location(this.south, this.west)
    },
    center: function() {
      return new e.Location(this.south + (this.north - this.south) / 2, this.east + (this.west - this.east) / 2)
    },
    encloseLocation: function(e) {
      e.lat > this.north && (this.north = e.lat), e.lat < this.south && (this.south = e.lat), e.lon > this.east && (this.east = e.lon), e.lon < this.west && (this.west = e.lon)
    },
    encloseLocations: function(e) {
      var t = e.length;
      for (var n = 0; n < t; n++) this.encloseLocation(e[n])
    },
    setFromLocations: function(e) {
      var t = e.length,
          n = e[0];
      this.north = this.south = n.lat, this.east = this.west = n.lon;
      for (var r = 1; r < t; r++) this.encloseLocation(e[r])
    },
    encloseExtent: function(e) {
      e.north > this.north && (this.north = e.north), e.south < this.south && (this.south = e.south), e.east > this.east && (this.east = e.east), e.west < this.west && (this.west = e.west)
    },
    containsLocation: function(e) {
      return e.lat >= this.south && e.lat <= this.north && e.lon >= this.west && e.lon <= this.east
    },
    toArray: function() {
      return [this.northWest(), this.southEast()]
    }
  }, e.Extent.fromString = function(t) {
    var n = t.split(/\s*,\s*/);
    if (n.length != 4) throw "Invalid extent string (expecting 4 comma-separated numbers)";
    return new e.Extent(parseFloat(n[0]), parseFloat(n[1]), parseFloat(n[2]), parseFloat(n[3]))
  }, e.Extent.fromArray = function(t) {
    var n = new e.Extent;
    return n.setFromLocations(t), n
  }, e.Transformation = function(e, t, n, r, i, s) {
    this.ax = e, this.bx = t, this.cx = n, this.ay = r, this.by = i, this.cy = s
  }, e.Transformation.prototype = {
    ax: 0,
    bx: 0,
    cx: 0,
    ay: 0,
    by: 0,
    cy: 0,
    transform: function(t) {
      return new e.Point(this.ax * t.x + this.bx * t.y + this.cx, this.ay * t.x + this.by * t.y + this.cy)
    },
    untransform: function(t) {
      return new e.Point((t.x * this.by - t.y * this.bx - this.cx * this.by + this.cy * this.bx) / (this.ax * this.by - this.ay * this.bx), (t.x * this.ay - t.y * this.ax - this.cx * this.ay + this.cy * this.ax) / (this.bx * this.ay - this.by * this.ax))
    }
  }, e.deriveTransformation = function(t, n, r, i, s, o, u, a, f, l, c, h) {
    var p = e.linearSolution(t, n, r, s, o, u, f, l, c),
        d = e.linearSolution(t, n, i, s, o, a, f, l, h);
    return new e.Transformation(p[0], p[1], p[2], d[0], d[1], d[2])
  }, e.linearSolution = function(e, t, n, r, i, s, o, u, a) {
    e = parseFloat(e), t = parseFloat(t), n = parseFloat(n), r = parseFloat(r), i = parseFloat(i), s = parseFloat(s), o = parseFloat(o), u = parseFloat(u), a = parseFloat(a);
    var f = ((s - a) * (t - i) - (n - s) * (i - u)) / ((r - o) * (t - i) - (e - r) * (i - u)),
        l = ((s - a) * (e - r) - (n - s) * (r - o)) / ((i - u) * (e - r) - (t - i) * (r - o)),
        c = n - e * f - t * l;
    return [f, l, c]
  }, e.Projection = function(t, n) {
    n || (n = new e.Transformation(1, 0, 0, 0, 1, 0)), this.zoom = t, this.transformation = n
  }, e.Projection.prototype = {
    zoom: 0,
    transformation: null,
    rawProject: function(e) {
      throw "Abstract method not implemented by subclass."
    },
    rawUnproject: function(e) {
      throw "Abstract method not implemented by subclass."
    },
    project: function(e) {
      return e = this.rawProject(e), this.transformation && (e = this.transformation.transform(e)), e
    },
    unproject: function(e) {
      return this.transformation && (e = this.transformation.untransform(e)), e = this.rawUnproject(e), e
    },
    locationCoordinate: function(t) {
      var n = new e.Point(Math.PI * t.lon / 180, Math.PI * t.lat / 180);
      return n = this.project(n), new e.Coordinate(n.y, n.x, this.zoom)
    },
    coordinateLocation: function(t) {
      t = t.zoomTo(this.zoom);
      var n = new e.Point(t.column, t.row);
      return n = this.unproject(n), new e.Location(180 * n.y / Math.PI, 180 * n.x / Math.PI)
    }
  }, e.LinearProjection = function(t, n) {
    e.Projection.call(this, t, n)
  }, e.LinearProjection.prototype = {
    rawProject: function(t) {
      return new e.Point(t.x, t.y)
    },
    rawUnproject: function(t) {
      return new e.Point(t.x, t.y)
    }
  }, e.extend(e.LinearProjection, e.Projection), e.MercatorProjection = function(t, n) {
    e.Projection.call(this, t, n)
  }, e.MercatorProjection.prototype = {
    rawProject: function(t) {
      return new e.Point(t.x, Math.log(Math.tan(.25 * Math.PI + .5 * t.y)))
    },
    rawUnproject: function(t) {
      return new e.Point(t.x, 2 * Math.atan(Math.pow(Math.E, t.y)) - .5 * Math.PI)
    }
  }, e.extend(e.MercatorProjection, e.Projection), e.MapProvider = function(e) {
    e && (this.getTile = e)
  }, e.MapProvider.prototype = {
    tileLimits: [new e.Coordinate(0, 0, 0), (new e.Coordinate(1, 1, 0)).zoomTo(18)],
    getTileUrl: function(e) {
      throw "Abstract method not implemented by subclass."
    },
    getTile: function(e) {
      throw "Abstract method not implemented by subclass."
    },
    releaseTile: function(e) {},
    setZoomRange: function(e, t) {
      this.tileLimits[0] = this.tileLimits[0].zoomTo(e), this.tileLimits[1] = this.tileLimits[1].zoomTo(t)
    },
    sourceCoordinate: function(t) {
      var n = this.tileLimits[0].zoomTo(t.zoom).container(),
          r = this.tileLimits[1].zoomTo(t.zoom),
          i = Math.pow(2, t.zoom),
          s;
      return r = new e.Coordinate(Math.ceil(r.row), Math.ceil(r.column), Math.floor(r.zoom)), t.column < 0 ? s = (t.column % i + i) % i : s = t.column % i, t.row < n.row || t.row >= r.row ? null : s < n.column || s >= r.column ? null : new e.Coordinate(t.row, s, t.zoom)
    }
  }, e.Template = function(t, n) {
    function s(e, t, n) {
      var r = "";
      for (var i = 1; i <= n; i++) r += (e >> n - i & 1) << 1 | t >> n - i & 1;
      return r || "0"
    }
    var r = t.match(/{(Q|quadkey)}/);
    r && (t = t.replace("{subdomains}", "{S}").replace("{zoom}", "{Z}").replace("{quadkey}", "{Q}"));
    var i = n && n.length && t.indexOf("{S}") >= 0,
        o = function(e) {
        var o = this.sourceCoordinate(e);
        if (!o) return null;
        var u = t;
        if (i) {
          var a = parseInt(o.zoom + o.row + o.column, 10) % n.length;
          u = u.replace("{S}", n[a])
        }
        return r ? u.replace("{Z}", o.zoom.toFixed(0)).replace("{Q}", s(o.row, o.column, o.zoom)) : u.replace("{Z}", o.zoom.toFixed(0)).replace("{X}", o.column.toFixed(0)).replace("{Y}", o.row.toFixed(0))
        };
    e.MapProvider.call(this, o)
  }, e.Template.prototype = {
    getTile: function(e) {
      return this.getTileUrl(e)
    }
  }, e.extend(e.Template, e.MapProvider), e.TemplatedLayer = function(t, n, r) {
    return new e.Layer(new e.Template(t, n), null, r)
  }, e.getMousePoint = function(t, n) {
    var r = new e.Point(t.clientX, t.clientY);
    r.x += document.body.scrollLeft + document.documentElement.scrollLeft, r.y += document.body.scrollTop + document.documentElement.scrollTop;
    for (var i = n.parent; i; i = i.offsetParent) r.x -= i.offsetLeft, r.y -= i.offsetTop;
    return r
  }, e.MouseWheelHandler = function() {
    function o(t) {
      var o = 0;
      i = i || (new Date).getTime();
      try {
        r.scrollTop = 1e3, r.dispatchEvent(t), o = 1e3 - r.scrollTop
      } catch (u) {
        o = t.wheelDelta || -t.detail * 5
      }
      var a = (new Date).getTime() - i,
          f = e.getMousePoint(t, n);
      return Math.abs(o) > 0 && a > 200 && !s ? (n.zoomByAbout(o > 0 ? 1 : -1, f), i = (new Date).getTime()) : s && n.zoomByAbout(o * .001, f), e.cancelEvent(t)
    }
    var t = {},
        n, r, i, s = !1;
    return t.init = function(i) {
      n = i, r = document.body.appendChild(document.createElement("div")), r.style.cssText = "visibility:hidden;top:0;height:0;width:0;overflow-y:scroll";
      var s = r.appendChild(document.createElement("div"));
      return s.style.height = "2000px", e.addEvent(n.parent, "mousewheel", o), t
    }, t.precise = function(e) {
      return arguments.length ? (s = e, t) : s
    }, t.remove = function() {
      e.removeEvent(n.parent, "mousewheel", o), r.parentNode.removeChild(r)
    }, t
  }, e.DoubleClickHandler = function() {
    function r(t) {
      var r = e.getMousePoint(t, n);
      return n.zoomByAbout(t.shiftKey ? -1 : 1, r), e.cancelEvent(t)
    }
    var t = {},
        n;
    return t.init = function(i) {
      return n = i, e.addEvent(n.parent, "dblclick", r), t
    }, t.remove = function() {
      e.removeEvent(n.parent, "dblclick", r)
    }, t
  }, e.DragHandler = function() {
    function i(t) {
      if (t.shiftKey || t.button == 2) return;
      return e.addEvent(document, "mouseup", s), e.addEvent(document, "mousemove", o), n = new e.Point(t.clientX, t.clientY), r.parent.style.cursor = "move", e.cancelEvent(t)
    }
    function s(t) {
      return e.removeEvent(document, "mouseup", s), e.removeEvent(document, "mousemove", o), n = null, r.parent.style.cursor = "", e.cancelEvent(t)
    }
    function o(t) {
      return n && (r.panBy(t.clientX - n.x, t.clientY - n.y), n.x = t.clientX, n.y = t.clientY, n.t = +(new Date)), e.cancelEvent(t)
    }
    var t = {},
        n, r;
    return t.init = function(n) {
      return r = n, e.addEvent(r.parent, "mousedown", i), t
    }, t.remove = function() {
      e.removeEvent(r.parent, "mousedown", i)
    }, t
  }, e.MouseHandler = function() {
    var t = {},
        n, r;
    return t.init = function(i) {
      return n = i, r = [e.DragHandler().init(n), e.DoubleClickHandler().init(n), e.MouseWheelHandler().init(n)], t
    }, t.remove = function() {
      for (var e = 0; e < r.length; e++) r[e].remove();
      return t
    }, t
  }, e.TouchHandler = function() {
    function c() {
      var e = document.createElement("div");
      return e.setAttribute("ongesturestart", "return;"), typeof e.ongesturestart == "function"
    }
    function h(e) {
      for (var t = 0; t < e.touches.length; t += 1) {
        var n = e.touches[t];
        if (n.identifier in o) {
          var r = o[n.identifier];
          r.x = n.clientX, r.y = n.clientY, r.scale = e.scale
        } else o[n.identifier] = {
          scale: e.scale,
          startPos: {
            x: n.clientX,
            y: n.clientY
          },
          x: n.clientX,
          y: n.clientY,
          time: (new Date).getTime()
        }
      }
    }
    function p(e, t) {
      return e && e.touch && t.identifier == e.touch.identifier
    }
    function d(e) {
      h(e)
    }
    function v(t) {
      switch (t.touches.length) {
      case 1:
        w(t.touches[0]);
        break;
      case 2:
        E(t)
      }
      return h(t), e.cancelEvent(t)
    }
    function m(t) {
      var n = (new Date).getTime();
      t.touches.length === 0 && f && S(l);
      for (var s = 0; s < t.changedTouches.length; s += 1) {
        var u = t.changedTouches[s],
            a = o[u.identifier];
        if (!a || a.wasPinch) continue;
        var c = {
          x: u.clientX,
          y: u.clientY
        },
            h = n - a.time,
            p = e.Point.distance(c, a.startPos);
        p > i || (h > r ? (c.end = n, c.duration = h, g(c)) : (c.time = n, y(c)))
      }
      var d = {};
      for (var v = 0; v < t.touches.length; v++) d[t.touches[v].identifier] = !0;
      for (var m in o) m in d || delete d[m];
      return e.cancelEvent(t)
    }
    function g(e) {}
    function y(e) {
      if (u.length && e.time - u[0].time < s) {
        b(e), u = [];
        return
      }
      u = [e]
    }
    function b(t) {
      var r = n.getZoom(),
          i = Math.round(r) + 1,
          s = i - r,
          o = new e.Point(t.x, t.y);
      n.zoomByAbout(s, o)
    }
    function w(e) {
      var t = {
        x: e.clientX,
        y: e.clientY
      },
          r = o[e.identifier];
      n.panBy(t.x - r.x, t.y - r.y)
    }
    function E(t) {
      var r = t.touches[0],
          i = t.touches[1],
          s = new e.Point(r.clientX, r.clientY),
          u = new e.Point(i.clientX, i.clientY),
          a = o[r.identifier],
          c = o[i.identifier];
      a.wasPinch = !0, c.wasPinch = !0;
      var h = e.Point.interpolate(s, u, .5);
      n.zoomByAbout(Math.log(t.scale) / Math.LN2 - Math.log(a.scale) / Math.LN2, h);
      var p = e.Point.interpolate(a, c, .5);
      n.panBy(h.x - p.x, h.y - p.y), f = !0, l = h
    }
    function S(e) {
      if (a) {
        var t = n.getZoom(),
            r = Math.round(t);
        n.zoomByAbout(r - t, e)
      }
      f = !1
    }
    var t = {},
        n, r = 250,
        i = 30,
        s = 350,
        o = {},
        u = [],
        a = !0,
        f = !1,
        l = null;
    return t.init = function(r) {
      return n = r, c() ? (e.addEvent(n.parent, "touchstart", d), e.addEvent(n.parent, "touchmove", v), e.addEvent(n.parent, "touchend", m), t) : t
    }, t.remove = function() {
      return c() ? (e.removeEvent(n.parent, "touchstart", d), e.removeEvent(n.parent, "touchmove", v), e.removeEvent(n.parent, "touchend", m), t) : t
    }, t
  }, e.CallbackManager = function(e, t) {
    this.owner = e, this.callbacks = {};
    for (var n = 0; n < t.length; n++) this.callbacks[t[n]] = []
  }, e.CallbackManager.prototype = {
    owner: null,
    callbacks: null,
    addCallback: function(e, t) {
      typeof t == "function" && this.callbacks[e] && this.callbacks[e].push(t)
    },
    removeCallback: function(e, t) {
      if (typeof t == "function" && this.callbacks[e]) {
        var n = this.callbacks[e],
            r = n.length;
        for (var i = 0; i < r; i++) if (n[i] === t) {
          n.splice(i, 1);
          break
        }
      }
    },
    dispatchCallback: function(e, t) {
      if (this.callbacks[e]) for (var n = 0; n < this.callbacks[e].length; n += 1) try {
        this.callbacks[e][n](this.owner, t)
      } catch (r) {}
    }
  }, e.RequestManager = function() {
    this.loadingBay = document.createDocumentFragment(), this.requestsById = {}, this.openRequestCount = 0, this.maxOpenRequests = 4, this.requestQueue = [], this.callbackManager = new e.CallbackManager(this, ["requestcomplete", "requesterror"])
  }, e.RequestManager.prototype = {
    loadingBay: null,
    requestsById: null,
    requestQueue: null,
    openRequestCount: null,
    maxOpenRequests: null,
    callbackManager: null,
    addCallback: function(e, t) {
      this.callbackManager.addCallback(e, t)
    },
    removeCallback: function(e, t) {
      this.callbackManager.removeCallback(e, t)
    },
    dispatchCallback: function(e, t) {
      this.callbackManager.dispatchCallback(e, t)
    },
    clear: function() {
      this.clearExcept({})
    },
    clearRequest: function(e) {
      e in this.requestsById && delete this.requestsById[e];
      for (var t = 0; t < this.requestQueue.length; t++) {
        var n = this.requestQueue[t];
        n && n.id == e && (this.requestQueue[t] = null)
      }
    },
    clearExcept: function(e) {
      for (var t = 0; t < this.requestQueue.length; t++) {
        var n = this.requestQueue[t];
        n && !(n.id in e) && (this.requestQueue[t] = null)
      }
      var r = this.loadingBay.childNodes;
      for (var i = r.length - 1; i >= 0; i--) {
        var s = r[i];
        s.id in e || (this.loadingBay.removeChild(s), this.openRequestCount--, s.src = s.coord = s.onload = s.onerror = null)
      }
      for (var o in this.requestsById) if (!(o in e) && this.requestsById.hasOwnProperty(o)) {
        var u = this.requestsById[o];
        delete this.requestsById[o], u !== null && (u = u.id = u.coord = u.url = null)
      }
    },
    hasRequest: function(e) {
      return e in this.requestsById
    },
    requestTile: function(e, t, n) {
      if (!(e in this.requestsById)) {
        var r = {
          id: e,
          coord: t.copy(),
          url: n
        };
        this.requestsById[e] = r, n && this.requestQueue.push(r)
      }
    },
    getProcessQueue: function() {
      if (!this._processQueue) {
        var e = this;
        this._processQueue = function() {
          e.processQueue()
        }
      }
      return this._processQueue
    },
    processQueue: function(e) {
      e && this.requestQueue.length > 8 && this.requestQueue.sort(e);
      while (this.openRequestCount < this.maxOpenRequests && this.requestQueue.length > 0) {
        var t = this.requestQueue.pop();
        if (t) {
          this.openRequestCount++;
          var n = document.createElement("img");
          n.id = t.id, n.style.position = "absolute", n.coord = t.coord, this.loadingBay.appendChild(n), n.onload = n.onerror = this.getLoadComplete(), n.src = t.url, t = t.id = t.coord = t.url = null
        }
      }
    },
    _loadComplete: null,
    getLoadComplete: function() {
      if (!this._loadComplete) {
        var e = this;
        this._loadComplete = function(t) {
          t = t || window.event;
          var n = t.srcElement || t.target;
          n.onload = n.onerror = null, e.loadingBay.removeChild(n), e.openRequestCount--, delete e.requestsById[n.id], t.type === "load" && (n.complete || n.readyState && n.readyState == "complete") ? e.dispatchCallback("requestcomplete", n) : (e.dispatchCallback("requesterror", {
            element: n,
            url: "" + n.src
          }), n.src = null), setTimeout(e.getProcessQueue(), 0)
        }
      }
      return this._loadComplete
    }
  }, e.Layer = function(t, n, r) {
    this.parent = n || document.createElement("div"), this.parent.style.cssText = "position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; margin: 0; padding: 0; z-index: 0", this.name = r, this.levels = {}, this.requestManager = new e.RequestManager, this.requestManager.addCallback("requestcomplete", this.getTileComplete()), this.requestManager.addCallback("requesterror", this.getTileError()), t && this.setProvider(t)
  }, e.Layer.prototype = {
    map: null,
    parent: null,
    name: null,
    enabled: !0,
    tiles: null,
    levels: null,
    requestManager: null,
    provider: null,
    _tileComplete: null,
    getTileComplete: function() {
      if (!this._tileComplete) {
        var e = this;
        this._tileComplete = function(t, n) {
          e.tiles[n.id] = n, e.positionTile(n)
        }
      }
      return this._tileComplete
    },
    getTileError: function() {
      if (!this._tileError) {
        var e = this;
        this._tileError = function(t, n) {
          n.element.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", e.tiles[n.element.id] = n.element, e.positionTile(n.element)
        }
      }
      return this._tileError
    },
    draw: function() {
      function n(e, n) {
        if (e && n) {
          var r = e.coord,
              i = n.coord;
          if (r.zoom == i.zoom) {
            var s = Math.abs(t.row - r.row - .5) + Math.abs(t.column - r.column - .5),
                o = Math.abs(t.row - i.row - .5) + Math.abs(t.column - i.column - .5);
            return s < o ? 1 : s > o ? -1 : 0
          }
          return r.zoom < i.zoom ? 1 : r.zoom > i.zoom ? -1 : 0
        }
        return e ? 1 : n ? -1 : 0
      }
      if (!this.enabled || !this.map) return;
      var t = this.map.coordinate.zoomTo(Math.round(this.map.coordinate.zoom)),
          r = Math.round(this.map.coordinate.zoom),
          i = this.map.pointCoordinate(new e.Point(0, 0)).zoomTo(r).container(),
          s = this.map.pointCoordinate(this.map.dimensions).zoomTo(r).container().right().down(),
          o = {},
          u = this.createOrGetLevel(i.zoom),
          a = i.copy();
      for (a.column = i.column; a.column <= s.column; a.column++) for (a.row = i.row; a.row <= s.row; a.row++) {
        var f = this.inventoryVisibleTile(u, a);
        while (f.length) o[f.pop()] = !0
      }
      for (var l in this.levels) if (this.levels.hasOwnProperty(l)) {
        var c = parseInt(l, 10);
        if (c >= i.zoom - 5 && c < i.zoom + 2) continue;
        var h = this.levels[l];
        h.style.display = "none";
        var p = this.tileElementsInLevel(h);
        while (p.length) this.provider.releaseTile(p[0].coord), this.requestManager.clearRequest(p[0].coord.toKey()), h.removeChild(p[0]), p.shift()
      }
      var d = i.zoom - 5,
          v = i.zoom + 2;
      for (var m = d; m < v; m++) this.adjustVisibleLevel(this.levels[m], m, o);
      this.requestManager.clearExcept(o), this.requestManager.processQueue(n)
    },
    inventoryVisibleTile: function(e, t) {
      var n = t.toKey(),
          r = [n];
      if (n in this.tiles) {
        var i = this.tiles[n];
        return i.parentNode != e && (e.appendChild(i), "reAddTile" in this.provider && this.provider.reAddTile(n, t, i)), r
      }
      if (!this.requestManager.hasRequest(n)) {
        var s = this.provider.getTile(t);
        typeof s == "string" ? this.addTileImage(n, t, s) : s && this.addTileElement(n, t, s)
      }
      var o = !1,
          u = t.zoom;
      for (var a = 1; a <= u; a++) {
        var f = t.zoomBy(-a).container(),
            l = f.toKey();
        if (l in this.tiles) {
          r.push(l), o = !0;
          break
        }
      }
      if (!o) {
        var c = t.zoomBy(1);
        r.push(c.toKey()), c.column += 1, r.push(c.toKey()), c.row += 1, r.push(c.toKey()), c.column -= 1, r.push(c.toKey())
      }
      return r
    },
    tileElementsInLevel: function(e) {
      var t = [];
      for (var n = e.firstChild; n; n = n.nextSibling) n.nodeType == 1 && t.push(n);
      return t
    },
    adjustVisibleLevel: function(t, n, r) {
      if (!t) return;
      var i = 1,
          s = this.map.coordinate.copy();
      if (!(t.childNodes.length > 0)) return t.style.display = "none", !1;
      t.style.display = "block", i = Math.pow(2, this.map.coordinate.zoom - n), s = s.zoomTo(n);
      var o = this.map.tileSize.x * i,
          u = this.map.tileSize.y * i,
          a = new e.Point(this.map.dimensions.x / 2, this.map.dimensions.y / 2),
          f = this.tileElementsInLevel(t);
      while (f.length) {
        var l = f.pop();
        r[l.id] ? e.moveElement(l, {
          x: Math.round(a.x + (l.coord.column - s.column) * o),
          y: Math.round(a.y + (l.coord.row - s.row) * u),
          scale: i,
          width: this.map.tileSize.x,
          height: this.map.tileSize.y
        }) : (this.provider.releaseTile(l.coord), this.requestManager.clearRequest(l.coord.toKey()), t.removeChild(l))
      }
    },
    createOrGetLevel: function(e) {
      if (e in this.levels) return this.levels[e];
      var t = document.createElement("div");
      return t.id = this.parent.id + "-zoom-" + e, t.style.cssText = "position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; margin: 0; padding: 0;", t.style.zIndex = e, this.parent.appendChild(t), this.levels[e] = t, t
    },
    addTileImage: function(e, t, n) {
      this.requestManager.requestTile(e, t, n)
    },
    addTileElement: function(e, t, n) {
      n.id = e, n.coord = t.copy(), this.positionTile(n)
    },
    positionTile: function(t) {
      var n = this.map.coordinate.zoomTo(t.coord.zoom);
      t.style.cssText = "position:absolute;-webkit-user-select:none;-webkit-user-drag:none;-moz-user-drag:none;-webkit-transform-origin:0 0;-moz-transform-origin:0 0;-o-transform-origin:0 0;-ms-transform-origin:0 0;width:" + this.map.tileSize.x + "px; height: " + this.map.tileSize.y + "px;", t.ondragstart = function() {
        return !1
      };
      var r = Math.pow(2, this.map.coordinate.zoom - t.coord.zoom);
      e.moveElement(t, {
        x: Math.round(this.map.dimensions.x / 2 + (t.coord.column - n.column) * this.map.tileSize.x),
        y: Math.round(this.map.dimensions.y / 2 + (t.coord.row - n.row) * this.map.tileSize.y),
        scale: r,
        width: this.map.tileSize.x,
        height: this.map.tileSize.y
      });
      var i = this.levels[t.coord.zoom];
      i.appendChild(t), t.className = "map-tile-loaded", Math.round(this.map.coordinate.zoom) == t.coord.zoom && (i.style.display = "block"), this.requestRedraw()
    },
    _redrawTimer: undefined,
    requestRedraw: function() {
      this._redrawTimer || (this._redrawTimer = setTimeout(this.getRedraw(), 1e3))
    },
    _redraw: null,
    getRedraw: function() {
      if (!this._redraw) {
        var e = this;
        this._redraw = function() {
          e.draw(), e._redrawTimer = 0
        }
      }
      return this._redraw
    },
    setProvider: function(e) {
      var t = this.provider === null;
      if (!t) {
        this.requestManager.clear();
        for (var n in this.levels) if (this.levels.hasOwnProperty(n)) {
          var r = this.levels[n];
          while (r.firstChild) this.provider.releaseTile(r.firstChild.coord), r.removeChild(r.firstChild)
        }
      }
      this.tiles = {}, this.provider = e, t || this.draw()
    },
    enable: function() {
      this.enabled = !0, this.parent.style.display = "", this.draw()
    },
    disable: function() {
      this.enabled = !1, this.requestManager.clear(), this.parent.style.display = "none"
    },
    destroy: function() {
      this.requestManager.clear(), this.requestManager.removeCallback("requestcomplete", this.getTileComplete()), this.requestManager.removeCallback("requesterror", this.getTileError()), this.provider = null, this.parent.parentNode && this.parent.parentNode.removeChild(this.parent), this.map = null
    }
  }, e.Map = function(t, n, r, i) {
    if (typeof t == "string") {
      t = document.getElementById(t);
      if (!t) throw "The ID provided to modest maps could not be found."
    }
    this.parent = t, this.parent.style.padding = "0", this.parent.style.overflow = "hidden";
    var s = e.getStyle(this.parent, "position");
    s != "relative" && s != "absolute" && (this.parent.style.position = "relative"), this.layers = [], n || (n = []), n instanceof Array || (n = [n]);
    for (var o = 0; o < n.length; o++) this.addLayer(n[o]);
    this.projection = new e.MercatorProjection(0, e.deriveTransformation(-Math.PI, Math.PI, 0, 0, Math.PI, Math.PI, 1, 0, -Math.PI, -Math.PI, 0, 1)), this.tileSize = new e.Point(256, 256), this.coordLimits = [new e.Coordinate(0, -Infinity, 0), (new e.Coordinate(1, Infinity, 0)).zoomTo(18)], this.coordinate = new e.Coordinate(.5, .5, 0), r ? (this.autoSize = !1, this.parent.style.width = Math.round(r.x) + "px", this.parent.style.height = Math.round(r.y) + "px") : (r = new e.Point(this.parent.offsetWidth, this.parent.offsetHeight), this.autoSize = !0, e.addEvent(window, "resize", this.windowResize())), this.dimensions = r, this.callbackManager = new e.CallbackManager(this, ["zoomed", "panned", "centered", "extentset", "resized", "drawn"]);
    if (i === undefined) this.eventHandlers = [e.MouseHandler().init(this), e.TouchHandler().init(this)];
    else {
      this.eventHandlers = i;
      if (i instanceof Array) for (var u = 0; u < i.length; u++) i[u].init(this)
    }
  }, e.Map.prototype = {
    parent: null,
    dimensions: null,
    projection: null,
    coordinate: null,
    tileSize: null,
    coordLimits: null,
    layers: null,
    callbackManager: null,
    eventHandlers: null,
    autoSize: null,
    toString: function() {
      return "Map(#" + this.parent.id + ")"
    },
    addCallback: function(e, t) {
      return this.callbackManager.addCallback(e, t), this
    },
    removeCallback: function(e, t) {
      return this.callbackManager.removeCallback(e, t), this
    },
    dispatchCallback: function(e, t) {
      return this.callbackManager.dispatchCallback(e, t), this
    },
    windowResize: function() {
      if (!this._windowResize) {
        var t = this;
        this._windowResize = function(n) {
          t.dimensions = new e.Point(t.parent.offsetWidth, t.parent.offsetHeight), t.draw(), t.dispatchCallback("resized", [t.dimensions])
        }
      }
      return this._windowResize
    },
    setZoomRange: function(e, t) {
      return this.coordLimits[0] = this.coordLimits[0].zoomTo(e), this.coordLimits[1] = this.coordLimits[1].zoomTo(t), this
    },
    zoomBy: function(t) {
      return this.coordinate = this.enforceLimits(this.coordinate.zoomBy(t)), e.getFrame(this.getRedraw()), this.dispatchCallback("zoomed", t), this
    },
    zoomIn: function() {
      return this.zoomBy(1)
    },
    zoomOut: function() {
      return this.zoomBy(-1)
    },
    setZoom: function(e) {
      return this.zoomBy(e - this.coordinate.zoom)
    },
    zoomByAbout: function(e, t) {
      var n = this.pointLocation(t);
      this.coordinate = this.enforceLimits(this.coordinate.zoomBy(e));
      var r = this.locationPoint(n);
      return this.dispatchCallback("zoomed", e), this.panBy(t.x - r.x, t.y - r.y)
    },
    panBy: function(t, n) {
      return this.coordinate.column -= t / this.tileSize.x, this.coordinate.row -= n / this.tileSize.y, this.coordinate = this.enforceLimits(this.coordinate), e.getFrame(this.getRedraw()), this.dispatchCallback("panned", [t, n]), this
    },
    panLeft: function() {
      return this.panBy(100, 0)
    },
    panRight: function() {
      return this.panBy(-100, 0)
    },
    panDown: function() {
      return this.panBy(0, -100)
    },
    panUp: function() {
      return this.panBy(0, 100)
    },
    setCenter: function(e) {
      return this.setCenterZoom(e, this.coordinate.zoom)
    },
    setCenterZoom: function(t, n) {
      return this.coordinate = this.projection.locationCoordinate(t).zoomTo(parseFloat(n) || 0), e.getFrame(this.getRedraw()), this.dispatchCallback("centered", [t, n]), this
    },
    extentCoordinate: function(t, n) {
      t instanceof e.Extent && (t = t.toArray());
      var r, i;
      for (var s = 0; s < t.length; s++) {
        var o = this.projection.locationCoordinate(t[s]);
        r ? (r.row = Math.min(r.row, o.row), r.column = Math.min(r.column, o.column), r.zoom = Math.min(r.zoom, o.zoom), i.row = Math.max(i.row, o.row), i.column = Math.max(i.column, o.column), i.zoom = Math.max(i.zoom, o.zoom)) : (r = o.copy(), i = o.copy())
      }
      var u = this.dimensions.x + 1,
          a = this.dimensions.y + 1,
          f = (i.column - r.column) / (u / this.tileSize.x),
          l = Math.log(f) / Math.log(2),
          c = r.zoom - (n ? l : Math.ceil(l)),
          h = (i.row - r.row) / (a / this.tileSize.y),
          p = Math.log(h) / Math.log(2),
          d = r.zoom - (n ? p : Math.ceil(p)),
          v = Math.min(c, d);
      v = Math.min(v, this.coordLimits[1].zoom), v = Math.max(v, this.coordLimits[0].zoom);
      var m = (r.row + i.row) / 2,
          g = (r.column + i.column) / 2,
          y = r.zoom;
      return (new e.Coordinate(m, g, y)).zoomTo(v)
    },
    setExtent: function(e, t) {
      return this.coordinate = this.extentCoordinate(e, t), this.draw(), this.dispatchCallback("extentset", e), this
    },
    setSize: function(t) {
      return this.dimensions = new e.Point(t.x, t.y), this.parent.style.width = Math.round(this.dimensions.x) + "px", this.parent.style.height = Math.round(this.dimensions.y) + "px", this.autoSize && (e.removeEvent(window, "resize", this.windowResize()), this.autoSize = !1), this.draw(), this.dispatchCallback("resized", this.dimensions), this
    },
    coordinatePoint: function(t) {
      t.zoom != this.coordinate.zoom && (t = t.zoomTo(this.coordinate.zoom));
      var n = new e.Point(this.dimensions.x / 2, this.dimensions.y / 2);
      return n.x += this.tileSize.x * (t.column - this.coordinate.column), n.y += this.tileSize.y * (t.row - this.coordinate.row), n
    },
    pointCoordinate: function(e) {
      var t = this.coordinate.copy();
      return t.column += (e.x - this.dimensions.x / 2) / this.tileSize.x, t.row += (e.y - this.dimensions.y / 2) / this.tileSize.y, t
    },
    locationCoordinate: function(e) {
      return this.projection.locationCoordinate(e)
    },
    coordinateLocation: function(e) {
      return this.projection.coordinateLocation(e)
    },
    locationPoint: function(e) {
      return this.coordinatePoint(this.locationCoordinate(e))
    },
    pointLocation: function(e) {
      return this.coordinateLocation(this.pointCoordinate(e))
    },
    getExtent: function() {
      return new e.Extent(this.pointLocation(new e.Point(0, 0)), this.pointLocation(this.dimensions))
    },
    extent: function(e, t) {
      return e ? this.setExtent(e, t) : this.getExtent()
    },
    getCenter: function() {
      return this.projection.coordinateLocation(this.coordinate)
    },
    center: function(e) {
      return e ? this.setCenter(e) : this.getCenter()
    },
    getZoom: function() {
      return this.coordinate.zoom
    },
    zoom: function(e) {
      return e !== undefined ? this.setZoom(e) : this.getZoom()
    },
    getLayers: function() {
      return this.layers.slice()
    },
    getLayer: function(e) {
      for (var t = 0; t < this.layers.length; t++) if (e == this.layers[t].name) return this.layers[t]
    },
    getLayerAt: function(e) {
      return this.layers[e]
    },
    addLayer: function(t) {
      return this.layers.push(t), this.parent.appendChild(t.parent), t.map = this, this.coordinate && e.getFrame(this.getRedraw()), this
    },
    removeLayer: function(e) {
      for (var t = 0; t < this.layers.length; t++) if (e == this.layers[t] || e == this.layers[t].name) {
        this.removeLayerAt(t);
        break
      }
      return this
    },
    setLayerAt: function(t, n) {
      if (t < 0 || t >= this.layers.length) throw new Error("invalid index in setLayerAt(): " + t);
      if (this.layers[t] != n) {
        if (t < this.layers.length) {
          var r = this.layers[t];
          this.parent.insertBefore(n.parent, r.parent), r.destroy()
        } else this.parent.appendChild(n.parent);
        this.layers[t] = n, n.map = this, e.getFrame(this.getRedraw())
      }
      return this
    },
    insertLayerAt: function(t, n) {
      if (t < 0 || t > this.layers.length) throw new Error("invalid index in insertLayerAt(): " + t);
      if (t == this.layers.length) this.layers.push(n), this.parent.appendChild(n.parent);
      else {
        var r = this.layers[t];
        this.parent.insertBefore(n.parent, r.parent), this.layers.splice(t, 0, n)
      }
      return n.map = this, e.getFrame(this.getRedraw()), this
    },
    removeLayerAt: function(e) {
      if (e < 0 || e >= this.layers.length) throw new Error("invalid index in removeLayer(): " + e);
      var t = this.layers[e];
      return this.layers.splice(e, 1), t.destroy(), this
    },
    swapLayersAt: function(e, t) {
      if (e < 0 || e >= this.layers.length || t < 0 || t >= this.layers.length) throw new Error("invalid index in swapLayersAt(): " + index);
      var n = this.layers[e],
          r = this.layers[t],
          i = document.createElement("div");
      return this.parent.replaceChild(i, r.parent), this.parent.replaceChild(r.parent, n.parent), this.parent.replaceChild(n.parent, i), this.layers[e] = r, this.layers[t] = n, this
    },
    enableLayer: function(e) {
      var t = this.getLayer(e);
      return t && t.enable(), this
    },
    enableLayerAt: function(e) {
      var t = this.getLayerAt(e);
      return t && t.enable(), this
    },
    disableLayer: function(e) {
      var t = this.getLayer(e);
      return t && t.disable(), this
    },
    disableLayerAt: function(e) {
      var t = this.getLayerAt(e);
      return t && t.disable(), this
    },
    enforceZoomLimits: function(e) {
      var t = this.coordLimits;
      if (t) {
        var n = t[0].zoom,
            r = t[1].zoom;
        e.zoom < n ? e = e.zoomTo(n) : e.zoom > r && (e = e.zoomTo(r))
      }
      return e
    },
    enforcePanLimits: function(t) {
      if (this.coordLimits) {
        t = t.copy();
        var n = this.coordLimits[0].zoomTo(t.zoom),
            r = this.coordLimits[1].zoomTo(t.zoom),
            i = this.pointCoordinate(new e.Point(0, 0)).zoomTo(t.zoom),
            s = this.pointCoordinate(this.dimensions).zoomTo(t.zoom);
        r.row - n.row < s.row - i.row ? t.row = (r.row + n.row) / 2 : i.row < n.row ? t.row += n.row - i.row : s.row > r.row && (t.row -= s.row - r.row), r.column - n.column < s.column - i.column ? t.column = (r.column + n.column) / 2 : i.column < n.column ? t.column += n.column - i.column : s.column > r.column && (t.column -= s.column - r.column)
      }
      return t
    },
    enforceLimits: function(e) {
      return this.enforcePanLimits(this.enforceZoomLimits(e))
    },
    draw: function() {
      this.coordinate = this.enforceLimits(this.coordinate);
      if (this.dimensions.x <= 0 || this.dimensions.y <= 0) {
        if (!this.autoSize) return;
        var t = this.parent.offsetWidth,
            n = this.parent.offsetHeight;
        this.dimensions = new e.Point(t, n);
        if (t <= 0 || n <= 0) return
      }
      for (var r = 0; r < this.layers.length; r++) this.layers[r].draw();
      this.dispatchCallback("drawn")
    },
    _redrawTimer: undefined,
    requestRedraw: function() {
      this._redrawTimer || (this._redrawTimer = setTimeout(this.getRedraw(), 1e3))
    },
    _redraw: null,
    getRedraw: function() {
      if (!this._redraw) {
        var e = this;
        this._redraw = function() {
          e.draw(), e._redrawTimer = 0
        }
      }
      return this._redraw
    },
    destroy: function() {
      for (var t = 0; t < this.layers.length; t++) this.layers[t].destroy();
      this.layers = [], this.projection = null;
      for (var n = 0; n < this.eventHandlers.length; n++) this.eventHandlers[n].remove();
      this.autoSize && e.removeEvent(window, "resize", this.windowResize())
    }
  }, e.mapByCenterZoom = function(t, n, r, i) {
    var s = e.coerceLayer(n),
        o = new e.Map(t, s, !1);
    return o.setCenterZoom(r, i).draw(), o
  }, e.mapByExtent = function(t, n, r, i) {
    var s = e.coerceLayer(n),
        o = new e.Map(t, s, !1);
    return o.setExtent([r, i]).draw(), o
  }, typeof module != "undefined" && module.exports && (module.exports = {
    Point: e.Point,
    Projection: e.Projection,
    MercatorProjection: e.MercatorProjection,
    LinearProjection: e.LinearProjection,
    Transformation: e.Transformation,
    Location: e.Location,
    MapProvider: e.MapProvider,
    Template: e.Template,
    Coordinate: e.Coordinate,
    deriveTransformation: e.deriveTransformation
  })
})(MM);
var html4 = {};
html4.atype = {
  NONE: 0,
  URI: 1,
  URI_FRAGMENT: 11,
  SCRIPT: 2,
  STYLE: 3,
  ID: 4,
  IDREF: 5,
  IDREFS: 6,
  GLOBAL_NAME: 7,
  LOCAL_NAME: 8,
  CLASSES: 9,
  FRAME_TARGET: 10
}, html4.ATTRIBS = {
  "*::class": 9,
  "*::dir": 0,
  "*::id": 4,
  "*::lang": 0,
  "*::onclick": 2,
  "*::ondblclick": 2,
  "*::onkeydown": 2,
  "*::onkeypress": 2,
  "*::onkeyup": 2,
  "*::onload": 2,
  "*::onmousedown": 2,
  "*::onmousemove": 2,
  "*::onmouseout": 2,
  "*::onmouseover": 2,
  "*::onmouseup": 2,
  "*::style": 3,
  "*::title": 0,
  "a::accesskey": 0,
  "a::coords": 0,
  "a::href": 1,
  "a::hreflang": 0,
  "a::name": 7,
  "a::onblur": 2,
  "a::onfocus": 2,
  "a::rel": 0,
  "a::rev": 0,
  "a::shape": 0,
  "a::tabindex": 0,
  "a::target": 10,
  "a::type": 0,
  "area::accesskey": 0,
  "area::alt": 0,
  "area::coords": 0,
  "area::href": 1,
  "area::nohref": 0,
  "area::onblur": 2,
  "area::onfocus": 2,
  "area::shape": 0,
  "area::tabindex": 0,
  "area::target": 10,
  "bdo::dir": 0,
  "blockquote::cite": 1,
  "br::clear": 0,
  "button::accesskey": 0,
  "button::disabled": 0,
  "button::name": 8,
  "button::onblur": 2,
  "button::onfocus": 2,
  "button::tabindex": 0,
  "button::type": 0,
  "button::value": 0,
  "canvas::height": 0,
  "canvas::width": 0,
  "caption::align": 0,
  "col::align": 0,
  "col::char": 0,
  "col::charoff": 0,
  "col::span": 0,
  "col::valign": 0,
  "col::width": 0,
  "colgroup::align": 0,
  "colgroup::char": 0,
  "colgroup::charoff": 0,
  "colgroup::span": 0,
  "colgroup::valign": 0,
  "colgroup::width": 0,
  "del::cite": 1,
  "del::datetime": 0,
  "dir::compact": 0,
  "div::align": 0,
  "dl::compact": 0,
  "font::color": 0,
  "font::face": 0,
  "font::size": 0,
  "form::accept": 0,
  "form::action": 1,
  "form::autocomplete": 0,
  "form::enctype": 0,
  "form::method": 0,
  "form::name": 7,
  "form::onreset": 2,
  "form::onsubmit": 2,
  "form::target": 10,
  "h1::align": 0,
  "h2::align": 0,
  "h3::align": 0,
  "h4::align": 0,
  "h5::align": 0,
  "h6::align": 0,
  "hr::align": 0,
  "hr::noshade": 0,
  "hr::size": 0,
  "hr::width": 0,
  "iframe::align": 0,
  "iframe::frameborder": 0,
  "iframe::height": 0,
  "iframe::marginheight": 0,
  "iframe::marginwidth": 0,
  "iframe::width": 0,
  "img::align": 0,
  "img::alt": 0,
  "img::border": 0,
  "img::height": 0,
  "img::hspace": 0,
  "img::ismap": 0,
  "img::name": 7,
  "img::src": 1,
  "img::usemap": 11,
  "img::vspace": 0,
  "img::width": 0,
  "input::accept": 0,
  "input::accesskey": 0,
  "input::align": 0,
  "input::alt": 0,
  "input::autocomplete": 0,
  "input::checked": 0,
  "input::disabled": 0,
  "input::ismap": 0,
  "input::maxlength": 0,
  "input::name": 8,
  "input::onblur": 2,
  "input::onchange": 2,
  "input::onfocus": 2,
  "input::onselect": 2,
  "input::readonly": 0,
  "input::size": 0,
  "input::src": 1,
  "input::tabindex": 0,
  "input::type": 0,
  "input::usemap": 11,
  "input::value": 0,
  "ins::cite": 1,
  "ins::datetime": 0,
  "label::accesskey": 0,
  "label::for": 5,
  "label::onblur": 2,
  "label::onfocus": 2,
  "legend::accesskey": 0,
  "legend::align": 0,
  "li::type": 0,
  "li::value": 0,
  "map::name": 7,
  "menu::compact": 0,
  "ol::compact": 0,
  "ol::start": 0,
  "ol::type": 0,
  "optgroup::disabled": 0,
  "optgroup::label": 0,
  "option::disabled": 0,
  "option::label": 0,
  "option::selected": 0,
  "option::value": 0,
  "p::align": 0,
  "pre::width": 0,
  "q::cite": 1,
  "select::disabled": 0,
  "select::multiple": 0,
  "select::name": 8,
  "select::onblur": 2,
  "select::onchange": 2,
  "select::onfocus": 2,
  "select::size": 0,
  "select::tabindex": 0,
  "table::align": 0,
  "table::bgcolor": 0,
  "table::border": 0,
  "table::cellpadding": 0,
  "table::cellspacing": 0,
  "table::frame": 0,
  "table::rules": 0,
  "table::summary": 0,
  "table::width": 0,
  "tbody::align": 0,
  "tbody::char": 0,
  "tbody::charoff": 0,
  "tbody::valign": 0,
  "td::abbr": 0,
  "td::align": 0,
  "td::axis": 0,
  "td::bgcolor": 0,
  "td::char": 0,
  "td::charoff": 0,
  "td::colspan": 0,
  "td::headers": 6,
  "td::height": 0,
  "td::nowrap": 0,
  "td::rowspan": 0,
  "td::scope": 0,
  "td::valign": 0,
  "td::width": 0,
  "textarea::accesskey": 0,
  "textarea::cols": 0,
  "textarea::disabled": 0,
  "textarea::name": 8,
  "textarea::onblur": 2,
  "textarea::onchange": 2,
  "textarea::onfocus": 2,
  "textarea::onselect": 2,
  "textarea::readonly": 0,
  "textarea::rows": 0,
  "textarea::tabindex": 0,
  "tfoot::align": 0,
  "tfoot::char": 0,
  "tfoot::charoff": 0,
  "tfoot::valign": 0,
  "th::abbr": 0,
  "th::align": 0,
  "th::axis": 0,
  "th::bgcolor": 0,
  "th::char": 0,
  "th::charoff": 0,
  "th::colspan": 0,
  "th::headers": 6,
  "th::height": 0,
  "th::nowrap": 0,
  "th::rowspan": 0,
  "th::scope": 0,
  "th::valign": 0,
  "th::width": 0,
  "thead::align": 0,
  "thead::char": 0,
  "thead::charoff": 0,
  "thead::valign": 0,
  "tr::align": 0,
  "tr::bgcolor": 0,
  "tr::char": 0,
  "tr::charoff": 0,
  "tr::valign": 0,
  "ul::compact": 0,
  "ul::type": 0
}, html4.eflags = {
  OPTIONAL_ENDTAG: 1,
  EMPTY: 2,
  CDATA: 4,
  RCDATA: 8,
  UNSAFE: 16,
  FOLDABLE: 32,
  SCRIPT: 64,
  STYLE: 128
}, html4.ELEMENTS = {
  a: 0,
  abbr: 0,
  acronym: 0,
  address: 0,
  applet: 16,
  area: 2,
  b: 0,
  base: 18,
  basefont: 18,
  bdo: 0,
  big: 0,
  blockquote: 0,
  body: 49,
  br: 2,
  button: 0,
  canvas: 0,
  caption: 0,
  center: 0,
  cite: 0,
  code: 0,
  col: 2,
  colgroup: 1,
  dd: 1,
  del: 0,
  dfn: 0,
  dir: 0,
  div: 0,
  dl: 0,
  dt: 1,
  em: 0,
  fieldset: 0,
  font: 0,
  form: 0,
  frame: 18,
  frameset: 16,
  h1: 0,
  h2: 0,
  h3: 0,
  h4: 0,
  h5: 0,
  h6: 0,
  head: 49,
  hr: 2,
  html: 49,
  i: 0,
  iframe: 4,
  img: 2,
  input: 2,
  ins: 0,
  isindex: 18,
  kbd: 0,
  label: 0,
  legend: 0,
  li: 1,
  link: 18,
  map: 0,
  menu: 0,
  meta: 18,
  nobr: 0,
  noembed: 4,
  noframes: 20,
  noscript: 20,
  object: 16,
  ol: 0,
  optgroup: 0,
  option: 1,
  p: 1,
  param: 18,
  pre: 0,
  q: 0,
  s: 0,
  samp: 0,
  script: 84,
  select: 0,
  small: 0,
  span: 0,
  strike: 0,
  strong: 0,
  style: 148,
  sub: 0,
  sup: 0,
  table: 0,
  tbody: 1,
  td: 1,
  textarea: 8,
  tfoot: 1,
  th: 1,
  thead: 1,
  title: 24,
  tr: 1,
  tt: 0,
  u: 0,
  ul: 0,
  "var": 0
}, html4.ueffects = {
  NOT_LOADED: 0,
  SAME_DOCUMENT: 1,
  NEW_DOCUMENT: 2
}, html4.URIEFFECTS = {
  "a::href": 2,
  "area::href": 2,
  "blockquote::cite": 0,
  "body::background": 1,
  "del::cite": 0,
  "form::action": 2,
  "img::src": 1,
  "input::src": 1,
  "ins::cite": 0,
  "q::cite": 0
}, html4.ltypes = {
  UNSANDBOXED: 2,
  SANDBOXED: 1,
  DATA: 0
}, html4.LOADERTYPES = {
  "a::href": 2,
  "area::href": 2,
  "blockquote::cite": 2,
  "body::background": 1,
  "del::cite": 2,
  "form::action": 2,
  "img::src": 1,
  "input::src": 1,
  "ins::cite": 2,
  "q::cite": 2
};
var html = function(e) {
  function o(e) {
    e = t(e);
    if (n.hasOwnProperty(e)) return n[e];
    var r = e.match(i);
    return r ? String.fromCharCode(parseInt(r[1], 10)) : (r = e.match(s)) ? String.fromCharCode(parseInt(r[1], 16)) : ""
  }
  function u(e, t) {
    return o(t)
  }
  function f(e) {
    return e.replace(a, "")
  }
  function c(e) {
    return e.replace(l, u)
  }
  function y(e) {
    return e.replace(h, "&amp;").replace(d, "&lt;").replace(v, "&gt;").replace(m, "&#34;").replace(g, "&#61;")
  }
  function b(e) {
    return e.replace(p, "&amp;$1").replace(d, "&lt;").replace(v, "&gt;")
  }
  function S(n) {
    return function(i, s) {
      i = String(i);
      var o = null,
          u = !1,
          a = [],
          l = void 0,
          h = void 0,
          p = void 0;
      n.startDoc && n.startDoc(s);
      while (i) {
        var d = i.match(u ? w : E);
        i = i.substring(d[0].length);
        if (u) {
          if (d[1]) {
            var v = t(d[1]),
                m;
            if (d[2]) {
              var g = d[3];
              switch (g.charCodeAt(0)) {
              case 34:
              case 39:
                g = g.substring(1, g.length - 1)
              }
              m = c(f(g))
            } else m = v;
            a.push(v, m)
          } else if (d[4]) {
            h !== void 0 && (p ? n.startTag && n.startTag(l, a, s) : n.endTag && n.endTag(l, s));
            if (p && h & (e.eflags.CDATA | e.eflags.RCDATA)) {
              o === null ? o = t(i) : o = o.substring(o.length - i.length);
              var y = o.indexOf("</" + l);
              y < 0 && (y = i.length), y && (h & e.eflags.CDATA ? n.cdata && n.cdata(i.substring(0, y), s) : n.rcdata && n.rcdata(b(i.substring(0, y)), s), i = i.substring(y))
            }
            l = h = p = void 0, a.length = 0, u = !1
          }
        } else if (d[1]) n.pcdata && n.pcdata(d[0], s);
        else if (d[3]) p = !d[2], u = !0, l = t(d[3]), h = e.ELEMENTS.hasOwnProperty(l) ? e.ELEMENTS[l] : void 0;
        else if (d[4]) n.pcdata && n.pcdata(d[4], s);
        else if (d[5] && n.pcdata) {
          var S = d[5];
          n.pcdata(S === "<" ? "&lt;" : S === ">" ? "&gt;" : "&amp;", s)
        }
      }
      n.endDoc && n.endDoc(s)
    }
  }
  function x(t) {
    var n, r;
    return S({
      startDoc: function(e) {
        n = [], r = !1
      },
      startTag: function(i, s, o) {
        if (r) return;
        if (!e.ELEMENTS.hasOwnProperty(i)) return;
        var u = e.ELEMENTS[i];
        if (u & e.eflags.FOLDABLE) return;
        if (u & e.eflags.UNSAFE) {
          r = !(u & e.eflags.EMPTY);
          return
        }
        s = t(i, s);
        if (s) {
          u & e.eflags.EMPTY || n.push(i), o.push("<", i);
          for (var a = 0, f = s.length; a < f; a += 2) {
            var l = s[a],
                c = s[a + 1];
            c !== null && c !== void 0 && o.push(" ", l, '="', y(c), '"')
          }
          o.push(">")
        }
      },
      endTag: function(t, i) {
        if (r) {
          r = !1;
          return
        }
        if (!e.ELEMENTS.hasOwnProperty(t)) return;
        var s = e.ELEMENTS[t];
        if (!(s & (e.eflags.UNSAFE | e.eflags.EMPTY | e.eflags.FOLDABLE))) {
          var o;
          if (s & e.eflags.OPTIONAL_ENDTAG) for (o = n.length; --o >= 0;) {
            var u = n[o];
            if (u === t) break;
            if (!(e.ELEMENTS[u] & e.eflags.OPTIONAL_ENDTAG)) return
          } else
          for (o = n.length; --o >= 0;) if (n[o] === t) break;
          if (o < 0) return;
          for (var a = n.length; --a > o;) {
            var u = n[a];
            e.ELEMENTS[u] & e.eflags.OPTIONAL_ENDTAG || i.push("</", u, ">")
          }
          n.length = o, i.push("</", t, ">")
        }
      },
      pcdata: function(e, t) {
        r || t.push(e)
      },
      rcdata: function(e, t) {
        r || t.push(e)
      },
      cdata: function(e, t) {
        r || t.push(e)
      },
      endDoc: function(e) {
        for (var t = n.length; --t >= 0;) e.push("</", n[t], ">");
        n.length = 0
      }
    })
  }
  function N(t, n, i) {
    var s = [];
    return x(function(s, o) {
      for (var u = 0; u < o.length; u += 2) {
        var a = o[u],
            f = o[u + 1],
            l = null,
            c;
        if ((c = s + "::" + a, e.ATTRIBS.hasOwnProperty(c)) || (c = "*::" + a, e.ATTRIBS.hasOwnProperty(c))) l = e.ATTRIBS[c];
        if (l !== null) switch (l) {
        case e.atype.NONE:
          break;
        case e.atype.SCRIPT:
        case e.atype.STYLE:
          f = null;
          break;
        case e.atype.ID:
        case e.atype.IDREF:
        case e.atype.IDREFS:
        case e.atype.GLOBAL_NAME:
        case e.atype.LOCAL_NAME:
        case e.atype.CLASSES:
          f = i ? i(f) : f;
          break;
        case e.atype.URI:
          var h = ("" + f).match(T);
          h ? !h[1] || r.test(h[1]) ? f = n && n(f) : f = null : f = null;
          break;
        case e.atype.URI_FRAGMENT:
          f && "#" === f.charAt(0) ? (f = i ? i(f) : f, f && (f = "#" + f)) : f = null;
          break;
        default:
          f = null
        } else f = null;
        o[u + 1] = f
      }
      return o
    })(t, s), s.join("")
  }
  var t;
  "script" === "SCRIPT".toLowerCase() ? t = function(e) {
    return e.toLowerCase()
  } : t = function(e) {
    return e.replace(/[A-Z]/g, function(e) {
      return String.fromCharCode(e.charCodeAt(0) | 32)
    })
  };
  var n = {
    lt: "<",
    gt: ">",
    amp: "&",
    nbsp: "Â ",
    quot: '"',
    apos: "'"
  },
      r = /^(?:https?|mailto|data)$/i,
      i = /^#(\d+)$/,
      s = /^#x([0-9A-Fa-f]+)$/,
      a = /\0/g,
      l = /&(#\d+|#x[0-9A-Fa-f]+|\w+);/g,
      h = /&/g,
      p = /&([^a-z#]|#(?:[^0-9x]|x(?:[^0-9a-f]|$)|$)|$)/gi,
      d = /</g,
      v = />/g,
      m = /\"/g,
      g = /\=/g,
      w = new RegExp("^\\s*(?:(?:([a-z][a-z-]*)(\\s*=\\s*(\"[^\"]*\"|'[^']*'|(?=[a-z][a-z-]*\\s*=)|[^>\"'\\s]*))?)|(/?>)|[\\s\\S][^a-z\\s>]*)", "i"),
      E = new RegExp("^(?:&(\\#[0-9]+|\\#[x][0-9a-f]+|\\w+);|<!--[\\s\\S]*?-->|<!\\w[^>]*>|<\\?[^>*]*>|<(/)?([a-z][a-z0-9]*)|([^<&>]+)|([<&>]))", "i"),
      T = new RegExp("^(?:([^:/?#]+):)?");
  return {
    escapeAttrib: y,
    makeHtmlSanitizer: x,
    makeSaxParser: S,
    normalizeRCData: b,
    sanitize: N,
    unescapeEntities: c
  }
}(html4),
    html_sanitize = html.sanitize;
typeof window != "undefined" && (window.html = html, window.html_sanitize = html_sanitize), html4.ATTRIBS["*::style"] = 0, html4.ELEMENTS.style = 0, html4.ATTRIBS["a::target"] = 0, html4.ELEMENTS.video = 0, html4.ATTRIBS["video::src"] = 0, html4.ATTRIBS["video::poster"] = 0, html4.ATTRIBS["video::controls"] = 0, html4.ELEMENTS.audio = 0, html4.ATTRIBS["audio::src"] = 0, html4.ATTRIBS["video::autoplay"] = 0, html4.ATTRIBS["video::controls"] = 0, wax = wax || {}, wax.attribution = function() {
  var e = {},
      t = document.createElement("div");
  return t.className = "map-attribution", e.content = function(e) {
    return typeof e == "undefined" ? t.innerHTML : (t.innerHTML = wax.u.sanitize(e), this)
  }, e.element = function() {
    return t
  }, e.init = function() {
    return this
  }, e
}, wax = wax || {}, wax.bwdetect = function(e, t) {
  function a() {
    wax.bw = -1;
    var e = new Image;
    e.src = s;
    var t = !0,
        i = setTimeout(function() {
        t && wax.bw == -1 && (n.bw(0), t = !1)
      }, r);
    e.onload = function() {
      t && wax.bw == -1 && (clearTimeout(i), n.bw(1), t = !1)
    }
  }
  var n = {},
      r = e.threshold || 400,
      s = "http://a.tiles.mapbox.com/mapbox/1.0.0/blue-marble-topo-bathy-jul/0/0/0.png?preventcache=" + +(new Date),
      o = 1,
      u = e.auto === undefined ? !0 : e.auto;
  return n.bw = function(e) {
    if (!arguments.length) return o;
    var n = o;
    wax.bwlisteners && wax.bwlisteners.length &&
    function() {
      listeners = wax.bwlisteners, wax.bwlisteners = [];
      for (i = 0; i < listeners; i++) listeners[i](e)
    }(), wax.bw = e, o != (o = e) && t(e)
  }, n.add = function() {
    return u && a(), this
  }, wax.bw == -1 ? (wax.bwlisteners = wax.bwlisteners || [], wax.bwlisteners.push(n.bw)) : wax.bw !== undefined ? n.bw(wax.bw) : n.add(), n
}, wax.formatter = function(x) {
  var formatter = {},
      f;
  if (x && typeof x == "string") try {
    eval("f = " + x)
  } catch (e) {
    console && console.log(e)
  } else x && typeof x == "function" ? f = x : f = function() {};
  return formatter.format = function(e, t) {
    try {
      return wax.u.sanitize(f(e, t))
    } catch (n) {
      console && console.log(n)
    }
  }, formatter
}, wax.gi = function(e, t) {
  function s(e) {
    return e >= 93 && e--, e >= 35 && e--, e -= 32, e
  }
  t = t || {};
  var n = {},
      r = t.resolution || 4,
      i = t.tileSize || 256;
  return n.grid_tile = function() {
    return e
  }, n.getKey = function(t, n) {
    if (!e || !e.grid) return;
    if (n < 0 || t < 0) return;
    if (Math.floor(n) >= i || Math.floor(t) >= i) return;
    return s(e.grid[Math.floor(n / r)].charCodeAt(Math.floor(t / r)))
  }, n.gridFeature = function(t, n) {
    var r = this.getKey(t, n),
        i = e.keys;
    if (i && i[r] && e.data[i[r]]) return e.data[i[r]]
  }, n.tileFeature = function(t, n, r) {
    if (!e) return;
    var i = wax.u.offset(r);
    return feature = this.gridFeature(t - i.left, n - i.top), feature
  }, n
}, wax.gm = function() {
  function o(e) {
    return typeof e == "string" && (e = [e]), function(n) {
      if (!n) return;
      var r = new RegExp("/(\\d+)\\/(\\d+)\\/(\\d+)\\.[\\w\\._]+"),
          i = r.exec(n);
      if (!i) return;
      return e[parseInt(i[2], 10) % e.length].replace(/\{z\}/g, i[1]).replace(/\{x\}/g, i[2]).replace(/\{y\}/g, i[3])
    }
  }
  var e = 4,
      t = {},
      n = {},
      r, i, s = function(e) {
      if (e) return e.replace(/(\.png|\.jpg|\.jpeg)(\d*)/, ".grid.json")
      };
  return n.formatter = function(e) {
    return arguments.length ? (i = wax.formatter(e), n) : i
  }, n.template = function(e) {
    return arguments.length ? (i = wax.template(e), n) : i
  }, n.gridUrl = function(e) {
    return arguments.length ? (e ? s = typeof e == "function" ? e : o(e) : s = function() {
      return null
    }, n) : s
  }, n.getGrid = function(t, r) {
    var o = s(t);
    return !i || !o ? r(null, null) : (wax.request.get(o, function(t, n) {
      if (t) return r(t, null);
      r(null, wax.gi(n, {
        formatter: i,
        resolution: e
      }))
    }), n)
  }, n.tilejson = function(t) {
    return arguments.length ? (t.template ? n.template(t.template) : t.formatter ? n.formatter(t.formatter) : i = undefined, n.gridUrl(t.grids), t.resolution && (e = t.resolution), r = t, n) : r
  }, n
}, wax = wax || {}, wax.hash = function(e) {
  function i() {
    return location.hash.substring(1)
  }
  function s(e) {
    var t = window.location;
    t.replace(t.toString().replace(t.hash || /$/, "#" + e))
  }
  function o(t) {
    var n = t.split("/");
    for (var r = 0; r < n.length; r++) {
      n[r] = Number(n[r]);
      if (isNaN(n[r])) return !0
    }
    if (n.length < 3) return !0;
    n.length == 3 && e.setCenterZoom(n)
  }
  function u() {
    var n = e.getCenterZoom();
    t !== n && (t = n, s(t))
  }
  function a(e) {
    if (e === t) return;
    o(t = e) && u()
  }
  e = e || {};
  var t, n = {},
      r = 90 - 1e-8,
      f = wax.u.throttle(u, 500);
  return n.add = function() {
    return a(i()), e.bindChange(f), n
  }, n.remove = function() {
    return e.unbindChange(f), n
  }, n
}, wax = wax || {}, wax.interaction = function() {
  function d(e) {
    var t = o();
    for (var n = 0; n < t.length; n++) if (t[n][0] < e.y && t[n][0] + 256 > e.y && t[n][1] < e.x && t[n][1] + 256 > e.x) return t[n][2];
    return !1
  }
  function v() {
    return r ? (window.clearTimeout(r), r = null, !0) : !1
  }
  function m(r) {
    if (n) return;
    var i = wax.u.eventoffset(r);
    t.screen_feature(i, function(n) {
      n ? bean.fire(t, "on", {
        parent: f(),
        data: n,
        formatter: e.formatter().format,
        e: r
      }) : bean.fire(t, "off")
    })
  }
  function g() {
    n = !1
  }
  function y(e) {
    n = !0, i = wax.u.eventoffset(e), e.type === "mousedown" ? (bean.add(document.body, "click", w), bean.add(document.body, "mouseup", g)) : e.type === "touchstart" && e.touches.length === 1 && (bean.fire(t, "off"), bean.add(e.srcElement, p))
  }
  function b(e) {
    bean.remove(e.srcElement, p), n = !1
  }
  function w(e) {
    var o = {},
        u = wax.u.eventoffset(e);
    n = !1;
    for (var a in e) o[a] = e[a];
    return bean.remove(document.body, "mouseup", w), bean.remove(e.srcElement, p), e.type === "touchend" ? t.click(e, i) : Math.round(u.y / s) === Math.round(i.y / s) && Math.round(u.x / s) === Math.round(i.x / s) && (r ? v() : r = window.setTimeout(function() {
      r = null, t.click(o, u)
    }, 300)), w
  }
  var e = wax.gm(),
      t = {},
      n = !1,
      r = null,
      i, s = 4,
      o, u, a, f, l, c, h = {
      mousemove: m,
      touchstart: y,
      mousedown: y
      },
      p = {
      touchend: w,
      touchmove: w,
      touchcancel: b
      };
  return t.click = function(n, r) {
    t.screen_feature(r, function(r) {
      r && bean.fire(t, "on", {
        parent: f(),
        data: r,
        formatter: e.formatter().format,
        e: n
      })
    })
  }, t.screen_feature = function(t, n) {
    var r = d(t);
    r || n(null), e.getGrid(r.src, function(e, i) {
      if (e || !i) return n(null);
      var s = i.tileFeature(t.x, t.y, r);
      n(s)
    })
  }, t.attach = function(e) {
    return arguments.length ? (u = e, t) : u
  }, t.detach = function(e) {
    return arguments.length ? (a = e, t) : a
  }, t.map = function(e) {
    return arguments.length ? (l = e, u && u(l), bean.add(f(), h), bean.add(f(), "touchstart", y), t) : l
  }, t.grid = function(e) {
    return arguments.length ? (o = e, t) : o
  }, t.remove = function(e) {
    return a && a(l), bean.remove(f(), h), bean.fire(t, "remove"), t
  }, t.tilejson = function(n) {
    return arguments.length ? (e.tilejson(n), t) : e.tilejson()
  }, t.formatter = function() {
    return e.formatter()
  }, t.on = function(e, n) {
    return bean.add(t, e, n), t
  }, t.off = function(e, n) {
    return bean.remove(t, e, n), t
  }, t.gridmanager = function(n) {
    return arguments.length ? (e = n, t) : e
  }, t.parent = function(e) {
    return f = e, t
  }, t
};
var wax = wax || {};
wax.legend = function() {
  var e, t = {},
      n;
  return t.element = function() {
    return n
  }, t.content = function(n) {
    return arguments.length ? (e.innerHTML = wax.u.sanitize(n), e.style.display = "block", e.innerHTML === "" && (e.style.display = "none"), t) : e.innerHTML
  }, t.add = function() {
    return n = document.createElement("div"), n.className = "map-legends wax-legends", e = n.appendChild(document.createElement("div")), e.className = "map-legend wax-legend", e.style.display = "none", t
  }, t.add()
};
var wax = wax || {};
wax.location = function() {
  function t(e) {
    if (e.e.type === "mousemove" || !e.e.type) return;
    var t = e.formatter({
      format: "location"
    }, e.data);
    t && (window.top.location.href = t)
  }
  var e = {};
  return e.events = function() {
    return {
      on: t
    }
  }, e
};
var wax = wax || {};
wax.movetip = {}, wax.movetip = function() {
  function o(e) {
    var t = wax.u.eventoffset(e);
    n.height + t.y > r.top + r.height && r.height > n.height && (t.y -= n.height, i.className += " flip-y"), n.width + t.x > r.left + r.width && (t.x -= n.width, i.className += " flip-x"), i.style.left = t.x + "px", i.style.top = t.y + "px"
  }
  function u(e) {
    var t = document.createElement("div");
    return t.className = "map-tooltip map-tooltip-0", t.innerHTML = e, t
  }
  function a() {
    i && (i.parentNode.removeChild(i), i = null)
  }
  function f(t) {
    var f;
    if (e) return;
    if (t.e.type === "mousemove" || !t.e.type) {
      f = t.formatter({
        format: "teaser"
      }, t.data);
      if (!f) return;
      a(), s.style.cursor = "pointer", i = document.body.appendChild(u(f))
    } else {
      f = t.formatter({
        format: "teaser"
      }, t.data);
      if (!f) return;
      a();
      var l = document.body.appendChild(u(f));
      l.className += " map-popup";
      var c = l.appendChild(document.createElement("a"));
      c.href = "#close", c.className = "close", c.innerHTML = "Close", e = !0, i = l, n = wax.u.offset(i), r = wax.u.offset(s), o(t.e), bean.add(c, "click touchend", function(n) {
        n.stop(), a(), e = !1
      })
    }
    i && (n = wax.u.offset(i), r = wax.u.offset(s), o(t.e))
  }
  function l() {
    s.style.cursor = "default", e || a()
  }
  var e = !1,
      t = {},
      n, r, i, s;
  return t.parent = function(e) {
    return arguments.length ? (s = e, t) : s
  }, t.events = function() {
    return {
      on: f,
      off: l
    }
  }, t
};
var wax = wax || {};
wax.request = {
  cache: {},
  locks: {},
  promises: {},
  get: function(e, t) {
    if (this.cache[e]) return t(this.cache[e][0], this.cache[e][1]);
    this.promises[e] = this.promises[e] || [], this.promises[e].push(t);
    if (this.locks[e]) return;
    var n = this;
    this.locks[e] = !0, reqwest({
      url: e + (~e.indexOf("?") ? "&" : "?") + "callback=?",
      type: "jsonp",
      success: function(t) {
        n.locks[e] = !1, n.cache[e] = [null, t];
        for (var r = 0; r < n.promises[e].length; r++) n.promises[e][r](n.cache[e][0], n.cache[e][1])
      },
      error: function(t) {
        n.locks[e] = !1, n.cache[e] = [t, null];
        for (var r = 0; r < n.promises[e].length; r++) n.promises[e][r](n.cache[e][0], n.cache[e][1])
      }
    })
  }
}, wax.template = function(e) {
  var t = {};
  return t.format = function(t, n) {
    var r = {};
    for (var i in n) r[i] = n[i];
    return t.format && (r["__" + t.format + "__"] = !0), wax.u.sanitize(Mustache.to_html(e, r))
  }, t
};
if (!wax) var wax = {};
wax.tilejson = function(e, t) {
  reqwest({
    url: e + (~e.indexOf("?") ? "&" : "?") + "callback=?",
    type: "jsonp",
    success: t,
    error: t
  })
};
var wax = wax || {};
wax.tooltip = {}, wax.tooltip = function() {
  function u(e) {
    var t = document.createElement("div");
    return t.className = "map-tooltip map-tooltip-0 wax-tooltip", t.innerHTML = e, t
  }
  function a() {
    this.parentNode && this.parentNode.removeChild(this)
  }
  function f() {
    var e;
    while (e = r.pop()) t && s ? (bean.add(e, s, a), e.className += " map-fade") : e.parentNode && e.parentNode.removeChild(e)
  }
  function l(t) {
    var n;
    if (t.e.type === "mousemove" || !t.e.type) {
      if (!e) {
        n = t.content || t.formatter({
          format: "teaser"
        }, t.data);
        if (!n || n == i) return;
        f(), o.style.cursor = "pointer", r.push(o.appendChild(u(n))), i = n
      }
    } else {
      n = t.content || t.formatter({
        format: "full"
      }, t.data);
      if (!n) {
        t.e.type && t.e.type.match(/touch/) && (n = t.content || t.formatter({
          format: "teaser"
        }, t.data));
        if (!n) return
      }
      f(), o.style.cursor = "pointer";
      var s = o.appendChild(u(n));
      s.className += " map-popup wax-popup";
      var a = s.appendChild(document.createElement("a"));
      a.href = "#close", a.className = "close", a.innerHTML = "Close", e = !0, r.push(s), bean.add(a, "touchstart mousedown", function(e) {
        e.stop()
      }), bean.add(a, "click touchend", function(n) {
        n.stop(), f(), e = !1
      })
    }
  }
  function c() {
    o.style.cursor = "default", i = null, e || f()
  }
  var e = !1,
      t = !1,
      n = {},
      r = [],
      i, s, o;
  return document.body.style["-webkit-transition"] !== undefined ? s = "webkitTransitionEnd" : document.body.style.MozTransition !== undefined && (s = "transitionend"), n.parent = function(e) {
    return arguments.length ? (o = e, n) : o
  }, n.animate = function(e) {
    return arguments.length ? (t = e, n) : t
  }, n.events = function() {
    return {
      on: l,
      off: c
    }
  }, n
};
var wax = wax || {};
wax.u = {
  offset: function(e) {
    var t = e.offsetWidth || parseInt(e.style.width, 10),
        n = e.offsetHeight || parseInt(e.style.height, 10),
        r = document.body,
        i = 0,
        s = 0,
        o = function(e) {
        if (e === r || e === document.documentElement) return;
        i += e.offsetTop, s += e.offsetLeft;
        var t = e.style.transform || e.style.WebkitTransform || e.style.OTransform || e.style.MozTransform || e.style.msTransform;
        if (t) {
          var n;
          if (n = t.match(/translate\((.+)[px]?, (.+)[px]?\)/)) i += parseInt(n[2], 10), s += parseInt(n[1], 10);
          else if (n = t.match(/translate3d\((.+)[px]?, (.+)[px]?, (.+)[px]?\)/)) i += parseInt(n[2], 10), s += parseInt(n[1], 10);
          else if (n = t.match(/matrix3d\(([\-\d,\s]+)\)/)) {
            var o = n[1].split(",");
            i += parseInt(o[13], 10), s += parseInt(o[12], 10)
          } else if (n = t.match(/matrix\(.+, .+, .+, .+, (.+), (.+)\)/)) i += parseInt(n[2], 10), s += parseInt(n[1], 10)
        }
        };
    if (typeof e.getBoundingClientRect != "undefined") {
      var u = document.body,
          a = e.ownerDocument.documentElement,
          f = document.clientTop || u.clientTop || 0,
          l = document.clientLeft || u.clientLeft || 0,
          c = window.pageYOffset || a.scrollTop,
          h = window.pageXOffset || a.scrollLeft,
          p = e.getBoundingClientRect();
      i = p.top + c - f, s = p.left + h - l
    } else {
      o(e);
      try {
        while (e = e.offsetParent) o(e)
      } catch (d) {}
    }
    i += r.offsetTop, s += r.offsetLeft, i += r.parentNode.offsetTop, s += r.parentNode.offsetLeft;
    var v = document.defaultView ? window.getComputedStyle(r.parentNode, null) : r.parentNode.currentStyle;
    return r.parentNode.offsetTop !== parseInt(v.marginTop, 10) && !isNaN(parseInt(v.marginTop, 10)) && (i += parseInt(v.marginTop, 10), s += parseInt(v.marginLeft, 10)), {
      top: i,
      left: s,
      height: n,
      width: t
    }
  },
  $: function(e) {
    return typeof e == "string" ? document.getElementById(e) : e
  },
  eventoffset: function(e) {
    var t = 0,
        n = 0;
    e || (e = window.event);
    if (e.pageX || e.pageY) return {
      x: e.pageX,
      y: e.pageY
    };
    if (e.clientX || e.clientY) return {
      x: e.clientX,
      y: e.clientY
    };
    if (e.touches && e.touches.length === 1) return {
      x: e.touches[0].pageX,
      y: e.touches[0].pageY
    }
  },
  limit: function(e, t, n) {
    var r;
    return function() {
      var i = this,
          s = arguments,
          o = function() {
          r = null, e.apply(i, s)
          };
      n && clearTimeout(r);
      if (n || !r) r = setTimeout(o, t)
    }
  },
  throttle: function(e, t) {
    return this.limit(e, t, !1)
  },
  sanitize: function(e) {
    function t(e) {
      if (/^(https?:\/\/|data:image)/.test(e)) return e
    }
    function n(e) {
      return e
    }
    return e ? html_sanitize(e, t, n) : ""
  }
}, wax = wax || {}, wax.mm = wax.mm || {}, wax.mm.attribution = function() {
  var e, t = {},
      n = document.createElement("div");
  return n.className = "map-attribution map-mm", t.content = function(e) {
    return typeof e == "undefined" ? n.innerHTML : (n.innerHTML = wax.u.sanitize(e), t)
  }, t.element = function() {
    return n
  }, t.map = function(n) {
    return arguments.length ? (e = n, t) : e
  }, t.add = function() {
    return e ? (e.parent.appendChild(n), t) : !1
  }, t.remove = function() {
    return e ? (n.parentNode && n.parentNode.removeChild(n), t) : !1
  }, t.appendTo = function(e) {
    return wax.u.$(e).appendChild(n), t
  }, t
}, wax = wax || {}, wax.mm = wax.mm || {}, wax.mm.boxselector = function() {
  function d(e) {
    var t = new MM.Point(e.clientX, e.clientY);
    t.x += document.body.scrollLeft + document.documentElement.scrollLeft, t.y += document.body.scrollTop + document.documentElement.scrollTop;
    for (var n = h.parent; n; n = n.offsetParent) t.x -= n.offsetLeft, t.y -= n.offsetTop;
    return t
  }
  function v(n) {
    if (!n.shiftKey) return;
    return e = t = d(n), s = o = !0, r.left = e.x + "px", r.top = e.y + "px", r.width = r.height = 0, a(document, "mousemove", g), a(document, "mouseup", y), h.parent.style.cursor = "crosshair", MM.cancelEvent(n)
  }
  function m(r) {
    var i = d(r),
        f = {
        x: parseInt(n.offsetLeft, 10),
        y: parseInt(n.offsetTop, 10)
        },
        l = {
        x: f.x + parseInt(n.offsetWidth, 10),
        y: f.y + parseInt(n.offsetHeight, 10)
        };
    s = i.x - f.x <= u || l.x - i.x <= u, o = i.y - f.y <= u || l.y - i.y <= u;
    if (o || s) return e = {
      x: i.x - f.x < l.x - i.x ? l.x : f.x,
      y: i.y - f.y < l.y - i.y ? l.y : f.y
    }, t = {
      x: i.x - f.x < l.x - i.x ? f.x : l.x,
      y: i.y - f.y < l.y - i.y ? f.y : l.y
    }, a(document, "mousemove", g), a(document, "mouseup", y), MM.cancelEvent(r)
  }
  function g(t) {
    var n = d(t);
    return r.display = "block", s && (r.left = (n.x < e.x ? n.x : e.x) + "px", r.width = Math.abs(n.x - e.x) - 2 * i + "px"), o && (r.top = (n.y < e.y ? n.y : e.y) + "px", r.height = Math.abs(n.y - e.y) - 2 * i + "px"), w(n, h.parent), MM.cancelEvent(t)
  }
  function y(n) {
    var r = d(n),
        i = h.pointLocation(new MM.Point(s ? r.x : t.x, o ? r.y : t.y));
    l2 = h.pointLocation(e), c.extent([new MM.Location(Math.max(i.lat, l2.lat), Math.min(i.lon, l2.lon)), new MM.Location(Math.min(i.lat, l2.lat), Math.max(i.lon, l2.lon))]), f(document, "mousemove", g), f(document, "mouseup", y), h.parent.style.cursor = "auto"
  }
  function b(e) {
    w(d(e), n)
  }
  function w(e, t) {
    var r = {
      x: parseInt(n.offsetLeft, 10),
      y: parseInt(n.offsetTop, 10)
    },
        i = {
        x: r.x + parseInt(n.offsetWidth, 10),
        y: r.y + parseInt(n.offsetHeight, 10)
        },
        s = "";
    e.y - r.y <= u ? s = "n" : i.y - e.y <= u && (s = "s"), e.x - r.x <= u ? s += "w" : i.x - e.x <= u && (s += "e"), s !== "" && (s += "-resize"), t.style.cursor = s
  }
  function E(e, t) {
    if (!n || !l) return;
    var r = e.locationPoint(l[1]),
        i = e.locationPoint(l[0]),
        s = n.style;
    s.display = "block", s.height = "auto", s.width = "auto", s.left = Math.max(0, i.x) + "px", s.top = Math.max(0, i.y) + "px", s.right = Math.max(0, e.dimensions.x - r.x) + "px", s.bottom = Math.max(0, e.dimensions.y - r.y) + "px"
  }
  var e, t, n, r, i = 0,
      s = !1,
      o = !1,
      u = 5,
      a = MM.addEvent,
      f = MM.removeEvent,
      l, c = {},
      h, p = new MM.CallbackManager(c, ["change"]);
  return c.addCallback = function(e, t) {
    return p.addCallback(e, t), c
  }, c.removeCallback = function(e, t) {
    return p.removeCallback(e, t), c
  }, c.extent = function(e, t) {
    if (!e) return l;
    l = [new MM.Location(Math.max(e[0].lat, e[1].lat), Math.min(e[0].lon, e[1].lon)), new MM.Location(Math.min(e[0].lat, e[1].lat), Math.max(e[0].lon, e[1].lon))], E(h), t || p.dispatchCallback("change", l)
  }, n = document.createElement("div"), n.className = "boxselector-box", r = n.style, c.add = function() {
    return n.id = h.parent.id + "-boxselector-box", h.parent.appendChild(n), i = parseInt(window.getComputedStyle(n).borderWidth, 10), a(h.parent, "mousedown", v), a(n, "mousedown", m), a(h.parent, "mousemove", b), h.addCallback("drawn", E), c
  }, c.map = function(e) {
    return arguments.length ? (h = e, c) : h
  }, c.remove = function() {
    return h.parent.removeChild(n), f(h.parent, "mousedown", v), f(n, "mousedown", m), f(h.parent, "mousemove", b), h.removeCallback("drawn", E), c
  }, c
}, wax = wax || {}, wax.mm = wax.mm || {}, wax._ = {}, wax.mm.bwdetect = function(e, t) {
  t = t || {};
  var n = t.png || ".png128",
      r = t.jpg || ".jpg70",
      i = !1;
  return wax._.bw_png = n, wax._.bw_jpg = r, wax.bwdetect(t, function(t) {
    wax._.bw = !t;
    for (var n = 0; n < e.layers.length; n++) e.getLayerAt(n).provider instanceof wax.mm.connector && e.getLayerAt(n).setProvider(e.getLayerAt(n).provider)
  })
}, wax = wax || {}, wax.mm = wax.mm || {}, wax.mm.fullscreen = function() {
  function o(n) {
    n && n.stop(), e ? t.original() : t.full()
  }
  var e = !1,
      t = {},
      n = document.createElement("a"),
      r, i = document.body,
      s;
  return n.className = "map-fullscreen", n.href = "#fullscreen", t.map = function(e) {
    return arguments.length ? (r = e, t) : r
  }, t.add = function() {
    return bean.add(n, "click", o), r.parent.appendChild(n), t
  }, t.remove = function() {
    return bean.remove(n, "click", o), n.parentNode && n.parentNode.removeChild(n), t
  }, t.full = function() {
    if (e) return;
    return e = !0, s = r.dimensions, r.parent.className += " map-fullscreen-map", i.className += " map-fullscreen-view", r.dimensions = {
      x: r.parent.offsetWidth,
      y: r.parent.offsetHeight
    }, r.draw(), t
  }, t.original = function() {
    if (!e) return;
    return e = !1, r.parent.className = r.parent.className.replace(" map-fullscreen-map", ""), i.className = i.className.replace(" map-fullscreen-view", ""), r.dimensions = s, r.draw(), t
  }, t.fullscreen = function(n) {
    return arguments.length ? (n && !e ? t.full() : !n && e && t.original(), t) : e
  }, t.element = function() {
    return n
  }, t.appendTo = function(e) {
    return wax.u.$(e).appendChild(n), t
  }, t
}, wax = wax || {}, wax.mm = wax.mm || {}, wax.mm.hash = function() {
  var e, t = wax.hash({
    getCenterZoom: function() {
      var t = e.getCenter(),
          n = e.getZoom(),
          r = Math.max(0, Math.ceil(Math.log(n) / Math.LN2));
      return [n.toFixed(2), t.lat.toFixed(r), t.lon.toFixed(r)].join("/")
    },
    setCenterZoom: function(n) {
      e.setCenterZoom(new MM.Location(n[1], n[2]), n[0])
    },
    bindChange: function(t) {
      e.addCallback("drawn", t)
    },
    unbindChange: function(t) {
      e.removeCallback("drawn", t)
    }
  });
  return t.map = function(n) {
    return arguments.length ? (e = n, t) : e
  }, t
}, wax = wax || {}, wax.mm = wax.mm || {}, wax.mm.interaction = function() {
  function i() {
    if (!e && t !== undefined && t.length) return t;
    var r;
    for (var i = 0; i < n.getLayers().length; i++) {
      var s = n.getLayerAt(i).levels,
          o = s && s[Math.round(n.zoom())];
      if (o !== undefined) {
        r = n.getLayerAt(i).tileElementsInLevel(o);
        if (r.length) break
      }
    }
    return t = function(e) {
      var t = [];
      for (var n in e) if (e[n].parentNode === o) {
        var r = wax.u.offset(e[n]);
        t.push([r.top, r.left, e[n]])
      }
      return t
    }(r), t
  }
  function s() {
    e = !0
  }
  function o(e) {
    if (!arguments.length) return n;
    n = e;
    for (var t = 0; t < r.length; t++) n.addCallback(r[t], s)
  }
  function u(e) {
    for (var t = 0; t < r.length; t++) n.removeCallback(r[t], s)
  }
  var e = !1,
      t, n, r = ["zoomed", "panned", "centered", "extentset", "resized", "drawn"];
  return wax.interaction().attach(o).detach(u).parent(function() {
    return n.parent
  }).grid(i)
}, wax = wax || {}, wax.mm = wax.mm || {}, wax.mm.legend = function() {
  var e, t = {},
      n = document.createElement("div");
  n.className = "wax-legends map-legends";
  var r = n.appendChild(document.createElement("div"));
  return r.className = "wax-legend map-legend", r.style.display = "none", t.content = function(e) {
    return arguments.length ? (r.innerHTML = wax.u.sanitize(e), r.style.display = "block", r.innerHTML === "" && (r.style.display = "none"), t) : r.innerHTML
  }, t.element = function() {
    return n
  }, t.map = function(n) {
    return arguments.length ? (e = n, t) : e
  }, t.add = function() {
    return e ? (t.appendTo(e.parent), t) : !1
  }, t.remove = function() {
    return n.parentNode && n.parentNode.removeChild(n), t
  }, t.appendTo = function(e) {
    return wax.u.$(e).appendChild(n), t
  }, t
}, wax = wax || {}, wax.mm = wax.mm || {}, wax.mm.pointselector = function() {
  function f(t) {
    var n = wax.u.eventoffset(t),
        r = new MM.Point(n.x, n.y),
        i = {
        x: parseFloat(MM.getStyle(document.documentElement, "margin-left")),
        y: parseFloat(MM.getStyle(document.documentElement, "margin-top"))
        };
    isNaN(i.x) || (r.x -= i.x), isNaN(i.y) || (r.y -= i.y);
    for (var s = e.parent; s; s = s.offsetParent) r.x -= s.offsetLeft, r.y -= s.offsetTop;
    return r
  }
  function l(e) {
    var t = [];
    for (var n = 0; n < e.length; n++) t.push(new MM.Location(e[n].lat, e[n].lon));
    return t
  }
  function c() {
    var t = new MM.Point(0, 0);
    for (var n = 0; n < a.length; n++) {
      var r = e.locationPoint(a[n]);
      a[n].pointDiv || (a[n].pointDiv = document.createElement("div"), a[n].pointDiv.className = "map-point-div", a[n].pointDiv.style.position = "absolute", a[n].pointDiv.style.display = "block", a[n].pointDiv.location = a[n], bean.add(a[n].pointDiv, "mouseup", function(r) {
        var i = a[n];
        return function(t) {
          MM.removeEvent(e.parent, "mouseup", p), o.deleteLocation(i, t)
        }
      }()), e.parent.appendChild(a[n].pointDiv)), a[n].pointDiv.style.left = r.x + "px", a[n].pointDiv.style.top = r.y + "px"
    }
  }
  function h(n) {
    t = f(n), bean.add(e.parent, "mouseup", p)
  }
  function p(r) {
    if (!t) return;
    n = f(r), MM.Point.distance(t, n) < i && (o.addLocation(e.pointLocation(t)), u.dispatchCallback("change", l(a))), t = null
  }
  var e, t = null,
      n = null,
      r = null,
      i = 5,
      s, o = {},
      u = new MM.CallbackManager(o, ["change"]),
      a = [];
  return o.addLocation = function(e) {
    return a.push(e), c(), u.dispatchCallback("change", l(a)), o
  }, o.locations = function() {
    if (!arguments.length) return a
  }, o.addCallback = function(e, t) {
    return u.addCallback(e, t), o
  }, o.removeCallback = function(e, t) {
    return u.removeCallback(e, t), o
  }, o.map = function(t) {
    return arguments.length ? (e = t, o) : e
  }, o.add = function() {
    return bean.add(e.parent, "mousedown", h), e.addCallback("drawn", c), o
  }, o.remove = function() {
    bean.remove(e.parent, "mousedown", h), e.removeCallback("drawn", c);
    for (var t = a.length - 1; t > -1; t--) o.deleteLocation(a[t]);
    return o
  }, o.deleteLocation = function(e, t) {
    if (!t || confirm("Delete this point?")) {
      e.pointDiv.parentNode.removeChild(e.pointDiv);
      for (var n = 0; n < a.length; n++) if (a[n] === e) {
        a.splice(n, 1);
        break
      }
      u.dispatchCallback("change", l(a))
    }
  }, o
}, wax = wax || {}, wax.mm = wax.mm || {}, wax.mm.zoombox = function() {
  function s(e) {
    var n = new MM.Point(e.clientX, e.clientY);
    n.x += document.body.scrollLeft + document.documentElement.scrollLeft, n.y += document.body.scrollTop + document.documentElement.scrollTop;
    for (var r = t.parent; r; r = r.offsetParent) n.x -= r.offsetLeft, n.y -= r.offsetTop;
    return n
  }
  function o(e) {
    if (!n) return;
    n = !1;
    var u = s(e),
        f = t.pointLocation(u),
        l = t.pointLocation(i);
    t.setExtent([f, l]), r.style.display = "none", MM.removeEvent(t.parent, "mousemove", a), MM.removeEvent(t.parent, "mouseup", o), t.parent.style.cursor = "auto"
  }
  function u(e) {
    if (!e.shiftKey || !! this.drawing) return;
    return n = !0, i = s(e), r.style.left = i.x + "px", r.style.top = i.y + "px", MM.addEvent(t.parent, "mousemove", a), MM.addEvent(t.parent, "mouseup", o), t.parent.style.cursor = "crosshair", MM.cancelEvent(e)
  }
  function a(e) {
    if (!n) return;
    var t = s(e);
    return r.style.display = "block", t.x < i.x ? r.style.left = t.x + "px" : r.style.left = i.x + "px", r.style.width = Math.abs(t.x - i.x) + "px", t.y < i.y ? r.style.top = t.y + "px" : r.style.top = i.y + "px", r.style.height = Math.abs(t.y - i.y) + "px", MM.cancelEvent(e)
  }
  var e = {},
      t, n = !1,
      r = document.createElement("div"),
      i = null;
  return e.map = function(n) {
    return arguments.length ? (t = n, e) : t
  }, e.add = function() {
    return t ? (r.id = t.parent.id + "-zoombox-box", r.className = "zoombox-box", t.parent.appendChild(r), MM.addEvent(t.parent, "mousedown", u), this) : !1
  }, e.remove = function() {
    return t ? (r.parentNode && r.parentNode.removeChild(r), MM.removeEvent(t.parent, "mousedown", u), e) : !1
  }, e
}, wax = wax || {}, wax.mm = wax.mm || {}, wax.mm.zoomer = function() {
  function s(e) {
    e.stop()
  }
  function o(e) {
    e.stop(), t && n.ease ? n.ease.zoom(n.zoom() + 1).run(50) : n.zoomIn()
  }
  function u(e) {
    e.stop(), t && n.ease ? n.ease.zoom(n.zoom() - 1).run(50) : n.zoomOut()
  }
  function a(e, t) {
    e.coordinate.zoom === e.coordLimits[0].zoom ? i.className = "zoomer zoomout zoomdisabled" : e.coordinate.zoom === e.coordLimits[1].zoom ? r.className = "zoomer zoomin zoomdisabled" : (r.className = "zoomer zoomin", i.className = "zoomer zoomout")
  }
  var e = {},
      t = !0,
      n, r = document.createElement("a"),
      i = document.createElement("a");
  return r.innerHTML = "+", r.href = "#", r.className = "zoomer zoomin", i.innerHTML = "-", i.href = "#", i.className = "zoomer zoomout", e.map = function(t) {
    return arguments.length ? (n = t, e) : n
  }, e.add = function() {
    return n ? (n.addCallback("drawn", a), e.appendTo(n.parent), bean.add(r, "mousedown dblclick", s), bean.add(i, "mousedown dblclick", s), bean.add(i, "touchstart click", u), bean.add(r, "touchstart click", o), e) : !1
  }, e.remove = function() {
    return n ? (n.removeCallback("drawn", a), r.parentNode && r.parentNode.removeChild(r), i.parentNode && i.parentNode.removeChild(i), bean.remove(r, "mousedown dblclick", s), bean.remove(i, "mousedown dblclick", s), bean.remove(i, "touchstart click", u), bean.remove(r, "touchstart click", o), e) : !1
  }, e.appendTo = function(t) {
    return wax.u.$(t).appendChild(r), wax.u.$(t).appendChild(i), e
  }, e.smooth = function(n) {
    return arguments.length ? (t = n, e) : t
  }, e
};
var wax = wax || {};
wax.mm = wax.mm || {}, wax.mm._provider = function(e) {
  this.options = {
    tiles: e.tiles,
    scheme: e.scheme || "xyz",
    minzoom: e.minzoom || 0,
    maxzoom: e.maxzoom || 22,
    bounds: e.bounds || [-180, -90, 180, 90]
  }
}, wax.mm._provider.prototype = {
  outerLimits: function() {
    return [this.locationCoordinate(new MM.Location(this.options.bounds[0], this.options.bounds[1])).zoomTo(this.options.minzoom), this.locationCoordinate(new MM.Location(this.options.bounds[2], this.options.bounds[3])).zoomTo(this.options.maxzoom)]
  },
  getTile: function(e) {
    var t;
    if (!(t = this.sourceCoordinate(e))) return null;
    if (t.zoom < this.options.minzoom || t.zoom > this.options.maxzoom) return null;
    t.row = this.options.scheme === "tms" ? Math.pow(2, t.zoom) - t.row - 1 : t.row;
    var n = this.options.tiles[parseInt(Math.pow(2, t.zoom) * t.row + t.column, 10) % this.options.tiles.length].replace("{z}", t.zoom.toFixed(0)).replace("{x}", t.column.toFixed(0)).replace("{y}", t.row.toFixed(0));
    return wax._ && wax._.bw && (n = n.replace(".png", wax._.bw_png).replace(".jpg", wax._.bw_jpg)), n
  }
}, MM && MM.extend(wax.mm._provider, MM.MapProvider), wax.mm.connector = function(e) {
  var t = new wax.mm._provider(e);
  return new MM.Layer(t)
}, function(e, t) {
  var n = function() {
    function l(e, t, n) {
      return n === 0 ? e : n === 1 ? t : e + (t - e) * n
    }
    var e = {},
        n = !1,
        r = !1,
        i, s = {
        easeIn: function(e) {
          return e * e
        },
        easeOut: function(e) {
          return Math.sin(e * Math.PI / 2)
        },
        easeInOut: function(e) {
          return (1 - Math.cos(Math.PI * e)) / 2
        },
        linear: function(e) {
          return e
        }
        },
        o = s.easeOut,
        u, a, f;
    e.stop = function(e) {
      r = !0, u = undefined, i = e
    }, e.running = function() {
      return n
    }, e.point = function(t) {
      return a = f.pointCoordinate(t), e
    }, e.zoom = function(t) {
      return a || (a = f.coordinate.copy()), a = f.enforceZoomLimits(a.zoomTo(t)), e
    }, e.location = function(t) {
      return a = f.locationCoordinate(t), e
    }, e.from = function(t) {
      return arguments.length ? (u = t.copy(), e) : u ? u.copy() : u
    }, e.to = function(t) {
      return arguments.length ? (a = f.enforceZoomLimits(t.copy()), e) : a.copy()
    }, e.path = function(t) {
      return p = c[t], e
    }, e.easing = function(t) {
      return o = s[t], e
    }, e.map = function(t) {
      return arguments.length ? (f = t, e) : f
    };
    var c = {},
        h = new t.Coordinate(0, 0, 0);
    c.screen = function(e, n, r, i) {
      var s = l(e.zoom, n.zoom, r);
      if (!i) return new t.Coordinate(l(e.row, n.row * Math.pow(2, e.zoom - n.zoom), r) * Math.pow(2, s - e.zoom), l(e.column, n.column * Math.pow(2, e.zoom - n.zoom), r) * Math.pow(2, s - e.zoom), s);
      i.row = l(e.row, n.row * Math.pow(2, e.zoom - n.zoom), r) * Math.pow(2, s - e.zoom), i.column = l(e.column, n.column * Math.pow(2, e.zoom - n.zoom), r) * Math.pow(2, s - e.zoom), i.zoom = s
    }, c.about = function(e, n, r, i) {
      var s = l(e.zoom, n.zoom, r),
          o = f.dimensions.x / 2,
          u = f.dimensions.y / 2,
          a = f.tileSize.x,
          c = f.tileSize.y,
          h = o + a * (n.column * Math.pow(2, e.zoom - n.zoom) - e.column),
          p = u + c * (n.row * Math.pow(2, e.zoom - n.zoom) - e.row),
          d = o + a * (n.column * Math.pow(2, s - n.zoom) - e.column * Math.pow(2, s - e.zoom)),
          v = u + c * (n.row * Math.pow(2, s - n.zoom) - e.row * Math.pow(2, s - e.zoom));
      if (!i) return new t.Coordinate(e.column * Math.pow(2, s - e.zoom) - (h - d) / a, e.row * Math.pow(2, s - e.zoom) - (p - v) / c, s);
      i.column = e.column * Math.pow(2, s - e.zoom) - (h - d) / a, i.row = e.row * Math.pow(2, s - e.zoom) - (p - v) / c, i.zoom = s
    };
    var p = c.screen;
    e.t = function(t) {
      return p(u, a, o(t), h), f.coordinate = h, f.draw(), e
    }, e.future = function(e) {
      var t = [];
      for (var n = 0; n < e; n++) t.push(p(u, a, n / (e - 1)));
      return t
    };
    var d;
    return e.resetRun = function() {
      return d = +(new Date), e
    }, e.run = function(s, l) {
      function c() {
        var e = +(new Date) - d;
        if (r) return r = n = !1, i(), i = undefined;
        if (e > s) {
          a.zoom != u.zoom && f.dispatchCallback("zoomed", a.zoom - u.zoom), n = !1, p(u, a, 1, h), f.coordinate = h, a = u = undefined, f.draw();
          if (l) return l(f)
        } else p(u, a, o(e / s), h), f.coordinate = h, f.draw(), t.getFrame(c)
      }
      if (n) return e.stop(function() {
        e.run(s, l)
      });
      u || (u = f.coordinate.copy()), a || (a = f.coordinate.copy()), s = s || 1e3, d = +(new Date), n = !0, t.getFrame(c)
    }, e.optimal = function(r, i, s) {
      function o(e) {
        return e * e
      }
      function c(e) {
        return (Math.exp(e) - Math.exp(-e)) / 2
      }
      function h(e) {
        return (Math.exp(e) + Math.exp(-e)) / 2
      }
      function d(e) {
        return c(e) / h(e)
      }
      function N(e) {
        var t = o(y) - o(g) + (e ? -1 : 1) * Math.pow(i, 4) * o(T - x),
            n = 2 * (e ? y : g) * o(i) * (T - x);
        return t / n
      }
      function C(e) {
        return Math.log(-N(e) + Math.sqrt(o(N(e)) + 1))
      }
      if (n) return e.stop(function() {
        e.optimal(r, i, s)
      });
      r = r || .9, i = i || 1.42, u ? f.coordinate = u : u = f.coordinate.copy();
      var v = f.pointCoordinate(new t.Point(0, 0)).zoomTo(0),
          m = f.pointCoordinate(f.dimensions).zoomTo(0),
          g = Math.max(m.column - v.column, m.row - v.row),
          y = g * Math.pow(2, u.zoom - a.zoom),
          b = u.zoomTo(0),
          w = a.zoomTo(0),
          E = {
          x: b.column,
          y: b.row
          },
          S = {
          x: w.column,
          y: w.row
          },
          x = 0,
          T = Math.sqrt(o(S.x - E.x) + o(S.y - E.y)),
          k = C(0),
          L = C(1),
          A = (L - k) / i,
          O = function(e) {
          return g * h(k) / h(i * e + k)
          },
          M = function(e) {
          return g / o(i) * h(k) * d(i * e + k) - g / o(i) * c(k) + x
          };
      if (Math.abs(T) < 1e-6) {
        if (Math.abs(g - y) < 1e-6) return;
        var _ = y < g ? -1 : 1;
        A = Math.abs(Math.log(y / g)) / i, M = function(e) {
          return x
        }, O = function(e) {
          return g * Math.exp(_ * i * e)
        }
      }
      var D = p;
      p = function(e, n, r, i) {
        if (r == 1) return i && (i.row = a.row, i.column = a.column, i.zoom = a.zoom), a;
        var s = r * A,
            o = M(s),
            u = e.zoom + Math.log(g / O(s)) / Math.LN2,
            f = l(E.x, S.x, o / T || 1),
            c = l(E.y, S.y, o / T || 1),
            h = Math.pow(2, u);
        if (!i) return new t.Coordinate(c * h, f * h, u);
        i.row = c * h, i.column = f * h, i.zoom = u
      }, e.run(A / r * 1e3, function(e) {
        p = D, s && s(e)
      })
    }, e
  };
  this.easey = n, typeof this.mapbox == "undefined" && (this.mapbox = {}), this.mapbox.ease = n
}(this, MM), function(e, t) {
  function r(e, n) {
    function d(r) {
      var f = Math.max(1, r - p);
      u && a ? c || (s.x = u.x - a.x, s.y = u.y - a.y, e.panBy(s.x, s.y), c = !0) : (i.x *= Math.pow(1 - n, f * 60 / 1e3), i.y *= Math.pow(1 - n, f * 60 / 1e3), Math.abs(i.x) < .001 && (i.x = 0), Math.abs(i.y) < .001 && (i.y = 0), (i.x || i.y) && e.panBy(i.x * f, i.y * f)), p = r, o || t.getFrame(d)
    }
    var r = {};
    n = n || .15;
    var i = {
      x: 0,
      y: 0
    },
        s = {
        x: 0,
        y: 0
        },
        o = !1,
        u = null,
        a = null,
        f = null,
        l = null,
        c = !0,
        h, p = (new Date).getTime();
    return r.down = function(n) {
      u = a = t.getMousePoint(n, e), f = l = +(new Date)
    }, r.move = function(n) {
      u && (c && (a = u, l = f, c = !1), u = t.getMousePoint(n, e), f = +(new Date))
    }, r.up = function() {
      +(new Date) - l < 50 ? (dt = Math.max(1, f - l), s.x = u.x - a.x, s.y = u.y - a.y, i.x = s.x / dt, i.y = s.y / dt) : (i.x = 0, i.y = 0), u = a = null, f = null
    }, r.remove = function() {
      o = !0
    }, t.getFrame(d), r
  }
  var n = {};
  n.TouchHandler = function() {
    function d(e) {
      n.parent.focus()
    }
    function v() {
      for (var e in a) a.hasOwnProperty(e) && delete a[e]
    }
    function m(e) {
      for (var t = 0; t < e.touches.length; t += 1) {
        var r = e.touches[t];
        if (r.identifier in a) {
          var i = a[r.identifier];
          i.x = r.clientX, i.y = r.clientY, i.scale = e.scale
        } else a[r.identifier] = {
          scale: e.scale,
          startPos: {
            x: r.clientX,
            y: r.screenY
          },
          startZoom: n.zoom(),
          x: r.clientX,
          y: r.clientY,
          time: (new Date).getTime()
        }
      }
    }
    function g(e) {
      return i || (i = r(n, .1)), t.addEvent(e.touches[0].target, "touchmove", y), t.addEvent(e.touches[0].target, "touchend", x), e.touches[1] && (t.addEvent(e.touches[1].target, "touchmove", y), t.addEvent(e.touches[1].target, "touchend", x)), m(e), i.down(e.touches[0]), t.cancelEvent(e)
    }
    function y(e) {
      switch (e.touches.length) {
      case 1:
        i.move(e.touches[0]);
        break;
      case 2:
        E(e)
      }
      return m(e), t.cancelEvent(e)
    }
    function b(e) {
      if (f.length && e.time - f[0].time < u) {
        w(e), f = [];
        return
      }
      f = [e]
    }
    function w(e) {
      easey().map(n).to(n.pointCoordinate(e).zoomTo(n.getZoom() + 1)).path("about").run(200, function() {
        n.dispatchCallback("zoomed"), v()
      })
    }
    function E(e) {
      var r = e.touches[0],
          i = e.touches[1];
      h.x = r.clientX, h.y = r.clientY, p.x = i.clientX, p.y = i.clientY, l0 = a[r.identifier], l1 = a[i.identifier], l0.wasPinch = !0, l1.wasPinch = !0;
      var s = t.Point.interpolate(h, p, .5);
      n.zoomByAbout(Math.log(e.scale) / Math.LN2 - Math.log(l0.scale) / Math.LN2, s), prevX = l0.x + (l1.x - l0.x) * .5, prevY = l0.y + (l1.y - l0.y) * .5, n.panBy(s.x - prevX, s.y - prevY), l = !0, c = s
    }
    function S(e) {
      var t = n.getZoom(),
          r = a[e.identifier].startZoom > t ? Math.floor(t) : Math.ceil(t);
      easey().map(n).point(c).zoom(r).path("about").run(300), v(), l = !1
    }
    function x(e) {
      t.removeEvent(e.target, "touchmove", y), t.removeEvent(e.target, "touchend", x);
      var n = (new Date).getTime();
      e.touches.length === 0 && l && S(e.changedTouches[0]), i.up();
      for (var r = 0; r < e.changedTouches.length; r += 1) {
        var u = e.changedTouches[r],
            f = a[u.identifier];
        if (!f || f.wasPinch) continue;
        var c = {
          x: u.clientX,
          y: u.clientY
        },
            h = n - f.time,
            p = t.Point.distance(c, f.startPos);
        p > o || (h > s ? (c.end = n, c.duration = h) : (c.time = n, b(c)))
      }
      var d = {};
      for (var v = 0; v < e.touches.length; v++) d[e.touches[v].identifier] = !0;
      for (var m in a) m in d || delete d[m];
      return t.cancelEvent(e)
    }
    var e = {},
        n, i, s = 250,
        o = 30,
        u = 350,
        a = {},
        f = [],
        l = !1,
        c = null,
        h = new t.Point(0, 0),
        p = new t.Point(0, 0);
    return e.init = function(e) {
      n = e, t.addEvent(n.parent, "touchstart", g)
    }, e.remove = function() {
      if (!i) return;
      t.removeEvent(n.parent, "touchstart", g), i.remove()
    }, e
  }, n.DoubleClickHandler = function() {
    function r(e) {
      var r = t.getMousePoint(e, n);
      return z = n.getZoom() + (e.shiftKey ? -1 : 1), easey().map(n).to(n.pointCoordinate(t.getMousePoint(e, n)).zoomTo(z)).path("about").run(100, function() {
        n.dispatchCallback("zoomed")
      }), t.cancelEvent(e)
    }
    var e = {},
        n;
    return e.init = function(i) {
      return n = i, t.addEvent(n.parent, "dblclick", r), e
    }, e.remove = function() {
      t.removeEvent(n.parent, "dblclick", r)
    }, e
  }, n.MouseWheelHandler = function() {
    function u(e) {
      function f() {
        n.dispatchCallback("zoomed")
      }
      var o = 0;
      s = s || (new Date).getTime();
      try {
        r.scrollTop = 1e3, r.dispatchEvent(e), o = 1e3 - r.scrollTop
      } catch (u) {
        o = e.wheelDelta || -e.detail * 5
      }
      var a = (new Date).getTime() - s;
      if (!i.running()) {
        var l = t.getMousePoint(e, n),
            c = n.getZoom();
        i.map(n).easing("easeOut").to(n.pointCoordinate(t.getMousePoint(e, n)).zoomTo(c + (o > 0 ? 1 : -1))).path("about").run(100, f), s = (new Date).getTime()
      } else a > 150 && (i.zoom(i.to().zoom + (o > 0 ? 1 : -1)).from(n.coordinate).resetRun(), s = (new Date).getTime());
      return t.cancelEvent(e)
    }
    var e = {},
        n, r, i = easey(),
        s, o = !1;
    return e.init = function(i) {
      n = i, r = document.body.appendChild(document.createElement("div")), r.style.cssText = "visibility:hidden;top:0;height:0;width:0;overflow-y:scroll";
      var s = r.appendChild(document.createElement("div"));
      return s.style.height = "2000px", t.addEvent(n.parent, "mousewheel", u), e
    }, e.precise = function(t) {
      return arguments.length ? (o = t, e) : o
    }, e.remove = function() {
      t.removeEvent(n.parent, "mousewheel", u), r.parentNode.removeChild(r)
    }, e
  }, n.DragHandler = function() {
    function s(e) {
      n.parent.focus()
    }
    function o(e) {
      if (e.shiftKey || e.button == 2) return;
      return t.addEvent(document, "mousemove", u), t.addEvent(document, "mouseup", a), i.down(e), n.parent.style.cursor = "move", t.cancelEvent(e)
    }
    function u(e) {
      return i.move(e), t.cancelEvent(e)
    }
    function a(e) {
      return t.removeEvent(document, "mousemove", u), t.removeEvent(document, "mouseup", a), i.up(), n.parent.style.cursor = "", t.cancelEvent(e)
    }
    var e = {},
        n, i;
    return e.init = function(e) {
      n = e, t.addEvent(n.parent, "click", s), t.addEvent(n.parent, "mousedown", o), i = r(n)
    }, e.remove = function() {
      t.removeEvent(n.parent, "click", s), t.removeEvent(n.parent, "mousedown", o), i.up(), i.remove()
    }, e
  }, this.easey_handlers = n
}(this, MM), typeof mapbox == "undefined" && (mapbox = {}), typeof mapbox.markers == "undefined" && (mapbox.markers = {}), mapbox.markers.layer = function() {
  function d(t) {
    t.coord || (t.coord = e.map.locationCoordinate(t.location));
    var n = e.map.coordinatePoint(t.coord),
        r, i;
    n.x < 0 ? (r = new MM.Location(t.location.lat, t.location.lon), r.lon += Math.ceil((a.lon - t.location.lon) / 360) * 360, i = e.map.locationPoint(r), i.x < e.map.dimensions.x && (n = i, t.coord = e.map.locationCoordinate(r))) : n.x > e.map.dimensions.x && (r = new MM.Location(t.location.lat, t.location.lon), r.lon -= Math.ceil((t.location.lon - f.lon) / 360) * 360, i = e.map.locationPoint(r), i.x > 0 && (n = i, t.coord = e.map.locationCoordinate(r))), n.scale = 1, n.width = n.height = 0, MM.moveElement(t.element, n)
  }
  var e = {},
      t = [],
      n = [],
      r = new MM.CallbackManager(e, ["drawn", "markeradded"]),
      i = null,
      s = mapbox.markers.simplestyle_factory,
      o = function(e, t) {
      return t.geometry.coordinates[1] - e.geometry.coordinates[1]
      },
      u, a = null,
      f = null,
      l = function() {
      return !0
      },
      c = 0,
      h = function() {
      return ++c
      },
      p = {};
  return e.parent = document.createElement("div"), e.parent.style.cssText = "position: absolute; top: 0px;left:0px; width:100%; height:100%; margin:0; padding:0; z-index:0;pointer-events:none;", e.name = "markers", e.addCallback = function(t, n) {
    return r.addCallback(t, n), e
  }, e.removeCallback = function(t, n) {
    return r.removeCallback(t, n), e
  }, e.draw = function() {
    if (!e.map) return;
    a = e.map.pointLocation(new MM.Point(0, 0)), f = e.map.pointLocation(new MM.Point(e.map.dimensions.x, 0)), r.dispatchCallback("drawn", e);
    for (var t = 0; t < n.length; t++) d(n[t])
  }, e.add = function(t) {
    return !t || !t.element ? null : (e.parent.appendChild(t.element), n.push(t), r.dispatchCallback("markeradded", t), t)
  }, e.remove = function(t) {
    if (!t) return null;
    e.parent.removeChild(t.element);
    for (var r = 0; r < n.length; r++) if (n[r] === t) return n.splice(r, 1), t;
    return t
  }, e.markers = function(e) {
    if (!arguments.length) return n
  }, e.add_feature = function(t) {
    return e.features(e.features().concat([t]))
  }, e.sort = function(t) {
    return arguments.length ? (o = t, e) : o
  }, e.features = function(r) {
    if (!arguments.length) return t;
    r || (r = []), t = r.slice(), t.sort(o);
    for (var i = 0; i < n.length; i++) n[i].touch = !1;
    for (var u = 0; u < t.length; u++) if (l(t[u])) {
      var a = h(t[u]);
      p[a] ? (p[a].location = new MM.Location(t[u].geometry.coordinates[1], t[u].geometry.coordinates[0]), p[a].coord = null, d(p[a])) : p[a] = e.add({
        element: s(t[u]),
        location: new MM.Location(t[u].geometry.coordinates[1], t[u].geometry.coordinates[0]),
        data: t[u]
      }), p[a] && (p[a].touch = !0)
    }
    for (var f = n.length - 1; f >= 0; f--) n[f].touch === !1 && e.remove(n[f]);
    return e.map && e.map.coordinate && e.map.draw(), e
  }, e.url = function(t, n) {
    function r(t, r) {
      if (t && n) return n(t);
      var i = typeof r != "undefined" && r.features ? r.features : null;
      i && e.features(i), n && n(t, i, e)
    }
    if (!arguments.length) return u;
    if (typeof reqwest == "undefined") throw "reqwest is required for url loading";
    return typeof t == "string" && (t = [t]), u = t, reqwest(u[0].match(/geojsonp$/) ? {
      url: u[0] + (~u[0].indexOf("?") ? "&" : "?") + "callback=?",
      type: "jsonp",
      success: function(e) {
        r(null, e)
      },
      error: r
    } : {
      url: u[0],
      type: "json",
      success: function(e) {
        r(null, e)
      },
      error: r
    }), e
  }, e.id = function(t, n) {
    return e.url("http://a.tiles.mapbox.com/v3/" + t + "/markers.geojsonp", n)
  }, e.csv = function(t) {
    return e.features(mapbox.markers.csv_to_geojson(t))
  }, e.extent = function() {
    var t = [{
      lat: Infinity,
      lon: Infinity
    }, {
      lat: -Infinity,
      lon: -Infinity
    }],
        n = e.features();
    for (var r = 0; r < n.length; r++) {
      var i = n[r].geometry.coordinates;
      i[0] < t[0].lon && (t[0].lon = i[0]), i[1] < t[0].lat && (t[0].lat = i[1]), i[0] > t[1].lon && (t[1].lon = i[0]), i[1] > t[1].lat && (t[1].lat = i[1])
    }
    return t
  }, e.key = function(t) {
    return arguments.length ? (t === null ? h = function() {
      return ++c
    } : h = t, e) : h
  }, e.factory = function(t) {
    return arguments.length ? (s = t, e.features(e.features()), e) : s
  }, e.filter = function(t) {
    return arguments.length ? (l = t, e.features(e.features()), e) : l
  }, e.destroy = function() {
    e.parent.parentNode && e.parent.parentNode.removeChild(e.parent)
  }, e.named = function(t) {
    return arguments.length ? (e.name = t, e) : e.name
  }, e.enabled = !0, e.enable = function() {
    return this.enabled = !0, this.parent.style.display = "", e
  }, e.disable = function() {
    return this.enabled = !1, this.parent.style.display = "none", e
  }, e
}, mmg = mapbox.markers.layer, mapbox.markers.interaction = function(e) {
  function f() {
    e.map.addCallback("panned", function() {
      if (i) while (n.length) e.remove(n.pop())
    })
  }
  if (e && e.interaction) return e.interaction;
  var t = {},
      n = [],
      r = !0,
      i = !0,
      s = !0,
      o = null,
      u = !0,
      a;
  t.formatter = function(e) {
    return arguments.length ? (a = e, t) : a
  }, t.formatter(function(e) {
    var t = "",
        n = e.properties;
    return n ? (n.title && (t += '<div class="marker-title">' + n.title + "</div>"), n.description && (t += '<div class="marker-description">' + n.description + "</div>"), typeof html_sanitize !== undefined && (t = html_sanitize(t, function(e) {
      if (/^(https?:\/\/|data:image)/.test(e)) return e
    }, function(e) {
      return e
    })), t) : null
  }), t.hideOnMove = function(e) {
    return arguments.length ? (i = e, t) : i
  }, t.exclusive = function(e) {
    return arguments.length ? (r = e, t) : r
  }, t.showOnHover = function(e) {
    return arguments.length ? (s = e, t) : s
  }, t.hideTooltips = function() {
    while (n.length) e.remove(n.pop());
    for (var t = 0; t < l.length; t++) delete l[t].clicked
  }, t.add = function() {
    return u = !0, t
  }, t.remove = function() {
    return u = !1, t
  }, t.bindMarker = function(i) {
    var f = function() {
      if (s === !1) return;
      i.clicked || (o = window.setTimeout(function() {
        t.hideTooltips()
      }, 200))
    },
        l = function(l) {
        function v(e) {
          return e.cancelBubble = !0, e.stopPropagation && e.stopPropagation(), !1
        }
        if (l && l.type == "mouseover" && s === !1) return;
        if (!u) return;
        var c = a(i.data);
        if (!c) return;
        r && n.length > 0 && (t.hideTooltips(), o && window.clearTimeout(o));
        var h = document.createElement("div");
        h.className = "marker-tooltip", h.style.width = "100%";
        var p = h.appendChild(document.createElement("div"));
        p.style.cssText = "position: absolute; pointer-events: none;";
        var d = p.appendChild(document.createElement("div"));
        d.className = "marker-popup", d.style.cssText = "pointer-events: auto;", typeof c == "string" ? d.innerHTML = c : d.appendChild(c), p.style.bottom = i.element.offsetHeight / 2 + 20 + "px", MM.addEvent(d, "mousedown", v), MM.addEvent(d, "touchstart", v), s && (h.onmouseover = function() {
          o && window.clearTimeout(o)
        }, h.onmouseout = f);
        var m = {
          element: h,
          data: {},
          interactive: !1,
          location: i.location.copy()
        };
        n.push(m), i.tooltip = m, e.add(m), e.draw()
        };
    i.showTooltip = l, i.element.onclick = i.element.ontouchstart = function() {
      l(), i.clicked = !0
    }, i.element.onmouseover = l, i.element.onmouseout = f
  };
  if (e) {
    e.addCallback("drawn", f);
    var l = e.markers();
    for (var c = 0; c < l.length; c++) t.bindMarker(l[c]);
    e.addCallback("markeradded", function(e, n) {
      n.interactive !== !1 && t.bindMarker(n)
    }), e.interaction = t
  }
  return t
}, mmg_interaction = mapbox.markers.interaction, mapbox.markers.csv_to_geojson = function(e) {
  function t(e) {
    var t;
    return n(e, function(e, n) {
      if (n) {
        var r = {},
            i = -1,
            s = t.length;
        while (++i < s) r[t[i]] = e[i];
        return r
      }
      return t = e, null
    })
  }
  function n(e, t) {
    function f() {
      if (s.lastIndex >= e.length) return r;
      if (a) return a = !1, n;
      var t = s.lastIndex;
      if (e.charCodeAt(t) === 34) {
        var i = t;
        while (i++ < e.length) if (e.charCodeAt(i) === 34) {
          if (e.charCodeAt(i + 1) !== 34) break;
          i++
        }
        s.lastIndex = i + 2;
        var o = e.charCodeAt(i + 1);
        return o === 13 ? (a = !0, e.charCodeAt(i + 2) === 10 && s.lastIndex++) : o === 10 && (a = !0), e.substring(t + 1, i).replace(/""/g, '"')
      }
      var u = s.exec(e);
      return u ? (a = u[0].charCodeAt(0) !== 44, e.substring(t, u.index)) : (s.lastIndex = e.length, e.substring(t))
    }
    var n = {},
        r = {},
        i = [],
        s = /\r\n|[,\r\n]/g,
        o = 0,
        u, a;
    s.lastIndex = 0;
    while ((u = f()) !== r) {
      var l = [];
      while (u !== n && u !== r) l.push(u), u = f();
      if (t && !(l = t(l, o++))) continue;
      i.push(l)
    }
    return i
  }
  var r = [],
      i = t(e);
  if (!i.length) return r;
  var s = "",
      o = "";
  for (var u in i[0]) u.match(/^Lat/i) && (s = u), u.match(/^Lon/i) && (o = u);
  if (!s || !o) throw "CSV: Could not find latitude or longitude field";
  for (var a = 0; a < i.length; a++) i[a][o] !== undefined && i[a][o] !== undefined && r.push({
    type: "Feature",
    properties: i[a],
    geometry: {
      type: "Point",
      coordinates: [parseFloat(i[a][o]), parseFloat(i[a][s])]
    }
  });
  return r
}, mapbox.markers.simplestyle_factory = function(e) {
  var t = {
    small: [20, 50],
    medium: [30, 70],
    large: [35, 90]
  },
      n = e.properties || {},
      r = n["marker-size"] || "medium",
      i = n["marker-symbol"] ? "-" + n["marker-symbol"] : "",
      s = n["marker-color"] || "7e7e7e";
  s = s.replace("#", "");
  var o = document.createElement("img");
  o.width = t[r][0], o.height = t[r][1], o.className = "simplestyle-marker", o.alt = n.title || "", o.src = (mapbox.markers.marker_baseurl || "http://a.tiles.mapbox.com/v3/marker/") + "pin-" + r.charAt(0) + i + "+" + s + (window.devicePixelRatio === 2 ? "@2x" : "") + ".png";
  var u = o.style;
  return u.position = "absolute", u.clip = "rect(auto auto " + t[r][1] * .75 + "px auto)", u.marginTop = -(t[r][1] / 2) + "px", u.marginLeft = -(t[r][0] / 2) + "px", u.cursor = "pointer", u.pointerEvents = "all", o
}, typeof mapbox == "undefined" && (mapbox = {}), mapbox.MAPBOX_URL = "http://a.tiles.mapbox.com/v3/", mapbox.map = function(e, t, n, r) {
  var i = new MM.Map(e, t, n, r || [easey_handlers.TouchHandler(), easey_handlers.DragHandler(), easey_handlers.DoubleClickHandler(), easey_handlers.MouseWheelHandler()]);
  i.setZoomRange(0, 17), i.ease = easey().map(i), i.ui = mapbox.ui(i), i.interaction = mapbox.interaction().map(i), i.auto = function() {
    this.ui.zoomer.add(), this.ui.zoombox.add(), this.ui.legend.add(), this.ui.attribution.add(), this.ui.refresh(), this.interaction.auto();
    for (var e = 0; e < this.layers.length; e++) if (this.layers[e].tilejson) {
      var t = this.layers[e].tilejson(),
          n = t.center || new MM.Location(0, 0),
          r = t.zoom || 0;
      this.setCenterZoom(n, r);
      break
    }
    return this
  }, i.refresh = function() {
    return this.ui.refresh(), this.interaction.refresh(), this
  };
  var s = [easey_handlers.TouchHandler, easey_handlers.DragHandler, easey_handlers.DoubleClickHandler, easey_handlers.MouseWheelHandler],
      o = [MM.TouchHandler, MM.DragHandler, MM.DoubleClickHandler, MM.MouseWheelHandler];
  return MM.Map.prototype.smooth = function(e) {
    while (this.eventHandlers.length) this.eventHandlers.pop().remove();
    var t = e ? s : o;
    for (var n = 0; n < t.length; n++) {
      var r = t[n]();
      this.eventHandlers.push(r), r.init(this)
    }
    return i
  }, i.setPanLimits = function(e) {
    return e instanceof MM.Extent || (e = new MM.Extent(new MM.Location(e[0].lat, e[0].lon), new MM.Location(e[1].lat, e[1].lon))), e = e.toArray(), this.coordLimits = [this.locationCoordinate(e[0]).zoomTo(this.coordLimits[0].zoom), this.locationCoordinate(e[1]).zoomTo(this.coordLimits[1].zoom)], i
  }, i.center = function(e, t) {
    if (!e || !t) return MM.Map.prototype.center.call(this, e);
    this.ease.location(e).zoom(this.zoom()).optimal(null, null, t.callback)
  }, i.zoom = function(e, t) {
    if (e === undefined || !t) return MM.Map.prototype.zoom.call(this, e);
    this.ease.to(this.coordinate).zoom(e).run(600)
  }, i.centerzoom = function(e, t, n) {
    if (e && t !== undefined && n) this.ease.location(e).zoom(t).optimal(null, null, n.callback);
    else if (e && t !== undefined) return this.setCenterZoom(e, t)
  }, i.addTileLayer = function(e) {
    for (var t = i.layers.length; t > 0; t--) if (!i.layers[t - 1].features) return this.insertLayerAt(t, e);
    return this.insertLayerAt(0, e)
  }, i.removeLayerAt = function(e) {
    return MM.Map.prototype.removeLayerAt.call(this, e), MM.getFrame(this.getRedraw()), this
  }, i.swapLayersAt = function(e, t) {
    return MM.Map.prototype.swapLayersAt.call(this, e, t), MM.getFrame(this.getRedraw()), this
  }, i
}, this.mapbox = mapbox, typeof mapbox == "undefined" && (mapbox = {}), mapbox.auto = function(e, t, n) {
  mapbox.load(t, function(t) {
    var r = t instanceof Array ? t : [t],
        i = [],
        s = [];
    for (var o = 0; o < r.length; o++) r[o].layer && i.push(r[o].layer), r[o].markers && s.push(r[o].markers);
    var u = mapbox.map(e, i.concat(s)).auto();
    n && n(u, t)
  })
}, mapbox.load = function(e, t) {
  if (e instanceof Array) return mapbox.util.asyncMap(e, mapbox.load, t);
  e.indexOf("http") !== 0 && (e = mapbox.MAPBOX_URL + e + ".jsonp"), wax.tilejson(e, function(e) {
    e.zoom = e.center[2], e.center = {
      lat: e.center[1],
      lon: e.center[0]
    }, e.thumbnail = mapbox.MAPBOX_URL + e.id + "/thumb.png", e.layer = mapbox.layer().tilejson(e), e.data ? (e.markers = mapbox.markers.layer(), e.markers.url(e.data, function() {
      mapbox.markers.interaction(e.markers), t(e)
    })) : t(e)
  })
}, typeof mapbox == "undefined" && (mapbox = {}), mapbox.layer = function() {
  if (!(this instanceof mapbox.layer)) return new mapbox.layer;
  this._tilejson = {}, this._url = "", this._id = "", this._composite = !0, this.name = "", this.parent = document.createElement("div"), this.parent.style.cssText = "position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; margin: 0; padding: 0; z-index: 0", this.levels = {}, this.requestManager = new MM.RequestManager, this.requestManager.addCallback("requestcomplete", this.getTileComplete()), this.requestManager.addCallback("requesterror", this.getTileError()), this.setProvider(new wax.mm._provider({
    tiles: ["data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"]
  }))
}, mapbox.layer.prototype.refresh = function(e) {
  var t = this;
  return wax.tilejson(this._url, function(n) {
    t.tilejson(n), e && e(t)
  }), this
}, mapbox.layer.prototype.url = function(e, t) {
  return arguments.length ? (this._mapboxhosting = e.indexOf(mapbox.MAPBOX_URL) == 0, this._url = e, this.refresh(t)) : this._url
}, mapbox.layer.prototype.id = function(e, t) {
  return arguments.length ? (this.named(e), this._id = e, this.url(mapbox.MAPBOX_URL + e + ".jsonp", t)) : this._id
}, mapbox.layer.prototype.named = function(e) {
  return arguments.length ? (this.name = e, this) : this.name
}, mapbox.layer.prototype.tilejson = function(e) {
  if (!arguments.length) return this._tilejson;
  (!this._composite || !this._mapboxhosting) && this.setProvider(new wax.mm._provider(e)), this._tilejson = e, this.name = this.name || e.id, this._id = this._id || e.id;
  if (e.bounds) {
    var t = new MM.MercatorProjection(0, MM.deriveTransformation(-Math.PI, Math.PI, 0, 0, Math.PI, Math.PI, 1, 0, -Math.PI, -Math.PI, 0, 1));
    this.provider.tileLimits = [t.locationCoordinate(new MM.Location(e.bounds[3], e.bounds[0])).zoomTo(e.minzoom ? e.minzoom : 0), t.locationCoordinate(new MM.Location(e.bounds[1], e.bounds[2])).zoomTo(e.maxzoom ? e.maxzoom : 18)]
  }
  return this
}, mapbox.layer.prototype.draw = function() {
  if (!this.enabled || !this.map) return;
  if (this._composite && this._mapboxhosting) {
    var e = 0;
    for (e; e < this.map.layers.length; e++) if (this.map.layers[e] == this) break;
    for (var t = e - 1; t >= 0; t--) if (this.map.getLayerAt(t).enabled) {
      if (this.map.getLayerAt(t)._composite) return this.parent.style.display = "none", this.compositeLayer = !1, this;
      break
    }
    var n = [];
    for (var r = e; r < this.map.layers.length; r++) {
      var i = this.map.getLayerAt(r);
      if (i.enabled) {
        if (!i._composite || !i._mapboxhosting) break;
        n.push(i.id())
      }
    }
    n = n.join(",");
    if (this.compositeLayer !== n) {
      this.compositeLayer = n;
      var s = this;
      return wax.tilejson(mapbox.MAPBOX_URL + n + ".jsonp", function(e) {
        s.setProvider(new wax.mm._provider(e))
      }), this.parent.style.display = "", this
    }
  } else this.parent.style.display = "", this.compositeLayer && (this.compositeLayer = !1, this.setProvider(new wax.mm._provider(this.tilejson())));
  return MM.Layer.prototype.draw.call(this)
}, mapbox.layer.prototype.composite = function(e) {
  return arguments.length ? (e ? this._composite = !0 : this._composite = !1, this) : this._composite
}, mapbox.layer.prototype.enable = function(e) {
  return MM.Layer.prototype.enable.call(this, e), this.map && this.map.draw(), this
}, mapbox.layer.prototype.disable = function(e) {
  return MM.Layer.prototype.disable.call(this, e), this.map && this.map.draw(), this
}, MM.extend(mapbox.layer, MM.Layer), typeof mapbox == "undefined" && (mapbox = {}), mapbox.ui = function(e) {
  function n(e) {
    var t = {},
        n = [];
    for (var r = 0; r < e.length; r++) t[e[r]] = !0;
    for (var i in t) i && n.push(i);
    return n
  }
  var t = {
    zoomer: wax.mm.zoomer().map(e).smooth(!0),
    pointselector: wax.mm.pointselector().map(e),
    hash: wax.mm.hash().map(e),
    zoombox: wax.mm.zoombox().map(e),
    fullscreen: wax.mm.fullscreen().map(e),
    legend: wax.mm.legend().map(e),
    attribution: wax.mm.attribution().map(e)
  };
  return t.refresh = function() {
    if (!e) return console && console.error("ui not attached to map");
    var r = [],
        i = [];
    for (var s = 0; s < e.layers.length; s++) if (e.layers[s].enabled && e.layers[s].tilejson) {
      var o = e.layers[s].tilejson().attribution;
      o && r.push(o);
      var u = e.layers[s].tilejson().legend;
      u && i.push(u)
    }
    var a = n(r),
        f = n(i);
    t.attribution.content(a.length ? a.join("<br />") : ""), t.legend.content(f.length ? f.join("<br />") : ""), t.attribution.element().style.display = a.length ? "" : "none", t.legend.element().style.display = f.length ? "" : "none"
  }, t
}, typeof mapbox == "undefined" && (mapbox = {}), mapbox.interaction = function() {
  var e = wax.mm.interaction(),
      t = !1;
  return e.refresh = function() {
    var n = e.map();
    if (!t || !n) return e;
    for (var r = n.layers.length - 1; r >= 0; r--) if (n.layers[r].enabled) {
      var i = n.layers[r].tilejson && n.layers[r].tilejson();
      if (i && i.template) return e.tilejson(i)
    }
    return e.tilejson({})
  }, e.auto = function() {
    return t = !0, e.on(wax.tooltip().animate(!0).parent(e.map().parent).events()).on(wax.location().events()), e.refresh()
  }, e
}, typeof mapbox == "undefined" && (mapbox = {}), mapbox.util = {
  asyncMap: function(e, t, n) {
    function s(e) {
      return function(t) {
        i[e] = t, r--, r || n(i)
      }
    }
    var r = e.length,
        i = [];
    for (var o = 0; o < e.length; o++) t(e[o], s(o))
  }
};