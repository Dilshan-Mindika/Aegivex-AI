import urllib.request
import json
import logging
from typing import Dict, Any, Optional
from config import settings

logger = logging.getLogger(__name__)

ETHERSCAN_V2_BASE_URL = "https://api.etherscan.io/v2/api"

class EtherscanService:
    def __init__(self, api_key: Optional[str] = None):
        self.api_key = api_key or settings.ETHERSCAN_API_KEY or "MV5HHIUSX25KSCAXPIXZAG6X6E9X6BP7Y9"

    def _make_request(self, params: Dict[str, str], chain_id: int = 1) -> Optional[Dict[str, Any]]:
        """
        Executes HTTP GET request against Etherscan V2 API endpoint with rate handling.
        """
        try:
            params["chainid"] = str(chain_id)
            params["apikey"] = self.api_key
            query_string = "&".join([f"{k}={v}" for k, v in params.items()])
            url = f"{ETHERSCAN_V2_BASE_URL}?{query_string}"

            req = urllib.request.Request(
                url, 
                headers={"User-Agent": "Aegivex-AI-Security-Copilot/1.0"}
            )
            with urllib.request.urlopen(req, timeout=8) as response:
                res_data = response.read().decode("utf-8")
                data = json.loads(res_data)
                return data
        except Exception as e:
            logger.error(f"Etherscan V2 API request error: {e}")
            return None

    def get_contract_source_code(self, contract_address: str, chain_id: int = 1) -> Dict[str, Any]:
        """
        Fetches verified contract source code, compiler version, and proxy status from Etherscan V2.
        """
        params = {
            "module": "contract",
            "action": "getsourcecode",
            "address": contract_address
        }
        res = self._make_request(params, chain_id=chain_id)
        if res and res.get("status") == "1" and isinstance(res.get("result"), list) and len(res["result"]) > 0:
            contract_info = res["result"][0]
            is_verified = contract_info.get("ABI") != "Contract source code not verified"
            return {
                "verified": is_verified,
                "contract_name": contract_info.get("ContractName", "Unverified Contract"),
                "compiler_version": contract_info.get("CompilerVersion", "N/A"),
                "optimization": contract_info.get("OptimizationUsed", "0") == "1",
                "runs": contract_info.get("Runs", "0"),
                "source_code": contract_info.get("SourceCode", ""),
                "abi": contract_info.get("ABI", ""),
                "proxy": contract_info.get("Proxy", "0") == "1",
                "implementation": contract_info.get("Implementation", ""),
                "evm_version": contract_info.get("EVMVersion", "Default")
            }

        return {
            "verified": False,
            "contract_name": "Unverified Contract",
            "compiler_version": "N/A",
            "optimization": False,
            "source_code": "",
            "abi": "",
            "proxy": False
        }

    def get_address_balance(self, address: str, chain_id: int = 1) -> float:
        """
        Retrieves native chain balance for a target address in ETH.
        """
        params = {
            "module": "account",
            "action": "balance",
            "address": address,
            "tag": "latest"
        }
        res = self._make_request(params, chain_id=chain_id)
        if res and res.get("status") == "1" and res.get("result"):
            try:
                wei = int(res["result"])
                return wei / 1e18
            except (ValueError, TypeError):
                pass
        return 0.0

    def get_recent_transactions(self, address: str, limit: int = 10, chain_id: int = 1) -> list:
        """
        Fetches recent transaction history for address risk scoring.
        """
        params = {
            "module": "account",
            "action": "txlist",
            "address": address,
            "startblock": "0",
            "endblock": "99999999",
            "page": "1",
            "offset": str(limit),
            "sort": "desc"
        }
        res = self._make_request(params, chain_id=chain_id)
        if res and res.get("status") == "1" and isinstance(res.get("result"), list):
            return res["result"]
        return []

etherscan_service = EtherscanService()
