import { readFile, writeFile } from "node:fs/promises"
import { homedir } from "node:os"
import { join } from "node:path"
import { Plugin } from "@opencode/plugin/tui"

const CONFIG_FILE = join(process.env.XDG_CONFIG_HOME ?? join(homedir(), ".config"), "opencode", "cli.json")

export default Plugin.define({
  id: "local.toggle-tab-indicators",
  setup(context) {
    context.keymap.layer(() => ({
      mode: "global",
      commands: [
        {
          id: "local.tabs.indicators.toggle",
          title: "Toggle tab indicators (status/numbers)",
          group: "Tabs",
          bind: "<leader>#",
          palette: true,
          async run() {
            try {
              const config = JSON.parse(await readFile(CONFIG_FILE, "utf8"))
              const next = config.tabs?.indicators === "numbers" ? "status" : "numbers"
              config.tabs = { ...config.tabs, indicators: next }
              await writeFile(CONFIG_FILE, `${JSON.stringify(config, null, 2)}\n`)
              context.ui.toast.show({ message: `Tab indicators: ${next}`, variant: "success", duration: 1500 })
            } catch (error) {
              context.ui.toast.show({
                title: "Toggle tab indicators failed",
                message: error instanceof Error ? error.message : String(error),
                variant: "error",
              })
            }
          },
        },
      ],
    }))
  },
})
