import Home from './Bookmarks/scenes/Overview/Overview'
import App from './Bookmarks/App';

type BookmarksRoute = {
  path: '/browse' | '/boards',
  component: React.ComponentType<any>
}

export const routes: BookmarksRoute[] = [
  {
    path: '/browse',
    component: Home
  },
  {
    path: '/boards', 
    component: App
  }
]
