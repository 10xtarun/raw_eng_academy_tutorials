const mongodb = require("mongodb")
const { MONGO_URI } = require("./config")

let db = {}

mongodb.MongoClient.connect(MONGO_URI, {})
    .then(client => {
        console.log("\n---MongoDB connection established---", client.db("test").databaseName)
        db = client.db("test")

        // for restarting this script drop the database
        db.collection("metahumans").drop()
        return db.collections()
    })
    .then(collections => {
        console.log("\n---existing collections---", collections)
        return db.collection("metahumans").insertOne({ name: "Barry Allen", alter_ego: "The Flash" })
    })
    .then(insertResponse => {
        console.log("\n---insert response---", insertResponse)
        return db.collections()
    })
    .then(collections => {
        console.log("\n---collections after first insert---", collections)
        return db.collection("metahumans").findOne({ name: "Barry Allen" })
    })
    .then(findResponse => {
        console.log("\n---find one response---", findResponse)

        return db.collection("metahumans").insertMany([
            { name: "Bruce Wayne", alter_ego: "Batman", age: 40 },
            { name: "Jack Napier", alter_ego: "Joker", age: 50 }
        ])
    })
    .then(insertManyResponse => {
        console.log("---insert many response---", insertManyResponse)
        return db.collection("metahumans").find({}).toArray()
    })
    .then(findAllResponse => {
        console.log("---find all response---", findAllResponse)
        return db.collection("metahumans").findOneAndUpdate({ name: "Barry Allen" }, { $set: { age: 30} })
    })
    .then(updateResponse => {
        console.log("---find and update response---", updateResponse)
        return db.collection("metahumans").find({ age : { $gt: 35 } }).toArray()
    })
    .then(findResponse => {
        console.log("---find $gt response---", findResponse)
    })
    .catch(error => {
        console.log("\n---MongoDB connection failed---", error)
    })