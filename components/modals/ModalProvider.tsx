"use client";

import * as React from "react";
import SubscriptionModal from "./SubscriptionModal";
import CancelDialog from "./CancelDialog";

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
      <CancelDialog />
    </>
  );
};

export default ModalProvider;
