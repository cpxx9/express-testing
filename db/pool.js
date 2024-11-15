const { Pool } = require('pg');

module.exports = new Pool({
  connectionString: 'postgresql://coles:Panthers95.@localhost:5432/top_users',
});
