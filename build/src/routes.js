"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CruisesController_1 = __importDefault(require("./controllers/CruisesController"));
class IndexRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.initMiddleware();
        this.initRoutes();
    }
    initMiddleware() {
        // Middleware
        this.router.use((req, res, next) => {
            next();
        });
    }
    initRoutes() {
        // Conference routes
        this.router.get('/getAllCruises', CruisesController_1.default.getAllCruises);
        // this.router.get('/getAllCruisesByNumberOfDays/:numberOfDays', CruisesController.getAllCruisesByNumberOfDays);
    }
}
const indexRoutes = new IndexRouter();
exports.default = indexRoutes.router;
