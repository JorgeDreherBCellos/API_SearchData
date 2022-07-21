import { SearchData } from "../model/SearchData";

interface ISearchDatasRepository {
  list(): Promise<SearchData[]>;
}

export { ISearchDatasRepository }