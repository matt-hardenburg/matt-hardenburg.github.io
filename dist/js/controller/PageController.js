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
import { PageModel } from "../model/PageModel.js";
import { PageView } from "../view/PageView.js";
export class PageController {
    constructor() {
        this.pageCache = {};
        this.rootID = 'root';
        this.pageView = new PageView(this.rootID);
    }
    static getInstance() {
        if (!PageController.instance)
            PageController.instance = new PageController;
        return PageController.instance;
    }
    preloadTemplates(templates) {
        return __awaiter(this, void 0, void 0, function* () {
            templates.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                const response = yield fetch(`./src/templates/pages/${element}.html`);
                if (response.ok)
                    this.pageCache[element] = new PageModel(element, yield response.text());
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
            if (!this.pageView.getRootDiv())
                throw Error(`<div ${this.rootID}></div> is null`);
            //attempt content swap
            try {
                let model;
                if (this.pageCache[templateName])
                    model = this.pageCache[templateName];
                else //content not pre-loaded
                 {
                    const response = yield fetch(`./src/templates/pages/${templateName}.html`);
                    model = new PageModel(templateName, yield response.text());
                    this.pageCache[templateName] = model;
                }
                //swap content
                this.pageView.render(model);
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
}
