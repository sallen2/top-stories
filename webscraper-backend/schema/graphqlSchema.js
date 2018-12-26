const axios = require('axios');
const cheerio = require('cheerio');
const db = require('../config/config')

axios.get('https://www.cnn.com/')
	.then(res=>{
		const data = res.data
		console.log(data)
		// data.forEach(e=>{
		// 	db.create(e)
		// })
const $ = cheerio.load(data);
	})
	.catch(err=>{
		console.log(err)
	})

const { graphql,
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString } = require('graphql');

const schema = new GraphQLSchema({
	query: new GraphQLObjectType({
		name: 'RootQueryType',
		fields: {
			hello:{
				type: GraphQLString,
				resolve(){
					return 'Hi there!'
				}
			}
		}
	})
})

module.exports = schema