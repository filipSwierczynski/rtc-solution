
export const logScoreChange = (id: string, newScores: unknown) => {
console.log(JSON.stringify({
    type: 'score-changed',
    id,
    scores: newScores
}))
}

export const logStatusChanges = (id: string, from: string, to: string) => {
    console.log(JSON.stringify({
        type: 'status-changed',
        id, from, to
    }))
}