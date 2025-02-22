import { FC } from 'react';
import { Paper, Typography, Grid } from '@mui/material';
import { useTask } from '../../hooks/useTask';

const TaskStats: FC = () => {
  const { tasks } = useTask();
  
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const incompleteTasks = tasks.filter(task => task.status === 'incomplete').length;
  const completionRate = tasks.length ? (completedTasks / tasks.length * 100).toFixed(1) : '0';

  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Typography variant="h6">Total</Typography>
          <Typography>{tasks.length}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h6">Completed</Typography>
          <Typography>{completedTasks}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h6">Completion Rate</Typography>
          <Typography>{completionRate}%</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default TaskStats; 