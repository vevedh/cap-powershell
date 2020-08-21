import { __awaiter } from "tslib";
import { WebPlugin } from "@capacitor/core";
const { ipcRenderer, webFrame, remote, desktopCapturer, clipboard } = require("electron");
const powershell = require('node-powershell');
export class PowershellPluginWeb extends WebPlugin {
    constructor() {
        super({
            name: "PowershellPlugin",
            platforms: ["electron"],
        });
        this.Path = null;
        this.NodeFs = null;
        this.RemoteRef = null;
        this.IpcRenderRef = null;
        this.WebFrameRef = null;
        //ShellRef:any = null;
        this.DesktopCapturerRef = null;
        this.ClipBoardRef = null;
        this.ScreenRef = null;
        this.OsRef = null;
        this.SysInfosRef = null;
        this.NotifierRef = null;
        this.SshRef = null;
        this.PowerShellRef = null;
        console.log("PowershellPlugin");
        this.RemoteRef = remote;
        this.WebFrameRef = webFrame;
        this.IpcRenderRef = ipcRenderer;
        //this.ShellRef = shell;
        this.DesktopCapturerRef = desktopCapturer;
        this.ClipBoardRef = clipboard;
        this.ScreenRef = window.screen;
        this.PowerShellRef = new powershell({
            executionPolicy: 'Bypass',
            outputEncoding: 'utf-8',
            noProfile: true
        });
        this.Path = require("path");
        this.NotifierRef = require('node-notifier');
        this.SshRef = require('ssh2').Client;
        this.OsRef = require('os');
        this.NodeFs = require('fs-jetpack');
        this.SysInfosRef = require('systeminformation');
    }
    echo(value) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("plugin.js ECHO", value);
            return value;
        });
    }
    runPowerShell(cmd) {
        return __awaiter(this, void 0, void 0, function* () {
            const pws = this.PowerShellRef;
            return new Promise(function (resolve, reject) {
                pws.addCommand(`$OutputEncoding = [console]::InputEncoding = [console]::OutputEncoding = New-Object System.Text.UTF8Encoding`);
                pws.addCommand(cmd)
                    .then(() => pws.invoke()
                    .then((res) => {
                    //log.info("Résulat brut :",res);
                    //this.PowerShellRef.dispose();
                    resolve(res);
                }, (reason) => {
                    //this.PowerShellRef.dispose();
                    reject(reason);
                }));
            });
        });
    }
}
const PowershellPlugin = new PowershellPluginWeb();
export { PowershellPlugin };
import { registerWebPlugin } from "@capacitor/core";
registerWebPlugin(PowershellPlugin);
//# sourceMappingURL=plugin.js.map