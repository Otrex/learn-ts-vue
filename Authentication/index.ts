import useDecorator from "../core/useDecorator";
import express, { Request, Response, NextFunction } from "express"

const midl = (req: Request, res: Response, next: NextFunction) => { console.log("in middleware"); next() }

const { 
  globalMiddleware,
  registerRoutes,
  addRoute
} = useDecorator();

@globalMiddleware('/auth')
class AuthenticationController {
  @addRoute({ method: 'post', middlewares: [midl], })
  login(req: Request, res: Response, next: NextFunction){
    console.log("entered");
    
    res.send("hi")
  }

  @addRoute({ method: 'post' })
  register(req: Request, res: Response, next: NextFunction){
    console.log("entered");
    
    res.send("in register")
  }
}

export default registerRoutes(express.Router())