import { Router } from "express";
import { BoletosRepository } from "../modules/boletos/repositories/BoletosRepository";

const boletosRoutes = Router();

const boletosRepository = new BoletosRepository();

boletosRoutes.get("/:codboleto", (request, response) => {
    let resp: boolean;
    resp = boletosRepository.findByCod(request.params.codboleto);

    if(resp==false){
        return response.status(400).json(resp);
    }

    return response.status(200).json(resp);
})

export { boletosRoutes };