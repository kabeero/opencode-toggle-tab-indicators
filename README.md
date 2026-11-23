# opencode-toggle-tab-indicators

An [OpenCode](https://opencode.ai) TUI plugin that toggles the session tab indicators between status icons and tab numbers with one keypress.

OpenCode's `tabs.indicators` setting is either `status` (icons) or `numbers` (always show the number that `Ctrl+1`…`Ctrl+0` jumps to). It has no built-in toggle, so switching means editing `cli.json`. This plugin adds a command that flips it for you.

- Flips `tabs.indicators` in your `cli.json` between `status` and `numbers`.
- Shows a toast with the new value.
- OpenCode reloads valid `cli.json` edits while the TUI is running, so the change applies immediately.

## Install

Clone into OpenCode's global plugin directory. OpenCode discovers it automatically.

```sh
git clone https://github.com/kabeero/opencode-toggle-tab-indicators ~/.config/opencode/plugins/toggle-tab-indicators
```

If you set `$XDG_CONFIG_HOME`, use `$XDG_CONFIG_HOME/opencode/plugins/toggle-tab-indicators` instead.

Then run `/reload` in OpenCode, or restart it. Confirm it loaded with `opencode plugin list`.

To update, `git pull` inside that folder and `/reload`. To remove, delete the folder.

## Usage

| Trigger | Action |
| --- | --- |
| Your leader key, then `Shift+3` (`<leader>shift+3`) | Toggle tab indicators |
| Your leader key, then `#` (`<leader>#`) | Same, alternate spelling |
| `Ctrl+P`, then "Toggle tab indicators (status/numbers)" | Same, from the command palette |

## Configure

The command ID is `local.tabs.indicators.toggle` and the default bind is `<leader>shift+3,<leader>#`. OpenCode keybinds spell Shift out (`shift+3`) rather than using the shifted character. Both spellings are bound because terminals differ in how they report `#`.

To change the key, edit the `bind` string in `tui.ts`.

The plugin reads and writes `~/.config/opencode/cli.json`, or `$XDG_CONFIG_HOME/opencode/cli.json` when that variable is set.

## Caveats

- The plugin rewrites `cli.json` with two-space indentation. Comments in the file are lost, because the file is parsed as plain JSON. If you keep comments in `cli.json`, this plugin will break the file or strip them.
- If the file is missing, unreadable or invalid JSON, you get an error toast and nothing is written.
- If `<leader>3` is bound to switch to tab 3 (the default for `session.tab.select.3`), `<leader>shift+3` may overlap with it on some terminals. Test the key before relying on it.

## Requirements

- OpenCode V2 (TUI plugin API, `@opencode/plugin/tui`). Developed and tested on macOS with OpenCode v2.2.7.
- Session tabs enabled (`tabs.mode` is `auto` or `on` in `cli.json`).

## License

[MIT](LICENSE)
