# Powershell Plugin

<img src="https://cdn.jsdelivr.net/gh/clarive/cla-powershell-plugin@master/public/icon/powershell.svg?sanitize=true" alt="Powershell Plugin" title="Powershell Plugin" width="120" height="120">

The powershell plugin will allow you to run script powershell via the command-line (CLI).

## Requirements

There are no requirements outlined in Clarive in order to work with this plugin.

## Installation

To install the plugin, place the `cla-powershell-plugin` folder inside the `$CLARIVE_BASE/plugins`
directory in a Clarive instance.

## Powershell

The parameters available are:

- **Server (variable name: server)** - Server where you have Powershell installed.
- **Powershell Path (powershell)** - Full path where Powershell executable is located.
- **Path to a Powershell file (file)** - Full path to your Powershell script file.
- **Custom Params (custom_params)** - Additional parameters for the Powershell command.
- **Script (script)** - If you are not using a Powershell file, you can create your script here.

**Only Clarive EE**

- **Errors and output** - These two fields concern management of control errors. Their options are:
   - **Fail and output error** - Search for configured error pattern in script output. If found, an error message is
     displayed in the monitor showing the match.
   - **Warn and output warn** - Search for configured warning pattern in script output. If found, an error message is
     displayed in the monitor showing the match.
   - **Custom** - Where combo errors is set to custom, a new form is displayed for defining using the following fields:
      - **OK** - Range of return code values for the script to have succeeded. No message will be displayed in the
        monitor.
      - **Warn** - Range of return code values to warn the user. A warning message will be displayed in the monitor.
      - **Error** - Range of return code values for the script to have failed. An error message will be displayed in the
        monitor.
   - **Silent** - Silence all errors found.


## How to use

### In Clarive EE

Once the plugin is placed in its folder, you can find this service in the palette in the section of generic service and can be used like any other palette op.

Op Name: **Powershell**

Example:

```yaml
    Server Resource: GenericServer
    Powershell Path: C:/path/to/powershell.exe
    Path to a Powershell file: C:\script.ps1
    Custom Params: -ExecutionPolicy RemoteSigned
``` 

Configuration example without path file:

```yaml
    Server Resource: GenericServer
    Powershell Path: C:/path/to/powershell.exe
    Path to a Powershell file:
    Custom Params: -ExecutionPolicy RemoteSigned
    Script: Write-Host "Hello, World!"
``` 

### In Clarive SE

#### Rulebook

If you want to use the plugin through the Rulebook, in any `do` block, use this ops as examples to configure the different parameters:

Example:

```yaml
rule: Powershell demo
do:
   - powershell_script:
      server: 'powershell_server'               # Required. Use the Resource MID
      powershell: 'C:/path/to/powershell.exe'   # Required
      custom_params: ['-ExecutionPolicy RemoteSigned']
      file: 'C:\script.ps1'
```

Configuration example without path file:

```yaml
rule: Powershell demo
do:
   - powershell_script:
      server: 'powershell_server'               # Required. Use the Resource MID
      powershell: 'C:/path/to/powershell.exe'   # Required
      custom_params: ['-ExecutionPolicy RemoteSigned']
      script: |
        Write-Host "Hello, World!"
```

##### Outputs

###### Success

The plugin will return the console output.

###### Possible configuration failures

**Command failed**

The service will return the output from the server console.

**Variable required**

```yaml
Error in rulebook (compile): Required argument(s) missing for op "powershell_script": "server"
```

Make sure you have all required variables defined.

**Not allowed variable**

```yaml
Error in rulebook (compile): Argument `Server` not available for op "powershell_script"
```

Make sure you are using the correct paramaters (make sure you are writing the variable names correctly).

## More questions?

Feel free to join **[Clarive Community](https://community.clarive.com/)** to resolve any of your doubts.