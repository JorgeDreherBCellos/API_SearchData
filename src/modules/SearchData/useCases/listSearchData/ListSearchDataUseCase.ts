import { SearchData } from '../../model/SearchData';
import { ISearchDataRepository } from '../../repositories/ISearchDataRepository';

type TListSearchDataUseCase = { data: SearchData[] };

class ListSearchDataUseCase {
  constructor(private searchDatasRepository: ISearchDataRepository) {}

  async execute(): Promise<TListSearchDataUseCase> {
    const searchDatas = await this.searchDatasRepository.list();

    const data: TListSearchDataUseCase = { data: searchDatas }
    return data;
  }
}

export { ListSearchDataUseCase }