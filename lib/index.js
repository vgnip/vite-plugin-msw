import gt from "fs";
import I from "path";
import { fileURLToPath as Rt } from "node:url";
import { loadEnv as Ct } from "vite";
var ie = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Nt(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
function jt(t) {
  if (Object.prototype.hasOwnProperty.call(t, "__esModule")) return t;
  var n = t.default;
  if (typeof n == "function") {
    var o = function y() {
      return this instanceof y ? Reflect.construct(n, arguments, this.constructor) : n.apply(this, arguments);
    };
    o.prototype = n.prototype;
  } else o = {};
  return Object.defineProperty(o, "__esModule", { value: !0 }), Object.keys(t).forEach(function(y) {
    var a = Object.getOwnPropertyDescriptor(t, y);
    Object.defineProperty(o, y, a.get ? a : {
      enumerable: !0,
      get: function() {
        return t[y];
      }
    });
  }), o;
}
var oe = {}, V = {}, Je;
function M() {
  return Je || (Je = 1, V.fromCallback = function(t) {
    return Object.defineProperty(function(...n) {
      if (typeof n[n.length - 1] == "function") t.apply(this, n);
      else
        return new Promise((o, y) => {
          n.push((a, s) => a != null ? y(a) : o(s)), t.apply(this, n);
        });
    }, "name", { value: t.name });
  }, V.fromPromise = function(t) {
    return Object.defineProperty(function(...n) {
      const o = n[n.length - 1];
      if (typeof o != "function") return t.apply(this, n);
      n.pop(), t.apply(this, n).then((y) => o(null, y), o);
    }, "name", { value: t.name });
  }), V;
}
const $t = {}, Lt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $t
}, Symbol.toStringTag, { value: "Module" })), X = /* @__PURE__ */ jt(Lt);
var ce, Ae;
function Tt() {
  if (Ae) return ce;
  Ae = 1;
  var t = X, n = process.cwd, o = null, y = process.env.GRACEFUL_FS_PLATFORM || process.platform;
  process.cwd = function() {
    return o || (o = n.call(process)), o;
  };
  try {
    process.cwd();
  } catch {
  }
  if (typeof process.chdir == "function") {
    var a = process.chdir;
    process.chdir = function(r) {
      o = null, a.call(process, r);
    }, Object.setPrototypeOf && Object.setPrototypeOf(process.chdir, a);
  }
  ce = s;
  function s(r) {
    t.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./) && E(r), r.lutimes || k(r), r.chown = h(r.chown), r.fchown = h(r.fchown), r.lchown = h(r.lchown), r.chmod = m(r.chmod), r.fchmod = m(r.fchmod), r.lchmod = m(r.lchmod), r.chownSync = c(r.chownSync), r.fchownSync = c(r.fchownSync), r.lchownSync = c(r.lchownSync), r.chmodSync = g(r.chmodSync), r.fchmodSync = g(r.fchmodSync), r.lchmodSync = g(r.lchmodSync), r.stat = u(r.stat), r.fstat = u(r.fstat), r.lstat = u(r.lstat), r.statSync = F(r.statSync), r.fstatSync = F(r.fstatSync), r.lstatSync = F(r.lstatSync), r.chmod && !r.lchmod && (r.lchmod = function(e, i, f) {
      f && process.nextTick(f);
    }, r.lchmodSync = function() {
    }), r.chown && !r.lchown && (r.lchown = function(e, i, f, l) {
      l && process.nextTick(l);
    }, r.lchownSync = function() {
    }), y === "win32" && (r.rename = typeof r.rename != "function" ? r.rename : function(e) {
      function i(f, l, v) {
        var d = Date.now(), S = 0;
        e(f, l, function w(P) {
          if (P && (P.code === "EACCES" || P.code === "EPERM" || P.code === "EBUSY") && Date.now() - d < 6e4) {
            setTimeout(function() {
              r.stat(l, function(O, x) {
                O && O.code === "ENOENT" ? e(f, l, w) : v(P);
              });
            }, S), S < 100 && (S += 10);
            return;
          }
          v && v(P);
        });
      }
      return Object.setPrototypeOf && Object.setPrototypeOf(i, e), i;
    }(r.rename)), r.read = typeof r.read != "function" ? r.read : function(e) {
      function i(f, l, v, d, S, w) {
        var P;
        if (w && typeof w == "function") {
          var O = 0;
          P = function(x, B, ee) {
            if (x && x.code === "EAGAIN" && O < 10)
              return O++, e.call(r, f, l, v, d, S, P);
            w.apply(this, arguments);
          };
        }
        return e.call(r, f, l, v, d, S, P);
      }
      return Object.setPrototypeOf && Object.setPrototypeOf(i, e), i;
    }(r.read), r.readSync = typeof r.readSync != "function" ? r.readSync : /* @__PURE__ */ function(e) {
      return function(i, f, l, v, d) {
        for (var S = 0; ; )
          try {
            return e.call(r, i, f, l, v, d);
          } catch (w) {
            if (w.code === "EAGAIN" && S < 10) {
              S++;
              continue;
            }
            throw w;
          }
      };
    }(r.readSync);
    function E(e) {
      e.lchmod = function(i, f, l) {
        e.open(
          i,
          t.O_WRONLY | t.O_SYMLINK,
          f,
          function(v, d) {
            if (v) {
              l && l(v);
              return;
            }
            e.fchmod(d, f, function(S) {
              e.close(d, function(w) {
                l && l(S || w);
              });
            });
          }
        );
      }, e.lchmodSync = function(i, f) {
        var l = e.openSync(i, t.O_WRONLY | t.O_SYMLINK, f), v = !0, d;
        try {
          d = e.fchmodSync(l, f), v = !1;
        } finally {
          if (v)
            try {
              e.closeSync(l);
            } catch {
            }
          else
            e.closeSync(l);
        }
        return d;
      };
    }
    function k(e) {
      t.hasOwnProperty("O_SYMLINK") && e.futimes ? (e.lutimes = function(i, f, l, v) {
        e.open(i, t.O_SYMLINK, function(d, S) {
          if (d) {
            v && v(d);
            return;
          }
          e.futimes(S, f, l, function(w) {
            e.close(S, function(P) {
              v && v(w || P);
            });
          });
        });
      }, e.lutimesSync = function(i, f, l) {
        var v = e.openSync(i, t.O_SYMLINK), d, S = !0;
        try {
          d = e.futimesSync(v, f, l), S = !1;
        } finally {
          if (S)
            try {
              e.closeSync(v);
            } catch {
            }
          else
            e.closeSync(v);
        }
        return d;
      }) : e.futimes && (e.lutimes = function(i, f, l, v) {
        v && process.nextTick(v);
      }, e.lutimesSync = function() {
      });
    }
    function m(e) {
      return e && function(i, f, l) {
        return e.call(r, i, f, function(v) {
          p(v) && (v = null), l && l.apply(this, arguments);
        });
      };
    }
    function g(e) {
      return e && function(i, f) {
        try {
          return e.call(r, i, f);
        } catch (l) {
          if (!p(l)) throw l;
        }
      };
    }
    function h(e) {
      return e && function(i, f, l, v) {
        return e.call(r, i, f, l, function(d) {
          p(d) && (d = null), v && v.apply(this, arguments);
        });
      };
    }
    function c(e) {
      return e && function(i, f, l) {
        try {
          return e.call(r, i, f, l);
        } catch (v) {
          if (!p(v)) throw v;
        }
      };
    }
    function u(e) {
      return e && function(i, f, l) {
        typeof f == "function" && (l = f, f = null);
        function v(d, S) {
          S && (S.uid < 0 && (S.uid += 4294967296), S.gid < 0 && (S.gid += 4294967296)), l && l.apply(this, arguments);
        }
        return f ? e.call(r, i, f, v) : e.call(r, i, v);
      };
    }
    function F(e) {
      return e && function(i, f) {
        var l = f ? e.call(r, i, f) : e.call(r, i);
        return l && (l.uid < 0 && (l.uid += 4294967296), l.gid < 0 && (l.gid += 4294967296)), l;
      };
    }
    function p(e) {
      if (!e || e.code === "ENOSYS")
        return !0;
      var i = !process.getuid || process.getuid() !== 0;
      return !!(i && (e.code === "EINVAL" || e.code === "EPERM"));
    }
  }
  return ce;
}
var ae, Ue;
function Mt() {
  if (Ue) return ae;
  Ue = 1;
  var t = X.Stream;
  ae = n;
  function n(o) {
    return {
      ReadStream: y,
      WriteStream: a
    };
    function y(s, r) {
      if (!(this instanceof y)) return new y(s, r);
      t.call(this);
      var E = this;
      this.path = s, this.fd = null, this.readable = !0, this.paused = !1, this.flags = "r", this.mode = 438, this.bufferSize = 64 * 1024, r = r || {};
      for (var k = Object.keys(r), m = 0, g = k.length; m < g; m++) {
        var h = k[m];
        this[h] = r[h];
      }
      if (this.encoding && this.setEncoding(this.encoding), this.start !== void 0) {
        if (typeof this.start != "number")
          throw TypeError("start must be a Number");
        if (this.end === void 0)
          this.end = 1 / 0;
        else if (typeof this.end != "number")
          throw TypeError("end must be a Number");
        if (this.start > this.end)
          throw new Error("start must be <= end");
        this.pos = this.start;
      }
      if (this.fd !== null) {
        process.nextTick(function() {
          E._read();
        });
        return;
      }
      o.open(this.path, this.flags, this.mode, function(c, u) {
        if (c) {
          E.emit("error", c), E.readable = !1;
          return;
        }
        E.fd = u, E.emit("open", u), E._read();
      });
    }
    function a(s, r) {
      if (!(this instanceof a)) return new a(s, r);
      t.call(this), this.path = s, this.fd = null, this.writable = !0, this.flags = "w", this.encoding = "binary", this.mode = 438, this.bytesWritten = 0, r = r || {};
      for (var E = Object.keys(r), k = 0, m = E.length; k < m; k++) {
        var g = E[k];
        this[g] = r[g];
      }
      if (this.start !== void 0) {
        if (typeof this.start != "number")
          throw TypeError("start must be a Number");
        if (this.start < 0)
          throw new Error("start must be >= zero");
        this.pos = this.start;
      }
      this.busy = !1, this._queue = [], this.fd === null && (this._open = o.open, this._queue.push([this._open, this.path, this.flags, this.mode, void 0]), this.flush());
    }
  }
  return ae;
}
var ue, Be;
function It() {
  if (Be) return ue;
  Be = 1, ue = n;
  var t = Object.getPrototypeOf || function(o) {
    return o.__proto__;
  };
  function n(o) {
    if (o === null || typeof o != "object")
      return o;
    if (o instanceof Object)
      var y = { __proto__: t(o) };
    else
      var y = /* @__PURE__ */ Object.create(null);
    return Object.getOwnPropertyNames(o).forEach(function(a) {
      Object.defineProperty(y, a, Object.getOwnPropertyDescriptor(o, a));
    }), y;
  }
  return ue;
}
var Q, Ge;
function K() {
  if (Ge) return Q;
  Ge = 1;
  var t = gt, n = Tt(), o = Mt(), y = It(), a = X, s, r;
  typeof Symbol == "function" && typeof Symbol.for == "function" ? (s = Symbol.for("graceful-fs.queue"), r = Symbol.for("graceful-fs.previous")) : (s = "___graceful-fs.queue", r = "___graceful-fs.previous");
  function E() {
  }
  function k(e, i) {
    Object.defineProperty(e, s, {
      get: function() {
        return i;
      }
    });
  }
  var m = E;
  if (a.debuglog ? m = a.debuglog("gfs4") : /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && (m = function() {
    var e = a.format.apply(a, arguments);
    e = "GFS4: " + e.split(/\n/).join(`
GFS4: `), console.error(e);
  }), !t[s]) {
    var g = ie[s] || [];
    k(t, g), t.close = function(e) {
      function i(f, l) {
        return e.call(t, f, function(v) {
          v || F(), typeof l == "function" && l.apply(this, arguments);
        });
      }
      return Object.defineProperty(i, r, {
        value: e
      }), i;
    }(t.close), t.closeSync = function(e) {
      function i(f) {
        e.apply(t, arguments), F();
      }
      return Object.defineProperty(i, r, {
        value: e
      }), i;
    }(t.closeSync), /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && process.on("exit", function() {
      m(t[s]), X.equal(t[s].length, 0);
    });
  }
  ie[s] || k(ie, t[s]), Q = h(y(t)), process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !t.__patched && (Q = h(t), t.__patched = !0);
  function h(e) {
    n(e), e.gracefulify = h, e.createReadStream = xt, e.createWriteStream = qt;
    var i = e.readFile;
    e.readFile = f;
    function f(b, q, D) {
      return typeof q == "function" && (D = q, q = null), $(b, q, D);
      function $(L, j, C, N) {
        return i(L, j, function(_) {
          _ && (_.code === "EMFILE" || _.code === "ENFILE") ? c([$, [L, j, C], _, N || Date.now(), Date.now()]) : typeof C == "function" && C.apply(this, arguments);
        });
      }
    }
    var l = e.writeFile;
    e.writeFile = v;
    function v(b, q, D, $) {
      return typeof D == "function" && ($ = D, D = null), L(b, q, D, $);
      function L(j, C, N, _, T) {
        return l(j, C, N, function(R) {
          R && (R.code === "EMFILE" || R.code === "ENFILE") ? c([L, [j, C, N, _], R, T || Date.now(), Date.now()]) : typeof _ == "function" && _.apply(this, arguments);
        });
      }
    }
    var d = e.appendFile;
    d && (e.appendFile = S);
    function S(b, q, D, $) {
      return typeof D == "function" && ($ = D, D = null), L(b, q, D, $);
      function L(j, C, N, _, T) {
        return d(j, C, N, function(R) {
          R && (R.code === "EMFILE" || R.code === "ENFILE") ? c([L, [j, C, N, _], R, T || Date.now(), Date.now()]) : typeof _ == "function" && _.apply(this, arguments);
        });
      }
    }
    var w = e.copyFile;
    w && (e.copyFile = P);
    function P(b, q, D, $) {
      return typeof D == "function" && ($ = D, D = 0), L(b, q, D, $);
      function L(j, C, N, _, T) {
        return w(j, C, N, function(R) {
          R && (R.code === "EMFILE" || R.code === "ENFILE") ? c([L, [j, C, N, _], R, T || Date.now(), Date.now()]) : typeof _ == "function" && _.apply(this, arguments);
        });
      }
    }
    var O = e.readdir;
    e.readdir = B;
    var x = /^v[0-5]\./;
    function B(b, q, D) {
      typeof q == "function" && (D = q, q = null);
      var $ = x.test(process.version) ? function(C, N, _, T) {
        return O(C, L(
          C,
          N,
          _,
          T
        ));
      } : function(C, N, _, T) {
        return O(C, N, L(
          C,
          N,
          _,
          T
        ));
      };
      return $(b, q, D);
      function L(j, C, N, _) {
        return function(T, R) {
          T && (T.code === "EMFILE" || T.code === "ENFILE") ? c([
            $,
            [j, C, N],
            T,
            _ || Date.now(),
            Date.now()
          ]) : (R && R.sort && R.sort(), typeof N == "function" && N.call(this, T, R));
        };
      }
    }
    if (process.version.substr(0, 4) === "v0.8") {
      var ee = o(e);
      A = ee.ReadStream, U = ee.WriteStream;
    }
    var te = e.ReadStream;
    te && (A.prototype = Object.create(te.prototype), A.prototype.open = Ot);
    var re = e.WriteStream;
    re && (U.prototype = Object.create(re.prototype), U.prototype.open = Dt), Object.defineProperty(e, "ReadStream", {
      get: function() {
        return A;
      },
      set: function(b) {
        A = b;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e, "WriteStream", {
      get: function() {
        return U;
      },
      set: function(b) {
        U = b;
      },
      enumerable: !0,
      configurable: !0
    });
    var Ie = A;
    Object.defineProperty(e, "FileReadStream", {
      get: function() {
        return Ie;
      },
      set: function(b) {
        Ie = b;
      },
      enumerable: !0,
      configurable: !0
    });
    var We = U;
    Object.defineProperty(e, "FileWriteStream", {
      get: function() {
        return We;
      },
      set: function(b) {
        We = b;
      },
      enumerable: !0,
      configurable: !0
    });
    function A(b, q) {
      return this instanceof A ? (te.apply(this, arguments), this) : A.apply(Object.create(A.prototype), arguments);
    }
    function Ot() {
      var b = this;
      ne(b.path, b.flags, b.mode, function(q, D) {
        q ? (b.autoClose && b.destroy(), b.emit("error", q)) : (b.fd = D, b.emit("open", D), b.read());
      });
    }
    function U(b, q) {
      return this instanceof U ? (re.apply(this, arguments), this) : U.apply(Object.create(U.prototype), arguments);
    }
    function Dt() {
      var b = this;
      ne(b.path, b.flags, b.mode, function(q, D) {
        q ? (b.destroy(), b.emit("error", q)) : (b.fd = D, b.emit("open", D));
      });
    }
    function xt(b, q) {
      return new e.ReadStream(b, q);
    }
    function qt(b, q) {
      return new e.WriteStream(b, q);
    }
    var _t = e.open;
    e.open = ne;
    function ne(b, q, D, $) {
      return typeof D == "function" && ($ = D, D = null), L(b, q, D, $);
      function L(j, C, N, _, T) {
        return _t(j, C, N, function(R, hr) {
          R && (R.code === "EMFILE" || R.code === "ENFILE") ? c([L, [j, C, N, _], R, T || Date.now(), Date.now()]) : typeof _ == "function" && _.apply(this, arguments);
        });
      }
    }
    return e;
  }
  function c(e) {
    m("ENQUEUE", e[0].name, e[1]), t[s].push(e), p();
  }
  var u;
  function F() {
    for (var e = Date.now(), i = 0; i < t[s].length; ++i)
      t[s][i].length > 2 && (t[s][i][3] = e, t[s][i][4] = e);
    p();
  }
  function p() {
    if (clearTimeout(u), u = void 0, t[s].length !== 0) {
      var e = t[s].shift(), i = e[0], f = e[1], l = e[2], v = e[3], d = e[4];
      if (v === void 0)
        m("RETRY", i.name, f), i.apply(null, f);
      else if (Date.now() - v >= 6e4) {
        m("TIMEOUT", i.name, f);
        var S = f.pop();
        typeof S == "function" && S.call(null, l);
      } else {
        var w = Date.now() - d, P = Math.max(d - v, 1), O = Math.min(P * 1.2, 100);
        w >= O ? (m("RETRY", i.name, f), i.apply(null, f.concat([v]))) : t[s].push(e);
      }
      u === void 0 && (u = setTimeout(p, 0));
    }
  }
  return Q;
}
var Ye;
function W() {
  return Ye || (Ye = 1, function(t) {
    const n = M().fromCallback, o = K(), y = [
      "access",
      "appendFile",
      "chmod",
      "chown",
      "close",
      "copyFile",
      "cp",
      "fchmod",
      "fchown",
      "fdatasync",
      "fstat",
      "fsync",
      "ftruncate",
      "futimes",
      "glob",
      "lchmod",
      "lchown",
      "lutimes",
      "link",
      "lstat",
      "mkdir",
      "mkdtemp",
      "open",
      "opendir",
      "readdir",
      "readFile",
      "readlink",
      "realpath",
      "rename",
      "rm",
      "rmdir",
      "stat",
      "statfs",
      "symlink",
      "truncate",
      "unlink",
      "utimes",
      "writeFile"
    ].filter((a) => typeof o[a] == "function");
    Object.assign(t, o), y.forEach((a) => {
      t[a] = n(o[a]);
    }), t.exists = function(a, s) {
      return typeof s == "function" ? o.exists(a, s) : new Promise((r) => o.exists(a, r));
    }, t.read = function(a, s, r, E, k, m) {
      return typeof m == "function" ? o.read(a, s, r, E, k, m) : new Promise((g, h) => {
        o.read(a, s, r, E, k, (c, u, F) => {
          if (c) return h(c);
          g({ bytesRead: u, buffer: F });
        });
      });
    }, t.write = function(a, s, ...r) {
      return typeof r[r.length - 1] == "function" ? o.write(a, s, ...r) : new Promise((E, k) => {
        o.write(a, s, ...r, (m, g, h) => {
          if (m) return k(m);
          E({ bytesWritten: g, buffer: h });
        });
      });
    }, t.readv = function(a, s, ...r) {
      return typeof r[r.length - 1] == "function" ? o.readv(a, s, ...r) : new Promise((E, k) => {
        o.readv(a, s, ...r, (m, g, h) => {
          if (m) return k(m);
          E({ bytesRead: g, buffers: h });
        });
      });
    }, t.writev = function(a, s, ...r) {
      return typeof r[r.length - 1] == "function" ? o.writev(a, s, ...r) : new Promise((E, k) => {
        o.writev(a, s, ...r, (m, g, h) => {
          if (m) return k(m);
          E({ bytesWritten: g, buffers: h });
        });
      });
    }, typeof o.realpath.native == "function" ? t.realpath.native = n(o.realpath.native) : process.emitWarning(
      "fs.realpath.native is not a function. Is fs being monkey-patched?",
      "Warning",
      "fs-extra-WARN0003"
    );
  }(oe)), oe;
}
var z = {}, se = {}, He;
function Wt() {
  if (He) return se;
  He = 1;
  const t = I;
  return se.checkPath = function(o) {
    if (process.platform === "win32" && /[<>:"|?*]/.test(o.replace(t.parse(o).root, ""))) {
      const a = new Error(`Path contains invalid characters: ${o}`);
      throw a.code = "EINVAL", a;
    }
  }, se;
}
var Ke;
function Jt() {
  if (Ke) return z;
  Ke = 1;
  const t = /* @__PURE__ */ W(), { checkPath: n } = /* @__PURE__ */ Wt(), o = (y) => {
    const a = { mode: 511 };
    return typeof y == "number" ? y : { ...a, ...y }.mode;
  };
  return z.makeDir = async (y, a) => (n(y), t.mkdir(y, {
    mode: o(a),
    recursive: !0
  })), z.makeDirSync = (y, a) => (n(y), t.mkdirSync(y, {
    mode: o(a),
    recursive: !0
  })), z;
}
var fe, Ve;
function J() {
  if (Ve) return fe;
  Ve = 1;
  const t = M().fromPromise, { makeDir: n, makeDirSync: o } = /* @__PURE__ */ Jt(), y = t(n);
  return fe = {
    mkdirs: y,
    mkdirsSync: o,
    // alias
    mkdirp: y,
    mkdirpSync: o,
    ensureDir: y,
    ensureDirSync: o
  }, fe;
}
var le, Qe;
function G() {
  if (Qe) return le;
  Qe = 1;
  const t = M().fromPromise, n = /* @__PURE__ */ W();
  function o(y) {
    return n.access(y).then(() => !0).catch(() => !1);
  }
  return le = {
    pathExists: t(o),
    pathExistsSync: n.existsSync
  }, le;
}
var ye, ze;
function Pt() {
  if (ze) return ye;
  ze = 1;
  const t = /* @__PURE__ */ W(), n = M().fromPromise;
  async function o(a, s, r) {
    const E = await t.open(a, "r+");
    let k = null;
    try {
      await t.futimes(E, s, r);
    } finally {
      try {
        await t.close(E);
      } catch (m) {
        k = m;
      }
    }
    if (k)
      throw k;
  }
  function y(a, s, r) {
    const E = t.openSync(a, "r+");
    return t.futimesSync(E, s, r), t.closeSync(E);
  }
  return ye = {
    utimesMillis: n(o),
    utimesMillisSync: y
  }, ye;
}
var me, Xe;
function Y() {
  if (Xe) return me;
  Xe = 1;
  const t = /* @__PURE__ */ W(), n = I, o = M().fromPromise;
  function y(c, u, F) {
    const p = F.dereference ? (e) => t.stat(e, { bigint: !0 }) : (e) => t.lstat(e, { bigint: !0 });
    return Promise.all([
      p(c),
      p(u).catch((e) => {
        if (e.code === "ENOENT") return null;
        throw e;
      })
    ]).then(([e, i]) => ({ srcStat: e, destStat: i }));
  }
  function a(c, u, F) {
    let p;
    const e = F.dereference ? (f) => t.statSync(f, { bigint: !0 }) : (f) => t.lstatSync(f, { bigint: !0 }), i = e(c);
    try {
      p = e(u);
    } catch (f) {
      if (f.code === "ENOENT") return { srcStat: i, destStat: null };
      throw f;
    }
    return { srcStat: i, destStat: p };
  }
  async function s(c, u, F, p) {
    const { srcStat: e, destStat: i } = await y(c, u, p);
    if (i) {
      if (m(e, i)) {
        const f = n.basename(c), l = n.basename(u);
        if (F === "move" && f !== l && f.toLowerCase() === l.toLowerCase())
          return { srcStat: e, destStat: i, isChangingCase: !0 };
        throw new Error("Source and destination must not be the same.");
      }
      if (e.isDirectory() && !i.isDirectory())
        throw new Error(`Cannot overwrite non-directory '${u}' with directory '${c}'.`);
      if (!e.isDirectory() && i.isDirectory())
        throw new Error(`Cannot overwrite directory '${u}' with non-directory '${c}'.`);
    }
    if (e.isDirectory() && g(c, u))
      throw new Error(h(c, u, F));
    return { srcStat: e, destStat: i };
  }
  function r(c, u, F, p) {
    const { srcStat: e, destStat: i } = a(c, u, p);
    if (i) {
      if (m(e, i)) {
        const f = n.basename(c), l = n.basename(u);
        if (F === "move" && f !== l && f.toLowerCase() === l.toLowerCase())
          return { srcStat: e, destStat: i, isChangingCase: !0 };
        throw new Error("Source and destination must not be the same.");
      }
      if (e.isDirectory() && !i.isDirectory())
        throw new Error(`Cannot overwrite non-directory '${u}' with directory '${c}'.`);
      if (!e.isDirectory() && i.isDirectory())
        throw new Error(`Cannot overwrite directory '${u}' with non-directory '${c}'.`);
    }
    if (e.isDirectory() && g(c, u))
      throw new Error(h(c, u, F));
    return { srcStat: e, destStat: i };
  }
  async function E(c, u, F, p) {
    const e = n.resolve(n.dirname(c)), i = n.resolve(n.dirname(F));
    if (i === e || i === n.parse(i).root) return;
    let f;
    try {
      f = await t.stat(i, { bigint: !0 });
    } catch (l) {
      if (l.code === "ENOENT") return;
      throw l;
    }
    if (m(u, f))
      throw new Error(h(c, F, p));
    return E(c, u, i, p);
  }
  function k(c, u, F, p) {
    const e = n.resolve(n.dirname(c)), i = n.resolve(n.dirname(F));
    if (i === e || i === n.parse(i).root) return;
    let f;
    try {
      f = t.statSync(i, { bigint: !0 });
    } catch (l) {
      if (l.code === "ENOENT") return;
      throw l;
    }
    if (m(u, f))
      throw new Error(h(c, F, p));
    return k(c, u, i, p);
  }
  function m(c, u) {
    return u.ino && u.dev && u.ino === c.ino && u.dev === c.dev;
  }
  function g(c, u) {
    const F = n.resolve(c).split(n.sep).filter((e) => e), p = n.resolve(u).split(n.sep).filter((e) => e);
    return F.every((e, i) => p[i] === e);
  }
  function h(c, u, F) {
    return `Cannot ${F} '${c}' to a subdirectory of itself, '${u}'.`;
  }
  return me = {
    // checkPaths
    checkPaths: o(s),
    checkPathsSync: r,
    // checkParent
    checkParentPaths: o(E),
    checkParentPathsSync: k,
    // Misc
    isSrcSubdir: g,
    areIdentical: m
  }, me;
}
var de, Ze;
function At() {
  if (Ze) return de;
  Ze = 1;
  const t = /* @__PURE__ */ W(), n = I, { mkdirs: o } = /* @__PURE__ */ J(), { pathExists: y } = /* @__PURE__ */ G(), { utimesMillis: a } = /* @__PURE__ */ Pt(), s = /* @__PURE__ */ Y();
  async function r(p, e, i = {}) {
    typeof i == "function" && (i = { filter: i }), i.clobber = "clobber" in i ? !!i.clobber : !0, i.overwrite = "overwrite" in i ? !!i.overwrite : i.clobber, i.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
      `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
      "Warning",
      "fs-extra-WARN0001"
    );
    const { srcStat: f, destStat: l } = await s.checkPaths(p, e, "copy", i);
    if (await s.checkParentPaths(p, f, e, "copy"), !await E(p, e, i)) return;
    const d = n.dirname(e);
    await y(d) || await o(d), await k(l, p, e, i);
  }
  async function E(p, e, i) {
    return i.filter ? i.filter(p, e) : !0;
  }
  async function k(p, e, i, f) {
    const v = await (f.dereference ? t.stat : t.lstat)(e);
    if (v.isDirectory()) return u(v, p, e, i, f);
    if (v.isFile() || v.isCharacterDevice() || v.isBlockDevice()) return m(v, p, e, i, f);
    if (v.isSymbolicLink()) return F(p, e, i, f);
    throw v.isSocket() ? new Error(`Cannot copy a socket file: ${e}`) : v.isFIFO() ? new Error(`Cannot copy a FIFO pipe: ${e}`) : new Error(`Unknown file: ${e}`);
  }
  async function m(p, e, i, f, l) {
    if (!e) return g(p, i, f, l);
    if (l.overwrite)
      return await t.unlink(f), g(p, i, f, l);
    if (l.errorOnExist)
      throw new Error(`'${f}' already exists`);
  }
  async function g(p, e, i, f) {
    if (await t.copyFile(e, i), f.preserveTimestamps) {
      h(p.mode) && await c(i, p.mode);
      const l = await t.stat(e);
      await a(i, l.atime, l.mtime);
    }
    return t.chmod(i, p.mode);
  }
  function h(p) {
    return (p & 128) === 0;
  }
  function c(p, e) {
    return t.chmod(p, e | 128);
  }
  async function u(p, e, i, f, l) {
    e || await t.mkdir(f);
    const v = [];
    for await (const d of await t.opendir(i)) {
      const S = n.join(i, d.name), w = n.join(f, d.name);
      v.push(
        E(S, w, l).then((P) => {
          if (P)
            return s.checkPaths(S, w, "copy", l).then(({ destStat: O }) => k(O, S, w, l));
        })
      );
    }
    await Promise.all(v), e || await t.chmod(f, p.mode);
  }
  async function F(p, e, i, f) {
    let l = await t.readlink(e);
    if (f.dereference && (l = n.resolve(process.cwd(), l)), !p)
      return t.symlink(l, i);
    let v = null;
    try {
      v = await t.readlink(i);
    } catch (d) {
      if (d.code === "EINVAL" || d.code === "UNKNOWN") return t.symlink(l, i);
      throw d;
    }
    if (f.dereference && (v = n.resolve(process.cwd(), v)), s.isSrcSubdir(l, v))
      throw new Error(`Cannot copy '${l}' to a subdirectory of itself, '${v}'.`);
    if (s.isSrcSubdir(v, l))
      throw new Error(`Cannot overwrite '${v}' with '${l}'.`);
    return await t.unlink(i), t.symlink(l, i);
  }
  return de = r, de;
}
var he, et;
function Ut() {
  if (et) return he;
  et = 1;
  const t = K(), n = I, o = J().mkdirsSync, y = Pt().utimesMillisSync, a = /* @__PURE__ */ Y();
  function s(d, S, w) {
    typeof w == "function" && (w = { filter: w }), w = w || {}, w.clobber = "clobber" in w ? !!w.clobber : !0, w.overwrite = "overwrite" in w ? !!w.overwrite : w.clobber, w.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
      `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
      "Warning",
      "fs-extra-WARN0002"
    );
    const { srcStat: P, destStat: O } = a.checkPathsSync(d, S, "copy", w);
    if (a.checkParentPathsSync(d, P, S, "copy"), w.filter && !w.filter(d, S)) return;
    const x = n.dirname(S);
    return t.existsSync(x) || o(x), r(O, d, S, w);
  }
  function r(d, S, w, P) {
    const x = (P.dereference ? t.statSync : t.lstatSync)(S);
    if (x.isDirectory()) return p(x, d, S, w, P);
    if (x.isFile() || x.isCharacterDevice() || x.isBlockDevice()) return E(x, d, S, w, P);
    if (x.isSymbolicLink()) return l(d, S, w, P);
    throw x.isSocket() ? new Error(`Cannot copy a socket file: ${S}`) : x.isFIFO() ? new Error(`Cannot copy a FIFO pipe: ${S}`) : new Error(`Unknown file: ${S}`);
  }
  function E(d, S, w, P, O) {
    return S ? k(d, w, P, O) : m(d, w, P, O);
  }
  function k(d, S, w, P) {
    if (P.overwrite)
      return t.unlinkSync(w), m(d, S, w, P);
    if (P.errorOnExist)
      throw new Error(`'${w}' already exists`);
  }
  function m(d, S, w, P) {
    return t.copyFileSync(S, w), P.preserveTimestamps && g(d.mode, S, w), u(w, d.mode);
  }
  function g(d, S, w) {
    return h(d) && c(w, d), F(S, w);
  }
  function h(d) {
    return (d & 128) === 0;
  }
  function c(d, S) {
    return u(d, S | 128);
  }
  function u(d, S) {
    return t.chmodSync(d, S);
  }
  function F(d, S) {
    const w = t.statSync(d);
    return y(S, w.atime, w.mtime);
  }
  function p(d, S, w, P, O) {
    return S ? i(w, P, O) : e(d.mode, w, P, O);
  }
  function e(d, S, w, P) {
    return t.mkdirSync(w), i(S, w, P), u(w, d);
  }
  function i(d, S, w) {
    const P = t.opendirSync(d);
    try {
      let O;
      for (; (O = P.readSync()) !== null; )
        f(O.name, d, S, w);
    } finally {
      P.closeSync();
    }
  }
  function f(d, S, w, P) {
    const O = n.join(S, d), x = n.join(w, d);
    if (P.filter && !P.filter(O, x)) return;
    const { destStat: B } = a.checkPathsSync(O, x, "copy", P);
    return r(B, O, x, P);
  }
  function l(d, S, w, P) {
    let O = t.readlinkSync(S);
    if (P.dereference && (O = n.resolve(process.cwd(), O)), d) {
      let x;
      try {
        x = t.readlinkSync(w);
      } catch (B) {
        if (B.code === "EINVAL" || B.code === "UNKNOWN") return t.symlinkSync(O, w);
        throw B;
      }
      if (P.dereference && (x = n.resolve(process.cwd(), x)), a.isSrcSubdir(O, x))
        throw new Error(`Cannot copy '${O}' to a subdirectory of itself, '${x}'.`);
      if (a.isSrcSubdir(x, O))
        throw new Error(`Cannot overwrite '${x}' with '${O}'.`);
      return v(O, w);
    } else
      return t.symlinkSync(O, w);
  }
  function v(d, S) {
    return t.unlinkSync(S), t.symlinkSync(d, S);
  }
  return he = s, he;
}
var pe, tt;
function Le() {
  if (tt) return pe;
  tt = 1;
  const t = M().fromPromise;
  return pe = {
    copy: t(/* @__PURE__ */ At()),
    copySync: /* @__PURE__ */ Ut()
  }, pe;
}
var we, rt;
function Z() {
  if (rt) return we;
  rt = 1;
  const t = K(), n = M().fromCallback;
  function o(a, s) {
    t.rm(a, { recursive: !0, force: !0 }, s);
  }
  function y(a) {
    t.rmSync(a, { recursive: !0, force: !0 });
  }
  return we = {
    remove: n(o),
    removeSync: y
  }, we;
}
var Se, nt;
function Bt() {
  if (nt) return Se;
  nt = 1;
  const t = M().fromPromise, n = /* @__PURE__ */ W(), o = I, y = /* @__PURE__ */ J(), a = /* @__PURE__ */ Z(), s = t(async function(k) {
    let m;
    try {
      m = await n.readdir(k);
    } catch {
      return y.mkdirs(k);
    }
    return Promise.all(m.map((g) => a.remove(o.join(k, g))));
  });
  function r(E) {
    let k;
    try {
      k = n.readdirSync(E);
    } catch {
      return y.mkdirsSync(E);
    }
    k.forEach((m) => {
      m = o.join(E, m), a.removeSync(m);
    });
  }
  return Se = {
    emptyDirSync: r,
    emptydirSync: r,
    emptyDir: s,
    emptydir: s
  }, Se;
}
var ve, it;
function Gt() {
  if (it) return ve;
  it = 1;
  const t = M().fromPromise, n = I, o = /* @__PURE__ */ W(), y = /* @__PURE__ */ J();
  async function a(r) {
    let E;
    try {
      E = await o.stat(r);
    } catch {
    }
    if (E && E.isFile()) return;
    const k = n.dirname(r);
    let m = null;
    try {
      m = await o.stat(k);
    } catch (g) {
      if (g.code === "ENOENT") {
        await y.mkdirs(k), await o.writeFile(r, "");
        return;
      } else
        throw g;
    }
    m.isDirectory() ? await o.writeFile(r, "") : await o.readdir(k);
  }
  function s(r) {
    let E;
    try {
      E = o.statSync(r);
    } catch {
    }
    if (E && E.isFile()) return;
    const k = n.dirname(r);
    try {
      o.statSync(k).isDirectory() || o.readdirSync(k);
    } catch (m) {
      if (m && m.code === "ENOENT") y.mkdirsSync(k);
      else throw m;
    }
    o.writeFileSync(r, "");
  }
  return ve = {
    createFile: t(a),
    createFileSync: s
  }, ve;
}
var ke, ot;
function Yt() {
  if (ot) return ke;
  ot = 1;
  const t = M().fromPromise, n = I, o = /* @__PURE__ */ W(), y = /* @__PURE__ */ J(), { pathExists: a } = /* @__PURE__ */ G(), { areIdentical: s } = /* @__PURE__ */ Y();
  async function r(k, m) {
    let g;
    try {
      g = await o.lstat(m);
    } catch {
    }
    let h;
    try {
      h = await o.lstat(k);
    } catch (F) {
      throw F.message = F.message.replace("lstat", "ensureLink"), F;
    }
    if (g && s(h, g)) return;
    const c = n.dirname(m);
    await a(c) || await y.mkdirs(c), await o.link(k, m);
  }
  function E(k, m) {
    let g;
    try {
      g = o.lstatSync(m);
    } catch {
    }
    try {
      const u = o.lstatSync(k);
      if (g && s(u, g)) return;
    } catch (u) {
      throw u.message = u.message.replace("lstat", "ensureLink"), u;
    }
    const h = n.dirname(m);
    return o.existsSync(h) || y.mkdirsSync(h), o.linkSync(k, m);
  }
  return ke = {
    createLink: t(r),
    createLinkSync: E
  }, ke;
}
var Ee, ct;
function Ht() {
  if (ct) return Ee;
  ct = 1;
  const t = I, n = /* @__PURE__ */ W(), { pathExists: o } = /* @__PURE__ */ G(), y = M().fromPromise;
  async function a(r, E) {
    if (t.isAbsolute(r)) {
      try {
        await n.lstat(r);
      } catch (h) {
        throw h.message = h.message.replace("lstat", "ensureSymlink"), h;
      }
      return {
        toCwd: r,
        toDst: r
      };
    }
    const k = t.dirname(E), m = t.join(k, r);
    if (await o(m))
      return {
        toCwd: m,
        toDst: r
      };
    try {
      await n.lstat(r);
    } catch (h) {
      throw h.message = h.message.replace("lstat", "ensureSymlink"), h;
    }
    return {
      toCwd: r,
      toDst: t.relative(k, r)
    };
  }
  function s(r, E) {
    if (t.isAbsolute(r)) {
      if (!n.existsSync(r)) throw new Error("absolute srcpath does not exist");
      return {
        toCwd: r,
        toDst: r
      };
    }
    const k = t.dirname(E), m = t.join(k, r);
    if (n.existsSync(m))
      return {
        toCwd: m,
        toDst: r
      };
    if (!n.existsSync(r)) throw new Error("relative srcpath does not exist");
    return {
      toCwd: r,
      toDst: t.relative(k, r)
    };
  }
  return Ee = {
    symlinkPaths: y(a),
    symlinkPathsSync: s
  }, Ee;
}
var Fe, at;
function Kt() {
  if (at) return Fe;
  at = 1;
  const t = /* @__PURE__ */ W(), n = M().fromPromise;
  async function o(a, s) {
    if (s) return s;
    let r;
    try {
      r = await t.lstat(a);
    } catch {
      return "file";
    }
    return r && r.isDirectory() ? "dir" : "file";
  }
  function y(a, s) {
    if (s) return s;
    let r;
    try {
      r = t.lstatSync(a);
    } catch {
      return "file";
    }
    return r && r.isDirectory() ? "dir" : "file";
  }
  return Fe = {
    symlinkType: n(o),
    symlinkTypeSync: y
  }, Fe;
}
var ge, ut;
function Vt() {
  if (ut) return ge;
  ut = 1;
  const t = M().fromPromise, n = I, o = /* @__PURE__ */ W(), { mkdirs: y, mkdirsSync: a } = /* @__PURE__ */ J(), { symlinkPaths: s, symlinkPathsSync: r } = /* @__PURE__ */ Ht(), { symlinkType: E, symlinkTypeSync: k } = /* @__PURE__ */ Kt(), { pathExists: m } = /* @__PURE__ */ G(), { areIdentical: g } = /* @__PURE__ */ Y();
  async function h(u, F, p) {
    let e;
    try {
      e = await o.lstat(F);
    } catch {
    }
    if (e && e.isSymbolicLink()) {
      const [v, d] = await Promise.all([
        o.stat(u),
        o.stat(F)
      ]);
      if (g(v, d)) return;
    }
    const i = await s(u, F);
    u = i.toDst;
    const f = await E(i.toCwd, p), l = n.dirname(F);
    return await m(l) || await y(l), o.symlink(u, F, f);
  }
  function c(u, F, p) {
    let e;
    try {
      e = o.lstatSync(F);
    } catch {
    }
    if (e && e.isSymbolicLink()) {
      const v = o.statSync(u), d = o.statSync(F);
      if (g(v, d)) return;
    }
    const i = r(u, F);
    u = i.toDst, p = k(i.toCwd, p);
    const f = n.dirname(F);
    return o.existsSync(f) || a(f), o.symlinkSync(u, F, p);
  }
  return ge = {
    createSymlink: t(h),
    createSymlinkSync: c
  }, ge;
}
var Pe, st;
function Qt() {
  if (st) return Pe;
  st = 1;
  const { createFile: t, createFileSync: n } = /* @__PURE__ */ Gt(), { createLink: o, createLinkSync: y } = /* @__PURE__ */ Yt(), { createSymlink: a, createSymlinkSync: s } = /* @__PURE__ */ Vt();
  return Pe = {
    // file
    createFile: t,
    createFileSync: n,
    ensureFile: t,
    ensureFileSync: n,
    // link
    createLink: o,
    createLinkSync: y,
    ensureLink: o,
    ensureLinkSync: y,
    // symlink
    createSymlink: a,
    createSymlinkSync: s,
    ensureSymlink: a,
    ensureSymlinkSync: s
  }, Pe;
}
var be, ft;
function Te() {
  if (ft) return be;
  ft = 1;
  function t(o, { EOL: y = `
`, finalEOL: a = !0, replacer: s = null, spaces: r } = {}) {
    const E = a ? y : "";
    return JSON.stringify(o, s, r).replace(/\n/g, y) + E;
  }
  function n(o) {
    return Buffer.isBuffer(o) && (o = o.toString("utf8")), o.replace(/^\uFEFF/, "");
  }
  return be = { stringify: t, stripBom: n }, be;
}
var Oe, lt;
function zt() {
  if (lt) return Oe;
  lt = 1;
  let t;
  try {
    t = K();
  } catch {
    t = gt;
  }
  const n = M(), { stringify: o, stripBom: y } = Te();
  async function a(h, c = {}) {
    typeof c == "string" && (c = { encoding: c });
    const u = c.fs || t, F = "throws" in c ? c.throws : !0;
    let p = await n.fromCallback(u.readFile)(h, c);
    p = y(p);
    let e;
    try {
      e = JSON.parse(p, c ? c.reviver : null);
    } catch (i) {
      if (F)
        throw i.message = `${h}: ${i.message}`, i;
      return null;
    }
    return e;
  }
  const s = n.fromPromise(a);
  function r(h, c = {}) {
    typeof c == "string" && (c = { encoding: c });
    const u = c.fs || t, F = "throws" in c ? c.throws : !0;
    try {
      let p = u.readFileSync(h, c);
      return p = y(p), JSON.parse(p, c.reviver);
    } catch (p) {
      if (F)
        throw p.message = `${h}: ${p.message}`, p;
      return null;
    }
  }
  async function E(h, c, u = {}) {
    const F = u.fs || t, p = o(c, u);
    await n.fromCallback(F.writeFile)(h, p, u);
  }
  const k = n.fromPromise(E);
  function m(h, c, u = {}) {
    const F = u.fs || t, p = o(c, u);
    return F.writeFileSync(h, p, u);
  }
  return Oe = {
    readFile: s,
    readFileSync: r,
    writeFile: k,
    writeFileSync: m
  }, Oe;
}
var De, yt;
function Xt() {
  if (yt) return De;
  yt = 1;
  const t = zt();
  return De = {
    // jsonfile exports
    readJson: t.readFile,
    readJsonSync: t.readFileSync,
    writeJson: t.writeFile,
    writeJsonSync: t.writeFileSync
  }, De;
}
var xe, mt;
function Me() {
  if (mt) return xe;
  mt = 1;
  const t = M().fromPromise, n = /* @__PURE__ */ W(), o = I, y = /* @__PURE__ */ J(), a = G().pathExists;
  async function s(E, k, m = "utf-8") {
    const g = o.dirname(E);
    return await a(g) || await y.mkdirs(g), n.writeFile(E, k, m);
  }
  function r(E, ...k) {
    const m = o.dirname(E);
    n.existsSync(m) || y.mkdirsSync(m), n.writeFileSync(E, ...k);
  }
  return xe = {
    outputFile: t(s),
    outputFileSync: r
  }, xe;
}
var qe, dt;
function Zt() {
  if (dt) return qe;
  dt = 1;
  const { stringify: t } = Te(), { outputFile: n } = /* @__PURE__ */ Me();
  async function o(y, a, s = {}) {
    const r = t(a, s);
    await n(y, r, s);
  }
  return qe = o, qe;
}
var _e, ht;
function er() {
  if (ht) return _e;
  ht = 1;
  const { stringify: t } = Te(), { outputFileSync: n } = /* @__PURE__ */ Me();
  function o(y, a, s) {
    const r = t(a, s);
    n(y, r, s);
  }
  return _e = o, _e;
}
var Re, pt;
function tr() {
  if (pt) return Re;
  pt = 1;
  const t = M().fromPromise, n = /* @__PURE__ */ Xt();
  return n.outputJson = t(/* @__PURE__ */ Zt()), n.outputJsonSync = /* @__PURE__ */ er(), n.outputJSON = n.outputJson, n.outputJSONSync = n.outputJsonSync, n.writeJSON = n.writeJson, n.writeJSONSync = n.writeJsonSync, n.readJSON = n.readJson, n.readJSONSync = n.readJsonSync, Re = n, Re;
}
var Ce, wt;
function rr() {
  if (wt) return Ce;
  wt = 1;
  const t = /* @__PURE__ */ W(), n = I, { copy: o } = /* @__PURE__ */ Le(), { remove: y } = /* @__PURE__ */ Z(), { mkdirp: a } = /* @__PURE__ */ J(), { pathExists: s } = /* @__PURE__ */ G(), r = /* @__PURE__ */ Y();
  async function E(g, h, c = {}) {
    const u = c.overwrite || c.clobber || !1, { srcStat: F, isChangingCase: p = !1 } = await r.checkPaths(g, h, "move", c);
    await r.checkParentPaths(g, F, h, "move");
    const e = n.dirname(h);
    return n.parse(e).root !== e && await a(e), k(g, h, u, p);
  }
  async function k(g, h, c, u) {
    if (!u) {
      if (c)
        await y(h);
      else if (await s(h))
        throw new Error("dest already exists.");
    }
    try {
      await t.rename(g, h);
    } catch (F) {
      if (F.code !== "EXDEV")
        throw F;
      await m(g, h, c);
    }
  }
  async function m(g, h, c) {
    return await o(g, h, {
      overwrite: c,
      errorOnExist: !0,
      preserveTimestamps: !0
    }), y(g);
  }
  return Ce = E, Ce;
}
var Ne, St;
function nr() {
  if (St) return Ne;
  St = 1;
  const t = K(), n = I, o = Le().copySync, y = Z().removeSync, a = J().mkdirpSync, s = /* @__PURE__ */ Y();
  function r(h, c, u) {
    u = u || {};
    const F = u.overwrite || u.clobber || !1, { srcStat: p, isChangingCase: e = !1 } = s.checkPathsSync(h, c, "move", u);
    return s.checkParentPathsSync(h, p, c, "move"), E(c) || a(n.dirname(c)), k(h, c, F, e);
  }
  function E(h) {
    const c = n.dirname(h);
    return n.parse(c).root === c;
  }
  function k(h, c, u, F) {
    if (F) return m(h, c, u);
    if (u)
      return y(c), m(h, c, u);
    if (t.existsSync(c)) throw new Error("dest already exists.");
    return m(h, c, u);
  }
  function m(h, c, u) {
    try {
      t.renameSync(h, c);
    } catch (F) {
      if (F.code !== "EXDEV") throw F;
      return g(h, c, u);
    }
  }
  function g(h, c, u) {
    return o(h, c, {
      overwrite: u,
      errorOnExist: !0,
      preserveTimestamps: !0
    }), y(h);
  }
  return Ne = r, Ne;
}
var je, vt;
function ir() {
  if (vt) return je;
  vt = 1;
  const t = M().fromPromise;
  return je = {
    move: t(/* @__PURE__ */ rr()),
    moveSync: /* @__PURE__ */ nr()
  }, je;
}
var $e, kt;
function or() {
  return kt || (kt = 1, $e = {
    // Export promiseified graceful-fs:
    .../* @__PURE__ */ W(),
    // Export extra methods:
    .../* @__PURE__ */ Le(),
    .../* @__PURE__ */ Bt(),
    .../* @__PURE__ */ Qt(),
    .../* @__PURE__ */ tr(),
    .../* @__PURE__ */ J(),
    .../* @__PURE__ */ ir(),
    .../* @__PURE__ */ Me(),
    .../* @__PURE__ */ G(),
    .../* @__PURE__ */ Z()
  }), $e;
}
var cr = /* @__PURE__ */ or();
const H = /* @__PURE__ */ Nt(cr), ar = `
import { http, HttpResponse } from "msw";

export const handlers = [
    http.post('/api/lcdp/v1/entries/delete', () => {
        return HttpResponse.json({
          code: '0',
          data: null,
        })
      }),
      http.post('/api/lcdp/v1/entries/add', () => {
        return HttpResponse.json({
          code: '0',
          data: null,
        })
      }),
];

`, ur = `

import { setupWorker } from "msw/browser";

// 批量导入某个文件夹下的所有文件
const modules = import.meta.glob('./module/**/*.mock.{js,ts}')

// 异步获取所有 handlers 并合并
 async function getAllHandlers() {
  const handlers = []
  
  for (const path in modules) {
    const module = await modules[path]()
    if (module.handlers && Array.isArray(module.handlers)) {
      handlers.push(...module.handlers)
    }
  }
  
  return handlers
}

getAllHandlers().then(handlers => {
   const worker = setupWorker(...handlers);
   worker.start({
    onUnhandledRequest: 'bypass',
   });
  })
  
  

  
`, sr = "development", fr = Rt(import.meta.url);
function bt() {
  return process.cwd();
}
async function Et(t) {
  try {
    return await H.pathExists(t);
  } catch (n) {
    return console.error("检查文件时出错:", n), !1;
  }
}
async function lr(t) {
  await H.mkdir(t), H.writeFile(t + "/test.mock.js", ar);
}
async function yr(t) {
  H.writeFile(t, ur);
}
async function mr() {
  const t = bt(), n = I.resolve(t, "mock/index.js"), o = I.resolve(t, "mock/module"), y = await Et(n), a = await Et(o);
  y || yr(n), a || lr(o);
}
function dr() {
  return `
document.addEventListener('DOMContentLoaded', () => {
  import('./mock/index.js').then(module => {
    if (typeof module.default === 'function') {
      module.default();
    } else if (typeof module === 'function') {
      module();
    }
  }).catch(err => {
    console.error('Failed to execute script:', err);
  });
});
`;
}
function Ft(t) {
  return Ct("local ", bt()).VITE_ENABLE_MOCK === "true" && t === sr;
}
function kr(t = {}) {
  const { mode: n } = t;
  if (!n)
    throw new Error("mode option is required");
  return {
    name: "vite-plugin-execute-on-mount",
    configureServer(o) {
      Ft(n) && o.middlewares.use(async (y, a, s) => {
        if (y.url.includes("mockServiceWorker.js")) {
          const r = await H.readFile(
            I.resolve(fr, "../mockServiceWorker.js"),
            "utf-8"
          );
          a.setHeader("Content-Type", "text/javascript"), a.end(r);
          return;
        }
        s();
      });
    },
    buildStart() {
      mr();
    },
    transformIndexHtml(o) {
      if (Ft(n))
        return {
          html: o,
          tags: [
            {
              tag: "script",
              attrs: {
                type: "module"
              },
              children: dr(),
              injectTo: "body"
            }
          ]
        };
    }
  };
}
export {
  kr as default
};
