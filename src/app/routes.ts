import App from './Bookmarks/App';

type BookmarksRoute = {
  path: '/browse' | '/boards',
  component: React.ComponentType<any>
}

export const routes: BookmarksRoute[] = [
  {
    path: '/boards', 
    component: App
  }
]
