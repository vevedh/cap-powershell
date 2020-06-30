import { __awaiter } from "tslib";
import { WebPlugin } from "@capacitor/core";
const { remote } = require("electron");
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
            console.log("ECHO", value);
            //console.log("Remote :",this.RemoteRef);
            //console.log("Path :",this.Path);
            //console.log("NodeFS :",this.NodeFs);
            return value;
        });
    }
}
const PowershellPlugin = new PowershellPluginWeb();
export { PowershellPlugin };
import { registerWebPlugin } from "@capacitor/core";
registerWebPlugin(PowershellPlugin);
//# sourceMappingURL=plugin.js.map