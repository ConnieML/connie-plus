module.exports = {
  apps: [{
    name: 'v2.connie.plus',
    script: 'npm',
    args: 'start',
    cwd: '/home/ubuntu/v2.connie.plus', // Adjust path as needed
    env_file: './.env.production',
    instances: 1,
    exec_mode: 'fork',
    watch: false,
    autorestart: true,
    max_memory_restart: '1G',
    error_file: '/home/ubuntu/logs/v2-error.log',
    out_file: '/home/ubuntu/logs/v2-out.log',
    log_file: '/home/ubuntu/logs/v2-combined.log',
    time: true,
    env: {
      NODE_ENV: 'production',
      PORT: 3001 // Different port from v1
    }
  }]
};