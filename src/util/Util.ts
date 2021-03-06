import { Message, TextChannel } from "discord.js";
import { User } from "../database/entity";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../database/repository";


export async function setBirthday(userId: string, date: Date) {
	const userRepository = getCustomRepository(UserRepository);
	return await userRepository.save(User.create({
		id: userId,
		birthday: date
	}));
}

export function validateDate(day: number, month: number, year: number) {
	// Validate years
	if (year < 0) return false;

	// Validate months
	if (month < 1 || month > 12) return false;

	// Validate days
	if (day < 1) return false;

	//  31 vs 30 day months
	if ([1, 3, 5, 7, 8, 10, 12].includes(month))
		if (day > 31) return false;

	if ([4, 6, 9, 11].includes(month))
		if (day > 30) return false;

	// February and leap year stuff
	if (year % 4 === 0) {

		if (day > 29) return false;
	} else {
		if (day > 28) return false;
	}
	return true;
}

export interface GuildMessage extends Message {
	channel: TextChannel;
}

export function isGuildMessage(message: Message): message is GuildMessage {
	return message.channel.type === "text";
}
