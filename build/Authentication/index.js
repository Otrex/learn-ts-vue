"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ControllerDecorator_1 = __importDefault(require("../core/ControllerDecorator"));
const express_1 = __importDefault(require("express"));
const midl = (req, res, next) => { console.log("in middleware"); next(); };
const { globalMiddleware, registerRoutes, addRoute } = (0, ControllerDecorator_1.default)();
let AuthenticationController = class AuthenticationController {
    login(req, res, next) {
        console.log("entered");
        res.send("hi");
    }
    register(req, res, next) {
        console.log("entered");
        res.send("in register");
    }
};
__decorate([
    addRoute({ method: 'post', middlewares: [midl], }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", void 0)
], AuthenticationController.prototype, "login", null);
__decorate([
    addRoute({ method: 'post' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", void 0)
], AuthenticationController.prototype, "register", null);
AuthenticationController = __decorate([
    globalMiddleware('/auth')
], AuthenticationController);
exports.default = registerRoutes(express_1.default.Router());
