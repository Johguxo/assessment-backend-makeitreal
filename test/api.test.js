const request = require('supertest');
const mongoose = require('mongoose')
const app = require('../app')

require('dotenv').config()

var auth = {};

//Connect to MongoDB
main().catch(err => console.log(err));
async function main() {
await mongoose.connect(process.env.MONGO_DB)
    .then(()=> console.log("DB Connection successfully!"))
    .catch((err)=> console.log(err))
}

//Listening
app.listen(process.env.PORT, () => {
    console.log(`Listening in port ${process.env.PORT}!`);
});

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjYzMDJkNGIwZTFkZTlkMjhlOWJiZTMiLCJpYXQiOjE2NTA2NjgzNzUsImV4cCI6MTY1MDY3MTk3NX0.9us5Sp9ELToZqHNs6iyLT7HFPUU9KVuZn97QnMeCA0M'

describe('GET /api/favs',() => {
    it('should require authorization', (done) => {
        request(app)
            .get('/api/favs')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(401)
            .end(function(err, res) {
                if (err) return done(err);
                return done();
            });
    });

    it('responds with 200 and json containing a list of all tasks',(done) => {
        request(app)
            .get('/api/favs')
            .set('Accept', 'application/json')
            .auth(token, {type:'bearer'})
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err,res) => {
                if (err) return done(err);
                return done();
            })
    })
    

    it('responds with 201 and create new list fav',(done) => {
        request(app)
            .post('/api/favs')
            .send({
                name: "New favorites"
            })
            .set('Accept', 'application/json')
            .auth(token, {type:'bearer'})
            .expect('Content-Type', /json/)
            .expect(201)
            .end((err,res) => {
                if (err) return done(err);
                return done();
            })
    })


    it('responds with 200 and json containing a list of all tasks',(done) => {
        request(app)
            .get('/api/favs')
            .set('Accept', 'application/json')
            .auth(token, {type:'bearer'})
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err,res) => {
                if (err) return done(err);
                return done();
            })
    })

    it('responds with 200 and json containing a specific list fav',(done) => {
        request(app)
            .get('/api/favs/626311daa61b613b8d39eab4')
            .set('Accept', 'application/json')
            .auth(token, {type:'bearer'})
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err,res) => {
                if (err) return done(err);
                return done();
            })
    })
    

    it('responds with 200 and add new item in list of specific favs',(done) => {
        request(app)
            .post('/api/favs/626311daa61b613b8d39eab4')
            .send({
                title: "Futbol",
                description: "My favorite sport",
                link: "https://google.com"
            })
            .auth(token, {type:'bearer'})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err,res) => {
                if (err) return done(err);
                return done();
            })
    })
})

describe('POST /auth/local/', () => {
    it('responds with 200 and user logged ', (done) => {
        request(app)
            .post('/auth/local/login')
            .send({
                email: "johann.gonzales99@gmail.com",
                password: "johann123"
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                //console.log(response.body.token)
                done();
            })
            .catch(err => done(err))
    });
});

