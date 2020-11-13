/*********************************************************************
* Copyright (c) Intel Corporation 2019
* SPDX-License-Identifier: Apache-2.0
* Description: Handler to get amt device audit logs
**********************************************************************/

import {Response, Request} from 'express'
import { logger as log } from "../../utils/logger";
import { IAmtHandler } from "../../models/IAmtHandler";
import { mpsMicroservice } from "../../mpsMicroservice";
import { amtStackFactory, amtPort } from "../../utils/constants";
import {ErrorResponse} from "../../utils/amtHelper";

export class HardwareInfoHandler implements IAmtHandler {
  
  mpsService: mpsMicroservice;
  name: string;
  amtFactory: any;

  constructor(mpsService: mpsMicroservice) {
      this.name="HardwareInformation";
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
                amtstack.BatchEnum("", ["*CIM_ComputerSystemPackage",
                    "CIM_SystemPackaging", "*CIM_Chassis", "CIM_Chip", "*CIM_Card", "*CIM_BIOSElement",
                    "CIM_Processor", "CIM_PhysicalMemory", "CIM_MediaAccessDevice", "CIM_PhysicalPackage"],
                    (stack, name, responses, status) => {
                      stack.wsman.comm.socket.sendchannelclose();
                        if (status != 200) {
                            log.error(`Request failed during AMTHardware Information BatchEnum Exec for guid : ${payload.guid}.`);
                            return res.status(status).send(ErrorResponse(status, `Request failed during AMTHardware Information BatchEnum Exec for guid : ${payload.guid}.`));
                        }
                        //console.log("Hardware info of " + uuid + " sent.");
                        res.send(responses);
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
         log.error(`Exception in AMT HardwareInformation : ${error}`);
         return res.status(500).send(ErrorResponse(500, 'Request failed during AMTHardware Information.'));
    }
  }
  
}