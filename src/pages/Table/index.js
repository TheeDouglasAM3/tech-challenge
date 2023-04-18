import { useEffect, useRef, useState } from 'react'
import { v4 as uuid } from 'uuid'
import io from "socket.io-client";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField'
import { useUser } from '../../hooks/UserContext';
import { Link } from "react-router-dom";

export default function TablePage(){
    const socketIo = useRef(null);
    const [listClients, setListClients] = useState([])
    const [filter, setFilter] = useState('')
    const ENDPOINT = `http://${window.location.hostname}:3003`;
    const {setUser} = useUser()

    useEffect(() => {
        socketIo.current = io(ENDPOINT);
    
        socketIo.current.on(
            "client-connected",
            (client) => setUser(client)
          );

        socketIo.current.on("market-data", (data) => {
            console.log('oi')
            setListClients(previousState => [...previousState, data])
        });
    
        return () => socketIo.current.disconnect();
      }, []);

    function filterByString(row) {
        let isIncluded = false
        for (let prop in row) {
            if (Object.prototype.hasOwnProperty.call(row, prop)) {
                if(row[prop].toLowerCase().includes(filter.toLowerCase())) {
                    isIncluded = true
                }
            }
        }
        return isIncluded
    }

    return (
        <div>
            <Link to='/user'>usuario</Link>
            <TextField id="outlined-basic" label="Filtro" variant="outlined" value={filter} onChange={(e) => setFilter(e.currentTarget.value)}/>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Account Name</TableCell>
                        <TableCell align="right">Amount</TableCell>
                        <TableCell align="right">Credit Card Cvv</TableCell>
                        <TableCell align="right">Credit Card Issue</TableCell>
                        <TableCell align="right">Credit Card Number</TableCell>
                        <TableCell align="right">Currency Name</TableCell>
                        <TableCell align="right">Transaction Description</TableCell>
                        <TableCell align="right">Transaction Type</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {listClients.filter(row => filterByString(row)).map((row) => (
                        <TableRow
                        key={uuid()}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.account_name}
                            </TableCell>
                            <TableCell align="right">{row.amount}</TableCell>
                            <TableCell align="right">{row.credit_card_cvv}</TableCell>
                            <TableCell align="right">{row.credit_card_issuer}</TableCell>
                            <TableCell align="right">{row.credit_card_number}</TableCell>
                            <TableCell align="right">{row.currency_name}</TableCell>
                            <TableCell align="right">{row.transaction_description}</TableCell>
                            <TableCell align="right">{row.transaction_type}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}