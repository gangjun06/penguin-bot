const { getStr: _ } = require("../../utils/lang");
const db = require("../../utils/db");

module.exports = {
  name: ["profile", "프로필"],
  category: "info",
  description: ["User's money", "유저의 돈을 보여줍니다"],
  run: async (client, message, args, l) => {
    const result = await db.get_profile(client.db, message.author.id);
    if (result === null) {
      
    }
  },
};
