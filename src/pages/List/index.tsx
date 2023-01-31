import React from  'react';
import ContentHeader from '../../components/ContentHeader';
import { Container } from './styles';
import SelectInput from '../../components/SelectInput/index';

const List: React.FC = () => {

  const options = [
    {value: 'Rodrigo', label: 'Rodrigo'},
    {value: 'Maria', label: 'Maria'},
    {value: 'Ana', label: 'Rodrigo'},
  ];

  return (
    <Container>
      <ContentHeader title="Saídas" lineColor='#E44C4E'>
        <SelectInput options={options} />
      </ContentHeader>
    </Container>
  )
}

export default List;
