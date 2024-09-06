import { PageModel } from "../../model/PageModel/PageModel.js";
import { AboutView } from "./AboutView.js";
import { ContactView } from "./ContactView.js";
import { HomeView } from "./HomeView.js";
import { PageView, PageViewIF } from "./PageView.js";
import { PageViewNullObject } from "./PageViewNullObject.js";
import { PortfolioView } from "./PortfolioView.js";
import { ResumeView } from "./ResumeView.js";

const loadablePages: { [key: string]: new () => PageViewIF } = {
    'home': HomeView,
    'about': AboutView,
    'resume': ResumeView,
    'portfolio': PortfolioView,
    'contact': ContactView
};

export class PageViewProxy extends PageView
{
    private static instance :PageViewProxy;
    private pageViews: {[key: string]:PageViewIF};
    private activePage: PageViewIF = new PageViewNullObject();

    constructor()
    {
        super()
        this.pageViews = this.cachePageViews();
        this.setActivePage();
    }

    private cachePageViews(): {[key: string]: PageViewIF} {
        var temp: {[key: string]: PageViewIF} = {};
        Object.keys(loadablePages).forEach(viewID => {
            const view: PageViewIF = new loadablePages[viewID];
            temp[viewID] = view;
        });
        return temp;
    }

    private setActivePage(): void
    {
        var sessionStoragePage: string | null = sessionStorage.getItem('lastVisitedPage');
        if (!this.validatePageViews()) throw new Error('pageViews not correctly loaded');
        if (!sessionStoragePage) this.activePage = this.pageViews['home'];
        else this.activePage = (this.pageViews[`${sessionStoragePage}`])
    }

    public static getInstance(): PageViewProxy
    {
        if (!PageViewProxy.instance) PageViewProxy.instance = new PageViewProxy();
        return PageViewProxy.instance;
    }

    public getRootDiv(): HTMLElement
    {
        return this.rootDiv;
    }

    public getModel(): PageModel 
    {
        return this.activePage.getModel();
    }

    private validatePageViews(): boolean
    {
        var expected = Object.keys(loadablePages).length;
        return Object.keys(this.pageViews).length == expected
    }

    public getViews(): { [key: string]: PageViewIF } { return this.pageViews; }

    public render(model: PageModel): void 
    {
        if (this.activePage) this.activePage.render(this.getModel());
        else throw Error(`${this.activePage} is not initialized`)
    }
}
