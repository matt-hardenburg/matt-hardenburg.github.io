//PageController.ts
import { PageModelProxy } from "../model/PageModel/PageModelProxy.js";
import { PageViewProxy } from "../view/PageView/PageViewProxy.js";

export class PageController
{
    private static instance: PageController;
    private rootID = 'root';
    private modelProxy: PageModelProxy;
    private viewProxy: PageViewProxy;

    constructor() 
    {
        this.modelProxy = PageModelProxy.getInstance();
        this.viewProxy = PageViewProxy.getInstance();
    }

    public static getInstance(): PageController
    {
        if (!PageController.instance) PageController.instance = new PageController();
        return PageController.instance;
    }

    public initialPageLoad(): any 
    {
        const lastVisitedPage: string | null = sessionStorage.getItem("lastVisitedPage"); //retrieve last visited page id from session storage
        if (!lastVisitedPage) this.loadPageTemplate("home");
        else this.loadPageTemplate(lastVisitedPage);
    }

    public async loadPageTemplate(templateName: string): Promise<void> 
    {
        if (!this.viewProxy.getRootDiv()) throw Error(`<div ${this.rootID}></div> is null`);

        var viewsReady: boolean = false, modelsReady: boolean = false;
        await this.viewProxy.validateViews().then((result) => { viewsReady = result; });
        await this.modelProxy.validateModels().then((result) => { modelsReady = result; });

        if (viewsReady && modelsReady)
        {
            //attempt content swap
            try { this.viewProxy.render(this.modelProxy.loadModel(templateName)); }
            catch (e: unknown) 
            {
                if (e instanceof Error) console.error(e.message);
                else throw Error("Can't handle error")
            }
        }
        else throw Error(`Attempted content swap before models(${modelsReady}) and/or views(${viewsReady}) were ready`);
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
}