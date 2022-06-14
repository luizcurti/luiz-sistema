const redis = require('redis');

try {
  const client = redis.createClient({
    url: 'redis://redis_server:6379',
  });
  client.connect();
} catch (error) {
  throw 'Falha ao iniciar cache';
}
