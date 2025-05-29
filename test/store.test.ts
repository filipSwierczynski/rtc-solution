import { describe, it, expect } from "vitest";
import { SportEvent } from "../src/types";
import { StateStore } from "../src/store";

const dummy = (id: string): SportEvent => ({
    id, status: 'PRE', startTime: new Date().toISOString(), sport: 'FOOTBALL', competition: 'UEFA', competitors: {
        HOME: { type: 'HOME', name: 'A'},
        AWAY: { type: 'AWAY', name: 'B'}
    },
    scores: {}
});

describe('StateStore', () => {
    it('should mark vanished events as REMOVED and hide them', () => {
        const s = new StateStore();
        s.ingest([dummy['1']]);
        s.ingest([]);
        expect(s.all().get('1')!.status.toBe('REMOVED'));
        expect(s.visible().toHaveLength(0))
    })
})