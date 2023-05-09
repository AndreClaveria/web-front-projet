import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <style>
          {`
          body {
            background-color: white;
          }
          .background {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(255, 255, 255, 0.8);
           z-index: -1
           
          }
          .circle {
            position: absolute;
            top: 10%;
            left: 10%;
            transform: translate(-50%, -50%);
            width: 1000px;
            height: 1000px;
            border-radius: 50%;
            background-image: radial-gradient(#5c68d3, #9869bc);
            
          }

          .circle2 {
            position: absolute;
            bottom: 10%;
            right: 10%;
            transform: translate(-50%, -50%);
            width: 1000px;
            height: 1000px;
            border-radius: 50%;
            background-image: radial-gradient(#5c68d3, #9869bc);
       
          }
        `}
        </style>
      </Head>
      <body>
        <div className="background">
          <div className="circle" />
          <div className="circle2" />
        </div>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
