import { useState } from 'react';
import { Plus, Clock } from 'lucide-react';
import { TimerList } from './components/TimerList';
import { AddTimerModal } from './components/AddTimerModal';
import { Toaster } from 'sonner';
import { useToastPosition } from './hooks/useToastPosition';

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toastPosition = useToastPosition();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Toaster 
        position={toastPosition}
        expand={window.innerWidth <= 768}
        richColors
        closeButton
        style={{
          // Add custom styles for mobile
          ...(window.innerWidth <= 768 && {
            bottom: '20px',
            width: '90%',
            left: '50%',
            transform: 'translateX(-50%)'
          })
        }}
      />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <Clock className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Timer</h1>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Add Timer
          </button>
        </div>
        
        <TimerList />
        
        <AddTimerModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  );
}

export default Home;