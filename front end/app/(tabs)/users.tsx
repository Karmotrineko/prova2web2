import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

export default function CreatePostScreen({ navigation }: { navigation: any }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [authorId, setAuthorId] = useState(1); // Este é o autor, substitua com o ID do usuário real.

  const handlePostSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      Alert.alert('Erro', 'Título e conteúdo são obrigatórios!');
      return;
    }

    try {
      console.log('Enviando dados para o servidor:', {
        title,
        content,
        published: true,
        authorId,
      });

      const response = await fetch('http://localhost:3000/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          published: true, // Indica que o post está publicado
          authorId, // Usando o estado do autor
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || `Erro ao criar o post: ${response.statusText}`);
      }

      console.log('Resposta do servidor:', result);

      Alert.alert('Sucesso', 'Post criado com sucesso!');
      setTitle(''); // Limpa os campos após o envio
      setContent('');
      setAuthorId(1); // Resetando o ID do autor, se necessário
      navigation.navigate('Home'); // Redireciona para a tela inicial após criar o post
    } catch (error) {
      console.error('Erro ao criar post:', error);
      Alert.alert('Erro', 'Não foi possível criar o post.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Digite o título do post"
        placeholderTextColor="#888"
      />

      <Text style={styles.label}>Conteúdo</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={content}
        onChangeText={setContent}
        placeholder="Digite o conteúdo do post"
        placeholderTextColor="#888"
        multiline
        numberOfLines={4}
      />

      <TouchableOpacity style={styles.button} onPress={handlePostSubmit}>
        <Text style={styles.buttonText}>Criar Post</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'orange',
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
