import { PageView } from "./PageView.js";
export class PageViewNullObject extends PageView {
    getModel() {
        throw new Error("Calling getModel from Null Object");
    }
}
