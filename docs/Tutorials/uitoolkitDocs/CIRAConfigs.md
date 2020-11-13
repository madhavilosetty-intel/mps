# Quickstart - To Bundle CIRA configs Control  

This document shows how to bundle CIRA configs control and display it on a sample html page for testing.

  - how to customize the control
  - how to create a bundle for CIRA configs control
  - how to add to sample html
  - how to add a new language for Internalization 


## Prerequisites

In order to deploy and make changes, the following tools and application has to be installed on your development machine
-   [Git](https://git-scm.com/)
-   [Visual Studio Code](https://code.visualstudio.com/) or any other IDE 
-   [Node.js](https://nodejs.org/)
-   [RPS](https://github.com/open-amt-cloud-toolkit/rps) stands for **R**emote **P**rovisioning **S**erver
-	Intel AMT device is configured and connected to RPS. See the [RPS](https://github.com/open-amt-cloud-toolkit/rps) for documentation.
-   Chrome 

## Download and Install UI Toolkit

At a command prompt, run the following commands:
```
git clone https://github.com/open-amt-cloud-toolkit/ui-toolkit
cd ui-toolkit
npm install
```

## Customize the control

To add new changes and test the changes  instantly before bundling the control, webpack dev server can be used

After making  the changes, open a command prompt and navigate to the root of ui-toolkit, run the below command.

```
npm start
```

Open the browser and navigate to following URL

```
http://localhost:8080/cira.htm?server=<protocol>://<rps IPaddress>:<rps port>
```

**Note:** By default webpack dev server runs on port 8080. If port 8080 is already in use, webpack automatically runs on  the next immediate available port

## Create Bundle for CIRA configs
At a command prompt navigate to the root of ui-toolkit, run the below command.
> **Note:** Remove or rename the existing **cira.core.min.js**  in **dist/**
```
npm run build
```
A new **cira.core.min.js** will be created in **dist/** directory.

To bundle the cira configs control without node_modules,  run the below command in a command prompt on the root of ui-toolkit,

```
npm run build-ext
```

**Note**: The bundle generated using build-ext command can be used in react apps as an independent control



## Add to sample html page

To display the CIRA configs control on a sample web page, update following changes to the existing **src/sample/sampleCIRA.htm** page.

```
<body>
<div id="ciraroot"></div>
<script src="../../dist/cira.core.min.js" crossorigin></script>
</body>
```

## Test the sample page
At a command prompt navigate to the root of ui-toolkit, run the below command.
```
npx serve
```
Open Chrome browser, navigate to the following url
```
http://<localhost>:5000/src/sample/sampleCIRA.htm?server=<rps IPaddress>:<rps port>
```

## Add a new Language for Internationalization

 Please refer to [Localization](./localization.md) docs


 ## Run RPS server in DEV mode

To display UI controls on local react Web UI for **testing**, make the following changes.

- Go to your local **rps** application where it is running.
- Press **ctrl+c** to exit the application.
- Edit the file **rps/package.json**

Replace the *dev* command under *scripts* with below code 

```
"dev": "set RPS_NODE_ENV=dev&& set RPS_USE_VAULT=false&& set RPS_USE_DB_PROFILES=false&& set RPS_LOG_LEVEL=silly&& set RPS_HTTPS=false&& npm start"
```

- Edit the file **rps/.rpsrc**

Update the *xapikey* value with below snippet

```
"xapikey": "APIKEYFORRPS123!"
```

- Save the changes.
- At the command prompt, run the below command from the root of **rps** application

```
npm run dev
```
