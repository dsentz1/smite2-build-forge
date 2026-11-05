# SMITE 2 Build Forge

A free build calculator for SMITE 2 that runs entirely in your browser.

**Use it:** https://dsentz1.github.io/smite2-build-forge/

- Pick a god, the mode (Conquest, Joust, Assault) and the enemy gods, and get a full build in buy order:
  starter, six items, relic, and why each item is there.
- **Item check** compares any item against the best alternative in every matchup (squishies vs tanks,
  physical vs magical enemies, healers, ahead vs behind).
- Item, god and aspect data come from [wiki.smite2.com](https://wiki.smite2.com) and are refreshed after each patch.

Nothing is installed and nothing is sent anywhere: the optimizer runs in your browser
(Python via [Pyodide](https://pyodide.org)). There is no account, tracking or server.

This repository holds only the built site. Builds score a level-20 teamfight; they are a strong starting point,
not a guarantee. SMITE 2 and the god portraits are © Hi-Rez Studios (portraits via wiki.smite2.com); this is an unofficial fan tool.
