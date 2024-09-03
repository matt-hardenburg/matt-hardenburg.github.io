var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//dynamicLoading.ts
import { templatesCache } from "./main.js";
export function loadPageTemplate(templateName) {
    return __awaiter(this, void 0, void 0, function* () {
        const rootDiv = document.getElementById("root");
        if (!rootDiv)
            throw Error("<div \"id=root\"></div> is null");
        //fade current content
        rootDiv.classList.add('fade-out');
        yield new Promise((resolve) => setTimeout(resolve, 500));
        //attempt content swap
        try {
            let template;
            if (templatesCache[templateName]) //check if preloaded
             {
                template = templatesCache[templateName];
            }
            else //content not loaded
             {
                const response = yield fetch(`./src/templates/pages/${templateName}.html`);
                template = yield response.text();
                templatesCache[templateName] = template;
            }
            //swap content
            rootDiv.innerHTML = template;
            rootDiv.classList.remove('fade-out');
            rootDiv.classList.add('fade-in');
            setTimeout(() => rootDiv.classList.remove('fade-in'), 500);
            //assign page marker in session storage
            const contentElement = document.getElementById('root').firstElementChild;
            const pageID = contentElement.dataset.page;
            if (pageID)
                sessionStorage.setItem('lastVisitedPage', pageID);
            else
                throw Error("could not locate page id");
            //navbar logic
            if (templateName == "home")
                linkHomeButtonsToPages();
            else
                yield loadNavbar();
        }
        catch (e) {
            if (e instanceof Error)
                console.error(e.message);
            else
                throw Error("Can't handle error");
        }
    });
}
function linkHomeButtonsToPages() {
    const aboutButton = document.getElementById('aboutButtonHome');
    const resumeButton = document.getElementById('resumeButtonHome');
    const portfolioButton = document.getElementById('portfolioButtonHome');
    const contactButton = document.getElementById('contactButtonHome');
    aboutButton.addEventListener('click', () => { loadPageTemplate("about"); });
    resumeButton.addEventListener('click', () => { loadPageTemplate("resume"); });
    portfolioButton.addEventListener('click', () => { loadPageTemplate("portfolio"); });
    contactButton.addEventListener('click', () => { loadPageTemplate("contact"); });
}
function loadNavbar() {
    return __awaiter(this, void 0, void 0, function* () {
        const navBarExists = !!document.getElementById('navbar');
        if (navBarExists)
            return;
        const rootDiv = document.getElementById('root');
        const rootContents = rootDiv.innerHTML;
        const navbarResponse = yield fetch("./src/templates/components/navbar.html");
        if (navbarResponse.ok)
            rootDiv.innerHTML = (yield navbarResponse.text()) + rootContents;
        const homeButton = document.getElementById('homeButton');
        const aboutButton = document.getElementById('aboutButton');
        const resumeButton = document.getElementById('resumeButton');
        const portfolioButton = document.getElementById('portfolioButton');
        const contactButton = document.getElementById('contactButton');
        homeButton.addEventListener('click', () => { loadPageTemplate("home"); });
        aboutButton.addEventListener('click', () => { loadPageTemplate("about"); });
        resumeButton.addEventListener('click', () => { loadPageTemplate("resume"); });
        portfolioButton.addEventListener('click', () => { loadPageTemplate("portfolio"); });
        contactButton.addEventListener('click', () => { loadPageTemplate("contact"); });
    });
}
