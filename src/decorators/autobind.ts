export default function autobind(target: any, methodName: string, descriptor: PropertyDescriptor): PropertyDescriptor {
  return {
    configurable: true,
    get() {
      return descriptor.value.bind(this);
    },
  };
}
