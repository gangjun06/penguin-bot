module.exports = {
  updateMoney(db, userid, money) {
    db.get(`SELECT * FROM profile WHERE id=${userid}`, (err, row) => {
      if (err) return;
      if (row === undefined) {
        client.db.run(
          `INSERT INTO profile (id, score, lasttime, liking) VALUES (${
            message.author.id
          }, 0, ${new moment().subtract(30, "minutes").unix()}, 0)`
        );
        row = { score: 0 };
      }

      let setmoney;
      setmoney = row.score + money;
      if (setmoney < 0) setmoney = 0;
      db.run(`UPDATE profile SET score=${setmoney} WHERE id=${userid}`);
    });
  },
};
