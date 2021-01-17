const monthlySave = document.querySelector('.monthly-save');
const yearlySave = document.querySelector('.yearly-save');
const approveEnol = document.querySelector('.approve-form');
const walletAddress = document.querySelector('.wallet-address');
const lockedAmountOutput = document.querySelector('.lokced-amount-enol');
const connectWallet = document.querySelector('.connect');


import { abi as ethanolTokenABI } from './abi/Ethanol.js';
import { abi as ethanolVestABI } from "./abi/EthanolVault.js";

const EthanolAddress = '0x63D0eEa1D7C0d1e89d7e665708d7e8997C0a9eD6';
const EthanolVestAddress = '0xf34F69fB72B7B6CCDbdA906Ad58AF1EBfAa76c42';

let web3;
let EthanolToken;
let EthanolVault;
let user;

const toWei = _amount => web3.utils.toWei(_amount.toString(), 'ether');
const fromWei = _amount => web3.utils.fromWei(_amount.toString(), 'ether');

window.addEventListener('DOMContentLoaded', async () => {
  await connectDAPP();
})

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
        EthanolVault = new web3.eth.Contract(ethanolVestABI, EthanolVestAddress);
        const accounts = await web3.eth.getAccounts();
        user = accounts[0];

        const firstAddressPart = shortener(user, 0, 5);
        const lastAddressPart = shortener(user, 35, 42);
        walletAddress.textContent = `${firstAddressPart}...${lastAddressPart}`;


        await getPastEvents('_LockSavings');
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

const getPastEvents = async _data => {
    try {
        // Last blocknumber = 11457376
        const latestBlockNumber = await web3.eth.getBlockNumber();

        let result = await EthanolVault.getPastEvents(_data, { fromBlock: '0', toBlock: latestBlockNumber });
        result = await formatEvents(result);
        let value = 0;
        for(let i = 0; i < result.length; i++) {
            if(result[i].stakeholder === user) return value = result[i];
        }
        value = Number(value.stake).toFixed(2);
        if(isNaN(value)) value = 0;
        lockedAmountOutput.textContent = `Total amount saved: ${value} ENOL`
    } catch (error) { console.log(error) }
}

const formatEvents = async _data => {
    try {
        let returnValues = [];

       for(let i = 0; i < _data.length; i++) {
            const _values = _data[i].returnValues;
            returnValues = [...returnValues, {
                stakeholder: _values.stakeholder,
                stake: fromWei(_values.stake),
                unlockTime: _values.unlockTime
            }];

       }
        return returnValues;
    } catch (error) { console.log(error) }
}

approveEnol.addEventListener('submit', async e => {
    e.preventDefault();
    try {
        const input = e.currentTarget.elements[0].value;
        await EthanolToken.methods.approve(EthanolVestAddress, toWei(input)).send({
            from: user,
        });
        alert("Transaction successful");
    } catch (error) {
        alert(error.message);
        return;
    }
})

monthlySave.addEventListener('submit', async e => {
    e.preventDefault();
    try {
        const input = e.currentTarget.elements[0].value;
        const gasPrice = await web3.eth.getGasPrice();
        await EthanolVault.methods.monthlySave("1", toWei(input)).send({
            from: user,
            gas: '1000000',
            gasPrice
        });
        alert("Transaction successful");
    } catch (error) {
        alert(error.message);
        return;
    }
})

yearlySave.addEventListener('submit', async e => {
    e.preventDefault();
    try {
        const input = e.currentTarget.elements[0].value;
        const gasPrice = await web3.eth.getGasPrice();
        await EthanolVault.methods.yearlySave(toWei(input)).send({
            from: user,
            gas: '1000000',
            gasPrice
        });
        alert("Transaction successful");
    } catch (error) {
        alert(error.message);
        return;
    }
})

connectWallet.addEventListener('click', async e => {
    await connectDAPP();
    connectWallet.classList.add('hide');
})