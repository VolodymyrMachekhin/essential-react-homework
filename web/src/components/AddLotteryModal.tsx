import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Alert,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createLottery, type Lottery } from '../api';

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: (lottery: Lottery) => void;
}

const validationSchema = Yup.object({
  name: Yup.string().min(3, 'Name must be at least 3 characters').required('Name is required'),
  prize: Yup.string().min(3, 'Prize must be at least 3 characters').required('Prize is required'),
});

export function AddLotteryModal({ open, onClose, onSuccess }: Props) {
  const formik = useFormik({
    initialValues: { name: '', prize: '' },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setStatus, resetForm }) => {
      try {
        const lottery = await createLottery(values);
        resetForm();
        onSuccess(lottery);
        onClose();
      } catch (error) {
        setStatus(error instanceof Error ? error.message : 'Something went wrong');
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleClose = () => {
    formik.resetForm();
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Add a Lottery</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {formik.status && <Alert severity="error">{formik.status}</Alert>}
          <TextField
            label="Name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            fullWidth
          />
          <TextField
            label="Prize"
            name="prize"
            value={formik.values.prize}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.prize && Boolean(formik.errors.prize)}
            helperText={formik.touched.prize && formik.errors.prize}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <LoadingButton type="submit" variant="contained" loading={formik.isSubmitting}>
            Submit
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
}
