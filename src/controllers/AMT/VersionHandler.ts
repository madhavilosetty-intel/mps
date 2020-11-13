/*********************************************************************
* Copyright (c) Intel Corporation 2019
* SPDX-License-Identifier: Apache-2.0
* Description: Handler to get amt device version
**********************************************************************/

import {Response, Request} from 'express'
import { logger as log } from "../../utils/logger";
import { IAmtHandler } from "../../models/IAmtHandler";
import { mpsMicroservice } from "../../mpsMicroservice";
import { amtStackFactory, amtPort } from "../../utils/constants";
import {ErrorResponse} from "../../utils/amtHelper";

export class VersionHandler implements IAmtHandler {
  
  mpsService: mpsMicroservice;
  name: string;
  amtFactory: any;

  constructor(mpsService: mpsMicroservice) {
      this.name="Version";
      this.mpsService =mpsService;
      this.amtFactory = new amtStackFactory(this.mpsService);
  }

  async AmtAction(req: Request, res: Response){
    try{
        let payload = req.body.payload;  
        if(payload.guid){
          let ciraconn = this.mpsService.mpsserver.ciraConnections[payload.guid];
          if(ciraconn && ciraconn.readyState == 'open'){
            var cred = await this.mpsService.db.getAmtPassword(payload.guid);
            var amtstack = this.amtFactory.getAmtStack(payload.guid, amtPort, cred[0], cred[1], 0);
            amtstack.BatchEnum("", ["CIM_SoftwareIdentity", "*AMT_SetupAndConfigurationService"],
                (stack, name, responses, status) => {
		                stack.wsman.comm.socket.sendchannelclose();
                    if (status == 200) {  
                        return res.send(responses);
                    }
                    else { 
                        log.error(`Request failed during AMTVersion BatchEnum Exec for guid : ${payload.guid}.`);
                        return res.status(status).send(ErrorResponse(status, `Request failed during AMTVersion BatchEnum Exec for guid : ${payload.guid}.`));
                    }
                });
  
          }else{
            res.set({ 'Content-Type': 'application/json' });
            return res.status(404).send(ErrorResponse(404, `guid : ${payload.guid}`, 'device'));
          }            
        }else{
            res.set({ 'Content-Type': 'application/json' });
            return res.status(404).send(ErrorResponse(404, null, 'guid'));
        }
    }catch(error){
         log.error(`Exception in AMT Version : ${error}`);
         return res.status(500).send(ErrorResponse(500, 'Request failed during AMTVersion BatchEnum Exec.'));
    }
  }
}