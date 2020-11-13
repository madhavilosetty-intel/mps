# API and Command Reference

This section is a reference to the MPS API methods available in Active Edge, and to some commands it provides. 

There are two types of method paths for the MPS Server:

- AMT path methods - Allow you to send device-specific calls for things such as power actions or audit logs. Utilize these methods by setting the path to **amt** in your API call.
- Admin path methods - Allow you to send calls for info for all devices or for MPS configuration information. Utilize these methods by setting the path to **admin** in your API call.

Steps on how to create your own Rest API call can be found in the [Construct a Rest API Call](../Tutorials/apiTutorial.md) tutorial.

## How to Use the REST API

### Request URL

The request URL is assembled using your MPS server's IP Address, the port, and the base path for the method you would like to run. The tables below explore what methods are accessible for each base path.

```
Example url: https://localhost:3000/amt
```

### Base paths

``` yaml
/amt/
/admin/
```

## API Calls

The sections below list methods for MPS. 

The MPS API includes Admin and AMT methods.

<br>

### Admin Methods
  
   | Method       |  Description/Usage |
   | :----------- | :------------------------ |
   | **[AllDevices](./MPSmethods/alldevices.md)** | Lists all devices known to MPS, regardless of connected status |
   | **[ConnectedDevices](./MPSmethods/connecteddevices.md)** | Lists all devices currently connected to MPS |
   | **[Disconnect](./MPSmethods/disconnect.md)** | Disconnects the CIRA connection for a specified guid |
   | **[MEScript](./MPSmethods/mescript.md)** | Downloads the cira_setup.mescript from MPS |
   | **[RootCertificate](./MPSmethods/rootcertificate.md)** | Download the MPS Root Certificate |

<br>

### AMT Methods

**Note:** These methods are 1:1 device-specific.

   | Method       |  Description/Usage |
   | :----------- | :------------------------ |   
   | **[AuditLog](./MPSmethods/auditlog.md)** | Returns a requested amount or time range of Intel® AMT Audit Log data for a specified guid |
   | **[EventLog](./MPSmethods/eventlog.md)** | Return sensor and hardware event data |
   | **[GeneralSettings](./MPSmethods/generalsettings.md)** | View general network settings |
   | **[GetAMTFeatures](./MPSmethods/getamtfeatures.md)** | View what AMT out-of-band features are enabled/disabled |
   | **[HardwareInfo](./MPSmethods/hardwareinfo.md)** | Retrieve hardware information such as processor or storage  |
   | **[PowerAction](./MPSmethods/poweraction.md)** | Perform an OOB power action |
   | **[PowerCapabilities](./MPSmethods/powercapabilities.md)** | View what OOB power actions are available for that device |
   | **[PowerState](./MPSmethods/powerstate.md)** | Retrieve current state of AMT device, returns a number that maps to the [PowerActions](./MPSmethods/poweraction.md) table |
   | **[SetAMTFeatures](./MPSmethods/setamtfeatures.md)** | Enable/Disable AMT features such as KVM, SOL, and IDE-R |
   | **[Version](./MPSmethods/version.md)** | Retrieve AMT version of device |
 