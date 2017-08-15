const UNIX_SEPARATOR = '/';
const WINDOWS_SEPARATOR_REG = /\\/g;

export default function normalizePath(path) {
  return String(path).replace(WINDOWS_SEPARATOR_REG, UNIX_SEPARATOR);
}
