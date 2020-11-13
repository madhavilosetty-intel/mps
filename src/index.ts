/*********************************************************************
* Copyright (c) Intel Corporation 2019
* SPDX-License-Identifier: Apache-2.0
**********************************************************************/

import * as fs from "fs";
import * as path from "path";
import { logger as log } from "./utils/logger";
import { mpsMicroservice } from "./mpsMicroservice";
import { configType, certificatesType } from "./models/Config";
import { dataBase } from "./utils/db";

import { certificates } from "./utils/certificates";
import { tlsConfig } from "./utils/tlsConfiguration";
import { IDbProvider } from "./models/IDbProvider";

import { SecretManagerService } from "./utils/SecretManagerService";
import { secretsDbProvider } from "./utils/vaultDbProvider";
import { parseValue } from "./utils/parseEnvValue";

let rc = require('rc')

try {
// To merge ENV variables. consider after lowercasing ENV since our config keys are lowercase
process.env = Object.keys(process.env)
  .reduce((destination, key) => {
    destination[key.toLowerCase()] = parseValue(process.env[key]);
    return destination;
  }, {});

  // build config object
  let config: configType = rc('mps');

  if(!config.web_admin_password || !config.web_admin_user || !config.mpsxapikey){
    log.error(`Web admin username, password and API key are mandatory. Make sure to set values for these variables.`)
    process.exit(1);
  }

  //path where Self-signed certificates are generated
  const certPath = path.join(__dirname, config.cert_path);
  config.data_path = path.join(__dirname, config.data_path);
  
  let certs: certificatesType;
  let db: IDbProvider;
  log.silly(`Updated config... ${JSON.stringify(config, null, 2)}`);

  // DB initialization
  if (config.use_vault) {
    log.info("Using secrets db provider");
    db = new secretsDbProvider(new SecretManagerService(config, log), log, config)
  }
  else {
    db = new dataBase(config);
  }
  //Certificate Configuration and Operations
  if (config.https || !config.tls_offload) {
    if (!config.generate_certificates) {
      if (config.cert_format === 'raw') { // if you want to read the cert raw from variable.
        certs = { mps_tls_config: config.mps_tls_config, web_tls_config: config.web_tls_config };
      }
      else { // else read the certs from files
        certs = { mps_tls_config: tlsConfig.mps(), web_tls_config: tlsConfig.web() };
      }
      log.info(`Loaded existing certificates`);
    } else {
      if (!fs.existsSync(certPath))
        fs.mkdirSync(certPath, { recursive: true })
      certs = certificates.generateCertificates(config, certPath);
    }

    log.info("certs loaded..");

    // comment this out for release
    // log.info(JSON.stringify(certs));


    let mps = new mpsMicroservice(config, db, certs);
    mps.start();
  }
} catch (error) {
  log.error(`Error starting mps Microservice. Check server logs.`)
  log.error(error);
}

