import { PageController } from "../../controller/PageController.js";
import { ContactModel } from "../../model/PageModel/ContactModel.js";
import { PageView } from "./PageView.js";
export class ContactView extends PageView {
    constructor() {
        super();
        this.model = new ContactModel(PageController.getInstance().getPageCache()['contact']._title, PageController.getInstance().getPageCache()['contact']._content);
    }
    render(model) {
        super.render(model);
    }
    getModel() {
        return this.model;
    }
}
