import { SearchData } from '../../model/SearchData';
import { ISearchDatasRepository } from '../../repositories/ISearchDatasRepository';

type TListSearchDataUseCase = { data: SearchData[] };

class ListSearchDataUseCase {
  constructor(private searchDatasRepository: ISearchDatasRepository) { }

  async execute(): Promise<TListSearchDataUseCase> {
    const searchDatas = await this.searchDatasRepository.list();

    const data: TListSearchDataUseCase = { data: searchDatas }
    return data;
  }
}

export { ListSearchDataUseCase }