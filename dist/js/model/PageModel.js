//PageModel.ts
export class PageModel {
    constructor(_title, _content) {
        this._title = _title;
        this._content = _content;
        this.title = _title;
        this.content = _content;
    }
    getTitle() { return this.title[0].toUpperCase() + this.title.slice(1); }
    getContent() { return this.content; }
}
