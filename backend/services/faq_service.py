from typing import Optional, Dict, List

FAQ_KNOWLEDGE_BASE: List[Dict] = [
    # 50 Web3 Security FAQ QA Pairs
    {"id": 1, "q": "What is a token honeypot?", "a": "A token honeypot is a malicious smart contract engineered to allow token purchases while restricting transfers or enforcing a 100% sell tax, preventing buyers from liquidating assets.", "kw": ["honeypot", "sell tax", "cannot sell", "transfer fee"]},
    {"id": 2, "q": "How does Aegivex detect 100% sell tax traps?", "a": "Aegivex executes automated static bytecode analysis and opcode simulation in < 0.4s to identify hidden sell fee restrictions and transfer function locks.", "kw": ["sell tax", "bytecode", "static analysis", "opcode"]},
    {"id": 3, "q": "What is a liquidity lock?", "a": "Liquidity locking time-locks decentralized exchange pool tokens (e.g. Uniswap LP) in a verifiable smart contract vault, preventing developers from pulling liquidity (rug pull).", "kw": ["liquidity", "lock", "lp", "rug pull"]},
    {"id": 4, "q": "How do hidden mint functions work?", "a": "Hidden mint functions allow contract owners to arbitrarily create unannounced token supplies, diluting existing holders and dumping new tokens into DEX liquidity pools.", "kw": ["mint", "hidden mint", "supply", "inflation"]},
    {"id": 5, "q": "Can a contract owner blacklist my wallet address?", "a": "Yes, malicious ERC20 implementations may contain mapping(address => bool) blacklist logic that freezes transfers for specific wallet identifiers.", "kw": ["blacklist", "freeze", "owner", "wallet lock"]},
    {"id": 6, "q": "What is proxy contract risk in tokens?", "a": "Upgradeable proxy contracts allow admin keys to modify underlying implementation code post-deployment, enabling unexpected fee updates or access restrictions.", "kw": ["proxy", "upgradeable", "admin key", "implementation"]},
    {"id": 7, "q": "Why do some tokens have 0% buy tax but 99% sell tax?", "a": "Attractors use 0% buy tax to entice retail buyers, while embedding high sell taxes to trap capital inside the liquidity pool.", "kw": ["buy tax", "tax imbalance", "trap"]},
    {"id": 8, "q": "How to check if token liquidity is burned or locked?", "a": "Enter the token contract address in the Aegivex Token Analyzer to verify LP burn transaction hashes and lock vault expiration timestamps.", "kw": ["burned", "lp burn", "vault time"]},
    {"id": 9, "q": "What does a 0x1f98 token audit report indicate?", "a": "0x1f98 is an example Uniswap contract vector. Aegivex scans verify contract verification status, proxy delegate calls, and transfer tax rules.", "kw": ["0x1f98", "uniswap", "token audit"]},
    {"id": 10, "q": "How fast is Aegivex token static bytecode analysis?", "a": "Aegivex performs complete EVM opcode decompression and vulnerability evaluation in under 0.4 seconds benchmark latency.", "kw": ["speed", "latency", "0.4s", "benchmark"]},

    {"id": 11, "q": "What is a wallet drainer contract?", "a": "Wallet drainers trigger signature requests (such as Permit2 or setApprovalForAll) to gain unauthorized spending access over all ERC20/NFT assets.", "kw": ["drainer", "permit", "approval"]},
    {"id": 12, "q": "How do malicious approval permits work?", "a": "Permit signatures off-chain authorize spender smart contracts to transfer tokens directly from your balance without needing on-chain approval transactions.", "kw": ["permit", "permit2", "allowance"]},
    {"id": 13, "q": "How can I revoke malicious token spending allowances?", "a": "Use wallet allowance revoke tools or Aegivex Wallet Audit to identify active spender approvals and execute uint256(0) approval transactions.", "kw": ["revoke", "unlimited approval", "reset spender"]},
    {"id": 14, "q": "What is address poisoning or zero-value transfer attack?", "a": "Attractors generate vanity addresses mimicking your common contacts and send 0 ETH transactions to trick you into copying the wrong address from history.", "kw": ["address poisoning", "vanity address", "copy paste attack"]},
    {"id": 15, "q": "Is my private key ever exposed during a wallet audit?", "a": "No. Aegivex is strictly non-custodial and operates exclusively on public blockchain ledger telemetry without requiring private keys.", "kw": ["private key", "seed phrase", "non custodial"]},
    {"id": 16, "q": "What is an unverified counterparty risk?", "a": "Interacting with newly generated wallet addresses associated with illicit mixer protocols or flagged drainer smart contracts.", "kw": ["counterparty", "mixer", "tornado"]},
    {"id": 17, "q": "How does Aegivex evaluate public wallet risk scores (0-100)?", "a": "Risk scores calculate approval exposure, transaction history with flagged contracts, domain interaction logs, and drainer permit signatures.", "kw": ["risk score", "wallet score", "score breakdown"]},
    {"id": 18, "q": "Can a wallet address be drained just by holding a scam NFT?", "a": "Holding an NFT cannot drain funds; however, visiting links embedded inside scam NFT descriptions and signing permits can cause loss.", "kw": ["scam nft", "holding nft", "airdrop nft"]},
    {"id": 19, "q": "What is a high-risk approval signature?", "a": "A signature payload granting uint256.max (unlimited) access to a spender contract that lacks verified source code.", "kw": ["unlimited approval", "high risk signature", "spender"]},
    {"id": 20, "q": "How to clear a flagged wallet address?", "a": "Revoke active unverified spender permits and disconnect unauthorized dApp session connections.", "kw": ["clear wallet", "clean address", "disconnect dapp"]},

    {"id": 21, "q": "What is a reentrancy attack vector?", "a": "Reentrancy occurs when an external call allows a recipient contract to recursively call back into the caller before state updates complete, draining funds.", "kw": ["reentrancy", "recursive call", "fallback"]},
    {"id": 22, "q": "What is access control vulnerability in Solidity?", "a": "Improper use of modifiers like onlyOwner or missing authorization checks, allowing public callers to execute privileged administrative functions.", "kw": ["access control", "onlyOwner", "solidity modifier"]},
    {"id": 23, "q": "What is an unverified proxy implementation?", "a": "A proxy contract pointing to logic bytecode that has not been submitted or verified on block explorers, hiding actual code execution.", "kw": ["unverified proxy", "unverified code", "bytecode"]},
    {"id": 24, "q": "How does Aegivex evaluate smart contract AST and opcode logic?", "a": "Aegivex parses Abstract Syntax Trees (AST) and EVM opcodes to check for unhandled exceptions, delegatecalls, and state variable collisions.", "kw": ["ast", "opcode", "evm", "delegatecall"]},
    {"id": 25, "q": "What is integer overflow / underflow?", "a": "Arithmetic errors occurring when calculations exceed data type storage limits, causing values to wrap around unless SafeMath or Solidity 0.8+ is used.", "kw": ["overflow", "underflow", "safemath"]},
    {"id": 26, "q": "What is flash loan price oracle manipulation?", "a": "Attractors borrow immense capital via flash loans to manipulate spot price oracles in single-block transactions, liquidating undercollateralized positions.", "kw": ["flash loan", "oracle manipulation", "twap"]},
    {"id": 27, "q": "How does Aegivex verify open-source contract code?", "a": "Aegivex queries block explorer APIs and verifies bytecode compilation matches published Solidity source code files.", "kw": ["open source", "verify code", "compiler"]},
    {"id": 28, "q": "What is a self-destruct contract vulnerability?", "a": "Use of SELFDESTRUCT (or INVALID opcodes) allowing malicious force-sending of Ether or destroying contract code state.", "kw": ["selfdestruct", "destroy contract"]},
    {"id": 29, "q": "What does a contract risk score under 20 mean?", "a": "A score under 20 indicates low risk: open-source verified code, standard access controls, zero reentrancy flaws, and verified proxy keys.", "kw": ["low risk score", "safe contract"]},
    {"id": 30, "q": "How to submit a custom contract deployment address for audit?", "a": "Paste the 0x address into the Aegivex Instant Scanner or Smart Contract Auditor tool page.", "kw": ["submit contract", "audit address"]},

    {"id": 31, "q": "What is typosquatting in Web3 dApps?", "a": "Attractors register domains similar to authentic dApps (e.g. unlswap.org instead of uniswap.org) to host drainer interfaces.", "kw": ["typosquatting", "fake domain", "phishing website"]},
    {"id": 32, "q": "How to detect fake Uniswap or OpenSea phishing websites?", "a": "Enter the dApp URL into the Aegivex Website & Domain Scanner to verify SSL certificate authority, domain registration age, and script payloads.", "kw": ["fake uniswap", "fake opensea", "phishing check"]},
    {"id": 33, "q": "What SSL checks does Aegivex perform on dApp domains?", "a": "Aegivex verifies SSL certificate issuer authenticity, expiration validity, and TLS 1.3 protocol encryption standards.", "kw": ["ssl", "tls", "certificate", "https"]},
    {"id": 34, "q": "Can a malicious website drain funds without wallet confirmation?", "a": "No. Web browsers cannot execute transfers without user signature confirmation; however, obfuscated popups can trick users into confirming.", "kw": ["drain without confirmation", "popup trick"]},
    {"id": 35, "q": "What is malicious script injection payload in Web3 frontends?", "a": "Tampered frontend JavaScript code injected into compromised dApps that replaces transaction destination addresses with hacker wallets.", "kw": ["script injection", "javascript payload"]},
    {"id": 36, "q": "How does Aegivex domain reputation scoring work?", "a": "Domain reputation analyzes registrar history, WHOIS data, SSL certification, DNS record stability, and reported drainer blacklists.", "kw": ["domain reputation", "whois", "dns check"]},
    {"id": 37, "q": "Why does domain registration age matter for dApp security?", "a": "Phishing domains are typically registered hours or days prior to attacks, whereas authentic dApps have years of established WHOIS history.", "kw": ["domain age", "whois age", "new domain"]},
    {"id": 38, "q": "How to verify official dApp URL endpoints?", "a": "Cross-reference dApp domains with verified CoinMarketCap/CoinGecko links and scan with Aegivex URL Auditor.", "kw": ["official url", "verify dapp"]},
    {"id": 39, "q": "What should I do if a website is flagged as a Critical Threat?", "a": "Close the browser tab immediately. Disconnect any active WalletConnect session and do not sign signature requests.", "kw": ["critical threat website", "flagged url"]},
    {"id": 40, "q": "How fast is dApp URL domain verification?", "a": "Aegivex inspects domain DNS, SSL authority, and script payloads in real-time under 0.4s benchmark latency.", "kw": ["url speed", "domain scan speed"]},

    {"id": 41, "q": "What is transaction ABI calldata decoding?", "a": "Decoding raw hex function selectors and parameters into human-readable operations (e.g. transfer(address recipient, uint256 amount)).", "kw": ["calldata", "abi decoding", "hex decoder"]},
    {"id": 42, "q": "What is pre-execution transaction simulation?", "a": "Simulating transaction execution in a local EVM fork to calculate exact state overrides, token balance changes, and gas usage prior to signing.", "kw": ["pre execution", "simulation", "evm fork"]},
    {"id": 43, "q": "How does OKX X Layer integration enhance Aegivex security?", "a": "Aegivex provides dedicated opcode heuristics and threat signature monitoring optimized for OKX X Layer Layer-2 ecosystem protocol standards.", "kw": ["okx", "x layer", "okx hackathon"]},
    {"id": 44, "q": "Which multi-chain networks does Aegivex support?", "a": "OKX X Layer, Ethereum Mainnet, Solana Network, Arbitrum One, Base Network, and Polygon PoS.", "kw": ["multi-chain", "supported networks", "ethereum"]},
    {"id": 45, "q": "What is the latency benchmark for transaction risk analysis?", "a": "Sub-0.4 second response latency ensures real-time pre-signature threat evaluation without delaying wallet interaction flows.", "kw": ["latency", "sub 0.4s"]},
    {"id": 46, "q": "How does Aegivex achieve a 99.9% vulnerability detection rate?", "a": "By combining static bytecode decompilation, AST pattern recognition, dynamic opcode simulation, and threat intelligence telemetry.", "kw": ["99.9%", "vulnerability rate", "detection rate"]},
    {"id": 47, "q": "Is Aegivex AI platform non-custodial?", "a": "Yes, Aegivex NEVER asks for, stores, or accesses user private keys, seed phrases, or custodial wallet balances.", "kw": ["non custodial", "seed phrase"]},
    {"id": 48, "q": "What are the differences between User and Admin roles?", "a": "Users access personal risk scans and AI Copilot. Admins access global threat telemetry, live support inbox, user RBAC controls, and audit logs.", "kw": ["user role", "admin role", "rbac"]},
    {"id": 49, "q": "How to contact on-call security engineers for custom audits?", "a": "Type your inquiry in the Live Support Chat widget. An on-call engineer or automated FAQ auto-reply engine will assist immediately.", "kw": ["support engineer", "contact", "live chat"]},
    {"id": 50, "q": "How is Aegivex AI structured for the OKX.AI Genesis Hackathon?", "a": "Aegivex AI is built as an autonomous Web3 threat intelligence copilot delivering real-time pre-execution risk assessment across OKX X Layer and major multi-chain ecosystems.", "kw": ["okx genesis", "hackathon project", "aegivex ai"]}
]

def find_faq_answer(user_query: str) -> Optional[Dict]:
    q_lower = user_query.lower().strip()
    if not q_lower:
        return None

    # Keyword match scoring
    best_match = None
    max_score = 0

    for item in FAQ_KNOWLEDGE_BASE:
        score = 0
        for kw in item["kw"]:
            if kw.lower() in q_lower:
                score += 2
        for word in item["q"].lower().split():
            if len(word) > 3 and word in q_lower:
                score += 1

        if score > max_score:
            max_score = score
            best_match = item

    return best_match if max_score >= 2 else None
