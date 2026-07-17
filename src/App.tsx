import { BundleProvider } from './context/BundleContext';
import { Builder } from './components/builder/Builder';
import { ReviewPanel } from './components/builder/ReviewPanel';

function AppContent() {
  return (
    <div className="min-h-screen bg-white">
      {/* Optional Header */}
      <header className="border-b border-gray-200 bg-white py-4 px-6 sm:px-8">
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">Let’s get started!</h1>
      </header>

      {/* Main Layout Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
          
          {/* Left Column: Accordion Builder */}
          <div className="w-full lg:flex-[1.5]">
            <Builder />
          </div>

          {/* Right Column: Sticky Review Panel */}
          <div className="w-full lg:flex-1 max-w-[500px] mx-auto lg:mx-0">
            <ReviewPanel />
          </div>

        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BundleProvider>
      <AppContent />
    </BundleProvider>
  );
}
