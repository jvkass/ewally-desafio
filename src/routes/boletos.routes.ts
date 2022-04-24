import { Router } from "express";
import { BoletosRepository } from "../modules/boletos/repositories/BoletosRepository";

const boletosRoutes = Router();

const boletosRepository = new BoletosRepository();

boletosRoutes.get("/:codboleto", (request, response) => {
   
    let resp = boletosRepository.findByCodDigitavel(request.params.codboleto);

    if(resp.valido==false){
        return response.status(400);
    }

    return response.status(200).json(resp.infoBoleto);
})

export { boletosRoutes };