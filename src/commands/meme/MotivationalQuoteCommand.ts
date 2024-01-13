import Jimp from 'jimp';
import {Base64JimpImage} from '@/util/Base64JimpImage';
import {trans} from '@/util/localization';
import BaseCommand, {
    APPLICATION_COMMAND_OPTIONS,
    DefaultInteraction,
} from '@/commands/BaseCommand';
import {injectable} from 'tsyringe';

// https://picsum.photos/width/height
// https://picsum.photos/
const imageUrl = 'https://picsum.photos/300/400?grayscale&blur=5';

@injectable()
export default class MotivationalQuoteCommand implements BaseCommand {
    public name = 'motivational';
    public description = 'Generate a motivational picture';
    public options = [
        {
            type: APPLICATION_COMMAND_OPTIONS.STRING,
            name: 'text',
            description: 'text that will appear in image',
            required: true,
            min_length: 1,
            max_length: 128,
        },
    ];

    public async execute(interaction: DefaultInteraction): Promise<void> {
        try {
            await interaction.deferReply();

            const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
            const text = interaction.options.getString('text')!;

            // Feeding the link directly to Jimp doesn't work.
            const response = await fetch(imageUrl);
            const buffer = Buffer.from(await response.arrayBuffer());
            const img = await Jimp.read(buffer);

            img.print(
                font,
                0,
                0,
                {
                    text,
                    alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                    alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
                },
                img.getWidth(),
                img.getHeight(),
            );

            const wrappedImage = new Base64JimpImage(img);
            await interaction.followUp({files: [wrappedImage.toAttachment()]});
        } catch (err) {
            await interaction.followUp({
                content: trans(
                    'errors.common.failed',
                    'Motivational Quote Command',
                ),
                ephemeral: true,
            });
        }
    }
}
