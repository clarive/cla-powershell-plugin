(function(params) {

    var data = params.data || {};

    var serverCombo = Cla.ui.ciCombo({
        name: 'server',
        value: data.server || '',
        role: 'Server',
        fieldLabel: _('Server'),
        allowBlank: false,
        with_vars: 1
    });

    var pathPowershell = Cla.ui.textField({
        name: 'powershell',
        fieldLabel: _('Powershell Path'),
        value: data.powershell || '',
        allowBlank: false,
    });

    var pathFile = Cla.ui.textField({
        name: 'file',
        fieldLabel: _('Path to a powershell file'),
        enableKeyEvents: true,
        value: data.file || '',
    });
    pathFile.on('keyup', function(a) {
        if (a.getValue() != '') {
            script.hide();
        } else {
            script.show();
        }
    });
    var customParams = Cla.ui.arrayGrid({
        name: 'customParams',
        fieldLabel: _('Custom Params'),
        value: data.customParams,
        description: _('Custom commands or arguments'),
        default_value: '.'
    });

    var script = Cla.ui.textArea({
        name: 'script',
        fieldLabel: _('Script'),
        value: data.script || '',
    });

    var errors = Cla.ui.errorManagementBox({
        errorTypeName: 'type',
        errorTypeValue: params.data.type || 'warn',
        rcOkName: 'ok',
        rcOkValue: params.data.ok,
        rcWarnName: 'warn',
        rcWarnValue: params.data.warn,
        rcErrorName: 'error',
        rcErrorValue: params.data.error,
        errorTabsValue: params.data
    });

    var panel = Cla.ui.panel({
        layout: 'form',
        items: [
            serverCombo,
            pathPowershell,
            pathFile,
            customParams,
            script,
            errors
        ]
    });

    return panel;
})
