import { SearchData } from '../../model/SearchData';
import { ISearchDataRepository } from '../ISearchDataRepository';
import { db } from '../../../../database/db';
import knex from 'knex';

  export class SearchDataRepository implements ISearchDataRepository {
  private static INSTANCE: SearchDataRepository;

  private constructor() {}
  public static getInstance(): SearchDataRepository {
    if (!SearchDataRepository.INSTANCE) {
      SearchDataRepository.INSTANCE = new SearchDataRepository();
    }
    return SearchDataRepository.INSTANCE;
  }
  //list(): SearchData[] {
  async list(): Promise<searchdt[]>{
    const allData: any[] = await knex.raw('SELECT DISTINCT  
    To_char(To_Date(dt_lancamento, 'DD/MM/RRRR'), 'RRRR-MM-DD') COMP,
    To_char(To_Date(dt_lancamento, 'DD/MM/RRRR'), 'MM') MES,
    To_char(To_Date(dt_lancamento, 'DD/MM/RRRR'), 'RRRR') ANO,
    To_char(To_Date(dt_lancamento, 'DD/MM/RRRR'), 'DD/MM/RRRR') DATA,
    (CASE WHEN ds_contabil_credito IS NULL THEN ds_contabil_debito ELSE ds_contabil_credito END) DESC_CONTA,
    imv_contabil.CD_LOTE ||'.'||imv_contabil.cd_lancamento DOC,
    (CASE WHEN To_Char(cd_contabil_credito) IS NULL THEN To_Char(cd_contabil_debito) ELSE To_Char(cd_contabil_credito) END) || '_SBAH' AS COD_CONTA,
    vl_lancamento VALOR,
    --(CASE WHEN cd_contabil_credito IS NULL THEN 'D'
    --      WHEN cd_contabil_debito IS NULL THEN 'C'
    --      ELSE 'A' END) NATUREZA ,
    'A' AS NATUREZA,
    ds_complemento_historico HIS,
    (CASE WHEN lcto_Setor.cd_setor_credito IS NOT NULL THEN (SELECT (CASE WHEN cd_cen_cus IS NULL THEN '4000' ELSE cd_cen_cus END) FROM setor WHERE cd_setor = lcto_Setor.cd_setor_credito) 
          WHEN lcto_Setor.cd_setor_debito IS NOT NULL THEN (SELECT (CASE WHEN cd_cen_cus IS NULL THEN '4000' ELSE cd_cen_cus END) FROM setor WHERE cd_setor = lcto_Setor.cd_setor_debito)
     ELSE NULL END) COD_CC,
    (CASE WHEN lcto_Setor.cd_setor_credito IS NOT NULL THEN (SELECT nm_setor FROM setor WHERE cd_setor = lcto_Setor.cd_setor_credito) 
          WHEN lcto_Setor.cd_setor_debito IS NOT NULL THEN (SELECT nm_setor FROM setor WHERE cd_setor = lcto_Setor.cd_setor_debito)
     ELSE NULL END) DESC_CC,
    (CASE WHEN lcto_Setor.cd_setor_credito IS NULL AND lcto_Setor.cd_setor_debito IS NULL THEN 'N' ELSE 'S' END) RATEIO,
    cd_multi_empresa COD_UNID,
    lcto_Setor.cd_setor_credito,
    lcto_Setor.cd_setor_debito,
    imv_contabil.cd_lancamento             
    FROM mvintegra.imv_contabil
    LEFT JOIN dbamv.lcto_Setor ON lcto_Setor.cd_lcto_contabil = imv_contabil.cd_lancamento
    WHERE tp_registro = '003'
    AND cd_lote = 199358  --199358
    --AND To_char(To_Date(dt_lancamento, 'DD/MM/RRRR'), 'RRRR') = '2022' 
    --AND To_char(To_Date(dt_lancamento, 'DD/MM/RRRR'), 'MM') = '03'
    AND ((CASE WHEN To_Char(cd_contabil_credito) IS NULL THEN To_Char(cd_contabil_debito) ELSE To_Char(cd_contabil_credito) END) LIKE '3%' 
    OR (CASE WHEN To_Char(cd_contabil_credito) IS NULL THEN To_Char(cd_contabil_debito) ELSE To_Char(cd_contabil_credito) END) LIKE '4%'
    OR (CASE WHEN To_Char(cd_contabil_credito) IS NULL THEN To_Char(cd_contabil_debito) ELSE To_Char(cd_contabil_credito) END) LIKE '5%'
    OR (CASE WHEN To_Char(cd_contabil_credito) IS NULL THEN To_Char(cd_contabil_debito) ELSE To_Char(cd_contabil_credito) END) LIKE '6%'
    OR (CASE WHEN To_Char(cd_contabil_credito) IS NULL THEN To_Char(cd_contabil_debito) ELSE To_Char(cd_contabil_credito) END) LIKE '7%')SELECT DISTINCT  
    To_char(To_Date(dt_lancamento, 'DD/MM/RRRR'), 'RRRR-MM-DD') COMP,
    To_char(To_Date(dt_lancamento, 'DD/MM/RRRR'), 'MM') MES,
    To_char(To_Date(dt_lancamento, 'DD/MM/RRRR'), 'RRRR') ANO,
    To_char(To_Date(dt_lancamento, 'DD/MM/RRRR'), 'DD/MM/RRRR') DATA,
    (CASE WHEN ds_contabil_credito IS NULL THEN ds_contabil_debito ELSE ds_contabil_credito END) DESC_CONTA,
    imv_contabil.CD_LOTE ||'.'||imv_contabil.cd_lancamento DOC,
    (CASE WHEN To_Char(cd_contabil_credito) IS NULL THEN To_Char(cd_contabil_debito) ELSE To_Char(cd_contabil_credito) END) || '_SBAH' AS COD_CONTA,
    vl_lancamento VALOR,
    --(CASE WHEN cd_contabil_credito IS NULL THEN 'D'
    --      WHEN cd_contabil_debito IS NULL THEN 'C'
    --      ELSE 'A' END) NATUREZA ,
    'A' AS NATUREZA,
    ds_complemento_historico HIS,
    (CASE WHEN lcto_Setor.cd_setor_credito IS NOT NULL THEN (SELECT (CASE WHEN cd_cen_cus IS NULL THEN '4000' ELSE cd_cen_cus END) FROM setor WHERE cd_setor = lcto_Setor.cd_setor_credito) 
          WHEN lcto_Setor.cd_setor_debito IS NOT NULL THEN (SELECT (CASE WHEN cd_cen_cus IS NULL THEN '4000' ELSE cd_cen_cus END) FROM setor WHERE cd_setor = lcto_Setor.cd_setor_debito)
     ELSE NULL END) COD_CC,
    (CASE WHEN lcto_Setor.cd_setor_credito IS NOT NULL THEN (SELECT nm_setor FROM setor WHERE cd_setor = lcto_Setor.cd_setor_credito) 
          WHEN lcto_Setor.cd_setor_debito IS NOT NULL THEN (SELECT nm_setor FROM setor WHERE cd_setor = lcto_Setor.cd_setor_debito)
     ELSE NULL END) DESC_CC,
    (CASE WHEN lcto_Setor.cd_setor_credito IS NULL AND lcto_Setor.cd_setor_debito IS NULL THEN 'N' ELSE 'S' END) RATEIO,
    cd_multi_empresa COD_UNID,
    lcto_Setor.cd_setor_credito,
    lcto_Setor.cd_setor_debito,
    imv_contabil.cd_lancamento             
    FROM mvintegra.imv_contabil
    LEFT JOIN dbamv.lcto_Setor ON lcto_Setor.cd_lcto_contabil = imv_contabil.cd_lancamento
    WHERE tp_registro = '003'
    AND cd_lote = 199358  --199358
    --AND To_char(To_Date(dt_lancamento, 'DD/MM/RRRR'), 'RRRR') = '2022' 
    --AND To_char(To_Date(dt_lancamento, 'DD/MM/RRRR'), 'MM') = '03'
    AND ((CASE WHEN To_Char(cd_contabil_credito) IS NULL THEN To_Char(cd_contabil_debito) ELSE To_Char(cd_contabil_credito) END) LIKE '3%' 
    OR (CASE WHEN To_Char(cd_contabil_credito) IS NULL THEN To_Char(cd_contabil_debito) ELSE To_Char(cd_contabil_credito) END) LIKE '4%'
    OR (CASE WHEN To_Char(cd_contabil_credito) IS NULL THEN To_Char(cd_contabil_debito) ELSE To_Char(cd_contabil_credito) END) LIKE '5%'
    OR (CASE WHEN To_Char(cd_contabil_credito) IS NULL THEN To_Char(cd_contabil_debito) ELSE To_Char(cd_contabil_credito) END) LIKE '6%'
    OR (CASE WHEN To_Char(cd_contabil_credito) IS NULL THEN To_Char(cd_contabil_debito) ELSE To_Char(cd_contabil_credito) END) LIKE '7%')
    ')

    const searchData: Searchdt[] = allData.map({
      
    })
  }

}

/* try {
  const searchData: SearchData[] = db("mvintegra").select("*")
     
  return searchData
  } catch (error){
    throw new Error("Mensagem descrevendo o erro que ocorreu");
}*/
// export { SearchDataRepository }
