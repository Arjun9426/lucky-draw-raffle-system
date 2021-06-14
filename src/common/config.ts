const CONFIG = {
  db: {
    connectTimeout: parseInt(process.env.DB_CONNECT_TIMEOUT || '5000'),
    connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT || '20'),
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    user: process.env.DB_USERNAME,
    multipleStatements:
      (process.env.DB_MULTIPLE_STATEMENTS &&
        process.env.DB_MULTIPLE_STATEMENTS === 'true' &&
        true) ||
      false,
  },
};

class Config {
  static getDBConfig(): any {
    const abc: any = CONFIG.db;
    console.log(abc);
    return abc;
  }
}

export default Config;
