import { r as requireIsArrayish } from "./is-arrayish.mjs";
var simpleSwizzle = { exports: {} };
var hasRequiredSimpleSwizzle;
function requireSimpleSwizzle() {
  if (hasRequiredSimpleSwizzle) return simpleSwizzle.exports;
  hasRequiredSimpleSwizzle = 1;
  var isArrayish = /* @__PURE__ */ requireIsArrayish();
  var concat = Array.prototype.concat;
  var slice = Array.prototype.slice;
  var swizzle = simpleSwizzle.exports = function swizzle2(args) {
    var results = [];
    for (var i = 0, len = args.length; i < len; i++) {
      var arg = args[i];
      if (isArrayish(arg)) {
        results = concat.call(results, slice.call(arg));
      } else {
        results.push(arg);
      }
    }
    return results;
  };
  swizzle.wrap = function(fn) {
    return function() {
      return fn(swizzle(arguments));
    };
  };
  return simpleSwizzle.exports;
}
export {
  requireSimpleSwizzle as r
};
