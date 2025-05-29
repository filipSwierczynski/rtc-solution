import { describe, it, expect } from "vitest";
import { parseMappings } from '../src/mapper';

describe('parseMappings', () => {
    it('should convert "id1:value1;" into an object', () => {
        const blob = 'a:FOOTBALL;b:LIVE;';
        expect(parseMappings(blob)).toEqual({a: 'FOOTBALL', b: 'LIVE'});
    });
})