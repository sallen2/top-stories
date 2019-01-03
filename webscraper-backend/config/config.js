const mongojs = require('mongojs');
const db = mongojs('mongodb://sallen20:a12345@ds119323.mlab.com:19323/webscraper', ['webData','comments']);


const webScraperORMLite = {
  create: (obj) => {
    return new Promise((resolve, reject) => {
      if (typeof obj === "object") {
        db.webData.save(obj, () => {
          resolve('saved!')
        });
      } else {
        reject('Sorry, you must pass in a object!')
      }
    })
  },
  createComment: function (obj, webDataId) {
    return new Promise((reject, resolve) => {
      if (typeof obj === 'object') {
        db.comments.insert(obj, (err,data) => {
          this.findOneAndUpdate(webDataId, data)
          .then(res=>{
            resolve(res)
          })
          .catch(err=>{
            reject(err)
          })
        });
      } else {
        reject('Sorry, something went wrong!')
      }
    })
  },
  findOne: (id)=>{
    return new Promise((resolve,reject)=>{
      db.webData.findOne({_id: mongojs.ObjectID(id)},(err,data)=>{
        if(err) reject(err)
        resolve(data)
      })
    })
  },
  findAll: () => {
    return new Promise((resolve, reject) => {
      db.webData.find((err, docs) => {
        if (err) reject(err)
        resolve(docs)
      })
    })
  },
  findComment: (commentId)=>{
    return new Promise((resolve,reject)=>{
      db.comments.findOne({_id: mongojs.ObjectID(commentId)},(err,data)=>{
        if(err) reject(err)
        resolve(data)
      })
    })
  },
  findOneAndUpdate: (id, comment) => {
    console.log(id)
    console.log(comment)
    return new Promise((reject, resolve) => {
      db.webData.findAndModify({
        query: { _id: mongojs.ObjectID(id)},
        update: { $push: { commentIds: comment._id } },
        new: true
    }, function (err, data, lastErrorObject) {
        if(err) reject(err)
        resolve(`db entry ${data} has been updated`)
    })
    })
  },
  removeAll: () => {
    return new Promise((resolve, reject) => {
      db.webData.remove(() => {
        console.log('removed! webData')
      })
      db.comments.remove(()=>{
        console.log('removed! comments')
      })
    })
  }
}


module.exports = webScraperORMLite