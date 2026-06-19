//main.ts
import '../scss/main.scss'
import { PageController } from "./controller/PageController.js";

export enum sessionMarkers //to prevent typos
{
    lastVisitedPage = 'lastVisitedPage'
}

const pageController: PageController = PageController.getInstance();
document.addEventListener('DOMContentLoaded', async () => { await pageController.initialPageLoad(); });