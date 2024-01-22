import {getEnvBool, getEnvInt, getEnvString} from '@/util/environment';

export default {
    giphy: {
        apiKey: getEnvString('GIPHY_API_KEY', ''),
    },
    qualityContent: {
        emojiName: getEnvString('QCC_EMOJI_NAME', ''),
        minEmojiCount: getEnvInt('QCC_MIN_EMOJI_COUNT', 1),
        channelId: getEnvString('QCC_CHANNEL_ID', ''),
    },
    adventOfCode: {
        cookie: getEnvString('AOC_SESSION_COOKIE', ''),
        leaderboardUrl: getEnvString('AOC_LEADERBOARD_URL', ''),
    },
    kanIkEenKorteBroekAanApiUrl: getEnvString(
        'KANIKEENKORTEBROEKAAN_API_URL',
        '',
    ),
    duoStufiApiUrl: getEnvString('DUO_STUFI_API_URL', ''),
    aws: {
        accessKeyId: getEnvString('AWS_ACCESS_KEY_ID', ''),
        secretAccessKey: getEnvString('AWS_SECRET_ACCESS_KEY', ''),
    },
    youtube: {
        sqsQueueUrl: getEnvString('YOUTUBE_SQS_QUEUE_URL', ''),
        announceChannelId: getEnvString('YOUTUBE_ANNOUNCE_CHANNEL_ID', ''),
    },
    noob: {
        kabelkaanDiscordId: getEnvString('KABELBAAN_DISCORD_ID', ''),
        noobEmojiId: getEnvString('NOOB_EMOJI_ID', ''),
    },
    knex: {
        enableLogger: getEnvBool('ENABLE_KNEX_LOGGER', false),
    },
};