# Powershell Plugin

The powershell plugin will allow you to run script powershell via the command-line (CLI).

## Requirements

There are no requirements outlined in Clarive in order to work with this plugin.

## Installation

To install the plugin, place the `cla-powershell-plugin` folder inside the `CLARIVE_BASE/plugins`
directory in a Clarive instance.

## How to Use

Once the plugin is correctly installed, you will have a new palette service called 'Powershell'.


### Powershell

This palette service will enable you to use commands that allow you to interact with Powershell.
The main fields are:

- **Server** - Server where Powershell is installed.
- **Path to a Powershell file** - Path to a Powershell file in the Server.
- **Custom Params** - Paramaters that can be used by command line.
- **Script** - When you do not use a Powershell file, you can write the script in this field.

Configuration example:

    Server CI: GenericServer
    Path to a Powershell file: c:\script.ps1
    Custom Params: -ExecutionPolicy RemoteSigned
    
Configuration example without path file:

    Server CI: GenericServer
    Path to a Powershell file:
    Custom Params: -ExecutionPolicy RemoteSigned
    Script: Write-Host "Hello, World!"

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


