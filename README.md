# Kamaitachi Chunithm Questline Tracker

This repository contains the Kamaitachi integration for the [Kamaitachi Chunithm Questline](https://docs.google.com/spreadsheets/d/14BE1lDS04lZtms7PX53syK0rt6tVJ8-qdx6JDCtfxa4/edit?usp=sharing).
If you have a Kamaitachi account, it can automatically track most goals, excluding
OVER POWER requirements.

## Usage

If you simply want to use the sheet, please make a copy of the sheet above, (optionally)
fill in your Kamaitachi username, and start tracking.

## Development

While you can code as-is, installing the type stubs will give you autocompletion and type hinting.
This project uses pnpm:

```
pnpm install
```

You can use npm/yarn if you prefer them, but please don't check their lockfiles into source control.

### MYT-specific patches

A few changes are needed for the MYT version of the questline sheet. Those patches go into the
`myt-patches/` directory.
- Should you change any affected files, please verify if the patches still work.
- If you patch a new file, please add the patch file into the `Justfile`.

## License

MIT
