import { SearchData } from '../../model/SearchData';
import { ISearchDataRepository } from '../../repositories/ISearchDataRepository';

type TListSearchDataUseCase = { data: SearchData[] }

class ListSearchDataUseCase {

  constructor(private searchDatasRepository: ISearchDataRepository) { }

  execute(): TListSearchDataUseCase {
    const searchDatas = this.searchDatasRepository.list();

    const data: TListSearchDataUseCase = { data: searchDatas }
    return data;
  }
}

export { ListSearchDataUseCase }