import { Transaction, TransactionStatus, TransactionDirection, Account } from './types';

export const INITIAL_ACCOUNTS: Account[] = [
  {
    id: '1',
    currency: 'EUR',
    balance: 232.53,
    flag: '🇪🇺',
    accountNumber: '.. 64818'
  },
  {
    id: '2',
    currency: 'USD',
    balance: 1450.00,
    flag: '🇺🇸',
    accountNumber: '.. 74161'
  },
  {
    id: '3',
    currency: 'GBP',
    balance: 0.00,
    flag: '🇬🇧',
    accountNumber: '.. 99212'
  },
  {
    id: '4',
    currency: 'THB',
    balance: 12086.34,
    flag: '🇹🇭',
    accountNumber: '.. 11234'
  }
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 't1',
    recipient: 'Shwe Sin Win',
    description: 'Sending',
    amount: 12086.34,
    currency: 'THB',
    date: 'Today',
    status: TransactionStatus.COMPLETED,
    direction: TransactionDirection.OUTGOING,
    iconType: 'transfer'
  },
  {
    id: 't2',
    recipient: 'To EUR',
    description: 'Moved by you',
    amount: 34.30,
    currency: 'EUR',
    date: 'Today',
    status: TransactionStatus.COMPLETED,
    direction: TransactionDirection.INCOMING,
    iconType: 'transfer'
  },
  {
    id: 't3',
    recipient: 'Iberojet',
    description: 'Travel',
    amount: 405.76,
    currency: 'EUR',
    date: 'Yesterday',
    status: TransactionStatus.PENDING,
    direction: TransactionDirection.OUTGOING,
    iconType: 'shopping'
  },
  {
    id: 't4',
    recipient: 'Spotify AB',
    description: 'Subscription',
    amount: 10.99,
    currency: 'EUR',
    date: '14 Dec',
    status: TransactionStatus.COMPLETED,
    direction: TransactionDirection.OUTGOING,
    iconType: 'shopping'
  },
  {
    id: 't5',
    recipient: 'Upwork Global Inc.',
    description: 'Payout',
    amount: 1250.00,
    currency: 'USD',
    date: '10 Dec',
    status: TransactionStatus.COMPLETED,
    direction: TransactionDirection.INCOMING,
    iconType: 'income'
  }
];