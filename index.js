const mongoose = require('mongoose')
const app = require('./app')

require('dotenv').config()

//Connect to MongoDB
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGO_DB)
    .then(()=> console.log("DB Connection successfully!"))
    .catch((err)=> console.log(err))
}

//Listening
app.listen(process.env.PORT, ()=> {
  console.log(`Listening in port ${process.env.PORT}!`);
});
