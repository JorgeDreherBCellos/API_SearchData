import { v4 as uuidV4 } from 'uuid';

class SearchData {
  id?: string;
  comp: Date;
  mes: number;
  ano: number;
  data: Date;
  desc_conta: string;
  doc: string;
  cod_conta: string;
  valor: number;
  natureza: string;
  his: string;
  cod_cc: number;
  desc_cc: string;
  rateio: string;
  cod_unid: number;
  cd_setor_credito: number;
  cd_setor_debito: number;
  cd_lancamento: number;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { SearchData }