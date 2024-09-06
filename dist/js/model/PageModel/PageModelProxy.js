var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//PageModelProxy.ts
import { AboutModel } from "./AboutModel.js";
import { ContactModel } from "./ContactModel.js";
import { HomeModel } from "./HomeModel.js";
import { PageModel } from "./PageModel.js";
import { PageModelNullObject } from "./PageModelNullObject.js";
import { PortfolioModel } from "./PortfolioModel.js";
import { ResumeModel } from "./ResumeModel.js";
const title = 'PageModelProxy';
const content = '';
const loadableModels = {
    'home': HomeModel,
    'about': AboutModel,
    'resume': ResumeModel,
    'portfolio': PortfolioModel,
    'contact': ContactModel
};
export class PageModelProxy extends PageModel {
    constructor() {
        super(title, content);
        this.modelCache = {};
    }
    loadModels() {
        return __awaiter(this, void 0, void 0, function* () {
            const modelPromises = Object.keys(loadableModels).map((modelID) => __awaiter(this, void 0, void 0, function* () {
                var modelResponse = yield fetch(`./src/templates/pages/${modelID}.html`);
                if (modelResponse.ok) {
                    var modelContent = yield modelResponse.text();
                    this.modelCache[modelID] = new loadableModels[modelID](`Matthew Hardenburg - ${this.capitalize(modelID)}`, modelContent);
                }
                else
                    throw Error(`Unable to retreive response for ${modelID}`);
            }));
            yield Promise.all(modelPromises);
        });
    }
    capitalize(str) {
        return str[0].toUpperCase() + str.slice(1);
    }
    validateModels() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.loadModels();
            //console.debug(`Expected models: ${Object.keys(loadableModels).length}\nLoaded models: ${ Object.keys(this.modelCache).length}`);
            return Object.keys(this.modelCache).length == Object.keys(loadableModels).length;
        });
    }
    static getInstance() {
        if (!PageModelProxy.instance)
            PageModelProxy.instance = new PageModelProxy();
        return PageModelProxy.instance;
    }
    loadModel(modelID) {
        return (!this.modelCache[modelID]) ? new PageModelNullObject() : this.modelCache[modelID];
    }
}
