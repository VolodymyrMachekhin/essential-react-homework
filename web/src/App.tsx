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
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { AddLotteryModal } from './components/AddLotteryModal';
import { getLotteries, type Lottery } from './api';

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [lotteries, setLotteries] = useState<Lottery[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLotteries()
      .then(setLotteries)
      .finally(() => setLoading(false));
  }, []);

  const handleSuccess = (lottery: Lottery) => {
    setLotteries((prev) => [lottery, ...prev]);
    setSuccessOpen(true);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Lotteries
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <List>
          {lotteries.map((lottery) => (
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
