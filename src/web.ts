
import { WebPlugin } from "@capacitor/core";
import { PowershellPluginPlugin } from "./definitions";
const { remote } = require("electron");

export class PowershellPluginWeb extends WebPlugin
  implements PowershellPluginPlugin {
  Path: any = null;
  NodeFs: any = null;
  RemoteRef: any = null;

  constructor() {
    super({
      name: "PowershellPlugin",
      platforms: ["electron"],
    });
    console.log("PowershellPlugin");
    this.RemoteRef = remote;
    this.Path = require("path");
    this.NodeFs = require("fs");
  }

  async echo(value: string ): Promise<string> {
    console.log("ECHO", value);
    //console.log("Remote :",this.RemoteRef);
    //console.log("Path :",this.Path);
    //console.log("NodeFS :",this.NodeFs);
    return value;
  }
}

const PowershellPlugin = new PowershellPluginWeb();

export { PowershellPlugin };

import { registerWebPlugin } from "@capacitor/core";
registerWebPlugin(PowershellPlugin);