declare module "@capacitor/core" {
  interface PluginRegistry {
    PowershellPlugin: PowershellPluginPlugin;
  }
}

export interface PowershellPluginPlugin {
  echo(value: string ): Promise<string>;
  runPowerShell(cmd: string): Promise<any>;
}
