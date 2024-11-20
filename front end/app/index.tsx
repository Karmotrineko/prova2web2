import { Link } from 'expo-router';
import React, {useState} from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { router } from 'expo-router';

export default function LoginScreen() {

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const isLoginEnabled = email !== '' && senha !== '';

  async function submit(){

    if(!isLoginEnabled){
      alert("Não deixe usuário ou senha em branco");
    }

    console.log("Email :"+ email);
    console.log("Senha :"+ senha);

    const response = await fetch("http://localhost:3000/auth/signin", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password: senha,
        email: email
      })
    })

    const result = await response.json();
    console.log(result);
    if(result.status !== 200){
      alert("Erro ao realizar a autenticação");
    } else {
      router.push("/(tabs)")
    }
  }

  return (
    <View style={styles.container}>
      {/* Avatar Image */}
      <Image
        source={require('../assets/images/logouvv.png')} // Substitua pelo caminho da imagem do avatar
        style={styles.avatar}
      />

      <Text>Entre na sua conta</Text>

      {/* Username Input */}
      <TextInput
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#000"
      />

      {/* Password Input */}
      <TextInput
        value={senha}
        onChangeText={setSenha}
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        placeholderTextColor="#000"
      />

      {/* Login Button */}
      <TouchableOpacity onPress={() => {submit()}} style={styles.button}>
        <Text style={styles.buttonText}>ENTRAR</Text>
      </TouchableOpacity>

      {/* Links for "Forgot Password" and "Sign Up" */}
      <View style={styles.linkContainer}>
        <Text style={styles.link}>Esqueci minha senha</Text>
        <Link href={"/register"}>Cadastro</Link>
      </View>

      {/* Diamond Image */}
      <Image
        source={require('../assets/images/chiha.png')} // Substitua pelo caminho da imagem do diamante
        style={styles.diamond}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'ivory',
  },
  avatar: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  button: {
    width: '80%',
    height: 40,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginVertical: 10,
  },
  link: {
    color: '#000',
    textDecorationLine: 'underline',
  },
  diamond: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
    marginTop: 20,
  },
});
