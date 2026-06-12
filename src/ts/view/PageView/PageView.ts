import { PageController } from "../../controller/PageController.js";
import { sessionMarkers } from "../../main.js";
import { PageModel } from "../../model/PageModel/PageModel.js";

//PageView.ts
export interface PageViewIF
{
    render(model: PageModel): void;
}

export abstract class PageView implements PageViewIF
{
    protected rootDiv: HTMLElement | null = null;

    constructor(){}

    protected ensureRootDiv(): void
    {
        if (!this.rootDiv)
        {
            const el = document.getElementById('root');
            if (!el) throw Error("Root element '#root' not found.");
            this.rootDiv = el as HTMLElement;
        }
    }

    public render(model: PageModel): void //default render implementatation
    {
        this.ensureRootDiv();
        const root = this.rootDiv as HTMLElement;
        root.classList.add('fade-out'); //fade current content

        setTimeout(async () => {
            document.title = `${model.getTitle()}`;
            root.innerHTML = model.getContent();
            
            this.updatePageMarker();
            root.classList.remove('fade-out');
            root.classList.add('fade-in');
            setTimeout(() => root.classList.remove('fade-in'), 500);
        }, 500);
    }

    protected updatePageMarker() 
    {
        this.ensureRootDiv();
        const root = this.rootDiv as HTMLElement;
        const contentElement: HTMLElement = root.firstElementChild as HTMLElement;
        if (!contentElement) throw Error("Content element is null or not properly rendered.");

        const pageID: string | undefined = contentElement.dataset.page;
        if (pageID) sessionStorage.setItem(sessionMarkers.lastVisitedPage, pageID);
        else sessionStorage.setItem(sessionMarkers.lastVisitedPage, 'home');
    }
}