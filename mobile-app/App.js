import React, { Component, useRef, useEffect } from 'react'
import { AppState, StatusBar } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { WebView } from 'react-native-webview'

export default function App() {

    const webViewRef = useRef()

    useEffect(() => {

        AppState.addEventListener('change', refreshWebView)

    }, [])

    function refreshWebView(){

        webViewRef.current.reload()

    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }} forceInset={{ bottom: 'never' }}>
            <StatusBar
                backgroundColor={'rgb(0, 0, 0)'}
                networkActivityIndicatorVisible ={true}
                />
            <WebView
                ref={webViewRef}
                cacheEnabled={false}
                cacheMode={'LOAD_NO_CACHE'}
                source={{ uri: 'https://demo.piebrary.nl' }}
                renderLoading={this.ActivityIndicatorLoadingView}
                startInLoadingState={true}
                />
        </SafeAreaView>
    )
}
