import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { Button } from "./tamagui/Button";
import { useEffect, useState } from "react";
import { View, Text } from "tamagui";
import axios from "axios";

WebBrowser.maybeCompleteAuthSession();

const LoginWithGoogle = () => {
  const [user, setUser] = useState({});

  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId:
      "752351252259-1h0b5cl6ip8qjpv1dco7ha6kd6ptaljf.apps.googleusercontent.com",
  });

  const getUserProfile = async (token: any) => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const user = await response.json();
      setUser(user);
      // console.log(user, "user");
    } catch (error) {
      console.log(error);
    }
  };

  // 8eb316bd-d983-4920-a5e4-b4e79903a598
  // d75644f0-500b-4eaf-8fac-51babfc1490f

  const handleToken = () => {
    if (response?.type === "success") {
      const { authentication } = response;
      const token = authentication?.accessToken;
      getUserProfile(token);
      // console.log("access token", authentication?.);
    }
  };
  console.log(user);

  useEffect(() => handleToken(), [response]);

  return (
    <View>
      {/* <Text>{`Welcome back ${user.given_name}`}</Text> */}

      <Button onPress={() => promptAsync()}>Login with Google</Button>
    </View>
  );
};

export default LoginWithGoogle;
