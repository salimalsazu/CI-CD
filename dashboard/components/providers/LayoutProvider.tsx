"use client";
import store from "@/redux/store";
import { Provider } from "react-redux";

const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <div className="dark:bg-boxdark-2 dark:text-bodydark">
        <div>{children}</div>
      </div>
    </Provider>
  );
};

export default LayoutProvider;
