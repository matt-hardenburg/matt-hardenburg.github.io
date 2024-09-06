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
        this.activePage = new PageViewNullObject();
        this.pageViews = this.cachePageViews();
        this.setActivePage();
    }
    cachePageViews() {
        var temp = {};
        Object.keys(loadablePages).forEach(viewID => {
            const view = new loadablePages[viewID];
            temp[viewID] = view;
        });
        return temp;
    }
    setActivePage() {
        var sessionStoragePage = sessionStorage.getItem('lastVisitedPage');
        if (!this.validatePageViews())
            throw new Error('pageViews not correctly loaded');
        if (!sessionStoragePage)
            this.activePage = this.pageViews['home'];
        else
            this.activePage = (this.pageViews[`${sessionStoragePage}`]);
    }
    static getInstance() {
        if (!PageViewProxy.instance)
            PageViewProxy.instance = new PageViewProxy();
        return PageViewProxy.instance;
    }
    getRootDiv() {
        return this.rootDiv;
    }
    getModel() {
        return this.activePage.getModel();
    }
    validatePageViews() {
        var expected = Object.keys(loadablePages).length;
        return Object.keys(this.pageViews).length == expected;
    }
    getViews() { return this.pageViews; }
    render(model) {
        if (this.activePage)
            this.activePage.render(this.getModel());
        else
            throw Error(`${this.activePage} is not initialized`);
    }
}
