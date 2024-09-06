var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//PageViewProxy.ts
import { sessionMarkers } from "../../main.js";
import { AboutView } from "./AboutView.js";
import { ContactView } from "./ContactView.js";
import { HomeView } from "./HomeView.js";
import { PageView } from "./PageView.js";
import { PageViewNullObject } from "./PageViewNullObject.js";
import { PortfolioView } from "./PortfolioView.js";
import { ResumeView } from "./ResumeView.js";
const loadablePages = {
    'home': HomeView,
    'about': AboutView,
    'resume': ResumeView,
    'portfolio': PortfolioView,
    'contact': ContactView
};
export class PageViewProxy extends PageView {
    constructor() {
        super();
        this.pageViews = {};
        this.activePage = new PageViewNullObject();
        this.setActivePage();
    }
    loadViews() {
        return __awaiter(this, void 0, void 0, function* () {
            const viewPromises = Object.keys(loadablePages).map((viewID) => __awaiter(this, void 0, void 0, function* () {
                this.pageViews[viewID] = new loadablePages[viewID];
            }));
            yield Promise.all(viewPromises);
        });
    }
    setActivePage() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.loadViews();
            var sessionStoragePage = sessionStorage.getItem(sessionMarkers.lastVisitedPage);
            if (!this.validateViews())
                throw new Error('pageViews not correctly loaded');
            if (!sessionStoragePage)
                this.activePage = this.pageViews['home'];
            else
                this.activePage = (this.pageViews[`${sessionStoragePage}`]);
        });
    }
    static getInstance() {
        if (!PageViewProxy.instance)
            PageViewProxy.instance = new PageViewProxy();
        return PageViewProxy.instance;
    }
    getRootDiv() {
        return this.rootDiv;
    }
    validateViews() {
        return __awaiter(this, void 0, void 0, function* () {
            return Object.keys(this.pageViews).length == Object.keys(loadablePages).length;
        });
    }
    render(model) {
        if (this.activePage)
            this.activePage.render(model);
        else
            throw Error(`${this.activePage} is not initialized`);
    }
}
