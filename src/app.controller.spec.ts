import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { BadRequestException } from '@nestjs/common';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "OK"', () => {
      expect(appController.getHello()).toBe('OK');
    });
    it('should return BadRequest', () => {
      expect(appController.getError()).toBeInstanceOf(BadRequestException);
    });
    it('should return 2', () => {
      expect(appController.getIncrement('{"num": 1}')).toBe(2);
    });
    it('should return BadRequest', () => {
      expect(appController.getIncrement('not1')).toBeInstanceOf(BadRequestException);
    });
    it('should return BadRequest', () => {
      expect(appController.getIncrement('{"num": "1"}')).toBeInstanceOf(BadRequestException);
    });
    it('should return "OK"', () => {
      expect(appController.getWantNumber('1')).toBe('OK');
    });
    it('should return BadRequest', () => {
      expect(appController.getWantNumber('not1')).toBeInstanceOf(BadRequestException);
    });
  });
});
