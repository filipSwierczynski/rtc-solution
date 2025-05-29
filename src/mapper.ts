export function parseMappings(blob: string): Record<string, string> {
    const map: Record<string, string> = {};
    
    if(!blob) return map;
    blob.split(';').forEach(pair => {
        if (!pair) return;
        const idx = pair.indexOf(':');
        if (idx === -1) return;
        map[pair.slice(0, idx)] = pair.slice(idx + 1);
    });
    return map;
}