import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-primary text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">File Explorer</Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/" className="hover:text-gray-200 transition-colors">Home</Link></li>
            {/* Add more navigation items as needed */}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

