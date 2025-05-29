import { ScorePeriod, SportEvent } from "./types";

export function parseLine(
  line: string,
  dict: Record<string, string>
): SportEvent | null {
  const parts = line.split(",");
  if (parts.length < 7) return null;

  const [id, sportId, compId, startTime, homeId, awayId, statusId, scoreBlob = ''] = parts;

  const sport = dict[sportId];
  const competition = dict[compId];
  const homeName = dict[homeId];
  const awayName = dict[awayId];
  const status = dict[statusId];
  if (!sport || !competition || !homeName || !awayName || !status) return null;

  const scores: Record<string, ScorePeriod> = {};
  if (scoreBlob.trim() !== '') {
    scoreBlob.split('|').forEach(chunk => {
        const [periodId, homeAway] = chunk.split('@');
        const periodType = dict[periodId];
        if (!periodType) return;
        const [home, away] = homeAway.split(':');
        scores[periodType] = { type: periodType, home, away};
    });
  }
  return {
    id,
    status,
    scores,
    startTime: new Date(Number(startTime)).toISOString(),
    sport,
    competition,
    competitors: {
        HOME: { type: 'HOME', name: homeName},
        AWAY: { type: 'AWAY', name: awayName}
    }
  }
}
