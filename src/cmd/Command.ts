import { Client, Message } from "discord.js";

export abstract class Command {
	name: string = "";

	constructor(readonly client: Client, readonly args: string[], readonly message: Message) {}

	abstract async run(): Promise<void>;
}

