import { PageModel } from "./PageModel.js";

export class AboutModel extends PageModel
{
    constructor(title: string, content: string)
    {
        super(title, content);
    }
}