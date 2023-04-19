
import { useUser } from '../../hooks/UserContext';
import { Link } from "react-router-dom";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


export default function UserPage(){
    const {user} = useUser()
    return (
        <div>
            <Link to='/'>tabela</Link>
            {user && (
                <Card sx={{ minWidth: 275, maxWidth: 600, marginTop: 2 }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Id Cliente: {user.client_id}
                        </Typography>
                        <Typography variant="h5" component="div">
                            {user.first_name}
                        </Typography>
                        <Typography variant="body2">
                        job: {user.job}
                            <br />
                            description job: {user.job_descriptor}
                        </Typography>
                    </CardContent>
                </Card>
            )}
            
        </div>
    );
}