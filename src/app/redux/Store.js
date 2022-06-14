import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'
import RootReducer from './reducers/RootReducer'
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../redux/saga/index'
import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import { createLogger, LoggerPredicate } from 'redux-logger'

const logger = createLogger({
    // ...options
    predicate: LoggerPredicate,
})
const history = createBrowserHistory()
const sagaMiddleware = createSagaMiddleware({ context: history })
//const history=useHistory()
//console.log(RootReducer)
const routeMiddleware = routerMiddleware(history)
const initialState = {}
const middlewares = [logger, sagaMiddleware, thunk, routeMiddleware]

let devtools = (x) => x

if (
    process &&
    process.env.NODE_ENV !== 'production' &&
    process.browser &&
    window.__REDUX_DEVTOOLS_EXTENSION__
) {
    devtools = window.__REDUX_DEVTOOLS_EXTENSION__()
}

export const Store = createStore(
    RootReducer,
    initialState,
    compose(applyMiddleware(...middlewares), devtools)
)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

/*export default function configureStore(initialState) {
  const store = createStore(
    RootReducer(history),
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  );

 // sagaMiddleware.run(rootSaga);

//   if (module.hot) {
//     // Enable Webpack hot module replacement for reducers
//     module.hot.accept("../redux/reducers/RootReducer", () => {
//       const nextRootReducer = require("../redux/reducers/RootReducer");
//       store.replaceReducer(nextRootReducer);
//     });
//   }
  return store;
}
*/
sagaMiddleware.run(rootSaga)
export { history }
