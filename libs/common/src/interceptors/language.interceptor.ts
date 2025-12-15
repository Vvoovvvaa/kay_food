import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Language } from '../database/entities';
import { Languages } from '../database/enums';
import { Repository } from 'typeorm';

@Injectable()
export class LanguageInterceptor implements NestInterceptor {
  private readonly defaultLang = Languages.ENGLISH;

  constructor(
    @InjectRepository(Language)
    private readonly languageRepository: Repository<Language>,
  ) {}

  async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();

    const rawLang =
      request.headers['x-lang'] ??
      request.headers['accept-language'];

    const lang = this.normalizeLanguage(rawLang);

    const languageEntity = await this.languageRepository.findOne({
      where: { name: lang },
    });

    request.lang = languageEntity?.name ?? this.defaultLang;

    return next.handle();
  }

  private normalizeLanguage(raw?: string): Languages {
    if (!raw) {
      return this.defaultLang;
    }

    const normalized = raw.toUpperCase();

    return Object.values(Languages).includes(normalized as Languages)
      ? (normalized as Languages)
      : this.defaultLang;
  }
}