import React, { Component } from 'react'
import Comment from '../comments/Comment'


class Card extends Component {

  state = {
    showComment: false
  }
  getData = () => {
    this.props.loadData()
    this.forceUpdate()
  }

  showComment = (e) => {
    console.log(e)
    this.setState({ showComment: !this.state.showComment })
  }

  render() {
    return (
      <div className="row">
        <div className="col s6 m12">
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <span className="card-title">Sports Story {this.props.num}</span>
              <p>{this.props.title}</p>
            </div>
            <div className="card-action">
              <a href={`https://www.usatoday.com${this.props.link}`}>More Info</a>
              <span num={this.props.num} onClick={this.showComment} className="waves-effect waves-light btn">Comment</span>
              {this.state.showComment ? <Comment /> : null}
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default Card
