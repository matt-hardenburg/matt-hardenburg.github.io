//PageController.ts
import { PageModel } from "../model/PageModel.js";
import { PageView } from "../view/PageView.js";

export class PageController
{
    private static instance: PageController;
    private pageCache: { [key: string]: PageModel } = {};
    private pageView: PageView;
    private rootID = 'root';

    constructor()
    {
        this.pageView = new PageView(this.rootID);
    }

    public static getInstance(): PageController
    {
        if (!PageController.instance) PageController.instance = new PageController;
        return PageController.instance;
    }

    public async preloadTemplates(templates: string[]): Promise<void>
    {
        templates.forEach(async element => {
            const response = await fetch(`./src/templates/pages/${element}.html`);
            if (response.ok) this.pageCache[element] = new PageModel(element, await response.text());
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
        if (!this.pageView.getRootDiv()) throw Error(`<div ${this.rootID}></div> is null`);

        //attempt content swap
        try {
            let model: PageModel;
            if (this.pageCache[templateName]) model = this.pageCache[templateName];
            else //content not pre-loaded
            {
                const response: Response = await fetch(`./src/templates/pages/${templateName}.html`);
                model = new PageModel(templateName, await response.text());
                this.pageCache[templateName] = model;
            }

            //swap content
            this.pageView.render(model);
        }
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
}