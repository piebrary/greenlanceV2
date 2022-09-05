import React, { Component } from 'react'
import { SafeAreaView } from 'react-navigation'
import { WebView } from 'react-native-webview'

export default function App() {

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'rgb(10, 10, 10)' }} forceInset={{ bottom: 'never' }}>
            <WebView
                source={{ uri: 'https://demo.piebrary.nl' }}
                />
        </SafeAreaView>
    )
}
