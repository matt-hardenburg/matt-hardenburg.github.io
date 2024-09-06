import { PageController } from "../../controller/PageController.js";
import { PortfolioModel } from "../../model/PageModel/PortfolioModel.js";
import { PageView } from "./PageView.js";
export class PortfolioView extends PageView {
    constructor() {
        super();
        this.model = new PortfolioModel(PageController.getInstance().getPageCache()['portfolio']._title, PageController.getInstance().getPageCache()['portfolio']._content);
    }
    render(model) {
        super.render(model);
    }
    getModel() {
        return this.model;
    }
}
