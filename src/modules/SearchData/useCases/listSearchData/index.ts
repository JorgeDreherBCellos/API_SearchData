import { SearchDataRepository } from "../../repositories/implementations/SearchDataRepository";
import { ListSearchDataController } from "./ListSearchDataController";
import { ListSearchDataUseCase } from "./ListSearchDataUseCase";


const searchDataRepository = SearchDataRepository.getInstance();

const listSearchDataUseCase = new ListSearchDataUseCase(searchDataRepository);

const listSearchDataController = new ListSearchDataController(listSearchDataUseCase);

export { listSearchDataController };