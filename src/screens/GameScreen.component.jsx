import React, { useState, useEffect } from "react";
import { View, Dimensions, StyleSheet, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useSelector, useDispatch } from "react-redux";

import { initGameAction } from "../redux/actions/game.actions";

import Header from "../components/UI-components/Header.component";
import CustomText from "../components/UI-components/CustomText.component";
import Board from "../components/game-components/Board.component";
import GameOverModal from "../components/UI-components/GameOverModal.component";

import Colors from "../constants/colors";
import i18n from "../services/internationalization/i18n";
import { Locale } from "../commons/types/i18n";

const windowWidth = Dimensions.get("window").width;

const GameScreen = () => {
  const isGameOver = useSelector((state) => state.game.isGameOver);

  const [modalVisibility, setModalVisibility] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(Locale.sanskrut);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isGameOver) setModalVisibility(true);
  }, [isGameOver]);

  const closeModal = () => {
    dispatch(initGameAction());
    setModalVisibility(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Header />

        <View style={styles.instructionsContainer}>
          <CustomText style={styles.instructionsText}>
            {i18n.t("instructionsText")}
          </CustomText>
        </View>

        <View style={styles.boardContainer}>
          <Board />
        </View>
      </View>

      <View>
        <Picker
          selectedValue={selectedLanguage}
          onValueChange={(itemValue, itemIndex) => {
            i18n.locale = itemValue;
            setSelectedLanguage(itemValue);
          }}
          style={{ width: 200 }}
        >
          <Picker.Item label="Sanskrut - संस्कृत" value={Locale.sanskrut} />
          <Picker.Item label="Hindi - हिंदी" value={Locale.hindi} />
          <Picker.Item label="Marathi - मराठी" value={Locale.marathi} />
          <Picker.Item label="Punjabi - ਪੰਜਾਬੀ" value={Locale.punjabi} />
          <Picker.Item label="English - English" value={Locale.english} />
        </Picker>
      </View>

      <View style={styles.footer}>
        <CustomText style={styles.footerText}>
          {i18n.t("developedBy")}
        </CustomText>
      </View>

      <GameOverModal visible={modalVisibility} onPressFunction={closeModal} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    paddingVertical: 80,
    paddingHorizontal: 20,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 9,
  },
  instructionsContainer: {
    maxWidth: 414,
    marginVertical: 18,
  },
  instructionsText: {
    fontSize: windowWidth > 410 ? 22 : 18,
    color: Colors.text,
  },
  boardContainer: {
    alignItems: "center",
  },
  footer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    maxWidth: 414,
  },
  footerText: {
    color: Colors.text,
  },
});

export default GameScreen;
