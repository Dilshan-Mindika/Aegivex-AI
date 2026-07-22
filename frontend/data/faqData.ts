export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  keywords: string[];
}

export const faqKnowledgeBase: FAQItem[] = [
  // 1. Token & Honeypot Scans (Q1 - Q10)
  {
    id: 'faq-1',
    question: 'What is a token honeypot?',
    answer: 'A token honeypot is a malicious smart contract engineered to allow token purchases while restricting transfers or enforcing a 100% sell tax, preventing buyers from liquidating assets.',
    category: 'Tokens & Honeypots',
    keywords: ['honeypot', 'sell tax', 'cannot sell', 'transfer fee', 'scam token']
  },
  {
    id: 'faq-2',
    question: 'How does Aegivex detect 100% sell tax traps?',
    answer: 'Aegivex executes automated static bytecode analysis and opcode simulation in < 0.4s to identify hidden sell fee restrictions and transfer function locks.',
    category: 'Tokens & Honeypots',
    keywords: ['sell tax', 'tax trap', 'bytecode', 'static analysis', 'opcode']
  },
  {
    id: 'faq-3',
    question: 'What is a liquidity lock?',
    answer: 'Liquidity locking time-locks decentralized exchange pool tokens (e.g. Uniswap LP) in a verifiable smart contract vault, preventing developers from pulling liquidity (rug pull).',
    category: 'Tokens & Honeypots',
    keywords: ['liquidity', 'lock', 'lp', 'rug pull', 'pool']
  },
  {
    id: 'faq-4',
    question: 'How do hidden mint functions work?',
    answer: 'Hidden mint functions allow contract owners to arbitrarily create unannounced token supplies, diluting existing holders and dumping new tokens into DEX liquidity pools.',
    category: 'Tokens & Honeypots',
    keywords: ['mint', 'hidden mint', 'supply', 'inflation', 'dump']
  },
  {
    id: 'faq-5',
    question: 'Can a contract owner blacklist my wallet address?',
    answer: 'Yes, malicious ERC20 implementations may contain mapping(address => bool) blacklist logic that freezes transfers for specific wallet identifiers.',
    category: 'Tokens & Honeypots',
    keywords: ['blacklist', 'freeze', 'owner', 'wallet lock', 'block']
  },
  {
    id: 'faq-6',
    question: 'What is proxy contract risk in tokens?',
    answer: 'Upgradeable proxy contracts allow admin keys to modify underlying implementation code post-deployment, enabling unexpected fee updates or access restrictions.',
    category: 'Tokens & Honeypots',
    keywords: ['proxy', 'upgradeable', 'admin key', 'implementation', 'code change']
  },
  {
    id: 'faq-7',
    question: 'Why do some tokens have 0% buy tax but 99% sell tax?',
    answer: 'Attractors use 0% buy tax to entice retail buyers, while embedding high sell taxes to trap capital inside the liquidity pool.',
    category: 'Tokens & Honeypots',
    keywords: ['buy tax', 'tax imbalance', 'trap', 'sell fee']
  },
  {
    id: 'faq-8',
    question: 'How to check if token liquidity is burned or locked?',
    answer: 'Enter the token contract address in the Aegivex Token Analyzer to verify LP burn transaction hashes and lock vault expiration timestamps.',
    category: 'Tokens & Honeypots',
    keywords: ['check liquidity', 'burned', 'lp burn', 'vault time']
  },
  {
    id: 'faq-9',
    question: 'What does a 0x1f98 token audit report indicate?',
    answer: '0x1f98 is an example Uniswap contract vector. Aegivex scans verify contract verification status, proxy delegate calls, and transfer tax rules.',
    category: 'Tokens & Honeypots',
    keywords: ['0x1f98', 'uniswap', 'token audit', 'example token']
  },
  {
    id: 'faq-10',
    question: 'How fast is Aegivex token static bytecode analysis?',
    answer: 'Aegivex performs complete EVM opcode decompression and vulnerability evaluation in under 0.4 seconds benchmark latency.',
    category: 'Tokens & Honeypots',
    keywords: ['speed', 'latency', '0.4s', 'fast', 'benchmark']
  },

  // 2. Wallet Security & Drainers (Q11 - Q20)
  {
    id: 'faq-11',
    question: 'What is a wallet drainer contract?',
    answer: 'Wallet drainers trigger signature requests (such as Permit2 or setApprovalForAll) to gain unauthorized spending access over all ERC20/NFT assets.',
    category: 'Wallet Security',
    keywords: ['drainer', 'wallet drainer', 'stolen funds', 'permit', 'approval']
  },
  {
    id: 'faq-12',
    question: 'How do malicious approval permits work?',
    answer: 'Permit signatures off-chain authorize spender smart contracts to transfer tokens directly from your balance without needing on-chain approval transactions.',
    category: 'Wallet Security',
    keywords: ['permit', 'permit2', 'offchain approval', 'spending allowance']
  },
  {
    id: 'faq-13',
    question: 'How can I revoke malicious token spending allowances?',
    answer: 'Use wallet allowance revoke tools or Aegivex Wallet Audit to identify active spender approvals and execute uint256(0) approval transactions.',
    category: 'Wallet Security',
    keywords: ['revoke', 'allowance', 'unlimited approval', 'reset spender']
  },
  {
    id: 'faq-14',
    question: 'What is address poisoning or zero-value transfer attack?',
    answer: 'Attractors generate vanity addresses mimicking your common contacts and send 0 ETH transactions to trick you into copying the wrong address from history.',
    category: 'Wallet Security',
    keywords: ['address poisoning', 'poisoning', 'vanity address', 'copy paste attack']
  },
  {
    id: 'faq-15',
    question: 'Is my private key ever exposed during a wallet audit?',
    answer: 'No. Aegivex is strictly non-custodial and operates exclusively on public blockchain ledger telemetry without requiring private keys.',
    category: 'Wallet Security',
    keywords: ['private key', 'seed phrase', 'non custodial', 'custody', 'safety']
  },
  {
    id: 'faq-16',
    question: 'What is an unverified counterparty risk?',
    answer: 'Interacting with newly generated wallet addresses associated with illicit mixer protocols or flagged drainer smart contracts.',
    category: 'Wallet Security',
    keywords: ['counterparty', 'mixer', 'tornado', 'risk score']
  },
  {
    id: 'faq-17',
    question: 'How does Aegivex evaluate public wallet risk scores (0-100)?',
    answer: 'Risk scores calculate approval exposure, transaction history with flagged contracts, domain interaction logs, and drainer permit signatures.',
    category: 'Wallet Security',
    keywords: ['risk score', 'wallet score', 'score breakdown', '0-100']
  },
  {
    id: 'faq-18',
    question: 'Can a wallet address be drained just by holding a scam NFT?',
    answer: 'Holding an NFT cannot drain funds; however, visiting links embedded inside scam NFT descriptions and signing permits can cause loss.',
    category: 'Wallet Security',
    keywords: ['scam nft', 'holding nft', 'airdrop nft', 'nft drain']
  },
  {
    id: 'faq-19',
    question: 'What is a high-risk approval signature?',
    answer: 'A signature payload granting uint256.max (unlimited) access to a spender contract that lacks verified source code.',
    category: 'Wallet Security',
    keywords: ['unlimited approval', 'high risk signature', 'spender', 'max approval']
  },
  {
    id: 'faq-20',
    question: 'How to clear a flagged wallet address?',
    answer: 'Revoke active unverified spender permits and disconnect unauthorized dApp session connections.',
    category: 'Wallet Security',
    keywords: ['clear wallet', 'clean address', 'disconnect dapp']
  },

  // 3. Smart Contract Audits (Q21 - Q30)
  {
    id: 'faq-21',
    question: 'What is a reentrancy attack vector?',
    answer: 'Reentrancy occurs when an external call allows a recipient contract to recursively call back into the caller before state updates complete, draining funds.',
    category: 'Smart Contracts',
    keywords: ['reentrancy', 'recursive call', 'drain funds', 'fallback']
  },
  {
    id: 'faq-22',
    question: 'What is access control vulnerability in Solidity?',
    answer: 'Improper use of modifiers like onlyOwner or missing authorization checks, allowing public callers to execute privileged administrative functions.',
    category: 'Smart Contracts',
    keywords: ['access control', 'onlyOwner', 'solidity modifier', 'privileged']
  },
  {
    id: 'faq-23',
    question: 'What is an unverified proxy implementation?',
    answer: 'A proxy contract pointing to logic bytecode that has not been submitted or verified on block explorers, hiding actual code execution.',
    category: 'Smart Contracts',
    keywords: ['unverified proxy', 'unverified code', 'hidden logic', 'bytecode']
  },
  {
    id: 'faq-24',
    question: 'How does Aegivex evaluate smart contract AST and opcode logic?',
    answer: 'Aegivex parses Abstract Syntax Trees (AST) and EVM opcodes to check for unhandled exceptions, delegatecalls, and state variable collisions.',
    category: 'Smart Contracts',
    keywords: ['ast', 'opcode', 'evm', 'delegatecall', 'storage collision']
  },
  {
    id: 'faq-25',
    question: 'What is integer overflow / underflow?',
    answer: 'Arithmetic errors occurring when calculations exceed data type storage limits, causing values to wrap around unless SafeMath or Solidity 0.8+ is used.',
    category: 'Smart Contracts',
    keywords: ['overflow', 'underflow', 'safemath', 'solidity 0.8']
  },
  {
    id: 'faq-26',
    question: 'What is flash loan price oracle manipulation?',
    answer: 'Attractors borrow immense capital via flash loans to manipulate spot price oracles in single-block transactions, liquidating undercollateralized positions.',
    category: 'Smart Contracts',
    keywords: ['flash loan', 'oracle manipulation', 'price oracle', 'twap']
  },
  {
    id: 'faq-27',
    question: 'How does Aegivex verify open-source contract code?',
    answer: 'Aegivex queries block explorer APIs and verifies bytecode compilation matches published Solidity source code files.',
    category: 'Smart Contracts',
    keywords: ['open source', 'verify code', 'compiler', 'solidity source']
  },
  {
    id: 'faq-28',
    question: 'What is a self-destruct contract vulnerability?',
    answer: 'Use of SELFDESTRUCT (or INVALID opcodes) allowing malicious force-sending of Ether or destroying contract code state.',
    category: 'Smart Contracts',
    keywords: ['selfdestruct', 'destroy contract', 'force send eth']
  },
  {
    id: 'faq-29',
    question: 'What does a contract risk score under 20 mean?',
    answer: 'A score under 20 indicates low risk: open-source verified code, standard access controls, zero reentrancy flaws, and verified proxy keys.',
    category: 'Smart Contracts',
    keywords: ['low risk score', 'safe contract', 'score under 20']
  },
  {
    id: 'faq-30',
    question: 'How to submit a custom contract deployment address for audit?',
    answer: 'Paste the 0x address into the Aegivex Instant Scanner or Smart Contract Auditor tool page.',
    category: 'Smart Contracts',
    keywords: ['submit contract', 'audit address', 'instant scanner']
  },

  // 4. Website & Phishing Endpoint Scans (Q31 - Q40)
  {
    id: 'faq-31',
    question: 'What is typosquatting in Web3 dApps?',
    answer: 'Attractors register domains similar to authentic dApps (e.g. unlswap.org instead of uniswap.org) to host drainer interfaces.',
    category: 'Websites & Phishing',
    keywords: ['typosquatting', 'fake domain', 'phishing website', 'dapp clone']
  },
  {
    id: 'faq-32',
    question: 'How to detect fake Uniswap or OpenSea phishing websites?',
    answer: 'Enter the dApp URL into the Aegivex Website & Domain Scanner to verify SSL certificate authority, domain registration age, and script payloads.',
    category: 'Websites & Phishing',
    keywords: ['fake uniswap', 'fake opensea', 'phishing check', 'url scanner']
  },
  {
    id: 'faq-33',
    question: 'What SSL checks does Aegivex perform on dApp domains?',
    answer: 'Aegivex verifies SSL certificate issuer authenticity, expiration validity, and TLS 1.3 protocol encryption standards.',
    category: 'Websites & Phishing',
    keywords: ['ssl', 'tls', 'certificate', 'encryption', 'https']
  },
  {
    id: 'faq-34',
    question: 'Can a malicious website drain funds without wallet confirmation?',
    answer: 'No. Web browsers cannot execute transfers without user signature confirmation; however, obfuscated popups can trick users into confirming.',
    category: 'Websites & Phishing',
    keywords: ['drain without confirmation', 'popup trick', 'browser security']
  },
  {
    id: 'faq-35',
    question: 'What is malicious script injection payload in Web3 frontends?',
    answer: 'Tampered frontend JavaScript code injected into compromised dApps that replaces transaction destination addresses with hacker wallets.',
    category: 'Websites & Phishing',
    keywords: ['script injection', 'javascript payload', 'compromised frontend']
  },
  {
    id: 'faq-36',
    question: 'How does Aegivex domain reputation scoring work?',
    answer: 'Domain reputation analyzes registrar history, WHOIS data, SSL certification, DNS record stability, and reported drainer blacklists.',
    category: 'Websites & Phishing',
    keywords: ['domain reputation', 'whois', 'registrar', 'dns check']
  },
  {
    id: 'faq-37',
    question: 'Why does domain registration age matter for dApp security?',
    answer: 'Phishing domains are typically registered hours or days prior to attacks, whereas authentic dApps have years of established WHOIS history.',
    category: 'Websites & Phishing',
    keywords: ['domain age', 'whois age', 'new domain', 'registration date']
  },
  {
    id: 'faq-38',
    question: 'How to verify official dApp URL endpoints?',
    answer: 'Cross-reference dApp domains with verified CoinMarketCap/CoinGecko links and scan with Aegivex URL Auditor.',
    category: 'Websites & Phishing',
    keywords: ['official url', 'verify dapp', 'coingecko link']
  },
  {
    id: 'faq-39',
    question: 'What should I do if a website is flagged as a Critical Threat?',
    answer: 'Close the browser tab immediately. Disconnect any active WalletConnect session and do not sign signature requests.',
    category: 'Websites & Phishing',
    keywords: ['critical threat website', 'flagged url', 'close tab']
  },
  {
    id: 'faq-40',
    question: 'How fast is dApp URL domain verification?',
    answer: 'Aegivex inspects domain DNS, SSL authority, and script payloads in real-time under 0.4s benchmark latency.',
    category: 'Websites & Phishing',
    keywords: ['url speed', 'domain scan speed', 'fast check']
  },

  // 5. Transaction Payload & Architecture (Q41 - Q50)
  {
    id: 'faq-41',
    question: 'What is transaction ABI calldata decoding?',
    answer: 'Decoding raw hex function selectors and parameters into human-readable operations (e.g. transfer(address recipient, uint256 amount)).',
    category: 'Transactions & Engine',
    keywords: ['calldata', 'abi decoding', 'hex decoder', 'function selector']
  },
  {
    id: 'faq-42',
    question: 'What is pre-execution transaction simulation?',
    answer: 'Simulating transaction execution in a local EVM fork to calculate exact state overrides, token balance changes, and gas usage prior to signing.',
    category: 'Transactions & Engine',
    keywords: ['pre execution', 'simulation', 'evm fork', 'balance change']
  },
  {
    id: 'faq-43',
    question: 'How does OKX X Layer integration enhance Aegivex security?',
    answer: 'Aegivex provides dedicated opcode heuristics and threat signature monitoring optimized for OKX X Layer Layer-2 ecosystem protocol standards.',
    category: 'Transactions & Engine',
    keywords: ['okx', 'x layer', 'okx hackathon', 'layer 2']
  },
  {
    id: 'faq-44',
    question: 'Which multi-chain networks does Aegivex support?',
    answer: 'OKX X Layer, Ethereum Mainnet, Solana Network, Arbitrum One, Base Network, and Polygon PoS.',
    category: 'Transactions & Engine',
    keywords: ['multi-chain', 'supported networks', 'chains', 'ethereum', 'solana']
  },
  {
    id: 'faq-45',
    question: 'What is the latency benchmark for transaction risk analysis?',
    answer: 'Sub-0.4 second response latency ensures real-time pre-signature threat evaluation without delaying wallet interaction flows.',
    category: 'Transactions & Engine',
    keywords: ['latency', 'benchmark', 'sub 0.4s', 'real time']
  },
  {
    id: 'faq-46',
    question: 'How does Aegivex achieve a 99.9% vulnerability detection rate?',
    answer: 'By combining static bytecode decompilation, AST pattern recognition, dynamic opcode simulation, and threat intelligence telemetry.',
    category: 'Transactions & Engine',
    keywords: ['99.9%', 'vulnerability rate', 'detection rate', 'accuracy']
  },
  {
    id: 'faq-47',
    question: 'Is Aegivex AI platform non-custodial?',
    answer: 'Yes, Aegivex NEVER asks for, stores, or accesses user private keys, seed phrases, or custodial wallet balances.',
    category: 'Transactions & Engine',
    keywords: ['non custodial', 'seed phrase', 'private key', 'security architecture']
  },
  {
    id: 'faq-48',
    question: 'What are the differences between User and Admin roles?',
    answer: 'Users access personal risk scans and AI Copilot. Admins access global threat telemetry, live support inbox, user RBAC controls, and audit logs.',
    category: 'Transactions & Engine',
    keywords: ['user role', 'admin role', 'rbac', 'admin dashboard']
  },
  {
    id: 'faq-49',
    question: 'How to contact on-call security engineers for custom audits?',
    answer: 'Type your inquiry in the Live Support Chat widget. An on-call engineer or automated FAQ auto-reply engine will assist immediately.',
    category: 'Transactions & Engine',
    keywords: ['support engineer', 'contact', 'custom audit', 'live chat']
  },
  {
    id: 'faq-50',
    question: 'How is Aegivex AI structured for the OKX.AI Genesis Hackathon?',
    answer: 'Aegivex AI is built as an autonomous Web3 threat intelligence copilot delivering real-time pre-execution risk assessment across OKX X Layer and major multi-chain ecosystems.',
    category: 'Transactions & Engine',
    keywords: ['okx genesis', 'hackathon project', 'aegivex ai', 'okx.ai']
  }
];

export function findMatchingFAQ(userQuery: string): FAQItem | null {
  const query = userQuery.toLowerCase().trim();
  if (!query) return null;

  // 1. Direct Question Match
  for (const item of faqKnowledgeBase) {
    if (item.question.toLowerCase().includes(query) || query.includes(item.question.toLowerCase())) {
      return item;
    }
  }

  // 2. Keyword Match Count Scoring
  let bestMatch: FAQItem | null = null;
  let maxScore = 0;

  for (const item of faqKnowledgeBase) {
    let score = 0;
    for (const kw of item.keywords) {
      if (query.includes(kw.toLowerCase())) {
        score += 2;
      }
    }
    // Also check words in question
    const qWords = item.question.toLowerCase().split(' ');
    for (const word of qWords) {
      if (word.length > 3 && query.includes(word)) {
        score += 1;
      }
    }

    if (score > maxScore) {
      maxScore = score;
      bestMatch = item;
    }
  }

  return maxScore >= 2 ? bestMatch : null;
}
