// Cl_sProyecto.ts

// Esta clase También es un copy y pega, solo se cambian el url

import Cl_sMockApi from "./Cl_sMockApi.js";

export default class Cl_sProyecto extends Cl_sMockApi {
  protected static apiUrl: string =
    "https://6a256fd85447714a6f836bfc.mockapi.io/:endpoint";
}
