import { Request, Response, NextFunction } from "express";

export interface Controllers {
    (req: Request, res : Response): Response;
};

export interface Middlewares {
    (req: Request, res : Response, next: NextFunction ): void;
};
