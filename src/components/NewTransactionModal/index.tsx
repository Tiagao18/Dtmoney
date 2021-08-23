import Modal from 'react-modal';
import {Container,TransactionTypeContainer,RadioBox} from './styles';
import CloseImg from '../../assets/vector.svg';
import income from '../../assets/entradas.svg';
import outcome from '../../assets/saidas.svg';
import { FormEvent, useState, useContext } from 'react';
import { api } from '../../Services/api';
//import { TransactionsContext } from '../../TransactionsContext';
import { useTransactions } from '../../hooks/useTransactions';

interface NewTransactionProps{
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewTransactionModal({isOpen, onRequestClose}:NewTransactionProps){
const {createTransaction} = useTransactions();
    
const[title,setTitle]=useState('');
const[amount,setAmount]= useState(0);
const[category,setCategory]= useState('');

const[type,setType]=useState('deposit');

async function handleCreateNewTransaction(event: FormEvent)
{
event.preventDefault();


await createTransaction({
    title,
    amount,
    category,
    type,

})

setTitle('');
setAmount(0);
setCategory('');
onRequestClose();
setType('deposit');
 onRequestClose();
}

return(
    <Modal 
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    overlayClassName="react-modal-overlay"
    className="react-modal-content"
    >
        <button type="button" 
        onClick={onRequestClose}
        className="react-modal-close"
        >
        <img src={CloseImg} alt="fechar modal"/>
        </button>
    
    <Container onSubmit={handleCreateNewTransaction}>
    <h2>Cadastrar Transacao</h2>

    <input 
    placeholder="Título"
    value={title}
    onChange= {event => setTitle(event.target.value)}
    />

    <input 
    type="number"
    placeholder="Valor"
    value={amount}
    onChange= {event => setAmount(Number(event.target.value))}
    />

    <TransactionTypeContainer>
        <RadioBox type="button"
        
        onClick={()=>{ setType('deposit');}}
        isActive={type ==='deposit'}
        activeColor= "green"
        >
           <img src={income} alt="Entradas"/>
           <span>Entrada</span>
        </RadioBox>

        <RadioBox type="button"
                onClick={()=>{ setType('withdraw');}}
                isActive={type ==='withdraw'}
                activeColor= "red"


                >
           <img src={outcome} alt="Saida"/>
           <span>Saida</span>
        </RadioBox>

    </TransactionTypeContainer>

    <input
    placeholder="Categoria" 
    value={category}
    onChange= {event => setCategory(event.target.value)}
    />


    <button type ="submit">
    Cadastrar
    </button>

    </Container>
    </Modal>
);

}