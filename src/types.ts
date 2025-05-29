export interface ScorePeriod {
    type: string;
    home: string;
    away: string;
}

export interface Competitor {
    type: 'HOME' | 'AWAY';
    name: string;
}

export interface SportEvent {
    id: string;
    status: 'PRE' | 'LIVE' | 'REMOVED' | string;
    scores: Record<string, ScorePeriod>;
    startTime: string;
    sport: string;
    competition: string;
    competitors: {
        HOME: Competitor;
        AWAY: Competitor;
    }
}