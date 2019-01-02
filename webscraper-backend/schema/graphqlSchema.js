const request = require('request');
const cheerio = require('cheerio');
const db = require('../config/config')


request('https://www.usatoday.com/sports/', (err, res, html) => {
  db.removeAll()
  if (err) throw new Error('Something went wrong')
  const $ = cheerio.load(html)
  $('ul.contents li').each(function (i, el) {
    const title = $(el).text()
    const link = $(el).children().attr("href");
    const obj = {
      title,
      link,
      commentId: []
    }
    db.create(obj).then(res => { console.log(res) })
  })
})

const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  GraphQLID
} = require('graphql');

const SportsNewsType = new GraphQLObjectType({
  name: 'SportsNews',
  fields: () => ({
    _id: {
      type: GraphQLID,
      description: 'id of news data'
    },
    title: {
      type: GraphQLString,
      description: 'News article Headline'
    },
    link: {
      type: GraphQLString,
      description: 'href to the article'
    },
    comments: {
      type: new GraphQLList(SportsNewsCommentsType),
      description: 'User comments',
      resolve(parent, args){
        const arr = []
        parent.commentId.forEach(comment=>{
          // db.findComment function
          const obj = {
            // data here
          }
          arr.push(obj)
        })
        // TODO: return arr 
        return "comments here"
      }
    }
  })
})

const SportsNewsCommentsType = new GraphQLObjectType({
  name: 'SportsNewsComments',
  fields: () => ({
    _id: {
      type: GraphQLID,
      description: 'id of news data'
    },
    comment: {
      type: GraphQLString,
      description: 'News article Headline'
    }
  })
})


const rootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    AllSportsNews: {
      type: new GraphQLList(SportsNewsType),
      resolve() {
        return db.findAll()
          .then(res => {
            const arr = []
            res.forEach(el => {
              const obj = {
                _id: String(el._id),
                title: el.title,
                link: el.link
              }
              arr.push(obj)
            })
            return (arr)
          })
          .catch(err => {
            return (err)
          })
      }
    },
    OneSportsNews:{
      type: SportsNewsType,
      args: {id: {type: GraphQLID}},
      resolve(parent,args){
        return(
          db.findOne(args.id)
          .then(res=>{
            const obj = {
              title: res.title,
              link: res.link
            }
            return obj
          })
          .catch(err=>{
            return err
          })
          )
      }
    }
  }
})


module.exports = new GraphQLSchema({
  query: rootQuery
})