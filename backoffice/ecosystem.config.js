module.exports = {
  apps: [{
    name: 'directus',
    script: 'pnpx',
    args: 'directus start',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production'
    }
  }]
}
