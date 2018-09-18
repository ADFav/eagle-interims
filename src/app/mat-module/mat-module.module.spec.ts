import { MatModule } from './mat-module.module';

describe('MatModuleModule', () => {
  let matModuleModule: MatModule;

  beforeEach(() => {
    matModuleModule = new MatModule();
  });

  it('should create an instance', () => {
    expect(matModuleModule).toBeTruthy();
  });
});
