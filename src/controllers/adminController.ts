/*********************************************************************
* Copyright (c) Intel Corporation 2019
* SPDX-License-Identifier: Apache-2.0
* Description: handles all the admin endpoint calls
**********************************************************************/

import { ErrorResponse } from "../utils/amtHelper";
import { logger as log } from "../utils/logger";
import { Response, Request } from "express";
import { mpsMicroservice } from "../mpsMicroservice";
import { RootContainer } from "../dependencyHandlers/RootContainer";


export class AdminController {
  static container: RootContainer;

  static init(mps: mpsMicroservice) {
    AdminController.container = new RootContainer(mps);
    AdminController.container.adminBuild();
  }

  static async HandlePostRoute(req: Request, res: Response) {
    try {
      let method = req.body.method;
      if (method) {
        let payload = req.body.payload || "";
        if (payload) {
          let handler = AdminController.container.adminRegistrar.getHandler(method);
          if (handler) {
            await handler.adminAction(req, res);
          } else {
            return res.status(404).send(ErrorResponse(404, null, "noMethod"));
          }
        } else{
          return res.status(404).send(ErrorResponse(404, null, "payload"));
        }
      } else {
        return res.status(404).send(ErrorResponse(404, null, "method"));
      }
    } catch (error) {
      log.error(`HandlePostRoute : ${error}`);
    }
  }

}
