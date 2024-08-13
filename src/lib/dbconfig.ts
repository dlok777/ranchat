import { createPool, Pool, PoolConnection } from 'mysql2';

// Define types for the environment variables
interface DbConfig {
  DB_HOST: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_DATABASE: string;
  DB_PORT: number;
}

// Ensure environment variables are defined
const env = process.env as unknown as DbConfig;

if (!env.DB_HOST || !env.DB_USER || !env.DB_PASSWORD || !env.DB_DATABASE || !env.DB_PORT) {
  throw new Error('Missing database configuration environment variables.');
}

// Create a connection pool
const pool: Pool = createPool({
  host: env.DB_HOST,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_DATABASE,
  port: Number(env.DB_PORT),
});

// Check the connection status
pool.getConnection((err: Error | null, conn: PoolConnection | null) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the database.');
    conn?.release();
  }
});

// Define the function to execute queries
const executeQuery = async (query: string, arrParams: any[] = []): Promise<any> => {
  try {
    const [rows] = await pool.promise().query(query, arrParams);
    return rows;
  } catch (err) {
    console.error('Error executing the query:', err);
    throw err;
  }
};

export default executeQuery;
