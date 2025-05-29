import fetch from "cross-fetch";
import { parseMappings } from "./mapper";
import { parseLine } from "./parser";
import { StateStore } from "./store";
import { logScoreChange, logStatusChanges } from "./logger";
import { SIM_URL } from "./config";

export function startPoller(store: StateStore) {
  let dict: Record<string, string> = {};

  async function tick() {
    try {
      const mapRes = await fetch(`${SIM_URL}/api/mappings`);
      dict = parseMappings((await mapRes.json()).mappings);

      const stateRes = await fetch(`${SIM_URL}/api/state`);
      const { odds } = await stateRes.json();

      const batch = odds
        .trim()
        .split("\n")
        .map((row: string) => parseLine(row, dict))
        .filter(Boolean) as any[];

      store.ingest(batch);
    } catch (err) {
      console.error({ err }, "polling failed");
    }
  }

  store.onChange((cur, prev) => {
    if (!prev) return;
    if (cur.status !== prev.status) {
      logStatusChanges(cur.id, prev.status, cur.status);
    }

    if (JSON.stringify(cur.scores) !== JSON.stringify(prev.scores)) {
      logScoreChange(cur.id, cur.scores);
    }
  });

  tick();
  return setInterval(tick, 1000);
}
