//main.ts
import { loadPageTemplate } from "./dynamicLoading.js";

export const templatesCache: { [key: string]: string } = {};

function initialPageLoad(): void
{
   const lastVisitedPage: string | null = sessionStorage.getItem("lastVisitedPage"); //retrieve last visited page id from session storage
   if(!lastVisitedPage) loadPageTemplate("home");
   else loadPageTemplate(lastVisitedPage);
}

async function preloadTemplates(templates: string[]): Promise<void>
{
   templates.forEach(async element => {
      const response = await fetch(`./src/templates/pages/${element}.html`);
      if (response.ok) templatesCache[element] = await response.text(); 
   });
}

preloadTemplates(["home", "about", "resume", "portfolio", "contact"]);
document.addEventListener('DOMContentLoaded', initialPageLoad);