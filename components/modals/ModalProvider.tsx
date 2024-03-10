"use client";

import * as React from "react";
import SubscriptionModal from "./SubscriptionModal";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = React.useState(false);
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <SubscriptionModal />
    </>
  );
};

export default ModalProvider;
