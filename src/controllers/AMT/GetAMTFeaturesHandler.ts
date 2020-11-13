/*********************************************************************
 * Copyright (c) Intel Corporation 2020
 * SPDX-License-Identifier: Apache-2.0
 * Description: Handler to get AMT Features
 * Author: Madhavi Losetty
 **********************************************************************/

import { Response, Request } from "express";
import { logger as log } from "../../utils/logger";
import { IAmtHandler } from "../../models/IAmtHandler";
import { mpsMicroservice } from "../../mpsMicroservice";

import { amtStackFactory, amtPort, AMTFeaturesConst, UserConsentOptions } from "../../utils/constants";
import { ErrorResponse } from "../../utils/amtHelper";
import { AMTFeatures } from "../../utils/AMTFeatures";
import { MPSValidationError } from "../../utils/MPSValidationError";
import { apiResponseType } from "../../models/Config";

export class GetAMTFeaturesHandler implements IAmtHandler {
    mpsService: mpsMicroservice;
    amtFactory: any;
    name: string;

    constructor(mpsService: mpsMicroservice) {
        this.name = "GetAMTFeatures";
        this.mpsService = mpsService;
        this.amtFactory = new amtStackFactory(this.mpsService);
    }

    async AmtAction(req: Request, res: Response) {
        let redir, sol, ider, kvm, userConsent;
        let amtFeatures: AMTFeatures;
        try {
            let payload = req.body.payload;
            if (payload.guid) {
                let ciraconn = this.mpsService.mpsserver.ciraConnections[payload.guid];
                if (ciraconn && ciraconn.readyState == 'open') {
                    var cred = await this.mpsService.db.getAmtPassword(payload.guid);
                    var amtstack = this.amtFactory.getAmtStack(payload.guid, amtPort, cred[0], cred[1], 0);
                    let wsmanResponse = await AMTFeatures.getAMTFeatures(amtstack, payload);
                    amtstack.wsman.comm.socket.sendchannelclose();
                    if (wsmanResponse[AMTFeaturesConst.AMT_REDIR_SERVICE] &&
                        wsmanResponse[AMTFeaturesConst.AMT_KVM_REDIR] &&
                        wsmanResponse[AMTFeaturesConst.AMT_OPTIN_SERVICE]) {

                        let amtRedirResponse = wsmanResponse[AMTFeaturesConst.AMT_REDIR_SERVICE].response;
                        let kvmRedirResponse = wsmanResponse[AMTFeaturesConst.AMT_KVM_REDIR].response;
                        let optServiceRes = wsmanResponse[AMTFeaturesConst.AMT_OPTIN_SERVICE].response;

                        redir = (amtRedirResponse[AMTFeaturesConst.AMT_REDIR_LISTENER] == true);
                        sol = ((amtRedirResponse[AMTFeaturesConst.AMT_REDIR_STATE] & 2) != 0);
                        ider = ((amtRedirResponse[AMTFeaturesConst.AMT_REDIR_STATE] & 1) != 0);
                        kvm = ((kvmRedirResponse["EnabledState"] == 6 && kvmRedirResponse["RequestedState"] == 2) ||
                            kvmRedirResponse["EnabledState"] == 2 || kvmRedirResponse["EnabledState"] == 6);

                        let value = optServiceRes[AMTFeaturesConst.AMT_USER_CONSENT];
                        userConsent = Object.keys(UserConsentOptions).find(key => UserConsentOptions[key] === value);

                        amtFeatures = { userConsent: userConsent, redirection: redir, KVM: kvm, SOL: sol, IDER: ider }
                        let response: apiResponseType = {statuscode: 200, payload: amtFeatures}
                        res.status(200).send(JSON.stringify(response));
                    }

                } else {
                    res.set({ "Content-Type": "application/json" });
                    return res.status(404).send(ErrorResponse(404, `guid : ${payload.guid}`, 'device'));
                }
            } else {
                res.set({ "Content-Type": "application/json" });
                return res.status(404).send(ErrorResponse(404, null, 'guid'));
            }
        } catch (error) {
            log.error(`Exception in get AMT Features: ${error}`);
            if (error instanceof MPSValidationError) {
                return res.status(error.status || 400).send(ErrorResponse(error.status || 400, error.message));
            }
            return res.status(500).send(ErrorResponse(500, "Request failed during get AMT Features."));
        }

    }
}
