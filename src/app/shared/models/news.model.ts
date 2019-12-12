export interface INews {
    status: string;
    totalResults: number;
    articles: INewsArticles[];
}

export interface INewsArticles {
    source: INewsSource;
    author: string | null;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string | null;
}

export interface INewsSource {
    id: string | null;
    name: string;
}
