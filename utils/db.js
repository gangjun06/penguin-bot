const moment = require("moment");

module.exports = {
  updateMoney(db, userid, money) {
    db.query(`SELECT * FROM profile WHERE id=${userid}`, (err, row) => {
      if (err) return;
      row = row[0];
      if (row === undefined) {
        db.query(
          `INSERT INTO profile (id, money, lasttime, liking) VALUES (${userid}, 0, ${new moment()
            .subtract(10, "minutes")
            .unix()}, 0)`
        );
        row = { money: 0 };
      }
      let setmoney;
      setmoney = row.money + money;
      if (setmoney < 0) setmoney = 0;
      db.query(`UPDATE profile SET money=${setmoney} WHERE id=${userid}`);
    });
  },
};
