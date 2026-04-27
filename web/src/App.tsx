import { useState } from 'react';
import { Container, Typography, Fab, Snackbar, Alert } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { AddLotteryModal } from './components/AddLotteryModal';

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1">
        Lotteries
      </Typography>

      <AddLotteryModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={() => setSuccessOpen(true)}
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
