const mongojs = require('mongojs');
const db = mongojs('mongodb://sallen20:a12345@ds119323.mlab.com:19323/webscraper', ['webData','comment']);


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
        db.comment.save(obj, () => {
          this.findOneAndUpdate(webDataId, obj)
          .then(res=>{
            resolve(res)
          })
        });
      } else {
        reject('Sorry, something went wrong!')
      }
    })
  },
  findOne: (id)=>{
    return new Promise((reject,resolve)=>{
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
  findOneAndUpdate: (id, comment) => {
    return new Promise((reject, resolve) => {
      db.webData.findAndModify({
        query: { _id: id },
        update: { $set: { comment: comment._id } },
        new: true
    }, function (err, data, lastErrorObject) {
        if(err) reject(err)
        resolve(`db entry:${data.title} has been updated`)
    })
    })
  },
  removeAll: () => {
    return new Promise((resolve, reject) => {
      db.webData.remove(() => {
        console.log('removed!')
      })
    })
  }
}


module.exports = webScraperORMLite