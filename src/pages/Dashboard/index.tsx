import React, { useState, useMemo, useCallback } from  'react';

import ContentHeader from '../../components/ContentHeader';
import MessageBox from '../../components/MessageBox';
import SelectInput from '../../components/SelectInput';
import WalletBox from '../../components/WalletBox';
import PieChartBox from '../../components/PieChartBox';
import HistoryBox from '../../components/HistoryBox';
import BarChartBox from '../../components/BarChartBox';

import expenses from '../../repositories/expenses';
import gains from '../../repositories/gains';
import listOfMonths from '../../utils/months';

import happyImg from '../../assets/happy.svg';
import sadImg from '../../assets/sad.svg';
import grinningImg from '../../assets/grinning.svg';


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
    else if (totalGains === 0 && totalExpenses === 0) {
      return {
        title: 'Ops!',
        description: 'Neste mês, não há entradas ou saídas.',
        footerText: 'Parece que você não fez nenhum registro no mês e ano selecionado.',
        icon: grinningImg,
      }
    }
    else if(totalBalance === 0) {
      return {
        title: 'Ufaa!',
        description: 'Neste mês você gastou exatamente o que ganhou.',
        footerText: 'Tenha cuidado. No próximo tente poupar o seu dinheiro.',
        icon: grinningImg,
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
  }, [totalBalance, totalGains, totalExpenses]);

  const relationExpensesVersusGains = useMemo(() => {
    const total = totalGains + totalExpenses;

    const percentGains = Number(((totalGains / total) * 100).toFixed(1));
    const percentExpenses = Number(((totalExpenses / total) * 100).toFixed(1));

    const data = [
      {
        name: "Entradas",
        value: totalGains,
        percent: percentGains ? percentGains : 0,
        color: '#F7931B'
      },
      {
        name: 'Saídas',
        value: totalExpenses,
        percent: percentExpenses ? percentExpenses : 0,
        color: '#E44C4E'
      }
    ]
    
    return data;

  }, [totalGains, totalExpenses]);
  
  const historyData = useMemo(() => {
    return listOfMonths
    .map((_, month) => {
        
        let amountEntry = 0;
        gains.forEach(gain => {
            const date = new Date(gain.date);
            const gainMonth = date.getMonth();
            const gainYear = date.getFullYear();

            if(gainMonth === month && gainYear === yearSelected){
                try{
                    amountEntry += Number(gain.amount);
                }catch{
                    throw new Error('amountEntry is invalid. amountEntry must be valid number.')
                }
            }
        });

        let amountOutput = 0;
        expenses.forEach(expense => {
            const date = new Date(expense.date);
            const expenseMonth = date.getMonth();
            const expenseYear = date.getFullYear();

            if(expenseMonth === month && expenseYear === yearSelected){
                try{
                    amountOutput += Number(expense.amount);
                }catch{
                    throw new Error('amountOutput is invalid. amountOutput must be valid number.')
                }
            }
        });


        return {
            monthNumber: month,
            month: listOfMonths[month].substr(0, 3),
            amountEntry,
            amountOutput
        }
    })
    .filter(item => {
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        return (yearSelected === currentYear && item.monthNumber <= currentMonth) || (yearSelected < currentYear)
    });
},[yearSelected]);

  const relationExpensevesRecurrentVersusEventual = useMemo(() => {
    let amountRecurrent = 0;
    let amountEventual = 0;
    
    expenses.filter((expense) => {
      const date = new Date(expense.date);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      return month === monthSelected && year === yearSelected;
    })
    .forEach((expense) => {
      if (expense.frequency === 'recorrente') {
        return amountRecurrent += Number(expense.amount)
      }

      if (expense.frequency === 'eventual') {
        return amountEventual += Number(expense.amount)
      }
    });

    const total = amountEventual + amountRecurrent;

    const percenteRecurrent = Number(((amountRecurrent / total) * 100).toFixed(1));
    const percentEventual = Number(((amountEventual / total) * 100).toFixed(1));

    return [
      {
        name: 'Recorrante',
        amount: amountRecurrent,
        percent: percenteRecurrent ? percenteRecurrent : 0,
        color: '#F7931B'
      },
      {
        name: 'Eventual',
        amount: amountEventual,
        percent: percentEventual ? percentEventual : 0,
        color: '#E44C4E'
      }
    ]
  }, [monthSelected, yearSelected]);

  const relationGainsRecurrentVersusEventual = useMemo(() => {
    let amountRecurrent = 0;
    let amountEventual = 0;
    
    gains.filter((gain) => {
      const date = new Date(gain.date);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      return month === monthSelected && year === yearSelected;
    })
    .forEach((gain) => {
      if (gain.frequency === 'recorrente') {
        return amountRecurrent += Number(gain.amount)
      }

      if (gain.frequency === 'eventual') {
        return amountEventual += Number(gain.amount)
      }
    });

    const total = amountEventual + amountRecurrent;

    const percenteRecurrent = Number(((amountRecurrent / total) * 100).toFixed(1));
    const percentEventual = Number(((amountEventual / total) * 100).toFixed(1));

    return [
      {
        name: 'Recorrante',
        amount: amountRecurrent,
        percent: percenteRecurrent ? percenteRecurrent : 0,
        color: '#F7931B'
      },
      {
        name: 'Eventual',
        amount: amountEventual,
        percent: percentEventual ? percentEventual : 0,
        color: '#E44C4E'
      }
    ]
  }, [monthSelected, yearSelected]);


  const handleMonthSelected = useCallback((month: string) => {
    try {
      const parseMonth = Number(month);
      setMonthSelected(parseMonth);
    }
    catch(error) {
      throw new Error('invalid month value')
    }
  }, []);

  const handleYearSelected = useCallback((year: string) => {
    try {
      const parseYear = Number(year);
      setYearSelected(parseYear);
    }
    catch {
      throw new Error('invalid year value')
    }
  }, []);

  return (
    <Container>
      <ContentHeader title="Dashboard" lineColor='#F7931B'>
        <SelectInput
            options={months}
            onChange={(e) => handleMonthSelected(e.target.value)}
            defaultValue={monthSelected}
          />
          <SelectInput
            options={years}
            onChange={(e) => handleYearSelected(e.target.value)}
            defaultValue={yearSelected}
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

        <PieChartBox data={relationExpensesVersusGains}/>

        <HistoryBox
          data={historyData}
          lineColorAmountEntry='#F7931B'
          lineColorAmountOutput='#E44C4E'
        />

        <BarChartBox
          data={relationExpensevesRecurrentVersusEventual}
          title='Saídas'
        />
        
        <BarChartBox
          data={relationGainsRecurrentVersusEventual}
          title='Entradas'
        />

      </Content>
    </Container>
  )
}

export default Dashboard;
