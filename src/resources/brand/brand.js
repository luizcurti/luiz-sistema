const { DBClient } = require('../../config/mysqlClient');
// const Redis = require('../config/redis');

module.exports.saveBrand = async (name, nationality) => {
  const conn = await DBClient.getConnection();
  try {
    if (!name || !nationality) {
      return {
        statusCode: 500,
        txtResponse: 'Something went wrong!',
      };
    }

    const sql = conn.format(
      `INSERT INTO brand (name, nationality)
      VALUES (?, ?)`,
      [name, nationality],
    );

    const result = await conn.query(sql);

    if (result[0].insertId) {
      // Redis.add(id, [name, nationality]);
    }

    return {
      statusCode: 200,
      txtResponse: 'Success',
    };
  } catch (error) {
    return {
      statusCode: 500,
      txtResponse: 'Something went wrong!',
    };
  } finally {
    conn.release();
  }
};

module.exports.editBrand = async (name, nationality, id) => {
  const conn = await DBClient.getConnection();
  try {
    if (!name || !nationality || !id) {
      return {
        statusCode: 500,
        txtResponse: 'Something went wrong!',
      };
    }

    const sql = conn.format(
      'UPDATE brand SET name = ?, nationality = ? WHERE id = ?',
      [name, nationality, id],
    );

    await conn.query(sql);

    return {
      statusCode: 200,
      txtResponse: 'Success',
    };
  } catch (error) {
    return {
      statusCode: 500,
      txtResponse: 'Something went wrong!',
    };
  } finally {
    conn.release();
  }
};

module.exports.listBrand = async (id) => {
  const conn = await DBClient.getConnection();
  try {
    if (id) {
      // Redis.get(id);
    }

    let sql = 'SELECT id, name, nationality FROM brand';

    if (id) { sql += ` WHERE id = ${id}`; }

    conn.format(sql);

    const [response] = await conn.query(sql);

    return {
      statusCode: 200,
      txtResponse: response,
    };
  } catch (error) {
    return {
      statusCode: 500,
      txtResponse: 'Something went wrong!',
    };
  } finally {
    conn.release();
  }
};

module.exports.deleteBrand = async (id) => {
  const conn = await DBClient.getConnection();
  try {
    if (!id) {
      return {
        statusCode: 500,
        txtResponse: 'Something went wrong!',
      };
    }

    const sql = conn.format(
      'DELETE FROM brand WHERE id = ?',
      [id],
    );

    await conn.query(sql);

    // Redis.dell(id);
    return {
      statusCode: 200,
      txtResponse: 'Success',
    };
  } catch (error) {
    return {
      statusCode: 500,
      txtResponse: 'Something went wrong!',
    };
  } finally {
    conn.release();
  }
};
