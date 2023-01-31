import React from  'react';
import ContentHeader from '../../components/ContentHeader';
import { Container, Content } from './styles';
import SelectInput from '../../components/SelectInput/index';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';

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
      <Content>
        <HistoryFinanceCard
          cardColor='#313862'
          tagColor='#E44C4E'
          title='Conta de Luz'
          subtitle='25/07/2023'
          amount='R$ 130,00'
        />

        <HistoryFinanceCard
          cardColor='#313862'
          tagColor='#E44C4E'
          title='Conta de Luz'
          subtitle='25/07/2023'
          amount='R$ 130,00'
        />

        <HistoryFinanceCard
          cardColor='#313862'
          tagColor='#E44C4E'
          title='Conta de Luz'
          subtitle='25/07/2023'
          amount='R$ 130,00'
        />

        <HistoryFinanceCard
          cardColor='#313862'
          tagColor='#E44C4E'
          title='Conta de Luz'
          subtitle='25/07/2023'
          amount='R$ 130,00'
        />

        <HistoryFinanceCard
          cardColor='#313862'
          tagColor='#E44C4E'
          title='Conta de Luz'
          subtitle='25/07/2023'
          amount='R$ 130,00'
        />

        <HistoryFinanceCard
          cardColor='#313862'
          tagColor='#E44C4E'
          title='Conta de Luz'
          subtitle='25/07/2023'
          amount='R$ 130,00'
        />

        <HistoryFinanceCard
          cardColor='#313862'
          tagColor='#E44C4E'
          title='Conta de Luz'
          subtitle='25/07/2023'
          amount='R$ 130,00'
        />

        <HistoryFinanceCard
          cardColor='#313862'
          tagColor='#E44C4E'
          title='Conta de Luz'
          subtitle='25/07/2023'
          amount='R$ 130,00'
        />
        <HistoryFinanceCard
          cardColor='#313862'
          tagColor='#E44C4E'
          title='Conta de Luz'
          subtitle='25/07/2023'
          amount='R$ 130,00'
        />

        <HistoryFinanceCard
          cardColor='#313862'
          tagColor='#E44C4E'
          title='Conta de Luz'
          subtitle='25/07/2023'
          amount='R$ 130,00'
        />

        <HistoryFinanceCard
          cardColor='#313862'
          tagColor='#E44C4E'
          title='Conta de Luz'
          subtitle='25/07/2023'
          amount='R$ 130,00'
        />
      </Content>
    </Container>
  )
}

export default List;
