import { PageController } from "../../controller/PageController.js";
import { AboutModel } from "../../model/PageModel/AboutModel.js";
import { PageModel } from "../../model/PageModel/PageModel.js";
import { PageView } from "./PageView.js";

export class AboutView extends PageView
{
    private model: PageModel = new AboutModel(PageController.getInstance().getPageCache()['about']._title,
                                              PageController.getInstance().getPageCache()['about']._content);

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