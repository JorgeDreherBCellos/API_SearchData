import { SearchData } from '../../model/SearchData';
import { ISearchDataRepository } from '../ISearchDataRepository';
import knex from '../../../../database/db';

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
  async list(): Promise<SearchData[]> {
    const allData: any[] = await knex.raw(`SELECT DISTINCT  
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
    `);

    const searchDatas: SearchData[] = allData.map(searchdt => ({

     comp: searchdt.DT_LANCAMENTO,
     mes: searchdt.DT_LANCAMENTO,
     ano: searchdt.DT_LANCAMENTO,
     data: searchdt.DT_LANCAMENTO,
     desc_conta: searchdt.DESC_CONTA,
     doc: searchdt.DOC,
     cod_conta: searchdt.COD_CONTA,
     valor: searchdt.VALOR,
     natureza: searchdt.NATUREZA,
     his: searchdt.HIS,
     cod_cc: searchdt.COD_CC,
     desc_cc: searchdt.DESC_CC,
     rateio: searchdt.RATEIO,
     cod_unid: searchdt.COD_UNID,
     cd_setor_credito: searchdt.CD_SETOR_CREDITO,
     cd_setor_debito: searchdt.CD_SETOR_DEBITO,
     cd_lancamento: searchdt.CD_LANCAMENTO
    })
  )
  return searchDatas;
  }
}

/* try {
  const searchData: SearchData[] = db("mvintegra").select("*")
     
  return searchData
  } catch (error){
    throw new Error("Mensagem descrevendo o erro que ocorreu");
}*/
// export { SearchDataRepository }
