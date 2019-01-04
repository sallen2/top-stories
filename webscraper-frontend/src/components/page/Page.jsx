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
  }
}
`
const loadData = gql`
mutation{
  loadData{
    message
  }
}
`

class Page extends Component {
  
  cardRender = ()=>{
    if(this.props.dataQuery.loading){
      return(
      <div>
        <h1>loading</h1>
      </div>)
    }else{
      return this.props.dataQuery.AllSportsNews.map((news, i)=>{
        return <Card key={news._id} {...news} num={i+1}/>
      })
    }
  }

  render() { 
    console.log(this.props.dataQuery)
    return (
      <div>
        <img className='fitImg' src="http://khelfeed.com/wp-content/uploads/2017/10/sport-header.jpg" alt="Sports" />
        {this.cardRender()}
      </div>
    )
  }

}

export default compose(
  graphql(getDataQuery, { name: 'dataQuery' }),
  graphql(loadData, { name: 'loadData' })
)(Page)