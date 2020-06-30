import { WebPlugin } from "@capacitor/core";
import { PowershellPluginPlugin } from "./definitions";
export declare class PowershellPluginWeb extends WebPlugin implements PowershellPluginPlugin {
    Path: any;
    NodeFs: any;
    RemoteRef: any;
    constructor();
    echo(value: string): Promise<string>;
    runPowerShell(cmd: string): Promise<any>;
}
declare const PowershellPlugin: PowershellPluginWeb;
export { PowershellPlugin };
