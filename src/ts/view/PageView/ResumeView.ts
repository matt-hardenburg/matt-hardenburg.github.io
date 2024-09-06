import { PageController } from "../../controller/PageController.js";
import { PageModel } from "../../model/PageModel/PageModel.js";
import { ResumeModel } from "../../model/PageModel/ResumeModel.js";
import { PageView } from "./PageView.js";

export class ResumeView extends PageView
{
    private model: PageModel = new ResumeModel(PageController.getInstance().getPageCache()['resume']._title,
                                               PageController.getInstance().getPageCache()['resume']._content);
    
    constructor() 
    {
        super();
    }

    public render(model: PageModel): void 
    {
        super.render(model);
    }

    public getModel(): PageModel 
    {
        return this.model;
    }
}