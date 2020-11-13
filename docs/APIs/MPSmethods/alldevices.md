# AllDevices

This Admin method lists all devices known to MPS, regardless of connected status. 

Click [here](types.md) for supported input and output types.

## Example: Request Body

>**Note:** The following code block is an example of what would be the data sent as part of the POST request. 

``` yaml
//admin method

{  
   "method":"AllDevices",
   "payload":{}
}
	
```
## Example: Success ResponseBody

``` yaml
[
    {
        "name": "Win7-machine",
        "mpsuser": "standalone",
        "amtuser": "admin",
        "host": "8dad96cb-c3db-11e6-9c43-bc0000d20000",
        "icon": 1,
        "conn": 1
    },
    {
        "name": "Ubuntu-machine",
        "mpsuser": "xenial",
        "amtuser": "admin",
        "host": "bf49cf00-9164-11e4-952b-b8aeed7ec594",
        "icon": 1,
        "conn": 0
    }
]
```

Return to [MPS Methods](../indexMPS.md)