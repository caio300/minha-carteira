import React, { useState } from  'react';
import logoImg from '../../assets/logo.svg';
import {
  MdDashboard,
  MdArrowDownward,
  MdArrowUpward,
  MdExitToApp,
  MdClose,
  MdMenu
} from 'react-icons/md'

import {
  Container,
  Header,
  LogImg,
  Title,
  MenuContainer,
  MenuItemLink,
  MenuItemButton,
  ToggleMenu,
} from './styles';

import { useAuth } from '../../hooks/auth';


const Aside: React.FC = () => {
  const { signOut } = useAuth();

  const [toggleMenuIsOpen, setToggleMenuIsOpen] = useState(false);

  const handleToggleMenu = () => {
    setToggleMenuIsOpen(!toggleMenuIsOpen);
  }

  return (
    <Container menuIsOpen={toggleMenuIsOpen}>
      <Header>
        <ToggleMenu onClick={handleToggleMenu}>
          {toggleMenuIsOpen ? <MdClose /> : <MdMenu />}
        </ToggleMenu>

        <LogImg src={logoImg} alt='Logo Minha Carteira' />
        <Title>Minha Carteira</Title>
      </Header>

      <MenuContainer>
        <MenuItemLink href='/'>
          <MdDashboard />
          Dashboard
        </MenuItemLink>

        <MenuItemLink href='/list/entry-balance'>
          <MdArrowUpward />
          Entradas
        </MenuItemLink>

        <MenuItemLink href='/list/exit-balance'>
          <MdArrowDownward />
          Saídas
        </MenuItemLink>

        <MenuItemButton onClick={signOut}>
          <MdExitToApp />
          Sair
        </MenuItemButton>
      </MenuContainer>
    </Container>
  )
}

export default Aside;
