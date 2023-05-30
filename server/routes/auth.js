const expressRouter = require("express").Router();
const passport      = require("passport");
const axios         = require('axios');

const User   = require("../models/user");

expressRouter.get(
  "/discord/callback",
  passport.authenticate("discord", ["identify", "guilds.members.read"]),
  async (req, res) => {
    console.log("in discord/callback");
    const redirect_url = process.env.REDIRECT_URL;
    const { profile } = req.user;

    console.log("user profile: ", profile);

    const response = await axios.get(
      `https://discord.com/api/users/@me/guilds/435763044120002561/member`,
      { headers: { Authorization: `Bearer ${profile.accessToken}`} }
    );

    console.log("got response from discord: ", response.data);
    // "815893375189516290": "The SOS Brigade"
    // "914295419935289375": "Mudae Contributor"
    // "846432522619715584": "Sibyl Subsystem"
    // "573415404760858624": "Patrol (Help Master)"

    const findUser = await User.findOne({ discordUserId: profile.id });
    if (findUser) {
      const token = await findUser.createJWT();
      return res.redirect(
        `${redirect_url}?token=${token}&username=${findUser.discordUsername}`
      );
    }

    // TODO: base canSubmit and isAdmin on roles from response
    const newUser = await User.create({
      discordUsername: profile.username,
      discordUserId: profile.id,
      canSubmit: true,
      isAdmin: false
    });
    const token = newUser.createJWT();
    return res.redirect(
      `${redirect_url}?token=${token}&username=${newUser.discordUsername}`
    );
  }
);

module.exports = expressRouter;
