import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { useEffect } from "react";
import { APIAxiosInstance } from "@/axios/api-axios-instance";
import { saveToken } from "@/secureStoreActions";
import { useSession } from "@/session/SessionProvier";
import { LogIn } from "@tamagui/lucide-icons";

WebBrowser.maybeCompleteAuthSession();

const LoginWithGoogle = () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId:
      "752351252259-1h0b5cl6ip8qjpv1dco7ha6kd6ptaljf.apps.googleusercontent.com",
  });

  //
  const googleResponse = response;

  const sendUserData = async (user) => {
    try {
      const response = await APIAxiosInstance.post(
        "http://localhost:3000/api/mobileAuth/user",
        { user, googleResponse }
      );
      return response.data;
    } catch (error) {
      console.error("Error occurred:", error.message);
      console.error(
        "Error details:",
        error.response ? error.response.data : null
      );

      return {
        success: false,
        message: error.message,
        errorDetails: error.response ? error.response.data : null,
      };
    }
  };

  const { login } = useSession();

  const getUserProfile = async (token: any) => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const user = await response.json();
      const googleUser = await sendUserData(user);
      saveToken("userToken", JSON.stringify(googleUser));
      await login(googleUser);
    } catch (error) {}
  };

  const handleToken = () => {
    if (response?.type === "success") {
      const { authentication } = response;
      const token = authentication?.accessToken;
      getUserProfile(token);
    }
  };

  useEffect(() => {
    handleToken();
  }, [response]);

  return (
    <LogIn
      marginRight={20}
      color={"$blue10Light"}
      onPress={() => promptAsync()}
    ></LogIn>
  );
};

export default LoginWithGoogle;
