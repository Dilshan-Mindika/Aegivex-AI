import re

def is_valid_evm_address(address: str) -> bool:
    """Validate 42-character 0x-prefixed EVM wallet or contract address."""
    return bool(re.match(r"^0x[a-fA-F0-9]{40}$", address.strip()))

def is_valid_tx_hash(tx_hash: str) -> bool:
    """Validate 66-character 0x-prefixed transaction hash."""
    return bool(re.match(r"^0x[a-fA-F0-9]{64}$", tx_hash.strip()))

def categorize_risk_level(risk_score: int) -> str:
    """Classify risk score into Low, Medium, or High categorical rating."""
    if risk_score >= 70:
        return "High"
    elif risk_score >= 30:
        return "Medium"
    else:
        return "Low"
