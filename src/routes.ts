import { Router, Request, NextFunction, Response } from 'express';
import CruisesController from './controllers/CruisesController';

class IndexRouter {
  public router: Router = Router();
  constructor() {
    this.initMiddleware();
    this.initRoutes();
  }
  private initMiddleware() {
    // Middleware
    this.router.use((req: Request, res: Response, next: NextFunction) => {
      next();
    })
  }
  private initRoutes() {
    // Conference routes
    this.router.get('/getAllCruises', CruisesController.getAllCruises);
    // this.router.get('/getAllCruisesByNumberOfDays/:numberOfDays', CruisesController.getAllCruisesByNumberOfDays);
  }
}

const indexRoutes = new IndexRouter();

export default indexRoutes.router;