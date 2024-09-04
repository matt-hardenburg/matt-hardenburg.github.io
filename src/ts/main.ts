//main.ts
import { PageController } from "./controller/PageController.js";

const pageController: PageController = PageController.getInstance();

pageController.preloadTemplates(["home", "about", "resume", "portfolio", "contact"]);
document.addEventListener('DOMContentLoaded', pageController.initialPageLoad());