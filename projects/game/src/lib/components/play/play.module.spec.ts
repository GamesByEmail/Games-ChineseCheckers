import { PlayModule } from './play.module';

describe('PlayModule', () => {
  let playModule: PlayModule;

  beforeEach(() => {
    playModule = new PlayModule();
  });

  it('should create an instance', () => {
    expect(playModule).toBeTruthy();
  });
});
