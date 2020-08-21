
import { WebPlugin } from "@capacitor/core";
import { PowershellPluginPlugin } from "./definitions";
const { ipcRenderer, webFrame, remote ,  desktopCapturer, clipboard  } = require("electron");
const  powershell  = require('node-powershell');

export class PowershellPluginWeb extends WebPlugin
  implements PowershellPluginPlugin {

  Path: any = null;
  NodeFs: any = null;
  RemoteRef: any = null;
  IpcRenderRef: any = null;
  WebFrameRef: any = null;
  //ShellRef:any = null;
  DesktopCapturerRef: any = null;
  ClipBoardRef: any = null;
  ScreenRef: any = null;
  OsRef:any = null;
  SysInfosRef:any = null;
  NotifierRef:any = null;
  SshRef:any = null;
  PowerShellRef: any = null;
  


  constructor() {
    super({
      name: "PowershellPlugin",
      platforms: ["electron"],
    });
    console.log("PowershellPlugin");

    this.RemoteRef = remote;
    this.WebFrameRef = webFrame;
    this.IpcRenderRef = ipcRenderer;
    //this.ShellRef = shell;
    this.DesktopCapturerRef = desktopCapturer;
    this.ClipBoardRef = clipboard;
    this.ScreenRef = (window as any).screen;

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

  async echo(value: string ): Promise<string> {
    console.log("plugin.js ECHO", value);
    return value;
  }

  async runPowerShell(cmd: string): Promise<any> {
    const pws = this.PowerShellRef;
  
    return new Promise(function (resolve, reject) {
      
      pws.addCommand(`$OutputEncoding = [console]::InputEncoding = [console]::OutputEncoding = New-Object System.Text.UTF8Encoding`)
      pws.addCommand(cmd)
        .then(() => pws.invoke()
          .then((res:any) => {
            //log.info("Résulat brut :",res);
            //this.PowerShellRef.dispose();
            resolve(res);
          }, (reason:any) => {
            //this.PowerShellRef.dispose();
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