import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useEffect} from 'react';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {useAuthContext} from './components/AuthContextProvider';

const LoginComponent = () => {
  const {
    setLoggedInUserInfo,
    setIsCurrentlyLoggedIn,
    isCurrentlyLoggedIn,
    loggedInUserInfo,
  } = useAuthContext();
  useEffect(() => {
    GoogleSignin.configure();
  }, []);
  const googleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      setIsCurrentlyLoggedIn(true);
      const isSignedIn = await GoogleSignin.isSignedIn();
      const userInfo = await GoogleSignin.signIn();
      setLoggedInUserInfo(userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log(error);
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log(error);
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log(error);
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };
  const googleSignOut = async () => {
    try {
      await GoogleSignin.signOut();
      setLoggedInUserInfo(null); // Remember to remove the user from your app's state as well
      setIsCurrentlyLoggedIn(false);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View style={styles.container}>
      {isCurrentlyLoggedIn ? (
        <>
          <Text style={styles.greeting}>
            Hola!, {loggedInUserInfo?.user.name}
          </Text>
          <Image
            style={styles.tinyLogo}
            source={{uri: loggedInUserInfo?.user.photo}}
          />
          <TouchableOpacity style={styles.btnStyle} onPress={googleSignOut}>
            <Text style={styles.btnText}>Logout</Text>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity style={styles.btnStyle} onPress={googleLogin}>
          <Text style={styles.btnText}>Login with Google</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default LoginComponent;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnStyle: {
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  btnText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  greeting: {
    fontSize: 30,
  },
  tinyLogo: {
    width: 200,
    height: 200,
    marginTop: 10,
    marginBottom: 20,
  },
});
