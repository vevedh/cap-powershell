import { WebPlugin } from "@capacitor/core";
import { PowershellPluginPlugin } from "./definitions";
export declare class PowershellPluginWeb extends WebPlugin implements PowershellPluginPlugin {
    Path: any;
    NodeFs: any;
    RemoteRef: any;
    constructor();
    echo(options: {
        value: string;
    }): Promise<{
        value: string;
    }>;
}
declare const PowershellPlugin: PowershellPluginWeb;
export { PowershellPlugin };
