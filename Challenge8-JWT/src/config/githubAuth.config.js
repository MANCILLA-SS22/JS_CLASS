import dotenv from "dotenv";
dotenv.config({path: "Desafios/Desafio8-JWT/src/config.env"}); //doent allow us to read our variables from the file (config.env) and save them into node JS environment variables

const clientID_github = process.env.clientID_github;
const clientSecret_github = process.env.clientSecret_github

export { clientID_github, clientSecret_github}