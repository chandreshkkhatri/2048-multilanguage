import React from 'react';
import { StyleSheet } from 'react-native';
import { Text as PaperText, useTheme } from 'react-native-paper';

import Card from './Card.component';
import i18n from '../../services/internationalization/i18n';

const Logo = ({ containerStyle, textStyle }) => {
    const theme = useTheme();

    const dynamicStyles = StyleSheet.create({
        container: {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.colors.tile2048,
            padding: 5,
        },
        text: {
            color: 'white',
            fontSize: 20,
        },
    });

    return (
        <Card style={{ ...dynamicStyles.container, ...containerStyle }}>
            <PaperText style={{ ...dynamicStyles.text, ...textStyle }}>
                {i18n.t('gameName')}
            </PaperText>
        </Card>
    );
};

export default Logo;
