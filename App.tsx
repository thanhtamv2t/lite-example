// @ts-nocheck
import React from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  Linking,
  View,
} from 'react-native';

import {Chain, Client} from '@coin98-com/connect-sdk/dist/lite';

const Button = ({children, ...props}) => {
  return (
    <TouchableOpacity
      style={{
        padding: 24,
        backgroundColor: '#006600',
        borderRadius: 12,
        marginBottom: 24,
      }}
      {...props}>
      <Text style={{color: '#fff'}}>{children}</Text>
    </TouchableOpacity>
  );
};

function App(): JSX.Element {
  const [cnnId, setCnnId] = React.useState();
  const [isConnected, setConnect] = React.useState(false);
  const [signature, setSignature] = React.useState('');

  const clientRef = React.useRef();

  console.log(clientRef.current?.id);

  const connect = async () => {
    try {
      await clientRef.current.connect(Chain.fantom, {
        id: cnnId,
        name: 'hihi',
        logo: 'https://google.com',
        callbackURL: 'coin98://google.com',
      });
      setCnnId(clientRef.current?.id);
      setConnect(true);
    } catch (e) {
      //
    }
  };

  const sign = async () => {
    const signature = await clientRef.current.request({
      method: 'personal_sign',
      params: ['HELP ME'],
    });

    setSignature(JSON.stringify(signature));
  };

  React.useEffect(() => {
    clientRef.current = new Client({
      callback: eUrl => {
        // Open Coin98 With return url
        Linking.openURL(eUrl);
      },
    });
  }, []);

  return (
    <SafeAreaView
      style={{
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {!isConnected && (
        <Button onPress={connect}>
          <Text>Connect</Text>
        </Button>
      )}

      {isConnected && (
        <Button onPress={sign}>
          <Text>Sign</Text>
        </Button>
      )}

      {signature && (
        <View>
          <Text>{signature}</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

export default App;
