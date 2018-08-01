import { Tablica } from './tablica.model';

describe('TablicaModule', () => {
  let tablicaModule: Tablica;

  beforeEach(() => {
    tablicaModule = new Tablica();
  });

  it('should create an instance', () => {
    expect(tablicaModule).toBeTruthy();
  });
});
