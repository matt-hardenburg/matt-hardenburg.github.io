//PageController.ts
import { PageModelProxy } from "../model/PageModel/PageModelProxy.js";
import { setPage, waitUntilReady } from "../ui/appState.js";

export class PageController
{
    private static instance: PageController;
    private rootID = 'root';
    private modelProxy: PageModelProxy;

    constructor() 
    {
        this.modelProxy = PageModelProxy.getInstance();
    }

    public static getInstance(): PageController
    {
        if (!PageController.instance) PageController.instance = new PageController();
        return PageController.instance;
    }

    public async init(): Promise<void>
    {
        await waitUntilReady();
        await this.modelProxy.validateModels();
    }

    public async initialPageLoad(): Promise<void> 
    {
        await this.init();
        const lastVisitedPage: string | null = sessionStorage.getItem("lastVisitedPage"); //retrieve last visited page id from session storage
        if (!lastVisitedPage) await this.loadPageTemplate("home");
        else await this.loadPageTemplate(lastVisitedPage);
    }

    public async loadPageTemplate(templateName: string): Promise<void> 
    {
        await waitUntilReady();
        await this.modelProxy.validateModels();
        try {
            // push page key to React app; React renders component for this key
            setPage(templateName);
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