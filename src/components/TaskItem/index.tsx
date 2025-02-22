import { FC } from 'react';
import { Card, CardContent, Typography, IconButton, Box, Chip } from '@mui/material';
import { Delete, CheckCircle, RadioButtonUnchecked } from '@mui/icons-material';
import { Task } from '../../types';
import { useTask } from '../../hooks/useTask';

interface TaskItemProps {
  task: Task;
}

const TaskItem: FC<TaskItemProps> = ({ task }) => {
  const { removeTask, toggleStatus } = useTask();

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Box flex={1}>
            <Typography variant="h6" component="div" sx={{ mb: 1 }}>
              {task.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {task.description}
            </Typography>
            <Box display="flex" gap={1}>
              <Chip
                label={task.status}
                color={task.status === 'completed' ? 'success' : 'warning'}
                size="small"
              />
              <Chip
                label={task.priority}
                color={
                  task.priority === 'high' 
                    ? 'error' 
                    : task.priority === 'medium' 
                      ? 'primary' 
                      : 'default'
                }
                size="small"
              />
              {task.dueDate && (
                <Chip
                  label={new Date(task.dueDate).toLocaleDateString()}
                  size="small"
                  variant="outlined"
                />
              )}
            </Box>
          </Box>
          <Box>
            <IconButton 
              onClick={() => toggleStatus(task.id)} 
              color="primary"
              aria-label={task.status === 'completed' ? 'Mark as incomplete' : 'Mark as complete'}
            >
              {task.status === 'completed' ? (
                <CheckCircle />
              ) : (
                <RadioButtonUnchecked />
              )}
            </IconButton>
            <IconButton 
              onClick={() => removeTask(task.id)} 
              color="error"
              aria-label="Delete task"
            >
              <Delete />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TaskItem; 