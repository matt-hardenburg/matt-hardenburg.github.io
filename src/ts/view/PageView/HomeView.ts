import { PageController } from "../../controller/PageController.js";
import { HomeModel } from "../../model/PageModel/HomeModel.js";
import { PageModel } from "../../model/PageModel/PageModel.js";
import { PageView } from "./PageView.js";

export class HomeView extends PageView
{
    private model: PageModel = new HomeModel(PageController.getInstance().getPageCache()['home']._title, 
                                             PageController.getInstance().getPageCache()['home']._content);
    constructor()
    {
        super();
    }

    public render(model: PageModel): void
    {
        super.render(model);
    }

    public getModel() : PageModel
    {
        return this.model;
    }
}