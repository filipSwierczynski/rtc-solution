import { StateStore } from './store';
import { startPoller } from './poller';
import { createServer } from './server';
import { PORT } from './config';

const store  = new StateStore();
startPoller(store);

createServer(store).listen(PORT, () => console.log(`API listening on :${PORT}`));
