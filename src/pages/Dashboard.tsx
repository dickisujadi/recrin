import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import CodePages from './Code';
import Repository from './Repository';

interface Menu {
  name: string,
  component: JSX.Element
}

export default function Dashboard() {
  const menus: Menu[] = [
    {
      name: 'Repositories',
      component: <Repository />
    },
    {
      name: 'Codes',
      component: <CodePages />
    }
  ]

  const [menu, setMenu] = useState<Menu>(menus[0])

  const changeMenuHandler = (newMenu : Menu) => {
    setMenu(currentMenu => newMenu);
  }

  return (
    <>
      <Header menuName={menu.name} />
      <div className='Menu-container'>
        {menus.map(menuObj => {
          return <div key={menuObj.name} className='Menu-item'>
            <Button variant={menuObj.name == menu.name? 'contained' : 'outlined'} onClick={() => changeMenuHandler(menuObj)}>{menuObj.name}</Button>
          </div>
        })}
      </div>
      {menu.component}
    </>
  );
}
