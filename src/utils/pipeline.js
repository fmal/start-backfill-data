export default function pipeline(...fns) {
  return fns.reduce.bind(fns, (acc, f) => f(acc));
}
