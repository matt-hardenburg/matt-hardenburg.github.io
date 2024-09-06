import { PageController } from "../../controller/PageController.js";
import { AboutModel } from "../../model/PageModel/AboutModel.js";
import { PageView } from "./PageView.js";
export class AboutView extends PageView {
    constructor() {
        super();
        this.model = new AboutModel(PageController.getInstance().getPageCache()['about']._title, PageController.getInstance().getPageCache()['about']._content);
    }
    render(model) {
        super.render(model);
    }
    getModel() {
        return this.model;
    }
}
