import anecdoteService from '../services/anecdotes'

     
export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    })
  }
}


export const vote = (object) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.updateVote(object)
    dispatch({
      type: 'VOTE',
      data: updatedAnecdote,
    })
  }
}


const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
	console.log('action', action)
  switch(action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'VOTE':
      const changedAnecdote = action.data
      return state.map(anecdote => 
                    anecdote.id !== changedAnecdote.id ? anecdote 
                    : changedAnecdote
                    ).sort((a, b) => b.votes - a.votes)
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}




export default anecdoteReducer