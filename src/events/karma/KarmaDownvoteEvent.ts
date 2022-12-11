import {ensureChannelIsAvailable} from '@/commands/karma/KarmaCommand/predicates';
import Logger from '@/telemetry/logger';
import Event from '../Event';

const logger = new Logger('wego-overseer:KarmaDownvoteEvent');

export const KarmaDownvoteEvent = new Event<'messageReactionAdd'>({
    name: 'messageReactionAdd',
    run: async (reaction) => {
        const channel = await ensureChannelIsAvailable(
            reaction.message.channel.id,
            reaction.message.guild?.id,
        );

        if (!channel.isKarmaChannel) return;
        logger.debug('KarmaDownvoteEvent received');
    },
});
