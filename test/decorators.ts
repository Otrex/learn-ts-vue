type Routes = { method: string; path: string; middlewares: any[] };
// export function RegisterController <T extends { new (...args: any[]): {} }>(constructor: T) {
//     return class extends constructor {
//         routes: Routes[] = []

//     }
// }

export class BaseController {
  routes: Routes[] = [];
  constructor() {
    this.routes = [];
  }
  register() {}
}

// export function AddRoute<T extends BaseController>(method: string, path: string, middlewares: any[]) {
//     return function (target: T, propertyKey: string, descriptor: PropertyDescriptor) {
//         const route: Routes = {
//             method,
//             path,
//             middlewares
//         }
//         console.log(target, propertyKey, target.constructor);

//         target.routes.push(route);
//     };
// }

// @RegisterController
// class Hx extends BaseController {
//     routes = [];
//     @AddRoute('get', '/login', [Object.create])
//     login () {
//         return "working"
//     }
// }
// // V2
const deprecated = (deprecationReason: string) => {
  return (
    target: any,
    memberName: string,
    propertyDescriptor: PropertyDescriptor
  ) => {
    console.log("working");
    return (...args: any[]) => propertyDescriptor.value(this, args);
    // return {
    // get() {
    //     const wrapperFn = (...args: any[]) => {
    //         console.warn(`Method ${memberName} is deprecated with reason: ${deprecationReason}`);
    //         // return propertyDescriptor.value.apply(this, args)
    //         return "hello"
    //     }

    //     Object.defineProperty(this, memberName, {
    //         value: wrapperFn,
    //         configurable: true,
    //         writable: true
    //     });
    //     return wrapperFn;
    // }
    // }
  };
};

function Decorate() {
  const _globalMiddleware = [];
  const _routes: Routes[] = [];
  const generateRoutes = (router) => {
    router.use(..._globalMiddleware);
    for (const route of _routes) {
      router.route(route.path)[route.method](...route.middlewares);
    }
  };
  const globalMiddleware =
    (middlewares: any[]) =>
    <T extends { new (...args: any[]): {} }>(constructor: T) => {
      _globalMiddleware.push(...middlewares);
      return class extends constructor {};
    };

  function AddRoute<T extends BaseController>(
    method: string,
    path: string,
    middlewares: any[]
  ) {
    return function (
      target: T,
      propertyKey: string,
      descriptor: PropertyDescriptor
    ) {
      const handler = target[propertyKey];

      const route: Routes = {
        method,
        path,
        middlewares,
      };

      const wrapperFn = (...args) => {
        console.log("working on this", args);
        return handler.apply(this, args);
      };

      route.middlewares.push(target[propertyKey]);
      routes.push(route);
      Object.assign(target, { [propertyKey]: wrapperFn });
    };
  }

  return {
    globalMiddleware,
    generateRoutes,
    AddRoute,
    routes: _routes,
  };
}

const { AddRoute: AR, routes } = Decorate();

class Hxy extends BaseController {
  @AR("get", "/login", [Object.create])
  login(...args) {
    return "working";
  }

  test() {
    console.log("entered");
  }
}

console.log(new Hxy().login("heeel"), routes[0].middlewares[1]());
