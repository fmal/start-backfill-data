import { PATH_SEPARATOR } from '../constants';

export default function set(obj, path, val) {
  const parts = String(path).split(PATH_SEPARATOR);
  const key = parts.pop();
  const targetObj = parts.reduce((target, key) => {
    return (target[key] = target[key] || {});
  }, obj);
  targetObj[key] = val;
}
