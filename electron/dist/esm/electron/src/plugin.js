import { __awaiter } from "tslib";
import { WebPlugin } from "@capacitor/core";
const { remote } = require("electron");
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
        console.log("PowershellPlugin");
        this.RemoteRef = remote;
        this.Path = require("path");
        this.NodeFs = require("fs");
    }
    echo(value) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("plugin.js ECHO", value);
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
//# sourceMappingURL=plugin.js.map