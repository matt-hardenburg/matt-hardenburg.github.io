import { PageController } from "../../controller/PageController.js";
import { HomeModel } from "../../model/PageModel/HomeModel.js";
import { PageView } from "./PageView.js";
export class HomeView extends PageView {
    constructor() {
        super();
        this.model = new HomeModel(PageController.getInstance().getPageCache()['home']._title, PageController.getInstance().getPageCache()['home']._content);
    }
    render(model) {
        super.render(model);
    }
    getModel() {
        return this.model;
    }
}
