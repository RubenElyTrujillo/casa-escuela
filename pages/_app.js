import sanityClient from "../client";

import "bootstrap/dist/css/bootstrap.css";
import "../styles/globals.css";

import { motion } from "framer-motion";
import AppContext from "../components/AppContext";

function MyApp({ Component, pageProps, router }) {
  return (
    <AppContext.Provider value={pageProps.globalConfig}>
      <motion.div
        key={router.route}
        initial="initial"
        animate="animate"
        variants={{
          initial: {
            opacity: 0,
          },
          animate: {
            opacity: 1,
          },
        }}
        transition={{ duration: 0.75, times: [0, 0.2, 1] }}
      >
        <Component {...pageProps} />
      </motion.div>
    </AppContext.Provider>
  );
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  // Add site config from sanity
  try {
    const data = await sanityClient.fetch(
      `*[_id == "global-config"] {
        title,
        url,
        file,
        shopUrl
      }[0]`
    );

    if (data) {
      pageProps.globalConfig = data;
    }
  } catch (err) {
    /* Handle error */
  }

  return {
    pageProps,
  };
};

export default MyApp;
