require("dotenv").config();

const {
  REST,
  Routes,
  SlashCommandBuilder
} = require("discord.js");

const commands = [
  new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Check if the bot is online"),

  new SlashCommandBuilder()
    .setName("serverinfo")
    .setDescription("View server information")
];

const rest = new REST({ version: "10" })
  .setToken(process.env.DISCORD_TOKEN);

async function deploy() {
  try {
    console.log("Registering slash commands...");

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands.map(command => command.toJSON()) }
    );

    console.log("Slash commands registered!");
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  }
}

deploy();
