import React, { Component } from 'react'
import { gql } from 'apollo-boost'
import { graphql, compose } from 'react-apollo'


const comment = gql`
mutation($comment:String,$id:String){
  addComment(comment:$comment,id:$id){
   comment
  }
}
`

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

class Comment extends Component {
  state = {
    comment: [],
    showComment: false
  }

  textValue = (e) => {
    this.setState({ comment: e.target.value })
  }

  submitQuery = (e) => {
    e.preventDefault()
    this.props.addComment({
      variables: {
        comment: this.state.comment,
        id: this.props.id
      },
      refetchQueries: [{query: getDataQuery}]
    })
  }
  render() {
    return (
      <div id={this.props.id} className="row">
        <form className="col s12">
          <div className="row">
            <div className="input-field col s12">
              <textarea onChange={this.textValue} id="textarea1" className="materialize-textarea"></textarea>
              <label>Comment Here</label>
            </div>
          </div>
          <div>
            <p>Comments: </p>
            {this.props.comments.map((comment,i)=>{
              return <p key={i}>{comment.comment}</p>
            })}
          </div>
          <button onClick={this.submitQuery} className="waves-effect waves-light btn blue-grey darken-3">Submit</button>
        </form>
      </div>
    )
  }
}

export default compose(
  graphql(comment, { name: 'addComment' })
)(Comment)