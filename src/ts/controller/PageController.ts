//PageController.ts
import { PageModel } from "../model/PageModel/PageModel.js";
import { PageViewProxy } from "../view/PageView/PageViewProxy.js";

export class PageController
{
    private static instance: PageController;
    //private viewProxy: PageViewProxy = PageViewProxy.getInstance();
    private pageCache: { [key: string]: PageModel } = {};
    private rootID = 'root';

    constructor() {}

    public static getInstance(): PageController
    {
        if (!PageController.instance) PageController.instance = new PageController();
        return PageController.instance;
    }

    public preloadTemplates(templates: string[]): void
    {
        templates.forEach(async element => {
            const response = await fetch(`./src/templates/pages/${element}.html`);
            if (response.ok) this.pageCache[element] = PageViewProxy.getInstance().getViews()[`${element}`].getModel();
        });
    }

    public getPageTemplates(): {[key: string]: PageModel}
    {
        return this.pageCache;
    }

    public initialPageLoad(): any 
    {
        const lastVisitedPage: string | null = sessionStorage.getItem("lastVisitedPage"); //retrieve last visited page id from session storage
        if (!lastVisitedPage) this.loadPageTemplate("home");
        else this.loadPageTemplate(lastVisitedPage);
    }

    public async loadPageTemplate(templateName: string): Promise<void> 
    {
        if (!PageViewProxy.getInstance().getRootDiv()) throw Error(`<div ${this.rootID}></div> is null`);

        //attempt content swap
        try { PageViewProxy.getInstance().render(this.pageCache[templateName]); }
        catch (e: unknown) {
            if (e instanceof Error) console.error(e.message);
            else throw Error("Can't handle error")
        }
    }

    public async linkNavbarButtons(): Promise<void> 
    {
        const buttons = [
            { id: 'homeButton', template: 'home' },
            { id: 'aboutButton', template: 'about' },
            { id: 'resumeButton', template: 'resume' },
            { id: 'portfolioButton', template: 'portfolio' },
            { id: 'contactButton', template: 'contact' }
        ];

        buttons.forEach(button => {
            const element = document.getElementById(button.id) as HTMLElement;
            if (element) element.addEventListener('click', () => this.loadPageTemplate(button.template));
        });
    }

    public getPageCache(): {[key: string]: PageModel}
    {
        return this.pageCache;
    }
}