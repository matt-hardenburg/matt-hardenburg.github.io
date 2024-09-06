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
    protected rootDiv: HTMLElement = document.getElementById('root') as HTMLElement;

    constructor(){}

    public render(model: PageModel): void //default render implementatation
    {
        this.rootDiv.classList.add('fade-out'); //fade current content

        setTimeout(async () => {
            document.title = `${model.getTitle()}`;
            this.rootDiv.innerHTML = model.getContent();

            if (!(!!document.getElementById('navbar'))) 
            {
                var rootContent: string = this.rootDiv.innerHTML;
                var navBarResponse: Response = await fetch('./src/templates/components/navbar.html');
                if (navBarResponse.ok) this.rootDiv.innerHTML = await navBarResponse.text() + rootContent;
                PageController.getInstance().linkNavbarButtons();
            }
            
            this.updatePageMarker();
            this.rootDiv.classList.remove('fade-out');
            this.rootDiv.classList.add('fade-in');
            setTimeout(() => this.rootDiv.classList.remove('fade-in'), 500);
        }, 500);
    }

    protected updatePageMarker() 
    {
        const contentElement: HTMLElement = this.rootDiv!.firstElementChild as HTMLElement;
        if (!contentElement) throw Error("Content element is null or not properly rendered.");

        const pageID: string | undefined = contentElement.dataset.page;
        if (pageID) sessionStorage.setItem(sessionMarkers.lastVisitedPage, pageID);
        else sessionStorage.setItem(sessionMarkers.lastVisitedPage, 'home');
    }
}