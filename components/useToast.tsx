import Toast, {
  ToastConfig,
  BaseToast,
  BaseToastProps,
} from "react-native-toast-message";

export const toastConfig: ToastConfig = {
  success: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={{
        marginTop: 20,
        borderLeftColor: "green",
        backgroundColor: "#e6ffed", // Light green background
      }}
      text1Style={{
        color: "green",
        fontWeight: "bold",
      }}
      text2Style={{
        color: "#555",
      }}
    />
  ),
  error: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={{
        marginTop: 20,
        borderLeftColor: "red",
        backgroundColor: "#ffe6e6", // Light red background
      }}
      text1Style={{
        color: "red",
        fontWeight: "bold",
      }}
      text2Style={{
        color: "#555",
      }}
    />
  ),
};

export const useToast = () => {
  const SuccessToast = (message: string) => {
    Toast.show({
      type: "success",
      text1: message,
    });
  };

  const ErrorToast = (message: string) => {
    Toast.show({
      type: "error",
      text1: message,
    });
  };

  return { SuccessToast, ErrorToast };
};
