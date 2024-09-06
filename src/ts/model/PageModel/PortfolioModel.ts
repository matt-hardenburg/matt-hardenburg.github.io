import { PageModel } from "./PageModel.js";

export class PortfolioModel extends PageModel 
{
    constructor(title: string, content: string) 
    {
        super(title, content);
    }
}