
require("dotenv").config();

const {
  Client,
  GatewayIntentBits,
  Events,
  EmbedBuilder
} = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds
  ]
});

client.once(Events.ClientReady, readyClient => {
  console.log(`${readyClient.user.tag} is online!`);
});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  try {
    if (interaction.commandName === "ping") {
      return interaction.reply({
        content: `Pong! 🏓 ${client.ws.ping}ms`,
        ephemeral: true
      });
    }

    if (interaction.commandName === "serverinfo") {
      const guild = interaction.guild;

      const embed = new EmbedBuilder()
        .setColor("#E8A7D8")
        .setTitle(`${guild.name}`)
        .addFields(
          {
            name: "Members",
            value: `${guild.memberCount}`,
            inline: true
          },
          {
            name: "Server ID",
            value: guild.id,
            inline: true
          },
          {
            name: "Created",
            value: `<t:${Math.floor(
              guild.createdTimestamp / 1000
            )}:D>`,
            inline: true
          }
        )
        .setThumbnail(
          guild.iconURL({ size: 256 })
        )
        .setFooter({
          text: "Dollie Bot"
        });

      return interaction.reply({
        embeds: [embed]
      });
    }
  } catch (error) {
    console.error(error);

    const response = {
      content: "Something went wrong executing that command.",
      ephemeral: true
    };

    if (interaction.replied || interaction.deferred) {
      await interaction.followUp(response).catch(console.error);
    } else {
      await interaction.reply(response).catch(console.error);
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
