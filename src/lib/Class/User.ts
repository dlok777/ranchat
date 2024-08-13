import executeQuery from '../dbconfig';

// TypeScript에서 사용할 인터페이스 정의
interface UserParams {
  [key: string]: any;
  idx?: number;
  mode?: string;
}

class User {
  static async getUser(idx: number): Promise<any | null> {
    const sql = `SELECT u.* FROM ${process.env.DB_PREFIX}users u WHERE u.idx = ?`;
    try {
      const result = await executeQuery(sql, [idx]);
      return result[0] || null;
    } catch (err) {
      console.error('Error in getUser:', err);
      throw err;
    }
  }

  static async getUsers(
    wheres: string[] = [],
    orderby: string[] = [],
    limit: string[] = []
  ): Promise<any[]> {
    let sql = `SELECT u.* FROM ${process.env.DB_PREFIX}users u`;
    
    if (wheres.length > 0) {
      sql += ` WHERE ${wheres.join(' AND ')}`;
    }
    
    if (orderby.length > 0) {
      sql += ` ORDER BY ${orderby.join(', ')}`;
    }
    
    if (limit.length > 0) {
      sql += ` LIMIT ${limit.join(', ')}`;
    }

    try {
      const result = await executeQuery(sql, []);
      return result;
    } catch (err) {
      console.error('Error in getUsers:', err);
      throw err;
    }
  }

  static async setUser(params: UserParams = {}): Promise<number | false> {
    const fields: string[] = [];
    const values: any[] = [];

    for (const [key, val] of Object.entries(params)) {
      if (key === 'mode') continue;

      if (val === 'NOW()') {
        fields.push(`${key} = NOW()`);
      } else if (Array.isArray(val)) {
        fields.push(`${key} = ?`);
        values.push(JSON.stringify(val));
      } else {
        fields.push(`${key} = ?`);
        values.push(val);
      }
    }

    let count = 0;
    if (params.idx) {
      const sql = `
        SELECT COUNT(u.idx) as count 
        FROM ${process.env.DB_PREFIX}users u
        WHERE u.idx = ?
      `;
      const result = await executeQuery(sql, [params.idx]);
      count = result[0]?.count || 0;
    }

    let sql = '';
    let mode = '';

    if (count === 0) {
      sql = `INSERT INTO ${process.env.DB_PREFIX}users SET ${fields.join(', ')}`;
      mode = 'insert';
    } else {
      sql = `UPDATE ${process.env.DB_PREFIX}users SET ${fields.join(', ')} WHERE idx = ?`;
      values.push(params.idx); // WHERE 절에 사용하는 idx 추가
      mode = 'update';
    }

    try {
      const queryResult = await executeQuery(sql, values);
      if (queryResult) {
        if (mode === 'insert') {
          return queryResult.insertId;
        } else {
          return params.idx as number;
        }
      } else {
        return false;
      }
    } catch (err) {
      console.error('Error in setUser:', err);
      throw err;
    }
  }
}

export default User;
