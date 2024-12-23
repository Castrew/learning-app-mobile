"use client";

import React from "react";
import { StyleSheet } from "react-native";
import {
  Image,
  ScrollView,
  SizableText,
  styled,
  Paragraph,
  Text,
  View,
  YStack,
} from "tamagui";

import Colors from "@/constants/Colors";
import { useGetAllTreatments } from "@/core/react-query/treatments/hooks/useGetAllTreatmets";
import { LinearGradient } from "./expo/LinearGradient";

const HomeScreen = () => {
  const { data, isLoading } = useGetAllTreatments();

  return (
    <LinearGradient>
      <ScrollView h="100%">
        <YStack gap={20} alignItems="center">
          <View alignItems="center">
            <Text fontSize={25} fontWeight="bold">
              POUR ELLE
            </Text>
            <Text>WHERE NAILS TELL YOUR STORY</Text>
          </View>
          <Image
            source={require("../assets/images/logo.png")}
            width={200}
            height={200}
          />
          <Paragraph size="$4" lineHeight="$2">
            Ladies, if you believe that your nails are more than just partt of
            your look, if you see them as an extension of your personality and a
            way to express your unique style, then our studio is the perfect
            place for you!
          </Paragraph>
          <Paragraph size="$4" lineHeight="$2">
            Our talanted team of nail artists is dedicated to providing a
            professional and personalized experience every time you visit. We
            pride ourselfs on our ability to listen, understand and create
            exactrly what you envision - whenther it is a fresh bold design that
            lets you stand out or a refined, polished look that exudes
            sophistication!
          </Paragraph>
          <Text>Here will be the list of the Members</Text>
          <Paragraph size="$4" lineHeight="$2">
            Come in, treat yourself, and let us help you find a nail style that
            makes you feel good, whether it is a daring new design or a chic,
            classic look. Because you deserve to feel confident and fabulous
            every day, and we are here to make that happen. That is what we can
            offer you!
          </Paragraph>
        </YStack>
      </ScrollView>
    </LinearGradient>
  );
};
export default HomeScreen;
