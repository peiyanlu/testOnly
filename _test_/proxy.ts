const proxy = new Proxy({}, {
  set(target, key, value, receiver) {
    console.log(`set ${ key }=${ value }`);
    return Reflect.set(target, key, value, receiver);
  }
});
