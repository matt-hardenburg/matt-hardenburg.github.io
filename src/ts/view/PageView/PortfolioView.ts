import { PageController } from "../../controller/PageController.js";
import { PageModel } from "../../model/PageModel/PageModel.js";
import { PortfolioModel } from "../../model/PageModel/PortfolioModel.js";
import { PageView } from "./PageView.js";

export class PortfolioView extends PageView
{
    private model: PageModel = new PortfolioModel(PageController.getInstance().getPageCache()['portfolio']._title,
                                                  PageController.getInstance().getPageCache()['portfolio']._content);

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