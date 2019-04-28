import { Controller, Get, BadRequestException, Param } from '@nestjs/common';
import { identity, toString } from 'fp-ts/lib/function';
import * as t from 'io-ts';
import { failure } from 'io-ts/lib/PathReporter';
import { tryCatch } from 'fp-ts/lib/Either';

const report: (v: t.Errors) => string = v => failure(v).join('; ');

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return 'OK';
  }

  @Get('/error')
  getError() {
    return new BadRequestException();
  }

  @Get('/want-int/:s')
  getWantNumber(@Param('s') s: string) {
    return isNaN(+s) ? new BadRequestException('Not a number') : 'OK';
  }

  /**
   *  "{ num: number }" -> number | BadRequestException
   */
  @Get('/inc/:data')
  getIncrement(@Param('data') data: string) {
    return tryCatch<object>(() => JSON.parse(data))
      .mapLeft(toString)
      .chain(parsed => t.type({ num: t.number }).decode(parsed).mapLeft(report))
      .map(({ num }) => num + 1)
      .fold<BadRequestException | number>(e => new BadRequestException(e), identity);
  }


}
