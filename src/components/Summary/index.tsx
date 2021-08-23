import incomeImg from '../../assets/entradas.svg';
import outcomeIMG from '../../assets/saidas.svg';
import total from '../../assets/total.svg';
import { Container } from "./styles";
import React,{ useContext } from 'react';
//import { TransactionsContext } from '../../TransactionsContext';
import { useTransactions } from '../../hooks/useTransactions';

export function Summary(){

const {transactions} = useTransactions();

//const totalDeposits = transactions.reduce((acc,transaction)=>{
   // if(transaction.type ==='deposit'){
      //  return acc + transaction.amount;
    //}
    //return acc;
//},0);

const summary = transactions.reduce((acc,transaction)=>{
if(transaction.type ==='deposit'){
    acc.deposits += transaction.amount;
    acc.total += transaction.amount;
}else{
    acc.withdraws += transaction.amount;
    acc.total -= transaction.amount;
}
return acc;
},{
    deposits:0,
    withdraws: 0,
    total:0,
})



    return(
        <Container>
            <div>
                <header>
                    <p>Entrada</p>
                    <img src={incomeImg} alt="Entradas"/>
                </header>
                <strong> {new Intl.NumberFormat('pt-BR',{
                                   style:'currency',
                                   currency:'BRL'
                               }).format( summary.deposits)}
                               </strong>
            </div>
            <div>
                <header>
                    <p>Saidas</p>
                    <img src={outcomeIMG} alt="Saidas"/>
                </header>
                <strong>-{new Intl.NumberFormat('pt-BR',{
                                   style:'currency',
                                   currency:'BRL'
                               }).format( summary.withdraws)}
                    
                    </strong>
            </div>
            <div className="highlight-backgroundya">
                <header>
                    <p>Total</p>
                    <img src={total} alt="Total"/>
                </header>
                <strong> 
                {new Intl.NumberFormat('pt-BR',{
                                   style:'currency',
                                   currency:'BRL'
                               }).format( summary.total)}
                    
                    
                     </strong>
            </div>
        </Container>
    );
}
    
