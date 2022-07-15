import { SearchData } from "../model/SearchData";

interface ISearchDataRepository {
  list(): SearchData[];
}

export { ISearchDataRepository }