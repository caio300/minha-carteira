import React, { useMemo, useState, useEffect } from  'react';
import { v4 as uuidv4 } from 'uuid';
import { useParams } from 'react-router-dom';
import { Container, Content, Filters } from './styles';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput/index';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';

import gains from '../../repositories/gains'
import expenses from '../../repositories/expenses';
import formatCurrency from '../../utils/formatCurrency';
import formatDate from '../../utils/fomratDate';
import listOfMonths from '../../utils/months';

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
  const [monthSelected, setMonthSelected] = useState<string>(String(new Date().getMonth() + 1));
  const [yearSelected, setYearSelected] = useState<string>(String(new Date().getFullYear()));
  const [selectedFrequency, serSelectedFrequency] = useState(['recorrente', 'eventual'])

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

  const months = useMemo(() => {

    return listOfMonths.map((month, index) => {
      return {
        value: index + 1,
        label: month,
      };
    });
  },[]);

  const years = useMemo(() => {
    let uniqueYears: number[] = [];

    listData.forEach(item => {
      const date = new Date(item.date);
      const year = date.getFullYear();

      if(!uniqueYears.includes(year)) {
        uniqueYears.push(year);
      }
    });

    return uniqueYears.map(year => {
      return {
        value: year,
        label: year,
      }
    });

  },[listData]);

  const handleFrequencyClick = (frequency: string) => {
    const alreadySelected = selectedFrequency.findIndex(item => item === frequency);

    if(alreadySelected >= 0) {
      const filtered = selectedFrequency.filter(item => item != frequency)
      serSelectedFrequency(filtered);
    } else {
        serSelectedFrequency((prev) => [...prev, frequency]);
    }
  }

  useEffect(() => {

    const filteredData = listData.filter(item => {
      const date = new Date(item.date);
      const month = String(date.getMonth() + 1);
      const year = String(date.getUTCFullYear());

      return month === monthSelected && year === yearSelected && selectedFrequency.includes(item.frequency);
    });

    const formatedData = filteredData.map(item => {
      return {
        id: uuidv4(),
        description: item.description,
        amountFormatted: formatCurrency(Number(item.amount)),
        frequency: item.frequency,
        dateFormatted: formatDate(item.date),
        tagColor: item.frequency === 'recorrente' ? '#4E41F0' : '#E44C4E'
      }
    })
    
    setData(formatedData);
  }, [listData, monthSelected, yearSelected, selectedFrequency]);


  return (
    <Container>
      <ContentHeader title={title} lineColor={lineColor}>
        <SelectInput options={months} onChange={(e) => setMonthSelected(e.target.value)} defaultValue={monthSelected}/>
        <SelectInput options={years} onChange={(e) => setYearSelected(e.target.value)} defaultValue={yearSelected}/>
      </ContentHeader>

      <Filters>
        <button
          type='button'
          className={`tag-filter tag-filter-recurrent
          ${selectedFrequency.includes('recorrente') && 'tag-actived'}`}
          onClick={() => handleFrequencyClick('recorrente')}
        >
          Recorrentes
        </button>
        <button
          type='button'
          className={`tag-filter tag-filter-eventual
          ${selectedFrequency.includes('eventual') && 'tag-actived'}`}
          onClick={() => handleFrequencyClick('eventual')}
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
