
import { WebPlugin } from "@capacitor/core";
import { PowershellPluginPlugin } from "./definitions";
const { remote } = require("electron");
const  powershell  = require('node-powershell');

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
    console.log("plugin.js ECHO", value);
    return value;
  }

  async runPowerShell(cmd: string): Promise<any> {
    var psw = new powershell({
      executionPolicy: 'Bypass',
      outputEncoding: 'utf-8',
      noProfile: true
    });
  
    return new Promise(function (resolve, reject) {
      psw.addCommand(`$OutputEncoding = [console]::InputEncoding = [console]::OutputEncoding = New-Object System.Text.UTF8Encoding`)
      psw.addCommand(cmd)
        .then(() => psw.invoke()
          .then((res:any) => {
            //log.info("Résulat brut :",res);
            psw.dispose();
            resolve(res);
          }, (reason:any) => {
            reject(reason);
          })
        )
    });
  }


}

const PowershellPlugin = new PowershellPluginWeb();

export { PowershellPlugin };

import { registerWebPlugin } from "@capacitor/core";
registerWebPlugin(PowershellPlugin);