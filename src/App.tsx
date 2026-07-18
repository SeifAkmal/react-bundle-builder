import { BundleProvider } from './context/BundleContext';
import { Builder } from './components/builder/Builder';
import { ReviewPanel } from './components/builder/ReviewPanel';

function AppContent() {
  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center text-gray-900 mb-8 lg:mb-12 lg:hidden">
          Let's get started!
        </h1>
        <div className="flex flex-col gap-10 lg:gap-12 items-start">
          

          <div className="w-full">
            <Builder />
          </div>


          <div className="w-full">
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
