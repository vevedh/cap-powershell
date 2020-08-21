var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { WebPlugin } from "@capacitor/core";
const { ipcRenderer, webFrame, remote, desktopCapturer, clipboard } = require("electron");
const powershell = require('node-powershell');
export class PowershellPluginWeb extends WebPlugin {
    constructor() {
        super({
            name: "PowershellPlugin",
            platforms: ["web"],
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
        this.NotifierRef = null;
        this.SshRef = null;
        this.PowerShellRef = null;
        this.SysInfosRef = null;
        console.log("PowershellPlugin");
        this.RemoteRef = remote;
        this.WebFrameRef = webFrame;
        this.IpcRenderRef = ipcRenderer;
        //this.ShellRef = Shell;
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
            console.log(" web.js ECHO", value);
            //console.log("Remote :",this.RemoteRef);
            //console.log("Path :",this.Path);
            //console.log("NodeFS :",this.NodeFs);
            return value;
        });
    }
    runPowerShell(cmd) {
        return __awaiter(this, void 0, void 0, function* () {
            var psw = new powershell({
                executionPolicy: 'Bypass',
                outputEncoding: 'utf-8',
                noProfile: true
            });
            return new Promise(function (resolve, reject) {
                psw.addCommand(`$OutputEncoding = [console]::InputEncoding = [console]::OutputEncoding = New-Object System.Text.UTF8Encoding`);
                psw.addCommand(cmd)
                    .then(() => psw.invoke()
                    .then((res) => {
                    //log.info("Résulat brut :",res);
                    psw.dispose();
                    resolve(res);
                }, (reason) => {
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
//# sourceMappingURL=web.js.map