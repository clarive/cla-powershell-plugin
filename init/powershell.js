var reg = require('cla/reg');

reg.register('service.powershell.script', {
    name: 'Powershell',
    icon: '/plugin/cla-powershell-plugin/icon/powershell.svg',
    form: '/plugin/cla-powershell-plugin/form/powershell-form.js',
    handler: function(ctx, params) {
        var ci = require("cla/ci");
        var log = require('cla/log');
        var reg = require('cla/reg');
        var fs = require('cla/fs');
        var powershellServer = params.server;
        var command = params.powershell || '';
        var file = params.file || '';
        var customParams = params.customParams;
        var script = params.script || '';
        var ciServer = ci.findOne({
            mid: powershellServer + ''
        });
        if (!ciServer) {
            log.error(_("CI Server not found"));
            throw new Error(_('CI Server not found'));
        }

        if (customParams) {
            command = command + ' ' + customParams.join(" ");
        }
        if (file) {
            command = command + ' -File ' + '"' + file + '"';
        } else {
            if (script) {
                var server = ci.load(powershellServer);
                var remoteTemp = server.remoteTemp();
                fs.createFile('/tmp/powershellscript-' + powershellServer + '.ps1', script);

                var output = reg.launch('service.fileman.ship', {
                    name: 'Ship a File Remotely',
                    config: {
                        server: params.server,
                        remote_path: remoteTemp,
                        local_path: '/tmp/powershellscript-' + powershellServer + '.ps1'
                    }
                });
                command = command + ' -File ' + remoteTemp + '\\powershellscript-' + powershellServer + '.ps1';
            }
        }

        log.debug(_("Command powershell: ") + command);

        var output = reg.launch('service.scripting.remote', {
            name: 'Run powershell script',
            config: {
                errors: params.type,
                server: params.server,
                user: params.user,
                home: params.home,
                path: command,
                output_error: params.output_error,
                output_warn: params.output_warn,
                output_capture: params.output_capture,
                output_ok: params.output_ok,
                meta: params.meta,
                rc_ok: params.ok,
                rc_error: params.error,
                rc_warn: params.warn
            }
        });
        return output;
    }
});