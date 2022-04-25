import { Router } from "express";
export interface Routes {
    method: string;
    path?: string;
    middlewares?: any[];
}
export interface IAddRoute extends Routes {
    validator?: any;
}
declare function Decorate(baseRoute?: string): {
    globalMiddleware: (baseRoute?: string, middlewares?: any[] | undefined) => <T extends new (...args: any[]) => {}>(constructor: T) => {
        new (...args: any[]): {};
    } & T;
    routes: Routes[];
    registerRoutes: (router: Router) => Router;
    addRoute: (routeParams: IAddRoute) => (target: any, propertyKey: string) => void;
};
export default Decorate;
