import { useWallet } from "@solana/wallet-adapter-react"
import { useProgram, useClaimNFT, useClaimConditions, useProgramMetadata } from "@thirdweb-dev/react/solana"
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import styles from "../styles/Login.module.css";


require("@solana/wallet-adapter-react-ui/styles.css");

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

const Login: NextPage = () => {
  const { program } = useProgram("3omU8aCuj8rZKwEHBx39ciQAMtEDU1L12N68bPE2Kz7r", "nft-drop");
  const { mutateAsync: claim, isLoading} = useClaimNFT(program);
  const {data: conditions, isLoading: conditonsIsLoading } = useClaimConditions(program);
  const { publicKey } = useWallet();

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <WalletMultiButtonDynamic />
      </div>
      <div className={styles.container}>
        <div className={styles.iconContainer}>

        </div>
        <h1 className={styles.h1}>SoapcloudsNFT</h1>
        {!publicKey ? <p>Connect your wallet.</p> :
         <>
         <div>
          <button className={styles.btn} onClick={() => {}}>
            Login
          </button>
          <p>You can only login if you own am SoapCloudsNFT.</p>
         </div>
        <button className={styles.btn} disabled={isLoading} onClick={() => claim({amount: 1})}>
      claim 
    </button>
    {conditonsIsLoading ? <p>?/?</p> :
    <p>{conditions?.totalAvailableSupply}/{conditions?.claimedSupply}
    </p>
    }
    </>}
      </div>
    </div>
  );
};

export default Login;
