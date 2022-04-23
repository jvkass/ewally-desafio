import { Router } from "express";
import { BoletosRepository } from "../modules/boletos/repositories/BoletosRepository";

const boletosRoutes = Router();

const boletosRepository = new BoletosRepository();

boletosRoutes.get("/:codboleto",(request,response)=>{

    console.log('codboleto ',request.params.codboleto);

    return response.json(request.params.codboleto);
})

export {boletosRoutes};