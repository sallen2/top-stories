import React, { Component } from 'react'
import './Page.css'
import { gql } from 'apollo-boost'
import { graphql, compose } from 'react-apollo'
import Card from '../card/Card'

const getDataQuery = gql`
{
  AllSportsNews{
    _id
    title
    link
    comments{
      comment
    }
  }
}
`
const loadData = gql`
mutation{
  loadData{
    _id
    title
    link
  }
}
`

class Page extends Component {

  state = {
    showButton: true,
  }

  cardRender = () => {
    if (this.props.dataQuery.loading) {
      return (
        <div>
          <h1>Loading</h1>
        </div>
      )
    } else {
      return (
        this.props.dataQuery.AllSportsNews.map((news,i)=>{
          return <Card cardRender={this.cardRender} key={news._id} num={i + 1} {...news} />
        })
      )
    }
  }

  showNewsHandler = ()=>{
    this.setState({showButton: false})
  }

  render() {
    return (
      <div className='.container'>
        <img className='fitImg' src="http://khelfeed.com/wp-content/uploads/2017/10/sport-header.jpg" alt="Sports" />
        <div className="centered"><h2>Welcome to Top Sports News!</h2></div>
        {this.state.showButton ? <button className="waves-effect waves-light btn blue-grey darken-3 pulse centeredBtn" onClick={this.showNewsHandler}>Find News  <i className="fas fa-newspaper"></i></button> : this.cardRender()}
      </div>
    )
  }

}

export default compose(
  graphql(getDataQuery, { name: 'dataQuery' }),
  graphql(loadData, { name: 'loadData' })
)(Page)