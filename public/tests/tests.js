import {Data} from 'data';
import {Requester} from 'requester'
mocha.setup('bdd');
const expect = chai.expect;

describe('Unit Tests', function () {

    describe('Data tests', function () {
        const result = {};

        const user = {
            username: 'gosho',
            password: '123456',
            email: 'email@abv.bg',
            favs: []
        }

        describe('Data.register() tests', function () {

            beforeEach(function () {
                sinon.stub(Requester, 'post', (url, data) => {
                    return (new Promise((resolve, reject) => {
                        resolve(result);
                    }))
                })

            })


            afterEach(function () {
                Requester.post.restore();
            });

            it('Expect Data.register() to make exactly one post call', function (done) {
                Data.register(user)
                    .then(() => {
                        expect(Requester.post.calledOnce).to.be.true;
                    })
                    .then(done, done)
            });

            
            it('Expect Data.register() to call post with two parameters', function (done) {
                 Data.register(user)
                 .then(()=> {
                     expect(Requester.post.firstCall.args.length).to.equal(2);
                 })
                 .then(done,done)
            })

            
            it('Expect Data.register() to call post with valid url', function (done) {
                Data.register(user)
                .then(()=>{
                    expect(Requester.post.firstCall.args[0]).to.equal(`https://baas.kinvey.com/user/kid_Byf3Gafa/`)
                })
                .then(done,done)
            });

             it('Expect Data.register() to call post with valid data', function (done) {
                Data.register(user)
                .then(()=>{
                    var actual = Object.keys( Requester.post.firstCall.args[1]);
                    var expected = ['headers', 'data'];
                    expect(actual).to.eql(expected)
                })
                .then(done,done)
            });

            it('Expect Data.register() to return object', function (done) {
                Data.register(user)
                .then((res)=>{
                   
                    expect(res).to.be.a('object')
                })
                .then(done,done)
            });
            
        });

        describe('Data.login() tests', function () {

            beforeEach(function () {
                sinon.stub(Requester, 'post', (url, data) => {
                    return (new Promise((resolve, reject) => {
                        resolve(result);
                    }))
                })

            })


            afterEach(function () {
                Requester.post.restore();
            });

            it('Expect Data.login() to make exactly one post call', function (done) {
                Data.login(user)
                    .then(() => {
                        expect(Requester.post.calledOnce).to.be.true;
                    })
                    .then(done, done)
            });

            
            it('Expect Data.login() to call post with two parameters', function (done) {
                 Data.login(user)
                 .then(()=> {
                     expect(Requester.post.firstCall.args.length).to.equal(2);
                 })
                 .then(done,done)
            })

            
            it('Expect Data.login() to call post with valid url', function (done) {
                Data.login(user)
                .then(()=>{
                    expect(Requester.post.firstCall.args[0]).to.equal(`https://baas.kinvey.com/user/kid_Byf3Gafa/login`)
                })
                .then(done,done)
            });

             it('Expect Data.login() to call post with valid data', function (done) {
                Data.login(user)
                .then(()=>{
                    var actual = Object.keys( Requester.post.firstCall.args[1]);
                    var expected = ['headers', 'data'];
                    expect(actual).to.eql(expected)
                })
                .then(done,done)
            });

            
             it('Expect Data.login() to return object', function (done) {
                Data.login(user)
                .then((res)=>{
                   
                    expect(res).to.be.a('object')
                })
                .then(done,done)
            });
            
        })

        describe('Data.getNews() tests', function () {  

            beforeEach(function () {
                sinon.stub(Requester, 'get', (url) => {
                    return (new Promise((resolve, reject) => {
                        resolve(result);
                    }))
                })

            })


            afterEach(function () {
                Requester.get.restore();
            });

            it('Expect Data.getNews() to make exactly one get call', function (done) {
                Data.getNews()
                    .then(() => {
                        expect(Requester.get.calledOnce).to.be.true;
                    })
                    .then(done, done)
            });

            
            it('Expect Data.getNews() to call get with one parameter', function (done) {
                 Data.getNews()
                 .then(()=> {
                     expect(Requester.get.firstCall.args.length).to.equal(1);
                 })
                 .then(done,done)
            })

            
            it('Expect Data.getNews() to call get with valid url', function (done) {
                Data.getNews(user)
                .then(()=>{
                    expect(Requester.get.firstCall.args[0]).to.equal(`http://content.guardianapis.com/search?show-elements=all&page-size=10&q=music&api-key=e1abba4c-6002-4f52-8511-2e2a5c3167ac`)
                })
                .then(done,done)
            });            

            
             it('Expect Data.getNews() to return object', function (done) {
                Data.getNews()
                .then((res)=>{
                   
                    expect(res).to.be.a('object')
                })
                .then(done,done)
            });
            
        });
        
        describe('Data.getCurrentUser tests', function () {

            
            beforeEach(function () {
                sinon.stub(localStorage, 'getItem', (item) => {
                    return 'username'                     
                })
            });
            
            
            afterEach(function () {
                localStorage.getItem.restore();
            });
            

            it('Expect Data.getCurrentUser() to call localstorage.getItem once', function () {
                Data.getCurrentUser();
                expect(localStorage.getItem.calledOnce).to.be.true;
            });

             it('Expect Data.getCurrentUser() to return true-like value when there is logged user', function () {
              expect(!!Data.getCurrentUser()).to.be.true             
            });
            
            
        });

        describe('Data.getUserData() tests', function () {  

            beforeEach(function () {
                sinon.stub(Requester, 'get', (url, options) => {
                    return (new Promise((resolve, reject) => {
                        resolve(result);
                    }))
                })
                 sinon.stub(localStorage, 'getItem', (item) => {
                    return 'username'                     
                })
            })


            afterEach(function () {
                Requester.get.restore();
                localStorage.getItem.restore();
            });

            it('Expect Data.getUserData() to make exactly one get call', function (done) {
                Data.getUserData()
                    .then(() => {
                        expect(Requester.get.calledOnce).to.be.true;
                    })
                    .then(done, done)
            });

            
            it('Expect Data.getUserData() to call get with two parameter', function (done) {
                 Data.getUserData()
                 .then(()=> {
                     expect(Requester.get.firstCall.args.length).to.equal(2);
                 })
                 .then(done,done)
            })

            
            it('Expect Data.getUserData() to call get with valid url', function (done) {
                Data.getUserData()
                .then(()=>{
                    expect(Requester.get.firstCall.args[0]).to.equal(`https://baas.kinvey.com/user/kid_Byf3Gafa/username`)
                })
                .then(done,done)
            });            

            
             it('Expect Data.getUserData() to return object', function (done) {
                Data.getUserData()
                .then((res)=>{
                   
                    expect(res).to.be.a('object')
                })
                .then(done,done)
            });

            
            it('Expect Data.getUserData() to call localstorage.getItem once', function (done) {
                 Data.getUserData()
                    .then(() => {
                        expect(localStorage.getItem.calledOnce).to.be.true;
                    })
                    .then(done, done)
            });

             it('Expect Data.getUserData() to call post with valid data', function (done) {
                Data.getUserData(user)
                .then(()=>{
                    var actual = Object.keys( Requester.get.firstCall.args[1]);
                    var expected = ['headers'];
                    expect(actual).to.eql(expected)
                })
                .then(done,done)
            });
            
            
        });

        describe('Data.addFavorites() tests', function () {  

            beforeEach(function () {
                sinon.stub(Requester, 'put', (url, options) => {
                    return (new Promise((resolve, reject) => {
                        resolve(result);
                    }))
                })
                 sinon.stub(localStorage, 'getItem', (item) => {
                    return 'username'                     
                })
            })


            afterEach(function () {
                Requester.put.restore();
                localStorage.getItem.restore();
            });

            it('Expect Data.addFavorites() to make exactly one put call', function (done) {
                Data.addFavorites()
                    .then(() => {
                        expect(Requester.put.calledOnce).to.be.true;
                    })
                    .then(done, done)
            });

            
            it('Expect Data.addFavorites() to call put with two parameter', function (done) {
                 Data.addFavorites()
                 .then(()=> {
                     expect(Requester.put.firstCall.args.length).to.equal(2);
                 })
                 .then(done,done)
            })

            
            it('Expect Data.addFavorites() to call put with valid url', function (done) {
                Data.addFavorites()
                .then(()=>{
                    expect(Requester.put.firstCall.args[0]).to.equal(`https://baas.kinvey.com/user/kid_Byf3Gafa/username`)
                })
                .then(done,done)
            });            

            
             it('Expect Data.addFavorites() to return object', function (done) {
                Data.addFavorites()
                .then((res)=>{
                   
                    expect(res).to.be.a('object')
                })
                .then(done,done)
            });

            
            it('Expect Data.addFavorites() to call localstorage.getItem once', function (done) {
                 Data.addFavorites()
                    .then(() => {
                        expect(localStorage.getItem.calledOnce).to.be.true;
                    })
                    .then(done, done)
            });

             it('Expect Data.addFavorites() to call put with valid data', function (done) {
                Data.addFavorites(user)
                .then(()=>{
                    var actual = Object.keys( Requester.put.firstCall.args[1]);
                    var expected = ['headers', 'data'];
                    expect(actual).to.eql(expected)
                })
                .then(done,done)
            });
            
            
        });
             
        
    })
});

mocha.run();