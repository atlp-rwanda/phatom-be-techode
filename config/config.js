require('dotenv').config()
module.exports = {
  development: {
    url: process.env.DEV_DATABASE_URL,
    dialect: 'postgres',
  },
  test: {
    url: process.env.TEST_DATABASE_URL,
    dialect: 'postgres',
  },
  production: {
    url: process.env.DATABASE_PRODUCTION,
    dialect: 'postgres',
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> ch(Postgres) postgres setup
    logging:false,
    ssl: false,
    dialectOptions: {
      ssl: { rejectUnauthorized: false },
    }
<<<<<<< HEAD
  },
}
=======
  },
}

>>>>>>> ch(Postgres) postgres setup
=======
  },
}
>>>>>>> ch(Postgres) postgres setup
