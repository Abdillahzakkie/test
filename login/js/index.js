const connectWallet = document.querySelector('.connect-btn');
const formLogin = document.querySelector('#flogin');

import { abi as ethanolTokenABI } from './abi/Ethanol.js';

const EthanolAddress = '0x63D0eEa1D7C0d1e89d7e665708d7e8997C0a9eD6';

let web3;
// let EthanolToken;
let user;

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

        new web3.eth.Contract(ethanolTokenABI, EthanolAddress);
        const accounts = await web3.eth.getAccounts();
        user = accounts[0];
        formLogin.innerHTML = `
            <form action="loginb.php" method="post" id="flogin">
                <div class="border-box">
                    <h2>Connect your wallet</h2>
                    <label for="uname" id="un">Your wallet address:</label>
                    <input type="text" name="user" value=${user} id="username"><br/>
                    
                    <button type="submit" class="connect-btn" value="Login" id="submit">Connect</button>
                    
                    <a class="dont_ac" href="register.php">If you Don't have account</a>
                </div>
            </form>
        `;

        console.log(user)

    } catch (error) {
        console.error(error)
    }
}


const connectDAPP = async () => {
    await loadWeb3();
    await loadBlockchainData(); 
}

connectWallet.addEventListener('click', async e => {
    e.preventDefault();
    await connectDAPP();
})