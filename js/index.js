import { abi as ethanolTokenABI } from './abi/Ethanol.js';
import { abi as ethanolVestABI } from "./abi/EthanolVault.js";
const connectWallet = document.querySelector('.connect');
const walletAddress = document.querySelector('.wallet-address');
const claim_rewards = document.querySelector('.claimRewards');

const userBalanceEnol = document.querySelector('.user-enol-balance');
const userBalanceUSDT = document.querySelector('.user-usdt-balance');


const rewardsClaimableEnol = document.querySelector('.rewards-claimable-enol');
const rewardsClaimableUSDT = document.querySelector('.rewards-claimable-usdt');

const rewardsCashbackLimitPercent = document.querySelector('.rewards-limit-percent');
const rewardsCashbackLimitUSDT = document.querySelector('.rewards-limit-usdt');

// rewards-capacity-usd

const apiKey = '7QEMXYNDAD5WT7RTA5TQUCJ5NIA99CSYVI ';
const EthanolAddress = '0x63D0eEa1D7C0d1e89d7e665708d7e8997C0a9eD6';
const EthnolVestAddress = '0xf34F69fB72B7B6CCDbdA906Ad58AF1EBfAa76c42';
const startBlock = 11297376;

let web3;
let EthanolToken;
let EthanolVault;
let user;

const toWei = _amount => web3.utils.toWei(_amount.toString(), 'ether');
const fromWei = _amount => web3.utils.fromWei(_amount.toString(), 'ether');

// window.addEventListener('DOMContentLoaded', async () => {
//   await connectDAPP();
// })

const loadWeb3 = async () => {
    if(window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        // cancel autorefresh on network change
        window.ethereum.autoRefreshOnNetworkChange = false;

    } else if(window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
    } else {
        alert("Non-Ethereum browser detected. You should consider trying Metamask")
    }
}

const loadBlockchainData = async () => {
    let networkType;
    try {
        web3 = window.web3;

        networkType = await web3.eth.net.getNetworkType();

        if(networkType !== "main") {
            alert("Connect wallet to a main network");
            throw new Error();
        }

        EthanolToken = new web3.eth.Contract(ethanolTokenABI, EthanolAddress);
        EthanolVault = new web3.eth.Contract(ethanolVestABI, EthnolVestAddress);
        const accounts = await web3.eth.getAccounts();
        user = accounts[0];

        const firstAddressPart = shortener(user, 0, 5);
        const lastAddressPart = shortener(user, 35, 42);
        walletAddress.textContent = `${firstAddressPart}...${lastAddressPart}`;
        await settings();
    } catch (error) {
        console.error(error);
        return error;
    }
}

const connectDAPP = async () => {
    await loadWeb3();
    await loadBlockchainData(); 
}

const shortener = (_data, _start, _end) => {
    let result = '';
    for(let i = _start;  i < _end; i++) result = [...result, _data[i]];
    return result.join('');
}


const settings = async () => {

    // Get latest block number
    const latestBlockNumber = await web3.eth.getBlockNumber();
    
    // // Current user ENOL balance
    const _enolBalance = await balanceOf(user);

    // ENOL - USD price
    let enolPrice = await getCurrentPrice('ethanol');
    enolPrice = enolPrice.ethanol.usd;

    // User Balance
    const _balance = await balanceOf(user);
    userBalanceEnol.textContent = `${Number(fromWei(_balance)).toFixed(2)} ENOL`;
    const _balanceToUSDT = (Number(fromWei(_balance)) * Number(enolPrice)).toString();
    userBalanceUSDT.textContent = `${Number(_balanceToUSDT).toFixed(2)} USDT`;

    // Cashback Limit
    const _cashbackLimit = await calculateRewards();
    rewardsCashbackLimitPercent.textContent = `${Number(_cashbackLimit).toFixed(2)} %`;
    await calcCashbackPercentToUSDT(_balance);

    // Claimable rewards
    const claimable = await checkRewards();
    rewardsClaimableEnol.textContent = `${Number(fromWei(claimable)).toFixed(2)} ENOL`;
    const claimableToUSDT = (Number(fromWei(claimable)) * Number(enolPrice)).toString(); 
    rewardsClaimableUSDT.textContent = `${Number(claimableToUSDT).toFixed(2)} USDT`;

}

const balanceOf = async _account => {
    const _user = _account ? _account : user;
    return await EthanolToken.methods.balanceOf(_user).call();
}

const checkRewards = async () => {
    try {
        let result = await EthanolVault.methods.checkRewards(user).call();
        return result.toString();
    } catch (error) {
        console.error(error.message)
    }
}

const getCurrentPrice= async (token) => {
    try {
        let result = await (await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${token}&vs_currencies=USD`)).json();
        return result;
    } catch (error) {
        console.log(error)
    }
}

const calculateRewards = async () => {
    try {
        const _balance = (await balanceOf(user)).toString();
        let result  = '0';
        if(Number(fromWei(_balance)) > '2' && Number(fromWei(_balance)) < '5') {
            result = '10';
        } else if(Number(fromWei(_balance)) >= '5' && Number(fromWei(_balance)) < '10') {
            result = '20'
        } else if(Number(fromWei(_balance)) >= '10' && Number(fromWei(_balance)) < '20') {
            result = '30'
        } else if(Number(fromWei(_balance)) >= '20' && Number(fromWei(_balance)) < '30') {
            result = '40'
        } else if(Number(fromWei(_balance)) >= '30' && Number(fromWei(_balance)) < '40') {
            result = '50'
        } else if(Number(fromWei(_balance)) >= '40' && Number(fromWei(_balance)) < '99') {
            result = '60'
        } else if(Number(fromWei(_balance)) >= '100') {
            result = '100'
        }
        return result.toString();
    } catch (error) { console.log(error.message) }
}

const calcCashbackPercentToUSDT = async (_enolBalance) => {
    const _perDay = "Per Day";
    if(Number(fromWei(_enolBalance)) >= 100) {
        rewardsCashbackLimitUSDT.textContent = `1000.00 USDT ${_perDay}`;
    } else if(Number(fromWei(_enolBalance)) >= 75) {
        rewardsCashbackLimitUSDT.textContent = `400.00 USDT ${_perDay}`;
    } else if (Number(fromWei(_enolBalance)) >= 60) {
        rewardsCashbackLimitUSDT.textContent = `200.00 USDT ${_perDay}`;
    } else {
        rewardsCashbackLimitUSDT.textContent = `100.00 USDT ${_perDay}`;
    }
}

connectWallet.addEventListener('click', async e => {
    await connectDAPP();
    connectWallet.classList.add('hide');
})


claim_rewards.addEventListener('click', async e => {
    e.preventDefault();
    try {
        const _rewards = await checkRewards();
        await EthanolVault.methods.withdrawRewards(_rewards);
        alert('Transaction successful')
    } catch (error) {
        console.log(error)
    }
})