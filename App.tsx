import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import TransactionItem from './components/TransactionItem';
import EditControl from './components/EditControl';
import AccountDetail from './components/AccountDetail';
import ProfilePage from './components/ProfilePage';
import { INITIAL_ACCOUNTS, INITIAL_TRANSACTIONS } from './constants';
import { Transaction, Account, UserProfile } from './types';
import { 
  Plus, 
  ArrowUpRight, 
  ArrowDownLeft, 
  BarChart3, 
  MoreHorizontal,
  ChevronRight,
  Bell
} from 'lucide-react';

const INITIAL_USER: UserProfile = {
  name: "NICOLÁS SALCEDO FERIX",
  username: "@nicolass1748",
  avatarUrl: "https://picsum.photos/100/100",
  membershipNumber: "P38371203"
};

const App: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>(INITIAL_ACCOUNTS);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  // Derived state for the "Main" balance display (usually the first account or aggregate)
  const mainAccount = accounts[0];
  const selectedAccount = accounts.find(a => a.id === selectedAccountId);

  const handleUpdateTransaction = (updated: Transaction) => {
    setTransactions(prev => prev.map(t => t.id === updated.id ? updated : t));
  };

  const handleAddTransaction = (transaction: Transaction) => {
    // If we are in a specific account view, force the currency to match
    if (selectedAccount) {
      transaction.currency = selectedAccount.currency;
    }
    setTransactions(prev => [transaction, ...prev]);
  };

  const handleUpdateBalance = (accountId: string, newBalance: number) => {
    setAccounts(prev => prev.map(acc => acc.id === accountId ? { ...acc, balance: newBalance } : acc));
  };

  const handleUpdateUser = (field: keyof UserProfile, value: string) => {
    setUser(prev => ({ ...prev, [field]: value }));
  };

  if (isProfileOpen) {
    return (
      <>
        <ProfilePage 
          user={user}
          isEditMode={isEditMode}
          onBack={() => setIsProfileOpen(false)}
          onUpdateUser={handleUpdateUser}
        />
        <EditControl 
          isEditMode={isEditMode} 
          toggleEditMode={() => setIsEditMode(!isEditMode)} 
          onAddTransaction={handleAddTransaction}
        />
      </>
    );
  }

  return (
    <div className="flex min-h-screen bg-white text-slate-900 font-sans selection:bg-wise-green selection:text-wise-dark">
      <Sidebar />
      
      <main className="flex-1 min-w-0">
        {/* Top Navigation */}
        <header className="flex justify-end items-center px-8 py-4 sticky top-0 bg-white/90 backdrop-blur-sm z-30">
          <div className="flex items-center gap-4">
             <button className="bg-wise-green px-4 py-2 rounded-full text-sm font-bold text-wise-dark hover:brightness-95 transition-all">
              Earn £50
            </button>
            <div className="p-2 text-gray-500 hover:bg-gray-100 rounded-full cursor-pointer">
              <Bell className="w-5 h-5" />
            </div>
            <div 
              onClick={() => setIsProfileOpen(true)}
              className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 pl-2 pr-1 py-1 rounded-full border border-transparent hover:border-gray-200 transition-all"
            >
              <img 
                src={user.avatarUrl} 
                alt="Profile" 
                className="w-8 h-8 rounded-full border border-gray-200 object-cover"
              />
              <span className="text-sm font-semibold text-wise-dark hidden sm:block normal-case">{user.name.split(' ').map(n => n.charAt(0) + n.slice(1).toLowerCase()).join(' ')}</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </header>

        <div className="px-4 sm:px-8 pb-20 max-w-5xl mx-auto">
          
          {selectedAccount ? (
            <AccountDetail 
              account={selectedAccount}
              transactions={transactions}
              isEditMode={isEditMode}
              onBack={() => setSelectedAccountId(null)}
              onUpdateBalance={(val) => handleUpdateBalance(selectedAccount.id, val)}
              onUpdateTransaction={handleUpdateTransaction}
            />
          ) : (
            <div className="animate-in fade-in zoom-in-95 duration-300">
              {/* Main Balance Hero */}
              <section className="mb-12 mt-4">
                <h2 className="text-gray-500 text-sm font-medium mb-1">Total balance</h2>
                <div className="flex items-baseline gap-2 mb-6 group relative w-fit">
                  <span 
                    className={`text-4xl md:text-5xl font-bold tracking-tight text-slate-900 outline-none ${isEditMode ? 'hover:bg-gray-100 rounded px-2 cursor-text border-b-2 border-wise-green' : ''}`}
                    contentEditable={isEditMode}
                    suppressContentEditableWarning
                    onBlur={(e) => {
                        const val = parseFloat(e.currentTarget.textContent?.replace(/[^0-9.]/g, '') || '0');
                        handleUpdateBalance(mainAccount.id, val);
                    }}
                  >
                    {mainAccount.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                  <span className="text-2xl font-medium text-gray-500">{mainAccount.currency}</span>
                  {/* Optional Chart Icon */}
                  <div className="bg-gray-100 p-1.5 rounded-md ml-2">
                    <BarChart3 className="w-5 h-5 text-gray-600" />
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex gap-3">
                  <button className="flex items-center gap-2 bg-wise-green text-wise-dark px-5 py-2.5 rounded-full font-bold hover:brightness-95 transition-all">
                    <ArrowUpRight className="w-5 h-5" /> Send
                  </button>
                  <button className="flex items-center gap-2 bg-wise-bg text-wise-dark px-5 py-2.5 rounded-full font-bold hover:bg-gray-200 transition-all">
                    <Plus className="w-5 h-5" /> Add money
                  </button>
                  <button className="flex items-center gap-2 bg-wise-bg text-wise-dark px-5 py-2.5 rounded-full font-bold hover:bg-gray-200 transition-all">
                    <ArrowDownLeft className="w-5 h-5" /> Request
                  </button>
                  <div className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 ml-1 cursor-pointer hover:bg-gray-50">
                    <MoreHorizontal className="w-5 h-5 text-gray-600" />
                  </div>
                </div>
              </section>

              {/* Cards / Accounts Scroll */}
              <section className="mb-12 overflow-x-auto no-scrollbar">
                <div className="flex gap-4 min-w-max pb-2">
                  {accounts.map((acc) => (
                    <div 
                      key={acc.id}
                      onClick={() => setSelectedAccountId(acc.id)}
                      className="w-64 h-40 bg-wise-bg rounded-xl p-5 flex flex-col justify-between relative group border border-transparent hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-xl shadow-sm">
                                {acc.flag}
                            </div>
                            <span className="font-bold text-slate-700">{acc.currency}</span>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                            <span className="bg-gray-200/50 px-1 rounded">🏛️</span>
                            <span>{acc.accountNumber}</span>
                        </div>
                        <div 
                            className={`text-xl font-bold text-slate-900 outline-none ${isEditMode ? 'bg-white/50 ring-1 ring-wise-green rounded px-1' : ''}`}
                            contentEditable={isEditMode}
                            suppressContentEditableWarning
                            onClick={(e) => isEditMode && e.stopPropagation()} 
                            onBlur={(e) => {
                                const val = parseFloat(e.currentTarget.textContent?.replace(/[^0-9.]/g, '') || '0');
                                handleUpdateBalance(acc.id, val);
                            }}
                        >
                            {acc.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="w-20 h-40 flex items-center justify-center rounded-xl border-2 border-dashed border-gray-200 text-gray-400 hover:border-wise-green hover:text-wise-green hover:bg-wise-bg/20 transition-all cursor-pointer">
                      <Plus className="w-6 h-6" />
                  </div>
                </div>
              </section>

              {/* Transactions */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-slate-900">Transactions</h3>
                  <button className="text-wise-green font-semibold hover:underline decoration-2 underline-offset-4">See all</button>
                </div>

                <div className="space-y-1">
                  {transactions.map((tx) => (
                    <TransactionItem 
                        key={tx.id} 
                        transaction={tx} 
                        isEditMode={isEditMode}
                        onUpdate={handleUpdateTransaction}
                    />
                  ))}
                </div>
              </section>
            </div>
          )}

        </div>
      </main>

      <EditControl 
        isEditMode={isEditMode} 
        toggleEditMode={() => setIsEditMode(!isEditMode)} 
        onAddTransaction={handleAddTransaction}
      />
    </div>
  );
};

export default App;