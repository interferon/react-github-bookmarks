import { fetch_json, BookmarksError } from "../helpers/fetch";
import { Either } from "fp-ts/lib/Either";


type GitHubSearchResp = {
  total_count: number;
  incomplete_results: boolean;
  items: GithubRepo[];
}

type GithubRepo = {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  owner: {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    received_events_url: string;
    type: string;
  };
  private: boolean;
  html_url: string;
  description: string;
  fork: boolean;
  url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  homepage: string;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string;
  forks_count: number;
  open_issues_count: number;
  master_branch: string;
  default_branch: string;
  score: number;
}

export const search_repositories = (creds: {token: string}, query: string): Promise<Either<BookmarksError, GithubRepo[]>> => {
    const url = `https://api.github.com/search/repositories?q=${query}&sort=stars&order=desc`;
    return fetch_json<GitHubSearchResp>(url, {}).then(respE => respE.map(_ => _.items));
}