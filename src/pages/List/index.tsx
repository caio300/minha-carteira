import React, { useMemo, useState, useEffect } from  'react';
import { useParams } from 'react-router-dom';
import { Container, Content, Filters } from './styles';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput/index';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';

import gains from '../../repositories/gains'
import expenses from '../../repositories/expenses';

interface IData {
  id: string;
  description: string;
  amountFormatted: string;
  frequency: string;
  dateFormatted: string;
  tagColor: string;
}

const List: React.FC = () => {
  const [data, setData] = useState<IData[]>([]);

  const { type } = useParams();

  const title = useMemo(() => {
    return type === 'entry-balance' ? 'Entradas' : 'Saídas';
  }, [type]);

  const lineColor = useMemo(() => {
    return type === 'entry-balance' ? '#F7931B' : '#E44C4E';
  }, [type])

  const listData = useMemo(() => {
    return type === 'entry-balance' ? gains : expenses;
  }, [type]);

  useEffect(() => {
    const response = listData.map(item => {
      return {
        id: String(Math.random() * data.length),
        description: item.description,
        amountFormatted: item.amount,
        frequency: item.frequency,
        dateFormatted: item.date,
        tagColor: item.frequency === 'recorrente' ? '#4E41F0' : '#E44C4E'
      }
    })
    setData(response);
  }, []);

  const months = [
    {value: 7, label: 'Julho'},
    {value: 8, label: 'Agosto'},
    {value: 9, label: 'Setembro'},
  ];

  const years = [
    {value: 2020, label: 2020},
    {value: 2019, label: 2019},
    {value: 2018, label: 2018},
  ];

  return (
    <Container>
      <ContentHeader title={title} lineColor={lineColor}>
        <SelectInput options={months} />
        <SelectInput options={years} />
      </ContentHeader>

      <Filters>
        <button
          type='button'
          className='tag-filter tag-filter-recurrent'
        >
          Recorrentes
        </button>
        <button
          type='button'
          className='tag-filter tag-filter-eventual'
        >
          Eventuais
        </button>
      </Filters>

      <Content>
       {  
          data.map(item => (
            <HistoryFinanceCard
              key={item.id}
              tagColor= {item.tagColor}
              title={item.description}
              subtitle={item.dateFormatted}
              amount={item.amountFormatted}
            />
          ))
        }
      </Content>
    </Container>
  )
}

export default List;
