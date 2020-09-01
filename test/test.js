const dilbert = require('../build/index');
var assert = require('assert');
describe('Pull Some Comics', function() {
    it('first dilbert right date', function() {
        assert.equal(dilbert.dilbertStart.year(), 1989);
        assert.equal(dilbert.dilbertStart.month(), 3);
        assert.equal(dilbert.dilbertStart.date(), 16);
    });
    it('should not fail', async function() {
        this.timeout(50000);
        assert.ok((await dilbert.getLatest()).url);
    })
    it('should return the correct object', async function() {
        this.timeout(50000);
        const goal = {url: 'https://assets.amuniversal.com/5abe86d0bfb101381a80005056a9545d', title: 'No More Id Badges',date: '2020-08-31' };
        const actual = await dilbert.getByDateString('2020-08-31');
        assert.equal(goal.url, actual.url);
        assert.equal(goal.title, actual.title);
        assert.equal(goal.date, actual.date);
    })
    it('use random (this could fail randomly, very low odds', async function(){
        this.timeout(50000);
        const a = dilbert.getRandom();
        const b = dilbert.getRandom();
        const c = dilbert.getRandom();
        assert.ok(await a);
        assert.notEqual((await b).date, (await c).date);
        const d = dilbert.getRandom();
        const e = dilbert.getRandom();
        assert.notEqual((await d).url, (await e).url);
    });
});
