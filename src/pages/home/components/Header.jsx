import React from 'react';
import { Wallet, Menu } from 'lucide-react';

const Header = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 md:mb-6 gap-4">
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <div className="bg-orange-100 p-2 rounded-lg">
          <Wallet className='w-10 h-10 text-pink-500' />
        </div>
        <div>
          <h2 className="text-xl font-semibold">Home Wallet</h2>
        </div>
        <button className="ml-auto sm:hidden">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default Header;