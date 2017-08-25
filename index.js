'use strict';

const Redis = require('ioredis')

function _checkRedis(config) {
  return new Promise((resolve, reject) => {

    let redis = null
    if (config.nodes) {
      redis = new Redis.Cluster(config.nodes, config.options)
    } else {
      redis = new Redis(config.options)
    }

    redis.on('connect', () => {
      resolve({ isOk: true });
    })

    redis.on('error', error => {
      reject({ error })
    })

  }).catch(error => ({ isOk: false, error}))
}

module.exports = {
  check: _checkRedis
}
