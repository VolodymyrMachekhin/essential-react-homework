import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Fab,
  Snackbar,
  Alert,
  List,
  ListItem,
  ListItemText,
  Chip,
  CircularProgress,
  Box,
  TextField,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { AddLotteryModal } from './components/AddLotteryModal';
import { getLotteries, type Lottery } from './api';

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [lotteries, setLotteries] = useState<Lottery[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getLotteries()
      .then(setLotteries)
      .finally(() => setLoading(false));
  }, []);

  const handleSuccess = (lottery: Lottery) => {
    setLotteries((prev) => [lottery, ...prev]);
    setSuccessOpen(true);
  };

  const filtered = lotteries.filter((l) => l.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Lotteries
      </Typography>

      <TextField
        label="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : filtered.length === 0 ? (
        <Typography color="text.secondary" sx={{ mt: 4, textAlign: 'center' }}>
          {search ? 'No lotteries match your search.' : 'No lotteries yet. Create one!'}
        </Typography>
      ) : (
        <List>
          {filtered.map((lottery) => (
            <ListItem key={lottery.id} divider>
              <ListItemText primary={lottery.name} secondary={`Prize: ${lottery.prize}`} />
              <Chip
                label={lottery.status}
                color={lottery.status === 'running' ? 'success' : 'default'}
                size="small"
              />
            </ListItem>
          ))}
        </List>
      )}

      <AddLotteryModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={handleSuccess}
      />

      <Fab
        color="primary"
        aria-label="add lottery"
        onClick={() => setModalOpen(true)}
        sx={{ position: 'fixed', bottom: 32, right: 32 }}
      >
        <AddIcon />
      </Fab>

      <Snackbar
        open={successOpen}
        autoHideDuration={4000}
        onClose={() => setSuccessOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" onClose={() => setSuccessOpen(false)}>
          Lottery created!
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default App;
