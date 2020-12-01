import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification} from '../reducers/notificationReducer'
const Anecdote = ({ anecdote, handleClick }) => {
	return(
		<div>
		<div>{anecdote.content}</div>
		<div>has {anecdote.votes} &nbsp;
		<button onClick={handleClick}>vote</button>
		</div>
		</div>
	)
}



const Anecdotes = () => {
	const dispatch = useDispatch()
	const anecdotes = useSelector(({ filter, anecdotes }) => {
	if  ((filter === '') || (filter === undefined)){
		return anecdotes
		
	  }
	  return anecdotes.filter(anecdote => { return anecdote.content.indexOf(filter) !== -1 })
	})
	const voteAnecdote = (anecdote) => {
		dispatch(vote(anecdote))
		dispatch(setNotification(`you voted '${anecdote.content}'`, 10))
	}
	return(
		<div>
			{anecdotes.map(anecdote =>
				<Anecdote key={anecdote.id}
					anecdote={anecdote}
					handleClick={()=> voteAnecdote(anecdote)}
				/>
			)}
		</div>
	)
			}


export default Anecdotes