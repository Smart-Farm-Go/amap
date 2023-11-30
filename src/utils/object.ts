export const getType = (obj: any, lower = true) => (type => lower ? type.toLowerCase() : type)(Object.prototype.toString.call(obj).slice(8, -1));

// 重写对象
export function ReWriteObj(value: any, keeps: string[], isEmptyValue = true) {
  const target: { [name: string]: any } = {};
  for (const [key, val] of Object.entries(value)) {
    if (keeps.includes(key)) {
      target[key] = val;
    }
  }
  if (!isEmptyValue) {
    for (const [keys, value] of Object.entries(target)) {
      if (getType(value) === 'undefined') {
        delete target[keys];
      }
    }
  }
  return target;
}

// 合并选项
export function mergeOptions(option: any, ...options: any[]) {
  const result = Object.assign({}, option || {});
  for (const option of options) {
    if (typeof option === 'object' && option !== null) {
      for (const key of Object.keys(option)) {
        if (Array.isArray(option[key])) {
          result[key] = (result[key] || []).concat(option[key]);
        } else if (typeof option[key] === 'object' && option[key] !== null) {
          result[key] = mergeOptions(result[key] || {}, option[key]);
        } else {
          result[key] = option[key];
        }
      }
    }
  }
  return result;
}
