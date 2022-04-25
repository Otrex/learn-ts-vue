"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
function Decorate(baseRoute = '') {
    const _globalMiddleware = [];
    const _routes = [];
    let _baseRoute = baseRoute;
    const registerRoutes = (router) => {
        if (_globalMiddleware.length)
            router.use(..._globalMiddleware);
        for (const route of _routes) {
            router.route(`${_baseRoute}${route.path}`)[route.method](...route.middlewares);
        }
        return router;
    };
    const globalMiddleware = (baseRoute = '', middlewares) => (constructor) => {
        _baseRoute = baseRoute;
        if (middlewares)
            _globalMiddleware.push(...middlewares);
        return class extends constructor {
        };
    };
    const addRoute = (routeParams) => {
        const { method, path, middlewares, validator } = routeParams;
        return (target, propertyKey) => {
            const handler = target[propertyKey];
            const route = {
                middlewares: [...(middlewares || [])],
                path: path || `/${propertyKey}`,
                method,
            };
            const wrapperFn = (...args) => {
                if (validator)
                    validator(...args);
                return handler.apply(null, args);
            };
            route.middlewares.push(handler);
            _routes.push(route);
            Object.assign(target, { [propertyKey]: wrapperFn });
        };
    };
    return {
        globalMiddleware,
        routes: _routes,
        registerRoutes,
        addRoute,
    };
}
exports.default = Decorate;
