import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';

export default function RegisterScreen() {

  const [email, setEmail] = useState<string>("");
  const [name, setNome] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function submit(){

    if(email.length === 0 || name.length === 0 || password.length === 0){
        return alert("Os campos não podem ser nulos!")
    }

    console.log("Email: " + email + "\nNome: " + name + "\nPassword: " + password);

    try {
        const request = await fetch("http://localhost:3000/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                name: name,
                password: password
            })
        })

        if(request.status === 200){
            alert("Usuário cadastrado com sucesso!")
            router.push("/");
        }
    }catch(error){
        console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      {/* Avatar Image */}
      <Image
        source={require('../assets/images/logouvv.png')} // Substitua pelo caminho da imagem do avatar
        style={styles.avatar}
      />


        <Text>Realize o seu cadastro</Text>

      {/* Username Input */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#000"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Nome"
        placeholderTextColor="#000"
        value={name}
        onChangeText={setNome}
      />

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        placeholderTextColor="#000"
        value={password}
        onChangeText={setPassword}
      />

      {/* Login Button */}
      <TouchableOpacity style={styles.button} onPress={submit}>
        <Text style={styles.buttonText}>CADASTRAR</Text>
      </TouchableOpacity>

      {/* Links for "Forgot Password" and "Sign Up" */}
      <View style={styles.linkContainer}>
        <Text style={styles.link}>Esqueci minha senha</Text>
        <Link href={"/"}>Login</Link>
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
