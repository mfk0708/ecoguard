
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function Settings() {
  
  const handleButtonPress = (buttonName) => {
    console.log(`${buttonName} button pressed`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <FontAwesome5 name="fire" size={24} color="#1791b1" style={styles.logo} />
        <Text style={styles.heading}>SETTINGS</Text>
      </View>

  
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.accbutton} onPress={() => handleButtonPress("Accounts")}>
          <View style={styles.innerText}>
          <MaterialCommunityIcons name="account-circle-outline" size={26} color="white" />
          <Text style={styles.accbuttontext}>ACCOUNTS</Text>
          </View>
          <AntDesign name="arrowright" size={20} color="white" style={{marginRight:10}} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.accbutton} onPress={() => handleButtonPress("Notifications")}>
        <View style={styles.innerText}>
        <Ionicons name="notifications-outline" size={26} color="white" />
          <Text style={styles.accbuttontext}>NOTIFICATION</Text>
          </View>
          <AntDesign name="arrowright" size={20} color="white" style={{marginRight:10}} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.accbutton} onPress={() => handleButtonPress("Privacy")}>
        <View style={styles.innerText}>
        <Feather name="lock" size={26} color="white" />
          <Text style={styles.accbuttontext}>PRIVACY & SECURITY</Text>
          </View>
          <AntDesign name="arrowright" size={20} color="white" style={{marginRight:10}} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.accbutton} onPress={() => handleButtonPress("Help")}>
        <View style={styles.innerText}>
        <Feather name="help-circle" size={26} color="white" />
          <Text style={styles.accbuttontext}>HELP & SUPPORT</Text>
          </View>
          <AntDesign name="arrowright" size={20} color="white" style={{marginRight:10}} />
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
      <AntDesign name="copyright" size={15} color="white" />
        <Text style={styles.copyright}>COPYRIGHT OWNED BY AODA</Text>
      </View>
      
      
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',

  },
  header: {
    marginTop: 40,
    flexDirection: "row",
    alignItems: "baseline",
    marginLeft:20
  },
  heading: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
   fontFamily: 'JockeyOne_400Regular', 
   marginLeft:5,
  },
  buttonContainer: {
    marginTop:40,
    flexDirection: 'column',
    justifyContent:"space-between",
    height:'30%'
  },
  innerText:{
    flexDirection:'row',
    alignItems:'center'
  },
  accbutton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    marginLeft:8,
    paddingVertical:5
  },

  accbuttontext: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'JockeyOne_400Regular',
    marginLeft:4
    
  },
  footer:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    marginTop:15
  },
  copyright:{
    marginLeft:4,
    color:'#FFFFFF',
    fontSize:10,
    fontFamily: 'JockeyOne_400Regular', 
  }


});

