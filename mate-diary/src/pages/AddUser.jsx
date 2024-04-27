import React, { useState } from 'react';

export default function AddUser() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <section className="min-h-screen">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h lg:py-0">
          <div className="w-full bg-[#B99470] rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8 text-center">
                  <h1 className="text-xl font-bold leading-tight text-[#F7DCB9] tracking-tight text-gray-900 md:text-2xl dark:text-white">
                      Add User
                  </h1>
                  <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label htmlFor="name" className="block text-white font-bold md:text-right mb-1 md:mb-0 pr-4">Nama</label>
            </div>
            <div className="md:w-2/3">
              <input type="text" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-[#B5C18E]" id="name" name="name" onChange={e => setName(e.target.value)} />
            </div>
            </div>
            <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label htmlFor="username" className="block text-white font-bold md:text-right mb-1 md:mb-0 pr-4">Username</label>
            </div>
            <div className="md:w-2/3">
              <input type="text" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-[#B5C18E]" id="username" name="username" onChange={e => setName(e.target.value)} />
            </div>
            </div>
            <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
            <label htmlFor="password" className="block text-white font-bold md:text-right mb-1 md:mb-0 pr-4">Password</label>            </div>
            <div className="md:w-2/3">
            <input type="password" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-[#B5C18E]" id="password" name="password" onChange={e => setPassword(e.target.value)} />
            </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <button type="submit" name="add" className="bg-gray-200 appearance-none border-2 border-[#B5C18E] rounded w-full py-2 px-4 text-gray-500 m-2 hover:bg-[#B5C18E] hover:text-white">Add User</button>
            </div>
          </form>
              </div>
          </div>
      </div>
      </section>
  );
}
