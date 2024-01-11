async function ClaimAirdropNoRefer(reciept, amount) {
  await window.ethereum.request({ method: "eth_requestAccounts" });
  const provider = new window.ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const contractAddress = "0x4ed58C3a853c034EcD476cC828f1e9fabcF3AD0f";
  const abi = [
    {
      inputs: [
        { internalType: "address", name: "_tokenAddress", type: "address" },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "recipient",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "AirdropCompleted",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "referral",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "ReferralAirdropCompleted",
      type: "event",
    },
    {
      inputs: [
        { internalType: "address", name: "recipient", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "ClaimAirdropNoRefer",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "recipient", type: "address" },
        { internalType: "address", name: "referral", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "ClaimAirdropRefer",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [],
      name: "airdropFee",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "", type: "address" }],
      name: "claimedAmounts",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "", type: "address" }],
      name: "hasClaimed",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "recipientMaxTokenLimit",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "", type: "address" }],
      name: "reffEarning",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "tokenAddress",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "total",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "withdrawAllTokens",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];
  const feeValue = window.ethers.utils.parseUnits("0.0001", "ether");
  const contract = new window.ethers.Contract(contractAddress, abi, signer);

  amount = amount.toString() + "000000000000000000";

  try {
    console.log(reciept, amount);
    const result = await contract.ClaimAirdropNoRefer(reciept, amount, {
      value: feeValue,
      gasLimit: 300000,
    });
    console.log("done");
    console.log("Result:", await result.wait());
    return await result.wait();
  } catch (error) {
    console.log(error);
  }
}
export default ClaimAirdropNoRefer;
