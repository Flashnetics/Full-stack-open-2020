import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import blogReducer from './reducers/blogReducer'
import loggedUserReducer from './reducers/loggedUserReducer'
import notificationReducer from './reducers/notificationReducer'
import usersReducer from './reducers/usersReducer'
import commentsReducer from './reducers/commentsReducer'

const reducer = combineReducers({
    blogs: blogReducer,
    loggedUser: loggedUserReducer,
    notification: notificationReducer,
    users: usersReducer,
    comments: commentsReducer
})

const store = createStore(
    reducer,
    applyMiddleware(thunk)
)


export default store