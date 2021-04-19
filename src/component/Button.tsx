import React from 'react'
import {TouchableOpacity, StyleSheet, Text} from 'react-native'

import colors from '../styles/colors'

interface ButtonProps {
    label: string
}


export function Button ({ label = 'Texto Default' } : ButtonProps) {
    return (
        <TouchableOpacity style={styles.button}>
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