import "./App.css";
import { ArweaveWalletKit, ConnectButton } from "arweave-wallet-kit";
import { message, createDataItemSigner, result } from "@permaweb/aoconnect";
import { useState } from "react";

function App() {
		const [userMessage, setUserMessage] = useState("")
    const [messageResponse, setMessageResponse] = useState(null)
    const myProcess = "TYbwLfomIpNMi_D4aF6Wm9iNrOsOOPgcJ8ajv6qRA6k"
    
    const handleMessageChange = (event) => {
        setUserMessage(event.target.value);
    };
    
    async function sendAOMessage() {
		    const response = await message({
		        process: myProcess,
		        tags: [{ name: "Action", value: "Dumify" }],
		        signer: createDataItemSigner(window.arweaveWallet),
		        data: userMessage
		    })
		    const r = await result({
		        message: response,
		        process: myProcess
		    });
		    setMessageResponse(r.Messages[0].Data)
    }
    
    return (
        <ArweaveWalletKit config={{
		        permissions: ["ACCESS_ADDRESS", "SIGN_TRANSACTION"],
		        ensurePermissions: true
		    }}>
				    <div className="App">
						    <h1>dumnotes</h1>
						    <ConnectButton profileModal={true} />
						    <input 
								    type="text"
								    value={userMessage}
								    onChange={handleMessageChange}
								    placeholder="Hello World!" 
								 />
								 <button onClick={sendAOMessage}>send message</button>
								 <p>{messageResponse || ""}</p>
					  </div>
            <p>
              Check out some phrases you can use{" "}
              <a
                  href="https://arfleet.arweave.net/#/download/924c158b3c9bde8616cb8cad403029073b99de4d7961a43424b2b6496c2b0fc6/WrKsXXGDaGDB2mwnzfmONdmryRgxPCxt8t-GH7kExMw/ZGVtby5qcGVn/https%3A%2F%2Fp1.arfleet.io"
                  target="_blank"
                  rel="noopener noreferrer"
              >
                  here
              </a>
            </p>
			  </ArweaveWalletKit>
	  );
}

export default App;