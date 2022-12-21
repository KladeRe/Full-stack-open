const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const name = process.argv[3]

const number = process.argv[4]
const url = `mongodb+srv://notes-app-full:${password}@cluster1.lvvbt.mongodb.net/?retryWrites=true&w=majority`

const phoneSchema = new mongoose.Schema({
  username: String,
  phonenumber: String,
})

const Phone = mongoose.model('Phone', phoneSchema)


mongoose
  .connect(url)
  .then((result) => {
    console.log('connected')

    const phone = new Phone({
      name: name,
      number: number,
    })

    if (name != undefined && number != undefined) {
        phone.save().then(result => {
            console.log(`Added ${name} number ${number} to phonebook`)
            

        })
    } else {
        console.log("Phonebook")
        Phone.find({}).then(result => {
            result.forEach(phone => {
                console.log(`${phone.name} ${phone.number}`)
            })
        })
    }

    return mongoose.connection.close()
  })