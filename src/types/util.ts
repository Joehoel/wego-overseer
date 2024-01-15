/* eslint-disable @typescript-eslint/no-explicit-any */
import BaseCommand from '@/commands/BaseCommand';
import BaseEvent from '@/events/BaseEvent';

export type Maybe<T> = T | null | undefined;

export type Constructable<T> = {
    new (...args: any[]): T;
};

export type Commandable<T extends BaseCommand = BaseCommand> = Constructable<T>;

export type Eventable<T extends BaseEvent<any> = BaseEvent<any>> =
    Constructable<T>;

// TODO: Add jobable type
export type Jobable<T = unknown> = Constructable<T>;
