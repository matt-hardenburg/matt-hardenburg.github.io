import { PageModel } from "../../model/PageModel/PageModel.js";
import { PageView } from "./PageView.js";

export class PageViewNullObject extends PageView
{
    public getModel(): PageModel 
    {
        throw new Error("Calling getModel from Null Object");
    }
    
}