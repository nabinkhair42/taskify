import { useEffect } from 'react';
import { Box, Typography, Container, Paper, Snackbar, Alert } from '@mui/material';
import TaskForm from '../../components/TaskForm';
import TaskList from '../../components/TaskList';
import TaskStats from '../../components/TaskStats';
import { useDispatch } from 'react-redux';
import { setTasks } from '../../store/slices/taskSlice';
import { loadTasksFromLocalStorage } from '../../utils/localStorage';
import { useSnackbar } from '../../hooks/useSnackbar';

export const Home = () => {
  const dispatch = useDispatch();
  const { open, message, type, handleClose } = useSnackbar();

  useEffect(() => {
    const savedTasks = loadTasksFromLocalStorage();
    dispatch(setTasks(savedTasks));
  }, [dispatch]);

  return (
    <Container maxWidth="md">
      <Box py={4}>
        <Typography variant="h3" component="h1" gutterBottom textAlign="center">
          Task Tracker
        </Typography>
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Add New Task
          </Typography>
          <TaskForm />
        </Paper>
        <TaskStats />
        <Paper sx={{ p: 3 }}>
          <TaskList />
        </Paper>
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Home; 