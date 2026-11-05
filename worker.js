// Runs the SMITE 2 optimizer (Python, via Pyodide) off the page's main thread.
let py = null;
let ready = null;

async function init() {
  const base = new URL("./", self.location.href).href;
  importScripts(base + "pyodide/pyodide.js");
  py = await loadPyodide({ indexURL: base + "pyodide/" });
  const res = await fetch(base + "smite2_bundle.zip");
  if (!res.ok) throw new Error("Could not load the build engine (" + res.status + ").");
  py.unpackArchive(await res.arrayBuffer(), "zip", { extractDir: "/home/pyodide/app" });
  py.runPython("import sys, json\nsys.path.insert(0, '/home/pyodide/app')\nfrom smite2 import webapi\nwebapi.db()");
}

self.onmessage = async (event) => {
  const { id, fn, payload } = event.data;
  try {
    if (!ready) ready = init();
    await ready;
    if (fn === "warmup") {
      self.postMessage({ id, ok: true, result: null });
      return;
    }
    if (!["build", "explain"].includes(fn)) throw new Error("Unknown request: " + fn);
    py.globals.set("payload_json", JSON.stringify(payload || {}));
    const out = py.runPython(`json.dumps(webapi.${fn}(json.loads(payload_json)))`);
    self.postMessage({ id, ok: true, result: JSON.parse(out) });
  } catch (err) {
    let msg = String((err && err.message) || err);
    const last = msg.trim().split("\n").filter(Boolean).pop() || msg;
    self.postMessage({ id, ok: false, error: last.replace(/^(KeyError|ValueError):\s*/, "").replace(/^['"]|['"]$/g, "") });
  }
};
