import { useStore } from '@/store/useStore';
import { Check } from 'lucide-react';

export default function ToastContainer() {
  const toasts = useStore(s => s.toasts);
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[1100] flex flex-col gap-2">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className="flex items-center gap-3 bg-pitch border border-[rgba(57,255,20,0.3)] rounded-lg px-6 py-4 animate-in slide-in-from-top-2 fade-in duration-300"
        >
          <Check className="w-5 h-5 text-neon flex-shrink-0" />
          <div>
            <p className="text-sm text-white">{toast.message}</p>
            {toast.productName && (
              <p className="text-xs text-gray-400">{toast.productName}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
