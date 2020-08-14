import Datastore from "nedb"

const db = new Datastore()

function createDatabase(database) {
  return {
    insert: (ops) =>
      new Promise((resolve, reject) => {
        database.insert(ops, (err, element) => {
          if (err) reject(err)
          resolve(element)
        })
      }),
    find: (ops) =>
      new Promise((resolve, reject) => {
        database.find(ops, (err, elements) => {
          if (err) reject(err)
          resolve(elements)
        })
      }),
    update: (ops, flags, method) =>
      new Promise((resolve, reject) => {
        database.update(ops, flags, method, (err, element) => {
          if (err) reject(err)
          resolve(element)
        })
      }),
    findOne: (ops) =>
      new Promise((resolve, reject) =>
        database.findOne(ops, (err, element) => {
          if (err) reject(err)
          resolve(element)
        })
      ),
    count: (ops) =>
      new Promise((resolve, reject) => {
        database.count(ops, (err, count) => {
          if (err) reject(err)
          resolve(count)
        })
      }),
    remove: (ops, flags) =>
      new Promise((resolve, reject) => {
        database.remove(ops, flags, (err, count) => {
          if (err) reject(err)
          resolve(count)
        })
      }),
  }
}

export default createDatabase(new Datastore())
