# GetAMTFeatures

This AMT method returns the enabled/disabled settings for AMT out-of-band features. 

Click [here](types.md) for supported input and output types.

## Example: Request Body

>**Important Note:** More information on obtaining an AMT device's GUID can be found [here](../../Topics/guids.md).

>**Note:** The following code block is an example of what would be the data sent as part of the POST request. 

``` yaml
//amt method

{  
   "method":"GetAMTFeatures",
   "payload":{  
      "guid":"038d0240-045c-05f4-7706-980700080009" //Replace with an AMT Device's GUID
   }
}
```
## Example : Success ResponseBody

``` yaml

'200':
    {
      "ResponseBody":{
        "userConsent": "all",
        "redirection": true,
        "KVM": true,
        "SOL": false,
        "IDER": false
      }
    }

```

Return to [MPS Methods](../indexMPS.md)