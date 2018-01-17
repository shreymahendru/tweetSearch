export interface TwitterService
{
    getTweets(query: string): Promise<Tweet[]>
}

export interface Tweet
{
    id: string;
    text: string;
    username: string;
    link: string;
    profile_pic: string;
}

export interface TwitterConfig
{
    consumer_key: string;
    consumer_secret: string;
    access_token_key: string;
    access_token_secret: string;
}