import {Data} from 'data';
import {Requester} from 'requester'
mocha.setup('bdd');
const expect = chai.expect;

describe('Tests', function () {

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
            
        })
    })
});

mocha.run();