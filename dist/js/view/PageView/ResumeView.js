import { PageController } from "../../controller/PageController.js";
import { ResumeModel } from "../../model/PageModel/ResumeModel.js";
import { PageView } from "./PageView.js";
export class ResumeView extends PageView {
    constructor() {
        super();
        this.model = new ResumeModel(PageController.getInstance().getPageCache()['resume']._title, PageController.getInstance().getPageCache()['resume']._content);
    }
    render(model) {
        super.render(model);
    }
    getModel() {
        return this.model;
    }
}
