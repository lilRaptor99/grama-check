import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const Login = () => {
    return (
        <div>
            <h3>Login</h3>
            <div className="my-4">
                <Box component="form" noValidate autoComplete="off">
                    <TextField id="standard-basic" label="Standard" variant="standard" />
                </Box>
            </div>
            <p>Don't have an account? <Link to={'signup'}>Sign up</Link> </p>
        </div>
    );
};

export default Login;