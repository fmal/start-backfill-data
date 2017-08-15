import { PATH_SEPARATOR } from '../constants';

export default function flattenObject(
  object,
  currentPath = [],
  toReturn = Object.create(null)
) {
  return Object.keys(object).reduce((allFields, key) => {
    currentPath.push(key);
    if (Array.isArray(object[key])) {
      object[key].forEach((item, index) => {
        currentPath.push(index);
        if (item === Object(item)) {
          flattenObject(object[key][index], currentPath, toReturn);
        } else {
          allFields[currentPath.join(PATH_SEPARATOR)] = item;
        }
        currentPath.pop();
      });
    } else if (object[key] === Object(object[key])) {
      flattenObject(object[key], currentPath, toReturn);
    } else {
      allFields[currentPath.join(PATH_SEPARATOR)] = object[key];
    }
    currentPath.pop();

    return toReturn;
  }, toReturn);
}
