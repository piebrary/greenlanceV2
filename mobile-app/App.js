import React, { Component } from 'react'
import { SafeAreaView } from 'react-navigation'
import { WebView } from 'react-native-webview'

export default function App() {

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }} forceInset={{ bottom: 'never' }}>
            <WebView
                cacheEnabled={false}
                cacheMode={'LOAD_NO_CACHE'}
                source={{ uri: 'https://demo.piebrary.nl' }}
                />
        </SafeAreaView>
    )
}
