var isArrayish;
var hasRequiredIsArrayish;
function requireIsArrayish() {
  if (hasRequiredIsArrayish) return isArrayish;
  hasRequiredIsArrayish = 1;
  isArrayish = function isArrayish2(obj) {
    if (!obj || typeof obj === "string") {
      return false;
    }
    return obj instanceof Array || Array.isArray(obj) || obj.length >= 0 && (obj.splice instanceof Function || Object.getOwnPropertyDescriptor(obj, obj.length - 1) && obj.constructor.name !== "String");
  };
  return isArrayish;
}
export {
  requireIsArrayish as r
};
