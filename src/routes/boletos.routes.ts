import { Router } from "express";
import { BoletosRepository } from "../modules/boletos/repositories/BoletosRepository";

const boletosRoutes = Router();

const boletosRepository = new BoletosRepository();

boletosRoutes.get("/:codboleto",(request,response)=>{

    const infoBoleto = boletosRepository.findByCod(request.params.codboleto);

    return response.json(infoBoleto);
})

export {boletosRoutes};