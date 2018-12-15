import React from 'react'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'

/*
const Menu = () => (
  <div>    
    <a href='#'>anecdotes</a>&nbsp;
    <a href='#'>create new</a>&nbsp;
    <a href='#'>about</a>&nbsp;
  </div>
)
*/

const Navigation = () => (
  <nav >
      <NavLink to="/" activeClassName="active">Home </NavLink> &nbsp;
      <NavLink to="/anecdotes">anecdotes</NavLink> &nbsp;
      <NavLink to="/createNew">create new</NavLink> &nbsp;
      <NavLink to="/about">about</NavLink> &nbsp;
  </nav>
);

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => <li key={anecdote.id} >{anecdote.content}</li>)}
    </ul>  
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>
    
    <em>An anecdote is a brief, revealing account of an individual person or an incident. 
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself, 
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative. 
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code. 
  </div>
)

const Anecdote = ({anecdote}) => {
  console.log("Anecdote/anecdote: ",anecdote)
  return(
  <div>
    <h2>{anecdote.content}</h2>
    <div>has {anecdote.votes} votes</div> 
    <p></p>
  </div>
)}

const Anecdotes = ({anecdotes}) => {
  console.log ('Anecdotes/anecdotes: ',anecdotes)
  return(
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map(anecdote=>
          <li key={anecdote.id}>
            <NavLink to={`/anecdote/${anecdote.id}`}>{anecdote.content}</NavLink>
          </li>
        )}
      </ul>
    </div>
  )
}


class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    console.log("handleChange")
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    console.log('handleSubmit/state: ',this.state)
    //this.props.newNotice(this.state.content)
    console.log('handleSubmit')
  
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })

    this.props.history.push('/anecdotes')
  }

  render() {
    
    return(
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            content 
            <input name='content' value={this.state.content} onChange={this.handleChange} />
          </div>
          <div>
            author
            <input name='author' value={this.state.author} onChange={this.handleChange} />
          </div>
          <div>
            url for more info
            <input name='info' value={this.state.info} onChange={this.handleChange} />
          </div> 
          <button>create</button>
        </form>
      </div>  
    )

  }
}

class Notification extends React.Component {
  constructor(props) {
    super(props) 
    this.state = {
      timer: '',
      timeOut :''
    }
  }

  noticeClear() {
    //console.log('noticeClear')
    //console.log('clear timer: ', this.timeOut)
    clearTimeout(this.timeOut)
    this.props.clearNotice()

  }
  
  noticeToShow = (not) => {
      
    //console.log('noticeToShow/state: ',this.state)
    //console.log('noticeToShow/props: ',this.props)
    const newNotice = not
    //console.log('noticeToShow/notice: ',this.props.not)
    //console.log('noticeToShow/newNotice: ',newNotice)
    
    if (newNotice !== "")
    {
      if (this.timeOut !== undefined) {
        clearTimeout(this.timeOut)
      }
      this.timeOut=setTimeout(() => this.noticeClear(), 5000)
      console.log('set timer: ',this.timeOut)
      return newNotice
    }
    return ''
  }

  render() {
    const style = {
      color : 'red',
      border: 'solid',
      borderColor: 'green',
      borderRadius: '10',
      borderStyle: 'groove',
      padding: 10,
      borderWidth: 4
    }

    return (
      <div style={style}>
        {this.noticeToShow(this.props.not)}
      </div>
    )
  }
} 



class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notice : '',
      isShow : false
    } 
  }

  clearNotice = () => {
    //console.log('clearNotice: ')
    this.setState({isShow : false})
  }

  addNew = (anecdote) => {
    //console.log('addNew/anecdote: ',anecdote)
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({ anecdotes: this.state.anecdotes.concat(anecdote) })
    this.setState({isShow : true})
    this.setState({notice : anecdote.content})
    //console.log('addNew/t.s.anecdotes: ',this.state.anecdotes)
    //console.log('addNew/t.s: ',this.state)
    //console.log('addNew/t.s.notice: ',this.state.notice)
  }

  anecdoteById = (id) => {
    console.log('anecdoteById/id: ',id)
    console.log('anecdoteById/t.s.a: ',this.state.anecdotes)
    return this.state.anecdotes.find(a => a.id === id)}

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }
  render() {

    const footerStyle = {
      color: 'green',
      fontStyle: 'italic',
      fontSize: 16
    }

    const naviStyle = {
      color: 'green',
      fontStyle: 'italic',
      fontSize: 16
    }

    return (
      <div>
        <Router>
          <div>
            <h1>Software anecdotes</h1>
            <Navigation/>
            {this.state.isShow ? <Notification not={this.state.notice} clearNotice={this.clearNotice}/> : null}
            <Route exact path="/" render={() => <AnecdoteList anecdotes={this.state.anecdotes} /> } />
            <Route path="/anecdote/:id" render={({match}) => 
              <Anecdote anecdote={this.anecdoteById(match.params.id)} />} />
            <Route exact path="/anecdotes" render={() => 
              <Anecdotes anecdotes={this.state.anecdotes} />}/>
            <Route path="/createNew" render={({history}) => <CreateNew history={history} addNew={this.addNew} > </CreateNew> } />
            <Route path="/about" render={() => <About/>} />
            <div style={footerStyle}><Footer /></div>
          </div>
        </Router>                                                          
      </div>
    )
  }
}

export default App;


//<Route path="/createNew" render={({history}) => <CreateNew history={history} addNew={this.addNew} notice={<Notification notice={this.state.notice}/>}/> } />
            