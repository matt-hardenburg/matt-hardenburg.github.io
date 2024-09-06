var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { PageController } from "../../controller/PageController.js";
import { sessionMarkers } from "../../main.js";
export class PageView {
    constructor() {
        this.rootDiv = document.getElementById('root');
    }
    render(model) {
        this.rootDiv.classList.add('fade-out'); //fade current content
        setTimeout(() => __awaiter(this, void 0, void 0, function* () {
            document.title = `${model.getTitle()}`;
            this.rootDiv.innerHTML = model.getContent();
            if (!(!!document.getElementById('navbar'))) {
                var rootContent = this.rootDiv.innerHTML;
                var navBarResponse = yield fetch('./src/templates/components/navbar.html');
                if (navBarResponse.ok)
                    this.rootDiv.innerHTML = (yield navBarResponse.text()) + rootContent;
                PageController.getInstance().linkNavbarButtons();
            }
            this.updatePageMarker();
            this.rootDiv.classList.remove('fade-out');
            this.rootDiv.classList.add('fade-in');
            setTimeout(() => this.rootDiv.classList.remove('fade-in'), 500);
        }), 500);
    }
    updatePageMarker() {
        const contentElement = this.rootDiv.firstElementChild;
        if (!contentElement)
            throw Error("Content element is null or not properly rendered.");
        const pageID = contentElement.dataset.page;
        if (pageID)
            sessionStorage.setItem(sessionMarkers.lastVisitedPage, pageID);
        else
            sessionStorage.setItem(sessionMarkers.lastVisitedPage, 'home');
    }
}
