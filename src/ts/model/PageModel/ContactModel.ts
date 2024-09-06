import { PageModel } from "./PageModel.js";

export class ContactModel extends PageModel 
{
    constructor(title: string, content: string) 
    {
        super(title, content);
    }
}