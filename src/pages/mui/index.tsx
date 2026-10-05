import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { LucideCheck } from 'lucide-react';
import PageHeader from "../../components/global/PageHeader";
import MuiThemeProvider from '../../providers/MuiThemeProvider';
import top100Films from './data/movies';

const MuiPage = () => {


	return (
		<MuiThemeProvider>
			<PageHeader text="MUI Components" />

			<div className="flex gap-4">
				<Button variant="contained" color='error' startIcon={<LucideCheck />} loadingIndicator >Hello world</Button>

				<Autocomplete
					disablePortal
					options={top100Films}
					sx={{ width: 300 }}
					renderInput={(params) => <TextField {...params} label="Movie" />}
				/>

			</div>
		</MuiThemeProvider>

	)
};

export default MuiPage;