import { permissions } from "../models";
import { success,fail,sendError } from "../function/respond.js";
import db from "../models/index.js";


const createRoute = async (req,res) => {
  /* c8 ignore next 14 */
  const routes = [
      {
        id: 1,
        name: "Nyamirambo-downtown"
      },
      {
        id: 2,
        name: "Kicukiro-downtown"
      }
  ] 

  return success(res,201,{ routes },"Retrived");
  
}

export  { createRoute };
