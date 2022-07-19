import { SearchData } from "../model/SearchData";

interface ISearchDataRepository {
  list(): Promise<SearchData[]>;
}

export { ISearchDataRepository }