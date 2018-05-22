import { Request, Response } from "express";
import { Controllers } from "../config/interfaces";

/**
 * GET /
 * Home page.
 */
export let index: Controllers = (req: Request, res: Response) => {
  return res.send("home");
};
