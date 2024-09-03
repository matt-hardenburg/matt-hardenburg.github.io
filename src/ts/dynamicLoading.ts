//dynamicLoading.ts
import { templatesCache } from "./main.js";

export async function loadPageTemplate(templateName: string): Promise<void>
{
    const rootDiv: HTMLElement | null = document.getElementById("root");
    if (!rootDiv) throw Error("<div \"id=root\"></div> is null");

    //fade current content
    rootDiv.classList.add('fade-out');
    await new Promise((resolve) => setTimeout(resolve, 500));

    //attempt content swap
    try 
    {
        let template: string;
        if (templatesCache[templateName]) //check if preloaded
        {
            template = templatesCache[templateName];
        }
        else //content not loaded
        {
            const response: Response =  await fetch(`./src/templates/pages/${templateName}.html`);
            template = await response.text();
            templatesCache[templateName] = template;
        }

        //swap content
        rootDiv.innerHTML = template;
        rootDiv.classList.remove('fade-out');
        rootDiv.classList.add('fade-in');
        setTimeout(() => rootDiv.classList.remove('fade-in'), 500);

        //assign page marker in session storage
        const contentElement: HTMLElement = document.getElementById('root')!.firstElementChild as HTMLElement;
        const pageID: string | undefined = contentElement.dataset.page;
        if(pageID) sessionStorage.setItem('lastVisitedPage', pageID);
        else throw Error("could not locate page id")
        
        //navbar logic
        if (templateName == "home") linkHomeButtonsToPages();
        else await loadNavbar();
   }
    catch (e: unknown)
    {
        if (e instanceof Error) console.error(e.message);
        else throw Error("Can't handle error")
    }
}

function linkHomeButtonsToPages(): void
{
    const aboutButton: HTMLElement = document.getElementById('aboutButtonHome') as HTMLElement;
    const resumeButton: HTMLElement = document.getElementById('resumeButtonHome') as HTMLElement;
    const portfolioButton: HTMLElement = document.getElementById('portfolioButtonHome') as HTMLElement;
    const contactButton: HTMLElement = document.getElementById('contactButtonHome') as HTMLElement;
 
    aboutButton.addEventListener('click', () => { loadPageTemplate("about") });
    resumeButton.addEventListener('click', () => { loadPageTemplate("resume") });
    portfolioButton.addEventListener('click', () => { loadPageTemplate("portfolio") });
    contactButton.addEventListener('click', () => { loadPageTemplate("contact") });
}

async function loadNavbar(): Promise<void>
{
    const navBarExists: boolean = !!document.getElementById('navbar');
    if (navBarExists) return;

    const rootDiv: HTMLElement = document.getElementById('root') as HTMLElement;
    const rootContents: string = rootDiv.innerHTML;
    const navbarResponse: Response = await fetch("./src/templates/components/navbar.html");
    if (navbarResponse.ok) rootDiv.innerHTML = await navbarResponse.text() + rootContents;

    const homeButton: HTMLElement = document.getElementById('homeButton') as HTMLElement;
    const aboutButton: HTMLElement = document.getElementById('aboutButton') as HTMLElement;
    const resumeButton: HTMLElement = document.getElementById('resumeButton') as HTMLElement;
    const portfolioButton: HTMLElement = document.getElementById('portfolioButton') as HTMLElement;
    const contactButton: HTMLElement = document.getElementById('contactButton') as HTMLElement;
 
    homeButton.addEventListener('click', () => { loadPageTemplate("home") });
    aboutButton.addEventListener('click', () => { loadPageTemplate("about") });
    resumeButton.addEventListener('click', () => { loadPageTemplate("resume") });
    portfolioButton.addEventListener('click', () => { loadPageTemplate("portfolio") });
    contactButton.addEventListener('click', () => { loadPageTemplate("contact") });
}