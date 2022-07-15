import { Request, Response } from "express";

import { ListSearchDataUseCase } from './ListSearchDataUseCase';

class ListSearchDataController {
  constructor(private listSearchDataUseCase: ListSearchDataUseCase) { }

  handle(request: Request, response: Response): Response {
    try {
      const all = this.listSearchDataUseCase.execute();

      return response.status(200).json(all);
    } catch (error) {
      return response.status(500).json({
        message: error.message || "Mensagem descrevendo o erro que ocorreu!"
      })
    }
  }
}

export { ListSearchDataController }