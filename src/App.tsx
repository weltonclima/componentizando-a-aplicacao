import { SideBar } from './components/SideBar';
import { Content } from './components/Content';

import './styles/global.scss';
import { CategoryProvider } from './hooks/useCategory';

export function App() {


  return (
    <CategoryProvider>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <SideBar />
        <Content />
      </div>
    </CategoryProvider>
  )
}