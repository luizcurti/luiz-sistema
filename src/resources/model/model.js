const { DBClient } = require('../../config/mysqlClient');
// const Redis = require('../config/redis');

module.exports.saveModel = async (name, model) => {
  const conn = await DBClient.getConnection();
  try {
    if (!name || !model) {
      return {
        statusCode: 500,
        txtResponse: 'Something went wrong!',
      };
    }
    const sql = conn.format(
      `INSERT INTO car_model (name, model)
      VALUES (?, ?)`,
      [name, model],
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

module.exports.editModel = async (name, model, id) => {
  const conn = await DBClient.getConnection();
  try {
    if (!name || !model || !id) {
      return {
        statusCode: 500,
        txtResponse: 'Something went wrong!',
      };
    }
    const sql = conn.format(
      'UPDATE car_model SET name = ?, model = ? WHERE id = ?',
      [name, model, id],
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

module.exports.listModel = async (id) => {
  const conn = await DBClient.getConnection();
  try {
    if (id) {
      // Redis.get(id);
    }

    let sql = 'SELECT id, name, model FROM car_model';

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

module.exports.deleteModel = async (id) => {
  const conn = await DBClient.getConnection();
  try {
    if (!id) {
      return {
        statusCode: 500,
        txtResponse: 'Something went wrong!',
      };
    }
    const sql = conn.format(
      'DELETE FROM car_model WHERE id = ?',
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
