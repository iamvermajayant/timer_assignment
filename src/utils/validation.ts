import { toast } from 'sonner';

export interface TimerFormData {
  title: string;
  description: string;
  hours: number;
  minutes: number;
  seconds: number;
}

export const validateTimerForm = (data: TimerFormData): boolean => {
  const { title, hours, minutes, seconds } = data;
  const errors: string[] = [];
  
  // Collect all validation errors
  if (!title.trim()) {
    errors.push('Title is required');
  }

  if (title.length > 50) {
    errors.push('Title must be less than 50 characters');
  }

  if (hours < 0 || minutes < 0 || seconds < 0) {
    errors.push('Time values cannot be negative');
  }

  if (minutes > 59 || seconds > 59) {
    errors.push('Minutes and seconds must be between 0 and 59');
  }

  const totalSeconds = hours * 3600 + minutes * 60 + seconds;
  if (totalSeconds === 0) {
    errors.push('Please set a time greater than 0');
  }

  if (totalSeconds > 86400) { // 24 hours
    errors.push('Timer cannot exceed 24 hours');
  }

  // If there are any errors, show them in a toast and return false
  if (errors.length > 0) {
    // Show each error in a separate toast
    errors.forEach(error => {
      toast.error(error, {
        duration: 3000,
        position: window.innerWidth <= 768 ? 'bottom-center' : 'top-right'
      });
    });
    return false;
  }

  return true;
};