const request = require('request');
const cheerio = require('cheerio');
const db = require('../config/config')


const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  GraphQLID
} = require('graphql');

const dataLoaded = new GraphQLObjectType({
  name: 'DataLoaded',
  fields: () => ({
    message: {
      type: GraphQLString,
      description: 'Message that indicates the Sports News articles have been loaded'
    }
  })
})

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
      resolve(parent, args) {
        const arr = []
        console.log(parent)
        return parent.commentIds.map(comment => {
          return db.findComment(comment)
            .then(res => {
              console.log(res)
              return ({ comment: res.comment })
            })
            .catch(err => {
              return err
            })
        })
      }
    }
  })
})

const SportsNewsCommentsType = new GraphQLObjectType({
  name: 'SportsNewsComments',
  fields: () => ({
    comment: {
      type: GraphQLString,
      description: 'user comments'
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
                link: el.link,
                commentIds: el.commentIds
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
    OneSportsNews: {
      type: SportsNewsType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return (
          db.findOne(args.id)
            .then(res => {
              const obj = {
                title: res.title,
                link: res.link
              }
              return obj
            })
            .catch(err => {
              return err
            })
        )
      }
    }
  }
})

const Mutations = new GraphQLObjectType({
  name: 'Mutations',
  fields: {
    addComment: {
      type: SportsNewsCommentsType,
      args: {
        comment: { type: GraphQLString },
        id: { type: GraphQLString }
      },
      resolve(parent, args) {
        return db.createComment({
          comment: args.comment
        }, args.id)
          .then(res => {
            console.log(res.title)
            return ({ comment: args.comment })
          })
          .catch(err => {
            return (err)
          })
      }
    },
    loadData: {
      type: dataLoaded,
      resolve() {
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
              commentIds: []
            }
            db.create(obj).then(res => { console.log(res) })
          })
        })
        return ({ message: 'News articles have been loaded!' })
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: rootQuery,
  mutation: Mutations
})