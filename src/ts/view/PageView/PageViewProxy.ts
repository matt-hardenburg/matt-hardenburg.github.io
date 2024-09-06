//PageViewProxy.ts
import { sessionMarkers } from "../../main.js";
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
    private pageViews: {[key: string]:PageViewIF} = {};
    private activePage: PageViewIF = new PageViewNullObject();

    constructor()
    {
        super()
        this.setActivePage();
    }

    private async loadViews(): Promise<void>
    {
        const viewPromises: Promise<void>[] = Object.keys(loadablePages).map(async viewID => {
            this.pageViews[viewID] = new loadablePages[viewID];
        });
        await Promise.all(viewPromises);
    }

    private async setActivePage(): Promise<void>
    {
        await this.loadViews()
        var sessionStoragePage: string | null = sessionStorage.getItem(sessionMarkers.lastVisitedPage);
        if (!this.validateViews()) throw new Error('pageViews not correctly loaded');
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

    public async validateViews(): Promise<boolean>
    {
        return Object.keys(this.pageViews).length == Object.keys(loadablePages).length;
    }

    public render(model: PageModel): void 
    {
        if (this.activePage) this.activePage.render(model);
        else throw Error(`${this.activePage} is not initialized`)
    }
}
