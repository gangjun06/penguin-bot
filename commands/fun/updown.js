const { getStr: _ } = require("../../utils/lang");

module.exports = {
  name: ["updown", "업다운"],
  category: "fun",
  description: ["updown game!", "업다운 게임!"],
  run: async (client, message, args, l) => {
      message.channel.send("This command is not completed")
  },
};
