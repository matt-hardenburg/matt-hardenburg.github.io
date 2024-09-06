var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { PageViewProxy } from "../view/PageView/PageViewProxy.js";
export class PageController {
    constructor() {
        //private viewProxy: PageViewProxy = PageViewProxy.getInstance();
        this.pageCache = {};
        this.rootID = 'root';
    }
    static getInstance() {
        if (!PageController.instance)
            PageController.instance = new PageController();
        return PageController.instance;
    }
    preloadTemplates(templates) {
        return __awaiter(this, void 0, void 0, function* () {
            templates.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                const response = yield fetch(`./src/templates/pages/${element}.html`);
                if (response.ok)
                    this.pageCache[element] = PageViewProxy.getInstance().getViews()[`${element}`].getModel();
            }));
        });
    }
    getPageTemplates() {
        return this.pageCache;
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
            if (!PageViewProxy.getInstance().getRootDiv())
                throw Error(`<div ${this.rootID}></div> is null`);
            //attempt content swap
            try {
                PageViewProxy.getInstance().render(this.pageCache[templateName]);
            }
            catch (e) {
                if (e instanceof Error)
                    console.error(e.message);
                else
                    throw Error("Can't handle error");
            }
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
    getPageCache() {
        return this.pageCache;
    }
}
