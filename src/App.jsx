import {
  Box,
  Center,
  Flex,
} from '@chakra-ui/react';
import { Alchemy, Network, Utils } from 'alchemy-sdk';
import { useState, useEffect } from 'react';
import { ethers  } from 'ethers';
import Table from './Table.jsx'
import SearchBar from './SearchBar.jsx';
import Spinner from './Spinner.jsx'


const provider = new ethers.providers.Web3Provider(window.ethereum);

function App() {
  const [userAddress, setUserAddress] = useState('');
  const [results, setResults] = useState([]);
  const [hasQueried, setHasQueried] = useState(false);
  const [tokenDataObjects, setTokenDataObjects] = useState([]);
  const [spin, setSpin] = useState(false);
  const [error, setError ] = useState("");



  useEffect( () => {
    
    async function getAccounts() {
      const accounts = await provider.send('eth_requestAccounts', []);
      setUserAddress(accounts[0]);
      console.log(userAddress);
      setUserAddress("0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045")
    }

    getAccounts();

  }, [])

   function isAccount(){
      let address = userAddress;

      if ( address.charAt(1) != 'x'){
        address = '0x' + address;
      }
      const byteCount = ethers.utils.hexDataLength(address);
      console.log(byteCount);
      if ( byteCount!= 20){
        setError("Invalid Address");
        return false;
      }
      return true;
  }



  async function getTokenBalance() {
    setSpin(true);
    setHasQueried(false);
    setError("");
    if (isAccount()){
          const config = {
            apiKey: 'JgKX773fegjY277gz5QSDm1ZjJjO7Vbb',
            network: Network.ETH_MAINNET,
          };

          const alchemy = new Alchemy(config);
          const data = await alchemy.core.getTokenBalances(userAddress);

          setResults(data);

          const tokenDataPromises = [];

          for (let i = 0; i < data.tokenBalances.length; i++) {
            const tokenData = alchemy.core.getTokenMetadata(
              data.tokenBalances[i].contractAddress
            );
            tokenDataPromises.push(tokenData);
          }

          setTokenDataObjects(await Promise.all(tokenDataPromises));
          setHasQueried(true);

  }
    setSpin(false);

  }
  return (
    <Box w="100vw">
      <Center>
        <Flex
          alignItems={'center'}
          justifyContent="center"
          flexDirection={'column'}
        >
          <h1>
            ERC-20 Token Indexer
          </h1>
        </Flex>
      </Center>
      <Flex
        w="100%"
        flexDirection="column"
        alignItems="center"
        justifyContent={'center'}
      >
        <SearchBar value={userAddress} setValue={setUserAddress} search={getTokenBalance} />
        {hasQueried ? (
           ( < Table Value={results.tokenBalances} Meta={tokenDataObjects} />)
        ) : (
          spin ?  ( <Spinner />) : ('Please make a query! This may take a few seconds...')
        )}

        <h2>{error}</h2>
      </Flex>
    </Box>
  );
}

export default App;
