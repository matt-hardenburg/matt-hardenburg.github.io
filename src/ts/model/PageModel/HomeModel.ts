import { PageModel } from "./PageModel.js";

export class HomeModel extends PageModel 
{
    constructor(title: string, content: string) 
    {
        super(title, content);
    }
}