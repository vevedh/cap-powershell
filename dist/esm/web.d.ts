import { WebPlugin } from "@capacitor/core";
import { PowershellPluginPlugin } from "./definitions";
export declare class PowershellPluginWeb extends WebPlugin implements PowershellPluginPlugin {
    Path: any;
    NodeFs: any;
    RemoteRef: any;
    IpcRenderRef: any;
    WebFrameRef: any;
    DesktopCapturerRef: any;
    ClipBoardRef: any;
    ScreenRef: any;
    OsRef: any;
    NotifierRef: any;
    SshRef: any;
    PowerShellRef: any;
    SysInfosRef: any;
    constructor();
    echo(value: string): Promise<string>;
    runPowerShell(cmd: string): Promise<any>;
}
declare const PowershellPlugin: PowershellPluginWeb;
export { PowershellPlugin };
