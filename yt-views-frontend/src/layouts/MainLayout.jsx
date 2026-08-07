import Navbar from '../components/common/Navbar';

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-layoutBg font-sans flex flex-col">
      <Navbar />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
