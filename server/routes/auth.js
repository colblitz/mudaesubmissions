const expressRouter = require("express").Router();
const passport      = require("passport");
const axios         = require('axios');

const User   = require("../models/user");

const roles = {
  "SOS_BRIGADE": "815893375189516290",
  "CONTRIBUTOR": "914295419935289375",
  "SIBYL_SUBSYSTEM": "846432522619715584"
  // "573415404760858624": "Patrol (Help Master)"
}


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

    const mudaeGuildInfo = response.data;
    console.log("got mudae guild info: ", mudaeGuildInfo);

    // {
    //   avatar: null,
    //   communication_disabled_until: null,
    //   flags: 0,
    //   joined_at: '2021-10-09T07:23:19.481000+00:00',
    //   nick: null,
    //   pending: false,
    //   premium_since: null,
    //   roles: [ '496072748041371649', '497740461251887115', '1111969020007161877' ],
    //   user: {
    //     id: '108395585647689728',
    //     username: 'colblitz',
    //     global_name: null,
    //     avatar: null,
    //     discriminator: '8356',
    //     public_flags: 0,
    //     avatar_decoration: null
    //   },
    //   mute: false,
    //   deaf: false
    // }

    for (let [role, roleId] of roles) {
      if (mudaeGuildInfo.roles.includes(roleId)) {
        // TODO: add roles to user profile - pass back in params?
      }
    }


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
