
import { WebPlugin } from "@capacitor/core";
import { PowershellPluginPlugin } from "./definitions";
const { ipcRenderer, webFrame, remote , desktopCapturer, clipboard  } = require("electron");
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
  NotifierRef:any = null;
  SshRef:any = null;
  PowerShellRef: any = null;
  SysInfosRef: any = null;


  constructor() {
    super({
      name: "PowershellPlugin",
      platforms: ["web"],
    });
    console.log("PowershellPlugin");

    this.RemoteRef = remote;
    this.WebFrameRef = webFrame;
    this.IpcRenderRef = ipcRenderer;
    //this.ShellRef = Shell;
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
    console.log(" web.js ECHO", value);
    //console.log("Remote :",this.RemoteRef);
    //console.log("Path :",this.Path);
    //console.log("NodeFS :",this.NodeFs);
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