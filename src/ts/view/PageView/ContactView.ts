import { PageController } from "../../controller/PageController.js";
import { ContactModel } from "../../model/PageModel/ContactModel.js";
import { PageModel } from "../../model/PageModel/PageModel.js";
import { PageView } from "./PageView.js";

export class ContactView extends PageView
{
    private model: PageModel = new ContactModel(PageController.getInstance().getPageCache()['contact']._title,
                                                PageController.getInstance().getPageCache()['contact']._content);

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