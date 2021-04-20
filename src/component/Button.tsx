import React from 'react'
import {TouchableOpacity, StyleSheet, Text, TouchableOpacityProps} from 'react-native'

import colors from '../styles/colors'

interface ButtonProps extends TouchableOpacityProps {
    label: string,
}


export function Button ({ label = 'Texto Default', ...rest } : ButtonProps) {
    return (
        <TouchableOpacity style={styles.button} {...rest}>
            <Text style={styles.buttonText}>
                {label}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
  button: {
      alignItems: 'center',
      backgroundColor: colors.green,
      borderRadius: 16,  
      justifyContent: 'center',
      padding: 16

  },
  buttonText: {
    color: colors.white,
    fontSize: 16
  }
});