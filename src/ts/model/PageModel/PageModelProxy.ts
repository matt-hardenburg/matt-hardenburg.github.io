//PageModelProxy.ts
import { AboutModel } from "./AboutModel.js";
import { ContactModel } from "./ContactModel.js";
import { HomeModel } from "./HomeModel.js";
import { PageModel } from "./PageModel.js";
import { PageModelNullObject } from "./PageModelNullObject.js";
import { PortfolioModel } from "./PortfolioModel.js";
import { ResumeModel } from "./ResumeModel.js";

const title: string = 'PageModelProxy';
const content: string = '';
const loadableModels: { [key: string]: new (title: string, content: string) => PageModel } = {
    'home': HomeModel,
    'about': AboutModel,
    'resume': ResumeModel,
    'portfolio': PortfolioModel,
    'contact': ContactModel
};

export class PageModelProxy extends PageModel
{
    private static instance: PageModelProxy;
    private modelCache: {[key: string]: PageModel} = {}

    constructor()
    {
        super(title, content);
    }

    private async loadModels(): Promise<void>
    {
        const modelPromises: Promise<void>[] = Object.keys(loadableModels).map(async modelID => {
            var modelResponse: Response = await fetch(`./src/templates/pages/${modelID}.html`)
            if (modelResponse.ok)
            {
                var modelContent: string = await modelResponse.text();
                this.modelCache[modelID] = new loadableModels[modelID](`Matthew Hardenburg - ${this.capitalize(modelID)}`, modelContent);
            }
            else throw Error(`Unable to retreive response for ${modelID}`);
        });
        await Promise.all(modelPromises)
    }

    private capitalize(str: string): string 
    {
        return str[0].toUpperCase() + str.slice(1);
    }

    public async validateModels(): Promise<boolean>
    {
        await this.loadModels();
        //console.debug(`Expected models: ${Object.keys(loadableModels).length}\nLoaded models: ${ Object.keys(this.modelCache).length}`);
        return Object.keys(this.modelCache).length == Object.keys(loadableModels).length;
    }

    public static getInstance(): PageModelProxy
    {
        if(!PageModelProxy.instance) PageModelProxy.instance = new PageModelProxy();
        return PageModelProxy.instance;
    }

    public loadModel(modelID: string): PageModel
    {
        return (!this.modelCache[modelID]) ? new PageModelNullObject() : this.modelCache[modelID] ;
    }

}