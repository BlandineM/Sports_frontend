/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {ReactElement, useEffect, useReducer} from 'react';
import  { setupi18n } from '../translations/i18n';
import { SafeAreaView, ScrollView, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import {log} from "../services/logger";


const Root = (): ReactElement | false => {
  const { t } = useTranslation();
  const [setupAppCheck, updateSetupCheck] = useReducer(
    (state, key) => {
      //Avoid useless rerendering
      if (!state[key]) {
        return { ...state, [key]: true };
      }
      return state;
    },
    {
      config: false,
      languages: false,
      themes: false,
      autologin: false,
      appUpdate: false,
    }
  );

  // Language
  useEffect(() => {

      const asyncSetupi18n = async () => {
        try {
          await setupi18n([
            "fr",
            "en"
          ], 'fr');
          updateSetupCheck('languages');
        } catch (err) {
          log.error(`[BOOTSTRAP] Cannot setup i18n for languages [
    "fr",
    "en"
  ]:`, err);
        }
      };
      asyncSetupi18n();

  }, []);
  return (
    <SafeAreaView>
      <ScrollView>
        <Text>{t('app.newUpdate')}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Root;
