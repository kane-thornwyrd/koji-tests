import Router from "express"
import { ServerConfig } from "./config";
import { MiddlewareConfig, MiddlewaresConfigs } from "./middlewares"

const router = Router()

export default function createRoutes(config:ServerConfig, middlewares: MiddlewaresConfigs) {

  for (const middlewareName in middlewares) {
    if (Object.prototype.hasOwnProperty.call(middlewares, middlewareName)) {
      const { build, route, methods }: MiddlewareConfig = middlewares[middlewareName];
      if(!route) continue;
      if(!methods || methods.length <= 0) {
        router.get(route, build(config))
      } else {
        methods.forEach((method: string) => {
          if ( (router as Object).hasOwnProperty(method) )
          // Sorry for all this shhhh, it's the kind of use case that make me love vanilla JS sometimes…
          (router as unknown as {[key: string]:Function})[method].call(router, route, build(config))
        })
      }
    }
  }

  return router
}
