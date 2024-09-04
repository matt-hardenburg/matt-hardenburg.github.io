import { PageController } from "../controller/PageController.js";
import { PageModel } from "../model/PageModel.js";

//PageView.ts
export class PageView
{
    private rootDiv: HTMLElement;

    constructor(rootID: string)
    {
        this.rootDiv = document.getElementById(rootID) as HTMLElement;
        if (!this.rootDiv) throw Error(`<div "id=${rootID}"></div> is null`)
    }

    public render(model: PageModel): void
    {
        this.rootDiv.classList.add('fade-out'); //fade current content

        setTimeout(() => {
            document.title = `Matthew Hardenburg - ${model.getTitle()}`;
            this.rootDiv.innerHTML = model.getContent();
            this.loadNavbar();
            this.updatePageMarker();
            this.rootDiv.classList.remove('fade-out');
            this.rootDiv.classList.add('fade-in');
            setTimeout(() => this.rootDiv.classList.remove('fade-in'), 500);
        }, 500);
    }

    public async loadNavbar()
    {
        const navBarExists: boolean = !!document.getElementById('navbar');
        if (navBarExists) return;
        var rootContent: string = this.rootDiv.innerHTML;
        var navBarResponse: Response = await fetch('./src/templates/components/navbar.html');
        if (navBarResponse.ok) this.rootDiv.innerHTML = await navBarResponse.text() + rootContent;
        PageController.getInstance().linkNavbarButtons();
    }

    public getRootDiv(): HTMLElement { return this.rootDiv; }

    private updatePageMarker() {
        const contentElement: HTMLElement = this.getRootDiv()!.firstElementChild as HTMLElement;
        if (!contentElement) {
            console.error("Content element is null or not properly rendered.");
            return;
        }

        const pageID: string | undefined = contentElement.dataset.page;
        if (pageID) sessionStorage.setItem('lastVisitedPage', pageID);
        else throw Error("could not locate page id")
    }
}