import { describe, it, expect } from "vitest";
import { parseLine } from "../src/parser";

const mockObj = {sport: 'FOOTBALL', competition: 'UEFA', home: 'Juventus', away: 'PSG', status: 'PRE'}

describe('parseLine', () => {
    it('should turn a PRE row with not scores into an SportEvent object', () => {
const line = 'evtId,sport,competition,1748500000000,home,away,status';
    expect(parseLine(line, mockObj)).toEqual({
        id: 'evtId',
        status: 'PRE',
        startTime: new Date(1748500000000).toISOString(),
        sport: 'FOOTBALL',
        competition: 'UEFA',
        scores: {

        },
        competitors: {
            HOME: { type: 'HOME', name: 'Juventus'},
            AWAY: { type: 'AWAY', name: 'PSG'}
        }
    })
    })
    
})