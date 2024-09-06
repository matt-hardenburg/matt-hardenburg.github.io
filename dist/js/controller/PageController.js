var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//PageController.ts
import { PageModelProxy } from "../model/PageModel/PageModelProxy.js";
import { PageViewProxy } from "../view/PageView/PageViewProxy.js";
export class PageController {
    constructor() {
        this.rootID = 'root';
        this.modelProxy = PageModelProxy.getInstance();
        this.viewProxy = PageViewProxy.getInstance();
    }
    static getInstance() {
        if (!PageController.instance)
            PageController.instance = new PageController();
        return PageController.instance;
    }
    initialPageLoad() {
        const lastVisitedPage = sessionStorage.getItem("lastVisitedPage"); //retrieve last visited page id from session storage
        if (!lastVisitedPage)
            this.loadPageTemplate("home");
        else
            this.loadPageTemplate(lastVisitedPage);
    }
    loadPageTemplate(templateName) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.viewProxy.getRootDiv())
                throw Error(`<div ${this.rootID}></div> is null`);
            var viewsReady = false, modelsReady = false;
            yield this.viewProxy.validateViews().then((result) => { viewsReady = result; });
            yield this.modelProxy.validateModels().then((result) => { modelsReady = result; });
            if (viewsReady && modelsReady) {
                //attempt content swap
                try {
                    this.viewProxy.render(this.modelProxy.loadModel(templateName));
                }
                catch (e) {
                    if (e instanceof Error)
                        console.error(e.message);
                    else
                        throw Error("Can't handle error");
                }
            }
            else
                throw Error(`Attempted content swap before models(${modelsReady}) and/or views(${viewsReady}) were ready`);
        });
    }
    linkNavbarButtons() {
        return __awaiter(this, void 0, void 0, function* () {
            const buttons = [
                { id: 'homeButton', template: 'home' },
                { id: 'aboutButton', template: 'about' },
                { id: 'resumeButton', template: 'resume' },
                { id: 'portfolioButton', template: 'portfolio' },
                { id: 'contactButton', template: 'contact' }
            ];
            buttons.forEach(button => {
                const element = document.getElementById(button.id);
                if (element)
                    element.addEventListener('click', () => this.loadPageTemplate(button.template));
            });
        });
    }
}
