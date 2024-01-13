import {
    ensureChannelIsAvailable,
    ensureGuildIsAvailable,
    ensureUserIsAvailable,
} from '@/commands/karma/KarmaCommand/predicates';
import Karma from '@/entities/Karma';
import Logger from '@/telemetry/logger';
import {randomNumber} from '@/util/karma';
import Event from '../Event';

const logger = new Logger('wego-overseer:events:KarmaUpvoteEvent');

export const KarmaUpvoteEvent = new Event({
    name: 'messageReactionAdd',
    run: async (_, reaction, user) => {
        try {
            if (user.bot) return;

            if (reaction.emoji.name !== 'upvote') {
                return;
            }

            const message = reaction.message;

            // Discord provides incomplete message on messageReactionAdd
            await message.fetch();

            const upvote = message.guild?.emojis.cache.find((e) => {
                return e.name === 'downvote';
            });

            // Remove downvotes from user if any
            await message.reactions
                .resolve(upvote?.id ?? '')
                ?.users.remove(user.id);

            await ensureGuildIsAvailable(message.guild?.id);
            await ensureUserIsAvailable(user.id);
            await ensureUserIsAvailable(message.author?.id);
            const channel = await ensureChannelIsAvailable(
                message.channel.id,
                message.guild?.id,
            );

            if (!channel.isKarmaChannel) return;

            const keys = {
                messageId: message.id,
                channelId: message.channel.id,
                guildId: message.guild?.id,
                receivedFromUserId: user.id,
                userId: message.author?.id,
            };

            const result = await Karma.query()
                .where({...keys})
                .first();

            if (result instanceof Karma) {
                await Karma.query()
                    .findById(result.id)
                    .patch({
                        amount: randomNumber(1, 5),
                        ...keys,
                    });
            } else {
                await Karma.query().insert({
                    amount: randomNumber(1, 5),
                    ...keys,
                });
            }
        } catch (err) {
            logger.error('Unable to handle KarmaUpvoteEvent', err);
        }
    },
});
