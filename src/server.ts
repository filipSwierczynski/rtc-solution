import express from 'express';
import { StateStore } from './store';

export function createServer(store: StateStore) {
    const app = express();

    app.get('/client/state', (_req, res) => {
        res.json(Object.fromEntries(store.visible().map(e => [e.id, e])));
    })

    return app;
}