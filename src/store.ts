import { SportEvent } from "./types";

type Listener = (next: SportEvent, prev?: SportEvent) => void;

export class StateStore {
    events = new Map<string, SportEvent>();
    subs: Listener[] = [];

    onChange(fn: Listener) {
        this.subs.push(fn);
    }

    ingest(batch: SportEvent[]) {
        const seen = new Set<string>();

        batch.forEach(ev => {
            const prev = this.events.get(ev.id);
            seen.add(ev.id);
            this.events.set(ev.id, ev);

            if (!prev || prev.status !== ev.status || JSON.stringify(prev.scores) !== JSON.stringify(ev.scores)) {
                this.notify(ev, prev);
            }
        })
    }

    visible() {
        return [...this.events.values()].filter(e => e.status !== 'REMOVED');
    }

    all() {
        return this.events;
    }

    notify(current: SportEvent, prev?: SportEvent) {
        this.subs.forEach(sub => sub(current,prev))
    }
}