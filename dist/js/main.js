//main.ts
import { PageController } from "./controller/PageController.js";
export var sessionMarkers;
(function (sessionMarkers) {
    sessionMarkers["lastVisitedPage"] = "lastVisitedPage";
})(sessionMarkers || (sessionMarkers = {}));
const pageController = PageController.getInstance();
document.addEventListener('DOMContentLoaded', pageController.initialPageLoad());
