import { FaArrowLeft } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export const NotFound = () => {
  const { user } = useSelector((state) => state.auth);
  const homePath = user?.role === 'admin' ? '/admin/dashboard' : '/dashboard';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-light-bg px-4 text-center font-sans">
      <div className="relative">
         <h1 className="text-9xl font-serif font-bold text-secondary opacity-10 select-none">404</h1>
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
            <h2 className="text-4xl font-serif font-bold text-secondary mb-2">Page Not Found</h2>
         </div>
      </div>
      <p className="text-gray-500 mb-8 max-w-md text-lg">Oops! The page you’re looking for doesn’t exist. It might have been moved or deleted.</p>
      <Link
        to={homePath}
        className="inline-flex items-center gap-2 text-white bg-primary hover:bg-primary-hover px-8 py-4 rounded-full font-bold text-sm shadow-lg shadow-primary/30 transition-all hover:-translate-y-1"
      >
        <FaArrowLeft />
        Go back home
      </Link>
    </div>
  );
};
