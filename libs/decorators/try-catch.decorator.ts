
export const TryCatchDecorator = (error = "") => {
  
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
   
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      try {
        return await originalMethod.apply(this, args);
      } catch (generic_error) {
        console.log(generic_error);
        return { 
          error: error,
          generic_error: generic_error.message
        };
      }
    };

    return descriptor;

  }
  
}