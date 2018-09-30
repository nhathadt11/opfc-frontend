import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';

export const sagaMiddleware = createSagaMiddleware();
export const loggerMiddleware = createLogger();

export default [sagaMiddleware, loggerMiddleware];
