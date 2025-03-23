import React from 'react';
import { Text as DefaultText } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import Colors from '@/constants/Colors';

export type TextProps = DefaultText['props'] & {
  lightColor?: string;
  darkColor?: string;
};

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const colorScheme = useColorScheme();

  const color = colorScheme === 'dark' 
    ? darkColor ?? Colors.dark.text
    : lightColor ?? Colors.light.text;

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}