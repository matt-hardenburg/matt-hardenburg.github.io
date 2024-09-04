//PageModel.ts
export class PageModel
{
    private title: string;
    private content: string;

    constructor(public _title: string, public _content: string)
    {
        this.title = _title;
        this.content = _content;
    }

    public getTitle(): string { return this.title[0].toUpperCase() + this.title.slice(1); }

    public getContent(): string { return this.content; }
}