import { useState } from 'react';
import { 
  Box, 
  Typography, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  TextField,
  Stack,
  Button
} from '@mui/material';
import { useTask } from '../../hooks/useTask';
import TaskItem from '../TaskItem';

const TaskList = () => {
  const { tasks } = useTask();
  const [sortBy, setSortBy] = useState<'status' | 'date'>('date');
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'completed' | 'incomplete'>('all');

  const filteredAndSortedTasks = [...tasks]
    .filter(task => {
      if (filter === 'all') return true;
      return task.status === filter;
    })
    .filter(task => 
      task.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'status') {
        return a.status.localeCompare(b.status);
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  return (
    <Box>
      <Stack spacing={3}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" component="h2">
            Tasks ({filteredAndSortedTasks.length})
          </Typography>
          <FormControl size="small" sx={{ width: 200 }}>
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sortBy}
              label="Sort By"
              onChange={(e) => setSortBy(e.target.value as 'status' | 'date')}
            >
              <MenuItem value="date">Date</MenuItem>
              <MenuItem value="status">Status</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box display="flex" gap={1} mb={2}>
          <Button 
            variant={filter === 'all' ? 'contained' : 'outlined'}
            onClick={() => setFilter('all')}
          >
            All
          </Button>
          <Button 
            variant={filter === 'completed' ? 'contained' : 'outlined'}
            onClick={() => setFilter('completed')}
          >
            Completed
          </Button>
          <Button 
            variant={filter === 'incomplete' ? 'contained' : 'outlined'}
            onClick={() => setFilter('incomplete')}
          >
            Incomplete
          </Button>
        </Box>

        <TextField
          fullWidth
          size="small"
          label="Search tasks"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by task name or description"
        />

        {filteredAndSortedTasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
        
        {filteredAndSortedTasks.length === 0 && (
          <Typography color="text.secondary" textAlign="center">
            {searchQuery 
              ? "No tasks found matching your search"
              : "No tasks yet. Add a new task to get started!"}
          </Typography>
        )}
      </Stack>
    </Box>
  );
};

export default TaskList; 