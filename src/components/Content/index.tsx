import React from  'react';
import { Outlet } from 'react-router-dom';

import { Container } from './styles';


const Content: React.FC = () => {
  return (
    <Container>
      <Outlet/>
    </Container>
  )
}

export default Content;
