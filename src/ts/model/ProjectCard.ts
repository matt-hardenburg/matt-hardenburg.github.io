//ProjectCard.ts
export class ProjectCard
{
    private title: string;
    private description: string;
    private tags: [key: string];

    constructor(_title: string, _desc: string, _tags: [key: string])
    {
        this.title = _title;
        this.description = _desc;
        this.tags = _tags;
    }
}