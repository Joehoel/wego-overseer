import 'reflect-metadata';
import 'dotenv/config';
import {container} from 'tsyringe';
import {Model} from 'objection';
import Bot from '@/Bot';
import KnexService from '@/app/services/KnexService';
import {setLocalizationInstance} from '@/util/localization';
import LocalizationService from '@/app/services/LocalizationService';

const bot = container.resolve(Bot);

// Pass the knex instance to objection
// I would've preferred to let dependency injection handle this but Objection does not support it
// So here we are
Model.knex(container.resolve(KnexService).getKnex());

setLocalizationInstance(container.resolve(LocalizationService).getI18n());

bot.start().catch(console.error);