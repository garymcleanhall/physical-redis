'use strict';

const physical = {
  redis: require('../index')
}

function testAsync(runAsync) {
  return done => {
    runAsync()
      .then(done, error => {
        fail(error)
        done()
      })
  }
}

describe('Physical Redis', () => {

  it('is not ok when cannot connect to redis', testAsync(async () => {
    let config = { options: { host: "unknown" } }
    let redisResult = await physical.redis.check(config)
    expect(redisResult.isOk).toBe(false)
  }))

  it('includes error message when cannot connect to redis', testAsync(async () => {
    let config = { options: { host: "unknown" } }
    let redisResult = await physical.redis.check(config)
    expect(redisResult.error).toBeDefined()
  }))

  it('is ok when can connect to mongo db', testAsync(async () => {
    let config = { options: { host: "localhost" } }
    let redisResult = await physical.redis.check(config)
    expect(redisResult.isOk).toBe(true)
  }))

})