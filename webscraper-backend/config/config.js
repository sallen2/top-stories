const mongojs = require('mongojs');
const db = mongojs('mongodb://sallen20:a12345@ds119323.mlab.com:19323/webscraper', ['webData']);


const webScraperORMLite = {
  create: (obj) => {
    return new Promise((resolve, reject) => {
      if (typeof obj === "object") {
        db.webData.save(obj, () => {
          resolve('saved!')
        });
      } else {
        reject('Sorry you must pass in a object!')
      }
    })
  },
  createComment: function () {
    return new Promise((reject, resolve) => {
      if (typeof obj === 'object') {
        db.comment.save(obj, () => {
          this.update(
            /*
            TODO: Add update function to the method
            */
          )
          resolve('saved')
        });
      } else {
        reject('Sorry something went wrong!')
      }
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
  update: () => {
    return new Promise((reject, resolve) => {
      /*
        TODO: Write update functionally
      */
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