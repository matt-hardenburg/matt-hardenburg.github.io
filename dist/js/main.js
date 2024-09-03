var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//main.ts
import { loadPageTemplate } from "./dynamicLoading.js";
export const templatesCache = {};
function initialPageLoad() {
    const lastVisitedPage = sessionStorage.getItem("lastVisitedPage"); //retrieve last visited page id from session storage
    if (!lastVisitedPage)
        loadPageTemplate("home");
    else
        loadPageTemplate(lastVisitedPage);
}
function preloadTemplates(templates) {
    return __awaiter(this, void 0, void 0, function* () {
        templates.forEach((element) => __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`./src/templates/pages/${element}.html`);
            if (response.ok)
                templatesCache[element] = yield response.text();
        }));
    });
}
preloadTemplates(["home", "about", "resume", "portfolio", "contact"]);
document.addEventListener('DOMContentLoaded', initialPageLoad);
