const moment = require('moment')

module.exports = {
  updateMoney(db, userid, money) {
    db.query(`SELECT * FROM profile WHERE id=${userid}`, (err, row) => {
      if (err) return
      row = row[0]
      if (row === undefined) {
        this.createProfile(db, userid)
        row = { money: 0 }
      }
      let setmoney
      setmoney = row.money + money
      if (setmoney < 0) setmoney = 0
      db.query(
        `UPDATE profile SET money=${setmoney}, lasttime=${moment().unix()} WHERE id=${userid}`
      )
    })
  },
  createProfile(db, userid) {
    db.query(
      `INSERT INTO profile (id, money, lasttime, liking) VALUES (${userid}, 0, ${moment()
        .subtract(10, 'minutes')
        .unix()}, 0)`
    )
  }
}
