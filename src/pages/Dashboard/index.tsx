import React, { useState, useMemo } from  'react';

import ContentHeader from '../../components/ContentHeader';
import MessageBox from '../../components/MessageBox';
import SelectInput from '../../components/SelectInput';
import WalletBox from '../../components/WalletBox';
import PieChart from '../../components/PieChart';

import expenses from '../../repositories/expenses';
import gains from '../../repositories/gains';
import listOfMonths from '../../utils/months';

import happyImg from '../../assets/happy.svg';
import sadImg from '../../assets/sad.svg';
import grinning from '../../assets/grinning.svg';

import {
  Container,
  Content
} from './styles';


const Dashboard: React.FC = () => {
  const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth() + 1);
  const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear());

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

    [...expenses, ...gains].forEach(item => {
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

  },[]);

  const totalExpenses = useMemo(() => {
    let total: number = 0;
    expenses.forEach(item => {
      const date = new Date(item.date);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      if(month === monthSelected && year === yearSelected) {
        try {
          total += Number(item.amount);
        }catch {
          throw new Error('Invalid amount! Amount munt be number');
        }
      }
    });

    return total;
  }, [monthSelected, yearSelected]);

  const totalGains = useMemo(() => {
    let total: number = 0;
    gains.forEach(item => {
      const date = new Date(item.date);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      if(month === monthSelected && year === yearSelected) {
        try {
          total += Number(item.amount);
        }catch {
          throw new Error('Invalid amount! Amount munt be number');
        }
      }
    });

    return total;
  }, [monthSelected, yearSelected]);

  const totalBalance = useMemo(() => {
    return totalGains - totalExpenses;
  }, [totalGains, totalExpenses]);

  const message = useMemo(() => {
    if(totalBalance < 0) {
      return {
        title: 'Que triste!',
        description: 'Neste mês você gastou mais do que o deveria.',
        footerText: 'Verifique seus gastos e tente cortar algumas coisas desnecessárias',
        icon: sadImg,
      }
    }
    else if(totalBalance === 0) {
      return {
        title: 'Ufaa!',
        description: 'Neste mês você gastou exatamente o que ganhou.',
        footerText: 'tenha cuidado. No próximo tente poupar o seu dinheiro.',
        icon: grinning,
      }
    }
    else {
      return {
        title: 'Muito bem!',
        description: 'Sua carteira está positiva!',
        footerText: 'Continue assim. Considere investir o seu saldo.',
        icon: happyImg,
      }
    }
  }, [totalBalance]);
  
  const handleMonthSelected = (month: string) => {
    try {
      const parseMonth = Number(month);
      setMonthSelected(parseMonth);
    }
    catch(error) {
      throw new Error('invalid month value')
    }
  }

  const handleYearSelected = (year: string) => {
    try {
      const parseYear = Number(year);
      setYearSelected(parseYear);
    }
    catch {
      throw new Error('invalid year value')
    }
  }

  return (
    <Container>
      < ContentHeader title="Dashboard" lineColor='#F7931B'>
        <SelectInput
            options={months}
            onChange={(e) => handleMonthSelected(e.target.value)} defaultValue={monthSelected}
          />
          <SelectInput
            options={years}
            onChange={(e) => handleYearSelected(e.target.value)} defaultValue={yearSelected}
          />
      </ContentHeader>

      <Content>
        <WalletBox
          title='saldo'
          color='#4E41F0'
          amount={totalBalance}
          footerLabel={'atualizado com base nas entradas e saídas'}
          icon='dolar'
        />
        <WalletBox
          title='entradas'
          color='#F7931B'
          amount={totalGains}
          footerLabel={'atualizado com base nas entradas e saídas'}
          icon='arrowUp'
        />
        <WalletBox
          title='saídas'
          color='#E44C4E'
          amount={totalExpenses}
          footerLabel={'atualizado com base nas entradas e saídas'}
          icon='arrowDown'
        />
        <MessageBox
          title={message.title}
          description={message.description}
          footerText={message.footerText}
          icon={message.icon}
        />

        <PieChart />
      </Content>
    </Container>
  )
}

export default Dashboard;
