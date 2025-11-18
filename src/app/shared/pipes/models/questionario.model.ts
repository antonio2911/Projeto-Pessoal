export interface Questionario {
  readonly legenda: [string, string] | [string, string, string];
  readonly respostas: string[];
  readonly indiceCorreto: number;
}
