import { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Stack, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem 
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { TaskFormInput, TaskPriority } from '../../types';
import { useTask } from '../../hooks/useTask';

const TaskForm = () => {
  const { createTask } = useTask();
  const [formData, setFormData] = useState<TaskFormInput & { dueDate: Date | null }>({
    name: '',
    description: '',
    status: 'incomplete',
    priority: 'medium',
    dueDate: null
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    
    createTask(formData);
    setFormData({ 
      name: '', 
      description: '', 
      status: 'incomplete', 
      priority: 'medium',
      dueDate: null 
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
      <Stack spacing={2}>
        <TextField
          fullWidth
          label="Task Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <TextField
          fullWidth
          label="Description"
          multiline
          rows={3}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
        <FormControl fullWidth>
          <InputLabel>Priority</InputLabel>
          <Select
            value={formData.priority}
            label="Priority"
            onChange={(e) => setFormData({ ...formData, priority: e.target.value as TaskPriority })}
          >
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </Select>
        </FormControl>
        <DatePicker
          label="Due Date"
          value={formData.dueDate}
          onChange={(newValue) => setFormData({ ...formData, dueDate: newValue })}
        />
        <Button type="submit" variant="contained" color="primary">
          Add Task
        </Button>
      </Stack>
    </Box>
  );
};

export default TaskForm; 