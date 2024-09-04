var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { PageController } from "../controller/PageController.js";
//PageView.ts
export class PageView {
    constructor(rootID) {
        this.rootDiv = document.getElementById(rootID);
        if (!this.rootDiv)
            throw Error(`<div "id=${rootID}"></div> is null`);
    }
    render(model) {
        this.rootDiv.classList.add('fade-out'); //fade current content
        setTimeout(() => {
            document.title = `Matthew Hardenburg - ${model.getTitle()}`;
            this.rootDiv.innerHTML = model.getContent();
            this.loadNavbar();
            this.updatePageMarker();
            this.rootDiv.classList.remove('fade-out');
            this.rootDiv.classList.add('fade-in');
            setTimeout(() => this.rootDiv.classList.remove('fade-in'), 500);
        }, 500);
    }
    loadNavbar() {
        return __awaiter(this, void 0, void 0, function* () {
            const navBarExists = !!document.getElementById('navbar');
            if (navBarExists)
                return;
            var rootContent = this.rootDiv.innerHTML;
            var navBarResponse = yield fetch('./src/templates/components/navbar.html');
            if (navBarResponse.ok)
                this.rootDiv.innerHTML = (yield navBarResponse.text()) + rootContent;
            PageController.getInstance().linkNavbarButtons();
        });
    }
    getRootDiv() { return this.rootDiv; }
    updatePageMarker() {
        const contentElement = this.getRootDiv().firstElementChild;
        if (!contentElement) {
            console.error("Content element is null or not properly rendered.");
            return;
        }
        const pageID = contentElement.dataset.page;
        if (pageID)
            sessionStorage.setItem('lastVisitedPage', pageID);
        else
            throw Error("could not locate page id");
    }
}
