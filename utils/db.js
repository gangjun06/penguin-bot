const moment = require('moment')

module.exports = {
  async get_profile(db, userid) {
    return await db.get(`SELECT * FROM profile WHERE id =${userid}`);
  },
  async create_empty_profile(db, userid) {
    try {
      await db.run(`INSERT INTO profile (id, money, lasttime, liking) VALUES (${userid}, 0, ${new moment().subtract(30, "minutes").unix()})`);
    } catch (e) {
      console.log("error while processing db");
    }
  },
};
