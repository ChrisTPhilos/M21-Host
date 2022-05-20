import DJS, { Intents } from "discord.js";
import WOK from "wokcommands";
import mongoose from "mongoose";
import path from "path";
import "dotenv/config";

const client = new DJS.Client({
  intents: 32767,
});

client.on("ready", async () => {
  // await mongoose.connect(process.env.MONGO_URI!, {
  //     keepAlive: true
  // })

  client.user?.setPresence({
    activities: [{ name: "m!help", type: "LISTENING" }],
    status: "dnd",
  });

  new WOK(client, {
    commandsDir: path.join(__dirname, "commands"),
    featuresDir: path.join(__dirname, "features"),
    testServers: ["973495754377265193"],
    botOwners: ["742972160158728283"],
    mongoUri: process.env.MONGO_URI,
    typeScript: true,
  })
    .setCategorySettings([
      {
        name: "Moderation",
        emoji: "🛠",
      },
    ])
    .setDefaultPrefix("m!");
});

client.login(process.env.TOKEN);
